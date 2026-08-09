import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import RandomNumberGenerator from "@/components/tools/RandomNumberGenerator";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import { SITE_URL } from "@/lib/site";
import {
  Dices,
  HelpCircle,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Random Number Generator – Free Random Number Picker | GetFunTools",
  description:
    "Generate random numbers instantly with custom minimum and maximum ranges. Choose multiple numbers, allow or prevent repeats, copy results, and use random numbers for games, raffles, giveaways, and everyday decisions.",
  alternates: {
    canonical: `${SITE_URL}/tools/random-number-generator`,
  },
  robots: "index, follow",
  openGraph: {
    title: "Random Number Generator – Free Random Number Picker",
    description:
      "Generate random numbers with custom ranges, multiple results, and optional duplicate numbers. Free and easy to use.",
    url: `${SITE_URL}/tools/random-number-generator`,
    type: "website",
    siteName: "GetFunTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Number Generator – Free Random Number Picker",
    description:
      "Generate random numbers with custom ranges, multiple results, and optional duplicate numbers. Free and easy to use.",
  },
};

const faqs = [
  {
    question: "What is a random number generator?",
    answer:
      "A random number generator (RNG) is a tool or algorithm that produces numbers from a defined range without any predictable pattern. Software RNGs like this one use a pseudorandom algorithm — numbers are chosen in a way that appears random and has no obvious sequence, though they are produced by a mathematical formula inside the browser.",
  },
  {
    question: "How do I generate a random number?",
    answer:
      "Enter a minimum and maximum value, choose how many numbers you want, then click Generate Random Numbers. Results appear as individual chips below the generator.",
  },
  {
    question: "Can I generate a random number between 1 and 100?",
    answer:
      "Yes. Set Minimum to 1, Maximum to 100, and Quantity to 1 (or more), then click Generate. You can also click the '1 – 100' quick range button to fill those values instantly.",
  },
  {
    question: "Can I generate multiple random numbers at once?",
    answer:
      "Yes. Set the 'How many?' field to any number between 1 and 10,000. All results are shown as individual chips so each value is clearly readable.",
  },
  {
    question: "Can I generate numbers without duplicates?",
    answer:
      "Yes. Uncheck 'Allow duplicate numbers' and the generator will produce only unique values. If you request more unique numbers than the range contains, a validation message explains the maximum available.",
  },
  {
    question: "Can I generate negative random numbers?",
    answer:
      "Yes. Set Minimum to a negative integer such as -50 and Maximum to a positive integer such as 50, and the generator handles the full range correctly.",
  },
  {
    question: "Can I generate zero?",
    answer:
      "Yes. Zero can appear as a result whenever it falls within your selected minimum–maximum range. For example, a range of 0 to 99 may include zero.",
  },
  {
    question: "What happens if I request more unique numbers than the range allows?",
    answer:
      "The generator shows a clear validation message. For example, if Min is 1, Max is 3, and Quantity is 5 with duplicates off, it will say 'You can generate a maximum of 3 unique numbers from this range.' No results are generated until the inputs are valid.",
  },
  {
    question: "Can I use this for raffles and giveaways?",
    answer:
      "Yes. Assign a number to each participant, set your range to match the number of entrants, and turn off duplicate numbers to ensure each winner is selected only once. For example, 50 entrants → Min: 1, Max: 50, Quantity: 3, Duplicates: Off.",
  },
  {
    question: "Is the random number generator free?",
    answer:
      "Yes. The tool is completely free with no signup, no account, and no usage limits. You can generate as many times as you like.",
  },
  {
    question: "Does the random number generator work on mobile?",
    answer:
      "Yes. The generator is fully responsive. Inputs stack vertically on small screens, buttons are sized for easy tapping, and results wrap neatly without any horizontal scrolling.",
  },
  {
    question: "Are computer-generated random numbers truly random?",
    answer:
      "Not in the strict sense. This tool uses JavaScript's Math.random(), which is a pseudorandom number generator (PRNG). Results appear unpredictable and are statistically well-distributed, but they are produced by a deterministic algorithm — not a physical source of randomness. For most everyday purposes such as games, raffles, and classroom use, this is more than sufficient.",
  },
];

const relatedSlugs = [
  "decision-wheel",
  "lucky-number-generator",
  "password-generator",
  "percentage-calculator",
  "date-calculator",
];

