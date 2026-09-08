"use client";

import { AnalyticsEvent, TrackingEventType } from "./recommendation-types";

const ANALYTICS_STORE_KEY = "funtools_analytics_v1";

export interface AggregateAnalytics {
  totalEvents: number;
  toolsViewedCount: number;
  toolsCompletedCount: number;
  sharesCount: number;
  challengesCreated: number;
  challengesCompleted: number;
  surpriseMeClicks: number;
  relatedClicks: number;
  categoryClicks: number;
  daily3Completions: number;
  achievementsUnlocked: number;
  sessionCount: number;
  toolTransitions: Record<string, number>; // e.g. "toolA->toolB": count
}

const DEFAULT_ANALYTICS: AggregateAnalytics = {
  totalEvents: 0,
  toolsViewedCount: 0,
  toolsCompletedCount: 0,
  sharesCount: 0,
  challengesCreated: 0,
  challengesCompleted: 0,
  surpriseMeClicks: 0,
  relatedClicks: 0,
  categoryClicks: 0,
  daily3Completions: 0,
  achievementsUnlocked: 0,
  sessionCount: 1,
  toolTransitions: {},
};

export function getAggregateAnalytics(): AggregateAnalytics {
  if (typeof window === "undefined") return DEFAULT_ANALYTICS;
  try {
    const raw = localStorage.getItem(ANALYTICS_STORE_KEY);
    if (!raw) return DEFAULT_ANALYTICS;
    return { ...DEFAULT_ANALYTICS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_ANALYTICS;
  }
}

function updateAggregateAnalytics(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  try {
    const data = getAggregateAnalytics();
    data.totalEvents += 1;

    switch (event.name) {
      case "tool_view":
        data.toolsViewedCount += 1;
        break;
      case "tool_complete":
      case "result_generated":
        data.toolsCompletedCount += 1;
        break;
      case "result_shared":
        data.sharesCount += 1;
        break;
      case "challenge_created":
        data.challengesCreated += 1;
        break;
      case "challenge_completed":
        data.challengesCompleted += 1;
        break;
      case "surprise_me_clicked":
        data.surpriseMeClicks += 1;
        break;
      case "related_tool_clicked":
        data.relatedClicks += 1;
        break;
      case "category_clicked":
        data.categoryClicks += 1;
        break;
      case "achievement_unlocked":
        data.achievementsUnlocked += 1;
        break;
      case "session_returned":
        data.sessionCount += 1;
        break;
    }

    if (event.source && event.targetSlug && event.source !== event.targetSlug) {
      const key = `${event.source}->${event.targetSlug}`;
      data.toolTransitions[key] = (data.toolTransitions[key] || 0) + 1;
    }

    localStorage.setItem(ANALYTICS_STORE_KEY, JSON.stringify(data));
  } catch (e) {
    // Fail silently in private browsing or disabled storage
  }
}

export function trackEvent(
  name: TrackingEventType,
  payload?: {
    toolSlug?: string;
    category?: string;
    source?: string;
    targetSlug?: string;
    score?: number | string;
  }
): AnalyticsEvent {
  const event: AnalyticsEvent = {
    name,
    toolSlug: payload?.toolSlug,
    category: payload?.category,
    source: payload?.source,
    targetSlug: payload?.targetSlug,
    score: payload?.score,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    updateAggregateAnalytics(event);
    window.dispatchEvent(new CustomEvent("funtools_event", { detail: event }));
  }

  return event;
}

export function trackTransition(fromSlug: string, toSlug: string) {
  if (!fromSlug || !toSlug || fromSlug === toSlug) return;
  trackEvent("related_tool_clicked", {
    source: fromSlug,
    targetSlug: toSlug,
  });
}
