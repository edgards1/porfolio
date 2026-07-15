import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Anton } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/contexts/language-context'
import { HtmlLangSync } from '@/components/html-lang-sync'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
  weight: ['400'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://edgardelgado.dev'),
  title: {
    default: 'Edgar Delgado | FullStack Developer',
    template: '%s | Edgar Delgado',
  },
  description: 'FullStack developer with 5+ years of experience architecting and building scalable solutions across the entire stack.',
  keywords: ['FullStack Developer', 'Software Engineer', 'TypeScript', 'React', 'Angular', '.NET', 'Node.js', 'Python', 'Portfolio', 'Ecuador'],
  authors: [{ name: 'Edgar Delgado' }],
  creator: 'Edgar Delgado',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'Edgar Delgado',
    title: 'Edgar Delgado | FullStack Developer',
    description: 'FullStack developer with 5+ years of experience architecting and building scalable solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edgar Delgado | FullStack Developer',
    description: 'FullStack developer with 5+ years of experience architecting and building scalable solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#09090B] text-[#FAFAFA]">
        <LanguageProvider>
          <HtmlLangSync />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
