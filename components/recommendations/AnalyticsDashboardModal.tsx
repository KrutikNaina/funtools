"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, X, TrendingUp, Zap, Sparkles, Activity, Layers } from "lucide-react";
import { getAggregateAnalytics, AggregateAnalytics } from "@/lib/recommendations/event-bus";
import { useUserProfile } from "@/lib/recommendations/user-profile";

export function openAnalyticsModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("funtools_open_analytics"));
  }
}

export default function AnalyticsDashboardModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AggregateAnalytics | null>(null);
  const { profile } = useUserProfile();

  useEffect(() => {
    const handleOpen = () => {
      setAnalytics(getAggregateAnalytics());
      setIsOpen(true);
    };

    window.addEventListener("funtools_open_analytics", handleOpen);
    return () => window.removeEventListener("funtools_open_analytics", handleOpen);
  }, []);

  if (!isOpen || !analytics) return null;

  // Calculated Rates
  const toolsPerSession = (
    profile.toolsCompleted.length / Math.max(1, analytics.sessionCount)
  ).toFixed(1);

  const completionRate =
    analytics.toolsViewedCount > 0
      ? `${Math.round((analytics.toolsCompletedCount / analytics.toolsViewedCount) * 100)}%`
      : "100%";

  const shareRate =
    analytics.toolsCompletedCount > 0
      ? `${Math.round((analytics.sharesCount / analytics.toolsCompletedCount) * 100)}%`
      : "0%";

  const surpriseCtr =
    analytics.toolsViewedCount > 0
      ? `${Math.round((analytics.surpriseMeClicks / analytics.toolsViewedCount) * 100)}%`
      : "0%";

  const relatedCtr =
    analytics.toolsViewedCount > 0
      ? `${Math.round((analytics.relatedClicks / analytics.toolsViewedCount) * 100)}%`
      : "0%";

  const topTransitions = Object.entries(analytics.toolTransitions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-200 dark:border-indigo-900/60 space-y-6 text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Discovery & Retention Engine Analytics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time anonymous client-side behavioral metrics
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
              <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                Tools / Session
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {toolsPerSession}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                Completion Rate
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {completionRate}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">
                Related CTR
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {relatedCtr}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">
                Surprise Me CTR
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {surpriseCtr}
              </span>
            </div>
          </div>

          {/* Secondary Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Total Events Tracked:</span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {analytics.totalEvents}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Share Rate:</span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {shareRate}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Challenges Created:</span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {analytics.challengesCreated}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Challenges Completed:</span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {analytics.challengesCompleted}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Daily 3 Progress:</span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {profile.daily3CompletedSlugs.length} / 3 Completed
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Achievements Unlocked:</span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {profile.achievements.length} Badges
              </span>
            </div>
          </div>

          {/* Top Tool Transitions Table */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              Top Next-Tool Transitions (Tool A → Tool B)
            </span>

            {topTransitions.length === 0 ? (
              <p className="text-xs text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                No tool-to-tool transitions recorded yet. Use &quot;What&apos;s Next&quot; or &quot;Keep Exploring&quot; to begin building transitions!
              </p>
            ) : (
              <div className="space-y-1.5">
                {topTransitions.map(([transition, count]) => {
                  const [from, to] = transition.split("->");
                  return (
                    <div
                      key={transition}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{from}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold">{to}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                        {count} times
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-400">
              🔒 Privacy Notice: All analytics are processed strictly client-side. Zero personal information, IP addresses, or private tool inputs are tracked or stored.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
