// Single-elimination tournament lifecycle for Arena.
// A tournament is four randomly drawn entrants, two semifinals, and a final.
// All advancement is backed by recorded votes, never by an AI judgement.
import { randomInt } from 'node:crypto';
import { execute, withTransaction } from './db.mjs';
import { ensureArenaSchema, getBattle } from './arena.mjs';
import { newId, nowIso } from './util.mjs';

const roundDays = () => Math.max(1, Math.min(14, Number(process.env.ARENA_ROUND_DAYS || 7)));
const quorum = () => Math.max(1, Number(process.env.ARENA_MIN_VOTES || 10));
const runoffDays = () => 2;
const MAX_RUNOFFS = 2;
let ready;

export function ensureTournamentSchema() {
  if (!ready) ready = (async () => {
    await ensureArenaSchema();
    const statements = [
      "CREATE TABLE IF NOT EXISTS arena.tournaments (id text PRIMARY KEY, name text NOT NULL, status text NOT NULL CHECK (status IN ('active','blocked','complete')), current_round integer NOT NULL DEFAULT 1, champion_id text REFERENCES arena.ideas(id), created_at text NOT NULL, updated_at text NOT NULL)",
      "CREATE TABLE IF NOT EXISTS arena.tournament_entries (tournament_id text NOT NULL REFERENCES arena.tournaments(id) ON DELETE CASCADE, idea_id text NOT NULL REFERENCES arena.ideas(id), seed integer NOT NULL CHECK (seed BETWEEN 1 AND 4), PRIMARY KEY (tournament_id,idea_id), UNIQUE(tournament_id,seed))",
      "CREATE TABLE IF NOT EXISTS arena.tournament_matches (id text PRIMARY KEY, tournament_id text NOT NULL REFERENCES arena.tournaments(id) ON DELETE CASCADE, round_number integer NOT NULL CHECK (round_number IN (1,2)), slot integer NOT NULL, a_idea_id text NOT NULL REFERENCES arena.ideas(id), b_idea_id text NOT NULL REFERENCES arena.ideas(id), battle_id text NOT NULL UNIQUE REFERENCES arena.battles(id), winner_idea_id text REFERENCES arena.ideas(id), state text NOT NULL CHECK (state IN ('live','decided','blocked')), runoff_count integer NOT NULL DEFAULT 0, created_at text NOT NULL, updated_at text NOT NULL, UNIQUE(tournament_id,round_number,slot))",
      "CREATE TABLE IF NOT EXISTS arena.tournament_runoffs (id text PRIMARY KEY, match_id text NOT NULL REFERENCES arena.tournament_matches(id) ON DELETE CASCADE, previous_battle_id text NOT NULL REFERENCES arena.battles(id), replacement_battle_id text NOT NULL REFERENCES arena.battles(id), reason text NOT NULL, created_at text NOT NULL)",
      "REVOKE ALL ON ALL TABLES IN SCHEMA arena FROM anon, authenticated",
      "ALTER TABLE arena.tournaments ENABLE ROW LEVEL SECURITY",
      "ALTER TABLE arena.tournament_entries ENABLE ROW LEVEL SECURITY",
      "ALTER TABLE arena.tournament_matches ENABLE ROW LEVEL SECURITY",
      "ALTER TABLE arena.tournament_runoffs ENABLE ROW LEVEL SECURITY"
    ];
    for (const statement of statements) {
      try { await execute(statement); }
      catch (error) {
        if (statement.startsWith('REVOKE') && /role .* does not exist/i.test(error.message || '')) continue;
        throw error;
      }
    }
  })().catch(error => { ready = null; throw error; });
  return ready;
}

async function ideaRows(ids, db = { execute }) {
  const result = await db.execute({
    sql: 'SELECT id,title,summary,detail FROM arena.ideas WHERE id IN (' + ids.map(() => '?').join(',') + ')',
    args: ids
  });
  return new Map(result.rows.map(idea => [String(idea.id), idea]));
}

