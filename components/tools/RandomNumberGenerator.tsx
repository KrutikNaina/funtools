"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dices,
  RefreshCw,
  Copy,
  Check,
  Trash2,
  SortAsc,
  SortDesc,
  Minus,
  AlertCircle,
} from "lucide-react";

const MAX_QUANTITY = 10_000;

const PRESETS = [
  { label: "1 – 10", min: 1, max: 10 },
  { label: "1 – 50", min: 1, max: 50 },
  { label: "1 – 100", min: 1, max: 100 },
  { label: "1 – 1000", min: 1, max: 1000 },
  { label: "0 – 99", min: 0, max: 99 },
  { label: "🎲 Dice (1–6)", min: 1, max: 6 },
  { label: "🃏 Cards (1–52)", min: 1, max: 52 },
] as const;

function validateInputs(
  min: string,
  max: string,
  qty: string,
  allowDuplicates: boolean
): string | null {
  const minN = Number(min);
  const maxN = Number(max);
  const qtyN = Number(qty);

  if (min.trim() === "" || max.trim() === "" || qty.trim() === "")
    return "Please fill in all fields.";
  if (!Number.isInteger(minN)) return "Minimum must be a whole number.";
  if (!Number.isInteger(maxN)) return "Maximum must be a whole number.";
  if (!Number.isInteger(qtyN) || qtyN < 1) return "Quantity must be at least 1.";
  if (qtyN > MAX_QUANTITY) return `Quantity cannot exceed ${MAX_QUANTITY.toLocaleString()}.`;
  if (minN > maxN) return "Minimum cannot be greater than maximum.";

  if (!allowDuplicates) {
    const rangeSize = maxN - minN + 1;
    if (qtyN > rangeSize) {
      return `You can generate a maximum of ${rangeSize.toLocaleString()} unique number${
        rangeSize === 1 ? "" : "s"
      } from this range (${minN} to ${maxN}).`;
    }
  }

  return null;
}

function generateNums(
  min: number,
  max: number,
  qty: number,
  allowDuplicates: boolean
): number[] {
  const range = max - min + 1;

  if (!allowDuplicates) {
    // Fisher-Yates partial shuffle for unique picks
    const pool: number[] = Array.from({ length: range }, (_, i) => min + i);
    for (let i = 0; i < qty; i++) {
      const j = i + Math.floor(Math.random() * (pool.length - i));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, qty);
  } else {
    return Array.from({ length: qty }, () => Math.floor(Math.random() * range) + min);
  }
}

