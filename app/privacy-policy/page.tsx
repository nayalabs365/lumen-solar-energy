import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Lumen Solar Concierge',
  description: 'Your privacy matters. Learn how Lumen protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-gradient-to-br from-warm-white via-cream to-warm-bg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[800px] relative z-10">
          <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4 text-center">
            Legal
          </div>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] text-center mb-6 animate-[fadeInUp_0.6s_ease_0.1s_both]">
            Privacy Policy
          </h1>
          <p className="text-[0.9rem] text-text-light text-center">
            Last updated: February 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-[800px]">
          <div className="bg-gold-pale p-8 rounded-[16px] mb-12">
            <p className="text-[1.05rem] leading-[1.8] text-navy-deep">
              <strong>The short version:</strong> We never sell your personal information. We only share
              it with a solar installer when you explicitly tell us to. That&apos;s the Lumen promise.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-[2.2rem] mb-4 mt-12">Information We Collect</h2>
            <p className="text-[1.05rem] text-text-light leading-[1.8] mb-8">
              When you use Lumen Solar Concierge, we collect: your name, home address, phone number,
              email address, estimated energy bill, and utility provider. This information is used
              exclusively to generate your personalized solar report and provide concierge services.
            </p>

            <h2 className="font-serif text-[2.2rem] mb-4 mt-12">How We Use Your Information</h2>
            <p className="text-[1.05rem] text-text-light leading-[1.8] mb-8">
              We use your information to: generate your solar report, contact you to walk through your
              results (a concierge call, not a sales call), research and vet local solar installers on
              your behalf, and send you your recommendation. We do <strong>not</strong> sell, rent, or
              share your information with third parties for marketing purposes.
            </p>

            <h2 className="font-serif text-[2.2rem] mb-4 mt-12">When We Share Your Information</h2>
            <p className="text-[1.05rem] text-text-light leading-[1.8] mb-8">
              Your personal information is shared with a solar installer <strong>only</strong> when:
              you explicitly request a connection by clicking &quot;Let Lumen Connect Me&quot; and confirming, or
              you approve an appointment that Lumen sets up on your behalf. In all other cases, your
              information remains exclusively with Lumen.
            </p>

            <h2 className="font-serif text-[2.2rem] mb-4 mt-12">Data Security</h2>
            <p className="text-[1.05rem] text-text-light leading-[1.8] mb-8">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="font-serif text-[2.2rem] mb-4 mt-12">Your Rights</h2>
            <p className="text-[1.05rem] text-text-light leading-[1.8] mb-8">
              You have the right to: access the personal data we hold about you, request correction of
              inaccurate data, request deletion of your data, and withdraw consent for communications
              at any time.
            </p>

            <h2 className="font-serif text-[2.2rem] mb-4 mt-12">Contact Us</h2>
            <p className="text-[1.05rem] text-text-light leading-[1.8] mb-8">
              If you have questions about this privacy policy or your data, please reach out via our{' '}
              <Link href="/contact" className="text-gold font-semibold hover:underline">
                contact page
              </Link>{' '}
              or chat with Lumen directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
