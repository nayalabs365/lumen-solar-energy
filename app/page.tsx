import Logo from '@/components/Logo'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cream py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Logo />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 bg-gradient-to-br from-navy via-navy to-[#2A4A6F]">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  See What Solar Actually Saves You
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  Your home. Your utility rates. Your personalized savings breakdown — free.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <span className="text-white font-medium">Based on your roof</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <span className="text-white font-medium">Current IL rates</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <span className="text-white font-medium">No spam, no pressure</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex justify-center lg:justify-end">
              <LeadForm />
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <span className="font-medium">Your info is never sold</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="font-medium">Report ready in 2 min</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <span className="font-medium">80% savings possible</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cream py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center space-y-4">
          <div className="text-sm text-gray-600">
            © 2026 Lumen Solar Concierge · Naya Labs, Inc.
          </div>

          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-navy transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-navy transition">
              Terms of Service
            </Link>
          </div>

          <div className="text-xs text-gray-500 max-w-2xl mx-auto">
            Estimates for informational purposes. Consult a licensed installer for exact quotes.
          </div>
        </div>
      </footer>
    </div>
  )
}
