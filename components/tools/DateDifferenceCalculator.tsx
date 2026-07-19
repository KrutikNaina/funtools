"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [includeEndDate, setIncludeEndDate] = useState(false);

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    let diffMs = Math.abs(end.getTime() - start.getTime());
    if (includeEndDate) {
      diffMs += 86400000;
    }

    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeek = totalDays % 7;
    const totalHours = totalDays * 24;

    // Approximate Years & Months
    const totalMonths = Math.floor(totalDays / 30.4375);
    const years = Math.floor(totalDays / 365.25);
    const monthsAfterYears = Math.floor((totalDays % 365.25) / 30.4375);

    return {
      totalDays,
      totalWeeks,
      remainingDaysInWeek,
      totalHours,
      totalMonths,
      years,
      monthsAfterYears,
    };
  };

  const diff = calculateDifference();

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-yellow-200 dark:border-yellow-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          Time Span Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Date Difference Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Calculate the exact duration, days, weeks, and months between two dates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Date Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <label className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="accent-yellow-500 w-4 h-4 rounded"
            />
            <span>Include end date in calculation (+1 day)</span>
          </label>
        </div>

        {/* Results */}
        {diff ? (
          <div className="p-6 rounded-3xl bg-yellow-500/10 border border-yellow-300 dark:border-yellow-900/50 space-y-4 text-center shadow-lg">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Total Days Difference
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-yellow-600 dark:text-yellow-400">
                {diff.totalDays.toLocaleString()} Days
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Weeks</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{diff.totalWeeks} wks, {diff.remainingDaysInWeek} days</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Hours</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{diff.totalHours.toLocaleString()} hrs</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
