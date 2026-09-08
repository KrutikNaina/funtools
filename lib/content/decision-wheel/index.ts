import { DomainToolModule } from "@/types/tool-content";

export const decisionWheelContent: DomainToolModule = {
  slug: "decision-wheel",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "decision wheel",
    secondary: [
      "free decision wheel",
      "random picker",
      "random picker wheel",
      "spin the wheel",
      "wheel spinner",
      "random name picker",
      "wheel of names",
      "random decision maker",
      "online decision wheel",
      "yes or no wheel",
      "giveaway wheel",
      "classroom random picker",
      "choice picker"
    ],
    longTail: [
      "free spinning decision wheel online",
      "random choice picker wheel for food and dinner choices",
      "spinning wheel for party games and classrooms",
      "random name picker for giveaways",
      "spin the wheel yes or no",
      "wheel of names random selector"
    ],
    lsi: ["random selection", "wheel of fortune", "random picker", "weighted entries", "decision maker"],
    semantic: ["picker wheel", "spin the wheel", "choice generator", "randomizer wheel", "name picker", "choice spinner"],
    questionKeywords: [
      "how does a decision wheel select a winner",
      "is the decision wheel random",
      "can i use this as a random name picker",
      "how do i spin the wheel"
    ],
    intentKeywords: ["spin decision wheel", "make random choice", "wheel of names", "random picker wheel"]
  },
  metadata: {
    metaTitle: "Decision Wheel – Free Random Picker & Spin the Wheel | GetFunTools",
    metaDescription:
      "Spin the wheel and make decisions instantly with this free random picker. Create custom wheels, pick random names, choose Yes/No, and share your wheel online.",
    slug: "decision-wheel",
    canonicalUrl: "https://www.getfuntools.app/tools/decision-wheel",
    robots: "index, follow",
    openGraph: {
      title: "Decision Wheel – Free Random Picker",
      description: "Spin the wheel, pick a random choice, and make decisions instantly.",
      url: "https://www.getfuntools.app/tools/decision-wheel",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Decision Wheel – Free Random Picker",
      description: "Spin the wheel, pick a random choice, and make decisions instantly."
    }
  },
  aiOverview: {
    oneSentence:
      "The GetFunTools Decision Wheel is a free, interactive random picker that helps you choose options, pick names, and make decisions by spinning a customizable wheel in your browser.",
    twoSentence:
      "Enter your choices, spin the wheel, and get an instant random result. Built for everyday choices, classroom activities, giveaways, and party games, it runs client-side with zero signup required.",
    summary50:
      "GetFunTools Decision Wheel is a free random picker and wheel spinner. Type or paste your options, choose a preset, or switch to Yes/No mode. It supports up to 500 entries, elimination mode, sound effects, and instant URL sharing.",
    summary100:
      "The GetFunTools Decision Wheel is a versatile, browser-based decision maker and random name picker. Enter custom options, paste lists directly from spreadsheets, or pick from popular presets like What to Eat, Classroom, and Party Games. With dedicated Yes/No modes, optional winner elimination, fullscreen support, and keyboard shortcuts (Ctrl+Enter), it provides a fast, unbiased way to resolve choices. Everything runs locally in your browser with no account needed.",
    summary200:
      "Designed for individuals, classrooms, teams, and streamers, the GetFunTools Decision Wheel transforms lists of choices into an interactive spinning wheel. Each active entry is allocated an equal slice of the wheel. When you spin, the browser's built-in pseudo-random number generator selects an outcome, and the wheel rotates to match that exact winning slice. Features include one-click preset lists, bulk entry pasting, an optional elimination mode that removes winners after each spin, spin history tracking, and shareable URLs that encode choices directly into the link. All operations occur client-side, keeping your lists private on your own device.",
    bulletSummary: [
      "Customizable wheel with up to 500 options or ready-made presets.",
      "Equal-probability slices powered by browser pseudo-random selection.",
      "Dedicated modes for Custom lists, Yes/No, and Yes/No/Maybe.",
      "Optional winner elimination mode for classrooms and giveaway raffles.",
      "Shareable URLs, spin history, fullscreen view, and keyboard shortcut support."
    ],
    tableSummary: [
      { label: "Selection Algorithm", value: "Browser Math.random() Equal Probability" },
      { label: "Entry Capacity", value: "Up to 500 choices" },
      { label: "Data Storage", value: "Client-side localStorage only (no server tracking)" },
      { label: "Input Methods", value: "Manual typing, bulk paste (lines/commas), presets" }
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools Decision Wheel"],
      rows: [
        ["Input Flexibility", "Type, bulk paste comma/lines, or 10 instant presets"],
        ["Winner Elimination", "Automatic removal after each spin or keep winner"],
        ["Accessibility", "Keyboard shortcuts (Ctrl+Enter) & reduced-motion support"],
        ["Cost & Privacy", "100% free with zero account or data collection"]
      ]
    }
  },
  snippets: {
    paragraph:
      "A decision wheel is an interactive random picker that divides choices into equal slices on a virtual wheel. When spun, it randomly selects one option, making it an entertaining tool for everyday decisions, classroom turn-taking, giveaways, and games.",
    list: [
      "Add your choices by typing one per line or selecting a preset.",
      "Click the center SPIN button or press Ctrl+Enter.",
      "Watch the wheel rotate and land on the randomly chosen slice.",
      "Copy the result, eliminate the winner, or spin again."
    ],
    numbered: [
      "Input Your Choices",
      "Click Spin to Rotate",
      "View the Random Winner",
      "Remove or Spin Again"
    ],
    table: {
      headers: ["Use Case", "Recommended Mode", "Best Setting"],
      rows: [
        ["Food & Dinner", "Custom / What to Eat Preset", "Keep Winner"],
        ["Classroom Student Turn", "Custom Name List", "Enable Elimination Mode"],
        ["Simple Dilemma", "Yes / No Mode", "Standard Spin"],
        ["Giveaway Raffle", "Custom Entries (Bulk Paste)", "Enable Elimination Mode"]
      ]
    }
  },
  howTo: [
    { name: "Add Your Choices", text: "Type your options one per line in the entries field, paste a list, or select a preset." },
    { name: "Spin the Wheel", text: "Click the SPIN button in the center of the wheel or press Ctrl+Enter on your keyboard." },
    { name: "See the Result", text: "The wheel slows to a stop on the selected slice, triggering sound and celebratory confetti." },
    { name: "Manage the Winner", text: "Copy the result, remove the winner for subsequent draws, or reset the wheel." }
  ],
  content: {
    heroHeadline: "Decision Wheel – Free Random Picker",
    heroSubheading:
      "Add your choices, spin the wheel, and get a random result instantly. Use it as a decision maker, random name picker, or wheel spinner for everyday choices, games, classrooms, giveaways, and more.",
    introduction:
      "Stuck on what to eat, who goes first, or what movie to watch? The GetFunTools Decision Wheel is a free, interactive random picker that turns any list into a colorful spinning wheel of destiny.",
    definition:
      "A decision wheel is a digital random choice picker that represents entries as proportional slices around a rotating wheel, stopping on an impartial winner when spun.",
    howItWorks: [
      "Equal Slice Division: Each active entry is allocated an equal slice of the 360-degree circle.",
      "Random Selection: When you click spin, the browser's standard pseudo-random number generator selects a winning slice index.",
      "Visual Synchronization: The rotation angle calculates the exact target degrees so the pointer accurately indicates the chosen winner.",
      "Post-Spin Options: You can copy the winner, remove it from the pool (elimination mode), or review spin history."
    ],
    examples: [
      { scenario: "Deciding what to eat for dinner", input: "Pizza, Tacos, Sushi, Burger, Ramen, Salad", output: "Winner: Tacos" },
      { scenario: "Selecting a classroom volunteer", input: "Emma, Liam, Noah, Olivia, Ethan", output: "Winner: Olivia" },
      { scenario: "Simple binary choice", input: "Yes, No", output: "Winner: Yes" }
    ],
    useCases: [
      { audience: "Friends & Families", description: "Settle dinner debates, choose movie genres, or pick board games without arguments." },
      { audience: "Teachers & Students", description: "Fairly call on students, assign presentation orders, or pick team captains." },
      { audience: "Content Creators & Streamers", description: "Conduct live giveaways, audience challenges, and interactive raffles." }
    ],
    benefits: [
      { title: "Instant & Free", description: "No download, no subscription, and no account required. Ready to spin instantly." },
      { title: "Bulk List Support", description: "Paste up to 500 items directly from spreadsheets or comma-separated lists." },
      { title: "Private Local Storage", description: "Your custom lists are preserved in your browser's local storage and never sent to a server." }
    ],
    features: [
      { title: "Preset Categories", description: "Includes 10 built-in presets: Food, Movies, Games, Classroom, Work, and more." },
      { title: "Elimination Mode", description: "Automatically removes the winning option after each spin for raffle draws." },
      { title: "Full Keyboard Support", description: "Press Ctrl+Enter or Cmd+Enter to spin quickly without touching your mouse." }
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools Decision Wheel", "Traditional Coin Flip", "Paper Drawing"],
      rows: [
        ["Number of Options", "2 to 500 Choices", "Only 2 Choices", "Unlimited (Manual)"],
        ["Setup Speed", "Instant / 10 Presets", "Instant", "Slow (Writing & Folding)"],
        ["Winner Elimination", "Automatic One-Click", "Not Applicable", "Manual Removal"],
        ["Shareability", "Instant Encoded URL Link", "None", "None"]
      ]
    },
    accuracyStatement:
      "The tool uses the browser's built-in pseudo-random number generator (Math.random()) to select an entry with equal probability (1 in N) across all active choices. It is designed for casual decision making and games.",
    limitations: [
      "Requires at least 2 active choices to spin.",
      "Limited to 500 entries per wheel to maintain smooth rendering and visual clarity."
    ],
    bestPractices: [
      "Keep option text short and concise so labels remain readable on the wheel segments.",
      "Use Elimination Mode when picking multiple unique winners in succession.",
      "Share your wheel using the Share button to collaborate with friends or coworkers."
    ],
    expertTips: [
      "Paste comma-separated items directly into the text box; the tool auto-converts them into line-by-line entries.",
      "Use Fullscreen mode during classroom presentations or live streams for an engaging visual display."
    ],
    disclaimer: {
      type: "general",
      text: "This decision wheel is intended for casual entertainment, games, and everyday choices. For legal sweepstakes or commercial contests, verify compliance with your jurisdiction's official promotion guidelines."
    }
  },
  faqs: [
    {
      question: "What is a decision wheel?",
      answer:
        "A decision wheel is an interactive random picker. You enter a list of choices, and the tool renders each as an equal segment on a wheel. Clicking spin rotates the wheel and lands on a random winner, helping you make everyday decisions quickly."
    },
    {
      question: "How does a random picker wheel work?",
      answer:
        "Each active choice is assigned an equal angle on the wheel. When you spin, the browser uses its built-in random number generator to pick a winner, then calculates the exact degree rotation so the visual pointer lands on that selection."
    },
    {
      question: "How do I spin the wheel?",
      answer:
        "Simply click the large 'SPIN' button in the center of the wheel, or press Ctrl+Enter (Cmd+Enter on Mac) on your keyboard."
    },
    {
      question: "Can I use this as a random name picker?",
      answer:
        "Yes. Type or paste student, team, or participant names into the entries box. Enable 'Remove winner after each spin' if you want each person selected only once."
    },
    {
      question: "What is a wheel of names?",
      answer:
        "A 'wheel of names' is a popular term for a random picker wheel loaded with people's names. It is commonly used by teachers to call on students, managers to pick speakers, and streamers for giveaway drawings."
    },
    {
      question: "Can I create a Yes or No wheel?",
      answer:
        "Yes. Click the 'Yes / No' or 'Yes / No / Maybe' tabs at the top of the tool to instantly switch to a pre-configured binary decision wheel."
    },
    {
      question: "Can I use the wheel for giveaways?",
      answer:
        "Yes, you can paste participant names and spin to draw a winner. For official sweepstakes with monetary stakes, ensure you adhere to your local legal contest regulations."
    },
    {
      question: "Can I use the decision wheel on my phone?",
      answer:
        "Yes. The wheel is fully responsive and optimized for mobile touchscreens, tablets, and desktop browsers with zero app installation needed."
    },
    {
      question: "Can I share my wheel?",
      answer:
        "Yes! Click the 'Share Wheel' button to copy a link that encodes your current list of choices. Anyone who opens the link will see your exact wheel configuration."
    },
    {
      question: "Is the decision wheel free?",
      answer:
        "Yes, the GetFunTools Decision Wheel is 100% free with unlimited spins, no paywalls, and no account registration required."
    },
    {
      question: "Can I add many choices?",
      answer:
        "You can add up to 500 choices on a single wheel. If you paste a larger list, the tool automatically uses the first 500 entries to ensure optimal wheel legibility."
    },
    {
      question: "Does the wheel save my choices?",
      answer:
        "Yes. Your entries, settings, and spin history are automatically saved in your browser's local storage so they remain available when you return to the page."
    }
  ],
  peopleAlsoAsk: [
    {
      question: "How to make a random picker wheel online?",
      answer:
        "Enter your list of options into the Decision Wheel entries box, or choose a preset list, then click Spin to get a random result."
    },
    {
      question: "What should I do if I can't decide what to eat?",
      answer:
        "Select the 'What to Eat' preset on the Decision Wheel and click spin to let randomness make the dinner choice for you."
    }
  ],
  eeat: {
    authorName: "GetFunTools Editorial Team",
    authorRole: "Interactive Web Utilities Specialists",
    authorBio: "GetFunTools builds lightweight, client-side productivity and casual gaming tools focused on privacy, speed, and usability.",
    authorAvatar: "/images/editorial-avatar.png",
    reviewerName: "GetFunTools Review Team",
    reviewerRole: "UX & Tool Quality Review",
    lastUpdated: "September 8, 2026",
    contentVersion: "v4.1.0",
    readTime: "4 min read"
  },
  relatedTools: [
    {
      title: "Random Number Generator",
      slug: "random-number-generator",
      category: "random",
      relationReason: "Generate random numbers, lottery picks, or dice rolls with customizable ranges."
    },
    {
      title: "Love Calculator by Name",
      slug: "love-calculator",
      category: "love",
      relationReason: "Test fun compatibility percentages and relationship vibes between two names."
    },
    {
      title: "Cosmic Age Clock",
      slug: "cosmic-age-clock",
      category: "age",
      relationReason: "Explore your precise age in heartbeats, planetary years, and cosmic milestones."
    },
    {
      title: "Coffee to Wealth Calculator",
      slug: "coffee-to-wealth",
      category: "finance",
      relationReason: "Calculate how daily coffee splurges compound into long-term savings over time."
    }
  ]
};

