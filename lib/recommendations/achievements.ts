import { Achievement, UserProfile } from "./recommendation-types";
import { trackEvent } from "./event-bus";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-tool",
    title: "🎯 First Step",
    description: "Completed your first interactive tool!",
    icon: "🎯",
    xpReward: 50,
    badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-800",
  },
  {
    id: "five-tools",
    title: "🔥 Tool Adventurer",
    description: "Explored 5 distinct micro-tools.",
    icon: "🔥",
    xpReward: 100,
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
  },
  {
    id: "fifteen-tools",
    title: "👑 Master Explorer",
    description: "Completed 15 different tools across GetFunTools.",
    icon: "👑",
    xpReward: 250,
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800",
  },
  {
    id: "five-categories",
    title: "🌈 Horizon Broadener",
    description: "Explored tools in at least 5 different categories.",
    icon: "🌈",
    xpReward: 150,
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800",
  },
  {
    id: "surprise-explorer",
    title: "🎲 Serendipity Seeker",
    description: "Used Surprise Me at least 3 times.",
    icon: "🎲",
    xpReward: 100,
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
  },
  {
    id: "first-share",
    title: "📤 Viral Spark",
    description: "Shared a tool or result with friends.",
    icon: "📤",
    xpReward: 75,
    badgeColor: "bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800",
  },
  {
    id: "speed-demon",
    title: "⚡ Reflex God",
    description: "Tested your reaction speed under pressure.",
    icon: "⚡",
    xpReward: 75,
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
  },
  {
    id: "love-tester",
    title: "❤️ Cosmic Romantic",
    description: "Calculated compatibility in the Love Calculator.",
    icon: "❤️",
    xpReward: 75,
    badgeColor: "bg-pink-500/10 text-pink-600 border-pink-200 dark:border-pink-800",
  },
  {
    id: "quiz-master",
    title: "🧠 Archetype Analyst",
    description: "Discovered your persona in Tech Archetype Quiz.",
    icon: "🧠",
    xpReward: 75,
    badgeColor: "bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-800",
  },
  {
    id: "daily-explorer",
    title: "🎯 Daily Champion",
    description: "Completed all 3 daily challenges in a single day!",
    icon: "🎯",
    xpReward: 200,
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-200 dark:border-teal-800",
  },
  {
    id: "friend-challenger",
    title: "🏆 Friendly Rivalry",
    description: "Created or completed a friend challenge!",
    icon: "🏆",
    xpReward: 150,
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800",
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function checkAndUnlockAchievements(profile: UserProfile): Achievement[] {
  const unlockedNow: Achievement[] = [];
  const currentUnlocked = new Set(profile.achievements || []);

  const checkAndAdd = (id: string, condition: boolean) => {
    if (condition && !currentUnlocked.has(id)) {
      const achievement = getAchievementById(id);
      if (achievement) {
        currentUnlocked.add(id);
        unlockedNow.push(achievement);
      }
    }
  };

  checkAndAdd("first-tool", profile.toolsCompleted.length >= 1);
  checkAndAdd("five-tools", profile.toolsCompleted.length >= 5);
  checkAndAdd("fifteen-tools", profile.toolsCompleted.length >= 15);
  checkAndAdd("five-categories", profile.categoriesExplored.length >= 5);
  checkAndAdd("surprise-explorer", (profile.surpriseCount || 0) >= 3);
  checkAndAdd("first-share", profile.sharedTools.length >= 1);
  checkAndAdd("speed-demon", profile.toolsCompleted.includes("reaction-time-test"));
  checkAndAdd("love-tester", profile.toolsCompleted.includes("love-calculator"));
  checkAndAdd("quiz-master", profile.toolsCompleted.includes("tech-archetype-quiz"));
  checkAndAdd("daily-explorer", profile.daily3CompletedSlugs.length >= 3);
  checkAndAdd("friend-challenger", (profile.challengeHistory || []).length >= 1);

  if (unlockedNow.length > 0) {
    profile.achievements = Array.from(currentUnlocked);
    unlockedNow.forEach((ach) => {
      profile.xp = (profile.xp || 0) + ach.xpReward;
      trackEvent("achievement_unlocked", {
        toolSlug: ach.id,
      });

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("funtools_achievement_unlocked", { detail: ach })
        );
      }
    });
  }

  return unlockedNow;
}
