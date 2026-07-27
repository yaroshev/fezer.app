import React from 'react';
import { createPortal } from 'react-dom';

const ANDROID_PATH =
  'M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BetaAccessModal({
  open,
  onClose,
  location,
}: {
  open: boolean;
  onClose: () => void;
  location: string;
}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
    setStatus('idle');
    setName('');
    setEmail('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus('submitting');

    const body = new URLSearchParams();
    body.append('form-name', 'beta-access');
    body.append('name', name.trim());
    body.append('email', email.trim());

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'beta_access_request', { link_location: location });
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      aria-modal="true"
      role="dialog"
      aria-labelledby="beta-access-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-neutral-200/80 p-6 sm:p-7 animate-mobile-modal-in dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={ANDROID_PATH} />
              </svg>
            </div>
            <div>
              <h2
                id="beta-access-title"
                className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
              >
                Request beta access
              </h2>
              <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                Android is in limited beta. Share your name and email and we&apos;ll send you an
                invite when a slot opens.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors dark:hover:bg-neutral-800 dark:hover:text-neutral-200 shrink-0"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800 dark:bg-green-950/40 dark:border-green-900 dark:text-green-300">
            Thanks! Your request has been received. We&apos;ll email you when Android access opens
            up.
          </div>
        ) : (
          <form
            name="beta-access"
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="beta-access" />
            <div>
              <label
                htmlFor="beta-access-name"
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="beta-access-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>
            <div>
              <label
                htmlFor="beta-access-email"
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="beta-access-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-[#0d2b57] text-white px-6 py-3 text-sm font-semibold btn-press disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!name.trim() || !email.trim() || status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit request'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
