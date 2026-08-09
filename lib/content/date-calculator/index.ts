import { DomainToolModule } from "@/types/tool-content";

export const dateCalculatorContent: DomainToolModule = {
  slug: "date-calculator",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Date Calculator",
    secondary: ["Add Days to Date", "Subtract Days Calculator", "Future Date Calculator", "Calendar Math Calculator", "Date Addition Tool"],
    longTail: [
      "free date calculator add days weeks months to date",
      "calculate target date 90 days from today online",
      "how to add 45 business days to starting date",
      "past date subtract calculator free calendar tool",
      "exact future calendar date adder with leap year support"
    ],
    lsi: ["calendar addition", "business days", "julian calendar", "date arithmetic", "day count"],
    semantic: ["date adder", "calendar math tool", "future date finder", "days calculator"],
    questionKeywords: ["how to add 30 days to a date", "what date will it be in 90 days", "how to calculate business days"],
    intentKeywords: ["calculate target date", "add days date", "subtract date calculator"]
  },
  metadata: {
    metaTitle: "Date Calculator - Add & Subtract Days, Weeks, Months to Any Date",
    metaDescription: "Calculate future or past target dates instantly by adding or subtracting specific days, weeks, months, or years. Includes leap year accuracy.",
    slug: "date-calculator",
    canonicalUrl: "https://www.getfuntools.app/tools/date-calculator",
    robots: "index, follow",
    openGraph: {
      title: "Date Add & Subtract Calculator | Instant Calendar Math",
      description: "Find future or past dates by adding or subtracting days, weeks, and months.",
      url: "https://www.getfuntools.app/tools/date-calculator",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Date Calculator - Add & Subtract Calendar Time",
      description: "Instant calendar target date calculator."
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools Date Calculator calculates future or past target dates by adding or subtracting days, weeks, months, and years.",
    twoSentence: "The GetFunTools Date Calculator provides calendar arithmetic for project planning, deadlines, and personal milestones. Users select a base date and input specific day, week, or year offsets to receive the target date with day-of-week details.",
    summary50: "The GetFunTools Date Calculator is a free online calendar tool that allows users to add or subtract days, weeks, months, and years from any starting date. Features include instant target date computation, day-of-week display, and full leap year accuracy.",
    summary100: "The GetFunTools Date Calculator simplifies complex calendar calculations for contract deadlines, event planning, and medical scheduling. By selecting a starting calendar date and specifying offset parameters (years, months, weeks, days), the tool accurately factors in variable month lengths and leap years to return the exact destination date.",
    summary200: "The GetFunTools Date Calculator is an essential calendar utility designed for project managers, legal professionals, students, and event planners. Built on native JavaScript Date object arithmetic, it computes future or past target dates without complex manual counting. Users can toggle between Add and Subtract modes, enter custom offset values across multiple units (e.g. +1 year, +3 months, +14 days), and view the resulting calendar date formatted with day-of-week indicators (e.g. Wednesday, November 18, 2026). The tool automatically handles Gregorian calendar nuances, including 28, 30, and 31-day month boundaries and leap year leap-day adjustments.",
    bulletSummary: [
      "Adds or subtracts years, months, weeks, and days.",
      "Displays full weekday name for target date.",
      "Accurately handles leap years and variable month lengths.",
      "Instant real-time calculation as inputs change.",
      "100% free with no registration required."
    ],
    tableSummary: [
      { label: "Calculation Units", value: "Years, Months, Weeks, Days" },
      { label: "Calendar System", value: "Standard Gregorian Calendar" },
      { label: "Leap Year Support", value: "100% Automatic" },
      { label: "Cost", value: "100% Free" }
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools Date Calculator", "Manual Counting"],
      rows: [
        ["Speed", "Instant (0 ms)", "Prone to manual errors"],
        ["Leap Years", "Automatically Handled", "Often forgotten"],
        ["Day of Week", "Includes Full Weekday Name", "Requires calendar lookup"]
      ]
    }
  },
  snippets: {
    paragraph: "A Date Calculator is an automated calendar tool that performs addition or subtraction of temporal units (days, weeks, months, years) on a starting date to determine a precise target date.",
    list: [
      "Step 1: Select your starting calendar date.",
      "Step 2: Choose 'Add Time' or 'Subtract Time' mode.",
      "Step 3: Input the number of years, months, weeks, or days to offset.",
      "Step 4: View the resulting target date and day of the week."
    ],
    numbered: [
      "Select Base Date",
      "Toggle Add / Subtract",
      "Enter Time Units",
      "View Target Date"
    ],
    table: {
      headers: ["Base Date", "Offset Added", "Target Date"],
      rows: [
        ["Jan 1, 2026", "+30 Days", "Jan 31, 2026"],
        ["Jan 1, 2026", "+90 Days", "Apr 1, 2026"],
        ["Jan 1, 2026", "+1 Year", "Jan 1, 2027"]
      ]
    }
  },
  howTo: [
    { name: "Pick Date", text: "Select your starting calendar date." },
    { name: "Set Offset", text: "Type the number of days or months to add." },
    { name: "Toggle Mode", text: "Switch between Add Time and Subtract Time." },
    { name: "View Result", text: "Read the target date card instantly." }
  ],
  content: {
    heroHeadline: "Add & Subtract Days, Weeks & Months to Any Date",
    heroSubheading: "Calculate future deadlines or past milestone dates with instant calendar math.",
    introduction: "Counting calendar days manually is tedious and error-prone due to varying month lengths. The Date Calculator provides instant date math for deadlines, warranties, and event planning.",
    definition: "A Date Calculator is an arithmetic software utility that applies temporal offsets to a calendar date using standard Gregorian date conversion algorithms.",
    howItWorks: [
      "Date Parsing: Converts selected date string to Unix timestamp representation.",
      "Temporal Offsets: Applies year, month, and day arithmetic in order.",
      "Boundary Correction: Normalizes month end dates (e.g. Feb 28/29).",
      "Result Formatting: Formats timestamp to readable localized date string."
    ],
    examples: [
      { scenario: "Calculating a 90-day invoice due date", input: "Oct 1 + 90 days", output: "Dec 30" }
    ],
    useCases: [
      { audience: "Project Managers", description: "Calculating milestone deliverable dates." },
      { audience: "Legal & Finance Teams", description: "Determining contract expiration and trial deadlines." }
    ],
    benefits: [
      { title: "Error-Free Planning", description: "Eliminates manual calendar miscalculations." },
      { title: "Leap Year Accuracy", description: "Handles 366-day leap years automatically." }
    ],
    features: [
      { title: "Multi-Unit Inputs", description: "Combine years, months, weeks, and days simultaneously." },
      { title: "Add/Subtract Toggle", description: "Calculate past or future target dates." }
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools Date Calculator", "Generic Converters"],
      rows: [
        ["Multi-Unit Offsets", "Supported (Y/M/W/D)", "Single Unit Only"],
        ["Leap Year Calculation", "Automatic", "Manual Adjustment Needed"]
      ]
    },
    accuracyStatement: "Date math utilizes standard UTC/Gregorian calendar algorithms.",
    limitations: ["Calculations assume standard Gregorian calendar rules."],
    bestPractices: ["Verify if your deadline requires total calendar days or business days."],
    expertTips: ["Bookmark this calculator to quickly verify 30-day and 90-day notice periods!"],
    disclaimer: { type: "general", text: "Date calculations assume standard Gregorian calendar rules." }
  },
  faqs: [
    { question: "How does the Date Calculator work?", answer: "Select a base date and enter the number of days, weeks, or months you wish to add or subtract. The tool outputs the exact target calendar date." },
    { question: "Does this calculator account for leap years?", answer: "Yes! The calculator automatically factors in 29 days for February during leap years." },
    { question: "Can I add both months and days at the same time?", answer: "Yes, you can combine years, months, weeks, and days into a single calculation." },
    { question: "What date is 90 days from today?", answer: "Select today's date, input 90 into the Days field, and click calculate to see the exact date." },
    { question: "Is the Date Calculator free?", answer: "Yes, 100% free with unlimited calculations." },
    { question: "Can I calculate past dates?", answer: "Yes! Toggle the mode selector to 'Subtract Time' to find past historical dates." },
    { question: "How does the tool handle months with different day counts?", answer: "The calculator adjusts for 28, 30, and 31-day months according to standard calendar rules." },
    { question: "Does the date output show the day of the week?", answer: "Yes, the result includes the full weekday name (e.g. Monday, Thursday)." },
    { question: "Can I calculate prescription or warranty expiration dates?", answer: "Yes, this is an ideal tool for calculating 30, 60, or 90-day warranty periods." },
    { question: "What is the maximum number of years I can add?", answer: "You can add hundreds of years forward or backward in time." },
    { question: "Does this tool store my entered dates?", answer: "No, all calculations run in your browser and zero data is saved." },
    { question: "Does it work on smartphones?", answer: "Yes, GetFunTools is fully responsive for iPhone, Android, and tablets." },
    { question: "What is the difference between total days and business days?", answer: "Total days includes all 7 days of the week, while business days skip Saturdays and Sundays." },
    { question: "How do I calculate 6 months from today?", answer: "Set Months to 6 and leave Days at 0 to find the exact target date in 6 months." },
    { question: "Why is calendar math difficult to do manually?", answer: "Because months vary in length (28-31 days) and leap years add an extra day every 4 years." }
  ],
  peopleAlsoAsk: [
    { question: "How many days are in a year?", answer: "A standard calendar year has 365 days, while a leap year has 366 days." },
    { question: "What is 30 business days from today?", answer: "30 business days equals approximately 6 full calendar weeks." }
  ],
  eeat: {
    authorName: "Alex Rivers",
    authorRole: "Systems Architect & Data Analyst",
    authorBio: "Alex specializes in time-series data structures and calendar algorithms.",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    reviewerName: "Sophia Patel",
    reviewerRole: "Operations Editor",
    lastUpdated: "July 19, 2026",
    contentVersion: "v3.1.0",
    readTime: "4 min read"
  },
  relatedTools: [
    { title: "Date Difference Calculator", slug: "date-difference-calculator", category: "age", relationReason: "Calculate exact time span between two dates." },
    { title: "Countdown Timer", slug: "countdown-timer", category: "productivity", relationReason: "Set a live ticking clock to your calculated target date." },
    { title: "Cosmic Age Clock", slug: "cosmic-age-clock", category: "age", relationReason: "Discover your age in seconds and planetary years." }
  ]
};
