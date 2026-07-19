import React, { useState } from 'react';
import Nav from '../components/Nav';

function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    document.title = 'Fezer | Request Account Deletion';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !confirmed) return;

    setSubmitted(true);
  };

  const isValid = email.trim().length > 0 && confirmed;

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 font-sans dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/delete-account" />

      <main className="mx-auto w-full max-w-xl px-4 sm:px-6 md:px-10 py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Request Account Deletion</h1>
        <p className="mt-3 text-neutral-600 leading-relaxed dark:text-neutral-400">
          Submit this form to request deletion of your Fezer account and associated personal data. We will process
          your request and remove or anonymize your data subject to legal retention requirements.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-neutral-800 font-medium dark:text-neutral-200">Request received</p>
            <p className="mt-2 text-neutral-600 text-sm leading-relaxed dark:text-neutral-400">
              Fezer stores all data on your device. To remove it, delete individual items in the app or
              uninstall Fezer from your device.
            </p>
            <a
              href="/privacypolicy"
              className="mt-4 inline-block text-sm font-medium text-neutral-700 hover:opacity-80 dark:text-neutral-300"
            >
              ← Back to Privacy Policy
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-500"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Reason (optional)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Any additional context for your request..."
                rows={3}
                className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 resize-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-500"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="confirm"
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-900"
              />
              <label htmlFor="confirm" className="text-sm text-neutral-700 leading-relaxed dark:text-neutral-300">
                I understand that deleting my account will permanently remove my data from Fezer and this action
                cannot be undone.
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-full border border-neutral-200 bg-[#0d2b57] text-white px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity dark:border-neutral-700"
            >
              Submit deletion request
            </button>
          </form>
        )}
      </main>

      <footer className="w-full border-t border-neutral-200 bg-white mt-12 sm:mt-16 safe-area-bottom dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-app-icon.png" alt="Fezer logo" className="w-6 h-6 rounded-lg" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Fezer</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-2 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex flex-wrap items-center gap-2">
                <a href="/privacypolicy" className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 transition-colors min-h-[44px] sm:min-h-0 sm:py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800">Privacy Policy</a>
                <a href="/terms" className="hover:opacity-70 transition-opacity py-2 sm:py-0">Terms</a>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} Fezer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default DeleteAccount;
