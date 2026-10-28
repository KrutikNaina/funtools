import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import CountdownTimer from "@/components/tools/CountdownTimer";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import ToolPageHeader from "@/components/ToolPageHeader";
import ToolTrustBar from "@/components/ToolTrustBar";
import ToolComments from "@/components/ToolComments";
import { SITE_URL } from "@/lib/site";
import {
  Clock,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  PartyPopper,
  Share2,
} from "lucide-react";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: {
    absolute: "Countdown Timer – Free Online Event Countdown | GetFunTools",
  },
  description:
    "Create a free countdown timer for birthdays, vacations, events, launches, holidays and important dates. Set a date and time and watch the countdown update live.",
  alternates: {
    canonical: `${SITE_URL}/tools/countdown-timer`,
  },
  robots: "index, follow",
  openGraph: {
    title: "Countdown Timer – Free Online Event Countdown",
    description:
      "Create a free countdown timer for birthdays, vacations, events, launches, holidays and important dates. Set a date and time and watch the countdown update live.",
    url: `${SITE_URL}/tools/countdown-timer`,
    type: "website",
    siteName: "GetFunTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Countdown Timer – Free Online Event Countdown",
    description:
      "Create a free countdown timer for birthdays, vacations, events, launches, holidays and important dates. Set a date and time and watch the countdown update live.",
  },
};

const faqs = [
  {
    question: "What is a countdown timer?",
    answer:
      "A countdown timer shows how much time remains until a specific date or event. Set a target date and time to see the remaining days, hours, minutes, and seconds update automatically.",
  },
  {
    question: "How do I create a countdown?",
    answer:
      "Enter your event name, choose your target date and time in the picker, and the countdown clock begins ticking immediately in real time.",
  },
  {
    question: "Can I use a countdown for a birthday?",
    answer:
      "Yes. Type your birthday as the event name, pick the date and time of the celebration, and bookmark or share the timer to count down the days.",
  },
  {
    question: "Can I create a countdown for a future date?",
    answer:
      "Yes. You can select target dates months or years into the future, such as for New Year, weddings, graduations, or product launches.",
  },
  {
    question: "Does the countdown update automatically?",
    answer:
      "Yes. The timer updates live every second in your browser without requiring any page refreshes.",
  },
  {
    question: "Can I use the countdown timer on my phone?",
    answer:
      "Yes. The countdown timer is fully mobile-friendly. The display cards adapt cleanly to any screen size, and you can add it to your home screen for quick access.",
  },
  {
    question: "Can I share my countdown?",
    answer:
      "Yes. Click the 'Share Timer' button to share via your phone's native share menu or copy a direct link. Anyone who opens the link will see your custom event name and countdown.",
  },
  {
    question: "What happens when the countdown reaches zero?",
    answer:
      "When the target date and time arrives, the timer displays a clear celebratory 'Time's Up!' screen indicating that your event has arrived, with an option to start a new countdown.",
  },
];

const relatedSlugs = [
  "date-difference-calculator",
  "date-calculator",
  "cosmic-age-clock",
  "decision-wheel",
];

