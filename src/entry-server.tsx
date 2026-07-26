import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { ROUTES_META } from './seo/meta';
export { APP_STORE_ID, SITE_URL } from './seo/constants';

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  );
}
