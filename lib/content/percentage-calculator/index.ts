import { DomainToolModule } from "@/types/tool-content";

export const percentageCalculatorContent: DomainToolModule = {
  slug: "percentage-calculator",
  schemaType: "SoftwareApplication",
  keywords: {
    primary: "Percentage Calculator",
    secondary: ["Calculate Percentage", "Percentage Change Calculator", "Percent Increase Calculator", "Percentage Difference", "Discount Calculator"],
    longTail: [
      "free percentage calculator what is X percent of Y",
      "how to calculate percentage increase and decrease online",
      "percentage change formula calculator with steps",
      "X is what percent of Y percentage ratio calculator",
      "fast sales discount and markup percentage solver"
    ],
    lsi: ["ratio calculation", "discount percentage", "math formula", "percentage gain", "percentage loss"],
    semantic: ["percent solver", "percentage maker", "math percent tool", "discount solver"],
    questionKeywords: ["how to calculate percentage of a number", "how to find percentage increase", "what is the percentage formula"],
    intentKeywords: ["calculate percentage", "percent solver", "percentage calculator"]
  },
  metadata: {
    metaTitle: "Percentage Calculator - Solve Percent Increase, Decrease & Ratios",
    metaDescription: "Multi-mode percentage calculator to solve % of a number, percentage change (increase/decrease), and ratio percentages instantly.",
    slug: "percentage-calculator",
    canonicalUrl: "https://getfuntools.app/tools/percentage-calculator",
    robots: "index, follow",
    openGraph: {
      title: "Ultimate Percentage Calculator | Multi-Mode Math Tool",
      description: "Solve percentage increase, decrease, discounts, and ratio math instantly.",
      url: "https://getfuntools.app/tools/percentage-calculator",
      type: "website"
    },
    twitterCard: {
      card: "summary_large_image",
      title: "Percentage Calculator - Multi-Mode Percent Math",
      description: "Instant percentage increase, discount, and ratio solver."
    }
  },
  aiOverview: {
    oneSentence: "The GetFunTools Percentage Calculator solves percentage of a number, percentage change, and ratio percentage math.",
    twoSentence: "The GetFunTools Percentage Calculator offers three specialized math modes: What is X% of Y, Percentage Change (increase/decrease), and X is what % of Y. It provides instant real-time mathematical calculations with formula explanations.",
    summary50: "The GetFunTools Percentage Calculator is a free online math utility that solves percentage calculations across 3 modes: percent of a total, percentage increase/decrease, and value ratio percentages with instant real-time results.",
    summary100: "The GetFunTools Percentage Calculator provides mathematical assistance for finance, shopping, and academic calculations. Users can toggle between three calculation modes to solve percentage of a number, percentage change between two values, or what percentage one value represents of another, complete with step-by-step mathematical explanations.",
    summary200: "The GetFunTools Percentage Calculator is a versatile financial and educational tool designed to solve everyday percent calculations without manual formulas. Built for instant browser processing, it features three dedicated modes: Mode 1 computes standard percentage of a total (e.g. 15% of $200 = $30); Mode 2 calculates percentage change, detecting whether a value increased or decreased (e.g. moving from 100 to 150 is a +50% increase); Mode 3 calculates ratio percentages (e.g. 45 is 30% of 150). The tool updates outputs automatically as inputs change, providing step-by-step mathematical summaries ideal for sales tax, tip calculations, discounts, and financial analysis.",
    bulletSummary: [
      "3 calculation modes: % of total, % change, and ratio %.",
      "Automatically detects percentage increase vs percentage decrease.",
      "Provides clear step-by-step mathematical summaries.",
      "Real-time instant calculation as numbers are typed.",
      "100% free with zero registration."
    ],
    tableSummary: [
      { label: "Calculation Modes", value: "3 Modes (% of Y, % Change, X is % of Y)" },
      { label: "Precision", value: "2 Decimal Places" },
      { label: "Negative Values", value: "Full Support (Percentage Decrease)" },
      { label: "Cost", value: "100% Free" }
    ],
    comparisonSummary: {
      header: ["Feature", "GetFunTools Percentage Calc", "Basic Calculator"],
      rows: [
        ["Mode Selection", "3 Dedicated Modes", "Single Math Entry"],
        ["Change Detection", "Auto-Identifies Increase/Decrease", "Requires Manual Formula"],
        ["Explanation Text", "Included Step-by-Step Summary", "Raw Number Only"]
      ]
    }
  },
  snippets: {
    paragraph: "A Percentage Calculator is an automated mathematical application that computes proportional relationships based on a scale of one hundred.",
    list: [
      "Step 1: Select your mode (What is X% of Y, % Change, or X is what % of Y).",
      "Step 2: Enter the required values in the input boxes.",
      "Step 3: Read the instant calculated percentage result.",
      "Step 4: Review the step-by-step formula explanation below."
    ],
    numbered: [
      "Select Calculation Mode",
      "Input Numeric Values",
      "View Calculated Percentage",
      "Review Formula Explanation"
    ],
    table: {
      headers: ["Calculation Type", "Input Values", "Result"],
      rows: [
        ["What is X% of Y?", "15% of 200", "30"],
        ["Percentage Change", "From 100 to 150", "+50% Increase"],
        ["X is what % of Y?", "45 of 150", "30%"]
      ]
    }
  },
  howTo: [
    { name: "Select Mode", text: "Choose between % of total, % change, or ratio %." },
    { name: "Enter Values", text: "Type your numbers into the input boxes." },
    { name: "Read Result", text: "View the percentage score in the output card." },
    { name: "Check Steps", text: "Read the explanatory text for formula guidance." }
  ],
  content: {
    heroHeadline: "Solve Percentage Increase, Decrease & Ratios Instantly",
    heroSubheading: "Calculate discounts, sales tax, percentage change, and math ratios in seconds.",
    introduction: "Percentage calculations are essential for daily financial decisions, shopping discounts, tip calculations, and academic problem-solving.",
    definition: "A Percentage Calculator is a mathematical tool that evaluates ratios as fractions of 100 using algebraic percentage formulas.",
    howItWorks: [
      "Mode Selection: Selects appropriate percentage formula.",
      "Formula Evaluation: Executes (X / 100) * Y or ((To - From) / From) * 100.",
      "Precision Rounding: Rounds result to 2 decimal places.",
      "Explanatory Output: Formats text explaining the mathematical relationship."
    ],
    examples: [
      { scenario: "Calculating a 20% discount on a $80 jacket", input: "20% of 80", output: "$16 discount (Final price: $64)" }
    ],
    useCases: [
      { audience: "Shoppers", description: "Calculating discount savings during sales." },
      { audience: "Finance Analysts", description: "Measuring revenue growth and profit margin changes." }
    ],
    benefits: [
      { title: "No Formula Memorization", description: "Solves complex percentage math automatically." },
      { title: "Multi-Mode Flexibility", description: "Handles discounts, increases, and ratios." }
    ],
    features: [
      { title: "3 Calculation Modes", description: "% of Y, % Change, and X is % of Y." },
      { title: "Auto Increase/Decrease", description: "Identifies positive and negative growth." }
    ],
    comparisonTable: {
      headers: ["Feature", "GetFunTools Percentage Calc", "Standard Calculator"],
      rows: [
        ["Modes", "3 Dedicated Modes", "Manual Percent Button"],
        ["Explanation", "Full Step-by-Step Summary", "None"]
      ]
    },
    accuracyStatement: "Calculations follow standard IEEE 754 floating point arithmetic rules.",
    limitations: ["Division by zero returns zero."],
    bestPractices: ["Double-check whether you are calculating percent change or percent of total."],
    expertTips: ["Use Mode 2 to quickly calculate salary raises or price inflation percentages!"],
    disclaimer: { type: "general", text: "Calculations are provided for educational and financial calculation convenience." }
  },
  faqs: [
    { question: "How do you calculate percentage of a number?", answer: "Multiply the percentage by the total number and divide by 100. For example, 15% of 200 = (15 * 200) / 100 = 30." },
    { question: "How do you calculate percentage increase?", answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100." },
    { question: "What is the formula for percentage decrease?", answer: "Subtract the new value from the original value, divide by the original value, and multiply by 100." },
    { question: "Is the Percentage Calculator free to use?", answer: "Yes, 100% free with unlimited calculations." },
    { question: "Can I calculate sales discounts with this tool?", answer: "Yes! Use Mode 1 to find the discount amount, then subtract it from the original price." },
    { question: "How do I calculate what percentage 45 is of 150?", answer: "Use Mode 3: Divide 45 by 150 and multiply by 100 to get 30%." },
    { question: "Does this calculator support negative numbers?", answer: "Yes, negative percentage results indicate a percentage decrease." },
    { question: "Does the tool round the calculated result?", answer: "Results are rounded to 2 decimal places for clean readable financial outputs." },
    { question: "Can I use this for test score percentages?", answer: "Yes! Use Mode 3 by entering your score as X and total points as Y." },
    { question: "Does this tool store my calculations?", answer: "No, all math calculations happen locally in your web browser." },
    { question: "Does it work on smartphones?", answer: "Yes, GetFunTools is fully optimized for iOS and Android devices." },
    { question: "What is 20% off $50?", answer: "20% of $50 is $10, making the discounted final price $40." },
    { question: "What is the difference between percentage points and percentage change?", answer: "Percentage points is the simple difference between two percentages, while percentage change is the relative percentage growth." },
    { question: "How to add a percentage to a number?", answer: "Calculate X% of the number using Mode 1, then add that result to your starting number." },
    { question: "Can I calculate profit margin percentage?", answer: "Yes, use Mode 2 with cost as From Value and revenue as To Value." }
  ],
  peopleAlsoAsk: [
    { question: "How to calculate 15% tip easily?", answer: "Divide the bill by 10 and add half of that amount." },
    { question: "What is 25% as a fraction?", answer: "25% equals 25/100, which simplifies to 1/4." }
  ],
  eeat: {
    authorName: "Alex Rivers",
    authorRole: "Financial Data Analyst",
    authorBio: "Alex specializes in financial mathematics and UI design systems.",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    reviewerName: "Sophia Patel",
    reviewerRole: "Finance Editor",
    lastUpdated: "July 19, 2026",
    contentVersion: "v3.1.0",
    readTime: "4 min read"
  },
  relatedTools: [
    { title: "Coffee to Wealth Calculator", slug: "coffee-to-wealth", category: "finance", relationReason: "Calculate compound interest growth from daily savings." },
    { title: "BMI Calculator", slug: "bmi-calculator", category: "productivity", relationReason: "Calculate health body metrics and healthy weight ratios." },
    { title: "Date Calculator", slug: "date-calculator", category: "productivity", relationReason: "Calculate calendar target dates." }
  ]
};
