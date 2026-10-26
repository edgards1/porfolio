import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Anton } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
    default: 'Edgar Delgado | Full Stack Developer en Ecuador',
    template: '%s | Edgar Delgado',
  },
  description: 'Portafolio de Edgar Delgado Scott, desarrollador Full Stack en Ecuador especializado en React, Next.js, Angular, Node.js, Python y .NET.',
  keywords: [
    'Edgar Delgado',
    'desarrollador Full Stack Ecuador',
    'Full Stack Developer Ecuador',
    'Software Engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Angular',
    '.NET',
    'Node.js',
    'Python',
    'portafolio desarrollador',
  ],
  authors: [{ name: 'Edgar Delgado' }],
  creator: 'Edgar Delgado',
  publisher: 'Edgar Delgado',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'Edgar Delgado',
    url: 'https://edgardelgado.dev/',
    title: 'Edgar Delgado | Full Stack Developer en Ecuador',
    description: 'Conoce el trabajo y la experiencia de Edgar Delgado Scott, desarrollador Full Stack especializado en soluciones web escalables.',
    images: [
      {
        url: '/img/perfil.jpg',
        width: 712,
        height: 618,
        alt: 'Edgar Delgado Scott, desarrollador Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edgar Delgado | Full Stack Developer en Ecuador',
    description: 'Portafolio profesional de Edgar Delgado Scott, desarrollador Full Stack.',
    images: ['/img/perfil.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/img/logo-favicon.png',
    shortcut: '/img/logo-favicon.png',
    apple: '/img/logo-favicon.png',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://edgardelgado.dev/#person',
                  name: 'Edgar Delgado Scott',
                  url: 'https://edgardelgado.dev/',
                  image: 'https://edgardelgado.dev/img/foto-perfil.png',
                  jobTitle: 'Full Stack Developer',
                  description: 'Desarrollador Full Stack especializado en soluciones web escalables.',
                  email: 'mailto:edgar_delgado_scott@hotmail.com',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'EC',
                  },
                  sameAs: [
                    'https://github.com/edgards1',
                    'https://www.linkedin.com/in/edgard-s1',
                  ],
                  knowsAbout: [
                    'React',
                    'Next.js',
                    'Angular',
                    'Node.js',
                    'Python',
                    '.NET',
                    'TypeScript',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://edgardelgado.dev/#website',
                  url: 'https://edgardelgado.dev/',
                  name: 'Edgar Delgado | Full Stack Developer',
                  description: 'Portafolio profesional de Edgar Delgado Scott.',
                  publisher: {
                    '@id': 'https://edgardelgado.dev/#person',
                  },
                  inLanguage: ['es', 'en'],
                },
              ],
            }),
          }}
        />
        <LanguageProvider>
          <HtmlLangSync />
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
