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
  title: "Momentos Eternos | Wedding Film Studio",
  description: "Cinematic wedding films with a sharp editorial language from CDMX.",
  generator: "v0.dev",
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
