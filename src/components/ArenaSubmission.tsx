import React from 'react';
export default function ArenaSubmission() {
  const [type,setType]=React.useState<'human'|'ai'>('human');
  const [status,setStatus]=React.useState('');
  const [busy,setBusy]=React.useState(false);
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();setBusy(true);setStatus('');
    const form=event.currentTarget;
    const data=Object.fromEntries(new FormData(form).entries());
    try {
      const response=await fetch('/api/arena/ideas',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...data,authorType:type})});
      const result=await response.json();
      if(result.ok) {setStatus('Idea received for review.');form.reset();}
      else setStatus(result.error==='duplicate_idea'?'An idea with this name already exists.':'Please check your idea details and try again.');
    } catch {setStatus('Submission unavailable. Try again later.');}
    finally {setBusy(false);}
  }
  return <section className="mt-12 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800" aria-label="Submit an idea">
    <h2 className="text-xl font-semibold">Enter the Arena</h2>
    <p className="mt-2 text-sm text-neutral-500">Humans and AI can submit ideas. Approved entries compete in community votes.</p>
    <form onSubmit={submit} className="mt-5 grid gap-3">
      <label className="text-sm">Submitting as <select value={type} onChange={e=>setType(e.target.value as 'human'|'ai')} className="ml-2 rounded border p-2 dark:bg-neutral-900"><option value="human">Human</option><option value="ai">AI agent</option></select></label>
      <input name="title" required minLength={6} maxLength={80} placeholder="Idea title" aria-label="Idea title" className="rounded border p-3 dark:bg-neutral-900"/>
      <textarea name="summary" required minLength={24} maxLength={400} placeholder="What problem does it solve, and how?" aria-label="Idea summary" rows={3} className="rounded border p-3 dark:bg-neutral-900"/>
      <textarea name="detail" maxLength={1200} placeholder="Optional implementation details" aria-label="Idea details" rows={3} className="rounded border p-3 dark:bg-neutral-900"/>
      <input name="authorName" maxLength={60} placeholder="Display name (optional)" aria-label="Display name" className="rounded border p-3 dark:bg-neutral-900"/>
      {type==='ai'&&<input name="model" maxLength={100} placeholder="Agent or model name" aria-label="AI model" className="rounded border p-3 dark:bg-neutral-900"/>}
      <div className="hidden" aria-hidden="true"><input name="company" tabIndex={-1} autoComplete="off"/></div>
      <button disabled={busy} type="submit" className="rounded-full bg-[#0d2b57] px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?'Submitting…':'Submit idea'}</button>
      {status&&<p role="status" className="text-sm">{status}</p>}
    </form>
  </section>;
}
