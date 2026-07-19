import React from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Zap, Calendar, Target, Timer, PieChart, Paperclip, ShieldCheck } from 'lucide-react';
import Nav from './components/Nav';

const APP_STORE_URL = 'https://apps.apple.com/ca/app/fezer-planner/id6790143164';

function AppleLogoIcon({ className = 'h-5 w-5 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const FEATURES = [
  {
    title: 'Now',
    desc: 'One glance shows your current commitment: what is live, what is next, and what is due.',
    Icon: Zap,
  },
  {
    title: 'Schedule',
    desc: 'Plan your day in time blocks, then switch to Track and Compare to see how the day really went.',
    Icon: Calendar,
  },
  {
    title: 'Goals & Fronts',
    desc: 'Organize goals into fronts, break them into steps, and commit steps straight onto your schedule.',
    Icon: Target,
  },
  {
    title: 'Time tracking',
    desc: 'Start tracking with one tap and add checkpoints along the way to capture how the work unfolded.',
    Icon: Timer,
  },
  {
    title: 'Analytics',
    desc: 'See where your time actually went, broken down by front and goal across the day or week.',
    Icon: PieChart,
  },
  {
    title: 'Notes & attachments',
    desc: 'Attach photos and files to steps and blocks. Everything is stored locally on your device.',
    Icon: Paperclip,
  },
];

function App() {
  const [activeSection, setActiveSection] = React.useState<string>('top');

  // Track active section for nav (home page only)
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') return;

    const sections = ['top', 'features', 'privacy'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || 'top';
            setActiveSection(id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lightweight routing without react-router
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path === '/privacypolicy' || path === '/privacy') {
      return <PrivacyPolicy />;
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activeId={activeSection} />
      <main id="top" className="relative">
        {/* Mobile hero */}
        <div className="md:hidden min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-5 pt-10 pb-8 bg-[#fafafa] dark:bg-neutral-950">
            <div className="flex w-full max-w-[280px] flex-col items-stretch animate-fade-up">
              <img
                src="/fezer-app-icon.png"
                alt="Fezer app icon"
                className="aspect-square w-full rounded-[22%] shadow-lg shadow-[#0d2b57]/20 dark:shadow-[#0d2b57]/40"
              />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0d2b57] text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                aria-label="Download Fezer on the App Store"
              >
                <AppleLogoIcon />
                Download on the App Store
              </a>
            </div>
          </div>
        </div>

        {/* Desktop hero */}
        <div className="hidden md:flex mx-auto w-full max-w-7xl px-6 lg:px-10 items-center justify-center min-h-[calc(100dvh-4rem)] bg-[#fafafa] dark:bg-neutral-950">
          <div className="relative flex flex-col items-center justify-center animate-fade-up">
            <img src="/fezer-app-icon.png" alt="Fezer app icon large" className="w-52 h-52 lg:w-64 lg:h-64 rounded-[3rem] shadow-2xl shadow-[#0d2b57]/25 animate-float" />
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#0d2b57] text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              aria-label="Download Fezer on the App Store"
            >
              <AppleLogoIcon />
              Download on the App Store
            </a>
          </div>
        </div>
      </main>

      <section className="w-full bg-[#fafafa] dark:bg-neutral-950">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
          <div className="rounded-3xl border border-neutral-200/60 bg-white p-6 sm:p-8 md:p-12 lg:p-16 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] animate-fade-up dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:shadow-none">
            <div className="flex items-center gap-4 mb-4">
              <img src="/fezer-app-icon.png" alt="Fezer app icon" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl shrink-0 shadow-md shadow-[#0d2b57]/15" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Fezer</h1>
            </div>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed dark:text-neutral-400">
              Plan your day. Track your time. Move your goals forward.
            </p>
            <p className="mt-3 text-base sm:text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed md:hidden dark:text-neutral-400">
              For iPhone and iPad. Private by design. Everything stays on your device.
            </p>
            <p className="mt-3 hidden md:block text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed dark:text-neutral-400">
              Plan your day in time blocks, track your time, and move your goals forward in one focused app for iPhone and iPad.
            </p>
            <p className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Your day, on your device.</p>
            <div className="mt-6 sm:mt-8">
              <a
                href="/privacypolicy"
                className="btn-press inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 px-6 py-3 text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-colors duration-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">One place for your day</h2>
            <p className="mt-2 sm:mt-3 text-neutral-500 max-w-2xl text-[15px] sm:text-base leading-relaxed dark:text-neutral-400">
              Fezer brings your commitments, schedule, and goals together so you always know what to work on now.
            </p>
          </div>
          {/* Mobile: horizontal scroll carousel */}
          <div className="md:hidden -mx-4 overflow-x-auto mobile-feature-scroll pb-2">
            <div className="flex gap-4 pl-4 pr-4" style={{ width: 'max-content' }}>
              {FEATURES.map(({ title, desc, Icon }) => (
                <div key={title} className="mobile-feature-snap w-[280px] shrink-0 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm active:scale-[0.99] transition-transform dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none" aria-label={title}>
                  <div className="w-11 h-11 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h3>
                  <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed dark:text-neutral-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ title, desc, Icon }, i) => (
              <div key={title} className="rounded-2xl border border-neutral-200/60 bg-white p-5 hover-lift opacity-0 animate-fade-up dark:border-neutral-800 dark:bg-neutral-900" style={{ animationDelay: `${0.15 + i * 0.05}s` }} aria-label={title}>
                <div className="card-icon-hover w-10 h-10 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="w-full bg-white dark:bg-neutral-950">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <div className="rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-[#e8f1ff] to-[#fafafa] p-6 sm:p-10 md:p-12 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0d2b57] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Private by design</h2>
                <p className="mt-3 text-neutral-600 max-w-3xl text-[15px] sm:text-base leading-relaxed dark:text-neutral-400">
                  Fezer works entirely on your device. There is no account to create, no sign-in, and no server.
                  Your goals, schedule, tracking history, notes, and attachments are stored locally on your iPhone or iPad
                  and are never sent to us or anyone else. No analytics, no ads, no tracking.
                </p>
                <a
                  href="/privacypolicy"
                  className="btn-press mt-6 inline-flex items-center justify-center rounded-full bg-[#0d2b57] text-white px-6 py-3 text-sm font-semibold"
                >
                  Read the full Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-neutral-200/80 bg-white safe-area-bottom dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-app-icon.png" alt="Fezer logo" className="w-7 h-7 rounded-lg" />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Fezer</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <a href="/privacypolicy" className="link-underline hover:text-neutral-900 transition-colors duration-200 font-medium dark:hover:text-neutral-100">Privacy Policy</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">© {new Date().getFullYear()} Fezer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
