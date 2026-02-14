'use client';

import { trackEvent } from '@/lib/analytics';
import { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  className: string;
  location: 'hero' | 'navbar' | 'footer' | 'savings_section';
  children: ReactNode;
}

/**
 * CTA Button with Google Analytics tracking
 *
 * Tracks cta_click events with button_location parameter
 */
export default function CTAButton({
  href,
  className,
  location,
  children,
}: CTAButtonProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent('cta_click', { button_location: location })}
    >
      {children}
    </a>
  );
}
