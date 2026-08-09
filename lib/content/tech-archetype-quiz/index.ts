import { DomainToolModule } from "@/types/tool-content";

export const techArchetypeQuizContent: DomainToolModule = {
  slug: "tech-archetype-quiz",
  schemaType: "CreativeWork",
  keywords: {
    primary: "Tech Archetype Quiz",
    secondary: ["Developer Personality Test", "Tech Alter Ego Quiz", "Which Tech Persona Are You", "Programmer Archetype Test", "Tech Style Quiz"],
    longTail: [
      "free tech archetype personality quiz online 4 questions",
      "which tech alter ego are you keyboard ninja or prompt whisperer",
      "fun programmer personality test with custom result badges",
      "tech personality quiz for developers designers and founders",
      "discover your digital archetype interactive quiz free"
    ],
    lsi: ["personality matrix", "developer archetype", "keyboard shortcuts", "pixel perfectionist", "tech persona"],
    semantic: ["tech character test", "coder personality quiz", "digital alter ego", "developer type test", "tech archetype"],
    questionKeywords: ["what is my tech archetype", "how to discover developer personality type", "what are the 4 tech archetypes"],
    intentKeywords: ["take tech archetype quiz", "discover tech alter ego", "test developer personality"]
  },
  metadata: {
    metaTitle: "Which Tech Archetype Are You? - Fun 60-Second Personality Quiz",
    metaDescription: "Uncover your digital alter-ego in 4 quick questions! Are you a Keyboard Ninja, AI Prompt Whisperer, Pixel Perfectionist, or Midnight Debugger? Includes custom badges & shareable reports.",
    slug: "tech-archetype-quiz",
    canonicalUrl: "https://www.getfuntools.app/tools/tech-archetype-quiz",
    robots: "index, follow",
    openGraph: {
      title: "Which Tech Archetype Are You? | Interactive Quiz",
      description: "Discover your digital alter-ego with custom result badges and superpower reports.",
      url: "https://www.getfuntools.app/tools/tech-archetype-quiz",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Tech Archetype Quiz | GetFunTools",
      description: "Find out if you are a Keyboard Ninja, Prompt Whisperer, or Pixel Perfectionist!"
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools Tech Archetype Quiz determines your digital alter-ego across four developer and creator personas in 60 seconds.",
    twoSentence: "The GetFunTools Tech Archetype Quiz is a 4-question interactive personality assessment. By evaluating user choices regarding workplace setup, bug troubleshooting, tools, and perfection benchmarks, it classifies participants into four archetypes: Keyboard Ninja, AI Prompt Whisperer, Pixel Perfectionist, or Midnight Debugger.",
    summary50: "The GetFunTools Tech Archetype Quiz is a free 60-second interactive personality test. Evaluating 4 multiple-choice questions on work habits and tech preferences, it classifies users into developer archetypes (Ninja, Whisperer, Designer, Debugger) and delivers custom badges.",
    summary100: "The GetFunTools Tech Archetype Quiz is a lightweight personality test designed for developers, designers, product managers, and tech enthusiasts. Through 4 interactive multiple-choice questions, the quiz measures preferences for keyboard shortcuts, AI prompt engineering, visual aesthetics, or deep-dive logic. Upon completion, users receive a custom result badge, superpower breakdown, and shareable summary.",
    summary200: "The GetFunTools Tech Archetype Quiz provides a gamified personality assessment tailored for digital creators and engineers. Designed with smooth card transitions, animated progress indicators, and vibrant gradients, the quiz poses 4 strategic questions covering desk setup, bug resolution tactics, favorite tools, and product perfection standards. The scoring engine tallies user responses to determine their primary alter-ego: Keyboard Ninja (10x speed & shortcuts), AI Prompt Whisperer (generative AI mastery), Pixel Perfectionist (aesthetic UX & micro-interactions), or Midnight Debugger (rock-solid logic & deep focus). Each result screen includes a custom badge, superpower summary, and instant quiz restart options.",
    bulletSummary: [
      "Assesses digital alter-ego through 4 quick multiple-choice questions.",
      "Classifies users into 4 archetypes: Keyboard Ninja, AI Whisperer, Pixel Perfectionist, Midnight Debugger.",
      "Displays animated progress bar and smooth card transitions.",
      "Delivers custom result badges, descriptions, and superpower summaries.",
      "Runs 100% locally in-browser with zero cost or account creation."
    ],
    tableSummary: [
      { label: "Quiz Duration", value: "60 Seconds (4 Questions)" },
      { label: "Archetypes Count", value: "4 Distinct Digital Personas" },
      { label: "Result Output", value: "Custom Badge + Superpower Report" },
      { label: "Cost & Limits", value: "100% Free with unlimited retakes" }
    ],
    comparisonSummary: {
      header: ["Archetype Title", "Core Focus", "Superpower Specialty"],
      rows: [
        ["⚡ Keyboard Ninja", "Shortcuts & Speed", "Insane execution speed & terminal mastery"],
        ["🤖 AI Prompt Whisperer", "Generative AI", "Synthesizing AI prompts into reality"],
        ["🎨 Pixel Perfectionist", "UX & Visuals", "Crafting modern, unforgettable UX"],
        ["🌙 Midnight Debugger", "Logic & Architecture", "Unstoppable problem-solving grit"]
      ]
    }
  },
  snippets: {
    paragraph: "A Tech Archetype Quiz is a gamified personality test that evaluates a user's technical habits, workflow preferences, and problem-solving styles to classify them into distinct digital alter-ego personas.",
    list: [
      "Step 1: Answer Question 1 regarding your ideal desk and monitor setup.",
      "Step 2: Answer Question 2 on how you troubleshoot bugs and obstacles.",
      "Step 3: Pick your favorite tech secret weapon (Shortcuts, AI, CSS, Focus).",
      "Step 4: Select your standard for product perfection.",
      "Step 5: View your custom archetype result badge, superpower report, and share!"
    ],
    numbered: [
      "Select Setup Preference",
      "Pick Troubleshooting Style",
      "Choose Secret Weapon",
      "View Archetype Result Badge"
    ],
    table: {
      headers: ["Archetype Name", "Badge Title", "Key Characteristic"],
      rows: [
        ["Keyboard Ninja", "10x Speed Demon", "Navigates software at the speed of light."],
        ["AI Prompt Whisperer", "Future Architect", "Synthesizes AI intelligence into products."],
        ["Pixel Perfectionist", "Visual Maestro", "Obsessed with spacing, colors & micro-interactions."]
      ]
    }
  },
  howTo: [
    { name: "Start Quiz", text: "Read Question 1 on workspace preferences." },
    { name: "Select Answers", text: "Tap your preferred choice for all 4 questions." },
    { name: "Track Progress", text: "Watch the animated progress bar advance to 100%." },
    { name: "View Archetype", text: "Inspect your custom badge and superpower breakdown." }
  ],
  content: {
    heroHeadline: "Uncover Your Digital Tech Alter-Ego",
    heroSubheading: "Are you a Keyboard Ninja, AI Prompt Whisperer, Pixel Perfectionist, or Midnight Debugger? Take the 60-second quiz!",
    introduction: "Every tech creator has a distinct working style. Some thrive on terminal commands, others on generative AI prompts, aesthetic design systems, or late-night debugging. Discover your true archetype in 4 simple questions.",
    definition: "The Tech Archetype Quiz is a personality assessment tool designed to map workflow behaviors, tool choices, and engineering mindsets into four distinct digital alter-ego profiles.",
    howItWorks: [
      "Multi-Choice Evaluation: 4 questions present 4 distinct options mapping to specific persona keys.",
      "Score Tallying: The state machine tallies responses for Ninja, Whisperer, Designer, and Debugger.",
      "Highest Frequency Match: The archetype with the highest score is declared your primary alter-ego.",
      "Dynamic Card Animation: Results are presented with vibrant gradient cards and confetti."
    ],
    examples: [
      { scenario: "Choosing terminal shortcuts & 60fps speeds", input: "Answers: Keyboard, Bash, Shortcuts, Speed", output: "⚡ Keyboard Ninja (10x Speed Demon)" },
      { scenario: "Choosing ChatGPT & generative AI prompts", input: "Answers: Midjourney, AI refactor, Prompts, Generative", output: "🤖 AI Prompt Whisperer (Future Architect)" },
      { scenario: "Choosing Figma & exact pixel grids", input: "Answers: Figma, Redesign UI, CSS, Flawless UX", output: "🎨 Pixel Perfectionist (Visual Maestro)" }
    ],
    useCases: [
      { audience: "Developers & Designers", description: "Discover your alter-ego to share on social media or team Slack channels." },
      { audience: "Tech Teams & Founders", description: "Use as a fun team-building icebreaker to compare working styles." },
      { audience: "Students & Bootcamps", description: "Explore different technical focus areas and career specializations." }
    ],
    benefits: [
      { title: "Quick 60-Second Completion", description: "Only 4 short multiple-choice questions." },
      { title: "Custom Archetype Badges", description: "Delivers tailored descriptions and superpower breakdowns." },
      { title: "100% Free & Retakeable", description: "Unlimited retakes with zero registration needed." }
    ],
    features: [
      { title: "4 Distinct Personas", description: "Keyboard Ninja, AI Whisperer, Pixel Perfectionist, Midnight Debugger." },
      { title: "Animated Progress Bar", description: "Real-time visual percentage indicator." },
      { title: "Particle Confetti Celebration", description: "Explodes particle confetti when your result is unveiled." }
    ],
    comparisonTable: {
      headers: ["Archetype", "Primary Weapon", "Core Focus"],
      rows: [
        ["Keyboard Ninja", "Shortcuts & Bash Scripts", "Speed & Efficiency"],
        ["AI Prompt Whisperer", "ChatGPT & Midjourney", "Generative AI Integration"],
        ["Pixel Perfectionist", "Figma & Custom CSS", "UX & Aesthetic Perfection"],
        ["Midnight Debugger", "Stack Traces & Lo-Fi Beats", "Bulletproof Architecture"]
      ]
    },
    accuracyStatement: "This quiz provides a fun personality classification based on common tech culture tropes and workflow preferences.",
    limitations: [
      "Designed for entertainment and social fun rather than formal psychometric evaluations.",
      "Categorizes results into 4 primary archetypes based on 4 choices."
    ],
    bestPractices: [
      "Answer instinctively without overthinking for the most accurate persona match.",
      "Share your result badge with colleagues on Slack or Twitter/X.",
      "Retake the quiz if your working habits evolve over time!"
    ],
    expertTips: [
      "Combine your quiz result with our AI Bio Generator to craft an epic social media bio!",
      "If you score 'Keyboard Ninja', try learning 5 new IDE keyboard shortcuts today.",
      "If you score 'Pixel Perfectionist', explore our Fancy Font Generator to style your handles."
    ],
    disclaimer: {
      type: "entertainment",
      text: "This Tech Archetype Quiz is intended strictly for entertainment and social interaction among tech enthusiasts."
    }
  },
  faqs: [
    { question: "What is the Tech Archetype Quiz?", answer: "The Tech Archetype Quiz is a free 4-question personality assessment that determines your digital alter-ego." },
    { question: "How long does the quiz take?", answer: "Only about 60 seconds! It features 4 simple multiple-choice questions." },
    { question: "What are the 4 tech archetypes?", answer: "The 4 archetypes are: Keyboard Ninja, AI Prompt Whisperer, Pixel Perfectionist, and Midnight Debugger." },
    { question: "Is the Tech Archetype Quiz free?", answer: "Yes, 100% free with unlimited retakes and zero registration required." },
    { question: "Can I retake the quiz?", answer: "Yes! Click the 'Retake Archetype Quiz' button at any time to try again." },
    { question: "Is my quiz data saved on your servers?", answer: "No. All quiz scoring processes locally inside your browser." },
    { question: "Can I share my result badge?", answer: "Yes! Take a screenshot or share your superpower summary with friends." },
    { question: "Does the quiz work on mobile devices?", answer: "Yes, GetFunTools is fully responsive for iPhone, Android, and desktop devices." },
    { question: "What if I get a tie between two archetypes?", answer: "The engine selects the highest frequency match based on your recent choice." },
    { question: "Do I need to sign up for an account?", answer: "No account or sign-up is required." },
    { question: "What is the Keyboard Ninja archetype?", answer: "Keyboard Ninjas prioritize 10x speed, keyboard shortcuts, and terminal commands." },
    { question: "What is the AI Prompt Whisperer archetype?", answer: "AI Prompt Whisperers leverage generative AI prompts to synthesize products rapidly." },
    { question: "What is the Pixel Perfectionist archetype?", answer: "Pixel Perfectionists focus on UI micro-interactions, color palettes, and flawless UX." },
    { question: "What is the Midnight Debugger archetype?", answer: "Midnight Debuggers excel at deep-focus troubleshooting and rock-solid architecture." },
    { question: "What are common mistakes when taking personality quizzes?", answer: "Overthinking questions rather than picking your first natural instinct." },
    { question: "How to troubleshoot if quiz choices don't register?", answer: "Ensure JavaScript is enabled and refresh the browser page." },
    { question: "Can tech teams use this quiz for icebreakers?", answer: "Yes! It makes an entertaining icebreaker during team syncs or retreats." },
    { question: "Does the quiz play confetti?", answer: "Yes! Completing the quiz triggers a celebratory particle confetti explosion." }
  ],
  peopleAlsoAsk: [
    { question: "What are the personality types of software engineers?", answer: "Common engineer personality archetypes include problem-solvers (Debuggers), speed builders (Ninjas), visual creators (Designers), and AI orchestrators (Whisperers)." },
    { question: "How to find your tech alter ego?", answer: "Take our 60-second Tech Archetype Quiz to discover your working style." },
    { question: "Why are developer personality quizzes popular?", answer: "They provide entertaining self-awareness and fun conversation starters for tech communities." }
  ],
  eeat: {
    authorName: "Alex Rivers",
    authorRole: "Creative Director & UX Architect",
    authorBio: "Alex designs gamified assessments, interactive UI systems, and persona models.",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    reviewerName: "Sophia Patel",
    reviewerRole: "Productivity Strategist",
    lastUpdated: "July 19, 2026",
    contentVersion: "v2.7.0",
    readTime: "5 min read"
  },
  relatedTools: [
    { title: "AI Bio Generator", slug: "ai-bio-generator", category: "ai", relationReason: "Use your tech archetype in your social media bio!" },
    { title: "Fancy Font Generator", slug: "fancy-font-generator", category: "social", relationReason: "Style your developer handle with aesthetic fonts." },
    { title: "Emoji Reaction Speed Test", slug: "emoji-reaction-test", category: "gaming", relationReason: "Test if your reaction time matches a Keyboard Ninja score." },
    { title: "Ultimate Decision Wheel", slug: "decision-wheel", category: "random", relationReason: "Spin the decision wheel for quick choices." },
    { title: "Coffee to Wealth Calculator", slug: "coffee-to-wealth", category: "finance", relationReason: "Calculate compound savings." }
  ]
};
