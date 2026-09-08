import { CategoryId, Tool } from "@/types/tool";

export type TrackingEventType =
  | "tool_view"
  | "tool_start"
  | "tool_complete"
  | "result_generated"
  | "result_copied"
  | "result_shared"
  | "tool_bookmarked"
  | "tool_favorited"
  | "related_tool_clicked"
  | "surprise_me_clicked"
  | "challenge_created"
  | "challenge_started"
  | "challenge_completed"
  | "category_clicked"
  | "collection_clicked"
  | "blog_clicked"
  | "newsletter_signup"
  | "achievement_unlocked"
  | "session_started"
  | "session_returned";

export interface AnalyticsEvent {
  name: TrackingEventType;
  toolSlug?: string;
  category?: string;
  source?: string;
  targetSlug?: string;
  score?: number | string;
  timestamp: number;
}

export interface ChallengeHistoryItem {
  id: string;
  toolSlug: string;
  challengerScore: number | string;
  friendScore?: number | string;
  won?: boolean;
  timestamp: number;
}

export interface UserProfile {
  toolsViewed: string[];
  toolsCompleted: string[];
  categoriesExplored: CategoryId[];
  recentTools: string[];
  favoriteTools: string[];
  sharedTools: string[];
  challengeHistory: ChallengeHistoryItem[];
  achievements: string[];
  sessionCount: number;
  totalToolsCompleted: number;
  xp: number;
  level: number;
  lastActiveTimestamp: number;
  daily3Date: string; // YYYY-MM-DD
  daily3CompletedSlugs: string[];
  surpriseCount: number;
}

export interface DiscoveryScoreWeights {
  completionWeight: number;
  shareWeight: number;
  repeatUsageWeight: number;
  relatedClickWeight: number;
  engagementWeight: number;
  popularityWeight: number;
}

export interface ToolChainStep {
  toolSlug: string;
  title: string;
  teaser: string;
}

export interface ToolChain {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  gradient: string;
  steps: ToolChainStep[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  badgeColor: string;
}

export interface ChallengePayload {
  id: string;
  toolSlug: string;
  toolTitle: string;
  challengerName: string;
  challengerScore: number | string;
  scoreUnit?: string;
  createdAt: number;
}

export interface RecommendationResult {
  primaryRecommendation?: Tool;
  relatedRecommendations: Tool[];
  unexpectedRecommendation?: Tool;
  surpriseRecommendation?: Tool;
  peopleAlsoUsed: Tool[];
  activeChain?: ToolChain;
  nextInChain?: Tool;
}
