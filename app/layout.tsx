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
    default: "FunTools | Premium Consumer Micro-Tools & Games",
    template: "%s | FunTools",
  },
  description:
    "Explore modern, playful micro-apps, love calculators, viral font generators, reaction speed tests, decision wheels & wealth calculators built for endless fun.",
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
  authors: [{ name: "FunTools Team" }],
  metadataBase: new URL("https://funtools.com"),
  openGraph: {
    title: "FunTools | Play, Explore & Create Modern Micro-Tools",
    description:
      "Modern consumer platform for interactive micro-tools, creative generators, personality quizzes, and fun calculators.",
    url: "https://funtools.com",
    siteName: "FunTools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FunTools | Premium Consumer Micro-Tools",
    description: "Explore interactive fun tools, calculators & generators.",
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
    "@type": "WebSite",
    name: "FunTools",
    url: "https://funtools.com",
    description: "Modern consumer platform for interactive micro-tools, creative generators, personality quizzes, and fun calculators.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://funtools.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
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
