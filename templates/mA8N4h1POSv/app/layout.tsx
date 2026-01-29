import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Toolbar } from "basehub/next-toolbar"
import { basehub } from "basehub"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { V0Setup } from "./v0-setup"
import { ViewTransitions } from "next-view-transitions"
import "@/basehub.config"

export const dynamic = "force-static"
export const revalidate = 30

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

const _vercel_url_env_name = "VERCEL_URL"
const isMainV0 = process.env[_vercel_url_env_name]?.startsWith("preview-portfolio-template-kzmm0b49zy6f1s58xo4m")

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  let setupNotification = null

  if (!isMainV0 && process.env.NODE_ENV !== "production") {
    const playgroundData = await basehub().query({
      _sys: {
        playgroundInfo: {
          expiresAt: true,
          editUrl: true,
          claimUrl: true
        }
      }
    })

    if (playgroundData._sys.playgroundInfo) {
      setupNotification = <V0Setup playgroundInfo={playgroundData._sys.playgroundInfo} />
    }
  }

  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="2xl:max-w-[1920px] mx-auto">
            {!isMainV0 && <Toolbar />}
            {setupNotification}
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}

export const metadata = {
    };
