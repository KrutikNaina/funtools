"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile, ChallengeHistoryItem } from "./recommendation-types";
import { CategoryId } from "@/types/tool";
import { getFavoriteTools, getRecentlyViewedTools } from "@/lib/user-store";
import { trackEvent } from "./event-bus";
import { checkAndUnlockAchievements } from "./achievements";

const PROFILE_KEY = "funtools_profile_v1";

export const XP_CONFIG = {
  toolComplete: 10,
  newCategory: 20,
  share: 15,
  challengeComplete: 20,
  daily3Complete: 50,
  firstToolBonus: 25,
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function calculateLevel(xp: number): number {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

export function getXPProgressToNextLevel(xp: number): { current: number; max: number; percentage: number } {
  const currentLevel = calculateLevel(xp);
  const currentLevelBaseXP = (currentLevel - 1) * 100;
  const current = xp - currentLevelBaseXP;
  const max = 100;
  const percentage = Math.min(100, Math.round((current / max) * 100));
  return { current, max, percentage };
}

export function getDefaultUserProfile(): UserProfile {
  return {
    toolsViewed: [],
    toolsCompleted: [],
    categoriesExplored: [],
    recentTools: [],
    favoriteTools: [],
    sharedTools: [],
    challengeHistory: [],
    achievements: [],
    sessionCount: 1,
    totalToolsCompleted: 0,
    xp: 0,
    level: 1,
    lastActiveTimestamp: Date.now(),
    daily3Date: getTodayString(),
    daily3CompletedSlugs: [],
    surpriseCount: 0,
  };
}

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return getDefaultUserProfile();
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    const favorites = getFavoriteTools();
    const recents = getRecentlyViewedTools();

    if (!raw) {
      const initial = getDefaultUserProfile();
      initial.favoriteTools = favorites;
      initial.recentTools = recents;
      initial.toolsViewed = [...recents];
      return initial;
    }

    const parsed: UserProfile = JSON.parse(raw);
    // Merge favorites & recents from existing store
    parsed.favoriteTools = Array.from(new Set([...(parsed.favoriteTools || []), ...favorites]));
    parsed.recentTools = recents.length > 0 ? recents : parsed.recentTools || [];
    parsed.level = calculateLevel(parsed.xp || 0);

    // Reset daily3 if date changed
    const today = getTodayString();
    if (parsed.daily3Date !== today) {
      parsed.daily3Date = today;
      parsed.daily3CompletedSlugs = [];
    }

    return parsed;
  } catch (e) {
    return getDefaultUserProfile();
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    checkAndUnlockAchievements(profile);
    profile.level = calculateLevel(profile.xp);
    profile.lastActiveTimestamp = Date.now();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("funtools_profile_change"));
  } catch (e) {
    // Fail silently in restricted environment
  }
}

export function addXP(amount: number, reason?: string): { newXP: number; newLevel: number; leveledUp: boolean } {
  const profile = getUserProfile();
  const oldLevel = profile.level;
  profile.xp = (profile.xp || 0) + amount;
  profile.level = calculateLevel(profile.xp);
  const leveledUp = profile.level > oldLevel;
  saveUserProfile(profile);

  if (leveledUp) {
    trackEvent("achievement_unlocked", {
      score: profile.level,
    });
  }

  return { newXP: profile.xp, newLevel: profile.level, leveledUp };
}

export function recordToolView(slug: string, category?: CategoryId): UserProfile {
  const profile = getUserProfile();
  if (!slug) return profile;

  if (!profile.toolsViewed.includes(slug)) {
    profile.toolsViewed.push(slug);
  }

  // Update recent tools
  profile.recentTools = [slug, ...profile.recentTools.filter((s) => s !== slug)].slice(0, 10);

  if (category && !profile.categoriesExplored.includes(category)) {
    profile.categoriesExplored.push(category);
    addXP(XP_CONFIG.newCategory, `Explored category: ${category}`);
  }

  saveUserProfile(profile);
  trackEvent("tool_view", { toolSlug: slug, category });
  return profile;
}

export function recordToolComplete(slug: string, category?: CategoryId, score?: number | string): UserProfile {
  const profile = getUserProfile();
  if (!slug) return profile;

  const isFirstEver = profile.toolsCompleted.length === 0;
  const isFirstTimeThisTool = !profile.toolsCompleted.includes(slug);

  if (isFirstTimeThisTool) {
    profile.toolsCompleted.push(slug);
  }

  profile.totalToolsCompleted = (profile.totalToolsCompleted || 0) + 1;

  // Daily 3 progress
  const today = getTodayString();
  if (profile.daily3Date === today && !profile.daily3CompletedSlugs.includes(slug)) {
    profile.daily3CompletedSlugs.push(slug);
    if (profile.daily3CompletedSlugs.length === 3) {
      addXP(XP_CONFIG.daily3Complete, "Completed Daily 3");
      trackEvent("achievement_unlocked", { toolSlug: "daily-3-master" });
    }
  }

  let xpToAdd = XP_CONFIG.toolComplete;
  if (isFirstEver) xpToAdd += XP_CONFIG.firstToolBonus;
  addXP(xpToAdd, `Completed ${slug}`);

  saveUserProfile(profile);
  trackEvent("tool_complete", { toolSlug: slug, category, score });
  return profile;
}

export function recordToolShare(slug: string): UserProfile {
  const profile = getUserProfile();
  if (!slug) return profile;

  if (!profile.sharedTools.includes(slug)) {
    profile.sharedTools.push(slug);
  }
  addXP(XP_CONFIG.share, `Shared ${slug}`);
  saveUserProfile(profile);
  trackEvent("result_shared", { toolSlug: slug });
  return profile;
}

export function recordSurpriseMe(): UserProfile {
  const profile = getUserProfile();
  profile.surpriseCount = (profile.surpriseCount || 0) + 1;
  saveUserProfile(profile);
  trackEvent("surprise_me_clicked");
  return profile;
}

export function recordChallenge(item: ChallengeHistoryItem): UserProfile {
  const profile = getUserProfile();
  profile.challengeHistory = [item, ...profile.challengeHistory.slice(0, 19)];
  addXP(XP_CONFIG.challengeComplete, "Completed Challenge");
  saveUserProfile(profile);
  trackEvent("challenge_completed", { toolSlug: item.toolSlug });
  return profile;
}

export function recordSessionReturn(): void {
  if (typeof window === "undefined") return;
  const profile = getUserProfile();
  const ONE_HOUR = 60 * 60 * 1000;
  if (Date.now() - profile.lastActiveTimestamp > ONE_HOUR) {
    profile.sessionCount += 1;
    saveUserProfile(profile);
    trackEvent("session_returned");
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(getDefaultUserProfile());
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setProfile(getUserProfile());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();
    recordSessionReturn();

    const handleProfileChange = () => refresh();
    const handleStoreChange = () => refresh();

    window.addEventListener("funtools_profile_change", handleProfileChange);
    window.addEventListener("funtools_user_store_change", handleStoreChange);

    return () => {
      window.removeEventListener("funtools_profile_change", handleProfileChange);
      window.removeEventListener("funtools_user_store_change", handleStoreChange);
    };
  }, [refresh]);

  return {
    profile,
    mounted,
    refresh,
    progress: getXPProgressToNextLevel(profile.xp),
  };
}
