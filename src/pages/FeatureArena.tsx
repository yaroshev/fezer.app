import React from 'react';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import ArenaSubmission from '../components/ArenaSubmission';
import { useArenaVote } from '../components/arenaStore';
import { type ArenaBattle, type ArenaSide, formatDeadline, voterToken } from '../content/arena';
type Entry={id:string;seed:number;title:string};
type Match={id:string;round:number;slot:number;state:string;runoffs:number;aIdeaId:string;bIdeaId:string;winnerIdeaId:string|null;battle:ArenaBattle|null};
type Tournament={id:string;name:string;status:string;championIdeaId:string|null;entries:Entry[];matches:Match[]};
export default function FeatureArena(){
 const [tournaments,setTournaments]=React.useState<Tournament[]>([]);
 const [loaded,setLoaded]=React.useState(false);
 const [error,setError]=React.useState('');
 const [busyId,setBusyId]=React.useState<string|null>(null);
 const {submit,busy,error:voteError}=useArenaVote('arena-page');
 React.useEffect(()=>{
  let active=true;
  fetch('/api/arena/tournaments',{cache:'no-store',headers:{'x-fezer-voter':voterToken()}}).then(r=>{if(!r.ok)throw new Error('unavailable');return r.json()})
   .then(data=>{if(active)setTournaments(data.tournaments||[])})
   .catch(()=>{if(active)setError('Tournament data is temporarily unavailable.')})
   .finally(()=>{if(active)setLoaded(true)});
  return()=>{active=false};
 },[]);
 const t=tournaments[0];
 const name=(id:string|null)=>t?.entries.find(e=>e.id===id)?.title||'To be decided';
 const semifinals=t?.matches.filter(m=>m.round===1).sort((a,b)=>a.slot-b.slot)||[];
 const final=t?.matches.find(m=>m.round===2);
 async function vote(b:ArenaBattle,side:ArenaSide){
  setBusyId(b.id);
  const result=await submit(b,side);
  if(result.ok)setTournaments(old=>old.map(tour=>({...tour,matches:tour.matches.map(m=>m.battle?.id===b.id?{...m,battle:result.battle}:m)})));
  setBusyId(null);
 }
 const live=t?.matches.filter(m=>m.state==='live' && m.battle && !m.battle.closed)||[];
 return <div className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-100">
 <Nav activePath="/feature-arena"/>
 <main className="mx-auto max-w-5xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
  <header className="border-b border-neutral-200 pb-10 dark:border-neutral-800">
   <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Fezer / Arena</p>
   <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Ideas compete. Winners advance.</h1>
   <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">Four entrants. Two semifinals. One final. One champion. Submit an idea or help decide the next winner.</p>
  </header>
  {!loaded&&<p className="py-12 text-sm text-neutral-500">Loading competition…</p>}
  {error&&<p role="status" className="py-6 text-sm text-neutral-500">{error}</p>}
  {loaded&&!t&&<section className="py-12"><h2 className="text-xl font-semibold">Next tournament forming</h2><p className="mt-2 text-neutral-500">Four approved entries are required to open a bracket.</p></section>}
  {t&&<section className="pt-10">
   <div className="flex items-baseline justify-between gap-3"><h2 className="text-2xl font-semibold tracking-tight">{t.name}</h2><span className="text-sm capitalize text-neutral-500">{t.status}</span></div>
   <div className="mt-9 border-t border-neutral-200 pt-6 dark:border-neutral-800">
    <div className="mb-5 flex items-baseline justify-between"><h3 className="text-lg font-semibold">Bracket</h3><span className="text-xs text-neutral-500">Single elimination</span></div>
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
     <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-400">Semifinals</p><div className="space-y-4">{semifinals.map(m=><div key={m.id} className="border border-neutral-200 dark:border-neutral-800">
      <p className="border-b border-neutral-100 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-900">Match {m.slot} · {m.state}</p>
      {[m.aIdeaId,m.bIdeaId].map(id=><div key={id} className="flex justify-between gap-4 border-b border-neutral-100 px-4 py-3 text-sm last:border-0 dark:border-neutral-900"><span className={m.winnerIdeaId===id?'font-semibold':''}>{name(id)}</span><span className="text-neutral-400">{m.winnerIdeaId===id?'W':m.winnerIdeaId?'L':'—'}</span></div>)}
     </div>)}</div></div>
     <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-400">Final</p><div className="border border-neutral-200 dark:border-neutral-800">{final?[final.aIdeaId,final.bIdeaId].map(id=><div key={id} className="flex justify-between gap-4 border-b border-neutral-100 px-4 py-4 text-sm last:border-0 dark:border-neutral-900"><span className={final.winnerIdeaId===id?'font-semibold':''}>{name(id)}</span><span className="text-neutral-400">{final.winnerIdeaId===id?'Champion':'—'}</span></div>):<><p className="border-b border-neutral-100 px-4 py-4 text-sm text-neutral-400 dark:border-neutral-900">Winner of semifinal 1</p><p className="px-4 py-4 text-sm text-neutral-400">Winner of semifinal 2</p></>}</div>{t.status==='complete'&&<p className="mt-4 font-semibold">Champion — {name(t.championIdeaId)}</p>}</div>
    </div>
   </div>
   <section className="mt-12"><h3 className="mb-5 text-lg font-semibold">Open matchups</h3>{live.length===0&&<p className="border-y border-neutral-200 py-7 text-sm text-neutral-500 dark:border-neutral-800">{t.status==='blocked'?'An unresolved match needs review.':t.status==='complete'?'This tournament is complete.':'No open voting. Awaiting the next round.'}</p>}
    <div className="space-y-6">{live.map(m=>{const b=m.battle!;return <article key={m.id} id={b.slug} className="scroll-mt-24 border border-neutral-200 dark:border-neutral-800">
     <div className="flex justify-between gap-3 border-b border-neutral-200 px-4 py-3 text-xs text-neutral-500 dark:border-neutral-800"><span>{m.round===2?'Final':'Semifinal '+m.slot}{m.runoffs?' · Runoff':''}</span><span>Closes {formatDeadline(b.closesAt)}</span></div>
     {(['a','b'] as ArenaSide[]).map(side=><div key={side} className="flex items-center justify-between gap-4 border-b border-neutral-100 px-4 py-4 last:border-0 dark:border-neutral-900"><div className="min-w-0"><h4 className="font-medium">{b[side].title}</h4><p className="mt-1 text-sm leading-relaxed text-neutral-500">{b[side].summary}</p></div><div className="flex shrink-0 items-center gap-3"><span className="font-mono text-sm tabular-nums">{b.votes[side]}</span><button type="button" onClick={()=>vote(b,side)} disabled={Boolean(b.myVote)||Boolean(busy)} className="border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-neutral-950 disabled:opacity-50 dark:border-neutral-700">{b.myVote===side?'Voted':'Vote'}</button></div></div>)}
     {busyId===b.id&&voteError&&<p role="alert" className="px-4 py-2 text-sm text-red-600">{voteError}</p>}
    </article>})}</div>
   </section>
  </section>}
  <section className="mt-14 border-t border-neutral-200 pt-8 dark:border-neutral-800"><h3 className="text-lg font-semibold">Rules</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">Approved entrants enter a randomized four-place bracket. Each matchup lasts seven days by default and requires at least ten votes. Ties and low participation trigger a two-day runoff. Unresolved results pause for organizer review. Only a confirmed final winner becomes the champion. Competition does not authorize automatic production deployment.</p></section>
  <ArenaSubmission/>
  {tournaments.length>1&&<section className="mt-12 border-t border-neutral-200 pt-7 dark:border-neutral-800"><h3 className="text-lg font-semibold">Tournament history</h3><div className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">{tournaments.slice(1).map(old=><p key={old.id} className="flex justify-between py-4 text-sm"><span>{old.name}</span><span className="capitalize text-neutral-500">{old.status}</span></p>)}</div></section>}
 </main><SiteFooter/></div>;
}
