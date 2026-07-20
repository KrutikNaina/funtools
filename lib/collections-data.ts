export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  gradient: string;
  badgeBg: string;
  toolSlugs: string[];
  seoDescription: string;
  curatedTips: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: "student",
    slug: "best-student-tools",
    title: "Best Student Tools",
    description: "Essential study calculators, date counters, percentage math, and bio generators for school & college.",
    iconName: "GraduationCap",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    toolSlugs: ["date-calculator", "percentage-calculator", "random-number-generator", "ai-bio-generator", "password-generator"],
    seoDescription: "Discover top student tools for managing deadlines, calculating grade percentages, generating passwords, and boosting productivity.",
    curatedTips: [
      "Use the Percentage Calculator to quickly compute exam scores and grade improvements.",
      "Track assignment deadlines down to the exact day with the Date Calculator.",
      "Generate safe passwords for school portals and student accounts."
    ]
  },
  {
    id: "ai",
    slug: "best-ai-tools",
    title: "Best AI & Smart Tools",
    description: "Next-gen AI bio roasters, prompt boosters, and personality archetypes.",
    iconName: "Sparkles",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    toolSlugs: ["ai-bio-generator", "tech-archetype-quiz", "fancy-font-generator", "username-generator"],
    seoDescription: "Explore curated AI-powered micro-tools designed to craft killer social bios, roast your tech stack, and generate aesthetic text.",
    curatedTips: [
      "Copy your AI bio directly into Twitter or Instagram for maximum engagement.",
      "Take the Tech Archetype Quiz to unlock your dev personality profile."
    ]
  },
  {
    id: "social",
    slug: "best-instagram-tools",
    title: "Best Instagram & Social Tools",
    description: "Viral font generators, aesthetic username makers, and profile bio builders.",
    iconName: "Instagram",
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    badgeBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800",
    toolSlugs: ["fancy-font-generator", "nickname-generator", "username-generator", "ai-bio-generator", "love-calculator"],
    seoDescription: "Level up your Instagram, TikTok, and Discord profiles with unique fonts, rare usernames, and bio generator tools.",
    curatedTips: [
      "Combine Fancy Font Generator symbols with your generated bio for aesthetic profiles.",
      "Use Nickname Generator for gaming tags and alternate handles."
    ]
  },
  {
    id: "finance",
    slug: "best-finance-tools",
    title: "Best Fun Finance Tools",
    description: "Habit wealth multipliers, coffee-to-compounding visualizers, and percentage calculators.",
    iconName: "Coins",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    toolSlugs: ["coffee-to-wealth", "percentage-calculator", "date-calculator"],
    seoDescription: "Visualize your financial future, calculate compound growth from daily habits, and compute quick percentage changes.",
    curatedTips: [
      "Test how saving $5/day on coffee grows over 20 years with compound interest.",
      "Calculate percentage discounts before checking out online."
    ]
  },
  {
    id: "productivity",
    slug: "best-productivity-tools",
    title: "Best Productivity Tools",
    description: "Precision countdown timers, date interval counters, secure password generators, and QR builders.",
    iconName: "Zap",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    toolSlugs: ["countdown-timer", "date-calculator", "date-difference-calculator", "password-generator", "qr-code-generator"],
    seoDescription: "Boost your daily workflow with countdown timers, date interval counters, instant QR codes, and password generators.",
    curatedTips: [
      "Set up countdown timers for focus sessions (Pomodoro technique).",
      "Generate instant WiFi QR codes for fast guest network sharing."
    ]
  },
  {
    id: "games",
    slug: "best-fun-games",
    title: "Best Fun Games & Arcade",
    description: "Reaction speed benchmarks, decision spinners, lucky number games, and interactive quizzes.",
    iconName: "Gamepad2",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    toolSlugs: ["emoji-reaction-test", "decision-wheel", "lucky-number-generator", "tech-archetype-quiz", "love-calculator"],
    seoDescription: "Play addicting reflex games, spin decision wheels, test your reaction time, and try lucky number generators.",
    curatedTips: [
      "Benchmark your millisecond reaction time on mobile or desktop.",
      "Use Decision Wheel to resolve lunch or party game choices fast."
    ]
  },
  {
    id: "random",
    slug: "best-random-generators",
    title: "Best Random Generators",
    description: "True random number pickers, decision spinners, lucky lotto numbers, and password keys.",
    iconName: "Dices",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    toolSlugs: ["random-number-generator", "decision-wheel", "lucky-number-generator", "username-generator", "password-generator"],
    seoDescription: "Generate random numbers, spin customizable pickers, generate lucky numbers, and create random passwords.",
    curatedTips: [
      "Set custom minimum and maximum ranges for giveaways or classroom draws.",
      "Generate cryptographic random passwords up to 64 characters."
    ]
  },
  {
    id: "calculators",
    slug: "best-calculators",
    title: "Best Utility Calculators",
    description: "BMI health calculators, cosmic age clocks, date duration math, and percentage tools.",
    iconName: "Calculator",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    badgeBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800",
    toolSlugs: ["bmi-calculator", "date-calculator", "date-difference-calculator", "percentage-calculator", "cosmic-age-clock", "death-calculator"],
    seoDescription: "Accurate health, date, time, and math calculators engineered for fast, instant browser calculations.",
    curatedTips: [
      "Check your BMI category and body mass index range with instant unit switching.",
      "Calculate exact days between two dates for project planning."
    ]
  },
  {
    id: "design",
    slug: "best-design-tools",
    title: "Best Design & Style Tools",
    description: "Fancy typography modifiers, QR code customizers, and creative text generators.",
    iconName: "Palette",
    gradient: "from-fuchsia-500 via-pink-500 to-purple-500",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-800",
    toolSlugs: ["fancy-font-generator", "qr-code-generator", "ai-bio-generator"],
    seoDescription: "Style text with Unicode fonts, customize QR codes, and generate aesthetic profiles.",
    curatedTips: [
      "Copy fancy font styles directly into Photoshop, Figma, or Instagram.",
      "Download high resolution QR codes for print flyers."
    ]
  },
  {
    id: "developer",
    slug: "best-developer-tools",
    title: "Best Developer & Tech Tools",
    description: "High-entropy password creators, instant QR generators, timestamp calculators, and randomizers.",
    iconName: "Code",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    toolSlugs: ["password-generator", "qr-code-generator", "random-number-generator", "date-difference-calculator", "tech-archetype-quiz"],
    seoDescription: "Essential developer utilities: cryptographic password generator, QR code generator, and date interval tools.",
    curatedTips: [
      "Use maximum length passwords with symbols for database credentials.",
      "Generate test URLs into QR codes for mobile responsive testing."
    ]
  }
];