async function createMatch(tx, tournamentId, round, slot, a, b, days = roundDays()) {
  const id = newId(), stamp = nowIso(), battleId = newId();
  const slug = 'arena-' + tournamentId.slice(0, 8) + '-r' + round + '-m' + slot + '-' + id.slice(0, 6);
  const closesAt = new Date(Date.now() + days * 86400000).toISOString();
  const label = round === 1 ? 'Semifinal ' + slot : 'Final';
  await tx.execute({
    sql: 'INSERT INTO arena.battles (id,slug,title,subtitle,a_title,a_summary,a_detail,b_title,b_summary,b_detail,closes_at,published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    args: [battleId,slug,label + ': ' + a.title + ' vs ' + b.title,'Arena tournament · Round ' + round,a.title,a.summary,a.detail,b.title,b.summary,b.detail,closesAt,true,stamp,stamp]
  });
  await tx.execute({
    sql: 'INSERT INTO arena.tournament_matches (id,tournament_id,round_number,slot,a_idea_id,b_idea_id,battle_id,state,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
    args: [id,tournamentId,round,slot,a.id,b.id,battleId,'live',stamp,stamp]
  });
  return { id, battleId, closesAt };
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

async function resolveClosedMatches() {
  const { rows } = await execute("SELECT id,tournament_id,round_number,battle_id,a_idea_id,b_idea_id,runoff_count FROM arena.tournament_matches WHERE state='live' ORDER BY created_at LIMIT 20");
  const summary = { resolved: 0, runoffs: 0, blocked: 0 };
  for (const match of rows) {
    const battle = await getBattle(String(match.battle_id));
    if (!battle || !battle.closed) continue;
    const validWinner = battle.votes.total >= quorum() && (battle.winner === 'a' || battle.winner === 'b');
    const winnerId = validWinner ? match[battle.winner === 'a' ? 'a_idea_id' : 'b_idea_id'] : null;
    await withTransaction(async tx => {
      const locked = await tx.execute({ sql:"SELECT id,state FROM arena.tournament_matches WHERE id=? FOR UPDATE", args:[match.id] });
      if (locked.rows[0]?.state !== 'live') return;
      if (winnerId) {
        await tx.execute({sql:"UPDATE arena.tournament_matches SET state='decided',winner_idea_id=?,updated_at=? WHERE id=?",args:[winnerId,nowIso(),match.id]});
        if (Number(match.round_number) === 2) {
          await tx.execute({sql:"UPDATE arena.tournaments SET status='complete',champion_id=?,updated_at=? WHERE id=?",args:[winnerId,nowIso(),match.tournament_id]});
        }
        summary.resolved++;
        return;
      }
      if (Number(match.runoff_count) >= MAX_RUNOFFS) {
        await tx.execute({sql:"UPDATE arena.tournament_matches SET state='blocked',updated_at=? WHERE id=?",args:[nowIso(),match.id]});
        await tx.execute({sql:"UPDATE arena.tournaments SET status='blocked',updated_at=? WHERE id=?",args:[nowIso(),match.tournament_id]});
        summary.blocked++;
        return;
      }
      const ids = [match.a_idea_id,match.b_idea_id];
      const map = await ideaRows(ids,tx);
      const a=map.get(String(ids[0])),b=map.get(String(ids[1]));
      if (!a || !b) throw new Error('Tournament entrant missing');
      const stamp=nowIso(),battleId=newId(),newSlug='arena-runoff-'+match.id.slice(0,8)+'-'+(Number(match.runoff_count)+1);
      await tx.execute({
        sql:'INSERT INTO arena.battles (id,slug,title,subtitle,a_title,a_summary,a_detail,b_title,b_summary,b_detail,closes_at,published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        args:[battleId,newSlug,'Runoff: '+a.title+' vs '+b.title,'Tournament tiebreak · Vote again',a.title,a.summary,a.detail,b.title,b.summary,b.detail,new Date(Date.now()+runoffDays()*86400000).toISOString(),true,stamp,stamp]
      });
      await tx.execute({
        sql:'INSERT INTO arena.tournament_runoffs (id,match_id,previous_battle_id,replacement_battle_id,reason,created_at) VALUES (?,?,?,?,?,?)',
        args:[newId(),match.id,match.battle_id,battleId,battle.votes.total<quorum()?'Below vote quorum':'Tied vote',stamp]
      });
      await tx.execute({sql:"UPDATE arena.tournament_matches SET battle_id=?,runoff_count=runoff_count+1,updated_at=? WHERE id=?",args:[battleId,stamp,match.id]});
      summary.runoffs++;
    });
  }
  return summary;
}

async function scheduleRound() {
  return withTransaction(async tx => {
    const lock = await tx.execute('SELECT pg_try_advisory_xact_lock(742673) AS locked');
    if (!lock.rows[0]?.locked) return { state:'busy', changed:false };
    const active=await tx.execute("SELECT id,status,current_round FROM arena.tournaments WHERE status IN ('active','blocked') ORDER BY created_at DESC LIMIT 1 FOR UPDATE");
    if (active.rows.length) {
      const tournament=active.rows[0];
      if (tournament.status==='blocked') return { state:'blocked',changed:false };
      const matches=await tx.execute({sql:'SELECT id,round_number,slot,winner_idea_id,state FROM arena.tournament_matches WHERE tournament_id=? ORDER BY round_number,slot',args:[tournament.id]});
      const semifinal=matches.rows.filter(x=>Number(x.round_number)===1);
      if (semifinal.length !== 2 || semifinal.some(x=>x.state!=='decided')) return {state:'in_progress',changed:false};
      if (matches.rows.some(x=>Number(x.round_number)===2)) return {state:'final_in_progress',changed:false};
      const ids=semifinal.map(x=>String(x.winner_idea_id));
      const ideas=await ideaRows(ids,tx);
      await createMatch(tx,tournament.id,2,1,ideas.get(ids[0]),ideas.get(ids[1]));
      await tx.execute({sql:'UPDATE arena.tournaments SET current_round=2,updated_at=? WHERE id=?',args:[nowIso(),tournament.id]});
      return { state:'final_scheduled',changed:true,tournamentId:tournament.id };
    }

    const candidates=await tx.execute("SELECT id,title,summary,detail FROM arena.ideas WHERE status='approved' ORDER BY created_at LIMIT 4 FOR UPDATE SKIP LOCKED");
    if (candidates.rows.length<4) return {state:'waiting_for_four_approved',changed:false};
    const entrant=shuffle(candidates.rows),id=newId(),stamp=nowIso();
    const name='Arena Open · '+new Date().toLocaleDateString('en-US',{month:'long',year:'numeric',timeZone:'UTC'});
    await tx.execute({sql:"INSERT INTO arena.tournaments (id,name,status,current_round,created_at,updated_at) VALUES (?,?, 'active',1,?,?)",args:[id,name,stamp,stamp]});
    for(let i=0;i<entrant.length;i++) {
      await tx.execute({sql:'INSERT INTO arena.tournament_entries (tournament_id,idea_id,seed) VALUES (?,?,?)',args:[id,entrant[i].id,i+1]});
    }
    await createMatch(tx,id,1,1,entrant[0],entrant[3]);
    await createMatch(tx,id,1,2,entrant[1],entrant[2]);
    await tx.execute({sql:"UPDATE arena.ideas SET status='matched',updated_at=? WHERE id IN (?,?,?,?)",args:[stamp,...entrant.map(x=>x.id)]});
    return {state:'tournament_started',changed:true,tournamentId:id};
  });
}

export async function runTournamentCycle() {
  await ensureTournamentSchema();
  const results=await resolveClosedMatches();
  const scheduled=await scheduleRound();
  return { ...results, ...scheduled, changed:scheduled.changed || results.resolved>0 || results.runoffs>0 || results.blocked>0 };
}

export async function publicTournaments() {
  await ensureTournamentSchema();
  const {rows}=await execute('SELECT id,name,status,current_round,champion_id,created_at FROM arena.tournaments ORDER BY created_at DESC LIMIT 8');
  const tours=[];
  for(const t of rows) {
    const entries=await execute({sql:'SELECT e.seed,e.idea_id,i.title,i.author_type,i.author_name FROM arena.tournament_entries e JOIN arena.ideas i ON i.id=e.idea_id WHERE e.tournament_id=? ORDER BY e.seed',args:[t.id]});
    const matches=await execute({sql:'SELECT id,round_number,slot,a_idea_id,b_idea_id,battle_id,winner_idea_id,state,runoff_count FROM arena.tournament_matches WHERE tournament_id=? ORDER BY round_number,slot',args:[t.id]});
    const hydrated=await Promise.all(matches.rows.map(async m=>({
      id:m.id,round:Number(m.round_number),slot:Number(m.slot),state:m.state,runoffs:Number(m.runoff_count),
      aIdeaId:m.a_idea_id,bIdeaId:m.b_idea_id,winnerIdeaId:m.winner_idea_id,
      battle:await getBattle(String(m.battle_id))
    })));
    tours.push({
      id:t.id,name:t.name,status:t.status,currentRound:Number(t.current_round),
      championIdeaId:t.champion_id,createdAt:t.created_at,
      entries:entries.rows.map(e=>({id:e.idea_id,seed:Number(e.seed),title:e.title,authorType:e.author_type,authorName:e.author_name})),
      matches:hydrated
    });
  }
  return tours;
}
