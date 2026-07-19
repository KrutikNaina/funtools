"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Smile, RefreshCw, Heart, Sparkles, AlertCircle } from "lucide-react";

export default function DeathCalculator() {
  const [age, setAge] = useState(25);
  const [coffeeCups, setCoffeeCups] = useState(2);
  const [sleepHours, setSleepHours] = useState(7);
  const [laughterLevel, setLaughterLevel] = useState(8);
  const [chaosLevel, setChaosLevel] = useState(4);

  // Entertainment calculation formula
  const baseLifespan = 82;
  const coffeeBonus = coffeeCups * 1.5;
  const sleepBonus = sleepHours >= 7 ? 4 : -3;
  const laughBonus = laughterLevel * 1.2;
  const chaosPenalty = chaosLevel * 0.8;

  const estimatedLifespan = Math.min(105, Math.max(50, Math.round(baseLifespan + coffeeBonus + sleepBonus + laughBonus - chaosPenalty)));
  const remainingYears = Math.max(0, estimatedLifespan - age);
  const remainingDays = remainingYears * 365;

  const getRank = (years: number) => {
    if (years > 65) return { title: "Immortal Cyber Cactus 🌵", desc: "Your caffeine and laughter shield is impenetrable!" };
    if (years > 45) return { title: "Vibrant Phoenix 🔥", desc: "Living your best life with cosmic energy balance." };
    if (years > 25) return { title: "Chill Sloth 🦥", desc: "Pacing through time comfortably." };
    return { title: "Midnight Debugger 💻", desc: "Needs more sleep, boba, and sunshine!" };
  };

  const rank = getRank(remainingYears);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-slate-700 dark:border-slate-800 shadow-xl relative overflow-hidden">
      {/* Disclaimer Banner */}
      <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-900/50 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <span>ENTERTAINMENT ONLY: This fun lifespan calculator is purely humorous and not medical advice.</span>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Smile className="w-3.5 h-3.5" />
          Humor Longevity Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Cosmic Death & Lifespan Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Adjust your daily coffee, sleep, and humor sliders to calculate your hilarious estimated remaining days on Earth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Current Age</span>
              <span className="text-purple-500 font-extrabold">{age} years</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Daily Coffee / Tea Cups ☕</span>
              <span className="text-purple-500 font-extrabold">{coffeeCups} cups</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              value={coffeeCups}
              onChange={(e) => setCoffeeCups(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Nightly Sleep 😴</span>
              <span className="text-purple-500 font-extrabold">{sleepHours} hours</span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Daily Laughter Level 😂</span>
              <span className="text-purple-500 font-extrabold">{laughterLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={laughterLevel}
              onChange={(e) => setLaughterLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Lifespan Output Card */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white text-center shadow-xl space-y-4 border border-slate-800">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
            Estimated Remaining Time
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-purple-400">
            {remainingDays.toLocaleString()} Days
          </h3>
          <p className="text-xs text-slate-300 font-medium">
            Approx. <strong className="text-white">{remainingYears} years</strong> remaining (Estimated lifespan: {estimatedLifespan} yrs)
          </p>

          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-left space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-400 block">Longevity Archetype</span>
            <h4 className="font-bold text-xs text-white">{rank.title}</h4>
            <p className="text-[11px] text-slate-400">{rank.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
