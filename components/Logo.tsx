export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Sun Icon */}
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Sun Rays */}
          <g className="text-orange">
            {/* Top ray */}
            <line x1="50" y1="5" x2="50" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Top-right ray */}
            <line x1="78" y1="22" x2="68" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Right ray */}
            <line x1="95" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Bottom-right ray */}
            <line x1="78" y1="78" x2="68" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Bottom ray */}
            <line x1="50" y1="95" x2="50" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Bottom-left ray */}
            <line x1="22" y1="78" x2="32" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Left ray */}
            <line x1="5" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Top-left ray */}
            <line x1="22" y1="22" x2="32" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Sun Circle */}
          <circle cx="50" cy="50" r="18" className="fill-orange" />

          {/* Optional: Inner glow/highlight */}
          <circle cx="50" cy="50" r="18" className="fill-orange opacity-80" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy tracking-wide">LUMEN</h1>
        <p className="text-sm font-semibold text-orange tracking-widest">SOLAR CONCIERGE</p>
      </div>
    </div>
  )
}
