import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/privacypolicy" />

      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight dark:text-neutral-100">Privacy Policy</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">Fezer for iOS · Last updated: July 11, 2026</p>

        <div className="mt-6 rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Summary</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            Fezer does not collect, transmit, sell, or share any personal data. The app has no account
            system, no analytics, no advertising, and no tracking. Everything you create in Fezer is
            stored locally on your device and stays there.
          </p>
        </div>

        <div className="mt-8 space-y-8 text-neutral-800 dark:text-neutral-200">
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 leading-relaxed">
              Fezer ("the app", "we", "our", or "us") is a personal day planner, time tracker, and goal
              tracker for iPhone and iPad. This Privacy Policy describes how the app and this website
              handle information. By using the app or the website, you agree to this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Data the App Collects</h2>
            <p className="mt-2 leading-relaxed">
              None. Fezer does not require an account or sign-in, and it does not send any data to us or
              to third parties. The app does not connect to any server operated by us, does not include
              third-party SDKs, and does not use analytics, advertising, or tracking technologies of any
              kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Where Your Content Is Stored</h2>
            <p className="mt-2 leading-relaxed">
              Everything you create in Fezer, including fronts, goals, steps, schedule blocks, checkpoints, time
              tracking history, notes, and attachments (photos and files), is stored locally in the
              app&apos;s private storage on your device. We have no access to it, and it is never uploaded
              to us or anyone else by the app.
            </p>
            <p className="mt-2 leading-relaxed">
              If you use Apple&apos;s device backup features (such as iCloud Backup or a computer backup),
              your Fezer data may be included in those backups like the data of any other app. Those
              backups are managed entirely by Apple under{' '}
              <a className="underline" href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple&apos;s privacy policy</a>;
              we cannot access them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Device Permissions</h2>
            <div className="mt-2 space-y-4">
              <div>
                <h3 className="font-medium">Camera (optional)</h3>
                <p className="mt-1 leading-relaxed">
                  If you choose to take a photo to attach to a step, the app asks for camera permission.
                  Photos you take are stored only in the app&apos;s local storage on your device. The
                  camera is never used without your action.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Photos</h3>
                <p className="mt-1 leading-relaxed">
                  Fezer uses Apple&apos;s system photo picker to let you attach images. With this picker,
                  the app never gains access to your photo library. Only the specific images you select
                  are copied into the app&apos;s local storage.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Files</h3>
                <p className="mt-1 leading-relaxed">
                  Fezer uses Apple&apos;s system document picker to let you attach files. Only the files
                  you select are copied into the app&apos;s local storage.
                </p>
              </div>
              <p className="leading-relaxed">
                You can revoke the camera permission at any time in iOS Settings. The app remains fully
                functional; the corresponding feature is simply unavailable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Analytics and Diagnostics</h2>
            <p className="mt-2 leading-relaxed">
              The app contains no analytics or crash-reporting SDKs. If you have opted in to share
              analytics with app developers in your iOS settings, Apple may provide us with aggregated,
              anonymized crash and usage statistics. That sharing is controlled by you in your device
              settings and governed by Apple&apos;s privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Deleting Your Data</h2>
            <p className="mt-2 leading-relaxed">
              You can delete any item (goals, blocks, attachments, and so on) inside the app at any time.
              Deleting the app from your device permanently removes all Fezer data stored on that
              device. Because there is no account and we hold no copy of your data, there is nothing for
              us to delete on a server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Children&apos;s Privacy</h2>
            <p className="mt-2 leading-relaxed">
              Fezer does not collect personal data from anyone, including children. The app is suitable
              for general audiences and contains no third-party content, ads, or external links that
              collect data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">This Website</h2>
            <p className="mt-2 leading-relaxed">
              This website is a static informational site. It does not set analytics or advertising
              cookies. Our hosting provider may process standard technical server logs (such as IP address,
              browser type, and request time) as necessary to serve and secure the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Changes to This Policy</h2>
            <p className="mt-2 leading-relaxed">
              If the app&apos;s data practices ever change (for example, if a future version adds optional
              sync), we will update this policy before those changes take effect and update the
              &quot;Last updated&quot; date above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Questions</h2>
            <p className="mt-2 leading-relaxed">
              Fezer stores all data on your device. See the sections above for how to manage or
              delete your information.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default PrivacyPolicy;
