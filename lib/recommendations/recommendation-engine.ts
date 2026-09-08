import { TOOLS } from "@/lib/tools-data";
import { Tool, CategoryId } from "@/types/tool";
import { RecommendationResult, UserProfile } from "./recommendation-types";
import { getCategoryAffinities, getToolAffinitySlugs } from "./tool-affinity";
import { getChainForTool, getNextInChain } from "./tool-chains";
import { calculateToolDiscoveryScore } from "./discovery-score";
import { getAggregateAnalytics } from "./event-bus";

export interface EngineParams {
  currentSlug?: string;
  userProfile?: UserProfile;
  category?: CategoryId;
  limit?: number;
}

export function getRecommendations({
  currentSlug,
  userProfile,
  category,
  limit = 4,
}: EngineParams): RecommendationResult {
  const currentTool = currentSlug ? TOOLS.find((t) => t.slug === currentSlug) : undefined;
  const activeCategory: CategoryId | undefined = category || currentTool?.category;
  const recentSlugs = new Set(userProfile?.recentTools || []);
  const viewedSlugs = new Set(userProfile?.toolsViewed || []);
  const completedSlugs = new Set(userProfile?.toolsCompleted || []);
  const analytics = getAggregateAnalytics();

  // Helper to exclude current tool and duplicates
  const pickedIds = new Set<string>();
  if (currentTool) pickedIds.add(currentTool.id);

  // 1. Tool Chain evaluation
  let activeChain;
  let nextInChain: Tool | undefined;
  if (currentSlug) {
    activeChain = getChainForTool(currentSlug);
    if (activeChain) {
      const nextStep = getNextInChain(activeChain, currentSlug);
      if (nextStep) {
        nextInChain = TOOLS.find((t) => t.slug === nextStep.toolSlug);
      }
    }
  }

  // 2. Primary Recommendation: next in chain OR top affinity tool
  let primaryRecommendation: Tool | undefined;
  if (nextInChain && !pickedIds.has(nextInChain.id)) {
    primaryRecommendation = nextInChain;
    pickedIds.add(nextInChain.id);
  } else if (currentSlug) {
    const affinitySlugs = getToolAffinitySlugs(currentSlug);
    const candidate = affinitySlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter((t): t is Tool => Boolean(t && !pickedIds.has(t.id)))[0];
    if (candidate) {
      primaryRecommendation = candidate;
      pickedIds.add(candidate.id);
    }
  }

  // 3. Related Recommendations (Same Category or High Affinity)
  const relatedRecommendations: Tool[] = [];
  if (currentSlug) {
    const affinitySlugs = getToolAffinitySlugs(currentSlug);
    affinitySlugs.forEach((slug) => {
      if (relatedRecommendations.length >= limit) return;
      const tool = TOOLS.find((t) => t.slug === slug);
      if (tool && !pickedIds.has(tool.id)) {
        relatedRecommendations.push(tool);
        pickedIds.add(tool.id);
      }
    });
  }

  // Fill remaining related from same category
  if (activeCategory && relatedRecommendations.length < limit) {
    const categoryTools = TOOLS.filter(
      (t) => t.category === activeCategory && !pickedIds.has(t.id)
    );
    // Sort category tools by discovery score
    categoryTools.sort((a, b) => {
      const scoreA = calculateToolDiscoveryScore(a, userProfile, analytics);
      const scoreB = calculateToolDiscoveryScore(b, userProfile, analytics);
      return scoreB - scoreA;
    });

    for (const tool of categoryTools) {
      if (relatedRecommendations.length >= limit) break;
      relatedRecommendations.push(tool);
      pickedIds.add(tool.id);
    }
  }

  // Fill with neighboring category tools if still needed
  if (activeCategory && relatedRecommendations.length < limit) {
    const neighborCategories = getCategoryAffinities(activeCategory);
    for (const neighborCat of neighborCategories) {
      const neighborTools = TOOLS.filter(
        (t) => t.category === neighborCat && !pickedIds.has(t.id)
      );
      for (const tool of neighborTools) {
        if (relatedRecommendations.length >= limit) break;
        relatedRecommendations.push(tool);
        pickedIds.add(tool.id);
      }
      if (relatedRecommendations.length >= limit) break;
    }
  }

  // Fallback if still under limit
  if (relatedRecommendations.length < limit) {
    for (const tool of TOOLS) {
      if (relatedRecommendations.length >= limit) break;
      if (!pickedIds.has(tool.id)) {
        relatedRecommendations.push(tool);
        pickedIds.add(tool.id);
      }
    }
  }

  // 4. Unexpected Recommendation: Cross-Category Serendipity
  let unexpectedRecommendation: Tool | undefined;
  if (activeCategory) {
    const neighborCats = new Set(getCategoryAffinities(activeCategory));
    const distantTools = TOOLS.filter(
      (t) =>
        t.category !== activeCategory &&
        !neighborCats.has(t.category) &&
        !pickedIds.has(t.id) &&
        !recentSlugs.has(t.slug)
    );

    if (distantTools.length > 0) {
      // Pick a popular or featured one from distant category
      distantTools.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      unexpectedRecommendation = distantTools[0];
      pickedIds.add(unexpectedRecommendation.id);
    } else {
      const anyOther = TOOLS.find((t) => !pickedIds.has(t.id));
      if (anyOther) {
        unexpectedRecommendation = anyOther;
        pickedIds.add(anyOther.id);
      }
    }
  }

  // 5. Surprise Me Recommendation: Controlled Randomness
  const surpriseRecommendation = getSurpriseTool({
    currentSlug,
    userProfile,
    excludeSlugs: Array.from(pickedIds).map((id) => {
      const tool = TOOLS.find((t) => t.id === id);
      return tool?.slug || "";
    }),
  });

  // 6. People Also Used (Cross-category complementary tools)
  const peopleAlsoUsed: Tool[] = [];
  if (currentSlug) {
    const affinitySlugs = getToolAffinitySlugs(currentSlug);
    // Take affinity tools that are in different categories
    const crossAffinity = affinitySlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter((t): t is Tool => Boolean(t && t.category !== activeCategory));

    for (const tool of crossAffinity) {
      if (peopleAlsoUsed.length >= limit) break;
      if (tool.slug !== currentSlug && !peopleAlsoUsed.some((p) => p.id === tool.id)) {
        peopleAlsoUsed.push(tool);
      }
    }
  }

  // Fill people also used if needed
  if (peopleAlsoUsed.length < limit) {
    const trending = TOOLS.filter(
      (t) =>
        t.slug !== currentSlug &&
        t.category !== activeCategory &&
        !peopleAlsoUsed.some((p) => p.id === t.id)
    );
    for (const tool of trending) {
      if (peopleAlsoUsed.length >= limit) break;
      peopleAlsoUsed.push(tool);
    }
  }

  return {
    primaryRecommendation,
    relatedRecommendations,
    unexpectedRecommendation,
    surpriseRecommendation,
    peopleAlsoUsed,
    activeChain,
    nextInChain,
  };
}

