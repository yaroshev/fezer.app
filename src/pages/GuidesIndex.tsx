import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import SiteFooter from '../components/SiteFooter';
import { GUIDES } from '../content/guides';

export default function GuidesIndex() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/guides" />

      <main className="flex-1">
        <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Guides to planning days that hold
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              Practical, tool-agnostic guides to time blocking, honest estimation, weekly reviews
              and goals that reach the calendar. Everything here works with a paper notebook; Fezer
              just makes the loop effortless.
            </p>
          </div>
        </header>

        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-14">
            <ul className="grid gap-5 md:grid-cols-2">
              {GUIDES.map((guide) => (
                <li key={guide.path}>
                  <a
                    href={guide.path}
                    className="group block h-full rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-6 sm:p-7 hover:border-neutral-300 hover:bg-white transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#0d2b57] dark:text-blue-300">
                      Guide · {guide.readMinutes} min
                    </p>
                    <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-[#0d2b57] transition-colors dark:group-hover:text-blue-300">
                      {guide.h1}
                    </h2>
                    <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400">
                      {guide.intro}
                    </p>
                    <span className="mt-4 inline-block text-[15px] font-medium text-[#0d2b57] dark:text-blue-300">
                      Read the guide →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <div className="rounded-3xl bg-[#0d2b57] p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              The app these guides grew out of
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] sm:text-base text-blue-100 leading-relaxed">
              Fezer turns the whole loop -  plan, track, compare, review -  into one private app.
              Free, no account, everything on your device.
            </p>
            <div className="mt-6 flex justify-center">
              <AppStoreButton location="guides-cta" className="!bg-white !text-[#0d2b57]" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
