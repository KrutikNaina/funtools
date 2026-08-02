import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    default: "GetFunTools – Free Online Tools, AI Tools, Calculators & Generators",
    template: "%s | GetFunTools",
  },
  description:
    "GetFunTools offers free online calculators, generators, converters, AI tools, image tools, developer utilities, productivity tools, and fun interactive tools. Fast, secure, mobile-friendly, and free to use.",
  keywords: [
    "fun tools",
    "love calculator",
    "fancy font generator",
    "reaction speed test",
    "decision wheel",
    "coffee wealth calculator",
    "ai bio generator",
    "personality quiz",
  ],
  authors: [{ name: "GetFunTools Team" }],
  metadataBase: new URL("https://getfuntools.app"),
  applicationName: "GetFunTools",
  generator: "Next.js",
  publisher: "GetFunTools",
  creator: "GetFunTools Team",
  category: "Tools and Utilities",
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: "https://getfuntools.app",
    languages: {
      "en-US": "https://getfuntools.app",
    },
  },
  openGraph: {
    title: "GetFunTools – Free Online Tools, AI Tools, Calculators & Generators",
    description: "GetFunTools offers free online calculators, generators, converters, AI tools, image tools, developer utilities, productivity tools, and fun interactive tools. Fast, secure, mobile-friendly, and free to use.",
    url: "https://getfuntools.app",
    siteName: "GetFunTools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://getfuntools.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GetFunTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetFunTools – Free Online Tools, AI Tools, Calculators & Generators",
    description: "GetFunTools offers free online calculators, generators, converters, AI tools, image tools, developer utilities, productivity tools, and fun interactive tools.",
    images: ["https://getfuntools.app/og-image.jpg"],
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
        "@id": "https://getfuntools.app/#organization",
        name: "GetFunTools",
        url: "https://getfuntools.app",
        logo: "https://getfuntools.app/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://getfuntools.app/#website",
        name: "GetFunTools",
        url: "https://getfuntools.app",
        description: "GetFunTools offers free online calculators, generators, converters, AI tools, image tools, developer utilities, productivity tools, and fun interactive tools. Fast, secure, mobile-friendly, and free to use.",
        publisher: {
          "@id": "https://getfuntools.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://getfuntools.app/search?q={search_term_string}",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
