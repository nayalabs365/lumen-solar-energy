import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-warm-white py-[60px] overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-5%] right-[-3%] w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(30,58,90,1)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(30,58,90,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="relative z-[2]">
              <div className="inline-flex items-center gap-2 bg-white border border-gold-pale px-[18px] py-2 rounded-[50px] text-[0.8rem] font-semibold text-gold mb-7 shadow-sm animate-[fadeInUp_0.8s_ease_both]">
                <span className="w-2 h-2 bg-gold rounded-full animate-[pulse_2s_infinite]" />
                Your AI Solar Concierge
              </div>

              <h1 className="font-serif text-[3.6rem] leading-[1.2] mb-6 text-navy animate-[fadeInUp_0.8s_ease_0.15s_both]">
                Meet Lumen — your <em className="italic text-gold">personal</em> solar concierge.
              </h1>

              <p className="text-[1.15rem] text-text-light mb-9 max-w-[520px] leading-[1.8] animate-[fadeInUp_0.8s_ease_0.3s_both]">
                Lumen does what you shouldn&apos;t have to. It analyzes your home, researches your options,
                and finds the right local installer for you — so you never have to deal with pushy sales
                calls or confusing quotes.
              </p>

              <div className="flex gap-4 items-center flex-wrap animate-[fadeInUp_0.8s_ease_0.45s_both]">
                <Link
                  href="https://start.lumensolar.energy"
                  className="inline-flex items-center gap-[10px] bg-gold text-navy font-bold px-8 py-4 rounded-[50px] text-[1rem] no-underline transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)]"
                >
                  Get Started — It&apos;s Free
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <p className="mt-5 text-[0.82rem] text-text-light animate-[fadeInUp_0.8s_ease_0.6s_both]">
                Get your free solar report in 60 seconds. No spam. No sales calls.
              </p>
            </div>

            {/* Right Visual */}
            <div className="relative z-[2] animate-[fadeInRight_1s_ease_0.3s_both]">
              <div className="relative rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(30,58,90,0.15)] bg-gradient-to-br from-[#e8f4f8] via-[#d4eaf5] to-[#c9e0f0] flex items-center justify-center p-10">
                {/* Placeholder for hero illustration - simplified solar home icon */}
                <div className="w-full h-[440px] flex items-center justify-center">
                  <svg viewBox="0 0 600 420" fill="none" className="w-full h-auto max-h-[440px]">
                    {/* Simplified house with solar panels */}
                    <defs>
                      <linearGradient id="roof" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E3A5A" />
                        <stop offset="100%" stopColor="#2A5078" />
                      </linearGradient>
                      <linearGradient id="sun" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#FBBF24" />
                      </linearGradient>
                    </defs>

                    <style>
                      {`
                        @keyframes sunRiseSet {
                          0% {
                            transform: translate(0px, 0px);
                            opacity: 0.3;
                          }
                          25% {
                            transform: translate(100px, -50px);
                            opacity: 0.9;
                          }
                          50% {
                            transform: translate(200px, -70px);
                            opacity: 1;
                          }
                          75% {
                            transform: translate(300px, -50px);
                            opacity: 0.9;
                          }
                          100% {
                            transform: translate(400px, 0px);
                            opacity: 0.3;
                          }
                        }
                      `}
                    </style>

                    {/* Sun */}
                    <circle
                      cx="100"
                      cy="150"
                      r="45"
                      fill="url(#sun)"
                      style={{
                        animation: 'sunRiseSet 10s ease-in-out infinite',
                        transformOrigin: 'center',
                      }}
                    />

                    {/* Ground */}
                    <rect x="0" y="310" width="600" height="110" fill="#86EFAC" rx="0" />

                    {/* House */}
                    <rect x="140" y="220" width="260" height="100" rx="4" fill="#FFF5E6" />
                    <polygon points="120,220 270,130 420,220" fill="url(#roof)" />

                    {/* Door */}
                    <rect x="245" y="260" width="50" height="60" rx="3" fill="#1E3A5A" />

                    {/* Windows */}
                    <rect x="170" y="245" width="45" height="40" rx="3" fill="#87CEEB" opacity="0.6" />
                    <rect x="325" y="245" width="45" height="40" rx="3" fill="#87CEEB" opacity="0.6" />
                  </svg>
                </div>

                {/* Floating Card */}
                <div className="absolute bottom-[-20px] left-[-30px] bg-white px-6 py-5 rounded-[16px] shadow-[0_12px_40px_rgba(30,58,90,0.12)] flex items-center gap-[14px] animate-[floatIn_0.8s_ease_1s_both]">
                  <div className="w-12 h-12 bg-gold-pale rounded-xl flex items-center justify-center text-[1.4rem]">
                    💰
                  </div>
                  <div>
                    <div className="text-[0.75rem] text-text-light">Est. Annual Savings</div>
                    <div className="text-[1.1rem] font-bold text-navy">$2,400</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-[120px] bg-white relative">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div>
              <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
                The Problem
              </div>
              <h2 className="font-serif text-[2.8rem] leading-[1.2] mb-6">
                Going solar shouldn&apos;t feel like running a gauntlet.
              </h2>
              <p className="text-[1.05rem] text-text-light mb-[18px] leading-[1.8]">
                You want clean energy. But between the{' '}
                <strong className="text-navy font-semibold">pushy sales tactics</strong>, confusing
                quotes, and fear of getting ripped off, it&apos;s exhausting.
              </p>
              <p className="text-[1.05rem] text-text-light mb-[18px] leading-[1.8]">
                <strong className="text-navy font-semibold">Lumen changes that.</strong> It&apos;s your
                personal solar concierge — analyzing your home, shopping installers, and protecting your
                privacy. No spam. No pressure. Just smart guidance.
              </p>
            </div>

            {/* Right Visual - Problem Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FEF2F2] p-7 rounded-[16px] transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-md">
                <div className="text-[2rem] mb-3">😤</div>
                <div className="font-serif text-[1.05rem] text-navy mb-[6px]">Pushy Sales Calls</div>
                <div className="text-[0.82rem] text-text-light leading-[1.5]">
                  Your phone won&apos;t stop ringing
                </div>
              </div>
              <div className="bg-[#FEF2F2] p-7 rounded-[16px] transition-all duration-[400ms] translate-y-5 hover:translate-y-4 hover:shadow-md">
                <div className="text-[2rem] mb-3">🤔</div>
                <div className="font-serif text-[1.05rem] text-navy mb-[6px]">Confusing Quotes</div>
                <div className="text-[0.82rem] text-text-light leading-[1.5]">
                  What does any of this mean?
                </div>
              </div>
              <div className="bg-gold-pale p-7 rounded-[16px] transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-md">
                <div className="text-[2rem] mb-3">😰</div>
                <div className="font-serif text-[1.05rem] text-navy mb-[6px]">Fear of Being Scammed</div>
                <div className="text-[0.82rem] text-text-light leading-[1.5]">
                  How do I know who to trust?
                </div>
              </div>
              <div className="bg-gold-pale p-7 rounded-[16px] transition-all duration-[400ms] translate-y-5 hover:translate-y-4 hover:shadow-md">
                <div className="text-[2rem] mb-3">🕒</div>
                <div className="font-serif text-[1.05rem] text-navy mb-[6px]">Time-Consuming</div>
                <div className="text-[0.82rem] text-text-light leading-[1.5]">
                  Who has time to research all this?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-[120px] bg-gradient-to-b from-warm-bg to-warm-white">
        <div className="container mx-auto px-6 max-w-[1200px]">
          {/* Section Header */}
          <div className="text-center max-w-[640px] mx-auto mb-[72px]">
            <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
              How It Works
            </div>
            <h2 className="font-serif text-[2.8rem] leading-[1.2] mb-[18px]">
              Here&apos;s what Lumen does for you.
            </h2>
            <p className="text-[1.05rem] text-text-light">
              Three simple steps. Zero pressure. Total transparency.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white px-9 py-11 rounded-[24px] shadow-sm border border-navy/[0.04] transition-all duration-[400ms] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-gold before:to-gold-light before:scale-x-0 before:origin-left before:transition-transform before:duration-[400ms] hover:before:scale-x-100 hover:-translate-y-[6px] hover:shadow-lg">
              <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-navy to-navy-light text-white flex items-center justify-center font-serif text-[1.3rem] mb-6">
                1
              </div>
              <div className="text-[2.2rem] mb-5">🏠</div>
              <h3 className="font-serif text-[1.35rem] mb-[14px] text-navy">
                Lumen gets to know your home
              </h3>
              <p className="text-[0.95rem] text-text-light leading-[1.7]">
                Tell Lumen your address and a bit about your energy usage. From there, it analyzes
                your roof, local sunlight, utility rates, and available rebates to build a solar
                report that&apos;s specific to <em>your</em> home — not a generic estimate.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white px-9 py-11 rounded-[24px] shadow-sm border border-navy/[0.04] transition-all duration-[400ms] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-gold before:to-gold-light before:scale-x-0 before:origin-left before:transition-transform before:duration-[400ms] hover:before:scale-x-100 hover:-translate-y-[6px] hover:shadow-lg">
              <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-navy to-navy-light text-white flex items-center justify-center font-serif text-[1.3rem] mb-6">
                2
              </div>
              <div className="text-[2.2rem] mb-5">🔍</div>
              <h3 className="font-serif text-[1.35rem] mb-[14px] text-navy">
                Lumen shops around so you don&apos;t have to
              </h3>
              <p className="text-[0.95rem] text-text-light leading-[1.7]">
                While you go about your day, Lumen quietly researches vetted installers in your area,
                compares pricing and options, and narrows it down to the best fit. No one contacts you
                during this process. No one even knows you&apos;re looking.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white px-9 py-11 rounded-[24px] shadow-sm border border-navy/[0.04] transition-all duration-[400ms] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-gold before:to-gold-light before:scale-x-0 before:origin-left before:transition-transform before:duration-[400ms] hover:before:scale-x-100 hover:-translate-y-[6px] hover:shadow-lg">
              <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-navy to-navy-light text-white flex items-center justify-center font-serif text-[1.3rem] mb-6">
                3
              </div>
              <div className="text-[2.2rem] mb-5">✨</div>
              <h3 className="font-serif text-[1.35rem] mb-[14px] text-navy">
                Lumen brings you a recommendation
              </h3>
              <p className="text-[0.95rem] text-text-light leading-[1.7]">
                When Lumen has found the right match, it walks you through the recommendation
                personally — who, why, and what to expect. You review everything on your own time. If
                you want to move forward, Lumen sets up the introduction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / PROMISE SECTION */}
      <section className="py-[120px] bg-white">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center max-w-[640px] mx-auto mb-[72px]">
            <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
              The Lumen Promise
            </div>
            <h2 className="font-serif text-[2.8rem] leading-[1.2] mb-[18px]">
              Lumen keeps your information on lockdown.
            </h2>
            <p className="text-[1.05rem] text-text-light">
              Your name, your number, your email — Lumen holds all of it. No installer sees a thing
              about you unless you say &quot;I&apos;m ready&quot; or you approve an appointment that Lumen sets up on
              your behalf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-warm-bg p-10 rounded-[24px]">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-[16px] flex items-center justify-center text-[2rem] mx-auto mb-6">
                🔒
              </div>
              <h3 className="font-serif text-[1.2rem] text-navy mb-3">Your Info Stays Private</h3>
              <p className="text-[0.9rem] text-text-light leading-[1.7]">
                Lumen never sells your contact information. Ever.
              </p>
            </div>

            <div className="text-center bg-warm-bg p-10 rounded-[24px]">
              <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy-light rounded-[16px] flex items-center justify-center text-[2rem] mx-auto mb-6">
                🤝
              </div>
              <h3 className="font-serif text-[1.2rem] text-navy mb-3">One Recommendation</h3>
              <p className="text-[0.9rem] text-text-light leading-[1.7]">
                Not five quotes. Not a bidding war. Just one solid match.
              </p>
            </div>

            <div className="text-center bg-warm-bg p-10 rounded-[24px]">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-[16px] flex items-center justify-center text-[2rem] mx-auto mb-6">
                ☮️
              </div>
              <h3 className="font-serif text-[1.2rem] text-navy mb-3">Zero Pressure</h3>
              <p className="text-[0.9rem] text-text-light leading-[1.7]">
                Lumen doesn&apos;t push. You move forward when you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-[120px] bg-gradient-to-br from-navy-deep via-navy to-navy-light relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[800px] text-center relative z-10">
          <h2 className="font-serif text-[3rem] leading-[1.2] text-white mb-6">
            Ready to see what solar could save you?
          </h2>
          <p className="text-[1.15rem] text-white/80 mb-10 leading-[1.8]">
            Get your free solar report in 60 seconds. No spam. No sales calls. Just smart guidance.
          </p>
          <Link
            href="https://start.lumensolar.energy"
            className="inline-flex items-center gap-3 bg-gold text-navy font-bold px-10 py-5 rounded-[50px] text-[1.1rem] no-underline transition-all duration-300 shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(245,158,11,0.4)]"
          >
            Get Your Free Solar Report
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-6 text-[0.85rem] text-white/60">
            Takes 60 seconds · Completely free · Zero obligation
          </p>
        </div>
      </section>
    </>
  );
}
