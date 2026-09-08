import { TOOLS } from "@/lib/tools-data";
import { Tool } from "@/types/tool";
import { TOOL_AFFINITY_MAP } from "./recommendations/tool-affinity";

export * from "./recommendations/recommendation-types";
export * from "./recommendations/event-bus";
export * from "./recommendations/user-profile";
export * from "./recommendations/discovery-score";
export * from "./recommendations/tool-affinity";
export * from "./recommendations/tool-chains";
export * from "./recommendations/daily-challenge";
export * from "./recommendations/achievements";
export * from "./recommendations/recommendation-engine";

export const EXPLICIT_SMART_MAP: Record<string, string[]> = TOOL_AFFINITY_MAP;

export function getToolsBySlugs(slugs: string[]): Tool[] {
  return slugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));
}

export function getRelatedTools(toolSlug: string, limit = 4): Tool[] {
  const currentTool = TOOLS.find((t) => t.slug === toolSlug);
  if (!currentTool) return TOOLS.slice(0, limit);

  const mappedSlugs = TOOL_AFFINITY_MAP[toolSlug] || [];
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
  const mappedSlugs = TOOL_AFFINITY_MAP[toolSlug] || [];

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