export default function CountdownTimerPage() {
  const tool = TOOLS.find((t) => t.slug === "countdown-timer");

  const relatedTools = relatedSlugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TOOLS;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Countdown Timer – Free Online Event Countdown",
    description:
      "Create a free countdown timer for birthdays, vacations, events, launches, holidays and important dates. Set a date and time and watch the countdown update live.",
    url: `${SITE_URL}/tools/countdown-timer`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "GetFunTools",
      url: SITE_URL,
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Countdown Timer",
    url: `${SITE_URL}/tools/countdown-timer`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All modern web browsers (iOS, Android, macOS, Windows, Linux)",
    browserRequirements: "Requires JavaScript. Runs entirely in your browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Create a free live countdown timer for birthdays, vacations, product launches, holidays, and milestones. Displays real-time ticking days, hours, minutes, and seconds.",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Set a Countdown Timer",
    description:
      "Step-by-step instructions on creating a live ticking countdown timer for any event.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter the event name",
        text: "Type the title of your event or milestone (e.g. Birthday, Summer Trip, or Product Launch).",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose the target date",
        text: "Select the future calendar date of your event.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Set the target time",
        text: "Pick the exact hour and minute when your event begins.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Watch the countdown update live",
        text: "View the real-time ticking display of remaining days, hours, minutes, and seconds.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-2">
        {/* Compact Tool Header */}
        <ToolPageHeader
          title="Countdown Timer – Free Online Event Countdown"
          description="Create a live countdown to any event, birthday, vacation, launch, or holiday. Set the date and time and watch the timer count down instantly."
          breadcrumbItems={[
            { label: "Tools", href: "/tools" },
            { label: "Productivity", href: "/categories/productivity" },
            { label: "Countdown Timer" },
          ]}
          toolSlug="countdown-timer"
          categoryBadge={{
            label: "Productivity Tool",
            icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
            colorClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
          }}
        />

        {/* Interactive Tool Component */}
        <section
          id="interactive-tool"
          aria-label="Countdown timer tool"
          className="max-w-3xl mx-auto space-y-8"
        >
          <CountdownTimer />
          {tool && <WhatsNext currentTool={tool} />}
          <CategoryDiscovery currentCategory="productivity" />
        </section>

        {/* Trust Badges & Metadata */}
        <div className="max-w-3xl mx-auto pt-6">
          <ToolTrustBar
            items={[
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />, label: "100% Free & Secure" },
              { icon: <Zap className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />, label: "Instant Results" },
              { icon: <Users className="w-3.5 h-3.5 text-purple-500" aria-hidden="true" />, label: "No Signup Required" },
            ]}
          />
        </div>

        {/* Ad Slot */}
        <AdBanner slot="7788990011" format="horizontal" label="In-Article Ad" />

        {/* ── Content: How to Use ─────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-500" />
            How to Set a Countdown Timer
          </h2>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {[
              {
                step: 1,
                title: "Enter the event name.",
                desc: "Type a descriptive title such as 'Birthday Party', 'Trip to Japan', or 'App Launch'.",
              },
              {
                step: 2,
                title: "Choose the target date.",
                desc: "Select the calendar day when your event takes place.",
              },
              {
                step: 3,
                title: "Set the target time.",
                desc: "Pick the hour and minute when the event starts.",
              },
              {
                step: 4,
                title: "Watch the countdown update live.",
                desc: "The clock counts down second-by-second in days, hours, minutes, and seconds.",
              },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white">{title}</strong>{" "}
                  <span>{desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Content: Simple Explanation ─────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            What Is a Countdown Timer?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A countdown timer shows how much time remains until a specific date or event. Set a
            target date and time to see the remaining days, hours, minutes, and seconds update
            automatically.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike a simple calendar entry that only gives you a static date, a live countdown clock
            creates visual anticipation. As the seconds tick down, you can clearly see the exact
            duration remaining—helping you prepare, stay organized, and build excitement for what lies
            ahead.
          </p>
        </section>

        {/* ── Content: Countdown to a Date ────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            Countdown to a Date
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            With this online countdown clock, you can select any future date and time on your
            calendar. The timer calculates the exact interval between right now and your chosen
            target, displaying:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-base block">Days</span>
              <span className="text-slate-500 dark:text-slate-400">Total full calendar days</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-base block">Hours</span>
              <span className="text-slate-500 dark:text-slate-400">0 to 23 remaining hours</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-base block">Minutes</span>
              <span className="text-slate-500 dark:text-slate-400">0 to 59 remaining minutes</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-base block">Seconds</span>
              <span className="text-slate-500 dark:text-slate-400">Live 1-second ticks</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The calculation operates in real time using your device&apos;s local timezone settings,
            ensuring that your countdown remains consistent with your local clock.
          </p>
        </section>

        {/* ── Content: Use Cases ──────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-pink-500" />
            What Can You Use a Countdown Timer For?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A free countdown timer helps you stay focused on upcoming deadlines and celebrate
            exciting moments, such as:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Birthday Countdowns</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Track how many days and hours are left until your birthday or a family member&apos;s special day.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Vacation Countdowns</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Count down to your next flight, road trip, or holiday break to keep daily motivation high.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Wedding Countdowns</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Build anticipation for the big day and coordinate planning deadlines with friends and family.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Holiday &amp; New Year</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Watch the clock tick down to New Year&apos;s Eve, Christmas, Halloween, or Thanksgiving.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Product &amp; App Launches</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Share a live countdown with your community, customers, or newsletter subscribers before launch.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Exams &amp; Deadlines</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Keep project deliverables, final exams, and fitness challenges front and center.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tool FAQ Section ────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto">
          <ToolFAQSection faqs={faqs} />
        </section>

        {/* ── Related Tools ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-purple-500 uppercase tracking-wider block">
                Explore More Tools
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related Tools You Might Like
              </h3>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View All Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>

        {/* Community Comments */}
        <section className="max-w-4xl mx-auto">
          <ToolComments toolSlug="countdown-timer" />
        </section>

        {/* Newsletter Subscription */}
        <section className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black">Never Miss a New Micro-Tool!</h3>
          <p className="text-xs sm:text-sm opacity-90 max-w-md mx-auto">
            Get weekly updates on viral generators, productivity calculators, and social utilities
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 text-xs focus:outline-none border border-white/30"
            />
            <button className="px-6 py-3 rounded-2xl bg-white text-purple-600 font-extrabold text-xs shadow-lg hover:scale-105 transition cursor-pointer">
              Subscribe Free
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
