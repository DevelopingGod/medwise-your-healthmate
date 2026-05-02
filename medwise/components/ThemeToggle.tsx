'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full px-3 py-1 text-sm border transition-colors"
      style={
        theme === 'light'
          ? { borderColor: '#1C4D8D', color: '#1C4D8D' }
          : { borderColor: '#BDE8F5', color: '#BDE8F5' }
      }
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
