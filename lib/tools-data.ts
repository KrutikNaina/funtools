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
    title: "Love & Vibe Compatibility",
    subtitle: "Discover your cosmic love score & relationship vibe analysis",
    description: "Calculate your instant romantic compatibility using name energy, Zodiac harmony, and fun personality vibe math. Share your custom love badge with friends!",
    category: "love",
    iconName: "HeartHandshake",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    useCount: "248.5K",
    gradient: "from-rose-500 to-pink-500",
    tags: ["love", "romance", "compatibility", "couples", "zodiac"],
    features: [
      "Instant percentage calculation with animated gauge",
      "Custom relationship vibe breakdown (Cosmic Soulmates, Spicy Chaos, Bestie Energy)",
      "Zodiac element synergy matrix",
      "One-click shareable aesthetic card download & copy link"
    ],
    faq: [
      {
        question: "How does the Love Compatibility Calculator work?",
        answer: "Our algorithm combines traditional name numerology, astrological element harmony, and playful character matrix algorithms to generate a unique compatibility score and vibe report."
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
    rating: 4.95,
    useCount: "512.1K",
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
    slug: "emoji-reaction-test",
    title: "Emoji Reaction Speed Test",
    subtitle: "Test your gaming reflexes in milliseconds!",
    description: "Click as fast as you can when the screen turns green! Measures your reaction time in milliseconds, compares it to average human benchmarks, and assigns you a fun gamer rank.",
    category: "gaming",
    iconName: "Zap",
    isPopular: true,
    isTrending: false,
    isFeatured: true,
    rating: 4.85,
    useCount: "189.3K",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["reflex test", "gaming speed", "reaction time", "mini game"],
    features: [
      "Millisecond precision timing mechanism",
      "High score tracking saved locally in your browser",
      "Gamer rank badges (Godlike Cyber Ninja, Pro Gamer, Chill Sloth)",
      "Visual chart comparing your speed against global averages"
    ],
    faq: [
      {
        question: "What is a good reaction speed?",
        answer: "The average human visual reaction time is around 250 milliseconds (ms). Top esports gamers often achieve 150-190ms!"
      }
    ]
  },
  {
    id: "decision-wheel",
    slug: "decision-wheel",
    title: "Ultimate Decision Wheel",
    subtitle: "Can't decide? Let the spinning wheel of destiny choose!",
    description: "Spin the colorful animated wheel or flip a 3D coin for food choices, movie picks, game choices, or truth or dare. Includes confetti celebrations and custom options!",
    category: "random",
    iconName: "CircleDot",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.92,
    useCount: "340.8K",
    gradient: "from-blue-500 to-indigo-600",
    tags: ["decision maker", "random spinner", "coin flip", "wheel of fortune"],
    features: [
      "Physics-based smooth spinning wheel animation",
      "Custom preset templates (What to Eat, Weekend Plan, Game Mode, Yes/No)",
      "Sound toggles and victory confetti explosion",
      "Full custom entry editor with instant save"
    ],
    faq: [
      {
        question: "Is the spinning wheel truly random?",
        answer: "Yes! The wheel uses cryptographic browser pseudo-random selection to ensure 100% fair and unbiased results."
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
    rating: 4.88,
    useCount: "95.4K",
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
    rating: 4.96,
    useCount: "410.2K",
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
    rating: 4.91,
    useCount: "132.6K",
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
    rating: 4.94,
    useCount: "215.7K",
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
    title: "Body Mass Index (BMI) Calculator",
    subtitle: "Calculate your exact Body Mass Index & WHO health range",
    description: "Calculate your adult Body Mass Index (BMI) instantly using metric or imperial measurements. Includes World Health Organization categories and healthy weight range analysis.",
    category: "productivity",
    iconName: "Zap",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.95,
    useCount: "175.4K",
    gradient: "from-teal-500 to-emerald-600",
    tags: ["bmi calculator", "health meter", "body mass index", "fitness math"],
    features: [
      "Metric (cm/kg) & Imperial (ft/lbs) toggle",
      "Instant real-time BMI classification gauge",
      "WHO weight category breakdown (Underweight, Normal, Overweight, Obese)",
      "Medical disclaimer & educational guidelines"
    ],
    faq: [
      {
        question: "How is Body Mass Index (BMI) calculated?",
        answer: "BMI is calculated by dividing weight in kilograms by height in meters squared (kg/m²)."
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
    rating: 4.93,
    useCount: "310.4K",
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
    rating: 4.97,
    useCount: "480.1K",
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
    rating: 4.91,
    useCount: "142.3K",
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
    description: "Find the precise difference between two calendar dates in years, months, weeks, days, hours, and total minutes.",
    category: "age",
    iconName: "Clock",
    isPopular: true,
    isTrending: false,
    isFeatured: true,
    rating: 4.94,
    useCount: "265.8K",
    gradient: "from-yellow-500 to-amber-600",
    tags: ["date difference", "days between dates", "time span calculator", "duration"],
    features: [
      "Breakdown in total days, weeks, months, and years",
      "Include or exclude end date toggle",
      "Leap year adjustment accuracy",
      "Real-time live comparison cards"
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
    title: "Ultimate Percentage Calculator",
    subtitle: "Solve percentage increase, decrease & fraction math instantly",
    description: "Multi-mode percentage calculator to solve % of a number, percentage change, markup/discount, and ratio percentages.",
    category: "finance",
    iconName: "Coins",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.96,
    useCount: "389.2K",
    gradient: "from-green-500 to-teal-600",
    tags: ["percentage calculator", "math calculator", "discount percent", "increase decrease"],
    features: [
      "3 main calculation modes (What is X% of Y, Percentage change, X is what % of Y)",
      "Instant real-time math results",
      "Discount & sales tax fast preset mode",
      "Step-by-step mathematical explanation"
    ],
    faq: [
      {
        question: "How do you calculate percentage increase?",
        answer: "Subtract original from new value, divide by original value, and multiply by 100."
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
    rating: 4.92,
    useCount: "298.6K",
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
    rating: 4.98,
    useCount: "620.5K",
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
    title: "Event & Goal Countdown Timer",
    subtitle: "Create live ticking countdown timers for any event",
    description: "Set custom countdown timers for birthdays, product launches, holidays, or personal goals with live visual progress wheels.",
    category: "productivity",
    iconName: "Clock",
    isPopular: false,
    isTrending: true,
    isFeatured: true,
    rating: 4.89,
    useCount: "118.9K",
    gradient: "from-purple-500 to-rose-500",
    tags: ["countdown timer", "event countdown", "timer online", "launch clock"],
    features: [
      "Days, Hours, Minutes, and Seconds live ticking clock",
      "Custom event title & background card themes",
      "Shareable countdown card link generation",
      "Confetti explosion on countdown completion"
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
    rating: 4.93,
    useCount: "235.4K",
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
    rating: 4.94,
    useCount: "340.2K",
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
    title: "Cosmic Death & Lifespan Calculator",
    subtitle: "Fun entertainment life clock & humor lifespan estimator",
    description: "Enter your daily habits (coffee, sleep, stress, humor) to calculate your estimated remaining days on Earth with funny longevity badges! (Entertainment Only)",
    category: "personality",
    iconName: "Smile",
    isPopular: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.91,
    useCount: "412.9K",
    gradient: "from-slate-700 via-purple-900 to-slate-900",
    tags: ["death calculator", "life expectancy", "fun quiz", "lifespan test"],
    features: [
      "Interactive habit sliders (Coffee intake, Sleep, Chaos level)",
      "Live ticking remaining lifespan clock visualization",
      "Funny longevity badges (Immortal Cactus, Cyber Zombie, Chill Sloth)",
      "Clear entertainment disclaimer & shareable result card"
    ],
    faq: [
      {
        question: "Is the Death Calculator scientifically accurate?",
        answer: "No! This tool is 100% created for fun, entertainment, and lighthearted humor."
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
    rating: 4.90,
    useCount: "128.4K",
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
    title: "10 Most Popular Aesthetic Fonts for Instagram & TikTok Bios in 2026",
    excerpt: "Level up your social media profile with aesthetic unicode fonts that grab attention, build personal branding, and boost engagement.",
    category: "Social Media Tips",
    readTime: "4 min read",
    date: "July 18, 2026",
    author: {
      name: "Alex Rivers",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Creative Director"
    },
    content: [
      "In 2026, social media profiles are modern digital business cards. Whether you're a content creator, indie hacker, or student, having an eye-catching bio makes an unforgettable first impression.",
      "Unicode font formatting lets you bypass boring default system fonts. From elegant cursive script styles to bold sub-text and glitch aesthetic fonts, you can customize your handle and bio with zero apps needed.",
      "Our Viral Fancy Font Generator allows you to preview over 20+ styles in real-time. Simply type your bio text, hit copy, and paste directly into Instagram, TikTok, Discord, or X!"
    ],
    relatedTools: ["fancy-font-generator", "ai-bio-generator"]
  },
  {
    slug: "how-small-daily-habits-build-huge-wealth",
    title: "The Coffee Math: How Small Daily Splurges Build Surprising Wealth",
    excerpt: "Learn how saving just $5 a day and letting compound interest work its magic can fund your dream vacation or purchase an electric vehicle.",
    category: "Fun Finance",
    readTime: "5 min read",
    date: "July 12, 2026",
    author: {
      name: "Sophia Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      role: "Finance Editor"
    },
    content: [
      "We've all heard the classic advice about skipping your morning latte. But what does the actual math look like over 5 to 20 years?",
      "When you invest $5 a day ($150/month) into an index fund returning an average 8% annually, that modest sum grows into over $11,000 in 5 years and over $88,000 in 20 years!",
      "Try our Coffee to Wealth Calculator to adjust your daily habit cost and visualize what your money could turn into over time!"
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
