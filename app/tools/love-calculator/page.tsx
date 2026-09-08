import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import LoveCalculator from "@/components/tools/LoveCalculator";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import ToolComments from "@/components/ToolComments";
import { SITE_URL } from "@/lib/site";
import {
  Heart,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  Flame,
  Users,
  Shuffle,
  Lock,
  Compass,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { loveCalculatorContent as module } from "@/lib/content/love-calculator";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: "Love Calculator by Name – Free Love Compatibility Test | GetFunTools",
  description:
    "Calculate your love compatibility by name instantly. Enter two names to get a fun love percentage, relationship vibe, and shareable result card. Free, private, and no signup required.",
  alternates: {
    canonical: `${SITE_URL}/tools/love-calculator`,
  },
  openGraph: {
    title: "Love Calculator by Name – Free Love Compatibility Test | GetFunTools",
    description:
      "Calculate your love compatibility by name instantly. Enter two names to get a fun love percentage, relationship vibe, and shareable result card. Free, private, and no signup required.",
    url: `${SITE_URL}/tools/love-calculator`,
    siteName: "GetFunTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Calculator by Name | GetFunTools",
    description:
      "Enter two names to calculate your love compatibility percentage instantly. 100% free, private, and entertainment-focused.",
  },
};

export default function LoveCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "love-calculator");
  if (!tool) return null;

  // Structured Data Schemas
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Love Calculator by Name – Free Love Compatibility Test",
    description: metadata.description,
    url: `${SITE_URL}/tools/love-calculator`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "GetFunTools",
      url: SITE_URL,
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Love Calculator by Name",
    url: `${SITE_URL}/tools/love-calculator`,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "All modern web browsers (iOS, Android, macOS, Windows, Linux)",
    browserRequirements: "Requires JavaScript. Runs entirely client-side.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A free, privacy-first web application that calculates an instant compatibility percentage between two names with custom relationship vibe modes.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Love & Relationships",
        item: `${SITE_URL}/categories/love`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Love Calculator by Name",
        item: `${SITE_URL}/tools/love-calculator`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-12 pt-2">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Love & Relationships", href: "/categories/love" },
            { label: "Love Calculator by Name" },
          ]}
        />

        {/* Hero Section — Immediate Search Intent Satisfaction */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Love Compatibility Tool
            </div>
            <BookmarkButton slug="love-calculator" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Love Calculator by Name
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Enter two names to calculate a fun love compatibility percentage instantly. Free, private, and no signup required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% Private (No Data Saved)
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Instant Browser Calculation
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              4 Relationship Modes
            </span>
          </div>
        </header>

        {/* Interactive Tool — Primary Above-the-Fold Content */}
        <section id="calculator-tool" aria-label="Love Calculator Interactive Tool" className="max-w-4xl mx-auto space-y-8">
          <LoveCalculator />
          <WhatsNext currentTool={tool} />
          <CategoryDiscovery currentCategory="love" />
        </section>

        {/* AdSense Container — Stable Min-Height to Prevent CLS */}
        <div className="max-w-4xl mx-auto min-h-[120px] flex items-center justify-center">
          <AdBanner slot="7788990011" format="horizontal" label="Advertisement" />
        </div>

        {/* Section 1: Score Meanings & How It Works */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* What Does Your Love Score Mean? */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                What Does My Love Percentage Mean?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Your love score is an upbeat percentage between <strong>65% and 99%</strong> generated by our text algorithm. We intentionally designed the calculator without discouraging zero or negative scores—every match highlights a unique dynamic to celebrate:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">90% – 99%</span>
                  <span className="text-lg">✨</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">Legendary Match</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Effortless mutual synergy, synchronized humor, and electric chemistry. Triggers celebratory confetti!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">80% – 89%</span>
                  <span className="text-lg">🔥</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">Strong Connection</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  High energy, lively banter, and strong conversational flow. Great balance of mutual trust and fun.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">70% – 79%</span>
                  <span className="text-lg">🤝</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">Fun & Dynamic Duo</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Spontaneous, creative spark with plenty of laughs. Excellent for friends, roommates, and adventurous outings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">65% – 69%</span>
                  <span className="text-lg">⚡</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">Playful Potential</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Unpredictable banter with surprising moments of chemistry. Great for sparking quirky debates.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Note: This score is calculated via a browser-based name character algorithm for recreational entertainment and is not a scientific or psychological assessment.
            </p>
          </article>

          {/* How Does the Love Calculator by Name Work? */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              How Does the Love Calculator by Name Work?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike astrology apps that look up planetary alignments or dating sites that run behavioral surveys, the <strong>Love Calculator by Name</strong> operates on a direct, client-side character algorithm:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 1. Input Processing
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Both names are trimmed and combined with your selected relationship vibe mode inside browser memory.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 2. Character Code Sum
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Each letter’s character code (ASCII) is extracted and summed into a total numerical value.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 3. Deterministic Scaling
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The sum is modulo-mapped into an upbeat percentage between 65% and 99%, ensuring consistent results for identical inputs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 4. Vibe Analysis & Sharing
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The animated gauge reveals your match category, playful advice, and ready-to-copy social sharing cards.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                How Is the Love Percentage Calculated?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                The exact mathematical calculation implemented in the tool is:
              </p>
              <div className="mt-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200">
                Score = 65 + (sum_of_character_codes % 35)
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                This produces a score between 65% and 99%. Because the algorithm is deterministic, entering the same two names in the same vibe mode will produce the same fun percentage every time.
              </p>
            </div>
          </article>

          {/* Section 2: Informational Deep Dives */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Can I Use the Love Calculator for a Crush?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Yes! Testing names with a crush is one of the most popular uses of this tool. If you have recently started chatting or want a low-pressure way to break the ice, switch to the <strong>Spicy & Playful</strong> vibe mode. You can copy the result text or send a playful screenshot as a lighthearted conversation starter.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Can Friends Use the Love Calculator?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Compatibility isn’t limited to romance. Select <strong>Bestie Chemistry</strong> to evaluate platonic connections between friends, roommates, or gaming partners. If you want to test funny rivalries or frenemy dynamics, try <strong>Pure Chaotic Fun</strong> for hilarious banter.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Is the Love Calculator Accurate?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>No. The Love Calculator is purely an entertainment game.</strong> While the math is completely deterministic (meaning the same letters yield the same score), it has no basis in psychology, relationship science, or astrology. Genuine human compatibility depends on shared values, clear communication, empathy, and mutual effort. Treat the calculator as a fun social icebreaker, never as relationship guidance.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Are My Names Stored?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>No names are ever saved, stored, or transmitted to any server.</strong> All computations occur entirely in your web browser’s local memory using client-side JavaScript. Once you refresh or close the tab, the inputs are completely gone. We respect your privacy: no tracking, no database storage, and no email registration.
              </p>
            </div>
          </article>

          {/* Section 3: Comparisons and Usage Guide */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Love Calculator vs Zodiac Compatibility
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Zodiac compatibility tests compare astrological signs, elemental affinities (Fire, Earth, Air, Water), and natal chart aspects based on birth dates and birth times. In contrast, this Love Calculator relies strictly on the letters in your names and selected relationship vibe. It requires no birth dates, works in seconds, and provides immediate casual fun.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Love Calculator vs FLAMES
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                FLAMES is a classic childhood pen-and-paper game where shared letters in two names are struck out, and the count of remaining letters is used to cycle through six fixed outcomes: <em>Friends, Lovers, Affection, Marriage, Enemy, Siblings</em>. Our online Love Calculator by Name improves on that nostalgia by giving you an animated percentage meter, custom relationship modes, and modern share cards without requiring manual letter counting.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                How to Use the Love Calculator
              </h2>
              <ol className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">1</span>
                  <span><strong>Enter Your Name:</strong> Type your first name or preferred nickname into the first input box.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">2</span>
                  <span><strong>Enter Partner&apos;s / Crush&apos;s Name:</strong> Enter the second name into the partner field.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">3</span>
                  <span><strong>Choose Relationship Vibe:</strong> Pick between Cosmic Soulmates, Spicy & Playful, Bestie Chemistry, or Pure Chaotic Fun.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">4</span>
                  <span><strong>Click &apos;Calculate Love Compatibility&apos;:</strong> Watch the animated score gauge appear instantly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">5</span>
                  <span><strong>Share Your Result:</strong> Copy the text to your clipboard or send the challenge link to your partner or friend.</span>
                </li>
              </ol>
            </div>
          </article>
        </div>

        {/* FAQs Section with FAQPage Schema parity */}
        <section id="faq-section" className="max-w-4xl mx-auto">
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* Related Tools with High-Intent Descriptive Anchors */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related Relationship, Social & Decision Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore more interactive calculators and viral tools on GetFunTools.
              </p>
            </div>
            <Link
              href="/categories/love"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Explore All Love & Relationship Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {module.relatedTools.map((rt) => {
              const matchedTool = TOOLS.find((t) => t.slug === rt.slug);
              return matchedTool ? <ToolCard key={matchedTool.id} tool={matchedTool} /> : null;
            })}
          </div>
        </section>

        {/* Community Discussion (Honest, No Fake Testimonials) */}
        <section className="max-w-4xl mx-auto">
          <ToolComments toolSlug="love-calculator" />
        </section>
      </div>
    </>
  );
}

