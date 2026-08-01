import { FEATURE_PAGES } from '../content/features';
import { COMPARISON_PAGES } from '../content/comparisons';
import { APP_STORE_URL, SITE_URL, SCREENSHOTS } from './constants';

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  robots: string;
  /** Included in sitemap.xml generation and OG url/canonical. */
  indexable: boolean;
  /**
   * Filename (without extension) of the pre-generated 1200x630 card in
   * /public/og. Cards are committed to the repo; regenerate with `npm run og`.
   */
  ogSlug?: string;
  jsonLd?: object;
};

/** Social cards are 1200x630 so they render as large previews, not thumbnails. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export function ogImageUrl(slug?: string) {
  return `${SITE_URL}/og/${slug ?? 'default'}.png`;
}

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Fezer',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/fezer-app-icon.png`,
  },
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Fezer',
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#organization` },
  description:
    'Fezer is a private day planner, time tracker, goal planner and vision board app for iPhone and iPad.',
};

const SOFTWARE_APPLICATION = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#app`,
  name: 'Fezer Planner',
  alternateName: 'Fezer',
  applicationCategory: 'ProductivityApplication',
  applicationSubCategory: 'Day Planner',
  operatingSystem: 'iOS, iPadOS',
  softwareVersion: '1.0',
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  image: `${SITE_URL}/fezer-app-icon.png`,
  screenshot: [
    `${SITE_URL}${SCREENSHOTS.timeBlocking}`,
    `${SITE_URL}${SCREENSHOTS.timeTracker}`,
    `${SITE_URL}${SCREENSHOTS.goalPlanner}`,
    `${SITE_URL}${SCREENSHOTS.visionBoard}`,
  ],
  url: `${SITE_URL}/`,
  description:
    'Fezer is a private day planner, time tracker, goal planner and vision board app. Plan with time blocks, track where your time goes and move your goals forward. All data stays on your device.',
  featureList: [
    'Day planning with time blocks',
    'Time blocking with repeating blocks',
    'One-tap time tracking with checkpoints',
    'Goal planning with fronts, goals and steps',
    'Vision boards for goals and life areas',
    'Plan vs. reality analytics',
  ],
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

function featurePageJsonLd(path: string, title: string, description: string) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION,
      WEBSITE,
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#app` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
    ],
  };
}

/**
 * Comparison pages get the same graph plus a FAQPage node. The questions and
 * answers must match the visible copy on the page -- Google requires the marked-up
 * content to be present on the page itself, and mismatches risk a manual action.
 */
function comparisonPageJsonLd(
  path: string,
  title: string,
  description: string,
  faq: { q: string; a: string }[]
) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION,
      WEBSITE,
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#app` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export const ROUTES_META: RouteMeta[] = [
  {
    path: '/',
    title: 'Fezer -  Day Planner, Time Tracker & Goal Planner App',
    description:
      'Fezer is a private day planner, time tracker, goal planner and vision board app. Plan with time blocks, track where your time goes and move your goals forward.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'default',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORGANIZATION, WEBSITE, SOFTWARE_APPLICATION],
    },
  },
  ...FEATURE_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    robots: 'index, follow',
    indexable: true,
    // Feature page slugs match their card filenames in /public/og.
    ogSlug: page.path.slice(1),
    jsonLd: featurePageJsonLd(page.path, page.title, page.metaDescription),
  })),
  ...COMPARISON_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    robots: 'index, follow',
    indexable: true,
    ogSlug: page.ogSlug,
    jsonLd: comparisonPageJsonLd(page.path, page.title, page.metaDescription, page.faq),
  })),
  {
    path: '/privacypolicy',
    title: 'Privacy Policy -  Fezer',
    description:
      'How Fezer handles your data: no accounts, no analytics, no tracking. Everything you create in the app stays on your device.',
    robots: 'index, follow',
    indexable: true,
  },
  {
    path: '/delete-account',
    title: 'Delete Your Data -  Fezer',
    description:
      'How to delete your Fezer data. Fezer stores everything on your device, so removing the app removes all of your data.',
    robots: 'noindex, follow',
    indexable: false,
  },
  {
    path: '/404',
    title: 'Page Not Found -  Fezer',
    description: 'The page you are looking for does not exist.',
    robots: 'noindex, follow',
    indexable: false,
  },
];
