import { DomainToolModule } from "@/types/tool-content";

export const decisionWheelContent: DomainToolModule = {
  slug: "decision-wheel",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Decision Wheel",
    secondary: ["Wheel of Names", "Random Picker Wheel", "Spinning Wheel", "What to Eat Spinner", "Random Name Picker", "Giveaway Wheel"],
    longTail: [
      "free spinning decision wheel online",
      "random choice picker wheel for food and dinner choices",
      "spinning wheel for party games and classrooms",
      "random name picker for giveaways"
    ],
    lsi: ["random selection", "wheel of fortune", "random picker", "weighted entries"],
    semantic: ["picker wheel", "spin the wheel", "choice generator", "randomizer wheel", "name picker"],
    questionKeywords: ["how does a decision wheel select a winner", "can I customize wheel choices"],
    intentKeywords: ["spin decision wheel", "make random choice", "wheel of names"]
  },
  metadata: {
    metaTitle: "Ultimate Decision Wheel – Free Random Picker | GetFunTools",
    metaDescription: "Use our free decision wheel to randomly pick a name, choice, task, winner, meal, movie, or game. Add your options, spin the wheel, and get an instant result.",
    slug: "decision-wheel",
    canonicalUrl: "https://www.getfuntools.app/tools/decision-wheel",
    robots: "index, follow",
    openGraph: {
      title: "Ultimate Decision Wheel – Free Random Picker | GetFunTools",
      description: "Add your choices, spin the wheel, and let a random pick make the decision for you.",
      url: "https://www.getfuntools.app/tools/decision-wheel",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Ultimate Decision Wheel – Free Random Picker",
      description: "Add your choices, spin the wheel, and let a random pick make the decision for you."
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools Decision Wheel is a free browser-based spinner that randomly selects one option from a list you enter.",
    twoSentence: "The GetFunTools Decision Wheel lets you type or paste a list of choices, then spin an animated wheel to randomly select one. It runs entirely in your browser, with no account or download required.",
    summary50: "The GetFunTools Decision Wheel is a free random picker. Type or paste your choices, spin the wheel, and it randomly selects one option. It includes preset lists, a Yes/No mode, an option to remove the winner after each spin, and works entirely in your browser.",
    summary100: "The GetFunTools Decision Wheel is a free, browser-based random picker for everyday decisions like what to eat, what to watch, or who goes first. Enter choices one per line (or paste a comma-separated list), and the wheel randomly selects one when spun. It includes ready-made preset lists, a Yes/No and Yes/No/Maybe mode, an optional elimination mode that removes the winner after each spin, spin history, and a shareable link that encodes your list into the URL. No account, download, or payment is required, and your list stays in your browser.",
    summary200: "The GetFunTools Decision Wheel helps individuals and groups make quick, random decisions. Users type or paste a list of options, one per line, and the tool renders each as a slice of a spinning wheel sized to reflect the number of entries. When spun, the tool first determines the winning slice using the browser's built-in random number generator, then animates the wheel to land on that result — so the visual outcome always matches the selected winner. Ready-made preset lists (What to Eat, What to Watch, Classroom, Party Games, and others) can populate the wheel instantly, and a Yes/No or Yes/No/Maybe mode is available for simpler decisions. An optional elimination mode automatically removes the winning entry after each spin, which is useful for classroom selection or giveaways. The tool keeps a session history of recent results, supports keyboard shortcuts, respects reduced-motion accessibility settings, and can save your list locally in the browser so it's there next time you visit. Everything runs client-side — no list or result is sent to a server.",
    bulletSummary: [
      "Enter choices by typing one per line, pasting a list, or using a ready-made preset.",
      "Randomly selects one option using the browser's standard random number generator.",
      "Includes a Yes/No and Yes/No/Maybe mode for simpler decisions.",
      "Optional 'remove winner after each spin' mode for elimination-style picking.",
      "Runs entirely in your browser — no account, download, or server storage required."
    ],
    tableSummary: [
      { label: "Selection method", value: "Browser random number generator" },
      { label: "Entry limit", value: "Up to 500 entries" },
      { label: "Bulk paste", value: "Supported (one per line or comma-separated)" },
      { label: "Data storage", value: "Local browser storage only" }
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools Decision Wheel"],
      rows: [
        ["Input method", "Type, paste, or choose a preset list"],
        ["Modes", "Custom wheel, Yes/No, Yes/No/Maybe"],
        ["Elimination mode", "Optional — removes the winner after each spin"],
        ["Cost", "Free, no account required"]
      ]
    }
  },
  snippets: {
    paragraph: "A decision wheel is an interactive random picker that represents your choices as segments around a wheel and selects one option when spun.",
    list: [
      "Enter your choices, one per line, or choose a preset list.",
      "Click the SPIN button in the center of the wheel.",
      "Watch the wheel spin and land on a result.",
      "Copy the result, remove the winner, or spin again."
    ],
    numbered: [
      "Enter your choices.",
      "Spin the wheel.",
      "See the result.",
      "Remove the winner or spin again."
    ],
    table: {
      headers: ["Use Case", "Suggested Setup"],
      rows: [
        ["Dinner decision", "Use the 'What to Eat' preset or type your own options"],
        ["Classroom selection", "Enter student names and enable 'remove winner after each spin'"],
        ["Party games", "Use the 'Party Games' preset"]
      ]
    }
  },
  howTo: [
    { name: "Enter Choices", text: "Type your options into the entries box, one per line, or paste a list." },
    { name: "Spin the Wheel", text: "Click the central SPIN button, or press Ctrl+Enter." },
    { name: "See the Result", text: "The wheel lands on a winner, shown below the wheel." },
    { name: "Manage the Winner", text: "Copy the result, remove it from the list, or spin again." }
  ],
  content: {
    heroHeadline: "Ultimate Decision Wheel – Free Random Picker",
    heroSubheading: "Can't decide? Add your choices, spin the wheel, and let a random pick make the decision for you.",
    introduction: "Whether you're deciding what to eat, picking a name from a list, or choosing who goes first, the Decision Wheel gives you a fast, visual way to let randomness make the call.",
    definition: "A decision wheel is an interactive random picker that represents choices as segments around a wheel and selects one option when spun.",
    howItWorks: [
      "Slice allocation: each active entry becomes an equal-sized slice of the wheel.",
      "Random selection: the browser's random number generator picks the winning slice.",
      "Rotation: the wheel animates to land exactly on the selected slice, so the visual result always matches the outcome.",
      "Result: the winning option is shown below the wheel, with options to copy it, remove it, or spin again."
    ],
    examples: [
      { scenario: "Deciding what to eat for dinner", input: "Pizza, Tacos, Sushi, Burger, Ramen", output: "Winner: Tacos" },
      { scenario: "Picking a classroom student", input: "John, Sarah, Mike, Emma, Chris", output: "Winner: Sarah" },
      { scenario: "Picking a weekend activity", input: "Gaming, Movie, Hike, Book", output: "Winner: Movie" }
    ],
    useCases: [
      { audience: "Couples & Friends", description: "Quickly decide where to eat, what movie to watch, or who does chores." },
      { audience: "Teachers & Presenters", description: "Randomly pick students or team members for presentations, using elimination mode for fair rotation." },
      { audience: "Party Hosts & Streamers", description: "Select names for games, tasks, or giveaway drawings." }
    ],
    benefits: [
      { title: "Fast entry", description: "Paste a whole list at once instead of typing one item at a time." },
      { title: "Equal-probability slices", description: "Every active entry gets an equal-sized slice, so each has the same chance of being selected." },
      { title: "No signup", description: "Works immediately in your browser, with your list saved locally so it's there next time." }
    ],
    features: [
      { title: "Preset choice lists", description: "Instant access to ready-made lists like What to Eat, What to Watch, and Classroom." },
      { title: "Yes/No and Yes/No/Maybe modes", description: "A quicker option for simple binary or three-way decisions." },
      { title: "Elimination mode", description: "Automatically remove the winner after each spin — useful for classrooms and giveaways." }
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools Decision Wheel"],
      rows: [
        ["Spin animation", "Smooth CSS transition, wheel always lands on the actual result"],
        ["Input method", "Type, bulk paste, or preset lists"],
        ["Entry limit", "Up to 500 entries"]
      ]
    },
    accuracyStatement: "Each wheel slice is sized equally, so with N active entries and no elimination applied mid-session, every entry has an equal 1-in-N chance of being selected on a given spin.",
    limitations: [
      "Requires at least 2 choices to spin.",
      "Only the first 500 entries are used if you paste a longer list, to keep the wheel readable and responsive."
    ],
    bestPractices: [
      "Keep option names short so they're easy to read on the wheel.",
      "Turn on 'remove winner after each spin' for elimination-style picking, like classroom turns or giveaways.",
      "Use a preset list to get started quickly, then edit it to fit your situation."
    ],
    expertTips: [
      "Paste a column copied from a spreadsheet directly into the entries box — it's split into one entry per line automatically.",
      "Use the Share button to send a link that pre-loads your list for someone else.",
      "Your list is saved in your browser automatically, so you can close the tab and come back later."
    ],
    disclaimer: {
      type: "general",
      text: "This tool is designed for everyday decisions, games, and casual giveaways. For contests with legal or monetary stakes, check your local rules on how winners must be selected and verified."
    }
  },
  faqs: [
    { question: "What is a decision wheel?", answer: "A decision wheel is an interactive random picker. You enter a list of choices, and the tool represents each one as a slice of a wheel. Spinning the wheel randomly selects one option, which is useful for quick decisions like what to eat or who goes first." },
    { question: "How does the random wheel work?", answer: "Each active entry becomes an equal-sized slice of the wheel. When you spin, the tool uses the browser's standard random number generator to pick a winning slice, then animates the wheel so it visually lands on that same result." },
    { question: "Can I add my own choices?", answer: "Yes. Type your choices into the entries box, one per line, or paste a list (line-separated or comma-separated) and it will be split into individual entries automatically." },
    { question: "How many choices can I add?", answer: "You can add up to 500 entries. If you paste a longer list, only the first 500 are used so the wheel stays readable and responsive." },
    { question: "Can I remove the winner after each spin?", answer: "Yes. Turn on 'Remove winner after each spin' and the tool will automatically take the winning entry out of the list, which is handy for classroom selection, giveaways, or task assignment." },
    { question: "Can I use the wheel for giveaways?", answer: "Yes, you can paste a list of names and spin to select a winner. If your giveaway has legal requirements, double-check your local rules for how winners need to be selected and documented." },
    { question: "Can I use it on my phone?", answer: "Yes, the wheel is designed to work on phones, tablets, and desktops, with touch-friendly controls." },
    { question: "Can I save my wheel?", answer: "Your entries and settings are saved automatically in your browser's local storage, so they'll still be there the next time you visit — unless you clear your browser data or use a different device." },
    { question: "Can I share my wheel?", answer: "Yes. Use the Share button to copy a link that encodes your current list of entries, so anyone who opens it sees the same wheel." },
    { question: "Is the decision wheel free?", answer: "Yes, the Decision Wheel is completely free to use, with no account or download required." }
  ],
  peopleAlsoAsk: [
    { question: "How to make a random picker wheel online?", answer: "Enter your list of options into the Decision Wheel's entries box, or choose a preset, then click Spin to get a random result." },
    { question: "What should I do if I can't decide what to eat?", answer: "Use the 'What to Eat' preset, or type in your own list of food options, and spin the wheel to let it pick for you." }
  ],
  eeat: {
    authorName: "GetFunTools Team",
    authorRole: "Product & Engineering",
    authorBio: "The GetFunTools team builds and maintains the site's free browser-based tools.",
    authorAvatar: "",
    reviewerName: "GetFunTools Team",
    reviewerRole: "Product & Engineering",
    lastUpdated: "August 9, 2026",
    contentVersion: "v4.0.0",
    readTime: "4 min read"
  },
  relatedTools: [
    { title: "Random Number Generator", slug: "random-number-generator", category: "random", relationReason: "Need a pure numerical decision? Generate random numbers instead of picking from text options." },
    { title: "Fancy Font Generator", slug: "fancy-font-generator", category: "social", relationReason: "Style the text before you add it to your wheel." },
    { title: "Reaction Time Test", slug: "reaction-time-test", category: "gaming", relationReason: "Test your reflexes after the wheel makes its pick." }
  ]
};
