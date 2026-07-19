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
    question: "What is FunTools?",
    answer: "FunTools is a premium, lightweight platform of interactive micro-apps, fun calculators, personality quizzes, AI prompt tools, and utility games designed for entertainment and quick answers."
  },
  {
    question: "Are all tools on FunTools free?",
    answer: "Yes! Every single tool on FunTools is 100% free with unlimited usage, no registration required, and no hidden fees."
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
