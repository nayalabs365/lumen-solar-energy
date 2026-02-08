'use client';

import { useState } from 'react';

export default function ChatWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    // In production, open actual chat widget
    alert('Chat with Lumen - Coming soon! For now, email concierge@lumensolar.energy');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 bg-navy text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Chat with Lumen
        <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-navy" />
      </div>

      {/* Chat Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-[60px] h-[60px] bg-gold rounded-full shadow-[0_8px_24px_rgba(245,158,11,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_32px_rgba(245,158,11,0.5)]"
      >
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />

        {/* Sun Icon */}
        <svg viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-7 h-7 relative z-10">
          <circle cx="24" cy="24" r="6" />
          <line x1="24" y1="8" x2="24" y2="12" />
          <line x1="24" y1="36" x2="24" y2="40" />
          <line x1="8" y1="24" x2="12" y2="24" />
          <line x1="36" y1="24" x2="40" y2="24" />
          <line x1="13" y1="13" x2="16" y2="16" />
          <line x1="32" y1="32" x2="35" y2="35" />
          <line x1="35" y1="13" x2="32" y2="16" />
          <line x1="16" y1="32" x2="13" y2="35" />
        </svg>
      </button>
    </div>
  );
}
