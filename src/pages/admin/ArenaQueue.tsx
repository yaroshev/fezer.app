import React from 'react';
type Idea={id:string;title:string;summary:string;authorType:string;status:string;reviewReason?:string};
type State={ideas:Idea[];queue:Record<string,number>;outcomes:Array<{title:string;state:string;issueUrl?:string}>;aiConfigured:boolean;githubConfigured:boolean};
export default function ArenaQueue({api}:{api:(path:string,options?:RequestInit)=>Promise<unknown>}) {
  const [data,setData]=React.useState<State|null>(null),[busy,setBusy]=React.useState(false),[message,setMessage]=React.useState('');
  const reload=React.useCallback(async()=>{try {const value=await api('/api/admin/league') as State;setData(value);}catch {setMessage('Cannot load league status.');}},[api]);
  React.useEffect(()=>{reload();},[reload]);
  async function action(path:string,body?:object) {
    setBusy(true);setMessage('');
    try{await api(path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body||{})});await reload();}
    catch {setMessage('Operation failed.');}
    finally {setBusy(false);}
  }
  return <section className="mt-8 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold">Autonomous league</h2>
    <button disabled={busy} onClick={()=>action('/api/admin/league/cycle')} className="rounded-full border px-4 py-2 text-sm">Run cycle now</button></div>
    <p className="mt-2 text-sm text-neutral-500">AI review: {data?.aiConfigured?'configured':'manual only'} · GitHub handoff: {data?.githubConfigured?'configured':'disabled'}. Scheduled run: hourly.</p>
    <p className="mt-2 text-xs text-neutral-500">Ideas: {JSON.stringify(data?.queue||{})}</p>
    {message&&<p role="status" className="mt-2 text-sm">{message}</p>}
    <h3 className="mt-5 text-sm font-semibold">Submissions</h3>
    <div className="mt-3 grid gap-3">{(data?.ideas||[]).slice(0,70).map(idea=><article key={idea.id} className="rounded-xl border p-3 text-sm">
      <p className="font-semibold">{idea.title} <span className="font-normal text-neutral-500">· {idea.authorType} · {idea.status}</span></p>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">{idea.summary}</p>
      {idea.reviewReason&&<p className="mt-1 text-xs text-neutral-500">Review: {idea.reviewReason}</p>}
      {idea.status!=='matched'&&<div className="mt-2 flex gap-2">{(['approved','rejected','pending'] as const).map(status=><button disabled={busy||idea.status===status} key={status} onClick={()=>action('/api/admin/league/review',{id:idea.id,status})} className="rounded-full border px-3 py-1 text-xs disabled:opacity-30">{status}</button>)}</div>}
    </article>)}</div>
    <h3 className="mt-5 text-sm font-semibold">Completed competitions</h3>
    <div className="mt-2 grid gap-2">{(data?.outcomes||[]).map((out,i)=><div key={i} className="text-sm">{out.title} · {out.state} {out.issueUrl&&<a href={out.issueUrl} target="_blank" rel="noreferrer" className="underline">GitHub issue</a>}</div>)}</div>
  </section>;
}
