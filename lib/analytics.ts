/**
 * Google Analytics Event Tracking Utility
 *
 * Safely tracks custom events to GA4. No-ops if gtag isn't loaded
 * (e.g., due to ad blockers or privacy tools).
 */

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
