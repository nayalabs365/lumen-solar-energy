export const metadata = {
  title: 'How It Works — Lumen Solar Concierge',
  description: 'Learn how Lumen makes going solar simple with three easy steps.',
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-gradient-to-br from-warm-white via-cream to-warm-bg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
          <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
            The Process
          </div>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] mb-6">
            Three steps to solar confidence
          </h1>
          <p className="text-[1.15rem] text-text-light max-w-[640px] mx-auto">
            Lumen handles the research, vetting, and matchmaking so you don&apos;t have to.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-[1000px]">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="md:w-1/2">
              <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
                Step 1
              </div>
              <h2 className="font-serif text-[2.8rem] leading-[1.2] mb-6">
                Lumen gets to know your home
              </h2>
              <p className="text-[1.05rem] text-text-light leading-[1.8] mb-4">
                Tell Lumen your address and a bit about your energy usage. From there, it analyzes
                your roof using satellite imagery, checks local sunlight patterns, pulls your utility
                rates, and identifies available rebates.
              </p>
              <p className="text-[1.05rem] text-text-light leading-[1.8]">
                In about 60 seconds, you&apos;ll have a personalized solar report built specifically for
                your home — not a generic estimate.
              </p>
            </div>
            <div className="md:w-1/2 text-[10rem]">🏠</div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-24">
            <div className="md:w-1/2">
              <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
                Step 2
              </div>
              <h2 className="font-serif text-[2.8rem] leading-[1.2] mb-6">
                Lumen shops around so you don&apos;t have to
              </h2>
              <p className="text-[1.05rem] text-text-light leading-[1.8] mb-4">
                While you go about your day, Lumen quietly researches vetted installers in your area.
                It compares pricing, reviews, warranty offerings, and equipment quality to narrow it
                down to the best fit for your needs.
              </p>
              <p className="text-[1.05rem] text-text-light leading-[1.8]">
                During this entire process, no one contacts you. No one even knows you&apos;re looking.
              </p>
            </div>
            <div className="md:w-1/2 text-[10rem]">🔍</div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
                Step 3
              </div>
              <h2 className="font-serif text-[2.8rem] leading-[1.2] mb-6">
                Lumen brings you a recommendation
              </h2>
              <p className="text-[1.05rem] text-text-light leading-[1.8] mb-4">
                When Lumen has found the right match, it walks you through the recommendation
                personally — who they are, why they&apos;re a good fit, and what to expect next.
              </p>
              <p className="text-[1.05rem] text-text-light leading-[1.8]">
                You review everything on your own time. If you want to move forward, Lumen sets up
                the introduction. If not, no pressure.
              </p>
            </div>
            <div className="md:w-1/2 text-[10rem]">✨</div>
          </div>
        </div>
      </section>
    </div>
  );
}
