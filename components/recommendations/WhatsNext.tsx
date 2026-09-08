"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, ArrowUpRight } from "lucide-react";
import { Tool } from "@/types/tool";
import { getRecommendations, trackTransition, useUserProfile } from "@/lib/recommendations";
import SurpriseMeButton from "./SurpriseMeButton";

interface WhatsNextProps {
  currentTool: Tool;
  className?: string;
}

export default function WhatsNext({ currentTool, className = "" }: WhatsNextProps) {
  const { profile } = useUserProfile();

  const {
    primaryRecommendation,
    relatedRecommendations,
    unexpectedRecommendation,
    activeChain,
    nextInChain,
  } = getRecommendations({
    currentSlug: currentTool.slug,
    userProfile: profile,
    limit: 3,
  });

  // Pick up to 3 distinct tools to feature
  const candidates: Tool[] = [];
  if (nextInChain && nextInChain.slug !== currentTool.slug) {
    candidates.push(nextInChain);
  } else if (primaryRecommendation && primaryRecommendation.slug !== currentTool.slug) {
    candidates.push(primaryRecommendation);
  }

  relatedRecommendations.forEach((tool) => {
    if (candidates.length < 3 && tool.slug !== currentTool.slug && !candidates.some((c) => c.id === tool.id)) {
      candidates.push(tool);
    }
  });

  if (unexpectedRecommendation && candidates.length < 3 && unexpectedRecommendation.slug !== currentTool.slug) {
    if (!candidates.some((c) => c.id === unexpectedRecommendation.id)) {
      candidates.push(unexpectedRecommendation);
    }
  }

  if (candidates.length === 0) return null;

  return (
    <section
      className={`w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-pink-50/50 dark:from-slate-900/90 dark:via-indigo-950/20 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-900/50 shadow-lg space-y-6 relative overflow-hidden ${className}`}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ What&apos;s Next?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Because you tried <span className="gradient-text-primary">{currentTool.title}</span>...
          </h3>
          {activeChain && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">
              Part of {activeChain.badge}: {activeChain.title}
            </p>
          )}
        </div>

        <SurpriseMeButton currentSlug={currentTool.slug} variant="pill" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {candidates.map((tool, idx) => (
          <motion.div
            key={tool.id}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 transition group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {idx === 0 ? "🌟 Top Pick" : tool.category}
                </span>
                <span className="text-[10px] text-indigo-500 font-bold">Try next →</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-1">
                  {tool.title}
                </h4>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {tool.subtitle || tool.description}
              </p>
            </div>

            <Link
              href={`/tools/${tool.slug}`}
              onClick={() => trackTransition(currentTool.slug, tool.slug)}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 group-hover:bg-indigo-600 group-hover:text-white transition cursor-pointer"
            >
              <span>Play Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
