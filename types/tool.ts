export type CategoryId = 
  | "ai"
  | "love"
  | "age"
  | "gaming"
  | "random"
  | "social"
  | "finance"
  | "personality"
  | "quiz"
  | "productivity"
  | "text";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  gradient: string;
  badgeBg: string;
  count: number;
}

export interface FAQItem {
  question: string;
  answer: string; // 40-120 words per answer
  category?: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface AEOSummaries {
  oneSentence: string;
  twoSentence: string;
  bulletAnswer: string[];
  tableAnswer: { col1: string; col2: string }[];
  summary50: string;
  summary100: string;
  summary200: string;
}

export interface FeaturedSnippets {
  paragraphSnippet: string;
  listSnippet: string[];
  numberedSnippet: string[];
  tableSnippet: { header: string[]; rows: string[][] };
}

export interface EEATMetadata {
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  reviewerName: string;
  reviewerRole: string;
  lastUpdated: string;
  contentVersion: string;
  readTime: string;
  disclaimerType?: "entertainment" | "financial" | "educational" | "medical" | "general";
  disclaimerText?: string;
}

export interface ToolSEOData {
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  lsiKeywords: string[];
  semanticKeywords: string[];
  definition: string;
  quickAnswer: string;
  howToSteps: HowToStep[];
  examples: { title: string; scenario: string; outcome: string }[];
  featuresList: { title: string; description: string }[];
  benefitsList: { title: string; description: string }[];
  useCases: { audience: string; description: string }[];
  whoShouldUse: { title: string; desc: string; icon: string }[];
  aeoSummaries: AEOSummaries;
  featuredSnippets: FeaturedSnippets;
  comparisonMatrix: {
    headers: string[];
    rows: string[][];
  };
  commonMistakes: string[];
  expertTips: string[];
  faqs: FAQItem[]; // At least 15 FAQs per tool
  eeat: EEATMetadata;
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CategoryId;
  iconName: string;
  isPopular?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  gradient: string;
  tags: string[];
  features: string[];
  faq: { question: string; answer: string }[];
  seoData?: ToolSEOData;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  category: string;
  readTime: string;
  date: string;
  updated?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string[];
  relatedTools: string[];
}
