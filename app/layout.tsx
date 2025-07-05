import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
