"use client";

import { useState, useMemo, useEffect } from "react";
import { Clock, Calendar, ArrowRightLeft, Sparkles, Check, Info } from "lucide-react";

export default function DateDifferenceCalculator() {
  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [includeEndDate, setIncludeEndDate] = useState(false);

  // Parse string YYYY-MM-DD into UTC epoch timestamp (avoiding local DST jumps)
  const parseUtc = (dateStr: string): number | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    const [year, month, day] = parts;
    return Date.UTC(year, month - 1, day);
  };

  const diff = useMemo(() => {
    const startUtc = parseUtc(startDate);
    const endUtc = parseUtc(endDate);

    if (startUtc === null || endUtc === null) return null;

    const isReversed = endUtc < startUtc;
    const diffMs = Math.abs(endUtc - startUtc);

    // 86,400,000 ms in a standard UTC calendar day
    const baseDays = Math.round(diffMs / 86400000);
    const totalDays = baseDays + (includeEndDate ? 1 : 0);

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeek = totalDays % 7;
    const totalHours = totalDays * 24;

    // Exact calendar breakdown (Years, Months, Days)
    const earlier = isReversed ? endDate : startDate;
    const later = isReversed ? startDate : endDate;
    const [y1, m1, d1] = earlier.split("-").map(Number);
    let [y2, m2, d2] = later.split("-").map(Number);

    if (includeEndDate) {
      // Add 1 day to the later date in UTC
      const nextDate = new Date(Date.UTC(y2, m2 - 1, d2 + 1));
      y2 = nextDate.getUTCFullYear();
      m2 = nextDate.getUTCMonth() + 1;
      d2 = nextDate.getUTCDate();
    }

    let calYears = y2 - y1;
    let calMonths = m2 - m1;
    let calDays = d2 - d1;

    if (calDays < 0) {
      calMonths -= 1;
      // Get number of days in the previous month
      const prevMonthDays = new Date(Date.UTC(y2, m2 - 1, 0)).getUTCDate();
      calDays += prevMonthDays;
    }

    if (calMonths < 0) {
      calYears -= 1;
      calMonths += 12;
    }

    // Check if interval crosses any leap year days (Feb 29)
    const minYear = Math.min(y1, y2);
    const maxYear = Math.max(y1, y2);
    let leapYearsEncountered = 0;
    for (let yr = minYear; yr <= maxYear; yr++) {
      const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0;
      if (isLeap) {
        const feb29 = Date.UTC(yr, 1, 29);
        const minUtc = Math.min(startUtc, endUtc);
        const maxUtc = Math.max(startUtc, endUtc);
        if (feb29 >= minUtc && feb29 <= maxUtc) {
          leapYearsEncountered++;
        }
      }
    }

    return {
      totalDays,
      totalWeeks,
      remainingDaysInWeek,
      totalHours,
      calYears,
      calMonths,
      calDays,
      isReversed,
      sameDay: baseDays === 0,
      leapYearsEncountered,
    };
  }, [startDate, endDate, includeEndDate]);

  // Dispatch completion event for retention engine & profile XP
  useEffect(() => {
    if (diff && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("funtools_event", {
          detail: { name: "tool_complete", toolSlug: "date-difference-calculator" },
        })
      );
    }
  }, [diff]);

  const handleSwap = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  const applyPreset = (preset: "today" | "+7d" | "+30d" | "+90d" | "+1y" | "eoy") => {
    const startUtc = parseUtc(startDate) || parseUtc(todayStr)!;
    const s = new Date(startUtc);

    let targetDate: Date;
    switch (preset) {
      case "today":
        setStartDate(todayStr);
        setEndDate(todayStr);
        return;
      case "+7d":
        targetDate = new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate() + 7));
        break;
      case "+30d":
        targetDate = new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate() + 30));
        break;
      case "+90d":
        targetDate = new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate() + 90));
        break;
      case "+1y":
        targetDate = new Date(Date.UTC(s.getUTCFullYear() + 1, s.getUTCMonth(), s.getUTCDate()));
        break;
      case "eoy":
        targetDate = new Date(Date.UTC(s.getUTCFullYear(), 11, 31));
        break;
    }

    const y = targetDate.getUTCFullYear();
    const m = String(targetDate.getUTCMonth() + 1).padStart(2, "0");
    const d = String(targetDate.getUTCDate()).padStart(2, "0");
    setEndDate(`${y}-${m}-${d}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-5 sm:p-7 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative">
      {/* Header Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Interactive Calculator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Calculate Days Between Dates
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          Select two calendar dates to get the exact days, weeks, calendar breakdown, and hours.
        </p>
      </div>

      {/* Date Pickers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        {/* Start Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              aria-label="Start date"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
            />
          </div>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              aria-label="End date"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Quick Controls Row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {/* Include End Date Checkbox */}
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 select-none py-1">
          <input
            type="checkbox"
            checked={includeEndDate}
            onChange={(e) => setIncludeEndDate(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
          />
          <span>Include end date in calculation (+1 day)</span>
        </label>

        {/* Swap Button */}
        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
          title="Swap start and end dates"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Swap Dates</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          Presets:
        </span>
        <button
          type="button"
          onClick={() => applyPreset("today")}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          Reset to Today
        </button>
        <button
          type="button"
          onClick={() => applyPreset("+7d")}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          +7 Days
        </button>
        <button
          type="button"
          onClick={() => applyPreset("+30d")}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          +30 Days
        </button>
        <button
          type="button"
          onClick={() => applyPreset("+90d")}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          +90 Days
        </button>
        <button
          type="button"
          onClick={() => applyPreset("+1y")}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          +1 Year
        </button>
        <button
          type="button"
          onClick={() => applyPreset("eoy")}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          End of Year
        </button>
      </div>

      {/* Reversed Warning Note */}
      {diff?.isReversed && (
        <div className="mt-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>End date is earlier than start date (measuring backward in time).</span>
          </div>
          <button
            type="button"
            onClick={handleSwap}
            className="font-bold underline cursor-pointer hover:text-amber-900 dark:hover:text-amber-200 shrink-0 ml-2"
          >
            Swap
          </button>
        </div>
      )}

      {/* Results Section */}
      {diff !== null ? (
        <div className="mt-6 space-y-4">
          {/* Primary Result Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 dark:border-indigo-900/60 text-center shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Total Days Difference
            </span>
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
              {diff.totalDays.toLocaleString()} {diff.totalDays === 1 ? "Day" : "Days"}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              From <span className="font-bold text-slate-800 dark:text-slate-200">{startDate}</span> to{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">{endDate}</span>
              {includeEndDate ? " (inclusive of end date)" : " (excluding end date)"}
            </p>
          </div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Weeks & Days */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Weeks &amp; Days
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white block">
                {diff.totalWeeks.toLocaleString()} {diff.totalWeeks === 1 ? "week" : "weeks"}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                + {diff.remainingDaysInWeek} {diff.remainingDaysInWeek === 1 ? "day" : "days"}
              </span>
            </div>

            {/* Calendar Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Calendar Duration
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white block">
                {diff.calYears > 0 && `${diff.calYears}y `}
                {diff.calMonths}m {diff.calDays}d
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {diff.calYears > 0
                  ? `${diff.calYears} yr, ${diff.calMonths} mo, ${diff.calDays} day`
                  : `${diff.calMonths} months, ${diff.calDays} days`}
              </span>
            </div>

            {/* Total Hours */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Total Hours
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white block">
                {diff.totalHours.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                calendar hours
              </span>
            </div>
          </div>

          {/* Leap Year indicator if relevant */}
          {diff.leapYearsEncountered > 0 && (
            <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-indigo-500" />
              <span>
                Includes leap year intercalary day (Feb 29). Total days automatically account for 366-day leap year length.
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center text-slate-400 text-sm">
          Please select valid start and end dates.
        </div>
      )}
    </div>
  );
}
