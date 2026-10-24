import { Category, Tool, BlogPost } from "@/types/tool";

export const CATEGORIES: Category[] = [
  {
    id: "ai",
    name: "AI & Magic",
    description: "Creative AI prompt generators, bio roasters & smart tools",
    iconName: "Sparkles",
    gradient: "from-purple-500 via-indigo-500 to-pink-500",
    badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    count: 12,
  },
  {
    id: "love",
    name: "Love & Vibe",
    description: "Compatibility matchers, crush meters & relationship fun",
    iconName: "Heart",
    gradient: "from-rose-500 via-pink-500 to-red-500",
    badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    count: 9,
  },
  {
    id: "age",
    name: "Age & Cosmic",
    description: "Exact age clock, heartbeats, life in weeks & birthday countdowns",
    iconName: "Clock",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    count: 8,
  },
  {
    id: "gaming",
    name: "Arcade & Play",
    description: "Reflex testers, mini games & speed challenges",
    iconName: "Gamepad2",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    count: 14,
  },
  {
    id: "random",
    name: "Random & Luck",
    description: "Spinning decision wheels, 3D coin flips & randomizers",
    iconName: "Dices",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    count: 11,
  },
  {
    id: "social",
    name: "Social & Fonts",
    description: "Fancy font style generator, bio ideas & viral text tools",
    iconName: "Share2",
    gradient: "from-fuchsia-500 via-purple-500 to-pink-500",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-800",
    count: 15,
  },
  {
    id: "finance",
    name: "Fun Finance",
    description: "Coffee to Tesla wealth visualizer, lottery math & splurge calculators",
    iconName: "Coins",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    badgeBg: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    count: 7,
  },
  {
    id: "personality",
    name: "Personality",
    description: "Tech archetypes, aura matchers & fun character tests",
    iconName: "Smile",
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    count: 10,
  },
  {
    id: "quiz",
    name: "Brain & Quizzes",
    description: "Trivia, instant personality quizzes & knowledge warmups",
    iconName: "BrainCircuit",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    badgeBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800",
    count: 13,
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Micro-timers, focus sounds, pomodoro & text converters",
    iconName: "Zap",
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    badgeBg: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    count: 16,
  },
  {
    id: "text",
    name: "Text Tools",
    description: "Text multipliers, font generators & unicode converters",
    iconName: "Type",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    count: 4,
  },
];

