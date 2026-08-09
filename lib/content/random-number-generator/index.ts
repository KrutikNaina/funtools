import { DomainToolModule } from "@/types/tool-content";

export const randomNumberGeneratorContent: DomainToolModule = {
  slug: "random-number-generator",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Random Number Generator",
    secondary: [
      "Random Number Picker",
      "RNG Tool",
      "Lottery Number Picker",
      "Random Integer Generator",
      "Raffle Number Generator",
    ],
    longTail: [
      "free random number generator between min and max range",
      "non repeating random number picker for raffles",
      "generate multiple random numbers online",
      "random number generator 1 to 100",
      "random number picker no duplicates",
    ],
    lsi: [
      "pseudorandom number",
      "integer range",
      "raffle draw",
      "number picker",
      "duplicate filter",
    ],
    semantic: [
      "number randomizer",
      "RNG picker",
      "lottery number tool",
      "integer generator",
      "random picker",
    ],
    questionKeywords: [
      "how to generate random numbers",
      "how to pick raffle winners randomly",
      "how to generate numbers without repeats",
    ],
    intentKeywords: [
      "generate random number",
      "pick random number",
      "random number generator online",
    ],
  },
  metadata: {
    metaTitle: "Random Number Generator – Free Random Number Picker | GetFunTools",
    metaDescription:
      "Generate random numbers instantly with custom minimum and maximum ranges. Choose multiple numbers, allow or prevent repeats, copy results, and use random numbers for games, raffles, giveaways, and everyday decisions.",
    slug: "random-number-generator",
    canonicalUrl: "https://www.getfuntools.app/tools/random-number-generator",
    robots: "index, follow",
    openGraph: {
      title: "Random Number Generator – Free Random Number Picker",
      description:
        "Generate random numbers with custom ranges, multiple results, and optional duplicate numbers. Free and easy to use.",
      url: "https://www.getfuntools.app/tools/random-number-generator",
      type: "website",
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Random Number Generator – Free Random Number Picker",
      description:
        "Generate random numbers with custom ranges, multiple results, and optional duplicate numbers. Free and easy to use.",
    },
  },
  aiOverview: {
    oneSentence:
      "The GetFunTools Random Number Generator picks numbers from a user-defined range using a browser-based pseudorandom algorithm.",
    twoSentence:
      "The GetFunTools Random Number Generator produces one or more random numbers between custom minimum and maximum limits. It supports duplicate filtering, sort order, and one-click copying — useful for games, raffles, classroom draws, and everyday decisions.",
    summary50:
      "A free random number generator that picks numbers from any custom range. Supports multiple results, no-duplicate mode, sorting, and clipboard copy.",
    summary100:
      "The GetFunTools Random Number Generator lets you set a minimum and maximum, choose how many numbers to generate, and optionally prevent duplicates. Results display as individual chips that are easy to read and copy. No signup required.",
    summary200:
      "The GetFunTools Random Number Generator is a free browser tool for generating one or more random integers within any custom range. Users can set minimum and maximum values, choose a quantity, toggle duplicate prevention, and sort results in ascending or descending order. Quick range presets (1–10, 1–100, dice, cards, and more) let you get started instantly. Results appear as individual number chips and can be copied to the clipboard with one tap. The generator uses JavaScript's Math.random() — a pseudorandom algorithm — and is suitable for games, raffles, classroom activities, giveaways, and everyday decisions.",
    bulletSummary: [
      "Generates random integers within any custom min–max range.",
      "Supports unique (no-repeat) number generation.",
      "Displays results as individual number chips, not a single string.",
      "Quick range presets: 1–10, 1–100, dice, cards, and more.",
      "Copy to clipboard, clear, and generate again — all in one click.",
      "100% free with no signup or usage limits.",
    ],
    tableSummary: [
      { label: "Maximum Quantity", value: "Up to 10,000 numbers" },
      { label: "Duplicate Filter", value: "Toggleable on / off" },
      { label: "Random Source", value: "Browser Math.random() (pseudorandom)" },
      { label: "Cost", value: "Free" },
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools RNG", "Physical Dice / Slips"],
      rows: [
        ["Speed", "Instant (multiple numbers at once)", "Slow manual draw"],
        ["No-repeat mode", "One-click toggle", "Requires manual removal"],
        ["Quantity", "1 to 10,000 in one click", "Limited by physical items"],
      ],
    },
  },
  snippets: {
    paragraph:
      "A random number generator is a tool that picks numbers from a defined range using an algorithm that produces results without any obvious pattern. This browser-based tool uses JavaScript's Math.random() function, a pseudorandom source suitable for games, raffles, and everyday decisions.",
    list: [
      "Step 1: Enter your minimum (lowest) number.",
      "Step 2: Enter your maximum (highest) number.",
      "Step 3: Choose how many numbers to generate.",
      "Step 4: Click Generate Random Numbers and copy the results.",
    ],
    numbered: [
      "Set Min & Max range",
      "Choose quantity",
      "Toggle duplicates on or off",
      "Click Generate & copy",
    ],
    table: {
      headers: ["Use Case", "Range", "Repeats"],
      rows: [
        ["Single dice roll", "1 to 6", "Allowed"],
        ["Raffle winner draw", "1 to 500", "Off"],
        ["Pick a number 1–100", "1 to 100", "Allowed"],
      ],
    },
  },
  howTo: [
    { name: "Set minimum", text: "Enter the lowest number you want in the Minimum field." },
    { name: "Set maximum", text: "Enter the highest number you want in the Maximum field." },
    {
      name: "Choose quantity",
      text: "Enter how many numbers you want in the 'How many?' field. You can generate from 1 up to 10,000.",
    },
    {
      name: "Generate",
      text: "Click Generate Random Numbers. Results appear as individual chips and can be copied to your clipboard.",
    },
  ],
  content: {
    heroHeadline: "Random Number Generator",
    heroSubheading:
      "Generate random numbers instantly with a custom range, multiple results, and optional duplicate numbers. Free to use with no signup.",
    introduction:
      "Whether you need a single number for a quick decision or hundreds for a raffle draw, this free generator handles any range and quantity instantly in your browser.",
    definition:
      "A random number generator is a tool that picks values from a defined numeric range using an algorithm designed to produce results without any predictable sequence. This tool uses your browser's built-in pseudorandom function.",
    howItWorks: [
      "You set a minimum and maximum integer value.",
      "The generator uses Math.floor(Math.random() × (max − min + 1)) + min to produce each number.",
      "If duplicates are off, a partial Fisher-Yates shuffle ensures each number is unique.",
      "Results are displayed as individual chips — easy to read and copy.",
    ],
    examples: [
      {
        scenario: "Drawing 3 raffle winners from 200 entrants",
        input: "Min: 1, Max: 200, Quantity: 3, Duplicates: Off",
        output: "e.g. 47, 132, 199",
      },
      {
        scenario: "Rolling a dice 5 times",
        input: "Min: 1, Max: 6, Quantity: 5, Duplicates: Allowed",
        output: "e.g. 4, 2, 6, 1, 4",
      },
    ],
    useCases: [
      {
        audience: "Raffle & Giveaway Hosts",
        description: "Assign ticket numbers to entrants and draw unique winners with duplicates off.",
      },
      {
        audience: "Gamers & Dungeon Masters",
        description: "Roll custom dice ranges for RPG encounters, loot tables, and challenges.",
      },
      {
        audience: "Teachers & Educators",
        description: "Randomly call on students, assign topics, or divide groups fairly.",
      },
    ],
    benefits: [
      {
        title: "No-repeat mode",
        description: "Ensures every generated number is unique within the selected range.",
      },
      {
        title: "Batch generation",
        description: "Generate up to 10,000 numbers in a single click.",
      },
      {
        title: "Clear results display",
        description: "Each number appears as its own chip — not a single hard-to-read string.",
      },
    ],
    features: [
      {
        title: "Custom range",
        description: "Set any integer min and max, including negative numbers.",
      },
      {
        title: "Quick range presets",
        description: "One-click presets for 1–10, 1–100, dice, cards, and more.",
      },
      {
        title: "Sort options",
        description: "View results in original, ascending, or descending order.",
      },
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools RNG", "Basic Wheel Spinner"],
      rows: [
        ["Quantity", "1 to 10,000", "1 result at a time"],
        ["No-repeat mode", "Supported", "Not supported"],
        ["Negative numbers", "Supported", "Not typically supported"],
      ],
    },
    accuracyStatement:
      "Results use JavaScript's Math.random() pseudorandom function. Outputs are well-distributed across the selected range and unpredictable in practice, though not cryptographically secure.",
    limitations: [
      "Quantity cannot exceed the range size when duplicate prevention is enabled.",
      "Uses pseudorandom generation (Math.random()), not a hardware entropy source.",
    ],
    bestPractices: [
      "Use no-repeat mode when picking raffle winners to ensure fairness.",
      "Use the quick range presets for common scenarios like dice rolls or 1-to-100 picks.",
    ],
    expertTips: [
      "For large groups, generate numbers in batches and copy results to a spreadsheet.",
    ],
    disclaimer: {
      type: "general",
      text: "This tool uses browser-based pseudorandom generation (Math.random()). Results are not cryptographically secure and should not be used for security-sensitive applications.",
    },
  },
  faqs: [
    {
      question: "What is a random number generator?",
      answer:
        "A random number generator (RNG) is a tool or algorithm that produces numbers from a defined range without any predictable pattern. Software RNGs like this one use a pseudorandom algorithm — numbers are chosen in a way that appears random, though they are produced by a mathematical formula inside the browser.",
    },
    {
      question: "How do I generate a random number?",
      answer:
        "Enter a minimum and maximum value, choose how many numbers you want, then click Generate Random Numbers. Results appear as individual chips below the generator.",
    },
    {
      question: "Can I generate a random number between 1 and 100?",
      answer:
        "Yes. Set Minimum to 1, Maximum to 100, and Quantity to 1 (or more), then click Generate. You can also click the '1 – 100' quick range button to fill those values instantly.",
    },
    {
      question: "Can I generate multiple random numbers at once?",
      answer:
        "Yes. Set the 'How many?' field to any number between 1 and 10,000. All results are shown as individual chips.",
    },
    {
      question: "Can I generate numbers without duplicates?",
      answer:
        "Yes. Uncheck 'Allow duplicate numbers' and the generator produces only unique values. If you request more than the range allows, a validation message explains the maximum available.",
    },
    {
      question: "Can I generate negative random numbers?",
      answer:
        "Yes. Set Minimum to a negative integer such as -50 and Maximum to a positive integer such as 50. The generator handles negative ranges correctly.",
    },
    {
      question: "Can I generate zero?",
      answer:
        "Yes. Zero can appear in any range that includes it — for example, 0 to 99.",
    },
    {
      question: "What happens if I request more unique numbers than the range allows?",
      answer:
        "The generator shows a clear validation message. For example, if Min is 1, Max is 3, Quantity is 5, and duplicates are off, it will say 'You can generate a maximum of 3 unique numbers from this range.'",
    },
    {
      question: "Can I use this for raffles and giveaways?",
      answer:
        "Yes. Assign each entrant a number, set the range to match your entrant count, and turn off duplicates. For example: 200 entrants, 3 prizes → Min 1, Max 200, Quantity 3, Duplicates off.",
    },
    {
      question: "Is the random number generator free?",
      answer:
        "Yes. Completely free with no signup, no account, and no usage limits. Generate as many times as you like.",
    },
    {
      question: "Does the random number generator work on mobile?",
      answer:
        "Yes. The generator is fully responsive. Inputs stack on small screens, buttons are tap-friendly, and results wrap neatly with no horizontal scrolling.",
    },
    {
      question: "Are computer-generated random numbers truly random?",
      answer:
        "Not in the strict sense. This tool uses JavaScript's Math.random(), a pseudorandom number generator. Results appear unpredictable and are well-distributed, but they are produced by a deterministic algorithm. For games, raffles, and everyday decisions, this is more than sufficient.",
    },
  ],
  peopleAlsoAsk: [
    {
      question: "What does RNG stand for?",
      answer: "RNG stands for Random Number Generator.",
    },
    {
      question: "How do I pick a random number between 1 and 10?",
      answer:
        "Click the '1 – 10' quick range preset on the generator, set Quantity to 1, and click Generate.",
    },
  ],
  eeat: {
    authorName: "GetFunTools Team",
    authorRole: "Tool Developer",
    authorBio:
      "The GetFunTools team builds free, browser-based utility tools for games, decisions, and everyday use.",
    authorAvatar: "",
    reviewerName: "Editorial Team",
    reviewerRole: "Content Editor",
    lastUpdated: "August 2026",
    contentVersion: "v4.0.0",
    readTime: "4 min read",
  },
  relatedTools: [
    {
      title: "Decision Wheel",
      slug: "decision-wheel",
      category: "random",
      relationReason: "Spin a visual wheel to pick from a named list of options.",
    },
    {
      title: "Lucky Number Generator",
      slug: "lucky-number-generator",
      category: "random",
      relationReason: "Generate lucky numbers based on your name or horoscope.",
    },
    {
      title: "Password Generator",
      slug: "password-generator",
      category: "productivity",
      relationReason: "Generate strong random passwords and security keys.",
    },
    {
      title: "Percentage Calculator",
      slug: "percentage-calculator",
      category: "math",
      relationReason: "Calculate percentages, ratios, and proportions quickly.",
    },
    {
      title: "Date Calculator",
      slug: "date-calculator",
      category: "productivity",
      relationReason: "Add or subtract days from a date for deadline planning.",
    },
  ],
};
