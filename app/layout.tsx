import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import CustomCursor from "@/components/custom-cursor"
// import SimplifiedParticleBackground from "@/components/simplified-particle-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Codeoholics - Coding Community",
  description: "A vibrant community of passionate coders building the future together",
  metadataBase: new URL("https://codeoholics.vercel.app"),
  keywords: ["coding", "programming", "community", "developers", "college", "students", "tech"],
  authors: [{ name: "Codeoholics Team" }],
  openGraph: {
    title: "Codeoholics - College Coding Club",
    description: "A vibrant community of passionate coders building the future together",
    url: "https://codeoholics.vercel.app",
    siteName: "Codeoholics",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* <SimplifiedParticleBackground /> */}
          <CustomCursor />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
