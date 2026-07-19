"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Coins, ArrowRight, RefreshCw } from "lucide-react";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"of" | "change" | "is">("of");

  // Mode 1: What is X% of Y?
  const [xOf, setXOf] = useState(15);
  const [yOf, setYOf] = useState(200);

  // Mode 2: Percentage Change (from A to B)
  const [valFrom, setValFrom] = useState(100);
  const [valTo, setValTo] = useState(150);

  // Mode 3: X is what % of Y?
  const [xIs, setXIs] = useState(45);
  const [yIs, setYIs] = useState(150);

  const calcOf = () => ((xOf / 100) * yOf).toFixed(2);
  const calcIs = () => yIs !== 0 ? (((xIs / yIs) * 100)).toFixed(2) : "0";
  const calcChange = () => {
    if (valFrom === 0) return "0";
    const diff = valTo - valFrom;
    const pct = (diff / valFrom) * 100;
    return pct.toFixed(2);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-green-200 dark:border-green-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Percent className="w-3.5 h-3.5" />
          Financial Math Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Ultimate Percentage Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Calculate percent of a number, percentage increase/decrease, and ratios.
        </p>

        {/* Mode Selector */}
        <div className="inline-flex flex-wrap items-center justify-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mt-4 gap-1">
          <button
            onClick={() => setMode("of")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === "of" ? "bg-green-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            What is X% of Y?
          </button>
          <button
            onClick={() => setMode("change")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === "change" ? "bg-green-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            % Change (Increase / Decrease)
          </button>
          <button
            onClick={() => setMode("is")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === "is" ? "bg-green-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            X is what % of Y?
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {mode === "of" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Percentage (%)</label>
                <input
                  type="number"
                  value={xOf}
                  onChange={(e) => setXOf(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Total Number (Y)</label>
                <input
                  type="number"
                  value={yOf}
                  onChange={(e) => setYOf(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-300 dark:border-green-900 text-center">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Result</span>
              <h3 className="text-3xl font-black text-green-600 dark:text-green-400 mt-1">
                {calcOf()}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {xOf}% of {yOf} is equal to {calcOf()}
              </p>
            </div>
          </div>
        )}

        {mode === "change" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">From Value</label>
                <input
                  type="number"
                  value={valFrom}
                  onChange={(e) => setValFrom(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">To Value</label>
                <input
                  type="number"
                  value={valTo}
                  onChange={(e) => setValTo(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-300 dark:border-green-900 text-center">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Percentage Change</span>
              <h3 className="text-3xl font-black text-green-600 dark:text-green-400 mt-1">
                {Number(calcChange()) > 0 ? `+${calcChange()}%` : `${calcChange()}%`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Moving from {valFrom} to {valTo} is a {Number(calcChange()) >= 0 ? "increase" : "decrease"} of {Math.abs(Number(calcChange()))}%.
              </p>
            </div>
          </div>
        )}

        {mode === "is" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Value (X)</label>
                <input
                  type="number"
                  value={xIs}
                  onChange={(e) => setXIs(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Out of (Y)</label>
                <input
                  type="number"
                  value={yIs}
                  onChange={(e) => setYIs(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-300 dark:border-green-900 text-center">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Ratio Percentage</span>
              <h3 className="text-3xl font-black text-green-600 dark:text-green-400 mt-1">
                {calcIs()}%
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {xIs} is {calcIs()}% of total {yIs}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
