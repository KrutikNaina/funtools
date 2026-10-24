"use client";

import { useState } from "react";
import { Activity, ShieldAlert, Check, Copy, RefreshCw, Info } from "lucide-react";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // Metric State (strings for natural input typing + numeric syncing)
  const [heightCm, setHeightCm] = useState<string>("175");
  const [weightKg, setWeightKg] = useState<string>("70");

  // Imperial State
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("9");
  const [weightLbs, setWeightLbs] = useState<string>("154");

  const [copied, setCopied] = useState(false);

  // Parsing & Validation
  const numHeightCm = parseFloat(heightCm);
  const numWeightKg = parseFloat(weightKg);

  const numFeet = parseFloat(heightFeet);
  const numInches = parseFloat(heightInches);
  const numWeightLbs = parseFloat(weightLbs);

  const totalInches = (isNaN(numFeet) ? 0 : numFeet * 12) + (isNaN(numInches) ? 0 : numInches);

  const isMetricValid =
    !isNaN(numHeightCm) &&
    !isNaN(numWeightKg) &&
    numHeightCm > 0 &&
    numWeightKg > 0;

  const isImperialValid =
    !isNaN(numWeightLbs) &&
    numWeightLbs > 0 &&
    totalInches > 0 &&
    (!isNaN(numFeet) || !isNaN(numInches));

  // BMI Math
  let rawBmi = 0;
  let formulaStep = "";

  if (unit === "metric" && isMetricValid) {
    const heightMeters = numHeightCm / 100;
    rawBmi = numWeightKg / (heightMeters * heightMeters);
    formulaStep = `${numWeightKg} kg ÷ (${heightMeters.toFixed(2)} m)² = ${rawBmi.toFixed(1)} kg/m²`;
  } else if (unit === "imperial" && isImperialValid) {
    rawBmi = (numWeightLbs / (totalInches * totalInches)) * 703;
    formulaStep = `703 × ${numWeightLbs} lbs ÷ (${totalInches} in)² = ${rawBmi.toFixed(1)}`;
  }

  const isValid = unit === "metric" ? isMetricValid : isImperialValid;
  const roundedBmi = isValid ? parseFloat(rawBmi.toFixed(1)) : 0;

  // WHO Adult Category Classification based on unrounded numeric BMI
  const getCategory = (val: number) => {
    if (!isValid || val <= 0) {
      return {
        name: "Awaiting Input",
        color: "text-slate-500",
        bg: "bg-slate-500/10 border-slate-300 dark:border-slate-700",
        desc: "Please enter positive numeric measurements for height and weight.",
        rangeId: "none"
      };
    }
    if (val < 18.5) {
      return {
        name: "Underweight",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10 border-amber-300 dark:border-amber-900/60",
        desc: "Below standard weight range (BMI < 18.5).",
        rangeId: "underweight"
      };
    }
    if (val < 25.0) {
      return {
        name: "Healthy Weight",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-300 dark:border-emerald-900/60",
        desc: "Optimal health weight range (BMI 18.5 – 24.9).",
        rangeId: "healthy"
      };
    }
    if (val < 30.0) {
      return {
        name: "Overweight",
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-500/10 border-orange-300 dark:border-orange-900/60",
        desc: "Above standard weight range (BMI 25.0 – 29.9).",
        rangeId: "overweight"
      };
    }
    return {
      name: "Obesity",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10 border-rose-300 dark:border-rose-900/60",
      desc: "Significantly above standard range (BMI ≥ 30.0). Consult a physician for personal guidance.",
      rangeId: "obesity"
    };
  };

  const cat = getCategory(rawBmi);

  const handleCopy = async () => {
    if (!isValid) return;
    const summaryText =
      unit === "metric"
        ? `BMI: ${roundedBmi} (${cat.name}) | Height: ${numHeightCm} cm, Weight: ${numWeightKg} kg | GetFunTools`
        : `BMI: ${roundedBmi} (${cat.name}) | Height: ${numFeet}'${numInches}", Weight: ${numWeightLbs} lbs | GetFunTools`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    if (unit === "metric") {
      setHeightCm("175");
      setWeightKg("70");
    } else {
      setHeightFeet("5");
      setHeightInches("9");
      setWeightLbs("154");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-teal-200 dark:border-teal-900/40 shadow-xl relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Activity className="w-3.5 h-3.5" />
          Interactive Adult Health Screening
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Body Mass Index (BMI) Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto leading-relaxed">
          Enter your height and weight in metric or imperial units to calculate your adult BMI score and view standard World Health Organization health categories.
        </p>

        {/* Unit Selector Toggle */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 mt-5 border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              unit === "metric"
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              unit === "imperial"
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
            }`}
          >
            Imperial (ft &amp; in / lbs)
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input Controls */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          {unit === "metric" ? (
            <>
              {/* Metric Height */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label htmlFor="metric-height-input">Height (Centimetres)</label>
                  <div className="flex items-center gap-1">
                    <input
                      id="metric-height-input"
                      type="number"
                      min="50"
                      max="250"
                      step="any"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="w-20 px-2 py-1 text-right text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-teal-600 dark:text-teal-400 font-extrabold">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={isNaN(numHeightCm) ? 175 : Math.max(120, Math.min(220, numHeightCm))}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  aria-label="Height in centimetres slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* Metric Weight */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label htmlFor="metric-weight-input">Weight (Kilograms)</label>
                  <div className="flex items-center gap-1">
                    <input
                      id="metric-weight-input"
                      type="number"
                      min="20"
                      max="300"
                      step="any"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-20 px-2 py-1 text-right text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-teal-600 dark:text-teal-400 font-extrabold">kg</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={isNaN(numWeightKg) ? 70 : Math.max(30, Math.min(160, numWeightKg))}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  aria-label="Weight in kilograms slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>30 kg</span>
                  <span>95 kg</span>
                  <span>160 kg</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Imperial Height (Feet & Inches) */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Height (Feet &amp; Inches)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="imperial-height-feet" className="block text-[11px] text-slate-500 font-medium mb-1">
                      Feet (ft)
                    </label>
                    <input
                      id="imperial-height-feet"
                      type="number"
                      min="1"
                      max="8"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="imperial-height-inches" className="block text-[11px] text-slate-500 font-medium mb-1">
                      Inches (in)
                    </label>
                    <input
                      id="imperial-height-inches"
                      type="number"
                      min="0"
                      max="11"
                      step="any"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Imperial Weight */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label htmlFor="imperial-weight-input">Weight (Pounds)</label>
                  <div className="flex items-center gap-1">
                    <input
                      id="imperial-weight-input"
                      type="number"
                      min="40"
                      max="600"
                      step="any"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      className="w-20 px-2 py-1 text-right text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-teal-600 dark:text-teal-400 font-extrabold">lbs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="70"
                  max="350"
                  value={isNaN(numWeightLbs) ? 154 : Math.max(70, Math.min(350, numWeightLbs))}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  aria-label="Weight in pounds slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>70 lbs</span>
                  <span>210 lbs</span>
                  <span>350 lbs</span>
                </div>
              </div>
            </>
          )}

          {/* Actions: Copy & Reset */}
          <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              disabled={!isValid}
              onClick={handleCopy}
              className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              title="Copy your BMI calculation to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-200" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Result"}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Reset to default height and weight"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Output Display & Live Result Card */}
        <div
          className={`p-6 rounded-3xl ${cat.bg} border space-y-4 text-center transition shadow-md`}
          aria-live="polite"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
            Calculated Adult BMI Score
          </span>

          {isValid ? (
            <>
              <h3 className={`text-4xl sm:text-5xl font-black ${cat.color}`}>
                {roundedBmi}
              </h3>

              <div className="flex justify-center">
                <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-extrabold ${cat.color} bg-white dark:bg-slate-900 shadow-xs border border-slate-200/50 dark:border-slate-700/50`}>
                  {cat.name}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xs mx-auto">
                {cat.desc}
              </p>

              {/* Mathematical Step Notation */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span className="block font-sans font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                  Calculation Formula:
                </span>
                <span>{formulaStep}</span>
              </div>
            </>
          ) : (
            <div className="py-4 space-y-2">
              <Info className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                Please enter positive measurements above 0 to calculate your Body Mass Index.
              </p>
            </div>
          )}

          {/* Visual Category Reference Bar */}
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Adult Reference Categories (WHO)
            </span>
            <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold">
              <div className={`p-1 rounded ${cat.rangeId === "underweight" ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                &lt; 18.5
              </div>
              <div className={`p-1 rounded ${cat.rangeId === "healthy" ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                18.5–24.9
              </div>
              <div className={`p-1 rounded ${cat.rangeId === "overweight" ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                25–29.9
              </div>
              <div className={`p-1 rounded ${cat.rangeId === "obesity" ? "bg-rose-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                ≥ 30.0
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>General adult screening metric; does not constitute a medical diagnosis.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
