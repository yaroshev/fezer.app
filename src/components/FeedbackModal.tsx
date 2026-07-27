import React from 'react';
import { CheckCircle2, MessageSquare, X } from 'lucide-react';
import { createPortal } from 'react-dom';

type Status = 'idle' | 'submitting' | 'success' | 'error';
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function FeedbackModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [category, setCategory] = React.useState('suggestion');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [attachmentError, setAttachmentError] = React.useState('');
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const attachmentRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => messageRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
    setCategory('suggestion');
    setMessage('');
    setEmail('');
    setStatus('idle');
    setAttachmentError('');
    if (attachmentRef.current) attachmentRef.current.value = '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;

    const attachment = attachmentRef.current?.files?.[0];
    if (attachment && !ALLOWED_ATTACHMENT_TYPES.includes(attachment.type)) {
      setAttachmentError('Please choose a JPEG, PNG, or WebP image.');
      return;
    }
    if (attachment && attachment.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentError('Please choose an image smaller than 5 MB.');
      return;
    }

    setAttachmentError('');
    setStatus('submitting');
    const body = new FormData(event.currentTarget);
    body.set('message', message.trim());
    body.set('email', email.trim());
    body.set('page', window.location.pathname);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body,
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'feedback_submit', { feedback_category: category });
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-description"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl animate-mobile-modal-in dark:border-neutral-800 dark:bg-neutral-900 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d2b57] text-white">
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="feedback-title"
                className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
              >
                Share feedback
              </h2>
              <p
                id="feedback-description"
                className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
              >
                Tell us what would make Fezer better. Every message is read.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            aria-label="Close feedback form"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="mt-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-600 dark:text-green-400" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-neutral-900 dark:text-neutral-100">
              Thanks for helping improve Fezer
            </h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Your feedback has been received.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="btn-press mt-5 rounded-full bg-[#0d2b57] px-6 py-2.5 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            name="feedback"
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
            data-netlify="true"
            netlify-honeypot="bot-field"
            encType="multipart/form-data"
          >
            <input type="hidden" name="form-name" value="feedback" />
            <input type="hidden" name="page" value="" />
            <p className="hidden" aria-hidden="true">
              <label>
                Leave this field empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div>
              <label
                htmlFor="feedback-category"
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Feedback type
              </label>
              <select
                id="feedback-category"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
              >
                <option value="suggestion">Suggestion</option>
                <option value="issue">Problem or issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="feedback-message"
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Your feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={messageRef}
                id="feedback-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What would you like us to know?"
                className="mt-2 w-full resize-y rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>
            <div>
              <label
                htmlFor="feedback-email"
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Email <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <input
                id="feedback-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
              <p className="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                Add your email only if you would like a reply.
              </p>
            </div>
            <div>
              <label
                htmlFor="feedback-attachment"
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Screenshot <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <input
                ref={attachmentRef}
                id="feedback-attachment"
                name="attachment"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    setAttachmentError('');
                  } else if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
                    setAttachmentError('Please choose a JPEG, PNG, or WebP image.');
                    event.target.value = '';
                  } else if (file.size > MAX_ATTACHMENT_SIZE) {
                    setAttachmentError('Please choose an image smaller than 5 MB.');
                    event.target.value = '';
                  } else {
                    setAttachmentError('');
                  }
                }}
                className="mt-2 block w-full text-sm text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-neutral-100 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-neutral-700 hover:file:bg-neutral-200 dark:text-neutral-400 dark:file:bg-neutral-800 dark:file:text-neutral-200 dark:hover:file:bg-neutral-700"
              />
              <p className="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                JPEG, PNG, or WebP. Maximum 5 MB.
              </p>
              {attachmentError && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {attachmentError}
                </p>
              )}
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={!message.trim() || status === 'submitting'}
              className="btn-press w-full rounded-full bg-[#0d2b57] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending...' : 'Send feedback'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
