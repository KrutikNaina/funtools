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
import { Dices, HelpCircle, ShieldCheck, Zap } from "lucide-react";
import { decisionWheelContent as module } from "@/lib/content/decision-wheel";

export const metadata: Metadata = {
  title: "Ultimate Decision Wheel – Free Random Picker | GetFunTools",
  description:
    "Use our free decision wheel to randomly pick a name, choice, task, winner, meal, movie, or game. Add your options, spin the wheel, and get an instant result.",
  alternates: {
    canonical: `${SITE_URL}/tools/decision-wheel`,
  },
  openGraph: {
    title: "Ultimate Decision Wheel – Free Random Picker | GetFunTools",
    description: "Add your choices, spin the wheel, and let a random pick make the decision for you.",
    url: `${SITE_URL}/tools/decision-wheel`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Decision Wheel – Free Random Picker",
    description: "Add your choices, spin the wheel, and let a random pick make the decision for you.",
  },
};

export default function DecisionWheelPage() {
  const tool = TOOLS.find((t) => t.slug === "decision-wheel");
  if (!tool) return null;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Ultimate Decision Wheel",
    description: metadata.description,
    url: `${SITE_URL}/tools/decision-wheel`,
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ultimate Decision Wheel",
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
      { "@type": "ListItem", position: 1, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 2, name: "Random & Luck", item: `${SITE_URL}/categories/random` },
      { "@type": "ListItem", position: 3, name: "Decision Wheel", item: `${SITE_URL}/tools/decision-wheel` },
    ],
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
            { label: "Random & Luck", href: "/categories/random" },
            { label: "Decision Wheel" },
          ]}
        />

        {/* Hero */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Dices className="w-3.5 h-3.5" />
              Random Picker
            </div>
            <BookmarkButton slug="decision-wheel" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Ultimate Decision Wheel – Free Random Picker
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Can't decide? Add your choices, spin the wheel, and let a random pick make the decision for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> No signup required</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-500" /> Instant results</span>
          </div>
        </header>

        {/* Interactive Tool — the wheel is the focus */}
        <section id="interactive-tool" className="max-w-6xl mx-auto">
          <DecisionWheel />
        </section>

        <AdBanner slot="7788990022" format="horizontal" label="In-Article Ad" />

        {/* What Is a Decision Wheel */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Is a Decision Wheel?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A decision wheel is an interactive random picker that represents your choices as segments around a wheel and
            selects one option when spun. It's a quick, visual way to let randomness settle a decision instead of going
            back and forth.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">How to Use the Decision Wheel</h2>
          <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>Enter your choices, one per line — or pick a ready-made preset list.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>Add as many options as you want, up to 500.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Click <strong>SPIN</strong> (or press Ctrl+Enter).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
              <span>See the selected result below the wheel.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
              <span>Remove the winner and spin again, or copy the result.</span>
            </li>
          </ol>
        </section>

        {/* Use Cases */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Can You Use a Decision Wheel For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Dinner decisions",
              "Movie selection",
              "Random name picking",
              "Classroom activities",
              "Giveaways",
              "Party games",
              "Team activities",
              "Task selection",
              "Travel decisions",
              "Everyday choices",
            ].map((item) => (
              <div key={item} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Random Name Picker */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Random Name Picker</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Paste a list of names into the entries box — one per line, or a comma-separated list pasted from a
            spreadsheet — and spin to randomly select a person. Turn on "Remove winner after each spin" if you're
            picking multiple people in turn without repeats.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Wheel for Giveaways</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The wheel can help you select a winner from a list of entrants you provide. If you're running a giveaway
            with legal or promotional requirements, check your local rules on how winners need to be selected,
            notified, and verified — this tool only handles the random selection step.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Wheel for Classrooms</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Enter student names or team names and spin to call on someone, assign a task, or split into groups.
            Elimination mode is useful here — it removes each selected student so everyone gets a turn before anyone
            repeats.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Wheel for Parties and Games</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Use the Party Games preset, or build your own list of dares, prompts, or mini-games, and let the wheel
            decide what happens next.
          </p>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-500" />
            Frequently Asked Questions
          </h2>
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* Related Tools */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Related Tools</h2>
            <Link href="/categories/random" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View All Random Tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
