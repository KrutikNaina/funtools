"use client";

import { useState } from "react";
import { Percent, RefreshCw, Copy, Check, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"of" | "change" | "is">("of");

  // Mode 1: What is X% of Y?
  const [xOf, setXOf] = useState<string>("15");
  const [yOf, setYOf] = useState<string>("200");

  // Mode 2: Percentage Change (from A to B)
  const [valFrom, setValFrom] = useState<string>("100");
  const [valTo, setValTo] = useState<string>("150");

  // Mode 3: X is what % of Y?
  const [xIs, setXIs] = useState<string>("45");
  const [yIs, setYIs] = useState<string>("150");

  const [copied, setCopied] = useState(false);

  // Calculations with edge-case protections
  const numXOf = parseFloat(xOf) || 0;
  const numYOf = parseFloat(yOf) || 0;
  const calcOfValue = (numXOf / 100) * numYOf;
  const calcOfFormatted = calcOfValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const numFrom = parseFloat(valFrom);
  const numTo = parseFloat(valTo);
  const isFromZero = numFrom === 0;
  const isFromInvalid = isNaN(numFrom) || isNaN(numTo);
  const diff = !isFromInvalid ? numTo - numFrom : 0;
  const changePct = !isFromInvalid && !isFromZero ? (diff / Math.abs(numFrom)) * 100 : 0;
  const changeFormatted = changePct.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const numXIs = parseFloat(xIs) || 0;
  const numYIs = parseFloat(yIs);
  const isYIsZero = numYIs === 0;
  const isYIsInvalid = isNaN(numYIs);
  const ratioPct = !isYIsInvalid && !isYIsZero ? (numXIs / numYIs) * 100 : 0;
  const ratioFormatted = ratioPct.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    if (mode === "of") {
      setXOf("15");
      setYOf("200");
    } else if (mode === "change") {
      setValFrom("100");
      setValTo("150");
    } else {
      setXIs("45");
      setYIs("150");
    }
  };

  const presets = [5, 10, 15, 20, 25, 50];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-emerald-200 dark:border-emerald-900/40 shadow-xl relative overflow-hidden space-y-6">
      {/* Tool Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Percent className="w-3.5 h-3.5" />
          Interactive Multi-Mode Percentage Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Percentage Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto leading-relaxed">
          Select your calculation mode below to compute percentage of a number, percentage increase or decrease, or value ratios in real time with step-by-step formulas.
        </p>

        {/* Mode Selector Tabs */}
        <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 mt-5 gap-1 border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setMode("of")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              mode === "of"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <span>What is X% of Y?</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("change")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              mode === "change"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <span>% Change (Increase / Decrease)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("is")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              mode === "is"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <span>X is what % of Y?</span>
          </button>
        </div>
      </div>

      {/* Main Calculation Workspace */}
      <div className="max-w-xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* MODE 1: What is X% of Y? */}
        {mode === "of" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mode1-x" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Percentage (%)
                </label>
                <div className="relative">
                  <input
                    id="mode1-x"
                    type="number"
                    step="any"
                    value={xOf}
                    onChange={(e) => setXOf(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="mode1-y" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Total Number (Y)
                </label>
                <input
                  id="mode1-y"
                  type="number"
                  step="any"
                  value={yOf}
                  onChange={(e) => setYOf(e.target.value)}
                  placeholder="e.g. 200"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Quick Preset Percentage Chips */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                Quick Discount &amp; Tip Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setXOf(p.toString())}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                      numXOf === p
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* Result Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-slate-50 dark:to-slate-800/50 border border-emerald-300 dark:border-emerald-900/60 text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block">
                Calculated Amount
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                {calcOfFormatted}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                <strong>{numXOf}%</strong> of <strong>{numYOf}</strong> is equal to <strong>{calcOfFormatted}</strong>.
              </p>

              {/* Step-by-Step Mathematical Explanation */}
              <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/50 text-[11px] text-slate-500 dark:text-slate-400 font-mono space-y-0.5">
                <span className="block font-sans font-bold text-slate-700 dark:text-slate-300">Mathematical Step:</span>
                <span>({numXOf} ÷ 100) × {numYOf} = {numXOf / 100} × {numYOf} = {calcOfFormatted}</span>
              </div>
            </div>

            {/* Actions: Copy & Reset */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleCopy(`${numXOf}% of ${numYOf} = ${calcOfFormatted}`)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Result!" : "Copy Result"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                title="Reset to default values"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: Percentage Change (Increase / Decrease) */}
        {mode === "change" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mode2-from" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Initial / Original Value (From)
                </label>
                <input
                  id="mode2-from"
                  type="number"
                  step="any"
                  value={valFrom}
                  onChange={(e) => setValFrom(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="mode2-to" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Final / New Value (To)
                </label>
                <input
                  id="mode2-to"
                  type="number"
                  step="any"
                  value={valTo}
                  onChange={(e) => setValTo(e.target.value)}
                  placeholder="e.g. 150"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Result Card */}
            <div
              className={`p-5 rounded-2xl border text-center space-y-2 ${
                isFromZero
                  ? "bg-amber-500/10 border-amber-300 dark:border-amber-900/60"
                  : diff >= 0
                  ? "bg-emerald-500/10 border-emerald-300 dark:border-emerald-900/60"
                  : "bg-rose-500/10 border-rose-300 dark:border-rose-900/60"
              }`}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
                Percentage Change Result
              </span>

              {isFromZero ? (
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                    Undefined
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium max-w-sm mx-auto">
                    Percentage change cannot be calculated when the starting baseline is 0, because dividing by zero is mathematically undefined.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    {diff > 0 && <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
                    {diff < 0 && <TrendingDown className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
                    {diff === 0 && <Minus className="w-6 h-6 text-slate-500" />}
                    <h3
                      className={`text-3xl sm:text-4xl font-black ${
                        diff > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : diff < 0
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {diff > 0 ? `+${changeFormatted}%` : `${changeFormatted}%`}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Moving from <strong>{numFrom}</strong> to <strong>{numTo}</strong> is a{" "}
                    <strong className={diff > 0 ? "text-emerald-600 dark:text-emerald-400" : diff < 0 ? "text-rose-600 dark:text-rose-400" : ""}>
                      {diff > 0 ? "percentage increase" : diff < 0 ? "percentage decrease" : "zero change"}
                    </strong>{" "}
                    of <strong>{Math.abs(changePct).toFixed(2)}%</strong> (absolute difference: {diff > 0 ? `+${diff}` : diff}).
                  </p>

                  {/* Step-by-Step Mathematical Explanation */}
                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 font-mono space-y-0.5">
                    <span className="block font-sans font-bold text-slate-700 dark:text-slate-300">Mathematical Step:</span>
                    <span>(({numTo} − {numFrom}) ÷ |{numFrom}|) × 100 = ({diff} ÷ {Math.abs(numFrom)}) × 100 = {changeFormatted}%</span>
                  </div>
                </>
              )}
            </div>

            {/* Actions: Copy & Reset */}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={isFromZero}
                onClick={() =>
                  handleCopy(
                    `From ${numFrom} to ${numTo}: ${diff > 0 ? `+${changeFormatted}% Increase` : `${changeFormatted}% Decrease`}`
                  )
                }
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Result!" : "Copy Result"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                title="Reset to default values"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: X is what % of Y? */}
        {mode === "is" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mode3-x" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Portion / Part (X)
                </label>
                <input
                  id="mode3-x"
                  type="number"
                  step="any"
                  value={xIs}
                  onChange={(e) => setXIs(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="mode3-y" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Whole / Total (Y)
                </label>
                <input
                  id="mode3-y"
                  type="number"
                  step="any"
                  value={yIs}
                  onChange={(e) => setYIs(e.target.value)}
                  placeholder="e.g. 150"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Result Card */}
            <div
              className={`p-5 rounded-2xl border text-center space-y-2 ${
                isYIsZero
                  ? "bg-amber-500/10 border-amber-300 dark:border-amber-900/60"
                  : "bg-emerald-500/10 border-emerald-300 dark:border-emerald-900/60"
              }`}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
                Ratio Percentage Result
              </span>

              {isYIsZero ? (
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                    Undefined
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium max-w-sm mx-auto">
                    Cannot calculate what percentage a number is of 0, because dividing by zero is mathematically undefined.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                    {ratioFormatted}%
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <strong>{numXIs}</strong> is <strong>{ratioFormatted}%</strong> of total <strong>{numYIs}</strong>.
                  </p>

                  {/* Step-by-Step Mathematical Explanation */}
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/50 text-[11px] text-slate-500 dark:text-slate-400 font-mono space-y-0.5">
                    <span className="block font-sans font-bold text-slate-700 dark:text-slate-300">Mathematical Step:</span>
                    <span>({numXIs} ÷ {numYIs}) × 100 = {(numXIs / numYIs).toFixed(4)} × 100 = {ratioFormatted}%</span>
                  </div>
                </>
              )}
            </div>

            {/* Actions: Copy & Reset */}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={isYIsZero}
                onClick={() => handleCopy(`${numXIs} is ${ratioFormatted}% of ${numYIs}`)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Result!" : "Copy Result"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                title="Reset to default values"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
