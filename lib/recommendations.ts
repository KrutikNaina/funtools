import { TOOLS } from "@/lib/tools-data";
import { Tool } from "@/types/tool";

export const EXPLICIT_SMART_MAP: Record<string, string[]> = {
  "cosmic-age-clock": ["countdown-timer", "date-difference-calculator", "date-calculator", "bmi-calculator"],
  "date-calculator": ["date-difference-calculator", "countdown-timer", "cosmic-age-clock", "percentage-calculator"],
  "date-difference-calculator": ["date-calculator", "countdown-timer", "cosmic-age-clock", "percentage-calculator"],
  "countdown-timer": ["date-calculator", "date-difference-calculator", "cosmic-age-clock", "random-number-generator"],
  "username-generator": ["nickname-generator", "fancy-font-generator", "ai-bio-generator", "password-generator"],
  "nickname-generator": ["username-generator", "fancy-font-generator", "ai-bio-generator", "love-calculator"],
  "fancy-font-generator": ["username-generator", "nickname-generator", "ai-bio-generator", "qr-code-generator"],
  "ai-bio-generator": ["fancy-font-generator", "username-generator", "nickname-generator", "tech-archetype-quiz"],
  "password-generator": ["username-generator", "qr-code-generator", "random-number-generator", "percentage-calculator"],
  "qr-code-generator": ["password-generator", "random-number-generator", "fancy-font-generator", "percentage-calculator"],
  "love-calculator": ["decision-wheel", "fancy-font-generator", "cosmic-age-clock", "nickname-generator"],
  "bmi-calculator": ["cosmic-age-clock", "date-calculator", "coffee-to-wealth", "percentage-calculator"],
  "percentage-calculator": ["coffee-to-wealth", "bmi-calculator", "random-number-generator", "date-calculator"],
  "random-number-generator": ["decision-wheel", "lucky-number-generator", "percentage-calculator", "qr-code-generator"],
  "decision-wheel": ["random-number-generator", "lucky-number-generator", "emoji-reaction-test", "love-calculator"],
  "lucky-number-generator": ["decision-wheel", "random-number-generator", "love-calculator", "cosmic-age-clock"],
  "coffee-to-wealth": ["percentage-calculator", "bmi-calculator", "tech-archetype-quiz", "date-calculator"],
  "tech-archetype-quiz": ["emoji-reaction-test", "ai-bio-generator", "coffee-to-wealth", "decision-wheel"],
  "emoji-reaction-test": ["tech-archetype-quiz", "decision-wheel", "lucky-number-generator", "fancy-font-generator"],
  "death-calculator": ["cosmic-age-clock", "bmi-calculator", "date-calculator", "coffee-to-wealth"],
};

export function getToolsBySlugs(slugs: string[]): Tool[] {
  return slugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));
}

export function getRelatedTools(toolSlug: string, limit = 4): Tool[] {
  const currentTool = TOOLS.find((t) => t.slug === toolSlug);
  if (!currentTool) return TOOLS.slice(0, limit);

  const mappedSlugs = EXPLICIT_SMART_MAP[toolSlug] || [];
  let result = getToolsBySlugs(mappedSlugs);

  // Fill with same category if needed
  if (result.length < limit) {
    const categoryTools = TOOLS.filter(
      (t) => t.category === currentTool.category && t.slug !== toolSlug && !result.some((r) => r.id === t.id)
    );
    result = [...result, ...categoryTools];
  }

  // Fill with remaining tools if needed
  if (result.length < limit) {
    const remainingTools = TOOLS.filter(
      (t) => t.slug !== toolSlug && !result.some((r) => r.id === t.id)
    );
    result = [...result, ...remainingTools];
  }

  return result.slice(0, limit);
}

export function getPeopleAlsoUsed(toolSlug: string, limit = 4): Tool[] {
  const currentTool = TOOLS.find((t) => t.slug === toolSlug);
  const mappedSlugs = EXPLICIT_SMART_MAP[toolSlug] || [];
  
  // Pick complement tools outside primary category if possible
  const mappedTools = getToolsBySlugs(mappedSlugs);
  const crossCategoryTools = TOOLS.filter(
    (t) =>
      t.slug !== toolSlug &&
      (currentTool ? t.category !== currentTool.category : true) &&
      !mappedTools.some((m) => m.id === t.id)
  );

  const combined = [...mappedTools.slice(2), ...crossCategoryTools];
  return combined.slice(0, limit);
}

export function getPopularInCategory(category: string, currentSlug?: string, limit = 4): Tool[] {
  return TOOLS.filter((t) => t.category === category && t.slug !== currentSlug)
    .slice(0, limit);
}

export function getTrendingTools(limit = 4): Tool[] {
  return TOOLS.filter((t) => t.isTrending).slice(0, limit);
}

export function getRecentlyAddedTools(limit = 4): Tool[] {
  return TOOLS.filter((t) => t.isNew).slice(0, limit);
}

export function getToolOfTheDay(): Tool {
  // Deterministic daily pick based on day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const index = dayOfYear % TOOLS.length;
  return TOOLS[index] || TOOLS[0];
}
