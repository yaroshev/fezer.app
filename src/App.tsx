import React from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Zap, Calendar, Target, Timer, PieChart, Paperclip, ShieldCheck } from 'lucide-react';
import Nav from './components/Nav';

const FEATURES = [
  {
    title: 'Now',
    desc: 'One glance shows your current commitment — what is live, what is next, and what is due.',
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
    desc: 'See where your time actually went — broken down by front and goal across the day or week.',
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
    <div className="min-h-screen w-full bg-[#fafafa] text-black flex flex-col">
      <Nav activeId={activeSection} />
      <main id="top" className="relative">
        {/* Mobile hero */}
        <div className="md:hidden min-h-[90dvh] flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-5 pt-10 pb-12" style={{ background: 'var(--fezer-hero-mobile)' }}>
            <div className="flex flex-col items-center text-center animate-fade-up w-full">
              <img src="/fezer-app-icon.png" alt="Fezer app icon" className="w-24 h-24 rounded-[1.6rem] shadow-lg shadow-[#0d2b57]/20 phone-glow" />
              <h1 className="mt-5 text-[2.25rem] sm:text-[2.75rem] font-semibold tracking-tight text-neutral-900">
                Fezer
              </h1>
              <p className="mt-2 text-base text-neutral-600 leading-snug max-w-[320px]">
                Plan your day. Track your time. Move your goals forward.
              </p>
              <p className="mt-1.5 text-sm text-neutral-500 max-w-[320px]">
                For iPhone and iPad. Private by design — everything stays on your device.
              </p>
            </div>
            <div className="mt-7 flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: '0.12s' }}>
              <span className="inline-flex items-center rounded-full bg-white border-2 border-neutral-200 text-neutral-700 px-5 py-3 text-sm font-semibold">
                Coming soon to the App Store
              </span>
              <a href="/privacypolicy" className="text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900">
                Read our Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Desktop hero */}
        <div className="hidden md:flex mx-auto w-full max-w-7xl px-6 lg:px-10 items-center min-h-[85vh]">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 items-stretch w-full">
            <div className="md:col-span-2 animate-fade-up">
              <div className="h-full min-h-[480px] rounded-3xl border border-neutral-200/60 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/fezer-app-icon.png" alt="Fezer app icon" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl transition-transform duration-300 hover:scale-105 shrink-0 shadow-md shadow-[#0d2b57]/15" />
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900">Fezer</h1>
                  </div>
                  <p className="mt-6 text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
                    Plan your day in time blocks, track your time, and move your goals forward — in one focused app for iPhone and iPad.
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">Your day, on your device.</p>
                </div>
                <div className="mt-8 flex flex-row items-center gap-4">
                  <span className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium">
                    Coming soon to the App Store
                  </span>
                  <a
                    href="/privacypolicy"
                    className="btn-press inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 px-6 py-3 text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-full min-h-[480px] flex items-center justify-center">
                <div className="pointer-events-none absolute -top-2 right-6 w-16 h-16 rounded-full opacity-25 blur-2xl -z-10" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(159,232,230,0.6), rgba(29,74,104,0) 60%)' }} aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-10 left-8 w-14 h-14 rounded-full opacity-25 blur-2xl -z-10" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(29,74,104,0.3), rgba(159,232,230,0) 60%)' }} aria-hidden="true" />
                <img src="/fezer-app-icon.png" alt="Fezer app icon large" className="w-52 h-52 lg:w-64 lg:h-64 rounded-[3rem] shadow-2xl shadow-[#0d2b57]/25 animate-float phone-glow" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold tracking-tight text-neutral-900">One place for your day</h2>
            <p className="mt-2 sm:mt-3 text-neutral-500 max-w-2xl text-[15px] sm:text-base leading-relaxed">
              Fezer brings your commitments, schedule, and goals together so you always know what to work on now.
            </p>
          </div>
          {/* Mobile: horizontal scroll carousel */}
          <div className="md:hidden -mx-4 overflow-x-auto mobile-feature-scroll pb-2">
            <div className="flex gap-4 pl-4 pr-4" style={{ width: 'max-content' }}>
              {FEATURES.map(({ title, desc, Icon }) => (
                <div key={title} className="mobile-feature-snap w-[280px] shrink-0 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm active:scale-[0.99] transition-transform" aria-label={title}>
                  <div className="w-11 h-11 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900">{title}</h3>
                  <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ title, desc, Icon }, i) => (
              <div key={title} className="rounded-2xl border border-neutral-200/60 bg-white p-5 hover-lift opacity-0 animate-fade-up" style={{ animationDelay: `${0.15 + i * 0.05}s` }} aria-label={title}>
                <div className="card-icon-hover w-10 h-10 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900">{title}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="w-full bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <div className="rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-[#e8f1ff] to-[#fafafa] p-6 sm:p-10 md:p-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0d2b57] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Private by design</h2>
                <p className="mt-3 text-neutral-600 max-w-3xl text-[15px] sm:text-base leading-relaxed">
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

      <footer className="w-full border-t border-neutral-200/80 bg-white safe-area-bottom">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-app-icon.png" alt="Fezer logo" className="w-7 h-7 rounded-lg" />
              <span className="text-sm font-medium text-neutral-800">Fezer</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600">
              <a href="/privacypolicy" className="link-underline hover:text-neutral-900 transition-colors duration-200 font-medium">Privacy Policy</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400">© {new Date().getFullYear()} Fezer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
