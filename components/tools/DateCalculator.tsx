"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Minus, RefreshCw, Clock } from "lucide-react";

export default function DateCalculator() {
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split("T")[0]);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(30);

  const calculateTargetDate = () => {
    const d = new Date(baseDate);
    if (isNaN(d.getTime())) return null;

    const multiplier = operation === "add" ? 1 : -1;
    d.setFullYear(d.getFullYear() + years * multiplier);
    d.setMonth(d.getMonth() + months * multiplier);
    const totalDays = (weeks * 7 + days) * multiplier;
    d.setDate(d.getDate() + totalDays);

    return d;
  };

  const targetDate = calculateTargetDate();

  const formatDate = (date: Date | null) => {
    if (!date) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-amber-200 dark:border-amber-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5" />
          Calendar Math Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Date Add & Subtract Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Add or subtract days, weeks, months, and years from any starting date.
        </p>

        {/* Operation Selector */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mt-4">
          <button
            onClick={() => setOperation("add")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              operation === "add" ? "bg-amber-500 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Time
          </button>
          <button
            onClick={() => setOperation("subtract")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              operation === "subtract" ? "bg-amber-500 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Minus className="w-3.5 h-3.5" /> Subtract Time
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Years</label>
              <input
                type="number"
                min="0"
                value={years}
                onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Months</label>
              <input
                type="number"
                min="0"
                value={months}
                onChange={(e) => setMonths(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Weeks</label>
              <input
                type="number"
                min="0"
                value={weeks}
                onChange={(e) => setWeeks(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Days</label>
              <input
                type="number"
                min="0"
                value={days}
                onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
              />
            </div>
          </div>
        </div>

        {/* Output Display */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-300 dark:border-amber-900/50 space-y-3 text-center transition shadow-lg">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
            Calculated Target Date
          </span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            {formatDate(targetDate)}
          </h3>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 shadow-sm">
            {operation === "add" ? "Future Target Date" : "Past Target Date"}
          </span>
        </div>
      </div>
    </div>
  );
}
