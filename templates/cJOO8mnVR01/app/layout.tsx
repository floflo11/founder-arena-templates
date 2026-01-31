import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, Dancing_Script } from 'next/font/google'
import './globals.css'
import { Nabla } from 'next/font/google' // Added import for Nabla

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const _nabla = Nabla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Creative Studio',
  description: 'A visually striking hero section',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml'
      }
    ],
    apple: '/apple-icon.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