export default function RandomNumberGenerator() {
  const uid = useId();
  const minId = `${uid}-min`;
  const maxId = `${uid}-max`;
  const qtyId = `${uid}-qty`;
  const dupId = `${uid}-dup`;

  const [minStr, setMinStr] = useState("1");
  const [maxStr, setMaxStr] = useState("100");
  const [qtyStr, setQtyStr] = useState("5");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  const applyPreset = (min: number, max: number) => {
    setMinStr(String(min));
    setMaxStr(String(max));
    setError(null);
  };

  const handleGenerate = () => {
    const err = validateInputs(minStr, maxStr, qtyStr, allowDuplicates);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setGenerating(true);

    // Small delay so the spinner is visible
    setTimeout(() => {
      let result = generateNums(
        Number(minStr),
        Number(maxStr),
        Number(qtyStr),
        allowDuplicates
      );
      if (sortOrder === "asc") result = [...result].sort((a, b) => a - b);
      if (sortOrder === "desc") result = [...result].sort((a, b) => b - a);
      setNumbers(result);
      setGenerating(false);
      setGenerated(true);
    }, 300);
  };

  const handleCopy = async () => {
    if (!numbers.length) return;
    try {
      await navigator.clipboard.writeText(numbers.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const handleClear = () => {
    setNumbers([]);
    setGenerated(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Main Generator Card */}
      <div className="rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-blue-200/60 dark:border-blue-900/40 shadow-2xl overflow-hidden">
        {/* Card header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Dices className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-white font-extrabold text-sm leading-tight">Random Number Generator</p>
            <p className="text-blue-100 text-[11px]">Browser-based pseudorandom — instant results</p>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Quick Ranges */}
          <fieldset>
            <legend className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Quick Ranges
            </legend>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p.min, p.max)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Inputs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor={minId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Minimum
              </label>
              <input
                id={minId}
                type="number"
                value={minStr}
                onChange={(e) => { setMinStr(e.target.value); setError(null); }}
                aria-describedby={error ? `${uid}-error` : undefined}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                placeholder="e.g. 1"
              />
            </div>
            <div>
              <label htmlFor={maxId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Maximum
              </label>
              <input
                id={maxId}
                type="number"
                value={maxStr}
                onChange={(e) => { setMaxStr(e.target.value); setError(null); }}
                aria-describedby={error ? `${uid}-error` : undefined}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                placeholder="e.g. 100"
              />
            </div>
            <div>
              <label htmlFor={qtyId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                How many?
              </label>
              <input
                id={qtyId}
                type="number"
                min="1"
                value={qtyStr}
                onChange={(e) => { setQtyStr(e.target.value); setError(null); }}
                aria-describedby={error ? `${uid}-error` : undefined}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                placeholder="e.g. 5"
              />
            </div>
          </div>

          {/* Options Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Duplicates toggle */}
            <label htmlFor={dupId} className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                id={dupId}
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => { setAllowDuplicates(e.target.checked); setError(null); }}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Allow duplicate numbers</span>
            </label>

            {/* Sort selector */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">Sort:</span>
              <div className="flex gap-1">
                {(["none", "asc", "desc"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setSortOrder(o)}
                    aria-pressed={sortOrder === o}
                    aria-label={o === "none" ? "Original order" : o === "asc" ? "Ascending" : "Descending"}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                      sortOrder === o
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400"
                    }`}
                  >
                    {o === "none" ? (
                      <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : o === "asc" ? (
                      <SortAsc className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <SortDesc className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                id={`${uid}-error`}
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-start gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            aria-label="Generate random numbers"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <RefreshCw className={`w-5 h-5 ${generating ? "animate-spin" : ""}`} aria-hidden="true" />
            Generate Random Numbers
          </button>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800/50 shadow-xl overflow-hidden"
          >
            {/* Results header */}
            <div className="px-6 pt-5 pb-3 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-500 dark:text-blue-400">
                  Your Random Numbers
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5" aria-live="polite">
                  {numbers.length} number{numbers.length !== 1 ? "s" : ""} generated
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!numbers.length}
                  aria-label={copied ? "Copied to clipboard" : "Copy numbers to clipboard"}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {copied ? (
                    <><Check className="w-3.5 h-3.5" aria-hidden="true" /> Copied!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" aria-hidden="true" /> Copy Numbers</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear results"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:text-rose-500 hover:border-rose-300 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Clear
                </button>
              </div>
            </div>

            {/* Number chips */}
            <div
              className="px-6 pb-5 flex flex-wrap gap-2 max-h-72 overflow-y-auto"
              role="region"
              aria-label="Generated numbers"
            >
              {numbers.map((n, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(idx * 0.025, 0.5) }}
                  className="inline-flex items-center justify-center min-w-[3rem] px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-extrabold text-sm shadow border border-blue-100 dark:border-blue-900/60"
                >
                  {n}
                </motion.span>
              ))}
            </div>

            {/* Copied feedback */}
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 pb-4"
                  role="status"
                >
                  ✓ Copied to clipboard
                </motion.p>
              )}
            </AnimatePresence>

            {/* Generate Again */}
            <div className="border-t border-blue-100 dark:border-blue-900/40 px-6 py-3 flex justify-center">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:opacity-90 transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} aria-hidden="true" />
                Generate Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
