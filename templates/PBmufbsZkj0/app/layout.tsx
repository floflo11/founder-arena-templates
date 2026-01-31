import type React from "react"
import type { Metadata } from "next"
import { Crimson_Pro } from "next/font/google"
import "./globals.css"

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Frontier 1607 - Luxury Outdoor Apparel",
  description: "High-end luxury clothing for the modern outdoor enthusiast"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
