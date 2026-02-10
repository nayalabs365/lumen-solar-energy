'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/your-report', label: 'Your Report' },
    { href: '/local-installers', label: 'Local Installers' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/92 backdrop-blur-[20px] border-b border-navy/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline">
          <div className="flex flex-col leading-[1.1]">
            <span className="font-serif text-[1.65rem] text-navy font-normal tracking-[1px] whitespace-nowrap">
              LUMEN
            </span>
            <span className="font-sans text-[0.52rem] text-gold uppercase font-bold mt-[2px] whitespace-nowrap tracking-[4.8px]">
              SOLAR CONCIERGE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative no-underline text-text text-[0.9rem] font-medium transition-colors duration-300 hover:text-navy after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://start.lumensolar.energy"
              className="inline-block bg-navy text-white px-[22px] py-[10px] rounded-[50px] font-semibold text-[0.85rem] transition-all duration-300 border-2 border-navy hover:bg-transparent hover:text-navy no-underline"
            >
              Chat with Lumen Now
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden bg-transparent border-none cursor-pointer p-2 flex flex-col gap-[5px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-[2px] bg-navy rounded-[2px] transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-navy rounded-[2px] transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-navy rounded-[2px] transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-navy/[0.06] shadow-lg">
          <ul className="flex flex-col list-none p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-text text-[0.95rem] font-medium no-underline hover:text-navy transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://start.lumensolar.energy"
                className="block text-center bg-navy text-white px-6 py-3 rounded-[50px] font-semibold text-[0.9rem] no-underline mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat with Lumen Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
