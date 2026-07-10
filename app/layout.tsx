import type { Metadata } from 'next'
import { Space_Grotesk, Anton } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/contexts/language-context'
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

export const metadata: Metadata = {
  title: 'Edgar Delgado | FullStack Developer',
  description: 'Portfolio of Edgar Delgado, a software engineer specializing in web development, architecture, and full-stack solutions.',
  generator: 'Next.js',
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
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
