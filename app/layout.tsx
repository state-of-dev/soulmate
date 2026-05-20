import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import ConditionalNavbar from "@/components/conditional-navbar"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://soulmate-sh.vercel.app"),
  title: "Soulmate | Wedding Film Studio",
  description: "Cinematic wedding films with a sharp editorial language from CDMX.",
  applicationName: "Soulmate",
  authors: [{ name: "Soulmate" }],
  creator: "Soulmate",
  publisher: "Soulmate",
  alternates: {
    canonical: "https://soulmate-sh.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Soulmate | Wedding Film Studio",
    description: "Cinematic wedding films with a sharp editorial language from CDMX.",
    url: "https://soulmate-sh.vercel.app",
    siteName: "Soulmate",
    images: [
      {
        url: "https://soulmate-sh.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Soulmate",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soulmate | Wedding Film Studio",
    description: "Cinematic wedding films with a sharp editorial language from CDMX.",
    images: ["https://soulmate-sh.vercel.app/opengraph-image"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <link rel="preload" as="image" href="/media/hero-tile.webp" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${jetbrains.variable} font-sans`}>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  )
}
