import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import DecisionWheel from "@/components/tools/DecisionWheel";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import { SITE_URL } from "@/lib/site";
import {
  Dices,
  ShieldCheck,
  Zap,
  HelpCircle,
  RotateCw,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Award
} from "lucide-react";
import { decisionWheelContent as module } from "@/lib/content/decision-wheel";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: {
    absolute: "Decision Wheel – Free Random Picker & Spin the Wheel | GetFunTools",
  },
  description:
    "Spin the wheel and make decisions instantly with this free random picker. Create custom wheels, pick random names, choose Yes/No, and share your wheel online.",
  alternates: {
    canonical: `${SITE_URL}/tools/decision-wheel`,
  },
  openGraph: {
    title: "Decision Wheel – Free Random Picker",
    description: "Spin the wheel, pick a random choice, and make decisions instantly.",
    url: `${SITE_URL}/tools/decision-wheel`,
    siteName: "GetFunTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decision Wheel – Free Random Picker",
    description: "Spin the wheel, pick a random choice, and make decisions instantly.",
  },
};

export default function DecisionWheelPage() {
  const tool = TOOLS.find((t) => t.slug === "decision-wheel");
  if (!tool) return null;

  // Structured Data Schemas
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Decision Wheel – Free Random Picker & Spin the Wheel",
    description:
      "Spin the wheel and make decisions instantly with this free random picker. Create custom wheels, pick random names, choose Yes/No, and share your wheel online.",
    url: `${SITE_URL}/tools/decision-wheel`,
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
    name: "Decision Wheel – Free Random Picker",
    url: `${SITE_URL}/tools/decision-wheel`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All modern web browsers (iOS, Android, macOS, Windows, Linux)",
    browserRequirements: "Requires JavaScript. Runs entirely client-side.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A free, responsive online decision wheel and random name picker that lets you spin the wheel to select choices, settle dilemmas, and draw winners instantly.",
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
        name: "Random & Luck",
        item: `${SITE_URL}/categories/random`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Decision Wheel",
        item: `${SITE_URL}/tools/decision-wheel`,
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
            { label: "Random & Luck", href: "/categories/random" },
            { label: "Decision Wheel" },
          ]}
        />

        {/* Hero Section — Primary Search Intent */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Dices className="w-3.5 h-3.5" />
              Random Picker
            </div>
            <BookmarkButton slug="decision-wheel" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Decision Wheel – Free Random Picker
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Add your choices, spin the wheel, and get a random result instantly. Use it as a decision maker, random name picker, or wheel spinner for everyday choices, games, classrooms, giveaways, and more.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              No Signup Required
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Instant Browser Results
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCw className="w-4 h-4 text-indigo-500" />
              Up to 500 Choices
            </span>
          </div>
        </header>

        {/* Interactive Tool — Kept immediately visible above the fold */}
        <section id="interactive-tool" aria-label="Interactive Decision Wheel" className="max-w-6xl mx-auto space-y-8">
          <DecisionWheel />
          <WhatsNext currentTool={tool} />
          <CategoryDiscovery currentCategory="random" />
        </section>

        {/* AdSense Container — Stable Min-Height to Prevent CLS */}
        <div className="max-w-4xl mx-auto min-h-[120px] flex items-center justify-center">
          <AdBanner slot="7788990022" format="horizontal" label="Advertisement" />
        </div>

        {/* Informational Content Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1: Spin the Wheel Online */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Spin the Wheel Online
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              When facing a tough dilemma, overthinking is usually the enemy. An online <strong>wheel spinner</strong> eliminates decision fatigue by turning your options into an impartial, visual random picker. Here is how you can use this <strong>decision wheel</strong> in seconds:
            </p>

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[11px]">1</span>
                  Add Choices
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Type your options line-by-line, paste a comma-separated list, or select one of 10 ready-made presets.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[11px]">2</span>
                  Spin the Wheel
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Click the center <strong>SPIN</strong> button or press <strong>Ctrl+Enter</strong> (Cmd+Enter on Mac) to start spinning.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[11px]">3</span>
                  Get Random Result
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The wheel smoothly decelerates and lands on the selected winner, complete with sound and confetti.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[11px]">4</span>
                  Manage or Share
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Copy the winner, enable Elimination Mode to remove winners after each spin, or share your custom wheel via link.
                </p>
              </li>
            </ol>
          </article>

          {/* Section 2: Random Name Picker & Wheel of Names */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Random Name Picker & Wheel of Names
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A <strong>wheel of names</strong> is one of the most widely used applications for this tool. By entering a roster of people, you can turn any random draw into an exciting, transparent visual event. Common ways teachers, managers, and creators use it include:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Classroom Student Names</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Call on students randomly for questions or reading turns. Turn on <em>&quot;Remove winner after each spin&quot;</em> so every student gets a turn before anyone repeats.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Giveaways & Raffles</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Paste contest entrant handles or ticket numbers into the entries box and spin live on stream to reveal lucky prize winners.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Team Standups & Speakers</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Eliminate awkward silence during agile meetings by letting the random picker wheel choose who gives their update or leads the retrospective next.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Volunteers & Chore Duty</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Fairly assign household chores, event volunteers, or task responsibilities without favoritism or arguments.
                </p>
              </div>
            </div>
          </article>

          {/* Section 3: Decision Wheel Use Cases */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Decision Wheel Use Cases
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you need a quick choice picker for personal decisions or a fun group activity, here are practical ways our users put the wheel to work every day:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: "🍕 What to Eat?", desc: "Pick between pizza, sushi, tacos, burgers, or home cooking." },
                { title: "🎬 What to Watch?", desc: "Select movie genres, watchlist titles, or TV series." },
                { title: "🎮 What to Play?", desc: "Choose board games, multiplayer titles, or video game genres." },
                { title: "🎒 Classroom Turns", desc: "Select students for presentations, trivia, and team captains." },
                { title: "🎁 Giveaways & Contests", desc: "Draw giveaway winners impartially on streams or events." },
                { title: "🎉 Party Games & Dares", desc: "Spin for Truth or Dare, Charades, or funny party challenges." },
                { title: "✈️ Travel Destinations", desc: "Settle on weekend road trips, vacation spots, or hiking trails." },
                { title: "🏋️ Workout Routines", desc: "Pick daily exercises, muscle groups, or interval routines." },
                { title: "⚖️ Yes or No Dilemmas", desc: "Quickly break 50/50 ties using the dedicated Yes/No mode." },
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{c.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Section 4: Fairness / Randomness Technical Explanation */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Is the Decision Wheel Random?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Yes, the wheel is powered by a standard mathematical pseudo-random selection process.</strong> Here is the exact technical reality behind each spin:
            </p>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  How the Math Works
                </h3>
                <p className="text-xs leading-relaxed">
                  When you initiate a spin, the tool calls the JavaScript environment&apos;s standard pseudo-random number generator (<code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-xs">Math.random()</code>). The winning index is determined by:
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  selectedIndex = Math.floor(Math.random() * entries.length)
                </div>
                <p className="text-xs leading-relaxed">
                  Each active entry receives an identical angular slice of <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-xs">360 / N</code> degrees, meaning every option has an exact <strong>1-in-N equal probability</strong> of being selected.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Visual Synchronization
                </h3>
                <p className="text-xs leading-relaxed">
                  The wheel does not stop on a random angle and then read whatever slice happens to be beneath the needle. Instead, the winner is determined <em>first</em>, and the CSS rotation angle is mathematically calculated so that the wheel rotates multiple full revolutions before coming to rest precisely on the winning segment. The visual result always matches the selected winner.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300">
                <strong>Honest Transparency:</strong> This tool uses standard browser pseudo-randomness. It is not a hardware-generated or cryptographically certified random number generator (CSPRNG) audited by state gaming commissions. It is designed for fair, recreational everyday decisions, games, classroom activities, and community giveaways.
              </div>
            </div>
          </article>

          {/* Section 5: Privacy & Local Storage */}
          <article className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Are My Choices Saved or Stored on a Server?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Your choices remain private on your own device.</strong> The Decision Wheel operates entirely within your browser:
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Local Storage Only:</strong> Custom options, settings, and spin history are saved in your browser&apos;s <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">localStorage</code> so your list is still there when you return.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero Server Databases:</strong> Your choices are never sent to, stored in, or logged by an external database.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>URL-Based Sharing:</strong> When you click &quot;Share Wheel&quot;, your choices are encoded into the URL parameters client-side (<code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">?items=...</code>) so you can share your exact wheel with friends without server uploads.</span>
              </li>
            </ul>
          </article>
        </div>

        {/* FAQs Section with FAQPage Schema Parity */}
        <section id="faq-section" className="max-w-4xl mx-auto">
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* Related Tools — Contextually Relevant Internal Links */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related Random, Chance & Calculation Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore more interactive calculators and viral tools on GetFunTools.
              </p>
            </div>
            <Link
              href="/categories/random"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Explore All Random & Luck Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {module.relatedTools.map((rt) => {
              const matchedTool = TOOLS.find((t) => t.slug === rt.slug);
              return matchedTool ? <ToolCard key={matchedTool.id} tool={matchedTool} /> : null;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

