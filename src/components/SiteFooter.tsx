import { FEATURE_PAGES } from '../content/features';
import { APP_STORE_URL, trackStoreClick } from '../seo/constants';

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-neutral-200/80 bg-white safe-area-bottom dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <img src="/fezer-app-icon.png" alt="Fezer app icon" className="w-8 h-8 rounded-lg" />
              <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Fezer</span>
            </div>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">
              A private day planner, time tracker and goal planner for iPhone and iPad.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackStoreClick('footer')}
              className="mt-4 inline-block text-sm font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
            >
              Download Fezer on the App Store
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Explore Fezer</h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                {FEATURE_PAGES.slice(0, 3).map((page) => (
                  <li key={page.path}>
                    <a href={page.path} className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      {page.navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Go further</h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                {FEATURE_PAGES.slice(3).map((page) => (
                  <li key={page.path}>
                    <a href={page.path} className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      {page.navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Legal</h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>
                  <a href="/privacypolicy" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} Fezer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
