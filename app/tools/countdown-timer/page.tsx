import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import CountdownTimer from "@/components/tools/CountdownTimer";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
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
  ArrowRight,
  PartyPopper,
  Calculator,
  Compass,
  Globe,
  Timer,
} from "lucide-react";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: {
    absolute: "Countdown Timer Online – Free Event Countdown Clock | GetFunTools",
  },
  description:
    "Create a free online countdown timer for birthdays, holidays, vacations, events and deadlines. Set your date and time and watch the days, hours, minutes and seconds update live.",
  alternates: {
    canonical: `${SITE_URL}/tools/countdown-timer`,
  },
  robots: "index, follow",
  openGraph: {
    title: "Countdown Timer Online – Free Event Countdown Clock",
    description:
      "Create a free online countdown timer for birthdays, holidays, vacations, events and deadlines. Set your date and time and watch the days, hours, minutes and seconds update live.",
    url: `${SITE_URL}/tools/countdown-timer`,
    type: "website",
    siteName: "GetFunTools",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1024,
        height: 1024,
        alt: "Countdown Timer Online | GetFunTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Countdown Timer Online – Free Event Countdown Clock",
    description:
      "Create a free online countdown timer for birthdays, holidays, vacations, events and deadlines. Set your date and time and watch the days, hours, minutes and seconds update live.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const faqs = [
  {
    question: "What is an online countdown timer?",
    answer:
      "An online countdown timer is a live digital clock that calculates the exact remaining time until a chosen future date and time. It updates automatically second-by-second in your browser, breaking down the duration into days, hours, minutes, and seconds.",
  },
  {
    question: "How do I create a countdown to a specific date and time?",
    answer:
      "Type your event name into the Event Name field, select your target date and time in the datetime picker, and the clock begins counting down immediately in real time. You can also pick one of our quick presets like New Year, Weekend, or +7 Days.",
  },
  {
    question: "Does the countdown timer show seconds in real time?",
    answer:
      "Yes. The countdown updates continuously every second (1,000 milliseconds) directly in your browser without requiring page reloads or server requests.",
  },
  {
    question: "Does the countdown use my local timezone?",
    answer:
      "Yes. The timer calculates remaining time relative to your local device clock and system timezone. If you share a countdown link across different timezones, the target date and time string is evaluated according to each recipient's local browser clock.",
  },
  {
    question: "What happens when the countdown reaches zero?",
    answer:
      "When the target timestamp arrives, the ticking cards transition to a celebratory '🎉 Time's Up!' screen indicating your event has arrived, complete with a 'Start a New Countdown' button to reset.",
  },
  {
    question: "Can I share my countdown with friends or family?",
    answer:
      "Yes. Click the 'Share Timer' button to open your device's native share sheet or automatically copy a shareable link containing your event title and target date. Anyone who opens your link sees your customized countdown.",
  },
  {
    question: "Does the countdown keep running if I close or refresh the browser?",
    answer:
      "Because the countdown calculates the mathematical difference between your fixed target date and the current system timestamp, the countdown accurately reflects the exact remaining time whenever you reopen or refresh the page.",
  },
  {
    question: "Can I use the countdown timer on my phone or tablet?",
    answer:
      "Yes. The countdown timer is fully responsive and touch-optimized for iPhones, iPads, Android smartphones, tablets, and desktop displays.",
  },
  {
    question: "Can I add the countdown timer to my phone's home screen?",
    answer:
      "While this is a web application rather than a native operating system widget, you can easily bookmark your shared countdown link or use your mobile browser's 'Add to Home Screen' option to create an instant one-tap shortcut icon on your phone.",
  },
  {
    question: "Does the countdown timer support recurring events?",
    answer:
      "No. This tool is built to track a single specific future milestone. For annual events like birthdays or New Year's Eve, simply pick the upcoming year's date or select the New Year preset.",
  },
  {
    question: "How does the timer handle daylight saving time transitions?",
    answer:
      "Because calculations are performed using standard JavaScript Date timestamps, daylight saving time shifts are handled automatically by your operating system's timezone data.",
  },
  {
    question: "What is the difference between a countdown timer and a stopwatch?",
    answer:
      "A stopwatch measures elapsed time upwards from zero (useful for athletic sprints or task timing), whereas a countdown timer counts downwards from the current moment to a predetermined future date and time.",
  },
  {
    question: "Is this countdown timer free to use?",
    answer:
      "Yes, 100% free with unlimited countdowns, zero account sign-up requirements, and no paywalls.",
  },
  {
    question: "How far into the future can I set a countdown?",
    answer:
      "You can set target dates days, weeks, months, or years into the future—making it ideal for weddings, college graduations, retirement milestones, or long-term product roadmaps.",
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
    name: "Countdown Timer Online – Free Event Countdown Clock",
    description:
      "Create a free online countdown timer for birthdays, holidays, vacations, events and deadlines. Set your date and time and watch the days, hours, minutes and seconds update live.",
    url: `${SITE_URL}/tools/countdown-timer`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "GetFunTools",
      url: SITE_URL,
    },
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
        name: "Productivity",
        item: `${SITE_URL}/categories/productivity`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Countdown Timer",
        item: `${SITE_URL}/tools/countdown-timer`,
      },
    ],
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
        text: "Select the future calendar date of your event in the date picker.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          title="Countdown Timer Online – Free Event Countdown Clock"
          description="Create a live countdown to any event, birthday, vacation, launch, or holiday. Set your date and time and watch the days, hours, minutes, and seconds update live."
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

        {/* Interactive Tool Component — Immediately above the fold */}
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

        {/* ── Section 1: How to Create a Countdown to Any Date ─────────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-500" />
            How to Create a Countdown to Any Date
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Setting up a live countdown on GetFunTools takes less than ten seconds. Follow these four straightforward steps to start tracking your upcoming milestone:
          </p>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {[
              {
                step: 1,
                title: "Enter the event name:",
                desc: "Type a descriptive title such as 'Sarah's Birthday', 'Summer Trip to Japan', or 'App Launch v2.0' in the Event Name box.",
              },
              {
                step: 2,
                title: "Choose the target date:",
                desc: "Open the calendar selector to choose the specific future day when your event takes place.",
              },
              {
                step: 3,
                title: "Set the target time:",
                desc: "Pick the exact hour and minute when the event begins (e.g. 09:00 AM for a flight or 00:00 midnight for New Year).",
              },
              {
                step: 4,
                title: "Watch the countdown update live:",
                desc: "The clock starts ticking second-by-second across four distinct cards displaying Days, Hours, Minutes, and Seconds.",
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
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 text-xs sm:text-sm text-purple-950 dark:text-purple-200">
            <strong>Shortcut Tip:</strong> Need to count down to a standard milestone? Click any of the one-tap preset buttons—like <strong>New Year</strong>, <strong>Weekend</strong>, or <strong>+7 Days</strong>—to populate the date and time automatically.
          </div>
        </section>

        {/* ── Section 2: How Countdown Timers Calculate Days, Hours, Minutes and Seconds ─ */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-500" />
            How Countdown Timers Calculate Days, Hours, Minutes and Seconds
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Behind the visual clock, the countdown engine performs a continuous mathematical calculation using timestamps. Every second (1,000 milliseconds), the browser evaluates the difference between your selected target time and the current instant:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg block">Days</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">Total remaining 24-hour periods</span>
              <code className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block pt-1">Math.floor(ms / 86,400,000)</code>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg block">Hours</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">0 to 23 remaining hours</span>
              <code className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block pt-1">Math.floor(ms % 86.4M / 3.6M)</code>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg block">Minutes</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">0 to 59 remaining minutes</span>
              <code className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block pt-1">Math.floor(ms % 3.6M / 60,000)</code>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg block">Seconds</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">0 to 59 ticking seconds</span>
              <code className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block pt-1">Math.floor(ms % 60,000 / 1,000)</code>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            If you want to measure static calendar day differences between two dates rather than watch a live ticking clock, explore our{" "}
            <Link href="/tools/date-difference-calculator" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Date Difference Calculator
            </Link>{" "}
            or use the{" "}
            <Link href="/tools/date-calculator" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Date Calculator
            </Link>{" "}
            to add or subtract weeks and months from any calendar day.
          </p>
        </section>

        {/* ── Section 3: Ideas for Birthdays, Vacations and Special Events ─────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-pink-500" />
            Countdown Timer Ideas for Birthdays, Vacations and Special Events
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A visual countdown transforms abstract calendar dates into exciting daily milestones. Here are popular celebrations where a live countdown clock builds anticipation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                🎂 Birthday Countdowns
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Build excitement leading up to your birthday or a family member&apos;s milestone celebration. Share the timer link in group chats so friends can watch the days tick down together.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                ✈️ Vacation &amp; Travel Countdowns
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Set a timer for your flight departure, cruise check-in, or road trip. Having a tangible visual countdown makes long work weeks fly by faster as departure day approaches.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                💍 Wedding &amp; Anniversary Timers
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Count down to your big day! Couples use live countdown timers on wedding planning dashboards to coordinate rehearsal dinners, vendor deadlines, and guest arrivals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                🎆 Holiday &amp; New Year Clocks
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Count down to New Year&apos;s Eve midnight, Christmas, Halloween, or Thanksgiving. Use our New Year preset for a 1-click countdown to January 1st.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                👶 Baby Due Dates &amp; Milestones
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Track estimated due dates, baby showers, or graduation ceremonies. Share the live link with grandparents and relatives across different cities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                🎮 Video Game &amp; Movie Releases
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Count down to midnight game unlocks, cinematic premieres, or streaming season debuts. Perfect for Discord gaming servers and fan communities.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 4: Timers for Exams, Deadlines and Product Launches ─────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Timer className="w-5 h-5 text-amber-500" />
            Countdown Timers for Exams, Deadlines and Product Launches
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Beyond celebrations, countdown clocks serve as powerful productivity utilities for students, startup founders, and project managers. Parkinson&apos;s Law observes that work expands to fill the time available for its completion—making a ticking clock an effective psychological tool to prevent procrastination:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
            <li>
              <strong>Final Exams &amp; Semester Deadlines:</strong> Keep exam dates front and center on your browser tabs so you can plan revision sessions systematically.
            </li>
            <li>
              <strong>Product &amp; Feature Launches:</strong> Share live launch links with newsletter subscribers, early adopters, and marketing teams to build anticipation before public release.
            </li>
            <li>
              <strong>Hackathons &amp; Sprint Deliverables:</strong> Display a live 24-hour or 48-hour countdown clock during coding sprints, design jams, or grant application deadlines.
            </li>
            <li>
              <strong>Crowdfunding Campaigns:</strong> Track the final hours of Kickstarter, Indiegogo, or community fundraising campaigns to encourage last-minute backers.
            </li>
          </ul>
        </section>

        {/* ── Section 5: Countdown Timezones and Local Device Time ─────────────────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Countdown Timezones and Local Device Time
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            How do timezones affect your online countdown? Because this tool operates entirely client-side inside your browser, the calculation relies on your device&apos;s local operating system clock. Understanding how time is evaluated ensures seamless coordination when sharing links across borders:
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-white block">Local Evaluation:</strong>
              <p>
                When you choose a target like <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">2026-12-31T23:59</code>, your browser measures the duration until that local time arrives in your current timezone.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-white block">Daylight Saving Time (DST):</strong>
              <p>
                When a future target falls on the other side of a Daylight Saving Time transition, JavaScript&apos;s built-in Date engine automatically accounts for the one-hour shift according to your operating system&apos;s timezone tables.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-white block">Device Clock Accuracy:</strong>
              <p>
                Because the timer calculates <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">targetTime - Date.now()</code> locally, ensure your computer or smartphone clock is synchronized with network time for maximum precision.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 6: Countdown Timers vs. Stopwatches and Ordinary Timers ─────── */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-500" />
            Countdown Timers vs. Stopwatches and Ordinary Timers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            People frequently search for &ldquo;countdown timer&rdquo; with two very different intentions. Clarifying the distinction helps you pick the right tool for your specific timing task:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                <tr>
                  <th className="p-3.5">Feature</th>
                  <th className="p-3.5">Event Countdown Timer (This Tool)</th>
                  <th className="p-3.5">Interval / Kitchen Timer</th>
                  <th className="p-3.5">Stopwatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Direction</td>
                  <td className="p-3.5 text-purple-600 dark:text-purple-400 font-semibold">Counts Down to a Date</td>
                  <td className="p-3.5">Counts Down from Set Duration</td>
                  <td className="p-3.5">Counts Up from Zero</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Target Type</td>
                  <td className="p-3.5">Specific calendar date &amp; time</td>
                  <td className="p-3.5">Arbitrary minutes/seconds</td>
                  <td className="p-3.5">Open-ended elapsed time</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Time Horizon</td>
                  <td className="p-3.5">Days, weeks, months, or years</td>
                  <td className="p-3.5">Seconds to hours</td>
                  <td className="p-3.5">Milliseconds to hours</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Shareability</td>
                  <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">1-Click Shareable URL</td>
                  <td className="p-3.5">Local only</td>
                  <td className="p-3.5">Local only</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Best For</td>
                  <td className="p-3.5">Events, birthdays, vacations, launches</td>
                  <td className="p-3.5">Cooking, pomodoro, workouts</td>
                  <td className="p-3.5">Sports sprints, speed tests</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            If you want to view planetary age stats or astronomical seconds lived, check out our{" "}
            <Link href="/tools/cosmic-age-clock" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Cosmic Age Clock
            </Link>
            .
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
