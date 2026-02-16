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
 * Detects hostname after mount to avoid SSR hydration mismatches.
 * Scripts render immediately with both measurement IDs embedded in initialization.
 */
export default function GoogleAnalytics() {
  const [mounted, setMounted] = useState(false);

  // Only run after component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Inline script detects hostname and loads correct gtag.js */}
      <Script id="ga-detect-and-load" strategy="afterInteractive">
        {`
          (function() {
            var hostname = window.location.hostname;
            var measurementId = hostname.includes('start.')
              ? '${process.env.NEXT_PUBLIC_GA_ID_FORM || 'G-X6JTZKLKJV'}'
              : '${process.env.NEXT_PUBLIC_GA_ID_MAIN || 'G-XCEKPBK0EB'}';

            // Initialize dataLayer
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            // Load gtag.js script
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
            document.head.appendChild(script);

            // Initialize GA4 after script loads
            script.onload = function() {
              gtag('js', new Date());
              gtag('config', measurementId);
            };
          })();
        `}
      </Script>
    </>
  );
}