export function getSurpriseTool({
  currentSlug,
  userProfile,
  excludeSlugs = [],
}: {
  currentSlug?: string;
  userProfile?: UserProfile;
  excludeSlugs?: string[];
}): Tool {
  const currentTool = currentSlug ? TOOLS.find((t) => t.slug === currentSlug) : undefined;
  const recentSlugs = new Set([
    ...(userProfile?.recentTools || []),
    ...(excludeSlugs || []),
  ]);
  if (currentSlug) recentSlugs.add(currentSlug);

  // Eligible pool excludes current tool and recent
  let eligible = TOOLS.filter((t) => !recentSlugs.has(t.slug));
  if (eligible.length === 0) {
    eligible = TOOLS.filter((t) => t.slug !== currentSlug);
  }
  if (eligible.length === 0) return TOOLS[0];

  // Controlled Randomness:
  // 70% related / high-engagement
  // 20% trending/popular
  // 10% completely wild/different category
  const roll = Math.random();

  if (roll < 0.70 && currentTool) {
    const neighborCats = getCategoryAffinities(currentTool.category);
    const relatedPool = eligible.filter(
      (t) => t.category === currentTool.category || neighborCats.includes(t.category)
    );
    if (relatedPool.length > 0) {
      const idx = Math.floor(Math.random() * relatedPool.length);
      return relatedPool[idx];
    }
  } else if (roll < 0.90) {
    const popularPool = eligible.filter((t) => t.isPopular || t.isTrending);
    if (popularPool.length > 0) {
      const idx = Math.floor(Math.random() * popularPool.length);
      return popularPool[idx];
    }
  }

  // Random pick from remaining
  const idx = Math.floor(Math.random() * eligible.length);
  return eligible[idx];
}
