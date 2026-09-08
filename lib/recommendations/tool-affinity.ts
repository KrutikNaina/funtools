import { CategoryId } from "@/types/tool";

// Category Affinity Mappings (Phase 15)
export const CATEGORY_AFFINITY_MAP: Record<CategoryId, CategoryId[]> = {
  love: ["personality", "social", "random", "quiz", "age"],
  social: ["text", "ai", "productivity", "random", "personality"],
  gaming: ["random", "personality", "quiz", "productivity", "age"],
  random: ["gaming", "love", "personality", "productivity", "finance"],
  personality: ["quiz", "love", "social", "gaming", "ai"],
  ai: ["social", "text", "productivity", "personality", "gaming"],
  age: ["productivity", "finance", "quiz", "random", "love"],
  finance: ["productivity", "age", "random", "quiz", "text"],
  quiz: ["personality", "gaming", "ai", "random", "age"],
  productivity: ["age", "finance", "text", "random", "ai"],
  text: ["social", "ai", "productivity", "random", "gaming"],
};

// Granular Tool Affinity Graph (Expanded Phase 4 & 16)
export const TOOL_AFFINITY_MAP: Record<string, string[]> = {
  "fancy-font-generator": [
    "username-generator",
    "ai-bio-generator",
    "nickname-generator",
    "text-repeater",
    "qr-code-generator",
    "love-calculator",
  ],
  "username-generator": [
    "nickname-generator",
    "fancy-font-generator",
    "ai-bio-generator",
    "password-generator",
    "random-number-generator",
    "tech-archetype-quiz",
  ],
  "nickname-generator": [
    "username-generator",
    "fancy-font-generator",
    "ai-bio-generator",
    "love-calculator",
    "decision-wheel",
  ],
  "ai-bio-generator": [
    "fancy-font-generator",
    "username-generator",
    "nickname-generator",
    "tech-archetype-quiz",
    "reaction-time-test",
  ],
  "reaction-time-test": [
    "decision-wheel",
    "lucky-number-generator",
    "tech-archetype-quiz",
    "username-generator",
    "random-number-generator",
  ],
  "love-calculator": [
    "decision-wheel",
    "fancy-font-generator",
    "nickname-generator",
    "cosmic-age-clock",
    "lucky-number-generator",
  ],
  "decision-wheel": [
    "lucky-number-generator",
    "random-number-generator",
    "reaction-time-test",
    "love-calculator",
    "percentage-calculator",
  ],
  "lucky-number-generator": [
    "random-number-generator",
    "decision-wheel",
    "coffee-to-wealth",
    "cosmic-age-clock",
  ],
  "random-number-generator": [
    "decision-wheel",
    "lucky-number-generator",
    "password-generator",
    "percentage-calculator",
    "date-calculator",
  ],
  "cosmic-age-clock": [
    "date-difference-calculator",
    "countdown-timer",
    "date-calculator",
    "death-calculator",
    "bmi-calculator",
  ],
  "date-calculator": [
    "date-difference-calculator",
    "countdown-timer",
    "cosmic-age-clock",
    "percentage-calculator",
  ],
  "date-difference-calculator": [
    "date-calculator",
    "countdown-timer",
    "cosmic-age-clock",
    "percentage-calculator",
  ],
  "countdown-timer": [
    "date-calculator",
    "date-difference-calculator",
    "cosmic-age-clock",
    "random-number-generator",
  ],
  "bmi-calculator": [
    "cosmic-age-clock",
    "death-calculator",
    "percentage-calculator",
    "date-calculator",
  ],
  "death-calculator": [
    "cosmic-age-clock",
    "bmi-calculator",
    "date-difference-calculator",
    "countdown-timer",
  ],
  "coffee-to-wealth": [
    "percentage-calculator",
    "tech-archetype-quiz",
    "date-calculator",
    "bmi-calculator",
  ],
  "percentage-calculator": [
    "coffee-to-wealth",
    "random-number-generator",
    "date-calculator",
    "bmi-calculator",
  ],
  "password-generator": [
    "qr-code-generator",
    "username-generator",
    "random-number-generator",
    "text-repeater",
  ],
  "qr-code-generator": [
    "password-generator",
    "fancy-font-generator",
    "random-number-generator",
    "ai-bio-generator",
  ],
  "tech-archetype-quiz": [
    "ai-bio-generator",
    "reaction-time-test",
    "coffee-to-wealth",
    "decision-wheel",
  ],
  "text-repeater": [
    "fancy-font-generator",
    "qr-code-generator",
    "password-generator",
    "username-generator",
  ],
};

export function getCategoryAffinities(category: CategoryId): CategoryId[] {
  return CATEGORY_AFFINITY_MAP[category] || ["social", "gaming", "random"];
}

export function getToolAffinitySlugs(slug: string): string[] {
  return TOOL_AFFINITY_MAP[slug] || [];
}
