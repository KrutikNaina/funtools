"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Dices, X, ArrowRight, RefreshCw, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { Tool } from "@/types/tool";
import { getSurpriseTool, recordSurpriseMe, useUserProfile } from "@/lib/recommendations";

export function openSurpriseMe(currentSlug?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("funtools_open_surprise", { detail: { currentSlug } })
    );
  }
}

export default function SurpriseMeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [sourceSlug, setSourceSlug] = useState<string | undefined>(undefined);
  const [isSpinning, setIsSpinning] = useState(false);
  const { profile } = useUserProfile();

  const pickNewSurprise = useCallback(
    (srcSlug?: string) => {
      setIsSpinning(true);
      recordSurpriseMe();

      setTimeout(() => {
        const picked = getSurpriseTool({
          currentSlug: srcSlug || sourceSlug,
          userProfile: profile,
          excludeSlugs: currentTool ? [currentTool.slug] : [],
        });
        setCurrentTool(picked);
        setIsSpinning(false);

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ["#6366f1", "#a855f7", "#ec4899", "#f59e0b"],
        });
      }, 350);
    },
    [currentTool, profile, sourceSlug]
  );

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const custom = e as CustomEvent<{ currentSlug?: string }>;
      const src = custom.detail?.currentSlug;
      setSourceSlug(src);
      setIsOpen(true);
      pickNewSurprise(src);
    };

    window.addEventListener("funtools_open_surprise", handleOpen);
    return () => window.removeEventListener("funtools_open_surprise", handleOpen);
  }, [pickNewSurprise]);

  if (!isOpen || !currentTool) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-200 dark:border-indigo-900/60 relative overflow-hidden text-center space-y-6"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Tag */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Controlled Serendipity
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              🎉 We picked something for you!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Curated by the discovery engine based on popularity, variety, and surprise.
            </p>
          </div>

          {/* Tool Card Highlight */}
          <motion.div
            key={currentTool.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4 text-left transition-all ${
              isSpinning ? "opacity-30 scale-95 blur-[1px]" : "opacity-100 scale-100"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentTool.gradient} text-white flex items-center justify-center shadow-lg shrink-0`}
              >
                <Zap className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {currentTool.category}
                </span>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white truncate mt-1">
                  {currentTool.title}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
              {currentTool.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/tools/${currentTool.slug}`}
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Try It Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => pickNewSurprise()}
              disabled={isSpinning}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin" : ""}`} />
              <span>🎲 Surprise Me Again</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
