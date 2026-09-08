"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Bookmark, ArrowUpRight, Heart, Zap, Type, Dices, Coins, Bot, Orbit, BrainCircuit } from "lucide-react";
import { Tool } from "@/types/tool";

import { isFavoriteTool, toggleFavoriteTool } from "@/lib/user-store";
import { trackEvent } from "@/lib/recommendations";

// Icon mapping dictionary
const ICON_MAP: Record<string, any> = {
  HeartHandshake: Heart, Type, Zap, CircleDot: Dices, TrendingUp: Coins, Bot, BrainCircuit, Orbit
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const [bookmarked, setBookmarked] = useState(false);

  // 1. Read bookmark state on mount
  useEffect(() => {
    setBookmarked(isFavoriteTool(tool.slug));
  }, [tool.slug]);

  // 2. Toggle bookmark and persist state
  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavoriteTool(tool.slug);
    setBookmarked(next);
    trackEvent(next ? "tool_bookmarked" : "tool_favorited", {
      toolSlug: tool.slug,
      category: tool.category,
    });
  };

  const IconComponent = ICON_MAP[tool.iconName] || Sparkles;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition cursor-pointer"
    >
      <div>
        {/* SECTION 1: TOP BADGES & BOOKMARK BUTTON */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Category Name */}
            <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {tool.category}
            </span>

            {/* Popular / Viral Badge */}
            {tool.isPopular && (
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-200 dark:border-rose-900/50">
                🔥 Viral
              </span>
            )}

            {/* New Tool Badge */}
            {tool.isNew && (
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-200 dark:border-emerald-900/50">
                ✨ New
              </span>
            )}
          </div>

          {/* Interactive Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition cursor-pointer ${bookmarked
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500"
              }`}
            title={bookmarked ? "Remove Bookmark" : "Save Tool"}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* SECTION 2: TOOL ICON, TITLE & RATING */}
        <div className="flex items-center gap-3.5 mb-3">
          {/* Gradient Icon Box */}
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Title & Stats */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              {tool.title}
            </h3>

          </div>
        </div>

        {/* SECTION 3: DESCRIPTION */}
        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed line-clamp-2 mb-6">
          {tool.description}
        </p>
      </div>

      {/* SECTION 4: ACTION BUTTON (OPEN TOOL) */}
      <Link
        href={`/tools/${tool.slug}`}
        onClick={() =>
          trackEvent("related_tool_clicked", {
            toolSlug: tool.slug,
            category: tool.category,
          })
        }
        className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
      >
        <span>Open Tool</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
      </Link>
    </motion.div>
  );
}
