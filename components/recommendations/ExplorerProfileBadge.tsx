"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Zap, ChevronDown, Trophy, X, Sparkles, CheckCircle2 } from "lucide-react";
import { useUserProfile } from "@/lib/recommendations/user-profile";
import { ACHIEVEMENTS } from "@/lib/recommendations/achievements";

export default function ExplorerProfileBadge() {
  const { profile, mounted, progress } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Header Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 xl:gap-2 px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-200 dark:border-purple-800/60 text-xs font-black text-slate-800 dark:text-slate-200 transition cursor-pointer shadow-xs group shrink-0 whitespace-nowrap"
        title="View Explorer Level & Achievements"
      >
        <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 text-white flex items-center justify-center text-[10px] font-black shadow-xs shrink-0">
          {profile.level}
        </span>
        <span className="hidden xl:inline text-purple-600 dark:text-purple-400 font-extrabold">
          Lvl {profile.level}
        </span>
        <span className="text-[10px] text-slate-400 font-mono hidden 2xl:inline">
          {profile.xp} XP
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400 group-hover:translate-y-0.5 transition shrink-0" />
      </button>

      {/* Popover Dropdown Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[120]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-11 z-[130] w-80 sm:w-96 max-w-[calc(100vw-2rem)] p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                    {profile.level}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Explorer Level {profile.level}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Anonymous Local Player
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Level XP Progress Bar */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Level Progress</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {progress.current} / {progress.max} XP ({progress.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block pt-0.5">
                  Need {progress.max - progress.current} more XP to reach Level {profile.level + 1}
                </span>
              </div>

              {/* Explorer Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Tools Tried</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {profile.toolsCompleted.length}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Categories</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {profile.categoriesExplored.length}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Shared</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {profile.sharedTools.length}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Challenges</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {(profile.challengeHistory || []).length}
                  </span>
                </div>
              </div>

              {/* Achievements Mini List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    Achievements Unlocked ({profile.achievements.length} / {ACHIEVEMENTS.length})
                  </span>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-none">
                  {ACHIEVEMENTS.map((ach) => {
                    const isUnlocked = profile.achievements.includes(ach.id);
                    return (
                      <div
                        key={ach.id}
                        className={`p-2 rounded-xl flex items-center justify-between text-xs border ${
                          isUnlocked
                            ? "bg-emerald-500/10 border-emerald-300/40 text-slate-900 dark:text-white"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-60 text-slate-500"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{ach.icon}</span>
                          <div>
                            <span className="font-bold block text-[11px]">{ach.title}</span>
                            <span className="text-[9px] text-slate-400">{ach.description}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-500 shrink-0">
                          +{ach.xpReward} XP
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
