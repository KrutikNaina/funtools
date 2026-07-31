import { DomainToolModule } from "@/types/tool-content";

export const aiBioGeneratorContent: DomainToolModule = {
  slug: "ai-bio-generator",
  schemaType: "CreativeWork",
  keywords: {
    primary: "AI Bio Generator",
    secondary: ["Social Media Bio Generator", "Instagram Bio Creator", "Twitter X Bio Generator", "TikTok Bio Maker", "LinkedIn Headline Generator"],
    longTail: [
      "free ai bio generator for instagram and twitter online",
      "sarcastic gen z bio generator with roast score",
      "tech founder twitter bio generator with clout rating",
      "how to write catchy social media bios using ai",
      "aesthetic short bio ideas copy and paste"
    ],
    lsi: ["persona copy", "social branding", "clout rating", "profile description", "headline formatting"],
    semantic: ["bio creator", "social headline writer", "profile generator", "viral bio ideas", "roast bio maker"],
    questionKeywords: ["how to write a good instagram bio", "what is clout rating in bio generator", "can I use ai bios on linkedin"],
    intentKeywords: ["generate ai bio", "create twitter bio", "get Instagram bio ideas"]
  },
  metadata: {
    metaTitle: "AI Bio & Roast Generator - Create Viral Social Media Bios Instantly",
    metaDescription: "Generate punchy, hilarious, or professional social media bios for Instagram, X, TikTok, and LinkedIn. Pick your vibe (Gen-Z Roast, Tech Founder, Aesthetic Chic, Executive) and get instant clout ratings.",
    slug: "ai-bio-generator",
    canonicalUrl: "https://getfuntools.app/tools/ai-bio-generator",
    robots: "index, follow",
    openGraph: {
      title: "AI Bio & Roast Generator | Viral Profile Copy Tool",
      description: "Create viral, hilariously accurate social bios with clout ratings & 1-click copy.",
      url: "https://getfuntools.app/tools/ai-bio-generator",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "AI Bio & Roast Generator | GetFunTools",
      description: "Generate punchy bios for Instagram, Twitter X, and LinkedIn in seconds."
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools AI Bio & Roast Generator creates customized social media bios across 4 distinct persona styles with clout ratings.",
    twoSentence: "The GetFunTools AI Bio & Roast Generator generates short, punchy bios tailored for Instagram, X (Twitter), TikTok, and LinkedIn. Users select persona vibes—Sarcastic Gen-Z, Tech Visionary, Aesthetic Chic, or Executive Boss—and receive copyable bio formatted text alongside a clout rating.",
    summary50: "The GetFunTools AI Bio & Roast Generator is a free social media copy tool that crafts viral bios and profile headlines. Featuring 4 persona styles (Gen-Z Roast, Tech Visionary, Aesthetic Chic, Executive) and clout score evaluations, it delivers formatted text ready to copy with one click.",
    summary100: "The GetFunTools AI Bio & Roast Generator assists creators, professionals, and students in crafting memorable digital profiles. By selecting a target persona style and adding optional specialty keywords, the tool generates short-form social media bios optimized for platform character limits. It evaluates profile clout with an instant score (85-99/100) and provides 1-click clipboard copy functionality.",
    summary200: "The GetFunTools AI Bio & Roast Generator provides an intuitive content solution for personal branding. Designed with sleek glassmorphism and real-time generation logic, the tool features four specialized vibe presets: Sarcastic Gen-Z (dry humor & pop culture), Tech Visionary (disruptor & builder energy), Aesthetic Chic (minimalist & golden hour vibes), and Executive Boss (high-growth leadership & scaling). Users can input custom roles or specialty keywords to personalize the generated text. In addition to formatted bio copy with emojis, the tool measures profile impact using an automated Clout Rating index (85-99/100). All text formats fit standard social media bio length constraints and copy directly to device clipboards.",
    bulletSummary: [
      "Generates short, punchy bios for Instagram, X, TikTok, and LinkedIn.",
      "Offers 4 persona modes: Sarcastic Gen-Z, Tech Visionary, Aesthetic Chic, Executive.",
      "Includes optional custom role & specialty keyword inputs.",
      "Calculates an automated profile Clout Rating score (85-99/100).",
      "Provides 1-click copy buttons formatted with emojis and line breaks."
    ],
    tableSummary: [
      { label: "Persona Styles", value: "Gen-Z Roast, Tech, Aesthetic, Executive" },
      { label: "Target Platforms", value: "Instagram, X, TikTok, LinkedIn, Discord" },
      { label: "Generation Speed", value: "Under 600 milliseconds" },
      { label: "Cost", value: "100% Free with unlimited bio generations" }
    ],
    comparisonSummary: {
      header: ["Persona Style", "Tone & Vibe", "Best Platform Use"],
      rows: [
        ["Sarcastic Gen-Z", "Dry humor, caffeine & chaos", "TikTok, Instagram & Discord"],
        ["Tech Visionary", "Building, disruption & code", "Twitter/X & GitHub"],
        ["Aesthetic Chic", "Minimalist, quiet luxury & coffee", "Instagram & Pinterest"],
        ["Executive Boss", "Leadership, scaling & investment", "LinkedIn & Personal Websites"]
      ]
    }
  },
  snippets: {
    paragraph: "An AI Bio Generator is a creative text synthesis tool that produces short, platform-formatted social media bios and profile descriptions based on selected persona styles and user specialty keywords.",
    list: [
      "Step 1: Select your preferred persona style (Gen-Z Roast, Tech, Aesthetic, Executive).",
      "Step 2: Enter an optional specialty keyword or job role (e.g. Designer, Founder, Student).",
      "Step 3: Click 'Generate AI Bio' to synthesize custom profile copy.",
      "Step 4: Review your bio, check your Clout Rating score, and click 'Copy Bio Text'."
    ],
    numbered: [
      "Select Persona Style",
      "Input Specialty Keyword",
      "Click Generate AI Bio",
      "Copy Bio to Clipboard"
    ],
    table: {
      headers: ["Persona Vibe", "Sample Generated Bio", "Target Audience"],
      rows: [
        ["Sarcastic Gen-Z", "Professional overthinker & caffeine enthusiast. ☕ Here for a good time.", "Gen-Z Creators & Students"],
        ["Tech Visionary", "Building the future at 3 AM. 🚀 AI, Web3 & minimalist code.", "Developers & Tech Founders"],
        ["Aesthetic Chic", "chasing golden hour light ✨ design, espresso & slow living 🌿", "Designers & Lifestyle Creators"]
      ]
    }
  },
  howTo: [
    { name: "Pick Style", text: "Select a persona mode like Gen-Z or Tech Visionary." },
    { name: "Add Keyword", text: "Type your role (e.g. Creator or Developer)." },
    { name: "Generate", text: "Tap the gradient Generate button." },
    { name: "Copy", text: "Click Copy Bio Text to paste into your social profile." }
  ],
  content: {
    heroHeadline: "Generate Viral Social Media Bios in Seconds",
    heroSubheading: "Craft hilarious, witty, or high-impact bios for Instagram, X (Twitter), TikTok & LinkedIn.",
    introduction: "Staring at a blank bio box is frustrating. Whether you need a witty Twitter profile, an aesthetic Instagram handle summary, or a punchy LinkedIn headline, the AI Bio Generator delivers instant viral bio copy.",
    definition: "An AI Bio Generator is an automated text generation micro-app that crafts platform-optimized profile copy, headlines, and witty self-descriptions using persona template algorithms.",
    howItWorks: [
      "Persona Selection: Selects curated syntactic structures tailored for specific social subcultures.",
      "Keyword Injection: Integrates user job titles or specialty tags into the output string.",
      "Clout Indexing: Calculates an automated clout impact rating based on punchiness and formatting.",
      "Clipboard Formatting: Pre-formats line breaks and emojis for 1-click copying."
    ],
    examples: [
      { scenario: "Generating a sarcastic bio for TikTok", input: "Gen-Z Roast + 'Gamer'", output: "Making mistakes at 120fps. 💫 99% dry humor, 1% iced matcha. | Gamer" },
      { scenario: "Creating a tech founder Twitter bio", input: "Tech Visionary + 'Indie Hacker'", output: "Turning coffee into shipping features. ☕ Ex-sleep enthusiast, current indie builder. | Indie Hacker" },
      { scenario: "Formatting an aesthetic Instagram bio", input: "Aesthetic Chic + 'Photographer'", output: "curator of vibes. 💫 coffee in one hand, camera in the other. | Photographer" }
    ],
    useCases: [
      { audience: "Social Media Creators", description: "Refresh your Instagram or TikTok profile with witty, modern bios." },
      { audience: "Developers & Founders", description: "Craft concise Twitter/X handles that highlight your projects and stack." },
      { audience: "Job Seekers & Executives", description: "Generate polished LinkedIn headline summaries that communicate leadership." }
    ],
    benefits: [
      { title: "Instant Bio Ideas", description: "Overcomes writer's block with endless fresh text variations." },
      { title: "Platform Character Ready", description: "Fits standard 150-160 character social bio limits." },
      { title: "Clout Rating Feedback", description: "Gives immediate score feedback on profile impact." }
    ],
    features: [
      { title: "4 Persona Modes", description: "Gen-Z Roast, Tech Visionary, Aesthetic Chic, and Executive Boss." },
      { title: "Keyword Customization", description: "Injects your specific job title or skill tag." },
      { title: "1-Click Clipboard Copy", description: "Copies ready-to-paste text with proper emojis." }
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools AI Bio Generator", "Basic Text Generators"],
      rows: [
        ["Persona Diversity", "4 Curated Culture Styles", "Single generic output"],
        ["Clout Rating", "Automated Profile Clout Index", "None"],
        ["Emoji Formatting", "Pre-spaced aesthetic emojis", "Plain text only"],
        ["Cost", "100% Free with unlimited generates", "Subscription paywall"]
      ]
    },
    accuracyStatement: "Bios are pre-formatted to satisfy platform character limits across Instagram (150 chars), X (160 chars), and TikTok (80 chars).",
    limitations: [
      "Generated text is optimized for short social bios rather than long-form resumes.",
      "Custom keywords work best when kept to 1-3 words."
    ],
    bestPractices: [
      "Pair a funny or witty first line with a clear call-to-action or link in your profile.",
      "Use the 'Aesthetic Chic' mode for lifestyle and visual creator profiles.",
      "Re-generate multiple times to explore different humor styles!"
    ],
    expertTips: [
      "Combine your generated bio with a fancy font header using our Fancy Font Generator!",
      "Update your Twitter/X bio seasonally to reflect current projects and product launches.",
      "Keep LinkedIn bios punchy—state what you build and who you help in the first 10 words."
    ],
    disclaimer: {
      type: "general",
      text: "Generated bios are for entertainment and creative profile styling purposes."
    }
  },
  faqs: [
    { question: "What is an AI Bio Generator?", answer: "An AI Bio Generator is a web application that automatically generates short, viral social media bios and profile descriptions." },
    { question: "How does the AI Bio Generator work?", answer: "Choose a persona style (Gen-Z, Tech, Aesthetic, Executive), type an optional role keyword, and tap Generate to receive custom bio copy." },
    { question: "Is the AI Bio Generator free?", answer: "Yes, 100% free with unlimited bio generations and zero account registration." },
    { question: "Will these bios work on Instagram, Twitter, and TikTok?", answer: "Yes! All generated bios are pre-formatted to fit standard social media profile character limits." },
    { question: "What is the Clout Rating score?", answer: "The Clout Rating (85-99/100) evaluates your bio's punchiness, emoji balance, and social impact." },
    { question: "Can I customize the generated bio?", answer: "Yes! Add your specific job title or skill keyword to personalize the output text." },
    { question: "Is my text saved or logged?", answer: "No. All text processing runs locally in your browser. We never log or store your bio inputs." },
    { question: "Can I use these bios for LinkedIn?", answer: "Yes! Select the 'Executive Boss' persona style for professional LinkedIn headlines and summaries." },
    { question: "How many bio styles are available?", answer: "4 distinct styles: Sarcastic Gen-Z, Tech Visionary, Aesthetic Chic, and Executive Boss." },
    { question: "Does the tool support mobile phones?", answer: "Yes, GetFunTools is fully mobile-optimized for iOS and Android web browsers." },
    { question: "Do I need to sign up for an account?", answer: "No account or registration is required." },
    { question: "Can I copy the bio with 1-click?", answer: "Yes, tap the 'Copy Bio Text' button to copy the bio formatted with emojis to your clipboard." },
    { question: "What are common mistakes when writing social bios?", answer: "Writing overly long paragraphs, omitting emojis, or failing to state what you do." },
    { question: "What is the best bio style for Instagram?", answer: "The 'Aesthetic Chic' and 'Sarcastic Gen-Z' modes are most popular for Instagram profiles." },
    { question: "How to troubleshoot if the copy button doesn't work?", answer: "Ensure browser clipboard permissions are enabled, or highlight the bio text manually." },
    { question: "Can I style generated bios with fancy fonts?", answer: "Yes! Copy your generated bio and paste it into our Fancy Font Generator for extra flair." },
    { question: "Does the generator support emojis?", answer: "Yes, bios are automatically formatted with contextual emojis." },
    { question: "How often can I re-generate new bios?", answer: "You can re-generate as many times as you like until you find the perfect profile copy!" }
  ],
  peopleAlsoAsk: [
    { question: "How to write a good Instagram bio in 2026?", answer: "Keep it under 150 characters, use a clear main title, add 1-2 clean emojis, and include a call to action link." },
    { question: "What should I put in my Twitter X bio?", answer: "State what you build, your primary interest or stack, and a witty one-liner." },
    { question: "What is a good sarcastic bio for TikTok?", answer: "Witty one-liners like 'Professional overthinker' or 'Making mistakes at 120fps' perform best on TikTok." }
  ],
  eeat: {
    authorName: "Alex Rivers",
    authorRole: "Creative Director & UX Architect",
    authorBio: "Alex specializes in social copy formatting, viral branding, and profile design.",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    reviewerName: "Sophia Patel",
    reviewerRole: "Social Media Strategist",
    lastUpdated: "July 19, 2026",
    contentVersion: "v2.9.0",
    readTime: "5 min read"
  },
  relatedTools: [
    { title: "Fancy Font Generator", slug: "fancy-font-generator", category: "social", relationReason: "Style your newly generated AI bio with aesthetic Unicode fonts." },
    { title: "Love Calculator", slug: "love-calculator", category: "love", relationReason: "Test compatibility with your social media crush." },
    { title: "Tech Archetype Quiz", slug: "tech-archetype-quiz", category: "personality", relationReason: "Discover your tech alter-ego to feature in your bio." },
    { title: "Ultimate Decision Wheel", slug: "decision-wheel", category: "random", relationReason: "Can't decide which bio to pick? Let the wheel choose!" },
    { title: "Emoji Reaction Speed Test", slug: "emoji-reaction-test", category: "gaming", relationReason: "Test your reflex speed." }
  ]
};
