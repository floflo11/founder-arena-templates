import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Founder Arena Template",
  description: "A saas-dashboard template with charts",
  generator: 'v0.dev'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
