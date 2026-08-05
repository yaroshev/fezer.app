import { ExternalLink } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import SiteFooter from '../components/SiteFooter';
import { CHANGELOG } from '../content/changelog';
import { INTRO_VIDEO, trackEvent } from '../seo/constants';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function WhatsNew() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/whats-new" />

      <main className="flex-1">
        <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              What’s new
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              App releases and notable additions to this site, newest first. Only things that have
              actually shipped appear here -  no roadmap promises.
            </p>
          </div>
        </header>

        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-14">
            <ol className="max-w-3xl space-y-10">
              {CHANGELOG.map((entry) => (
                <li
                  key={`${entry.date}-${entry.title}`}
                  className="rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-6 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                        entry.kind === 'app'
                          ? 'bg-[#0d2b57] text-white'
                          : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}
                    >
                      {entry.kind === 'app' ? `App ${entry.version ?? ''}`.trim() : 'Website'}
                    </span>
                    <time
                      dateTime={entry.date}
                      className="text-sm text-neutral-400 dark:text-neutral-500"
                    >
                      {formatDate(entry.date)}
                    </time>
                  </div>
                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">
                    {entry.title}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {entry.items.map((item) => (
                      <li
                        key={item.slice(0, 40)}
                        className="flex gap-3 text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400"
                      >
                        <span
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d2b57] dark:bg-blue-300"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-3xl text-[15px] text-neutral-500 leading-relaxed dark:text-neutral-400">
              For release notes as they ship, watch the{' '}
              <a
                href={INTRO_VIDEO.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('outbound_click', { link_location: 'whats-new-youtube' })}
                className="inline-flex items-center gap-1 font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
              >
                YouTube channel
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>{' '}
              or check the App Store listing.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <div className="rounded-3xl bg-[#0d2b57] p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Try the current version</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] sm:text-base text-blue-100 leading-relaxed">
              Free on the App Store -  no account, no ads, everything on your device.
            </p>
            <div className="mt-6 flex justify-center">
              <AppStoreButton location="whats-new-cta" className="!bg-white !text-[#0d2b57]" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
