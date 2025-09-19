import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "./client-layout"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "EcoSwap - AI-Driven Sustainable Exchange Platform",
  description:
    "Join the circular economy with EcoSwap - an AI-powered platform for sustainable item exchanges and reusable packaging networks.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${poppins.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
