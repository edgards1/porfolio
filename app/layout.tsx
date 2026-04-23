import type { Metadata } from 'next'
import { Inter, Playfair_Display, Space_Grotesk, Anton } from 'next/font/google'
import { LanguageProvider } from '@/contexts/language-context'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

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

export const metadata: Metadata = {
  title: 'Edgar Delgado',
  description: 'Portfolio of Edgar Delgado, a software engineer specializing in web development.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${anton.variable}`}>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
