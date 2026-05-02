'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/why-medwise', label: 'Why MedWise' },
  { href: '/team', label: 'Team' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-sm"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-1 text-xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>⚕️</span>
            <span>MedWise: Your Healthmate</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition-colors"
                style={
                  pathname === href
                    ? { color: '#4988C4', borderBottom: '2px solid #4988C4', paddingBottom: '2px' }
                    : { color: 'var(--text-secondary)' }
                }
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/chat"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: '#1C4D8D' }}
            >
              Start Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-2xl leading-none transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden shadow-md border-t"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderTopColor: 'var(--border-color)',
          }}
        >
          <div className="flex flex-col px-4 py-3 gap-4">
            <div className="pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <ThemeToggle />
            </div>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium"
                style={{ color: pathname === href ? '#4988C4' : 'var(--text-secondary)' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/chat"
              className="px-4 py-2 rounded-md text-sm font-medium text-white text-center"
              style={{ backgroundColor: '#1C4D8D' }}
              onClick={() => setMenuOpen(false)}
            >
              Start Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
