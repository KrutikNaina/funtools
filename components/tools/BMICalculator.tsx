"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Heart, ShieldAlert, Check, RefreshCw } from "lucide-react";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightLbs, setWeightLbs] = useState(154);

  // Calculation
  let bmi = 0;
  if (unit === "metric") {
    const heightMeters = heightCm / 100;
    if (heightMeters > 0) {
      bmi = weightKg / (heightMeters * heightMeters);
    }
  } else {
    const totalInches = heightFeet * 12 + heightInches;
    if (totalInches > 0) {
      bmi = (weightLbs / (totalInches * totalInches)) * 703;
    }
  }

  const roundedBmi = parseFloat(bmi.toFixed(1));

  const getCategory = (val: number) => {
    if (val < 18.5) return { name: "Underweight", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-300", desc: "Below standard weight range." };
    if (val < 25) return { name: "Normal / Healthy Weight", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-300", desc: "Optimal health weight range." };
    if (val < 30) return { name: "Overweight", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-300", desc: "Slightly above recommended weight range." };
    return { name: "Obese Class Range", color: "text-rose-500", bg: "bg-rose-500/10 border-rose-300", desc: "Consult a qualified medical professional for health guidance." };
  };

  const cat = getCategory(roundedBmi);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-teal-200 dark:border-teal-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Activity className="w-3.5 h-3.5" />
          Health Metrics Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Body Mass Index (BMI) Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Calculate your exact Body Mass Index, health category, and healthy weight range.
        </p>

        {/* Unit Selector */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mt-4">
          <button
            onClick={() => setUnit("metric")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
              unit === "metric" ? "bg-teal-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
              unit === "imperial" ? "bg-teal-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Imperial (ft & in / lbs)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Input Controls */}
        <div className="space-y-5">
          {unit === "metric" ? (
            <>
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Height</span>
                  <span className="text-teal-600 font-extrabold">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Weight</span>
                  <span className="text-teal-600 font-extrabold">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Feet</label>
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Inches</label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Weight (lbs)</span>
                  <span className="text-teal-600 font-extrabold">{weightLbs} lbs</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Output Display */}
        <div className={`p-6 rounded-3xl ${cat.bg} border space-y-3 text-center transition shadow-lg`}>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
            Calculated BMI Score
          </span>
          <h3 className={`text-4xl md:text-5xl font-black ${cat.color}`}>
            {roundedBmi}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${cat.color} bg-white dark:bg-slate-900 shadow-sm`}>
            {cat.name}
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {cat.desc}
          </p>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Standard WHO Adult BMI Classification</span>
          </div>
        </div>
      </div>
    </div>
  );
}
