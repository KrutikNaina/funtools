import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import LoveCalculator from "@/components/tools/LoveCalculator";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import ToolPageHeader from "@/components/ToolPageHeader";
import ToolTrustBar from "@/components/ToolTrustBar";
import ToolComments from "@/components/ToolComments";
import { SITE_URL } from "@/lib/site";
import {
  Heart,
  ShieldCheck,
  Zap,
  Sparkles,
  Flame,
  Users,
  Shuffle,
  Lock,
  Compass,
  CheckCircle2,
  ArrowRight,
  Info,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { loveCalculatorContent as module } from "@/lib/content/love-calculator";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: "Love Calculator by Name – Free Love Percentage Test | GetFunTools",
  description:
    "Calculate a fun love percentage using two names with our free love calculator. Try it for your crush, partner or best friend, then share your result. No signup required.",
  alternates: {
    canonical: `${SITE_URL}/tools/love-calculator`,
  },
  openGraph: {
    title: "Love Calculator by Name – Free Love Percentage Test | GetFunTools",
    description:
      "Calculate a fun love percentage using two names with our free love calculator. Try it for your crush, partner or best friend, then share your result. No signup required.",
    url: `${SITE_URL}/tools/love-calculator`,
    siteName: "GetFunTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Calculator by Name – Free Love Percentage Test | GetFunTools",
    description:
      "Calculate a fun love percentage using two names with our free love calculator. Try it for your crush, partner or best friend, then share your result. No signup required.",
  },
};

