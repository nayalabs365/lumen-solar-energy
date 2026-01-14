import Logo from '@/components/Logo'
import Link from 'next/link'

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold text-navy mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: January 14, 2026</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using Lumen Solar Concierge&apos;s website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Service Description</h2>
                <p className="text-gray-700 mb-4">
                  Lumen Solar Concierge provides informational solar energy savings reports based on the information you provide. Our service includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Personalized solar savings estimates</li>
                  <li>Analysis based on your address and utility rates</li>
                  <li>SMS delivery of your solar report</li>
                  <li>Optional consultation with licensed installers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Estimates and Disclaimers</h2>
                <p className="text-gray-700 mb-4">
                  All savings estimates provided are for informational purposes only and are not guarantees. Actual savings may vary based on numerous factors including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Roof condition and orientation</li>
                  <li>Local weather patterns</li>
                  <li>Changes in utility rates</li>
                  <li>System maintenance and performance</li>
                  <li>Available incentives and rebates</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  For exact quotes and guarantees, you must consult with a licensed solar installer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">SMS Communications</h2>
                <p className="text-gray-700 mb-4">
                  By providing your phone number and submitting the form, you consent to receive SMS messages from Lumen Solar Concierge. You understand and agree that:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Message and data rates may apply</li>
                  <li>You can opt out at any time by replying STOP</li>
                  <li>Your consent is not required as a condition of purchase</li>
                  <li>We may send you your solar report and related information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">User Responsibilities</h2>
                <p className="text-gray-700 mb-4">
                  You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not misuse or attempt to disrupt our services</li>
                  <li>Maintain the security of your personal information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  The service and its original content, features, and functionality are owned by Naya Labs, Inc. and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  Lumen Solar Concierge and Naya Labs, Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes by updating the &quot;Last updated&quot; date. Your continued use of the service after such changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-navy mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-700">
                  Lumen Solar Concierge<br />
                  Email: support@lumensolar.energy
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
            © 2026 Lumen Solar Concierge
          </div>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-navy transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-navy font-medium">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
