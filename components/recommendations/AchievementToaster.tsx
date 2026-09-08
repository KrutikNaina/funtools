"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, X } from "lucide-react";
import { Achievement } from "@/lib/recommendations/recommendation-types";

export default function AchievementToaster() {
  const [toast, setToast] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleUnlock = (e: Event) => {
      const custom = e as CustomEvent<Achievement>;
      if (custom.detail) {
        setToast(custom.detail);
        const timer = setTimeout(() => {
          setToast(null);
        }, 4500);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("funtools_achievement_unlocked", handleUnlock);
    return () => window.removeEventListener("funtools_achievement_unlocked", handleUnlock);
  }, []);

  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed bottom-6 right-6 z-[140] max-w-sm w-[90vw] p-4 rounded-3xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md flex items-start gap-3 select-none"
      >
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xl shadow-md border border-amber-500/30">
          {toast.icon || "🏆"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Achievement Unlocked!
            </span>
            <button
              onClick={() => setToast(null)}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <h4 className="font-extrabold text-sm text-white truncate mt-0.5">
            {toast.title}
          </h4>
          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
            {toast.description}
          </p>

          <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
            <span>+{toast.xpReward} XP Added to Profile</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
