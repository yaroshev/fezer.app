import { runLeagueCycle } from '../../server/arenaLeague.mjs';
export default async () => {
  try { console.log('[arena] cycle', JSON.stringify(await runLeagueCycle())); }
  catch (error) { console.error('[arena] cycle failure', error); throw error; }
};
export const config = { schedule: '0 * * * *' };
