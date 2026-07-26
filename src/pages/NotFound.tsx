import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">
          The page you are looking for does not exist or has moved.
        </p>
        <a
          href="/"
          className="btn-press mt-8 inline-flex items-center justify-center rounded-full bg-[#0d2b57] text-white px-6 py-3 text-sm font-semibold"
        >
          Back to the homepage
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
