import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getCart, getSFCCMode } from "@/lib/sfcc";
import { CartProvider } from "@/components/cart/cart-context";
import { DebugGrid } from "@/components/debug-grid";
import { isDevelopment } from "@/lib/constants";
import { HeaderWithData } from "@/components/layout/header/server-wrapper";
import { SetupToolbar } from "@/components/cart/development/setup-toolbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "ACME Store",
  description: "ACME Store, your one-stop shop for all your needs."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = await getSFCCMode();
  const cart = getCart();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <SetupToolbar />
        <CartProvider cartPromise={cart} mode={mode}>
          <NuqsAdapter>
            <HeaderWithData />
            {children}
            <Toaster closeButton position="bottom-right" />
            {isDevelopment && <DebugGrid />}
          </NuqsAdapter>
        </CartProvider>
      </body>
    </html>
  );
}