export default function RandomNumberGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "random-number-generator");

  const relatedTools = relatedSlugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TOOLS;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Random Number Generator",
    url: `${SITE_URL}/tools/random-number-generator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Generate random numbers instantly with custom minimum and maximum ranges. Choose multiple numbers, allow or prevent repeats, and copy results with one click.",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use the Random Number Generator",
    step: [
      { "@type": "HowToStep", position: 1, name: "Set minimum", text: "Enter the lowest number you want in the Minimum field." },
      { "@type": "HowToStep", position: 2, name: "Set maximum", text: "Enter the highest number you want in the Maximum field." },
      { "@type": "HowToStep", position: 3, name: "Choose quantity", text: "Enter how many numbers you want to generate in the 'How many?' field." },
      { "@type": "HowToStep", position: 4, name: "Generate", text: "Click Generate Random Numbers. Results appear as individual number chips below." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-12 pt-2">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Random & Luck", href: "/categories/random" },
            { label: "Random Number Generator" },
          ]}
        />

        {/* Hero */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Dices className="w-3.5 h-3.5" aria-hidden="true" />
              Random &amp; Luck
            </div>
            {tool && <BookmarkButton slug="random-number-generator" />}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Random Number Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Generate random numbers instantly with a custom range, multiple results, and optional duplicate numbers.
            Free to use with no signup.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" /> No signup required</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-500" aria-hidden="true" /> Instant results</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4 text-blue-500" aria-hidden="true" /> Works on all devices</span>
          </div>
        </header>

        {/* Interactive Tool */}
        <section id="interactive-tool" aria-label="Random number generator tool" className="max-w-3xl mx-auto">
          <RandomNumberGenerator />
        </section>

        {/* Ad Slot — after tool, before content */}
        <AdBanner slot="7788990011" format="horizontal" label="In-Article Ad" />

        {/* ── SEO CONTENT ───────────────────────────────────────────────── */}

        {/* How to Use */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            How to Use the Random Number Generator
          </h2>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {[
              { step: 1, text: "Enter the minimum number — the lowest value you want the generator to include." },
              { step: 2, text: "Enter the maximum number — the highest value in your range." },
              { step: 3, text: "Choose how many numbers to generate in the 'How many?' field." },
              { step: 4, text: "Click Generate Random Numbers. Your results appear as individual chips — easy to read and copy." },
            ].map(({ step, text }) => (
              <li key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
          <div className="mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-sm text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white">Duplicate option:</strong> Leave "Allow duplicate numbers" checked if you don't mind the same number appearing more than once (for example, rolling a die multiple times). Uncheck it if you need all results to be unique — useful for raffles, classroom draws, or any situation where each value should appear at most once.
          </div>
        </section>

        {/* No Repeats */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Random Number Generator With No Repeats
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Disabling duplicates tells the generator to pick each number at most once from your range. If your range is
            1–100 and you request 10 numbers with duplicates off, every result in the list will be a different value.
          </p>
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <p><strong>Range:</strong> 1 – 100 &nbsp;|&nbsp; <strong>Quantity:</strong> 10 &nbsp;|&nbsp; <strong>Duplicates:</strong> Off</p>
            <p className="text-slate-500 dark:text-slate-400">Result: 10 distinct numbers — no value appears twice.</p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            One important constraint: the number of requested results cannot exceed the count of integers in your range.
            A range of 1 to 5 only has 5 possible integers, so requesting 8 unique numbers from it isn't possible. The
            generator shows a clear message explaining the maximum available.
          </p>
        </section>

        {/* 1 to 10 */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Random Number Generator 1 to 10
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            One of the most common uses is picking a number from 1 through 10. Click the <strong>1 – 10</strong> quick
            range button, set Quantity to 1, and click Generate. You instantly get a single random number between 1 and
            10 — useful for settling small decisions, simple games, or classroom activities.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-sm text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white">Example:</strong> Min 1, Max 10, Quantity 3, Duplicates off → might produce: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">2, 7, 9</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You can also use this range to mimic a simple 10-sided die or to randomly order a list of up to 10 items.
            Need to pick a winner from a small group? Assign each person a number from 1 to 10 and generate one result.
          </p>
        </section>

        {/* 1 to 100 */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Random Number Generator 1 to 100
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The 1 to 100 range is popular for games, classroom activities, giveaways, and random selections. Click the{" "}
            <strong>1 – 100</strong> quick range button or type the values manually, then choose how many numbers you need.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {[
              "Games: Pick a mystery number and have players guess — reveal it with the generator.",
              "Classroom: Randomly select a student from a numbered list without favouritism.",
              "Giveaways: Assign entrants numbers 1 to 100 and draw one or more winners.",
              "Random selections: Divide a group into teams, assign tasks, or pick an order.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            For multiple winners, set Quantity to the number of prizes and turn duplicates off so each ticket wins at
            most once. For example: <strong>5 winners from 100 entries</strong> → Quantity 5, Duplicates off.
          </p>
        </section>

        {/* For Games */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Random Number Generator for Games
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Games rely on unpredictable outcomes to stay engaging. Here's how the generator fits into common scenarios:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
            {[
              { title: "Dice rolls", desc: "Set range to 1–6 for a standard die, or 1–20 for a D20 in RPGs." },
              { title: "RPG encounters", desc: "Generate enemy stats, loot quantities, or event triggers within your game's defined ranges." },
              { title: "Classroom games", desc: "Pick who goes first, assigns a topic, or chooses a team without bias." },
              { title: "Challenges", desc: "Randomly select a challenge level, a forfeit number, or a bonus multiplier." },
              { title: "Task selection", desc: "Assign a random task from a numbered list to keep things fair and unpredictable." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                <p className="font-bold text-slate-900 dark:text-white text-xs mb-1">{title}</p>
                <p className="text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The generator uses JavaScript's built-in pseudorandom algorithm. For most game purposes, this is fully
            adequate — results are unpredictable within a session and well-distributed across the range.
          </p>
        </section>

        {/* Raffles */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Random Number Generator for Raffles and Giveaways
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Running a raffle or online giveaway? Assign each entrant a ticket number, then use the generator to draw
            winners. Disabling duplicates ensures no ticket number appears twice in the results.
          </p>
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-slate-900 dark:text-white">Example — 3 winners from 200 entrants:</p>
            <p>Min: 1 &nbsp;|&nbsp; Max: 200 &nbsp;|&nbsp; Quantity: 3 &nbsp;|&nbsp; Duplicates: Off</p>
            <p className="text-slate-500 dark:text-slate-400">Result might be: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">47, 132, 199</span></p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            If your giveaway has specific legal or promotional requirements around how winners are selected and notified,
            check the applicable rules for your region. This tool handles the random selection step and produces
            copy-ready results.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You can also use the <Link href="/tools/decision-wheel" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">Decision Wheel</Link> if
            you prefer a visual spin-to-win experience for selecting from a named list of participants.
          </p>
        </section>

        {/* How RNGs Work */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            How Random Number Generators Work
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Software random number generators use mathematical algorithms to produce a sequence of numbers that
            appear unpredictable. Given a starting value (the seed), the algorithm produces a deterministic sequence —
            but because the seed changes automatically based on timing or system state, the output looks random to users.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            This tool uses <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">Math.random()</code> — the standard browser pseudorandom function.
            It selects a floating-point value between 0 and 1, then scales and rounds it to fit within your chosen min–max range.
            The formula used internally is:
          </p>
          <code className="block px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">
            Math.floor(Math.random() × (max − min + 1)) + min
          </code>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Both min and max are inclusive, negative numbers are handled correctly, and large integer ranges work within
            JavaScript's safe integer limits (<code className="font-mono text-xs">Number.MAX_SAFE_INTEGER</code>).
          </p>
        </section>

        {/* Random vs True Random */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Random vs. True Random Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              {
                title: "Pseudorandom (PRNG)",
                color: "blue",
                desc: "Uses a mathematical algorithm seeded by system state. Appears random but is deterministic. This is what Math.random() produces — suitable for games, raffles, and everyday use.",
              },
              {
                title: "Cryptographic PRNG",
                color: "indigo",
                desc: "A pseudorandom generator designed to be unpredictable even if the seed is partially known. Used in security contexts. Examples: Web Crypto API's getRandomValues().",
              },
              {
                title: "True Random (TRNG)",
                color: "purple",
                desc: "Generated from a physical source such as atmospheric noise or hardware entropy. Services like RANDOM.ORG use this. Truly non-deterministic at the hardware level.",
              },
            ].map(({ title, color, desc }) => (
              <div key={title} className={`p-4 rounded-2xl bg-${color}-50 dark:bg-${color}-950/20 border border-${color}-200 dark:border-${color}-800/50 space-y-2`}>
                <p className={`font-bold text-${color}-700 dark:text-${color}-300 text-xs`}>{title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            For most everyday needs — games, classroom picks, deciding what to eat, small giveaways — a pseudorandom
            generator produces results that are perfectly adequate. The statistical distribution across your range is
            uniform and results are not predictable in practice.
          </p>
        </section>

        {/* Example Table */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Common Use Cases at a Glance
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 min-w-[480px]">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs">
                <tr>
                  <th className="px-4 py-3">Use Case</th>
                  <th className="px-4 py-3">Range</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Repeats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ["Pick one number", "1 – 100", "1", "Allowed"],
                  ["Classroom selection", "1 – 30", "1", "Allowed"],
                  ["Giveaway winners", "1 – 500", "5", "Off"],
                  ["Dice-style roll", "1 – 6", "1", "Allowed"],
                  ["Random codes", "0 – 999", "10", "Optional"],
                ].map(([use, range, qty, repeats], i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{use}</td>
                    <td className="px-4 py-3 font-mono text-xs">{range}</td>
                    <td className="px-4 py-3">{qty}</td>
                    <td className="px-4 py-3">{repeats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto" aria-label="Frequently asked questions">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-500" aria-hidden="true" />
            Frequently Asked Questions
          </h2>
          <ToolFAQSection faqs={faqs} />
        </section>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="max-w-7xl mx-auto space-y-6" aria-label="Related tools">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Related Tools</h2>
              <Link href="/categories/random" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                View All Random Tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.slice(0, 3).map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