export const TOOLS: Tool[] = [
  {
    id: "love-calc",
    slug: "love-calculator",
    title: "Love Calculator by Name",
    subtitle: "Free love compatibility test with instant percentage & vibes",
    description: "Calculate your love compatibility by name instantly. Enter two names to get a fun love percentage, relationship vibe, and shareable result card. Free, private, and no signup required.",
    category: "love",
    iconName: "HeartHandshake",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-rose-500 to-pink-500",
    tags: ["love calculator", "love calculator by name", "love compatibility", "name compatibility", "couples", "crush test"],
    features: [
      "Instant percentage calculation with animated gauge",
      "4 custom relationship vibe modes (Cosmic Soulmates, Spicy & Playful, Bestie Chemistry, Pure Chaotic Fun)",
      "100% private browser computation (zero name storage)",
      "One-click shareable aesthetic card & friend challenge"
    ],
    faq: [
      {
        question: "How does the Love Calculator by Name work?",
        answer: "The calculator runs locally in your browser, converting the character codes of both names and your selected vibe into an upbeat compatibility percentage between 65% and 99%."
      },
      {
        question: "Is this Love Calculator free to use?",
        answer: "Yes, 100% free with unlimited test runs! No sign-up or download required."
      }
    ]
  },
  {
    id: "fancy-fonts",
    slug: "fancy-font-generator",
    title: "Viral Fancy Font Generator",
    subtitle: "Turn boring text into 20+ copy-paste aesthetic fonts",
    description: "Generate stylish text for Instagram bios, TikTok captions, Discord handles, and Twitter posts. Converts text in real-time into Cursive, Bubble, Gothic, Glitch, and Emoji fonts.",
    category: "social",
    iconName: "Type",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-fuchsia-500 to-purple-600",
    tags: ["fonts", "instagram bio", "aesthetic text", "unicode", "tiktok"],
    features: [
      "Over 20 unique aesthetic Unicode font styles",
      "Instant 1-click copy with toast notification",
      "Live search & style filtering (Aesthetic, Bold, Glitch, Cursive)",
      "Perfect compatibility for Instagram, TikTok, Discord, WhatsApp & Gaming handles"
    ],
    faq: [
      {
        question: "Will these fancy fonts work on Instagram and TikTok?",
        answer: "Yes! All fonts use standard Unicode characters supported by iOS, Android, Instagram, TikTok, Twitter, Discord, and Roblox."
      }
    ]
  },
  {
    id: "reaction-test",
    slug: "reaction-time-test",
    title: "Reaction Time Test",
    subtitle: "Test your gaming reflexes in milliseconds!",
    description: "Build a professional browser-based reaction time tester. Features a 5-round mode with average, best, and median scores. Find out if you have world-class esports reaction time!",
    category: "gaming",
    iconName: "Zap",
    isPopular: true,
    isTrending: false,
    isFeatured: true,
    gradient: "from-emerald-500 to-teal-600",
    tags: ["reaction time test", "reaction speed test", "reflex test", "gaming reaction test"],
    features: [
      "Millisecond precision timing mechanism using performance.now()",
      "5-round mode with consistency, best, worst, and average tracking",
      "Gamer rank badges (World Class, Professional Esports, Elite)",
      "Visual chart comparing your speed against F1 drivers and pro gamers"
    ],
    faq: [
      {
        question: "What is a good average reaction time?",
        answer: "The average human visual reaction time is around 250 milliseconds (ms). Top esports gamers and F1 drivers often achieve 150-180ms!"
      }
    ]
  },
  {
    id: "decision-wheel",
    slug: "decision-wheel",
    title: "Decision Wheel – Free Random Picker",
    subtitle: "Spin the wheel & pick random choices, names, or Yes/No instantly",
    description: "Add your choices, spin the wheel, and get a random result instantly. Use it as a decision maker, random name picker, or wheel spinner for everyday choices, games, classrooms, giveaways, and more.",
    category: "random",
    iconName: "CircleDot",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-blue-500 to-indigo-600",
    tags: ["decision wheel", "free decision wheel", "random picker", "spin the wheel", "wheel spinner", "random name picker", "wheel of names", "yes or no wheel"],
    features: [
      "Smooth spinning wheel animation synchronized with true random selection",
      "10 built-in presets (Food, Movies, Games, Classroom, Work, and more) plus Yes/No mode",
      "Optional elimination mode to remove winners after each spin",
      "100% private browser storage and instant URL sharing"
    ],
    faq: [
      {
        question: "How does the Decision Wheel pick a winner?",
        answer: "It uses the browser's standard pseudo-random number generator to select one of your entries, then animates the wheel so it visually lands on that same result."
      }
    ]
  },
  {
    id: "coffee-wealth",
    slug: "coffee-to-wealth",
    title: "Coffee to Wealth Calculator",
    subtitle: "See how your daily $5 coffee turns into a Tesla or trip!",
    description: "Calculate what your daily splurge (coffee, boba, takeout, subscriptions) would be worth if invested over 5, 10, or 20 years with compound interest visual charts.",
    category: "finance",
    iconName: "TrendingUp",
    isPopular: false,
    isTrending: true,
    isFeatured: true,
    gradient: "from-green-500 to-emerald-600",
    tags: ["savings", "wealth builder", "compound interest", "fun math"],
    features: [
      "Interactive sliders for daily habit cost & expected interest rate",
      "Visual wealth equivalence rewards (Tech Gadgets, Vacation, Electric Car)",
      "Year-by-year compounding growth timeline chart",
      "Playful expense alternatives comparison"
    ],
    faq: [
      {
        question: "What rate of return is used in the wealth calculator?",
        answer: "By default, the calculator uses 8% annual return, which reflects historical broad stock market (S&P 500) average returns."
      }
    ]
  },
  {
    id: "ai-bio",
    slug: "ai-bio-generator",
    title: "AI Bio & Roast Generator",
    subtitle: "Create viral, hilariously accurate social media bios",
    description: "Select your persona style (Sarcastic Gen-Z, Tech Founder, Minimalist Aesthetic, Executive) and generate instant punchy bios with bio rating feedback.",
    category: "ai",
    iconName: "Bot",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-purple-500 to-pink-600",
    tags: ["ai bio", "social bio", "roast", "twitter bio", "linkedin"],
    features: [
      "4 distinct vibe modes: Gen-Z Roast, Tech Visionary, Aesthetic Chic, Executive",
      "Instant copy formatted with emojis & spacing",
      "Bio clout rating breakdown with recommendations",
      "Fresh variations generated on every click"
    ],
    faq: [
      {
        question: "Can I use these bios for Twitter, X, and LinkedIn?",
        answer: "Absolutely! Bios are pre-formatted to fit standard social media character limits."
      }
    ]
  },
  {
    id: "tech-archetype",
    slug: "tech-archetype-quiz",
    title: "Which Tech Archetype Are You?",
    subtitle: "Uncover your digital alter-ego in 4 quick questions",
    description: "Are you a Keyboard Ninja, AI Prompt Whisperer, Midnight Debugger, or Pixel Perfectionist? Take this fun personality quiz with visual progress and custom badges.",
    category: "personality",
    iconName: "BrainCircuit",
    isPopular: false,
    isTrending: true,
    isFeatured: true,
    gradient: "from-violet-500 to-indigo-600",
    tags: ["personality test", "quiz", "tech quiz", "archetype"],
    features: [
      "Smooth multi-step animated card transitions",
      "Custom archetype badges with personality traits & superpower summary",
      "Shareable result summary with downloadable card format",
      "Fun illustrations and micro-animations"
    ],
    faq: [
      {
        question: "How long does the Tech Archetype Quiz take?",
        answer: "Only about 60 seconds! 4 simple multiple-choice questions."
      }
    ]
  },
  {
    id: "cosmic-age",
    slug: "cosmic-age-clock",
    title: "Cosmic Age & Life Stats Clock",
    subtitle: "Discover your age in seconds, heartbeats & planetary years",
    description: "Enter your birthday to reveal your exact live ticking age down to seconds, total estimated heartbeats, days lived, and what age you'd be on Mars and Venus!",
    category: "age",
    iconName: "Orbit",
    isPopular: true,
    isTrending: false,
    isFeatured: true,
    gradient: "from-amber-500 to-orange-600",
    tags: ["age clock", "birthday countdown", "space age", "cosmic clock"],
    features: [
      "Live ticking seconds clock with precision counter",
      "Total estimated heartbeats & breathing stats",
      "Planetary age calculator (Age on Mars, Venus, Jupiter)",
      "Next birthday countdown with day of the week indicator"
    ],
    faq: [
      {
        question: "How are planetary ages calculated?",
        answer: "Planetary ages are calculated using orbital periods around the Sun (e.g. 1 year on Mars = 687 Earth days)."
      }
    ]
  },
  {
    id: "bmi-calc",
    slug: "bmi-calculator",
    title: "BMI Calculator",
    subtitle: "Calculate your adult Body Mass Index in kg/cm or ft/lbs instantly",
    description: "Calculate your adult BMI using height and weight in metric or imperial units. Check your BMI category, view standard adult BMI ranges, and understand BMI's limitations.",
    category: "productivity",
    iconName: "Activity",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-teal-500 to-emerald-600",
    tags: [
      "BMI Calculator",
      "Body Mass Index Calculator",
      "BMI Calculator for Adults",
      "Calculate BMI from Height and Weight",
      "BMI Calculator kg and cm",
      "BMI Calculator Feet and Inches",
      "BMI Chart for Adults",
      "BMI Categories for Adults",
      "BMI Formula"
    ],
    features: [
      "Metric (cm/kg) & Imperial (ft & in/lbs) dual synchronized controls",
      "Instant real-time calculation with unrounded WHO threshold evaluation",
      "Standard adult WHO categories (Underweight, Healthy Weight, Overweight, Obesity)",
      "Mathematical formula and substitution step display",
      "1-click result copy to clipboard and reset action",
      "100% private, client-side calculation in your browser"
    ],
    faq: [
      {
        question: "How is Body Mass Index (BMI) calculated?",
        answer: "In the metric system: BMI = weight in kilograms ÷ height in metres squared. In the imperial system: BMI = 703 × weight in pounds ÷ height in inches squared."
      },
      {
        question: "What is a healthy BMI range for adults?",
        answer: "According to the World Health Organization and CDC, a healthy adult BMI is between 18.5 and 24.9."
      }
    ]
  },
  {
    id: "username-gen",
    slug: "username-generator",
    title: "Viral Username Generator",
    subtitle: "Generate 50+ unique, aesthetic usernames for Instagram, TikTok & Discord",
    description: "Create memorable usernames for social media and gaming handles with style selectors like Aesthetic, Gaming, Tech, Cute, and Anime.",
    category: "social",
    iconName: "Share2",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-fuchsia-500 to-indigo-600",
    tags: ["username generator", "aesthetic handles", "social media names", "gaming tags"],
    features: [
      "5 distinct style themes (Aesthetic, Cyber, Cute, Tech, Anime)",
      "Instant 1-click clipboard copy",
      "Prefix & Suffix custom keyword injectors",
      "Social media availability checker hint"
    ],
    faq: [
      {
        question: "How do I generate unique usernames?",
        answer: "Enter your favorite keyword, pick a style vibe, and click Generate to see 50+ creative variations."
      }
    ]
  },
  {
    id: "password-gen",
    slug: "password-generator",
    title: "Strong Password Generator",
    subtitle: "Create unhackable passwords with entropy strength scoring",
    description: "Generate cryptographically secure passwords with custom length, uppercase, lowercase, numbers, and special symbols.",
    category: "productivity",
    iconName: "Zap",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-emerald-500 to-cyan-600",
    tags: ["password generator", "security", "random password", "cyber security"],
    features: [
      "Custom length selector from 8 to 64 characters",
      "Entropy strength meter & crack time estimation",
      "1-click copy with automatic memory wipe timer",
      "100% client-side cryptographic generation"
    ],
    faq: [
      {
        question: "Is this password generator secure?",
        answer: "Yes, all passwords are generated locally in your browser using crypto.getRandomValues(). No passwords touch a server."
      }
    ]
  },
  {
    id: "date-calc",
    slug: "date-calculator",
    title: "Date Add & Subtract Calculator",
    subtitle: "Add or subtract days, weeks, months & years to any date",
    description: "Calculate future or past target dates instantly by adding or subtracting specific days, weeks, months, or years.",
    category: "productivity",
    iconName: "Clock",
    isPopular: false,
    isTrending: true,
    isFeatured: true,
    gradient: "from-amber-500 to-orange-500",
    tags: ["date calculator", "add days to date", "subtract months", "calendar math"],
    features: [
      "Flexible addition & subtraction modes",
      "Day of week calculation for final target date",
      "Business days vs total days options",
      "Quick preset buttons (+30 days, +90 days, +1 year)"
    ],
    faq: [
      {
        question: "Can I add business days only?",
        answer: "Yes! Toggle the business days filter to skip weekends automatically."
      }
    ]
  },
  {
    id: "date-diff-calc",
    slug: "date-difference-calculator",
    title: "Date Difference Calculator",
    subtitle: "Calculate exact time span & days between any two dates",
    description: "Calculate the exact number of days between two dates, including weeks, months and hours. Free online date difference calculator with an optional end-date setting.",
    category: "age",
    iconName: "Clock",
    isPopular: true,
    isTrending: false,
    isFeatured: true,
    gradient: "from-yellow-500 to-amber-600",
    tags: ["days between dates", "date difference calculator", "number of days between dates", "calculate days between two dates", "time between two dates", "weeks between dates", "hours between dates", "date duration calculator"],
    features: [
      "Breakdown in total days, weeks, calendar duration, and hours",
      "Include or exclude end date toggle (+1 day)",
      "Automatic leap year accuracy (366-day handling)",
      "Real-time instant results with quick interval presets"
    ],
    faq: [
      {
        question: "How does the date difference calculator handle leap years?",
        answer: "The calculator accounts for standard 365-day years and 366-day leap years automatically."
      }
    ]
  },
  {
    id: "percentage-calc",
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    subtitle: "Calculate percentages, percentage increase & decrease, and compare values instantly",
    description: "Use this free percentage calculator to find a percentage of a number, calculate percentage increase or decrease, and compare values instantly with formulas and examples.",
    category: "finance",
    iconName: "Coins",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-green-500 to-teal-600",
    tags: [
      "percentage calculator",
      "percentage increase calculator",
      "percentage decrease calculator",
      "percentage change calculator",
      "percentage of a number calculator",
      "calculate percentage online",
      "percentage difference calculator",
      "percent off calculator",
      "percentage calculator with steps"
    ],
    features: [
      "3 dedicated modes: % of a number, percentage change (increase/decrease), and ratio percentages",
      "Instant real-time calculation with zero page reloads",
      "Clear handling of undefined zero-baseline division",
      "Quick percentage presets (5%, 10%, 15%, 20%, 25%, 50%) for tips and discounts",
      "Step-by-step arithmetic notation and 1-click result copy",
      "100% private, client-side calculation in your browser"
    ],
    faq: [
      {
        question: "How do you calculate percentage of a number?",
        answer: "Multiply the percentage by the total number and divide by 100. For example, 15% of 200 = (15 ÷ 100) × 200 = 30."
      },
      {
        question: "How do you calculate percentage increase or decrease?",
        answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100. A positive result indicates an increase; a negative result indicates a decrease. If the original value is zero, the calculation is mathematically undefined."
      }
    ]
  },
  {
    id: "random-num-gen",
    slug: "random-number-generator",
    title: "Random Number Generator",
    subtitle: "Generate random numbers, lottery picks & custom ranges",
    description: "Generate single or multiple random numbers between any min and max limit with unique non-repeating filters and sorting.",
    category: "random",
    iconName: "Dices",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-blue-500 to-indigo-600",
    tags: ["random number", "number picker", "lottery generator", "rng"],
    features: [
      "Min and Max custom integer range bounds",
      "Allow or disallow duplicate numbers toggle",
      "Ascending/Descending sorting options",
      "Animated 3D die roll animation effect"
    ],
    faq: [
      {
        question: "Is this random number generator truly random?",
        answer: "Yes, it uses browser cryptographic random algorithms for maximum unbiased randomness."
      }
    ]
  },
  {
    id: "qr-code-gen",
    slug: "qr-code-generator",
    title: "Free QR Code Generator",
    subtitle: "Create downloadable HD QR codes for URLs, WiFi & Text",
    description: "Generate custom styled QR codes for links, text messages, phone numbers, and WiFi networks with high resolution PNG download.",
    category: "productivity",
    iconName: "Zap",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-indigo-500 to-purple-600",
    tags: ["qr code generator", "free qr code", "wifi qr code", "url to qr"],
    features: [
      "Support for URLs, Plain Text, Email, and WiFi credentials",
      "Custom foreground & background color picker",
      "Instant high-res PNG & SVG download",
      "Zero registration or expiration limits"
    ],
    faq: [
      {
        question: "Do generated QR codes expire?",
        answer: "No! Static QR codes generated here never expire and work forever."
      }
    ]
  },
  {
    id: "countdown-timer-tool",
    slug: "countdown-timer",
    title: "Countdown Timer",
    subtitle: "Create live ticking countdown timers for any event",
    description: "Create a free countdown timer for birthdays, vacations, events, launches, holidays and important dates. Set a date and time and watch the countdown update live.",
    category: "productivity",
    iconName: "Clock",
    isPopular: false,
    isTrending: true,
    isFeatured: true,
    gradient: "from-purple-500 to-rose-500",
    tags: ["countdown timer", "countdown timer online", "free countdown timer", "online countdown clock", "event countdown", "countdown clock", "live countdown timer", "days until calculator", "countdown to a date", "birthday countdown", "vacation countdown"],
    features: [
      "Days, Hours, Minutes, and Seconds live ticking clock",
      "Custom event title & local timezone accuracy",
      "Shareable countdown links via Web Share API or copy link",
      "Celebratory zero state when countdown arrives"
    ],
    faq: [
      {
        question: "Can I share my countdown timer with friends?",
        answer: "Yes! Use the Share button to copy a direct link to your custom event countdown."
      }
    ]
  },
  {
    id: "lucky-num-gen",
    slug: "lucky-number-generator",
    title: "Cosmic Lucky Number Generator",
    subtitle: "Find your lucky numbers for lottery, astrology & daily picks",
    description: "Generate personal lucky numbers based on your birth date, zodiac sign, or daily cosmic energy math.",
    category: "random",
    iconName: "Dices",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-violet-500 to-pink-500",
    tags: ["lucky numbers", "lottery numbers", "zodiac lucky number", "daily luck"],
    features: [
      "Birthdate numerology lucky number breakdown",
      "Zodiac element energy sync calculator",
      "Lottery mega ball & power ball generator preset",
      "Shareable lucky aura card"
    ],
    faq: [
      {
        question: "How are lucky numbers calculated?",
        answer: "We combine Pythagorean numerology date reduction with daily planetary cosmic algorithms."
      }
    ]
  },
  {
    id: "nickname-gen",
    slug: "nickname-generator",
    title: "Cool Nickname Generator",
    subtitle: "Generate 40+ epic nicknames for gaming, socials & alter-egos",
    description: "Find epic aliases and cool nicknames for Discord, Roblox, Valorant, and social profiles with vibe filters.",
    category: "social",
    iconName: "Share2",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-pink-500 to-rose-600",
    tags: ["nickname generator", "gamer tags", "discord names", "cool nicknames"],
    features: [
      "4 distinct vibe modes (Cyberpunk, Mythic, Cute, VIP)",
      "1-click copy with toast notifications",
      "Name rating meter & popularity badges",
      "Custom keyword blender"
    ],
    faq: [
      {
        question: "Can I use these nicknames on Discord and games?",
        answer: "Yes! All generated nicknames are formatted for social media and gaming profiles."
      }
    ]
  },
  {
    id: "death-calc",
    slug: "death-calculator",
    title: "Death Calculator",
    subtitle: "Explore your estimated remaining days with funny longevity badges",
    description: "Try this free death calculator for a playful estimate of your remaining days. Explore your lifespan, discover fun longevity badges, and share your result. Entertainment only.",
    category: "personality",
    iconName: "Smile",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-slate-700 via-purple-900 to-slate-900",
    tags: [
      "death calculator",
      "death clock",
      "fun death clock",
      "when will I die calculator",
      "how many days do I have left to live",
      "lifespan calculator"
    ],
    features: [
      "5 interactive habit sliders (Age, Coffee, Sleep, Laughter, Chaos)",
      "Instant multi-unit conversion into remaining Days, Weeks, Months, and Years",
      "5 funny longevity archetype badges (Immortal Cactus to Living Legend)",
      "1-click result card sharing and 100% private client-side calculations"
    ],
    faq: [
      {
        question: "Is this death calculator accurate?",
        answer: "No! This tool is 100% created for fun, entertainment, and lighthearted humor with zero medical validity."
      }
    ]
  },
  {
    id: "text-repeater-tool",
    slug: "text-repeater",
    title: "Text Repeater Generator",
    subtitle: "Repeat any text up to 10,000 times instantly",
    description: "Multiply words, sentences, or emojis thousands of times with custom separators like spaces or new lines.",
    category: "text",
    iconName: "Type",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    gradient: "from-indigo-500 to-blue-600",
    tags: ["text repeater", "repeat text", "string multiplier", "text spammer"],
    features: [
      "Up to 10,000 text repetitions instantly",
      "Custom separators (Space, New Line, Custom)",
      "Live character counter for platform limits",
      "1-click fast clipboard copy"
    ],
    faq: [
      {
        question: "Is there a limit to how much text I can repeat?",
        answer: "The tool is limited to 10,000 repetitions at once to ensure your browser remains fast and responsive."
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-10-aesthetic-fonts-for-instagram-2026",
    title: "10 Popular Aesthetic Fonts for Instagram & TikTok Bios 2026",
    excerpt: "Stand out on social media with the best aesthetic fonts for Instagram bio and TikTok! Use our fancy font generator for cute fonts to copy paste instantly.",
    category: "Social Media Tips",
    readTime: "4 min read",
    date: "July 18, 2026",
    author: {
      name: "Alex Rivers",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Creative Director"
    },
    content: [
      "Tired of your social media profiles blending into the endless, mind-numbing infinite scroll? When everyone else is using the exact same default text, a basic, standard bio just isn't going to cut it anymore. You pour hours into creating the perfect photo dumps and aesthetic TikToks, yet your profile bio remains totally unstyled.",
      "Your bio acts as the digital equivalent of a first impression. You have less than three seconds to convince someone to smash that follow button. Upgrading your text with aesthetic fonts for Instagram bio updates is the quickest way to signal your unique vibe. Whether you aim for chaotic Y2K energy, dark academia, or clean girl minimalism, the letters you choose communicate your brand immediately.",
      "Why does this actually matter for engagement? Social media best practices constantly emphasize that visual disruption is the key to stopping the scroll. Breaking up the expected visual pattern of standard system fonts catches the human eye. It subconsciously tells the viewer that you put extra effort into your content. Upgrading your profile text offers a complete visual makeover for your personal brand without requiring you to learn graphic design. Let's dive into the absolute best typography trends dominating the internet right now.",
      "## 10 Most Popular Aesthetic Fonts for 2026",
      "## 1. Bold Serif",
      "Nothing communicates sophistication quite like a classic serif font, but rendering it in bold adds a strikingly modern twist. This particular style is absolutely flawless for fashion influencers, business coaches, or anyone curating a luxury moodboard aesthetic. It commands immediate respect while remaining incredibly readable on tiny smartphone screens. When you want to look perfectly organized, this typography is your go-to option.",
      "Example: 𝐁𝐮𝐢𝐥𝐝𝐢𝐧𝐠 𝐦𝐲 𝐝𝐫𝐞𝐚𝐦 𝐥𝐢𝐟𝐞 𝐨𝐧𝐞 𝐝𝐚𝐲 𝐚𝐭 𝐚 𝐭𝐢𝐦𝐞 ✧",
      "## 2. Cursive Script",
      "If your goal is to channel a soft, romantic, or wildly creative energy, cursive script will be your absolute best friend. It introduces an elegant, handwritten touch to your digital profile that feels highly personal. This remains arguably one of the most beloved and continually searched cute fonts for Instagram 2026, seeing massive popularity among lifestyle vloggers and independent artists. It feels like a secret note broadcast to your entire follower list.",
      "Example: 𝒞𝓇𝑒𝒶𝒯𝒾𝓃𝑔 𝓂𝒶𝑔𝒾𝒸 𝒾𝓃 𝓉𝒽𝑒 𝑒𝓋𝑒𝓇𝓎𝒹𝒶𝓎 ♡",
      "## 3. Glitch & Strikethrough",
      "Are you looking to project a more edgy, chaotic, or tech-forward persona? The glitch or strikethrough aesthetic completely shatters the standardized look of a sterile corporate platform. This vibe has become a massive hit within the hardcore gaming community, underground streetwear brands, and anyone gravitating toward an alternative digital identity. It essentially looks like your profile is hacking the matrix, instantly stopping casual scrollers in their tracks.",
      "Example: E̶x̶p̶l̶o̶r̶i̶n̶g̶ ̶t̶h̶e̶ ̶u̶n̶k̶n̶o̶w̶n̶ ̶s̶i̶m̶u̶l̶a̶t̶i̶o̶n̶ 👾",
      "## 4. Bubble Text",
      "Bubble fonts are unapologetically playful, wonderfully loud, and quite frankly impossible to ignore. They inject a heavy dose of nostalgic, early-2000s Y2K energy directly onto your page. If your personal brand revolves around radical positivity, vibrant maximalism, and just having a good time, these rounded characters will flawlessly match your upbeat aesthetic. It is practically impossible to read this text without smiling, making it a fantastic choice for comedy creators who want to radiate approachability.",
      "Example: ⓈⓅⓇⒺⒶⒹⒾⓃⒼ ⒼⓄⓄⒹ ⓋⒾⒷⒺⓈ ⓄⓃⓁⓎ ✌️",
      "## 5. Gothic & Old English",
      "Dark, dramatic, and dripping with intense moodiness, the Gothic text style makes a remarkably powerful statement. This heavy, incredibly ornate typography is a foundational staple for alternative fashion creators, talented tattoo artists, and underground musicians. Utilizing this option instantly grants your page an undeniable aura of mystery and historical weight that standard sans-serif letters could never possibly achieve. It turns a simple sentence into a medieval proclamation.",
      "Example: 𝔄𝔯𝔱 𝔦𝔰 𝔱𝔥𝔢 𝔬𝔫𝔩𝔶 𝔱𝔯𝔲𝔱𝔥 𝔩𝔢𝔣𝔱 🕷️",
      "## 6. Minimalist Small Caps",
      "There is something undeniably chic and refined about the perfectly uniform, perfectly aligned look of small caps. It provides a highly organized, pristine appearance that deeply satisfies the ultimate minimalist aesthetic so many creators strive for. We highly recommend this specific route if you desire a profile that looks meticulously curated, effortlessly cool, and deliberately understated. It speaks volumes by keeping things visually quiet.",
      "Example: ᴍᴀᴋɪɴɢ ᴍᴇᴍᴏʀɪᴇꜱ ᴀʀᴏᴜɴᴅ ᴛʜᴇ ɢʟᴏʙᴇ ✈️",
      "## 7. Circled Badge Letters",
      "Do you want your name, your pronouns, or your core niche keywords to literally pop off the screen? Circled fonts act like tiny, personalized individual badges for every single character you type. They are phenomenally effective for highlighting specific, crucial words in your bio or for generating highly stylized bullet points. This guides the reader's eye exactly where you want it to go. Whether you are launching a new YouTube channel or linking to your digital portfolio, these circular borders demand attention without feeling overly aggressive.",
      "Example: ⒸⓇⒺⒶⓉⓄⓇ | ⒹⒺⓈⒾⒼⓃⒺⓇ | ⒹⓇⒺⒶⓂⒺⓇ",
      "## 8. Double-Struck Outline",
      "Frequently referred to in academic circles as blackboard bold, the double-struck font provides your text with a mesmerizing hollowed-out, structural appearance. It manages to strike the ultimate sweet spot between standing out boldly and remaining airy, light, and approachable. We constantly see this stunning option utilized heavily by educational creators, dedicated study-gram accounts, and visually minimalist lifestyle profiles looking for just a dash of flair. It feels incredibly premium while retaining an undeniable artistic edge.",
      "Example: 𝕎𝕒𝕟𝕕𝕖𝕣𝕝𝕦𝕤𝕥 𝕒𝕟𝕕 𝕔𝕚𝕥𝕪 𝕕𝕦𝕤𝕥 🏙️",
      "## 9. Retro Monospace Typewriter",
      "Bring a highly comforting touch of vintage nostalgia directly to your modern digital presence by utilizing a retro typewriter font. Because monospace letters are evenly spaced by definition, they create a visually satisfying, blocky alignment that feels incredibly deliberate and wonderfully old-school. It has become the absolute ultimate go-to for independent poets, deep-thinking writers, and meticulously crafted indie film moodboards. It makes your bio feel like a typed manuscript, instantly signaling to your audience that you value depth, literature, and quiet coffee shop aesthetics above all else.",
      "Example: ｔｈｏｕｇｈｔｓ　ｏｎ　ｄｉｇｉｔａｌ　ｐａｐｅｒ ✍️",
      "## 10. Wingdings & Aesthetic Symbols",
      "Sometimes, standard alphabet letters alone simply aren't enough to accurately capture your entire complex vibe. Mixing in beautiful aesthetic symbols—such as sparkling stars, elegant brackets, tiny hearts, and delicate text dividers—elevates your profile to a completely new level of digital artistry. You can seamlessly combine these decorative elements with any of the other fonts mentioned above. Doing this guarantees you will invent entirely custom Instagram bio font ideas. A simple arrangement of sparkling stars can dramatically transform a mundane sentence into a mesmerizing piece of profile art.",
      "Example: ⋆ ˚｡⋆୨୧˚ 𝐿𝒾𝓋𝒾𝓃𝑔 𝓂𝓎 𝒷𝑒𝓈𝓉 𝓁𝒾𝒻𝑒 ˚୨୧⋆｡˚ ⋆",
      "## How to Use These Fonts in Your Bio",
      "Transforming the entire look and feel of your social media profile is surprisingly simple, and you absolutely do not need to download any sketchy third-party apps to make the magic happen. Thanks to the brilliance of unicode fonts copy paste technology, you can successfully update your bio in mere seconds. Just follow this foolproof, three-step method to get it done flawlessly:",
      "1. First, navigate over to a reliable [Fancy Font Generator] online. You will see a main input box at the very top of the page. Type or paste your desired bio text directly into that box. Don't be afraid to experiment with different phrases or keywords until the message looks perfect.",
      "2. Second, simply scroll through the dynamically generated list of typography styles that appears below your text. Take your time evaluating which aesthetic perfectly matches your personal brand's unique energy. Once you spot the undisputed winner, all you have to do is hit the copy button next to it.",
      "3. Finally, open up your target social media app on your phone or desktop. Navigate straight to your profile, click the 'Edit Profile' button, and securely paste the new stylized characters directly into your bio section. Hit the save button, refresh your page, and admire your engaging new look!",
      "## Frequently Asked Questions About Bio Fonts",
      "## Do fancy fonts work on all social media platforms?",
      "Yes, they absolutely do! Because these incredibly cool designs aren't actually standard typefaces in the traditional computing sense, but rather universally recognized special Unicode characters, they boast incredibly widespread support. Whether you are actively hunting for the best TikTok bio fonts, looking to update your Twitter/X display name, or completely refreshing your Instagram page, these unique characters will seamlessly carry over to any platform supporting basic text input.",
      "## Why do some fonts occasionally show up as blank boxes?",
      "If a handful of your followers complain that they are seeing blank squares (often affectionately referred to as 'tofu') instead of your gorgeous new text, there is a simple explanation. It essentially means their specific mobile device or operating system is severely outdated and lacks the proper programming to render newer Unicode characters. If you want to play it completely safe, stick to the time-tested classics like Bold Serif or Monospace.",
      "## Are unicode aesthetic fonts completely free to use?",
      "They are 100% free, forever! You should never have to pull out a credit card just to utilize a high-quality fancy font generator online. We firmly believe that absolutely everyone deserves to have a digital profile that genuinely reflects their innermost personality. Additionally, if you find yourself suffering from writer's block and need help brainstorming what you should actually write, you can effortlessly bounce ideas off an [AI Bio Generator] to craft the ultimate hook.",
      "## Ready to Give Your Profile a Massive Upgrade?",
      "It is officially time to stop settling for a boring, default aesthetic that completely fails to capture how genuinely awesome and creative you actually are in real life. Elevating your digital footprint and upgrading your overall social media presence has literally never been easier. Head directly over to our [Fancy Font Generator] right this very second! Type in your absolute favorite motivational quote, your professional introduction, or a hilarious joke, and instantly discover dozens of the most cute fonts for Instagram 2026. Copy your favorite design, paste it into your profile, and eagerly watch your follower engagement reach entirely new heights!"
    ],
    relatedTools: ["fancy-font-generator", "ai-bio-generator"]
  },
  {
    slug: "how-small-daily-habits-build-huge-wealth",
    title: "The Coffee Math: Daily Savings Compound Interest Calculator",
    excerpt: "Discover how much your daily habits cost you! Use our coffee to wealth calculator to see how to invest $5 a day and build massive long-term savings.",
    category: "Fun Finance",
    readTime: "5 min read",
    date: "July 12, 2026",
    author: {
      name: "Sophia Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      role: "Finance Editor"
    },
    content: [
      "We have all heard the exact same tired financial advice dominating our social media feeds for the last decade. It usually involves an intense finance guru yelling through a screen, claiming you will never own a home or retire comfortably solely because you refuse to give up your daily $5 iced latte. Let's be honest: this aggressive 'skip your latte' lecturing doesn't motivate anyone to save money. It just makes people feel guilty for enjoying a simple pleasure in their otherwise chaotic lives.",
      "Instead of using shame as a financial strategy, let's completely reframe the famous 'latte factor' conversation. What if we stop looking at your morning coffee as a moral failure and start treating it as a genuinely fascinating mathematical exercise? We aren't here to judge how you spend your cash or tell you that enjoying a pastry is ruining your future. We simply want to pull back the curtain on the mathematics of small savings big returns.",
      "By running the raw numbers through a daily savings compound interest equation, we can uncover exactly how tiny daily decisions snowball over time. Seeing the data is incredibly empowering. It allows you to make informed decisions about your budget without the unnecessary guilt trip.",
      "## The Magic Behind the Math: Compound Interest Explained",
      "Before we dive into the juicy numbers of the coffee to wealth calculator, we need to talk about the financial wizardry making this possible: compound interest. If you normally glaze over when you hear financial terminology, stay with us! We promise to keep this simple and entirely jargon-free.",
      "Imagine rolling a very small snowball down a snow-covered hill. As that tiny snowball rolls downward, it naturally picks up a thin layer of fresh snow. Because the snowball is now slightly larger, its increased surface area allows it to pick up even more snow on the next rotation. It doesn't just grow by a flat amount; its growth actually accelerates. The bigger it gets, the faster it grows.",
      "This snowball effect is exactly how compound interest works for your money. When you invest your cash, you earn a return. In the next cycle, you don't just earn a return on your original cash—you also earn a return on the returns you previously gathered. This creates an exponential growth curve that transforms incredibly modest daily habits into staggering sums.",
      "## What Does Investing $5 a Day Actually Look Like?",
      "Let's put this concept into a practical perspective. What happens when you decide to invest $5 a day instead of spending it? We are going to assume that you are saving $5 every day, equaling roughly $150 deposited at the end of every month. We will also assume you are investing this money into a broad market index fund yielding a standard 8% average annual return, compounding monthly.",
      "Here is the mind-blowing breakdown of how that small choice balloons over time:",
      "• **In 5 Years:** You will have personally deposited a total of $9,000. However, thanks to the magic of compounding, your account balance will sit at approximately $11,041. You essentially earned over $2,000 just for letting your money sit there.",
      "• **In 10 Years:** You will have deposited a total of $18,000 of your own money. Your investment account, though, will have swelled to roughly $27,442. Your money is now working significantly harder and generating nearly ten thousand dollars in pure profit.",
      "• **In 20 Years:** This is where the exponential growth curve truly explodes. You will have contributed $36,000 out of pocket. Your final account balance? A staggering $88,382! Your original money has more than doubled itself without you lifting a finger.",
      "When you ask how much does skipping coffee save, most people simply multiply $5 by 365 days. But as the math clearly shows, that linear calculation completely misses the exponential superpower of a compound interest calculator daily habit.",
      "## Addressing the Elephant in the Room: Common Objections",
      "Whenever we talk about long-term investing, a lot of valid concerns immediately pop up. The real world isn't a perfectly sterile laboratory. Let's tackle some of the biggest objections head-on.",
      "**But what if I invest badly and lose it all?**",
      "This is a massive fear for beginners! The strategy we model here relies heavily on buying highly diversified index funds, not throwing cash into speculative meme stocks. Broad market index funds track the overall health of the entire economy. While the market absolutely has occasional downturns, historically it has always recovered and trended upward over long timelines.",
      "**What if inflation completely eats my gains?**",
      "Inflation is a reality we all face—$88,000 in twenty years will not buy exactly what it buys today. However, investing is your strongest defense against inflation. If you just leave that $5 in a traditional savings account, it is guaranteed to lose purchasing power. Investing it at an average 8% return typically outpaces the historical inflation rate, helping your money maintain its actual value.",
      "**Isn't $5 a day just way too small to actually matter?**",
      "This is the biggest misconception holding people back! You don't need a massive Wall Street salary to begin generating wealth. Building a financial safety net is about absolute consistency, not giant gestures. That tiny $5 a day is the crucial spark that eventually builds an $88,000 roaring fire.",
      "## A Tool for Mindset, Not Strict Financial Advice",
      "We want to be incredibly clear: calculating the latte factor is primarily an educational exercise designed to shift your perspective. We are not officially advising you to stop buying things that bring you genuine joy, and this blog post should not be taken as formal, licensed financial advice.",
      "Every individual's financial situation is uniquely complex. The actual returns you see in the market will fluctuate wildly; you might see a 20% gain one year and a 10% drop the next. The 8% figure we use is simply a historical average meant for long-term illustration, not a cast-iron guarantee.",
      "Ultimately, tracking your daily spend isn't about punishing yourself—it is about empowering yourself. It is a mindset tool that helps you recognize the immense potential hiding in your daily habits, allowing you to intentionally choose which splurges are actually worth it to you.",
      "## Try It With Your Own Numbers",
      "Reading about hypothetical scenarios is fun, but seeing your own personal math is where the magic truly happens. Everyone has a different daily habit they might be curious about. Maybe it isn't coffee for you. Maybe it's a daily energy drink, premium app subscriptions, or ordering takeout lunch instead of meal prepping.",
      "Instead of doing the complex exponential math on a notepad, we have built the ultimate shortcut. Jump straight into our interactive [Coffee to Wealth Calculator] right now. You can adjust the daily cost, tweak the expected return rate to match your comfort level, and slide the timeline around to see exactly how your specific habits translate into long-term financial outcomes. If you are ever feeling stuck between spending and saving, you could even give our [Decision Wheel] a spin to let fate decide your purchase for the day!",
      "## Frequently Asked Questions About the Coffee Math",
      "## Is an 8% annual return actually realistic?",
      "Yes, it is considered a highly realistic historical benchmark! The S&P 500, which tracks the 500 largest companies in the United States, has historically averaged an annual return of roughly 10% before inflation over the last several decades. Keep in mind, this is a long-term average. Any single year could be wildly different, but over 10 or 20 years, 8% is standard forecasting math.",
      "## What if I want to invest more than $5 a day?",
      "Then your snowball is going to get significantly bigger, significantly faster! The beauty of the daily savings compound interest equation is that it scales perfectly. If you save and invest $10 or $20 a day, your end results will multiply accordingly. We highly recommend using the calculator to plug in larger numbers to see how rapidly your wealth can compound.",
      "## Does this math work for debt payoff instead of savings?",
      "Absolutely! In fact, the math works in reverse when it comes to debt, and it can be even more impactful. If you take that extra $5 a day and apply it directly to a high-interest credit card balance, you are effectively 'earning' a massive guaranteed return by avoiding those steep interest charges. Paying down debt is often the smartest first step before jumping into the stock market.",
      "## Ready to Uncover Your Financial Future?",
      "The difference between feeling financially stuck and building serious long-term momentum often comes down to understanding the quiet power of consistency. You don't need to completely eliminate all joy from your budget, but being aware of the math gives you complete control over your own destiny. Are you ready to see exactly what your daily habits are worth? Head over to our [Coffee to Wealth Calculator] right now, plug in your daily spend, and prepare to be genuinely surprised by the massive potential hiding in your wallet!"
    ],
    relatedTools: ["coffee-to-wealth", "decision-wheel"]
  }
];

export const HOME_FAQS = [
  {
    question: "What is GetFunTools?",
    answer: "GetFunTools is a premium, lightweight platform of interactive micro-apps, fun calculators, personality quizzes, AI prompt tools, and utility games designed for entertainment and quick answers."
  },
  {
    question: "Are all tools on GetFunTools free?",
    answer: "Yes! Every single tool on GetFunTools is 100% free with unlimited usage, no registration required, and no hidden fees."
  },
  {
    question: "Is my data private when using tools?",
    answer: "Absolutely. All calculations, text transformations, and quiz processing happen client-side right inside your browser. We never store or transmit your private text or inputs."
  },
  {
    question: "Can I embed or share these tools with friends?",
    answer: "Yes! Every tool includes a share button to copy links or post results on Twitter, WhatsApp, Discord, and social media."
  }
];
