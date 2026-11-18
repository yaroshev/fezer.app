import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

/**
 * Where a Fezer QR code points: fezer.app/scan?code=... With Fezer installed,
 * iOS opens the app straight to that item and this page never loads. Without
 * it, this is what the Camera app opens, so it says what the code is and how
 * to get the app that reads it.
 */
export default function ScanPage() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav variant="minimal" />
      <main className="flex-1 mx-auto w-full max-w-xl px-4 sm:px-6 py-16 sm:py-24 text-center">
        <img
          src="/fezer-app-icon.png"
          alt="Fezer app icon"
          width={1024}
          height={1024}
          className="mx-auto h-16 w-16 rounded-[22%] object-cover shadow-xl shadow-[#0d2b57]/25"
        />
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">This is a Fezer item label</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Open it with Fezer to see the item, where it is kept, and what is inside it. Install Fezer, then scan the
          code again.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <AppStoreButton location="scan" eventName="scan_app_store_click" />
          <BetaAccessButton location="scan" eventName="scan_google_play_click" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
