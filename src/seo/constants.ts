export const SITE_URL = 'https://fezer.app';
export const APP_STORE_URL = 'https://apps.apple.com/ca/app/fezer-planner/id6790143164';
export const APP_STORE_ID = '6790143164';

export const SCREENSHOTS = {
  goalPlanner: '/images/fezer-goal-planner.webp',
  timeBlocking: '/images/fezer-time-blocking-planner.webp',
  timeTracker: '/images/fezer-time-tracker.webp',
  visionBoard: '/images/fezer-vision-board-app.webp',
};

export function trackStoreClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'app_store_click', { link_location: location });
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
