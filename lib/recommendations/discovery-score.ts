import { Tool } from "@/types/tool";
import { DiscoveryScoreWeights, UserProfile } from "./recommendation-types";
import { AggregateAnalytics } from "./event-bus";

export const DEFAULT_DISCOVERY_WEIGHTS: DiscoveryScoreWeights = {
  completionWeight: 0.30,
  shareWeight: 0.20,
  repeatUsageWeight: 0.15,
  relatedClickWeight: 0.15,
  engagementWeight: 0.10,
  popularityWeight: 0.10,
};

export function calculateToolDiscoveryScore(
  tool: Tool,
  profile?: UserProfile,
  analytics?: AggregateAnalytics,
  weights: DiscoveryScoreWeights = DEFAULT_DISCOVERY_WEIGHTS
): number {
  // 1. Completion signal (0 - 100)
  let completionSignal = 50; // baseline
  if (profile && profile.toolsCompleted.includes(tool.slug)) {
    completionSignal = 95;
  } else if (profile && profile.toolsViewed.includes(tool.slug)) {
    completionSignal = 60;
  }

  // 2. Share signal (0 - 100)
  let shareSignal = 40;
  if (profile && profile.sharedTools.includes(tool.slug)) {
    shareSignal = 100;
  } else if (tool.isPopular) {
    shareSignal = 70;
  }

  // 3. Repeat usage signal (0 - 100)
  let repeatUsageSignal = 30;
  if (profile) {
    const isFavorite = profile.favoriteTools.includes(tool.slug);
    const isRecent = profile.recentTools.includes(tool.slug);
    if (isFavorite) repeatUsageSignal = 100;
    else if (isRecent) repeatUsageSignal = 60;
  }

  // 4. Related-tool CTR signal (0 - 100)
  let relatedClickSignal = 50;
  if (analytics && analytics.relatedClicks > 0) {
    // Check transitions targeting this tool
    let targetCount = 0;
    Object.entries(analytics.toolTransitions).forEach(([transition, count]) => {
      if (transition.endsWith(`->${tool.slug}`)) {
        targetCount += count;
      }
    });
    relatedClickSignal = Math.min(100, 50 + targetCount * 10);
  }

  // 5. Engagement signal (0 - 100)
  let engagementSignal = 50;
  if (tool.features && tool.features.length > 3) engagementSignal += 20;
  if (tool.isFeatured) engagementSignal += 30;
  engagementSignal = Math.min(100, engagementSignal);

  // 6. Recent popularity signal (0 - 100)
  let popularitySignal = 40;
  if (tool.isTrending) popularitySignal += 40;
  if (tool.isPopular) popularitySignal += 20;
  popularitySignal = Math.min(100, popularitySignal);

  // Weighted sum
  const score =
    completionSignal * weights.completionWeight +
    shareSignal * weights.shareWeight +
    repeatUsageSignal * weights.repeatUsageWeight +
    relatedClickSignal * weights.relatedClickWeight +
    engagementSignal * weights.engagementWeight +
    popularitySignal * weights.popularityWeight;

  return Math.round(score);
}
