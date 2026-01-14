import Logo from '@/components/Logo'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-cream py-8 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-4xl font-bold text-navy mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: January 14, 2026</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Lumen Solar Concierge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Name and contact information (phone number, address)</li>
                  <li>Home address for solar analysis</li>
                  <li>Monthly electric bill information</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Provide personalized solar savings reports</li>
                  <li>Send you information via SMS about your solar analysis</li>
                  <li>Improve our services and customer experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Trusted service providers who assist in our operations</li>
                  <li>Licensed solar installers (only with your explicit consent)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">SMS Communications</h2>
                <p className="text-gray-700 mb-4">
                  By providing your phone number, you consent to receive SMS messages about your solar report. Message and data rates may apply. You can opt out at any time by replying STOP to any message.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-700">
                  Lumen Solar Concierge<br />
                  Naya Labs, Inc.<br />
                  Email: privacy@lumensolar.com
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-orange hover:underline font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cream py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <div className="text-sm text-gray-600">
            © 2026 Lumen Solar Concierge · Naya Labs, Inc.
          </div>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-navy font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-navy transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
