"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Smile,
  RefreshCw,
  Share2,
  Check,
  Calendar,
  Clock,
  Zap,
  Coffee,
  Moon,
  Flame,
  HelpCircle,
} from "lucide-react";

export default function DeathCalculator() {
  const [age, setAge] = useState(25);
  const [coffeeCups, setCoffeeCups] = useState(2);
  const [sleepHours, setSleepHours] = useState(7);
  const [laughterLevel, setLaughterLevel] = useState(8);
  const [chaosLevel, setChaosLevel] = useState(4);
  const [copied, setCopied] = useState(false);

  // Entertainment satirical calculation formula
  const baseLifespan = 82;
  const coffeeBonus = coffeeCups * 1.5;
  const sleepBonus = sleepHours >= 7 ? 4 : -3;
  const laughBonus = laughterLevel * 1.2;
  const chaosPenalty = chaosLevel * 0.8;

  const estimatedLifespan = Math.min(
    105,
    Math.max(50, Math.round(baseLifespan + coffeeBonus + sleepBonus + laughBonus - chaosPenalty))
  );

  const remainingYears = Math.max(0, estimatedLifespan - age);
  // Using 365.25 to account for leap years over multiple decades
  const remainingDays = Math.round(remainingYears * 365.25);
  const remainingWeeks = Math.round(remainingDays / 7);
  const remainingMonths = remainingYears * 12;

  const getRank = (years: number) => {
    if (years <= 0) {
      return {
        title: "Living Legend 🌟",
        desc: "You have officially outplayed the cosmic algorithm! Every sunrise is pure bonus XP.",
      };
    }
    if (years > 65) {
      return {
        title: "Immortal Cyber Cactus 🌵",
        desc: "Your caffeine and laughter shield is impenetrable! Thriving on cosmic resilience.",
      };
    }
    if (years > 45) {
      return {
        title: "Vibrant Phoenix 🔥",
        desc: "Living your best life with energetic daily laughter and cosmic vibe balance.",
      };
    }
    if (years > 25) {
      return {
        title: "Chill Sloth 🦥",
        desc: "Pacing comfortably through time with calm, steady energy.",
      };
    }
    return {
      title: "Midnight Debugger 💻",
      desc: "Needs more restorative sleep, outdoor sunshine, and warm boba tea!",
    };
  };

  const rank = getRank(remainingYears);

  const handleReset = () => {
    setAge(25);
    setCoffeeCups(2);
    setSleepHours(7);
    setLaughterLevel(8);
    setChaosLevel(4);
  };

  const handleShare = async () => {
    const canonicalUrl = "https://www.getfuntools.app/tools/death-calculator";
    const shareText = `⏰ I tried the Fun Death Calculator on GetFunTools! My estimated remaining time is ~${remainingDays.toLocaleString()} days (${remainingYears} years) with the rank "${rank.title}". Check yours for free: ${canonicalUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Cosmic Death & Lifespan Calculator",
          text: shareText,
          url: canonicalUrl,
        });
        return;
      } catch (err) {
        // User cancelled or unsupported, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden space-y-6">
      {/* Prominent Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-900/50 flex items-start sm:items-center gap-2.5 text-xs text-amber-700 dark:text-amber-400 font-bold leading-relaxed">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
        <span>
          <strong>100% ENTERTAINMENT ONLY:</strong> This fun lifespan clock uses a fictional, satirical formula. It cannot predict when anyone will die and carries zero medical or statistical validity.
        </span>
      </div>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Smile className="w-3.5 h-3.5" />
          Interactive Lifespan Simulation
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Try the Free Death Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto leading-relaxed">
          Adjust the sliders below to explore your estimated remaining days, discover your playful longevity archetype, and share your results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Sliders Form Controls */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
          {/* Age Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <label htmlFor="age-slider" className="flex items-center gap-1.5 cursor-pointer">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Current Age</span>
              </label>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-mono">
                {age} yrs
              </span>
            </div>
            <input
              id="age-slider"
              type="range"
              min="10"
              max="95"
              step="1"
              value={age}
              aria-label="Current Age"
              aria-valuemin={10}
              aria-valuemax={95}
              aria-valuenow={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>10 yrs</span>
              <span>50 yrs</span>
              <span>95 yrs</span>
            </div>
          </div>

          {/* Coffee Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <label htmlFor="coffee-slider" className="flex items-center gap-1.5 cursor-pointer">
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span>Daily Coffee / Tea</span>
              </label>
              <span className="text-amber-600 dark:text-amber-400 font-extrabold px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-mono">
                {coffeeCups} {coffeeCups === 1 ? "cup" : "cups"}
              </span>
            </div>
            <input
              id="coffee-slider"
              type="range"
              min="0"
              max="8"
              step="1"
              value={coffeeCups}
              aria-label="Daily Coffee or Tea Cups"
              aria-valuemin={0}
              aria-valuemax={8}
              aria-valuenow={coffeeCups}
              onChange={(e) => setCoffeeCups(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>0 (Decaf)</span>
              <span>4 cups</span>
              <span>8 (Rocket fuel)</span>
            </div>
          </div>

          {/* Sleep Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <label htmlFor="sleep-slider" className="flex items-center gap-1.5 cursor-pointer">
                <Moon className="w-3.5 h-3.5 text-purple-500" />
                <span>Nightly Sleep</span>
              </label>
              <span className="text-purple-600 dark:text-purple-400 font-extrabold px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-mono">
                {sleepHours} hrs
              </span>
            </div>
            <input
              id="sleep-slider"
              type="range"
              min="3"
              max="12"
              step="1"
              value={sleepHours}
              aria-label="Nightly Sleep Hours"
              aria-valuemin={3}
              aria-valuemax={12}
              aria-valuenow={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>3 hrs</span>
              <span>7 hrs (Sweet spot)</span>
              <span>12 hrs</span>
            </div>
          </div>

          {/* Laughter Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <label htmlFor="laughter-slider" className="flex items-center gap-1.5 cursor-pointer">
                <Smile className="w-3.5 h-3.5 text-pink-500" />
                <span>Daily Laughter Level</span>
              </label>
              <span className="text-pink-600 dark:text-pink-400 font-extrabold px-2 py-0.5 rounded-lg bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800 text-xs font-mono">
                {laughterLevel}/10
              </span>
            </div>
            <input
              id="laughter-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={laughterLevel}
              aria-label="Daily Laughter Level"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={laughterLevel}
              onChange={(e) => setLaughterLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>1 (Serious)</span>
              <span>5 (Chuckle)</span>
              <span>10 (Giggles & joy)</span>
            </div>
          </div>

          {/* Chaos / Stress Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <label htmlFor="chaos-slider" className="flex items-center gap-1.5 cursor-pointer">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Daily Chaos &amp; Rush</span>
              </label>
              <span className="text-rose-600 dark:text-rose-400 font-extrabold px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs font-mono">
                {chaosLevel}/10
              </span>
            </div>
            <input
              id="chaos-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={chaosLevel}
              aria-label="Daily Chaos and Rush Level"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={chaosLevel}
              onChange={(e) => setChaosLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>1 (Zen garden)</span>
              <span>5 (Typical rush)</span>
              <span>10 (Pure entropy)</span>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Sliders to Defaults</span>
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white shadow-2xl space-y-4 border border-indigo-900/60 flex flex-col justify-between">
          <div className="space-y-3 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 block">
              Estimated Remaining Time
            </span>

            {/* Primary Days Count */}
            <div>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                {remainingDays.toLocaleString()}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Estimated Remaining Days
              </span>
            </div>

            {/* Conversions Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Weeks</span>
                <span className="text-sm font-black text-white">{remainingWeeks.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Months</span>
                <span className="text-sm font-black text-white">{remainingMonths.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Years</span>
                <span className="text-sm font-black text-white">{remainingYears}</span>
              </div>
            </div>

            <p className="text-xs text-indigo-200/90 font-medium pt-1">
              Fictional Lifespan Cap: <strong className="text-white font-bold">{estimatedLifespan} yrs</strong> (Current Age: {age})
            </p>
          </div>

          {/* Longevity Archetype Badge */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-300">
                Longevity Archetype
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Humor Rank</span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
              {rank.title}
            </h4>
            <p className="text-xs text-indigo-100/80 leading-relaxed">{rank.desc}</p>
          </div>

          {/* Share Action Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-xs transition cursor-pointer shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied Result Link to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Your Remaining Days Result</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
