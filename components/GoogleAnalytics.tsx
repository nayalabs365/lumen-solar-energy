'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 Component
 *
 * Loads the correct GA4 Measurement ID based on subdomain:
 * - start.lumensolar.energy → G-X6JTZKLKJV
 * - lumensolar.energy → G-XCEKPBK0EB (default)
 *
 * Uses next/script with afterInteractive strategy to avoid blocking page render.
 * Initialization script runs AFTER gtag.js loads to ensure proper setup.
 */
export default function GoogleAnalytics() {
  // Detect hostname at render time (safe in client component)
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const measurementId = hostname.includes('start.')
    ? (process.env.NEXT_PUBLIC_GA_ID_FORM || 'G-X6JTZKLKJV')
    : (process.env.NEXT_PUBLIC_GA_ID_MAIN || 'G-XCEKPBK0EB');

  return (
    <>
      {/* Load gtag.js external script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      {/* Initialize GA4 - runs AFTER gtag.js loads */}
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
