'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Section View Tracker Component
 *
 * Uses IntersectionObserver to track when major page sections scroll into viewport.
 * Fires 'page_section_view' events to Google Analytics.
 *
 * Sections must have data-section-name attribute to be tracked.
 */
export default function SectionViewTracker() {
  useEffect(() => {
    // Track which sections have already been viewed (only fire once per section)
    const viewedSections = new Set<string>();

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section-name');

            if (sectionName && !viewedSections.has(sectionName)) {
              // Mark as viewed
              viewedSections.add(sectionName);

              // Track the event
              trackEvent('page_section_view', {
                section_name: sectionName,
              });
            }
          }
        });
      },
      {
        // Trigger when 30% of the section is visible
        threshold: 0.3,
      }
    );

    // Find all sections with data-section-name and observe them
    const sections = document.querySelectorAll('[data-section-name]');
    sections.forEach((section) => observer.observe(section));

    // Cleanup on unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return null; // This component doesn't render anything
}
