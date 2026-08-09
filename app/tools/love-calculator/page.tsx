import { Metadata } from "next";
import Link from "next/link";
import { TOOLS, BLOG_POSTS } from "@/lib/tools-data";
import { getRelatedTools } from "@/lib/recommendations";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import LoveCalculator from "@/components/tools/LoveCalculator";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import ToolComments from "@/components/ToolComments";
import { SITE_URL } from "@/lib/site";
import { Sparkles, HelpCircle, BookOpen, Heart, ShieldCheck, Zap } from "lucide-react";
import { loveCalculatorContent as module } from "@/lib/content/love-calculator";

export const metadata: Metadata = {
  title: "Love Calculator by Name – Free Compatibility Test",
  description: "Calculate a fun love compatibility percentage using two names. Try the free GetFunTools Love Calculator for couples, crushes, and friends with instant results.",
  alternates: {
    canonical: `${SITE_URL}/tools/love-calculator`,
  },
  openGraph: {
    title: "Love Calculator by Name – Free Compatibility Test",
    description: "Calculate a fun love compatibility percentage using two names. Try the free GetFunTools Love Calculator for couples, crushes, and friends.",
    url: `${SITE_URL}/tools/love-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Calculator by Name | GetFunTools",
    description: "Enter two names and get a fun compatibility percentage instantly.",
  },
};

export default function LoveCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "love-calculator");
  if (!tool) return null;

  // Schemas
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Love Calculator by Name",
    description: metadata.description,
    url: `${SITE_URL}/tools/love-calculator`,
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Love Calculator",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Love",
        item: `${SITE_URL}/categories/love`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Love Calculator",
        item: `${SITE_URL}/tools/love-calculator`,
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12 pt-2">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Love", href: `/categories/love` },
            { label: "Love Calculator" },
          ]}
        />

        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" />
              Love Tool
            </div>
            <BookmarkButton slug="love-calculator" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Love Calculator by Name
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Enter two names and get a fun compatibility percentage instantly. No signup required.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Private & Secure</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-500" /> Instant Results</span>
          </div>
        </header>

        {/* Interactive Tool Component */}
        <section id="interactive-tool" className="max-w-4xl mx-auto">
          <LoveCalculator />
        </section>

        {/* Top Banner Ad Container */}
        <AdBanner slot="7788990011" format="horizontal" label="In-Article Ad" />

        {/* Result Explanation */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            What Does Your Love Score Mean?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your love score is a fun, percentage-based metric between 65% and 100%. A higher score indicates a stronger match within the game's algorithm. For instance, a score above 90% is considered a "Legendary Match" resulting in celebratory confetti, while scores between 65% and 79% denote a "Fun & Dynamic Duo."
          </p>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
            How Does the Love Calculator Work?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The tool works entirely in your browser using a simple, text-based character algorithm. When you enter two names and select a relationship mode, the script combines them into a single text string. It then calculates the numerical value of the characters and maps the final sum to a percentage. Names are never saved or sent to a server.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
            Is the Love Calculator Accurate?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            No, the Love Calculator is not scientifically accurate. Name-based compatibility calculators are entertainment tools and should not be treated as scientific relationship assessments or psychological evaluations. The scores are generated purely for fun and social sharing.
          </p>
        </section>

        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Try Different Relationship Modes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Our Love Calculator implements four distinct relationship modes that slightly alter the generated score and advice.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">✨ Cosmic Soulmates</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Best for romantic partners and testing deep, long-term connections.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">🔥 Spicy & Playful</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Great for crushes, new dating phases, and testing flirty banter.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">🤝 Bestie Chemistry</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Perfect for platonic friends, roommates, and long-time companions.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">⚡ Pure Chaotic Fun</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Ideal for frenemies, casual acquaintances, or just for a quick laugh.</p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Love Calculator for Couples, Crushes & Friends
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You don't need to be in a romantic relationship to use this tool. By selecting modes like "Bestie Chemistry," you can test friendship compatibility. It's a great icebreaker for parties, group chats, or just sending a funny screenshot to a friend. 
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
            Love Calculator vs Zodiac Compatibility
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlike Zodiac compatibility—which involves astrological birth charts and sun signs—this Love Calculator simply relies on the text of the names you input. It does not factor in birth dates, horoscopes, or planetary alignments. It's a much simpler, instantaneous game.
          </p>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-indigo-500" />
            Frequently Asked Questions
          </h2>
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* Related Tools */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Related Love & Relationship Tools
            </h2>
            <Link href="/categories/love" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Love Tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {module.relatedTools.map((rt) => {
              const matchedTool = TOOLS.find(t => t.slug === rt.slug);
              return matchedTool ? <ToolCard key={matchedTool.id} tool={matchedTool} /> : null;
            })}
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <ToolComments toolSlug="love-calculator" />
        </section>
      </div>
    </>
  );
}
