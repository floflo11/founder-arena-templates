import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree"
})

export const metadata: Metadata = {
  title: "Founder Arena Template",
  description: "A saas-dashboard template with dashboard, charts"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