export default function LoveCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "love-calculator");
  if (!tool) return null;

  // Structured Data Schemas
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Love Calculator by Name – Free Love Percentage Test",
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
      "A free, privacy-first love percentage calculator that computes a fun compatibility score between two names using a deterministic character algorithm with 4 relationship modes.",
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-2">
        {/* Compact Tool Header: Preserves exact H1 and brings tool above the fold */}
        <ToolPageHeader
          className="max-w-4xl mx-auto"
          title="Love Calculator by Name"
          description="Calculate a fun love percentage using two names with our free love calculator. Try it for your crush, partner or best friend, then share your result."
          breadcrumbItems={[
            { label: "Tools", href: "/tools" },
            { label: "Love & Relationships", href: "/categories/love" },
            { label: "Love Calculator by Name" },
          ]}
          toolSlug="love-calculator"
          categoryBadge={{
            label: "Love Compatibility",
            icon: <Heart className="w-3.5 h-3.5 fill-current" />,
            colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
          }}
        />

        {/* Interactive Tool — Primary Above-the-Fold Content */}
        <section id="calculator-tool" aria-label="Love Calculator Interactive Tool" className="max-w-4xl mx-auto space-y-8">
          <LoveCalculator />
          <WhatsNext currentTool={tool} />
          <CategoryDiscovery currentCategory="love" />
        </section>

        {/* Trust Badges & Metadata — Contextual Trust Signals */}
        <div className="max-w-4xl mx-auto pt-6">
          <ToolTrustBar
            items={[
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />, label: "100% Private (No Names Stored)" },
              { icon: <Zap className="w-3.5 h-3.5 text-amber-500" />, label: "Instant Browser Calculation" },
              { icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />, label: "4 Relationship Modes" },
              { icon: <Lock className="w-3.5 h-3.5 text-rose-500" />, label: "Zero Server Transmission" },
            ]}
          />
        </div>

        {/* AdSense Container — Stable Min-Height to Prevent CLS */}
        <div className="max-w-4xl mx-auto min-h-[120px] flex items-center justify-center">
          <AdBanner slot="7788990011" format="horizontal" label="Advertisement" />
        </div>

        {/* Informational SEO & Search-Intent Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1: Calculate Your Compatibility (How to Use) */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Calculate Your Compatibility: How to Use the Love Calculator
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Whether you want a playful icebreaker for your crush, a date-night laugh with your romantic partner, or a fun comparison with your best friend, our <strong>free love calculator</strong> gives you an instant compatibility score in five simple steps:
              </p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-[11px]">1</span>
                  Enter Your Name
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Type your first name or common nickname into the first input box. No account or email registration required.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-[11px]">2</span>
                  Enter Partner or Crush Name
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Enter the second name into the partner field. You can test lovers, crushes, study partners, or celebrity idols.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-[11px]">3</span>
                  Select Relationship Mode
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Pick between <em>Cosmic Soulmates</em>, <em>Spicy & Playful</em>, <em>Bestie Chemistry</em>, or <em>Pure Chaotic Fun</em> to match your current vibe.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-[11px]">4</span>
                  Calculate Love Percentage
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Click the button or press <strong>Enter</strong> to trigger the deterministic browser algorithm and reveal your animated score gauge.
                </p>
              </li>

              <li className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-[11px]">5</span>
                  Share Your Fun Result
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Copy your formatted score badge to your clipboard with one click, or send the friend challenge link directly over WhatsApp, Instagram, Discord, or SMS.
                </p>
              </li>
            </ol>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Date Night Idea:</strong> Can&apos;t agree on what to eat or watch after testing your love compatibility by name? Let fate decide by spinning our free{" "}
                <Link href="/tools/decision-wheel" className="font-bold text-rose-600 dark:text-rose-400 underline hover:opacity-80">
                  Decision Wheel
                </Link>{" "}
                to pick a dinner spot, movie, or fun evening activity.
              </span>
            </div>
          </article>

          {/* Section 2: What Does Your Love Score Mean? */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                What Does Your Love Score Mean?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                When using this <strong>love percentage calculator</strong>, your score is generated between <strong>65% and 99%</strong>. We intentionally designed the calculator without demoralizing zero or negative scores. Every match tier highlights an upbeat dynamic designed to bring smiles and spark fun banter:
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
                  Unpredictable banter with surprising moments of chemistry. Great for sparking quirky debates and teasing.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Note: Every score generated by this tool is created for social recreation and entertainment. It does not measure or reflect real-world emotional compatibility or psychological compatibility.
            </p>
          </article>

          {/* Section 3: 4 Relationship Compatibility Modes */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                4 Relationship Compatibility Modes
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                One size does not fit every bond. Unlike basic calculators that treat every name pairing identically, our <strong>love calculator with names</strong> provides four dedicated relationship modes tailored to different stages of romance, friendship, and banter:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Cosmic Soulmates</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Best for:</strong> Established romantic couples, partners, anniversaries, and hopeful romantics.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Focuses on emotional harmony, romantic alignment, and enduring affection. Perfect for taking cute screenshots to post on your stories or sending anniversary greetings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200/60 dark:border-pink-900/40 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Spicy & Playful</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Best for:</strong> Crushes, early talking stages, first dates, and flirty banter.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Designed as a low-pressure icebreaker. If you want to drop a playful hint or send an intriguing message to someone you fancy, this mode delivers witty, conversation-starting vibes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤝</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Bestie Chemistry</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Best for:</strong> Platonic best friends, roommates, gaming duos, and study buddies.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Relationship compatibility isn&apos;t limited to romance! Test your platonic camaraderie to see who in your friend group has the strongest mutual loyalty and shared humor.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pure Chaotic Fun</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Best for:</strong> Frenemies, hilarious rivalries, party icebreakers, and celebrity match-ups.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Built for wild laughs and unexpected results. Plug in coworker rivalries, fictional anime characters, or historical figures during game nights for unpredictable comedy.
                </p>
              </div>
            </div>
          </article>

          {/* Section 4: How Does the Love Calculator Algorithm Work? */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                How Does the Love Calculator Algorithm Work?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Rather than relying on random guesswork or tracking your personal information, the <strong>Love Calculator by Name</strong> operates on a transparent, 100% deterministic client-side text algorithm:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 1. Input Processing
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Both names are trimmed and combined with your selected relationship mode identifier into a unified lowercase string in browser memory.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 2. Character Code Summation
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The script iterates through each character in the string, extracting its numeric ASCII character code (via <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">charCodeAt</code>) and summing the values into a total.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 3. Deterministic Scaling
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The sum is modulo-mapped using mathematical scaling to establish an upbeat percentage between 65% and 99%, ensuring consistent results for identical inputs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> 4. Client-Side Privacy
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  All calculations happen instantaneously inside your web browser. Zero names or responses are ever sent to an external server or saved in a database.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                The Exact Calculation Formula
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The mathematical logic powering the calculator is straightforward and completely reproducible:
              </p>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200">
                Score = 65 + (sum_of_character_codes % 35)
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Because the function is deterministic, entering the same two names under the same relationship mode will produce the exact same percentage every time. If you switch between modes (e.g., from <em>Cosmic Soulmates</em> to <em>Spicy & Playful</em>), the mode identifier shifts the character sum, giving you a fresh perspective!
              </p>
            </div>
          </article>

          {/* Section 5: Comparison: Love Calculator vs Zodiac vs FLAMES */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Comparison: Love Calculator vs Zodiac vs FLAMES
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                People often compare the online <strong>love compatibility calculator</strong> to other popular relationship games like Zodiac astrology charts and the nostalgic FLAMES game. Here is a neutral, factual comparison of how they work:
              </p>
            </div>

            {/* Responsive Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th scope="col" className="p-3.5">Feature</th>
                    <th scope="col" className="p-3.5 text-rose-600 dark:text-rose-400">Love Calculator by Name</th>
                    <th scope="col" className="p-3.5">Zodiac Compatibility</th>
                    <th scope="col" className="p-3.5">FLAMES Game</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Required Input</td>
                    <td className="p-3.5">Two Names + Relationship Vibe</td>
                    <td className="p-3.5">Birth Dates, Time & Sun Signs</td>
                    <td className="p-3.5">Two Names (Letter Strikeout)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Underlying Basis</td>
                    <td className="p-3.5">Deterministic ASCII Text Sum</td>
                    <td className="p-3.5">Astrological Traditions & Charts</td>
                    <td className="p-3.5">Acronym Letter Elimination</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Result Format</td>
                    <td className="p-3.5">65% – 99% Gauge + Custom Vibe</td>
                    <td className="p-3.5">Element Harmony & Archetype</td>
                    <td className="p-3.5">6 Fixed Letters (F-L-A-M-E-S)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Deterministic Consistency</td>
                    <td className="p-3.5">100% Identical for Same Names</td>
                    <td className="p-3.5">Fixed by Birth Calendar</td>
                    <td className="p-3.5">Fixed by Elimination Count</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Scientific Validity</td>
                    <td className="p-3.5">None (Entertainment Only)</td>
                    <td className="p-3.5">None (Astrological Lore)</td>
                    <td className="p-3.5">None (Schoolyard Nostalgia)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">User Privacy</td>
                    <td className="p-3.5">100% Client-Side (No Storage)</td>
                    <td className="p-3.5">Often Requires Birth Details</td>
                    <td className="p-3.5">Pen & Paper or Web Tool</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Primary Benefit</td>
                    <td className="p-3.5">Instant Fun & Shareable Cards</td>
                    <td className="p-3.5">Personality Reflection</td>
                    <td className="p-3.5">Nostalgic Childhood Memory</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4 pt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                <strong>Love Calculator vs Zodiac:</strong> Astrological compatibility requires looking up horoscopes, solar signs, and planetary elements (Fire, Earth, Air, Water). This Love Calculator requires zero birth dates, runs in under a second, and gives you an instant shareable result card without needing natal chart interpretations.
              </p>
              <p>
                <strong>Love Calculator vs FLAMES:</strong> FLAMES is a beloved schoolyard game where common letters are struck from two names to cycle through <em>Friends, Lovers, Affection, Marriage, Enemy, Siblings</em>. Our tool modernizes that nostalgic impulse by replacing manual pen-and-paper striking with an animated percentage meter, custom relationship modes, and high-score confetti celebrations.
              </p>
            </div>
          </article>

          {/* Section 6: Responsible Entertainment & Relationship Disclaimer */}
          <article className="p-6 md:p-8 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-4 shadow-sm">
            <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6 flex-shrink-0" />
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Responsible Entertainment & Relationship Disclaimer
              </h2>
            </div>

            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>The GetFunTools Love Calculator is designed exclusively for recreational entertainment, lighthearted icebreakers, and social sharing.</strong>
              </p>
              <p>
                Compatibility scores are generated via a browser-based mathematical character algorithm. Names, letters, and spelling hold zero scientific, psychological, psychiatric, or predictive power over whether a romantic partnership or friendship will succeed or endure.
              </p>
              <p>
                Genuine relationship compatibility depends on human qualities that no algorithm can quantify:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600 dark:text-slate-400">
                <li>Clear, honest, and compassionate communication</li>
                <li>Shared life values, mutual boundaries, and mutual respect</li>
                <li>Emotional empathy, active listening, and patience</li>
                <li>Willingness to navigate disagreements constructively</li>
              </ul>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Enjoy the score as a fun conversation piece, but never make real-life relationship decisions based on an online calculator!
              </p>
            </div>
          </article>
        </div>

        {/* FAQs Section with Valid FAQPage Schema Parity */}
        <section id="faq-section" className="max-w-4xl mx-auto pt-8">
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* Related Tools with High-Intent Descriptive Anchors */}
        <section className="max-w-4xl mx-auto space-y-6 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related Relationship, Social & Decision Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore more interactive calculators, randomizers, and viral utilities on GetFunTools.
              </p>
            </div>
            <Link
              href="/categories/love"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Explore All Love & Relationship Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
            {module.relatedTools.map((rt) => {
              const matchedTool = TOOLS.find((t) => t.slug === rt.slug);
              return matchedTool ? <ToolCard key={matchedTool.id} tool={matchedTool} /> : null;
            })}
          </div>
        </section>

        {/* Community Discussion (Honest, Real Feedback, No Fake Testimonials) */}
        <div className="max-w-4xl mx-auto pt-10">
          <ToolComments toolSlug="love-calculator" />
        </div>
      </div>
    </>
  );
}
