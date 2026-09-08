import { TOOLS } from "@/lib/tools-data";
import { Tool } from "@/types/tool";

export interface Daily3Challenge {
  date: string;
  tools: Tool[];
}

// Deterministic pseudorandom generator seeded by day number
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getDaily3Challenges(customDate?: string): Daily3Challenge {
  const dateStr = customDate || getTodayDateString();

  // Create integer seed from date string: YYYYMMDD
  const seed = parseInt(dateStr.replace(/-/g, ""), 10);

  // Pool 1: High engagement / viral tools
  const viralPool = TOOLS.filter((t) => t.isPopular || t.isTrending);
  // Pool 2: Productivity or utility
  const utilityPool = TOOLS.filter((t) => ["productivity", "finance", "age", "text"].includes(t.category));
  // Pool 3: Fun / Quiz / Game / Random
  const funPool = TOOLS.filter((t) => ["gaming", "random", "love", "personality", "quiz", "ai"].includes(t.category));

  const pick1Index = Math.floor(seededRandom(seed + 1) * viralPool.length);
  const tool1 = viralPool[pick1Index] || TOOLS[0];

  // Tool 2 from utility (different category)
  const remainingUtility = utilityPool.filter(
    (t) => t.category !== tool1.category && t.slug !== tool1.slug
  );
  const pick2Index = Math.floor(seededRandom(seed + 2) * remainingUtility.length);
  const tool2 = remainingUtility[pick2Index] || TOOLS[1];

  // Tool 3 from fun pool (different from both)
  const remainingFun = funPool.filter(
    (t) => t.slug !== tool1.slug && t.slug !== tool2.slug && t.category !== tool1.category
  );
  const pick3Index = Math.floor(seededRandom(seed + 3) * remainingFun.length);
  const tool3 = remainingFun[pick3Index] || TOOLS[2];

  return {
    date: dateStr,
    tools: [tool1, tool2, tool3],
  };
}
