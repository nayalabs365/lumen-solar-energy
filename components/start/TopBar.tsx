'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function TopBar() {
  useEffect(() => {
    // Align logo text dynamically based on font load
    alignLogoText();

    // Listen for font load
    if (document.fonts) {
      document.fonts.ready.then(alignLogoText);
    }
  }, []);

  const alignLogoText = () => {
    const logo = document.querySelector('.tb-logo');
    const main = logo?.querySelector('.tb-logo-main') as HTMLElement;
    const sub = logo?.querySelector('.tb-logo-sub') as HTMLElement;

    if (!main || !sub) return;

    const tw = main.offsetWidth;
    sub.style.letterSpacing = '0px';
    const bw = sub.offsetWidth;
    const t = sub.textContent?.replace(/\s/g, '') || '';
    const g = t.length - 1;

    if (g > 0 && tw > bw) {
      sub.style.letterSpacing = `${(tw - bw) / g}px`;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-[20px] border-b border-navy/[0.06] px-12 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="tb-logo flex flex-col leading-[1.1] no-underline">
        <span className="tb-logo-main font-serif text-[1.35rem] text-navy tracking-[0.5px]">
          LUMEN
        </span>
        <span className="tb-logo-sub font-sans text-[0.42rem] text-gold uppercase font-bold mt-[1px] tracking-[4px]">
          SOLAR CONCIERGE
        </span>
      </Link>

      {/* Exit Link */}
      <Link
        href="/"
        className="text-[0.85rem] text-text-light no-underline flex items-center gap-[6px] transition-colors duration-300 hover:text-navy"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Exit
      </Link>
    </div>
  );
}
