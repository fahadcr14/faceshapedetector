import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Face Shape Detect - No Signup No Ads 100% Free & Private",
  description: "This face shape detector uses Ai modern technology to analyze your faces and tells you whats your face shape is.Try Now 100% Free.",
  keywords:
    "face shape detector, AI face detection, face shape identification, AI styling tool, face shape detector, image upload",
  authors: [{ name: "Face Shape Detect" }],
  openGraph: {
    title: "Face Shape Detect - No Signup No Ads 100% Free & Private",
    description:
      "This face shape detector uses Ai modern technology to analyze your faces and tells you whats your face shape is.Try Now 100% Free. ",
    url: "https://faceshapedetect.com",
    type: "website",
  },
    generator: 'faceshapedetect.com'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden max-w-[100vw]`}>{children}</body>
    </html>
  )
}



import './globals.css'