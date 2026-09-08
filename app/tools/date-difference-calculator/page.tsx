import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import DateDifferenceCalculator from "@/components/tools/DateDifferenceCalculator";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import ToolComments from "@/components/ToolComments";
import { SITE_URL } from "@/lib/site";
import {
  Clock,
  HelpCircle,
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Briefcase,
  Layers,
} from "lucide-react";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: {
    absolute: "Date Difference Calculator – Days Between Dates | GetFunTools",
  },
  description:
    "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
  alternates: {
    canonical: `${SITE_URL}/tools/date-difference-calculator`,
  },
  robots: "index, follow",
  openGraph: {
    title: "Date Difference Calculator – Days Between Dates",
    description:
      "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
    url: `${SITE_URL}/tools/date-difference-calculator`,
    type: "website",
    siteName: "GetFunTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date Difference Calculator – Days Between Dates",
    description:
      "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
  },
};

const faqs = [
  {
    question: "How do I calculate the days between two dates?",
    answer:
      "Select your start date in the first calendar picker and your end date in the second calendar picker. The calculator immediately computes the exact difference in total days, full weeks, and total hours.",
  },
  {
    question: "Does the calculator include the end date?",
    answer:
      "By default, the calculation excludes the end date (measuring the elapsed time between start and end). If you check 'Include end date in calculation (+1 day)', the calculator adds one day so both the first and last day are counted.",
  },
  {
    question: "Does it account for leap years?",
    answer:
      "Yes. The calculator uses exact UTC calendar math and automatically accounts for leap years, including February 29 (366 days in a leap year versus 365 days in a common year).",
  },
  {
    question: "Can I calculate dates in the past?",
    answer:
      "Yes. You can choose any historical dates. If you select an end date that is earlier than your start date, the calculator indicates that it is measuring backward in time and lets you swap dates with one click.",
  },
  {
    question: "Can I calculate dates in the future?",
    answer:
      "Yes. You can select target dates years into the future to measure remaining time until milestones, deadlines, trips, or retirement.",
  },
  {
    question: "Can I see the difference in weeks and hours?",
    answer:
      "Yes. Along with total days, the result cards display the breakdown in full weeks plus remaining days, as well as total calculated calendar hours.",
  },
  {
    question: "Does this calculate business days?",
    answer:
      "No. This tool measures total calendar days. It does not automatically skip weekends or holidays. If you need to add or subtract specific day counts, visit our Date Calculator.",
  },
  {
    question: "Does the calculator work on mobile?",
    answer:
      "Yes. The calculator is designed with touch-friendly date pickers, large buttons, and clear responsive result cards that fit any smartphone or tablet screen without horizontal scrolling.",
  },
];

const relatedSlugs = [
  "date-calculator",
  "countdown-timer",
  "cosmic-age-clock",
  "decision-wheel",
];

