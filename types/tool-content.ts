export interface ToolKeywords {
  primary: string;
  secondary: string[];
  longTail: string[];
  lsi: string[];
  semantic: string[];
  questionKeywords: string[];
  intentKeywords: string[];
}

export interface ToolMetadata {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  robots: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
  };
  twitterCard: {
    card: string;
    title: string;
    description: string;
  };
}

export interface ToolAIOverview {
  oneSentence: string;
  twoSentence: string;
  summary50: string;
  summary100: string;
  summary200: string;
  bulletSummary: string[];
  tableSummary: { label: string; value: string }[];
  comparisonSummary: { header: string[]; rows: string[][] };
}

export interface ToolSnippets {
  paragraph: string;
  list: string[];
  numbered: string[];
  table: { headers: string[]; rows: string[][] };
}

export interface ToolHowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface ToolContentDetails {
  heroHeadline: string;
  heroSubheading: string;
  introduction: string;
  definition: string;
  howItWorks: string[];
  formula?: { title: string; explanation: string; mathNotation: string };
  examples: { scenario: string; input: string; output: string }[];
  useCases: { audience: string; description: string }[];
  benefits: { title: string; description: string }[];
  features: { title: string; description: string }[];
  comparisonTable: { headers: string[]; rows: string[][] };
  accuracyStatement: string;
  limitations: string[];
  bestPractices: string[];
  expertTips: string[];
  disclaimer?: { type: "entertainment" | "medical" | "financial" | "general"; text: string };
}

export interface ToolFAQ {
  question: string;
  answer: string; // 40-120 words per answer
}

export interface ToolPeopleAlsoAsk {
  question: string;
  answer: string;
}

export interface ToolAuthorEEAT {
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorAvatar: string;
  reviewerName: string;
  reviewerRole: string;
  lastUpdated: string;
  contentVersion: string;
  readTime: string;
}

export interface ToolContextualLink {
  title: string;
  slug: string;
  category: string;
  relationReason: string;
}

export interface DomainToolModule {
  slug: string;
  keywords: ToolKeywords;
  metadata: ToolMetadata;
  aiOverview: ToolAIOverview;
  snippets: ToolSnippets;
  howTo: ToolHowToStep[];
  content: ToolContentDetails;
  faqs: ToolFAQ[]; // 15-20 unique FAQs
  peopleAlsoAsk: ToolPeopleAlsoAsk[];
  eeat: ToolAuthorEEAT;
  relatedTools: ToolContextualLink[];
  schemaType: "SoftwareApplication" | "MedicalWebPage" | "CreativeWork";
}
