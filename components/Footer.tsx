import Link from 'next/link';

export default function Footer() {
  const navigationLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/your-report', label: 'Your Report' },
    { href: '/local-installers', label: 'Local Installers' },
    { href: '/faq', label: 'FAQ' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About Lumen' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/contact', label: 'Contact' },
  ];

  const getStartedLinks = [
    { href: 'https://start.lumensolar.energy', label: 'Free Solar Report', external: true },
    { href: 'https://start.lumensolar.energy', label: 'Chat with Lumen', external: true },
    { href: '/local-installers', label: 'Find Installers', external: false },
  ];

  return (
    <footer className="bg-navy-deep text-white/70 pt-[72px] pb-[36px]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex flex-col leading-[1.15] mb-4">
              <span className="font-serif text-[2rem] text-white font-normal tracking-[1.5px] whitespace-nowrap">
                LUMEN
              </span>
              <span className="font-sans text-[0.6rem] text-gold uppercase font-bold mt-[2px] whitespace-nowrap tracking-[4.8px]">
                SOLAR CONCIERGE
              </span>
            </div>
            <p className="text-[0.9rem] leading-[1.7] max-w-[300px]">
              Your personal guide to going solar. Lumen analyzes your home, shops for the best
              installer, and protects your privacy — so you can go solar with confidence.
            </p>
          </div>

          {/* Navigate Column */}
          <div>
            <h4 className="font-sans text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-5">
              Navigate
            </h4>
            <div className="flex flex-col">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 no-underline text-[0.9rem] mb-3 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-sans text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-5">
              Company
            </h4>
            <div className="flex flex-col">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 no-underline text-[0.9rem] mb-3 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Get Started Column */}
          <div>
            <h4 className="font-sans text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-5">
              Get Started
            </h4>
            <div className="flex flex-col">
              {getStartedLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-white/60 no-underline text-[0.9rem] mb-3 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-white/60 no-underline text-[0.9rem] mb-3 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/[0.08] pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.82rem]">
          <span>&copy; 2026 Lumen Solar Concierge. All rights reserved.</span>
          <span>Smart solar guidance, powered by AI.</span>
        </div>
      </div>
    </footer>
  );
}
