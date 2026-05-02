import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedWise: Your Healthmate',
  description:
    'AI-powered personalized medicine guidance — allopathic, homeopathic and ayurvedic treatments',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'MedWise: Your Healthmate',
    description:
      'AI-powered personalized medicine guidance across allopathic, homeopathic, and ayurvedic treatment tracks.',
    url: 'https://medwise-your-healthmate.vercel.app',
    siteName: 'MedWise: Your Healthmate',
    images: [
      {
        url: 'https://medwise-your-healthmate.vercel.app/og',
        width: 1200,
        height: 630,
        alt: 'MedWise: Your Healthmate — AI Medical Guidance',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedWise: Your Healthmate',
    description:
      'AI-powered personalized medicine guidance — allopathic, homeopathic, ayurvedic.',
    images: ['https://medwise-your-healthmate.vercel.app/og'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
