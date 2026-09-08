"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Clock, Trophy, Flame, Dices } from "lucide-react";
import { TOOLS } from "@/lib/tools-data";
import { Tool } from "@/types/tool";
import { getRecommendations, useUserProfile, getToolsBySlugs } from "@/lib/recommendations";
import SurpriseMeButton from "./SurpriseMeButton";

export default function PersonalizedHomeBanner() {
  const { profile, mounted } = useUserProfile();

  if (!mounted || (profile.toolsViewed.length === 0 && profile.toolsCompleted.length === 0)) {
    return null; // Don't disrupt first-time visitor experience
  }

  const lastSlug = profile.recentTools[0] || profile.toolsViewed[0];
  const {
    primaryRecommendation,
    relatedRecommendations,
    unexpectedRecommendation,
  } = getRecommendations({
    currentSlug: lastSlug,
    userProfile: profile,
    limit: 2,
  });

  const recentToolsList = getToolsBySlugs(profile.recentTools).slice(0, 3);

  // Recommended trio: Related/Primary, Popular/Trending, Unexpected
  const recs: { tag: string; tool: Tool }[] = [];
  if (primaryRecommendation) {
    recs.push({ tag: "Recommended Next", tool: primaryRecommendation });
  }
  if (relatedRecommendations[0] && !recs.some((r) => r.tool.id === relatedRecommendations[0].id)) {
    recs.push({ tag: "Similar Vibe", tool: relatedRecommendations[0] });
  }
  if (unexpectedRecommendation && !recs.some((r) => r.tool.id === unexpectedRecommendation.id)) {
    recs.push({ tag: "Unexpected Discovery", tool: unexpectedRecommendation });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 pt-2 pb-6 space-y-6"
    >
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-slate-900 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow */}
        <div className="absolute top-0 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Discovery &bull; Anonymous</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              👋 Welcome Back, Explorer!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              You&apos;ve completed <span className="font-bold text-amber-400">{profile.toolsCompleted.length} tools</span> and reached <span className="font-bold text-indigo-300">Level {profile.level}</span>. Here is what to explore next:
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SurpriseMeButton currentSlug={lastSlug} variant="pill" className="bg-white/10 text-white border-white/20" />
          </div>
        </div>

        {/* Recommended For You Section */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-300 block">
            ✨ Recommended For You (Based on Your Activity)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recs.map(({ tag, tool }) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-indigo-400 transition group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200">
                    {tag}
                  </span>

                  <div className="flex items-center gap-2.5 pt-1">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shrink-0 shadow-md`}
                    >
                      <Zap className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition line-clamp-1">
                      {tool.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {tool.subtitle || tool.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-indigo-300 group-hover:translate-x-1 transition">
                  <span>Try It</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Continue Exploring & Quick Progress */}
        {recentToolsList.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Continue where you left off:</span>
              <div className="flex flex-wrap items-center gap-2">
                {recentToolsList.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tools/${t.slug}`}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-300 shrink-0">
              <span>🌟 {profile.xp} XP</span>
              <span>🏆 {profile.achievements.length} Badges</span>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
