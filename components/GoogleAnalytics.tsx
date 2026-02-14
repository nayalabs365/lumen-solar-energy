'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Google Analytics 4 Component
 *
 * Loads the correct GA4 Measurement ID based on subdomain:
 * - start.lumensolar.energy → G-X6JTZKLKJV
 * - lumensolar.energy → G-XCEKPBK0EB (default)
 *
 * Uses next/script with afterInteractive strategy to avoid blocking page render.
 */
export default function GoogleAnalytics() {
  const [measurementId, setMeasurementId] = useState<string | null>(null);

  useEffect(() => {
    // Detect which subdomain we're on
    const hostname = window.location.hostname;

    let gaId: string;

    if (hostname.includes('start.')) {
      // Lead form subdomain
      gaId =
        process.env.NEXT_PUBLIC_GA_ID_FORM || 'G-X6JTZKLKJV';
    } else {
      // Main website (default)
      gaId =
        process.env.NEXT_PUBLIC_GA_ID_MAIN || 'G-XCEKPBK0EB';
    }

    setMeasurementId(gaId);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    // Set current date
    window.gtag('js', new Date());

    // Configure GA with the correct measurement ID
    window.gtag('config', gaId);
  }, []);

  // Don't render scripts until we know which ID to use
  if (!measurementId) return null;

  return (
    <>
      {/* Load gtag.js external script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
