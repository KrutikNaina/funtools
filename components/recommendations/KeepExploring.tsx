"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Sparkles, Compass } from "lucide-react";
import { Tool } from "@/types/tool";
import { getRecommendations, trackTransition, useUserProfile } from "@/lib/recommendations";
import SurpriseMeButton from "./SurpriseMeButton";

interface KeepExploringProps {
  currentTool: Tool;
  onExploreAnother?: () => void;
  className?: string;
}

export default function KeepExploring({
  currentTool,
  onExploreAnother,
  className = "",
}: KeepExploringProps) {
  const { profile } = useUserProfile();

  const {
    primaryRecommendation,
    relatedRecommendations,
    unexpectedRecommendation,
  } = getRecommendations({
    currentSlug: currentTool.slug,
    userProfile: profile,
    limit: 2,
  });

  const bestNext = primaryRecommendation || relatedRecommendations[0];
  const relatedOne = relatedRecommendations.find((t) => t.id !== bestNext?.id) || relatedRecommendations[0];
  const wildCard = unexpectedRecommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 shadow-xl space-y-6 relative overflow-hidden ${className}`}
    >
      {/* Top Completion Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              🎉 Nice! You completed this tool.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Keep your exploration streak going and unlock more XP!
            </p>
          </div>
        </div>

        <SurpriseMeButton currentSlug={currentTool.slug} variant="pill" />
      </div>

      {/* Keep Exploring Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Keep Exploring
          </span>
          <span className="text-xs text-slate-400">Personalized sequence</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bestNext && (
            <Link
              href={`/tools/${bestNext.slug}`}
              onClick={() => {
                trackTransition(currentTool.slug, bestNext.slug);
                if (onExploreAnother) onExploreAnother();
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500 dark:hover:border-indigo-500 transition group flex items-start gap-3.5"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${bestNext.gradient} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition`}
              >
                <Zap className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-500">
                    1. Best Next Tool
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition truncate">
                  {bestNext.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {bestNext.subtitle || bestNext.description}
                </p>
              </div>
            </Link>
          )}

          {relatedOne && (
            <Link
              href={`/tools/${relatedOne.slug}`}
              onClick={() => {
                trackTransition(currentTool.slug, relatedOne.slug);
                if (onExploreAnother) onExploreAnother();
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-purple-500 dark:hover:border-purple-500 transition group flex items-start gap-3.5"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${relatedOne.gradient} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition`}
              >
                <Zap className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-purple-500">
                    2. Related Tool
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-500 transition" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 transition truncate">
                  {relatedOne.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {relatedOne.subtitle || relatedOne.description}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Something Completely Different */}
      {wildCard && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-300/40 dark:border-amber-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              🤯 Something Completely Different
            </span>
            <h4 className="font-black text-sm text-slate-900 dark:text-white">
              {wildCard.title} ({wildCard.category.toUpperCase()})
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
              {wildCard.description}
            </p>
          </div>

          <Link
            href={`/tools/${wildCard.slug}`}
            onClick={() => {
              trackTransition(currentTool.slug, wildCard.slug);
              if (onExploreAnother) onExploreAnother();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:scale-105 transition shrink-0 flex items-center gap-1.5 shadow-md"
          >
            <span>Try Wildcard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
