"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw, Share2, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";

const VIBES = [
  { id: "cosmic", name: "Cosmic Soulmates", emoji: "✨" },
  { id: "spicy", name: "Spicy & Playful", emoji: "🔥" },
  { id: "bestie", name: "Bestie Chemistry", emoji: "🤝" },
  { id: "chaos", name: "Pure Chaotic Fun", emoji: "⚡" },
];

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [vibe, setVibe] = useState("cosmic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    title: string;
    description: string;
    advice: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateLove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      // Deterministic yet fun score algorithm
      const combined = (name1.trim() + name2.trim() + vibe).toLowerCase();
      let charSum = 0;
      for (let i = 0; i < combined.length; i++) {
        charSum += combined.charCodeAt(i);
      }
      const score = 65 + (charSum % 35); // Always 65% - 99% for fun vibes!

      let title = "Cosmic Soulmates!";
      let description = "Your names vibrate on the exact same frequency. The universe approves this duo!";
      let advice = "Plan your next adventure together right now.";

      if (score >= 90) {
        title = "Legendary 100% Match!";
        description = "Instant electric chemistry! You finish each other's sentences and food orders.";
        advice = "Frame this score and send a coffee immediately.";
      } else if (score >= 80) {
        title = "Spicy High Synergy!";
        description = "High energy, laughter, and zero dull moments when you two hang out.";
        advice = "Great balance of fun banter and mutual trust.";
      } else {
        title = "Fun & Dynamic Duo!";
        description = "You bring out the quirky, creative side in one another!";
        advice = "Keep up the playful energy and spontaneous hangouts.";
      }

      setResult({ score, title, description, advice });
      setLoading(false);

      if (score > 75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#8b5cf6", "#3b82f6", "#facc15"]
        });
      }
    }, 800);
  };

  const handleCopy = () => {
    if (!result) return;
    const shareText = `💖 Love Compatibility for ${name1} + ${name2}: ${result.score}% - ${result.title}! Tested on GetFunTools ✨`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-rose-200 dark:border-rose-900/40 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 fill-current" />
          Love & Vibe Meter
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Calculate Your Compatibility
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Enter two names to get your compatibility score and vibe breakdown.
        </p>
      </div>

      <form onSubmit={calculateLove} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              First Person
            </label>
            <input
              type="text"
              required
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Second Person
            </label>
            <input
              type="text"
              required
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="e.g. Taylor"
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Relationship Vibe
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VIBES.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVibe(v.id)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                  vibe === v.id
                    ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20"
                    : "bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-rose-300"
                }`}
              >
                <span>{v.emoji}</span>
                <span>{v.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !name1 || !name2}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-base shadow-lg shadow-rose-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Measuring Cosmic Vibration...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Calculate Vibe Score
            </>
          )}
        </button>
      </form>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="mt-8 pt-6 border-t border-rose-100 dark:border-slate-800 text-center"
          >
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-rose-500"
                  strokeWidth="3.5"
                  strokeDasharray={`${result.score}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${result.score}, 100` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {result.score}%
                </span>
                <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                  Match
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {result.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-md mx-auto">
              {result.description}
            </p>
            <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-3 bg-rose-500/10 py-1.5 px-3 rounded-lg inline-block">
              💡 {result.advice}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied to Clipboard!" : "Copy Result Card"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