export default function DateDifferenceCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "date-difference-calculator");

  const relatedTools = relatedSlugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TOOLS;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Date Difference Calculator – Days Between Dates",
    description:
      "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
    url: `${SITE_URL}/tools/date-difference-calculator`,
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
    name: "Date Difference Calculator",
    url: `${SITE_URL}/tools/date-difference-calculator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All modern web browsers (iOS, Android, macOS, Windows, Linux)",
    browserRequirements: "Requires JavaScript. Runs entirely in your browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A free, responsive online date difference calculator that computes days, weeks, calendar duration, and hours between any two calendar dates with optional inclusive end-date counting.",
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
        name: "Date Difference Calculator",
        item: `${SITE_URL}/tools/date-difference-calculator`,
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate the Days Between Two Dates",
    description:
      "Step-by-step instructions on finding the number of days, weeks, and hours between two calendar dates.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Select your start date",
        text: "Pick the beginning date using the calendar input or quick preset buttons.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Select your end date",
        text: "Pick the target ending date using the second calendar input.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose whether to include the end date",
        text: "Toggle 'Include end date' if your count requires inclusive day calculation (+1 day).",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "View the calculated difference",
        text: "Review the instant breakdown showing total days, weeks and days, calendar breakdown, and total hours.",
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-12 pt-2">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Age & Cosmic", href: "/categories/age" },
            { label: "Date Difference Calculator" },
          ]}
        />

        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              Calendar Utility
            </div>
            {tool && <BookmarkButton slug="date-difference-calculator" />}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Date Difference Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Calculate the time between two dates in days, weeks, months, and hours. Enter your dates
            below to get an instant result.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" /> Free &amp; Secure
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500" aria-hidden="true" /> Instant Results
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-indigo-500" aria-hidden="true" /> No Signup Required
            </span>
          </div>
        </header>

        {/* Interactive Tool Component */}
        <section
          id="interactive-tool"
          aria-label="Date difference calculator tool"
          className="max-w-3xl mx-auto space-y-8"
        >
          <DateDifferenceCalculator />
          {tool && <WhatsNext currentTool={tool} />}
          <CategoryDiscovery currentCategory="age" />
        </section>

        {/* Ad Slot */}
        <AdBanner slot="7788990011" format="horizontal" label="In-Article Ad" />

        {/* ── Content: How to Use ─────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            How to Calculate the Days Between Two Dates
          </h2>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {[
              {
                step: 1,
                title: "Select your start date.",
                desc: "Choose the first date using the calendar picker, or click one of the quick presets.",
              },
              {
                step: 2,
                title: "Select your end date.",
                desc: "Pick the ending date you want to measure up to.",
              },
              {
                step: 3,
                title: "Choose whether to include the end date.",
                desc: "Leave unchecked to measure the gap between dates, or check it to count both the start and end days.",
              },
              {
                step: 4,
                title: "View the calculated difference.",
                desc: "See the exact number of days between dates, along with weeks, calendar duration, and hours.",
              },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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
            What Is a Date Difference Calculator?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A date difference calculator finds the amount of time between two calendar dates. It can
            be useful for planning events, tracking projects, checking deadlines, calculating ages,
            and measuring periods of time.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Instead of manually flipping through physical calendars or counting on your fingers, a
            date duration calculator automatically handles the variable number of days in each month
            (28, 29, 30, or 31 days) and accounts for leap years. Whether you want to know the
            number of days between dates for vacation leave, the total weeks between dates for a
            fitness challenge, or the hours between dates for tracking a countdown, this tool
            provides the answers instantly.
          </p>
        </section>

        {/* ── Content: Real Examples ──────────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-purple-500" />
            Examples of Calculating the Difference Between Dates
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Here are common examples illustrating how the calculator measures days between dates.
            Notice how including the end date increases the total count by one full calendar day:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                One Month Window
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                January 1, 2026 &rarr; January 31, 2026
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <strong>Excluding end date:</strong> 30 days (4 weeks, 2 days | 720 hours)
                </p>
                <p>
                  <strong>Including end date:</strong> 31 days (4 weeks, 3 days | 744 hours)
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Full Common Year
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                January 1, 2026 &rarr; January 1, 2027
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <strong>Excluding end date:</strong> 365 days (52 weeks, 1 day | 8,760 hours)
                </p>
                <p>
                  <strong>Including end date:</strong> 366 days (52 weeks, 2 days | 8,784 hours)
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Leap Year Span
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                February 1, 2024 &rarr; March 1, 2024
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <strong>Excluding end date:</strong> 29 days (includes Feb 29 leap day)
                </p>
                <p>
                  <strong>Including end date:</strong> 30 days (4 weeks, 2 days)
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Summer Period
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                June 1, 2026 &rarr; August 31, 2026
              </p>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <strong>Excluding end date:</strong> 91 days (exactly 13 weeks | 2,184 hours)
                </p>
                <p>
                  <strong>Including end date:</strong> 92 days (13 weeks, 1 day | 2,208 hours)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content: Use Cases ──────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            When Can You Use a Date Difference Calculator?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Measuring the time between two dates is useful across everyday scenarios, including:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Event Planning</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Determine the preparation window and exact day count before weddings, birthdays, and conferences.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Project Deadlines</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Calculate total elapsed time or remaining sprint days to keep work deliveries on schedule.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Vacation Planning</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Compare travel dates, booking nights, and return dates when scheduling trips and holiday breaks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Work Periods</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Track internship durations, probation timeframes, and elapsed weeks in a given role.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Contract Durations</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Verify the exact number of days covered under rental leases, service warranties, and software subscriptions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Personal Milestones</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Find how many days have passed since an anniversary, a child’s birthdate, or a memorable life event.
              </p>
            </div>
          </div>
        </section>

        {/* ── Content: Calendar Days vs Business Days ──────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Calendar Days vs. Business Days
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            This calculator measures <strong>calendar time</strong>. Every calendar day—including
            Saturdays and Sundays—is counted in the total difference. It does not automatically
            exclude weekends, statutory public holidays, or company shutdown periods.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            If your project or payroll requires adding or subtracting days from a specific start
            date, check our{" "}
            <Link
              href="/tools/date-calculator"
              className="text-indigo-600 dark:text-indigo-400 font-bold underline hover:text-indigo-700"
            >
              Date Calculator
            </Link>
            , which allows flexible addition and subtraction of days, weeks, and months.
          </p>
        </section>

        {/* ── Tool FAQ Section ────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto">
          <ToolFAQSection faqs={faqs} />
        </section>

        {/* ── Related Tools ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-wider block">
                Explore More Tools
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related Tools You Might Like
              </h3>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
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
          <ToolComments toolSlug="date-difference-calculator" />
        </section>

        {/* Newsletter Subscription */}
        <section className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center space-y-4 shadow-xl">
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
            <button className="px-6 py-3 rounded-2xl bg-white text-indigo-600 font-extrabold text-xs shadow-lg hover:scale-105 transition cursor-pointer">
              Subscribe Free
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
