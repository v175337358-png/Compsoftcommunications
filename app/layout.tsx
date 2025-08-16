import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Compsoft Communications - Leading ICT Solutions Provider",
  description:
    "Compsoft Communications delivers comprehensive end-to-end ICT solutions to businesses across Southern Africa using best-of-breed technologies.",
  keywords: "ICT solutions, networking, security, data center, collaboration, Namibia, Southern Africa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
