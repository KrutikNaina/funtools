import { DomainToolModule } from "@/types/tool-content";

export const dateDifferenceCalculatorContent: DomainToolModule = {
  slug: "date-difference-calculator",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Date Difference Calculator",
    secondary: ["Days Between Dates Calculator", "Calculate Time Span", "Date Duration Calculator", "How Many Days Between Two Dates", "Days Counter"],
    longTail: [
      "free date difference calculator days weeks months between dates",
      "calculate exact number of days between start date and end date",
      "days counter online with include end date option",
      "how many weeks and days between two calendar dates",
      "time span duration calculator for project timelines"
    ],
    lsi: ["duration analysis", "calendar interval", "days elapsed", "total hours", "leap year gap"],
    semantic: ["time span calculator", "days between calculator", "duration finder", "calendar distance tool"],
    questionKeywords: ["how many days between two dates", "how to calculate date difference", "how many weeks until a target date"],
    intentKeywords: ["calculate date difference", "count days between dates", "find time span"]
  },
  metadata: {
    metaTitle: "Date Difference Calculator - Days, Weeks & Months Between Two Dates",
    metaDescription: "Calculate the exact duration and total days between any two calendar dates. Displays breakdown in days, weeks, months, years, and total hours.",
    slug: "date-difference-calculator",
    canonicalUrl: "https://getfuntools.app/tools/date-difference-calculator",
    robots: "index, follow",
    openGraph: {
      title: "Date Difference Calculator | Days Between Two Dates",
      description: "Find the exact duration in days, weeks, and months between two dates.",
      url: "https://getfuntools.app/tools/date-difference-calculator",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Date Difference Calculator - Duration & Days Counter",
      description: "Calculate time span and total days between dates."
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools Date Difference Calculator computes the exact time span, total days, weeks, and months between two calendar dates.",
    twoSentence: "The GetFunTools Date Difference Calculator analyzes the duration between a start date and an end date. It provides comprehensive results formatted in total days, weeks, months, years, and total hours with optional end-day inclusion.",
    summary50: "The GetFunTools Date Difference Calculator is a free online tool that calculates the exact difference between two dates. It provides instant results in total days, full weeks, approximate months, and total hours with leap year accuracy.",
    summary100: "The GetFunTools Date Difference Calculator provides precise temporal interval analysis for event planning, legal counting, and project management. Users enter a start and end date to generate a complete breakdown of elapsed time, including total days, weeks, months, years, and total hours, with a toggle for including or excluding the end date.",
    summary200: "The GetFunTools Date Difference Calculator is a powerful calendar analysis utility designed to measure time intervals between any two points in history or the future. Built using high-precision UTC timestamp conversions, it calculates the exact elapsed time between a Start Date and an End Date. The output cards display multi-unit breakdowns: total calendar days, total weeks with remaining days, total months, years, and total calculated hours. Users can toggle the 'Include end date' checkbox to add an inclusive final day (+1 day) according to specific legal or billing requirements. The tool automatically factors in variable month lengths and leap-year intercalary days.",
    bulletSummary: [
      "Calculates total days, weeks, months, years, and hours between two dates.",
      "Supports 'Include end date' toggle (+1 day inclusive counting).",
      "Accurately handles leap years and month length variations.",
      "Updates results in real-time as date selectors change.",
      "100% free with zero registration."
    ],
    tableSummary: [
      { label: "Supported Output Units", value: "Days, Weeks, Months, Years, Hours" },
      { label: "End Date Inclusion", value: "Optional (+1 day toggle)" },
      { label: "Leap Year Accuracy", value: "Automatic 366-day handling" },
      { label: "Cost", value: "100% Free" }
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools Date Difference", "Basic Counters"],
      rows: [
        ["Multi-Unit Breakdown", "Days, Weeks, Months, Hours", "Total Days Only"],
        ["Inclusive End Date", "Supported Toggle (+1 Day)", "Not Supported"],
        ["Leap Year Calculation", "Automatic UTC Accuracy", "Manual Adjustment Needed"]
      ]
    }
  },
  snippets: {
    paragraph: "A Date Difference Calculator is a temporal calculation engine that measures the quantitative interval of time separating two specific calendar dates.",
    list: [
      "Step 1: Select your Start Date in the calendar input.",
      "Step 2: Select your End Date in the calendar input.",
      "Step 3: Check 'Include end date' if you require inclusive day counting.",
      "Step 4: View the instant breakdown of days, weeks, months, and hours."
    ],
    numbered: [
      "Select Start Date",
      "Select End Date",
      "Toggle End Date Option",
      "Read Calculated Duration"
    ],
    table: {
      headers: ["Start Date", "End Date", "Total Days Difference"],
      rows: [
        ["Jan 1, 2026", "Jan 31, 2026", "30 Days"],
        ["Jan 1, 2026", "Dec 31, 2026", "364 Days"],
        ["Jan 1, 2026", "Jan 1, 2027", "365 Days"]
      ]
    }
  },
  howTo: [
    { name: "Input Start Date", text: "Select your beginning calendar date." },
    { name: "Input End Date", text: "Select your ending calendar date." },
    { name: "Toggle Inclusion", text: "Check include end date if counting inclusive days." },
    { name: "Review Results", text: "Read the full breakdown in days, weeks, and hours." }
  ],
  content: {
    heroHeadline: "Calculate Exact Days & Time Span Between Two Dates",
    heroSubheading: "Discover total days, weeks, months, and hours separating any two calendar dates.",
    introduction: "Whether calculating event countdowns, contract durations, or personal anniversaries, finding the exact duration between dates requires accounting for variable month lengths and leap years.",
    definition: "A Date Difference Calculator is an algorithmic time measurement tool that converts calendar dates into millisecond timestamps to compute elapsed temporal intervals.",
    howItWorks: [
      "Timestamp Conversion: Converts start and end dates to UTC epoch millisecond values.",
      "Absolute Difference: Calculates the absolute mathematical difference in milliseconds.",
      "Inclusive Day Adjustment: Adds 86,400,000 ms if include end date is enabled.",
      "Unit Formatting: Divides total duration into days, weeks, months, and total hours."
    ],
    examples: [
      { scenario: "Calculating summer break length", input: "June 1 to Aug 31", output: "91 Days (13 Weeks)" }
    ],
    useCases: [
      { audience: "Event Planners", description: "Calculating exact preparation lead times." },
      { audience: "HR & Billing Specialists", description: "Calculating payroll period durations and leave days." }
    ],
    benefits: [
      { title: "Multi-Unit Precision", description: "View total days alongside weeks and total hours." },
      { title: "Inclusive Billing Mode", description: "Includes option to count both start and end days." }
    ],
    features: [
      { title: "Inclusive End Date Toggle", description: "Add 1 day for inclusive event duration." },
      { title: "Real-Time Calculations", description: "Instant updates on date picker change." }
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools Date Diff", "Basic Date Tools"],
      rows: [
        ["Multi-Unit Results", "Days, Weeks, Months, Hours", "Days Only"],
        ["Include End Date", "Supported Toggle", "Not Available"]
      ]
    },
    accuracyStatement: "Time span calculations are accurate based on UTC calendar standards.",
    limitations: ["Calculations do not filter public holidays automatically."],
    bestPractices: ["Ensure start date precedes end date for positive duration output."],
    expertTips: ["Use the include end date toggle for hotel stay nights vs total day calculations!"],
    disclaimer: { type: "general", text: "Calculations reflect standard calendar intervals." }
  },
  faqs: [
    { question: "How does the Date Difference Calculator work?", answer: "Enter a start date and an end date. The tool calculates the exact difference in total days, weeks, months, years, and total hours." },
    { question: "What does 'Include end date' mean?", answer: "Standard day counting subtracts the end date. Checking 'Include end date' adds 1 day so that both the first and last day are counted." },
    { question: "Does this calculator account for leap years?", answer: "Yes! Leap year days (Feb 29) are automatically included when calculating intervals across leap years." },
    { question: "How many days are between January 1 and December 31?", answer: "There are 364 days between Jan 1 and Dec 31 in a non-leap year (365 days if including the end date)." },
    { question: "Is the Date Difference Calculator free?", answer: "Yes, 100% free with unlimited date calculations." },
    { question: "Can I calculate time difference between historical dates in the past?", answer: "Yes, you can select any historical dates in past years." },
    { question: "Does the calculator display hours as well as days?", answer: "Yes, the result card displays total calculated hours alongside total days." },
    { question: "How does the calculator estimate months?", answer: "Months are calculated using an average Gregorian month length of 30.4375 days." },
    { question: "Can I use this tool for project timeline management?", answer: "Yes! It is ideal for determining total sprint days and delivery intervals." },
    { question: "Does the tool store my selected dates?", answer: "No, all calculations run locally in your web browser with zero data logging." },
    { question: "Does it work on mobile phones?", answer: "Yes, GetFunTools is fully responsive for mobile touchscreens." },
    { question: "What is the difference between total days and work days?", answer: "Total days counts all calendar days, whereas work days excludes weekends." },
    { question: "Why do some online date tools give different results?", answer: "Differences occur if one tool includes the end date while another excludes it." },
    { question: "How many weeks are in 90 days?", answer: "90 days equals 12 weeks and 6 days." },
    { question: "Can I calculate duration into the future?", answer: "Yes, you can set end dates far into future years." }
  ],
  peopleAlsoAsk: [
    { question: "How to count days between two dates?", answer: "Subtract the start date from the end date using a date difference calculator." },
    { question: "How many days are in 6 months?", answer: "6 months equals approximately 182 to 184 calendar days." }
  ],
  eeat: {
    authorName: "Alex Rivers",
    authorRole: "Data Systems Architect",
    authorBio: "Alex specializes in time interval computation and date formatting standards.",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    reviewerName: "Sophia Patel",
    reviewerRole: "Operations Editor",
    lastUpdated: "July 19, 2026",
    contentVersion: "v3.1.0",
    readTime: "4 min read"
  },
  relatedTools: [
    { title: "Date Calculator", slug: "date-calculator", category: "productivity", relationReason: "Add or subtract days to find target dates." },
    { title: "Countdown Timer", slug: "countdown-timer", category: "productivity", relationReason: "Track live countdown time remaining." },
    { title: "Cosmic Age Clock", slug: "cosmic-age-clock", category: "age", relationReason: "Calculate total days lived since your birthdate." }
  ]
};
