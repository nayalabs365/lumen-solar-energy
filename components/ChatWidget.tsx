'use client';

import { useState } from 'react';

export default function ChatWidget() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // TODO: Integrate with actual chat system
    console.log('Opening Lumen chat...');
    alert('Chat functionality coming soon!');
  };

  return (
    <div className="fixed bottom-7 right-7 z-[999]">
      {/* Chat Label */}
      <div
        className={`absolute right-[76px] top-1/2 -translate-y-1/2 bg-white px-[18px] py-[10px] rounded-xl shadow-lg text-[0.85rem] font-semibold text-navy whitespace-nowrap transition-all duration-300 after:content-[''] after:absolute after:right-[-6px] after:top-1/2 after:-translate-y-1/2 after:rotate-45 after:w-3 after:h-3 after:bg-white ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        Chat with Lumen ✨
      </div>

      {/* Chat Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-16 h-16 rounded-full bg-gold border-none cursor-pointer shadow-[0_6px_30px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_8px_40px_rgba(245,158,11,0.5)] flex items-center justify-center animate-[pulse_2s_infinite]"
        aria-label="Chat with Lumen"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sun circle */}
          <circle cx="50" cy="50" r="22" fill="#1E3A5A" />
          {/* Sun rays */}
          <g stroke="#1E3A5A" strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="18" x2="50" y2="24" />
            <line x1="50" y1="76" x2="50" y2="82" />
            <line x1="18" y1="50" x2="24" y2="50" />
            <line x1="76" y1="50" x2="82" y2="50" />
            <line x1="27.4" y1="27.4" x2="31.6" y2="31.6" />
            <line x1="68.4" y1="68.4" x2="72.6" y2="72.6" />
            <line x1="72.6" y1="27.4" x2="68.4" y2="31.6" />
            <line x1="31.6" y1="68.4" x2="27.4" y2="72.6" />
          </g>
          {/* AI sparkle top-right */}
          <path
            d="M76 20 L78 26 L84 28 L78 30 L76 36 L74 30 L68 28 L74 26 Z"
            fill="#1E3A5A"
          />
          {/* AI sparkle bottom-left */}
          <path
            d="M24 64 L25.5 68 L29.5 69.5 L25.5 71 L24 75 L22.5 71 L18.5 69.5 L22.5 68 Z"
            fill="#1E3A5A"
            opacity="0.7"
          />
        </svg>
      </button>
    </div>
  );
}
