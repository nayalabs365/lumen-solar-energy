export const metadata = {
  title: 'Local Installers — Lumen Solar Concierge',
  description: 'Find vetted solar installers in your area through Lumen Solar Concierge.',
};

export default function LocalInstallers() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-gradient-to-br from-warm-white via-cream to-warm-bg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
          <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
            Installation Partners
          </div>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] mb-6">
            Vetted installers in your area
          </h1>
          <p className="text-[1.15rem] text-text-light max-w-[640px] mx-auto">
            Lumen works with carefully vetted solar installers who meet our standards for quality, pricing, and customer service.
          </p>
        </div>
      </section>

      {/* How We Vet Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <h2 className="font-serif text-[2.8rem] text-center mb-12">
            How we vet installers
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8">
              <div className="text-[4rem] mb-4">✓</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Licensed & Insured</h3>
              <p className="text-text-light">
                All installers must maintain proper licensing, insurance, and bonding in your state.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="text-[4rem] mb-4">⭐</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Proven Track Record</h3>
              <p className="text-text-light">
                We review customer testimonials, ratings, and complaint history before adding any installer.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="text-[4rem] mb-4">🛠️</div>
              <h3 className="font-serif text-[1.5rem] mb-3">Quality Equipment</h3>
              <p className="text-text-light">
                Our network uses tier-1 solar panels and equipment with comprehensive warranties.
              </p>
            </div>
          </div>

          {/* The Difference Section */}
          <div className="bg-gold-pale p-12 rounded-[24px]">
            <h3 className="font-serif text-[2.2rem] text-center mb-6">
              The Lumen difference
            </h3>
            <p className="text-[1.05rem] text-text-light text-center max-w-[700px] mx-auto mb-6">
              Unlike lead generation sites that sell your information to 5-10 companies at once, Lumen does the vetting for you and brings you <strong>one recommended installer</strong> when you&apos;re ready.
            </p>
            <p className="text-[1.05rem] text-text-light text-center max-w-[700px] mx-auto">
              No bidding war. No sales pressure. Just a solid match based on your needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
