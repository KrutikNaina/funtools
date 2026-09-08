import { ToolChain, ToolChainStep } from "./recommendation-types";

export const TOOL_CHAINS: ToolChain[] = [
  {
    id: "couple-fun",
    title: "Couple & Vibe Journey",
    category: "love",
    badge: "💖 Couple Fun",
    description: "Explore relationship harmony, spin the date wheel, and get fun nicknames.",
    gradient: "from-rose-500 via-pink-500 to-purple-600",
    steps: [
      {
        toolSlug: "love-calculator",
        title: "Love & Vibe Compatibility",
        teaser: "Calculate your cosmic harmony score",
      },
      {
        toolSlug: "decision-wheel",
        title: "Ultimate Decision Wheel",
        teaser: "Spin to pick your next date night or dinner",
      },
      {
        toolSlug: "tech-archetype-quiz",
        title: "Tech Archetype Quiz",
        teaser: "Compare your personality archetypes",
      },
      {
        toolSlug: "nickname-generator",
        title: "Cute Nickname Generator",
        teaser: "Find funny and adorable nicknames",
      },
    ],
  },
  {
    id: "social-profile",
    title: "Viral Social Bio & Profile Kit",
    category: "social",
    badge: "✨ Social Star",
    description: "Upgrade your Instagram, TikTok, and Discord identity in 4 easy steps.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-600",
    steps: [
      {
        toolSlug: "fancy-font-generator",
        title: "Viral Fancy Fonts",
        teaser: "Create aesthetic copy-paste fonts",
      },
      {
        toolSlug: "username-generator",
        title: "Cool Username Generator",
        teaser: "Generate unique handles for all platforms",
      },
      {
        toolSlug: "ai-bio-generator",
        title: "AI Bio Generator",
        teaser: "Generate catchy aesthetic profile bios",
      },
      {
        toolSlug: "nickname-generator",
        title: "Aesthetic Nicknames",
        teaser: "Pick custom gaming or social handles",
      },
    ],
  },
  {
    id: "gamer-reflexes",
    title: "Pro Gamer Reflexes & Identity",
    category: "gaming",
    badge: "⚡ Gamer Quest",
    description: "Test your latency reflexes, create your gamer tag, and spin destiny.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    steps: [
      {
        toolSlug: "reaction-time-test",
        title: "Reaction Speed Test",
        teaser: "Measure your millisecond esports reflexes",
      },
      {
        toolSlug: "username-generator",
        title: "Esports Gamer Tag Generator",
        teaser: "Craft an elite gaming alias",
      },
      {
        toolSlug: "tech-archetype-quiz",
        title: "Gamer Archetype Test",
        teaser: "Discover your playstyle personality",
      },
      {
        toolSlug: "random-number-generator",
        title: "Random Challenge Roller",
        teaser: "Roll numbers for in-game challenges",
      },
      {
        toolSlug: "decision-wheel",
        title: "Game Picker Wheel",
        teaser: "Spin to decide which game to play tonight",
      },
    ],
  },
  {
    id: "productivity-flow",
    title: "Micro-Productivity & Math Boost",
    category: "productivity",
    badge: "🚀 Productivity",
    description: "Calculate dates, track countdowns, and master percentages with ease.",
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    steps: [
      {
        toolSlug: "date-calculator",
        title: "Date Add / Subtract",
        teaser: "Calculate exact future and past deadlines",
      },
      {
        toolSlug: "countdown-timer",
        title: "Visual Countdown Timer",
        teaser: "Keep your focus sharp with a clean countdown",
      },
      {
        toolSlug: "percentage-calculator",
        title: "Instant Percentage Calc",
        teaser: "Calculate discounts, tips, and increases",
      },
      {
        toolSlug: "random-number-generator",
        title: "True Random Generator",
        teaser: "Pick fair random numbers for decisions",
      },
    ],
  },
  {
    id: "cosmic-age",
    title: "Cosmic Age & Time Warp",
    category: "age",
    badge: "🌌 Cosmic Time",
    description: "Discover your age on Mars, exact heartbeats, and birthday countdowns.",
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    steps: [
      {
        toolSlug: "cosmic-age-clock",
        title: "Cosmic Age Clock",
        teaser: "See your age across other planets & heartbeats",
      },
      {
        toolSlug: "date-difference-calculator",
        title: "Exact Date Difference",
        teaser: "Count days, weeks, and hours between dates",
      },
      {
        toolSlug: "countdown-timer",
        title: "Birthday Countdown",
        teaser: "Set a live countdown to your next milestone",
      },
    ],
  },
  {
    id: "luck-destiny",
    title: "Wheel of Fortune & Destiny",
    category: "random",
    badge: "🎲 Fortune",
    description: "Spin the wheel, find lucky numbers, and test compatibility.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    steps: [
      {
        toolSlug: "decision-wheel",
        title: "Decision Wheel",
        teaser: "Spin for instant choices",
      },
      {
        toolSlug: "lucky-number-generator",
        title: "Lucky Number Generator",
        teaser: "Generate lucky numbers for your day",
      },
      {
        toolSlug: "random-number-generator",
        title: "Random Number Picker",
        teaser: "Fair and transparent random numbers",
      },
      {
        toolSlug: "love-calculator",
        title: "Destiny Love Compatibility",
        teaser: "See if destiny agrees with your match",
      },
    ],
  },
];

export function getAllToolChains(): ToolChain[] {
  return TOOL_CHAINS;
}

export function getChainForTool(slug: string): ToolChain | undefined {
  return TOOL_CHAINS.find((chain) => chain.steps.some((step) => step.toolSlug === slug));
}

export function getNextInChain(chain: ToolChain, currentSlug: string): ToolChainStep | undefined {
  const currentIndex = chain.steps.findIndex((step) => step.toolSlug === currentSlug);
  if (currentIndex === -1 || currentIndex >= chain.steps.length - 1) {
    // If last or not found, wrap around to first step if different
    return chain.steps.find((s) => s.toolSlug !== currentSlug);
  }
  return chain.steps[currentIndex + 1];
}
