"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target, CheckCircle2, Circle, ArrowRight, Trophy, Zap, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { getDaily3Challenges, useUserProfile, recordToolShare } from "@/lib/recommendations";

interface DailyThreeProps {
  className?: string;
}

export default function DailyThree({ className = "" }: DailyThreeProps) {
  const { profile } = useUserProfile();
  const daily = getDaily3Challenges();

  const completedCount = daily.tools.filter((t) =>
    profile.daily3CompletedSlugs.includes(t.slug)
  ).length;

  const isAllCompleted = completedCount >= 3;

  const handleShareDaily = () => {
    recordToolShare("daily-3-champion");
    const text = encodeURIComponent(
      `🎯 I completed all 3 Daily Challenges on GetFunTools today! Can you beat my streak? https://getfuntools.app`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div
      className={`w-full p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl space-y-6 relative overflow-hidden ${className}`}
    >
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Progress Ring */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
            <Target className="w-3.5 h-3.5" />
            <span>Daily Quest &bull; Rotates Midnight</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            🎯 Today&apos;s 3 Challenges
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Complete all 3 micro-tools today to earn <span className="text-amber-400 font-bold">+50 XP</span> and unlock the Daily Explorer badge!
          </p>
        </div>

        {/* Progress Counter Pill */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Progress</span>
            <span className="text-2xl font-black text-amber-400">
              {completedCount} <span className="text-slate-400 text-sm font-semibold">/ 3</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm">
            {isAllCompleted ? "🏆" : `${Math.round((completedCount / 3) * 100)}%`}
          </div>
        </div>
      </div>

      {/* 3 Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {daily.tools.map((tool, index) => {
          const isDone = profile.daily3CompletedSlugs.includes(tool.slug);

          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className={`p-4 rounded-2xl border transition group flex flex-col justify-between space-y-3 ${
                isDone
                  ? "bg-emerald-950/40 border-emerald-500/50 text-white"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-400 text-white"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    Challenge #{index + 1}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <Circle className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition line-clamp-1">
                    {tool.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {tool.subtitle || tool.description}
                </p>
              </div>

              <div
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  isDone
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-white/10 group-hover:bg-indigo-600 text-white"
                }`}
              >
                <span>{isDone ? "Play Again" : "Complete Task"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isAllCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <h4 className="font-black text-sm text-emerald-300">
                Daily Explorer Achievement Unlocked!
              </h4>
              <p className="text-xs text-slate-300">
                You explored all 3 tools today and earned 50 bonus XP!
              </p>
            </div>
          </div>

          <button
            onClick={handleShareDaily}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:scale-105 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Achievement</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
