import type { Metadata } from "next"
import localFont from "next/font/local"
import "/styles/globals.scss"
import { Work_Sans } from "next/font/google"

// CONFIGURING LOCAL FONT AvenirNext WITH DIFFERENT FONT WEIGHTS
const avenirNext = localFont({
  src: [
    {
      path: "./fonts/AvenirNextCyr-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/AvenirNextCyr-Demi.woff2",
      weight: "600",
    },
    {
      path: "./fonts/AvenirNextCyr-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-avenirNext",
})

// IMPORTING GOOGLE FONT Work Sans WITH SPECIFIED WEIGHTS AND USING CSS VARIABLE FOR FONT FAMILY
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-workSans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

// CONFIGURING LOCAL FONT SF Compact WITH SINGLE FONT WEIGHT
const sfCompact = localFont({
  src: "./fonts/sf-compact-text-heavy.ttf",
  variable: "--font-sfCompact",
})

// DEFINING METADATA FOR THE APPLICATION, INCLUDING OPEN GRAPH PROPERTIES FOR SEO
export const metadata: Metadata = {
  title: "Lendsqr",
  description: "The number one LaaS brand empowering Africa.",
  openGraph: {
    title: "Lendsqr",
    description: "The number one LaaS brand empowering Africa.",
    images: "/logo.svg",
  },
}

// MAIN ROOT LAYOUT COMPONENT, WRAPPING THE ENTIRE APPLICATION
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${avenirNext.variable} ${workSans.variable} ${sfCompact.variable}`}
    >
      <body>
        {/* LINK TO THE FAVICON FOR ALL BROWSER PLATFORMS */}
        <link rel="icon" href="/favicon.png" sizes="any" />

        {/* RENDERING CHILD COMPONENTS PASSED INTO THE ROOT LAYOUT */}
        {children}
      </body>
    </html>
  )
}
