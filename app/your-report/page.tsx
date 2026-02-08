import Link from 'next/link';

export const metadata = {
  title: 'Your Solar Report — Lumen Solar Concierge',
  description: 'Get your personalized solar savings report in 60 seconds. Free, fast, and zero pressure.',
};

export default function YourReport() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-gradient-to-br from-warm-white via-cream to-warm-bg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
          <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
            Free Solar Report
          </div>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] mb-6">
            See what solar could save you
          </h1>
          <p className="text-[1.15rem] text-text-light max-w-[640px] mx-auto">
            Get a personalized solar report tailored to your home. No spam. No sales calls. Just smart guidance.
          </p>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <h2 className="font-serif text-[2.8rem] text-center mb-12">
            What&apos;s in your report
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-warm-bg p-8 rounded-[24px]">
              <div className="text-[3rem] mb-4">💰</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Estimated Savings</h3>
              <p className="text-text-light">
                See how much you could save annually and over 25 years with solar energy.
              </p>
            </div>

            <div className="bg-warm-bg p-8 rounded-[24px]">
              <div className="text-[3rem] mb-4">🏠</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Custom Analysis</h3>
              <p className="text-text-light">
                Your report is built using real satellite imagery of your roof and local utility rates.
              </p>
            </div>

            <div className="bg-warm-bg p-8 rounded-[24px]">
              <div className="text-[3rem] mb-4">🎁</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Available Incentives</h3>
              <p className="text-text-light">
                Learn about federal tax credits, state rebates, and local incentives you qualify for.
              </p>
            </div>

            <div className="bg-warm-bg p-8 rounded-[24px]">
              <div className="text-[3rem] mb-4">📊</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Financing Options</h3>
              <p className="text-text-light">
                Compare cash purchase, loan, and lease options to find what works for your budget.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-navy-deep text-white p-12 rounded-[24px]">
            <h3 className="font-serif text-[2.5rem] mb-6">Ready to get started?</h3>
            <p className="text-[1.15rem] text-white/80 mb-8 max-w-[600px] mx-auto">
              Get your free personalized solar report in about 60 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gold text-navy font-bold px-10 py-5 rounded-[50px] text-[1.1rem] no-underline transition-all duration-300 shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:-translate-y-[2px]"
            >
              Get My Free Report
            </Link>
            <p className="mt-6 text-[0.85rem] text-white/60">
              Takes 60 seconds · Completely free · Zero obligation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
