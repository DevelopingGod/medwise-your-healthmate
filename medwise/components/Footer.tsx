import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F2854' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-1 text-xl font-bold mb-3" style={{ color: '#BDE8F5' }}>
              <span>⚕️</span>
              <span>MedWise: Your Healthmate</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered medicine guidance for every household
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#BDE8F5' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/why-medwise', label: 'Why MedWise' },
                { href: '/chat', label: 'Start Consultation' },
                { href: '/team', label: 'Our Team' },
                { href: '/about', label: 'About & Disclaimer' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 text-sm transition-colors hover:text-[#BDE8F5]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Notice */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#BDE8F5' }}>
              Important Notice
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              MedWise: Your Healthmate is not a substitute for professional medical advice.
              Always consult a qualified doctor for diagnosis and treatment.
            </p>
          </div>

          {/* Column 4: Research */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#BDE8F5' }}>
              Research
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.irjet.net/archives/V10/i2/IRJET-V10I208.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm transition-colors hover:text-[#BDE8F5]"
                >
                  IRJET Publication 2023
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar — slightly darker than navy */}
      <div style={{ backgroundColor: '#0a1e3d' }} className="mt-10 border-t border-[#1C4D8D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 MedWise: Your Healthmate. For informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
