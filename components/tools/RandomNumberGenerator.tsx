"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dices, RefreshCw, Copy, Check, SortAsc } from "lucide-react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [numbers, setNumbers] = useState<number[]>([12, 45, 67, 89, 93]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    setIsSpinning(true);
    setTimeout(() => {
      let result: number[] = [];
      const range = max - min + 1;

      if (!allowDuplicates && count > range) {
        setNumbers([]);
        setIsSpinning(false);
        return;
      }

      if (!allowDuplicates) {
        const set = new Set<number>();
        while (set.size < count) {
          const rand = Math.floor(Math.random() * range) + min;
          set.add(rand);
        }
        result = Array.from(set);
      } else {
        for (let i = 0; i < count; i++) {
          result.push(Math.floor(Math.random() * range) + min);
        }
      }

      if (sortOrder === "asc") result.sort((a, b) => a - b);
      if (sortOrder === "desc") result.sort((a, b) => b - a);

      setNumbers(result);
      setIsSpinning(false);
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(numbers.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-blue-200 dark:border-blue-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Dices className="w-3.5 h-3.5" />
          RNG Cryptographic Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Random Number Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Generate custom random number sequences, lottery picks, and raffle draws.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Minimum (Min)</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Maximum (Max)</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Quantity to Generate</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
            />
          </div>

          <label className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="accent-blue-500 w-4 h-4 rounded"
            />
            <span>Allow duplicate numbers</span>
          </label>

          <button
            onClick={generateNumbers}
            disabled={isSpinning}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
            <span>Generate Random Numbers</span>
          </button>
        </div>

        {/* Results */}
        <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-300 dark:border-blue-900/50 space-y-4 text-center shadow-lg">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Generated Numbers ({numbers.length})
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 max-h-48 overflow-y-auto p-2">
            {numbers.map((n, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-extrabold text-sm flex items-center justify-center shadow-md border border-blue-200 dark:border-blue-800"
              >
                {n}
              </motion.span>
            ))}
          </div>

          {numbers.length > 0 && (
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Numbers"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
