import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PerformanceOptimizer } from "@/components/performance-optimizer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stickify - Create Your Stickman",
  description: "Create your own stickman characters with stickify.cc",
  metadataBase: new URL("https://stickify.cc"),
  openGraph: {
    title: "Stickify - Create Your Stickman",
    description: "Create your own stickman characters with stickify.cc",
    url: "https://stickify.cc",
    siteName: "Stickify",
    images: [
      {
        url: "https://stickify.cc/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stickify - Create Your Stickman",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stickify - Create Your Stickman",
    description: "Create your own stickman characters with stickify.cc",
    images: ["https://stickify.cc/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PerformanceOptimizer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
