import { DomainToolModule } from "@/types/tool-content";

export const dateDifferenceCalculatorContent: DomainToolModule = {
  slug: "date-difference-calculator",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Date Difference Calculator",
    secondary: [
      "Days Between Dates",
      "Calculate Days Between Two Dates",
      "Number of Days Between Dates",
      "Time Between Two Dates",
      "Weeks Between Dates",
    ],
    longTail: [
      "calculate exact number of days between two dates",
      "free date difference calculator online",
      "how many days between two calendar dates",
      "weeks and hours between dates calculator",
      "date duration calculator with optional end date",
    ],
    lsi: [
      "days between dates",
      "date duration calculator",
      "calendar interval",
      "weeks between dates",
      "hours between dates",
    ],
    semantic: [
      "days between dates",
      "date difference calculator",
      "number of days between dates",
      "calculate days between two dates",
      "time between two dates",
      "weeks between dates",
      "hours between dates",
      "date duration calculator",
    ],
    questionKeywords: [
      "how do i calculate the days between two dates",
      "does the calculator include the end date",
      "how many days are between two dates",
    ],
    intentKeywords: [
      "calculate days between dates",
      "count days between two dates",
      "date duration calculator",
    ],
  },
  metadata: {
    metaTitle: "Date Difference Calculator – Days Between Dates | GetFunTools",
    metaDescription:
      "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
    slug: "date-difference-calculator",
    canonicalUrl: "https://www.getfuntools.app/tools/date-difference-calculator",
    robots: "index, follow",
    openGraph: {
      title: "Date Difference Calculator – Days Between Dates",
      description:
        "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
      url: "https://www.getfuntools.app/tools/date-difference-calculator",
      type: "website",
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Date Difference Calculator – Days Between Dates",
      description:
        "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
    },
  },
  aiOverview: {
    oneSentence:
      "The GetFunTools Date Difference Calculator finds the exact amount of time between two calendar dates in days, weeks, calendar duration, and hours.",
    twoSentence:
      "Select a start date and an end date to instantly calculate the total days between them. Includes an optional toggle to include the end date in the calculation (+1 day).",
    summary50:
      "A free online date difference calculator that computes the days between dates, total weeks, calendar duration, and hours with automatic leap year accuracy.",
    summary100:
      "The Date Difference Calculator measures the time between any two calendar dates. Useful for project tracking, event planning, and deadline management, it provides instant results in total days, weeks, and hours, with an optional toggle to count the end date inclusively.",
    summary200:
      "A date difference calculator finds the amount of time between two calendar dates. It can be useful for planning events, tracking projects, checking deadlines, calculating ages, and measuring periods of time. The calculator runs directly in your browser using UTC calculations, ensuring reliable results across leap years and variable month lengths.",
    bulletSummary: [
      "Calculates total days, weeks, and hours between two calendar dates.",
      "Optional toggle to include the end date (+1 day).",
      "Automatically accounts for leap years and varying month lengths.",
      "Instant calculations with no signup required.",
      "Mobile-friendly and 100% free.",
    ],
    tableSummary: [
      { label: "Main Result", value: "Total Days Between Dates" },
      { label: "Additional Units", value: "Weeks & Days, Hours, Calendar Breakdown" },
      { label: "End Date Option", value: "Optional inclusive toggle (+1 day)" },
      { label: "Price", value: "Free" },
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools Calculator", "Manual Counting"],
      rows: [
        ["Speed", "Instant in real time", "Slow and error-prone"],
        ["Leap Years", "Automatic 366-day handling", "Easy to miscount"],
        ["Inclusive Mode", "1-click toggle", "Manual addition"],
      ],
    },
  },
  snippets: {
    paragraph:
      "A date difference calculator finds the amount of time between two calendar dates. It can be useful for planning events, tracking projects, checking deadlines, calculating ages, and measuring periods of time.",
    list: [
      "Step 1: Select your start date.",
      "Step 2: Select your end date.",
      "Step 3: Choose whether to include the end date.",
      "Step 4: View the calculated difference.",
    ],
    numbered: [
      "Select your start date.",
      "Select your end date.",
      "Choose whether to include the end date.",
      "View the calculated difference.",
    ],
    table: {
      headers: ["Start Date", "End Date", "Total Days (Excl. End Date)", "Total Days (Incl. End Date)"],
      rows: [
        ["Jan 1, 2026", "Jan 31, 2026", "30 days", "31 days"],
        ["Jan 1, 2026", "Jan 1, 2027", "365 days", "366 days"],
        ["Feb 1, 2024", "Mar 1, 2024", "29 days (Leap Year)", "30 days"],
        ["Jun 1, 2026", "Aug 31, 2026", "91 days", "92 days"],
      ],
    },
  },
  howTo: [
    { name: "Select your start date", text: "Pick the beginning date using the calendar input." },
    { name: "Select your end date", text: "Pick the target ending date using the second calendar input." },
    { name: "Choose whether to include the end date", text: "Check include end date if you need inclusive day calculation (+1 day)." },
    { name: "View the calculated difference", text: "Read the total days, weeks, calendar breakdown, and hours." },
  ],
  content: {
    heroHeadline: "Date Difference Calculator",
    heroSubheading:
      "Calculate the time between two dates in days, weeks, months, and hours. Enter your dates below to get an instant result.",
    introduction:
      "A date difference calculator finds the amount of time between two calendar dates. It can be useful for planning events, tracking projects, checking deadlines, calculating ages, and measuring periods of time.",
    definition:
      "A date difference calculator calculates the quantitative interval separating two specific calendar dates, taking into account variable month lengths and leap years.",
    howItWorks: [
      "Select your start date.",
      "Select your end date.",
      "Choose whether to include the end date.",
      "View the calculated difference.",
    ],
    examples: [
      {
        scenario: "One month window (January 2026)",
        input: "Jan 1, 2026 to Jan 31, 2026",
        output: "30 days (31 days if including end date)",
      },
      {
        scenario: "Full common year",
        input: "Jan 1, 2026 to Jan 1, 2027",
        output: "365 days (366 days if including end date)",
      },
      {
        scenario: "Leap year February span",
        input: "Feb 1, 2024 to Mar 1, 2024",
        output: "29 days (30 days if including end date)",
      },
      {
        scenario: "Summer break duration",
        input: "Jun 1, 2026 to Aug 31, 2026",
        output: "91 days / 13 weeks (92 days if including end date)",
      },
    ],
    useCases: [
      { audience: "Event Planners", description: "Calculate preparation windows and lead times for events." },
      { audience: "Project Managers", description: "Track elapsed days and sprint deadlines accurately." },
      { audience: "Travelers", description: "Compare trip dates, holiday durations, and accommodation nights." },
      { audience: "Contract Administrators", description: "Measure warranty durations, rental periods, and renewal dates." },
      { audience: "Personal Milestones", description: "Count the number of days since an anniversary or milestone." },
    ],
    benefits: [
      { title: "Instant Calculations", description: "Results update in real-time as you pick dates." },
      { title: "Leap Year Accuracy", description: "Automatically accounts for 366-day leap years." },
      { title: "End Date Flexibility", description: "Toggle between exclusive and inclusive day counting." },
    ],
    features: [
      { title: "Multi-Unit Display", description: "Shows total days, full weeks, and total hours." },
      { title: "Quick Presets", description: "One-click shortcuts for +7 days, +30 days, +90 days, and +1 year." },
      { title: "Swap Dates", description: "Instantly reverse the start and end dates with one click." },
    ],
    comparisonTable: {
      headers: ["Comparison", "Calendar Days", "Business Days"],
      rows: [
        ["Weekends", "Included (Saturday & Sunday)", "Excluded"],
        ["Public Holidays", "Included in calculation", "Typically excluded"],
        ["Primary Use", "Events, milestones, calendar duration", "Workday payroll, business SLAs"],
      ],
    },
    accuracyStatement: "Calculations use UTC standards to prevent Daylight Saving Time deviations.",
    limitations: ["This calculator measures calendar days and does not automatically exclude business holidays."],
    bestPractices: [
      "Check 'Include end date' when counting total inclusive days for vacations or hotel stays.",
      "Use the presets to quickly test standard 30-day, 90-day, or 1-year intervals.",
    ],
    expertTips: ["Bookmark this page on your smartphone home screen for fast date math anytime."],
    disclaimer: {
      type: "general",
      text: "This calculator measures calendar time. Always verify legal and contractual deadlines against official jurisdiction rules.",
    },
  },
  faqs: [
    {
      question: "How do I calculate the days between two dates?",
      answer:
        "Select your start date in the first calendar picker and your end date in the second calendar picker. The calculator immediately computes the exact difference in total days, full weeks, and total hours.",
    },
    {
      question: "Does the calculator include the end date?",
      answer:
        "By default, the calculation excludes the end date. Checking 'Include end date in calculation (+1 day)' adds one day so that both the starting day and ending day are counted.",
    },
    {
      question: "Does it account for leap years?",
      answer:
        "Yes. The calculator uses exact calendar math and automatically accounts for leap years, including February 29 (366 days in a leap year versus 365 days in a common year).",
    },
    {
      question: "Can I calculate dates in the past?",
      answer:
        "Yes. You can select any historical dates. If the end date is earlier than your start date, the calculator indicates that it is measuring backward and lets you swap dates with one click.",
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
  ],
  peopleAlsoAsk: [
    {
      question: "How to count days between two dates?",
      answer:
        "Select the beginning date and target date in the calculator. It computes the total elapsed days instantly.",
    },
    {
      question: "How many days are in a leap year?",
      answer:
        "A leap year has 366 days, with an extra day added as February 29.",
    },
  ],
  eeat: {
    authorName: "GetFunTools Editorial Team",
    authorRole: "Interactive Web Utilities Specialists",
    authorBio:
      "GetFunTools builds lightweight, client-side productivity and casual gaming tools focused on privacy, speed, and usability.",
    authorAvatar: "/images/editorial-avatar.png",
    reviewerName: "GetFunTools Review Team",
    reviewerRole: "UX & Tool Quality Review",
    lastUpdated: "September 8, 2026",
    contentVersion: "v4.0.0",
    readTime: "4 min read",
  },
  relatedTools: [
    {
      title: "Date Calculator",
      slug: "date-calculator",
      category: "productivity",
      relationReason: "Add or subtract days, weeks, and months from any starting date.",
    },
    {
      title: "Countdown Timer",
      slug: "countdown-timer",
      category: "productivity",
      relationReason: "Count down in real time to any future milestone.",
    },
    {
      title: "Cosmic Age Clock",
      slug: "cosmic-age-clock",
      category: "age",
      relationReason: "Calculate your exact age in days, weeks, hours, and planetary years.",
    },
    {
      title: "Decision Wheel",
      slug: "decision-wheel",
      category: "random",
      relationReason: "Random choice picker and decision maker.",
    },
  ],
};
