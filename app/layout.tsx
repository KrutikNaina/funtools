import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import SurpriseMeModal from "@/components/recommendations/SurpriseMeModal";
import AchievementToaster from "@/components/recommendations/AchievementToaster";
import AnalyticsDashboardModal from "@/components/recommendations/AnalyticsDashboardModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GetFunTools – Free Online Tools, Calculators & Generators",
    template: "%s | GetFunTools",
  },
  description:
    "Explore free online calculators, generators, converters, AI tools and interactive utilities on GetFunTools. Find useful tools for everyday tasks, creativity and fun.",
  keywords: [
    "getfuntools",
    "get fun tools",
    "free online tools",
    "free online calculators",
    "online generators",
    "interactive web tools",
    "love calculator",
    "fancy font generator",
    "decision wheel",
    "reaction speed test",
    "percentage calculator",
    "bmi calculator",
    "cosmic age clock",
    "fun tools online"
  ],
  authors: [{ name: "GetFunTools Team" }],
  metadataBase: new URL(SITE_URL),
  applicationName: "GetFunTools",
  generator: "Next.js",
  publisher: "GetFunTools",
  creator: "GetFunTools Team",
  category: "Tools and Utilities",
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: "GetFunTools – Free Online Tools, Calculators & Generators",
    description:
      "Explore free online calculators, generators, converters, AI tools and interactive utilities on GetFunTools. Find useful tools for everyday tasks, creativity and fun.",
    url: SITE_URL,
    siteName: "GetFunTools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GetFunTools – Free Online Tools, Calculators & Generators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetFunTools – Free Online Tools, Calculators & Generators",
    description:
      "Explore free online calculators, generators, converters, AI tools and interactive utilities on GetFunTools. Find useful tools for everyday tasks, creativity and fun.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  verification: {
    google: "cafc85c2be785fc6",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "GetFunTools",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description:
          "GetFunTools is a modern online directory of free calculators, generators, interactive micro-tools, and playful utilities.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "GetFunTools",
        url: SITE_URL,
        description:
          "Explore free online calculators, generators, converters, AI tools and interactive utilities on GetFunTools. Find useful tools for everyday tasks, creativity and fun.",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/tools?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFF] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-indigo-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
          <SurpriseMeModal />
          <AchievementToaster />
          <AnalyticsDashboardModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
