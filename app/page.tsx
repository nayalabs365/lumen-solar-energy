import Logo from '@/components/Logo'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cream py-10 px-4 shadow-md relative z-10">
        <div className="container mx-auto max-w-7xl">
          <Logo />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 bg-gradient-to-br from-navy via-[#1E3A5F] to-[#2A5080] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-none tracking-tight">
                  See What Solar{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-yellow-400">
                    Actually
                  </span>{' '}
                  Saves You
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
                  Your home. Your utility rates. Your personalized savings breakdown — free.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col gap-5 pt-4">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-3xl">☀️</span>
                  </div>
                  <span className="text-white font-semibold text-lg">Based on your actual roof</span>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <span className="text-white font-semibold text-lg">Current Illinois rates</span>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-3xl">🔔</span>
                  </div>
                  <span className="text-white font-semibold text-lg">No spam, no pressure</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <LeadForm />
              </div>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <span className="text-4xl">🔒</span>
              </div>
              <p className="font-bold text-white text-lg">Your info is never sold</p>
            </div>

            <div className="text-center space-y-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <span className="text-4xl">⚡</span>
              </div>
              <p className="font-bold text-white text-lg">Report ready in 2 min</p>
            </div>

            <div className="text-center space-y-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <span className="text-4xl">📊</span>
              </div>
              <p className="font-bold text-white text-lg">Up to 80% savings</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cream py-10 px-4 border-t-2 border-gray-200">
        <div className="container mx-auto max-w-7xl text-center space-y-5">
          <div className="text-sm font-medium text-gray-700">
            © 2026 Lumen Solar Concierge · Naya Labs, Inc.
          </div>

          <div className="flex justify-center gap-8 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-navy transition font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-navy transition font-medium">
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
