// Build-time prerendering: renders every route to static HTML with
// route-specific <head> tags, and generates sitemap.xml from the same
// route list. Runs after `vite build` (client) and the SSR build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');

const { render, ROUTES_META, APP_STORE_ID, SITE_URL } = await import(
  path.join(root, 'dist-server/entry-server.js')
);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHead(route) {
  const url = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const image = `${SITE_URL}/fezer-app-icon.png`;

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${route.robots}" />`,
  ];

  if (route.indexable) {
    tags.push(`<link rel="canonical" href="${url}" />`);
  }

  tags.push(
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="apple-itunes-app" content="app-id=${APP_STORE_ID}, app-argument=${url}" />`
  );

  if (route.jsonLd) {
    // Escape closing tags so the JSON cannot break out of the script element.
    const json = JSON.stringify(route.jsonLd).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join('\n    ');
}

// Flat files (`about.html`), not directories (`about/index.html`). With Netlify's
// pretty_urls enabled, a flat file is served at its extensionless path with a 200,
// so /time-blocking-app resolves directly. A directory would instead make Netlify
// 301 /time-blocking-app -> /time-blocking-app/, which conflicts with the
// slash-less canonical and sitemap entries below and reads to Googlebot as a
// redirect error. Keep this in sync with the URLs built in buildHead/sitemap.
function outputPathFor(routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html');
  if (routePath === '/404') return path.join(distDir, '404.html'); // Netlify custom 404 page
  return path.join(distDir, `${routePath.slice(1)}.html`);
}

for (const route of ROUTES_META) {
  const appHtml = render(route.path === '/404' ? '/__not_found__' : route.path);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--app-head-->', buildHead(route))
    .replace('<!--app-html-->', appHtml);

  const outPath = outputPathFor(route.path);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${route.path} -> ${path.relative(root, outPath)}`);
}

// Sitemap: indexable routes only, kept in sync with the prerendered pages.
const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = ROUTES_META.filter((route) => route.indexable)
  .map((route) => {
    const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    const priority = route.path === '/' ? '1.0' : route.path === '/privacypolicy' ? '0.3' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log('generated sitemap.xml');
