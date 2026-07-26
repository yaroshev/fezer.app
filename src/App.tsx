import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';
import FeaturePage from './pages/FeaturePage';
import NotFound from './pages/NotFound';
import { FEATURE_PAGES } from './content/features';

function App({ path }: { path: string }) {
  const normalized = path.replace(/\/+$/, '') || '/';

  if (normalized === '/') return <Home />;
  if (normalized === '/privacypolicy' || normalized === '/privacy') return <PrivacyPolicy />;
  if (normalized === '/delete-account') return <DeleteAccount />;

  const feature = FEATURE_PAGES.find((page) => page.path === normalized);
  if (feature) return <FeaturePage content={feature} />;

  return <NotFound />;
}

export default App;
