import { DomainToolModule } from "@/types/tool-content";

export const loveCalculatorContent: DomainToolModule = {
  slug: "love-calculator",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Love Calculator",
    secondary: ["Love Calculator by Name", "Love Percentage Calculator", "Love Compatibility Test", "Love Meter", "Love Tester"],
    longTail: [
      "love calculator by name for couples",
      "fun love percentage calculator online",
      "test love compatibility with names",
      "relationship chemistry name tester",
      "love meter game for friends and crushes"
    ],
    lsi: ["name synergy", "relationship test", "couples game", "crush compatibility", "entertainment score"],
    semantic: ["flirt tester", "romance calculator", "friendship match", "fun compatibility meter"],
    questionKeywords: ["how does a love calculator work", "is the love calculator accurate", "how to check love percentage by name"],
    intentKeywords: ["calculate love percentage", "test relationship compatibility by name", "play love calculator game"]
  },
  metadata: {
    metaTitle: "Love Calculator by Name – Free Compatibility Test | GetFunTools",
    metaDescription: "Calculate a fun love compatibility percentage using two names. Try the free GetFunTools Love Calculator for couples, crushes, and friends with instant results.",
    slug: "love-calculator",
    canonicalUrl: "https://www.getfuntools.app/tools/love-calculator",
    robots: "index, follow",
    openGraph: {
      title: "Love Calculator by Name – Free Compatibility Test",
      description: "Calculate a fun love compatibility percentage using two names. Try the free GetFunTools Love Calculator for couples, crushes, and friends.",
      url: "https://www.getfuntools.app/tools/love-calculator",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Love Calculator by Name | GetFunTools",
      description: "Enter two names and get a fun compatibility percentage instantly."
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools Love Calculator is a fun entertainment app that generates a compatibility percentage based on two names.",
    twoSentence: "Enter two names to get a playful love compatibility percentage instantly. Choose from different relationship modes like Cosmic Soulmates or Bestie Chemistry for customized fun results.",
    summary50: "The GetFunTools Love Calculator is a free digital entertainment tool that calculates a fun compatibility score between two names. It features four relationship modes and delivers instant shareable results without requiring sign-ups.",
    summary100: "The GetFunTools Love Calculator is an interactive consumer application built for entertainment. By taking two names and a selected relationship mode (such as Spicy & Playful or Bestie Chemistry), it uses a simple text-based algorithm to generate a score between 65% and 100%. Operating entirely in your browser, it ensures privacy, requires no registration, and provides easy copying for sharing with friends or crushes.",
    summary200: "The GetFunTools Love Calculator offers a playful way to test name compatibility for couples, crushes, and friends. Designed with a clean interface and smooth animations, users simply enter two names and select one of four relationship modes: Cosmic Soulmates, Spicy & Playful, Bestie Chemistry, or Pure Chaotic Fun. The tool then converts the text input into a numerical score between 65% and 100%, displaying the result on an animated circular gauge. High-scoring matches trigger a confetti celebration. In addition to numerical scores, the calculator provides a brief, fun piece of relationship advice. All calculations occur locally in the user's browser, meaning names are never stored or sent to a server. It is a lightweight, private, and purely recreational tool.",
    bulletSummary: [
      "Generates a fun compatibility percentage from two names.",
      "Includes 4 relationship modes: Cosmic, Spicy, Bestie, Chaos.",
      "Displays an animated circular percentage gauge.",
      "Triggers confetti for high scores (over 75%).",
      "Designed strictly for entertainment and social sharing."
    ],
    tableSummary: [
      { label: "Format", value: "Name-based Compatibility Test" },
      { label: "Data Storage", value: "None (Client-Side Only)" },
      { label: "Cost", value: "100% Free" },
      { label: "Purpose", value: "Entertainment & Games" }
    ],
    comparisonSummary: {
      header: ["Relationship Mode", "Best Used For"],
      rows: [
        ["Cosmic Soulmates", "Romantic partners and deep connections"],
        ["Spicy & Playful", "Crushes and new dating phases"],
        ["Bestie Chemistry", "Platonic friends and roommates"],
        ["Pure Chaotic Fun", "Frenemies and casual acquaintances"]
      ]
    }
  },
  snippets: {
    paragraph: "A Love Calculator by Name is a digital entertainment tool that produces a relationship compatibility percentage based on a simple algorithm applied to the letters of two names.",
    list: [
      "Step 1: Enter the first person's name.",
      "Step 2: Enter the second person's name.",
      "Step 3: Choose a relationship vibe (Cosmic, Spicy, Bestie, Chaos).",
      "Step 4: Tap the calculate button to see your score.",
      "Step 5: Copy your result to share."
    ],
    numbered: [
      "Input First Name",
      "Input Second Name",
      "Select Relationship Mode",
      "View Score Gauge",
      "Share Result"
    ],
    table: {
      headers: ["Score Range", "Result Title", "Vibe Suggestion"],
      rows: [
        ["90% - 100%", "Legendary Match", "Frame the result and send coffee immediately."],
        ["80% - 89%", "Spicy High Synergy", "Great balance of fun banter and mutual trust."],
        ["65% - 79%", "Fun & Dynamic Duo", "Keep up the playful energy and spontaneous hangouts."]
      ]
    }
  },
  howTo: [
    { name: "Enter First Name", text: "Type the first name in the top input field." },
    { name: "Enter Second Name", text: "Type the second name in the bottom input field." },
    { name: "Choose Relationship Vibe", text: "Select from Cosmic, Spicy, Bestie, or Chaos modes." },
    { name: "Calculate", text: "Click the calculate button to run the name-matching algorithm." },
    { name: "Share Results", text: "Click 'Copy Result Card' to copy the text to your clipboard." }
  ],
  content: {
    heroHeadline: "Love Calculator by Name",
    heroSubheading: "Enter two names and get a fun compatibility percentage instantly. No signup required.",
    introduction: "Looking for a fun way to test name compatibility with your partner, crush, or best friend? The Love Calculator by Name is a quick entertainment tool that generates a playful relationship score in seconds.",
    definition: "Our Love Calculator is a web-based game that takes two names, combines them with a selected relationship mode, and processes the text to return a percentage score between 65% and 100%.",
    howItWorks: [
      "Text Processing: The algorithm combines both names and the selected mode into a single string.",
      "Character Scoring: It converts the letters into numerical values and sums them up.",
      "Percentage Output: The total is mathematically scaled to always produce a positive, fun score between 65% and 100%.",
      "Visual Display: The final percentage is shown on an animated ring."
    ],
    examples: [
      { scenario: "Testing romantic compatibility", input: "Alex + Taylor (Cosmic Soulmates)", output: "94% Match" },
      { scenario: "Testing friendship vibes", input: "Jordan + Casey (Bestie Chemistry)", output: "87% Match" }
    ],
    useCases: [
      { audience: "Couples", description: "A fun icebreaker for date nights and anniversaries." },
      { audience: "Crushes", description: "A lighthearted way to spark a conversation." },
      { audience: "Friends", description: "Test your platonic 'bestie' chemistry for a quick laugh." }
    ],
    benefits: [
      { title: "Instant Results", description: "Get your percentage immediately without waiting or watching ads." },
      { title: "100% Private", description: "Runs completely in your browser. Names are never saved to our servers." },
      { title: "No Negative Scores", description: "The algorithm is designed for fun and always returns a score of 65% or higher." }
    ],
    features: [
      { title: "4 Relationship Modes", description: "Toggle between Cosmic, Spicy, Bestie, and Chaos." },
      { title: "Confetti Effects", description: "Scores above 75% trigger a festive animation." },
      { title: "Easy Sharing", description: "One-click copy button formats your score for messaging apps." }
    ],
    comparisonTable: {
      headers: [],
      rows: []
    },
    accuracyStatement: "This Love Calculator is a game created strictly for entertainment purposes. It uses a mathematical text algorithm to generate scores and should not be treated as a scientific relationship assessment.",
    limitations: [
      "Scores are generated from name text inputs, not psychological or astrological data.",
      "Changing the order of the names or adding spaces may alter the final percentage slightly."
    ],
    bestPractices: [
      "Use first names or common nicknames for the best experience.",
      "Try the different relationship modes to see how your score changes.",
      "Remember that this is just a game designed for laughs and social sharing."
    ],
    expertTips: [
      "Share the results with your partner or friend as a fun conversation starter.",
      "Test your compatibility with fictional characters or celebrities."
    ],
    disclaimer: {
      type: "entertainment",
      text: "This Love Calculator by Name is an entertainment tool. The compatibility percentages are generated by a basic text algorithm and have no scientific basis. Do not base real-life relationship decisions on these results."
    }
  },
  faqs: [
    { question: "What is the Love Calculator by Name?", answer: "It is a free online entertainment tool that generates a fun compatibility percentage based on the letters in two names." },
    { question: "Why does the score start at 65%?", answer: "We intentionally map the game's result to a 65%–100% range to keep the experience playful and positive. This score is not a mathematical probability, is not scientifically validated, and does not predict real-life relationship success." },
    { question: "How does the Love Calculator work?", answer: "The tool combines the two names and your selected relationship mode into a text string, adds up the numerical values of the characters, and maps the result to a score between 65% and 100%." },
    { question: "Is the Love Calculator accurate?", answer: "No. The Love Calculator is a game designed purely for entertainment. It uses a text-based algorithm, not scientific, psychological, or astrological data. It should not be taken seriously." },
    { question: "Are my names stored or saved?", answer: "No. The calculator runs entirely within your web browser. We do not store, save, or transmit the names you enter." },
    { question: "Can I use the Love Calculator for friends?", answer: "Yes! You can select the 'Bestie Chemistry' or 'Pure Chaotic Fun' modes to test platonic friendships instead of romantic compatibility." },
    { question: "What happens if I enter the names in reverse order?", answer: "Because the algorithm processes the combined text string sequentially, reversing the order of the names might yield a slightly different percentage." },
    { question: "Is there a limit to how many times I can use it?", answer: "There are no limits. You can test as many name combinations as you like, completely free of charge." },
    { question: "How do I share my Love Calculator results?", answer: "After your score appears, simply click the 'Copy Result Card' button. This will copy a formatted text summary to your clipboard, ready to paste into a text message or social media post." }
  ],
  peopleAlsoAsk: [],
  eeat: {
    authorName: "Alex Rivers",
    authorRole: "App Developer & Designer",
    authorBio: "Alex builds interactive browser tools and games focused on privacy and user experience.",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    reviewerName: "GetFunTools Team",
    reviewerRole: "Editorial Review",
    lastUpdated: "August 9, 2026",
    contentVersion: "v4.0.0",
    readTime: "4 min read"
  },
  relatedTools: [
    { title: "Fancy Font Generator", slug: "fancy-font-generator", category: "social", relationReason: "Generate aesthetic fonts for your social media profiles." },
    { title: "Ultimate Decision Wheel", slug: "decision-wheel", category: "random", relationReason: "Can't decide on a date night activity? Spin the wheel!" },
    { title: "Cosmic Age Clock", slug: "cosmic-age-clock", category: "age", relationReason: "Find out exactly how many days you and your partner have been alive." }
  ]
};
