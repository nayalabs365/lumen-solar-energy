export const metadata = {
  title: 'Contact Us — Lumen Solar Concierge',
  description: 'Get in touch with Lumen Solar Concierge. We\'re here to help you with your solar journey.',
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-gradient-to-br from-warm-white via-cream to-warm-bg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
          <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
            Get In Touch
          </div>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] mb-6">
            We&apos;re here to help
          </h1>
          <p className="text-[1.15rem] text-text-light max-w-[640px] mx-auto">
            Have questions about solar? Want to learn more about Lumen? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-[2.5rem] mb-8">Get in touch</h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-pale rounded-xl flex items-center justify-center text-[1.5rem] flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.2rem] text-navy mb-2">Email Us</h3>
                    <a
                      href="mailto:concierge@lumensolar.energy"
                      className="text-[1.05rem] text-gold hover:underline"
                    >
                      concierge@lumensolar.energy
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-pale rounded-xl flex items-center justify-center text-[1.5rem] flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.2rem] text-navy mb-2">Visit Us</h3>
                    <p className="text-[1.05rem] text-text-light leading-[1.7]">
                      1321 Upland Drive, Ste 4150<br />
                      Houston, TX 77043
                    </p>
                  </div>
                </div>

                {/* Chat */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-pale rounded-xl flex items-center justify-center text-[1.5rem] flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.2rem] text-navy mb-2">Chat With Us</h3>
                    <p className="text-[1.05rem] text-text-light">
                      Click the chat button in the bottom right corner to start a conversation with Lumen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links / CTA */}
            <div>
              <h2 className="font-serif text-[2.5rem] mb-8">Quick actions</h2>

              <div className="space-y-4">
                <a
                  href="/your-report"
                  className="block bg-navy text-white p-6 rounded-[16px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg no-underline"
                >
                  <div className="text-[2rem] mb-2">📊</div>
                  <h3 className="font-serif text-[1.3rem] mb-2">Get Your Free Report</h3>
                  <p className="text-white/80 text-[0.95rem]">
                    See what solar could save you in 60 seconds
                  </p>
                </a>

                <a
                  href="/faq"
                  className="block bg-warm-bg p-6 rounded-[16px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md no-underline"
                >
                  <div className="text-[2rem] mb-2">❓</div>
                  <h3 className="font-serif text-[1.3rem] text-navy mb-2">Browse FAQ</h3>
                  <p className="text-text-light text-[0.95rem]">
                    Find answers to common questions
                  </p>
                </a>

                <a
                  href="/how-it-works"
                  className="block bg-warm-bg p-6 rounded-[16px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md no-underline"
                >
                  <div className="text-[2rem] mb-2">🔍</div>
                  <h3 className="font-serif text-[1.3rem] text-navy mb-2">How It Works</h3>
                  <p className="text-text-light text-[0.95rem]">
                    Learn about our 3-step process
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
