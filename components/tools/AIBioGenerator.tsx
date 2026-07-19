"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Copy, Check, RefreshCw, Flame } from "lucide-react";
import confetti from "canvas-confetti";

const STYLES = [
  { id: "genz", name: "Sarcastic Gen-Z", icon: "⚡" },
  { id: "tech", name: "Tech Visionary", icon: "🚀" },
  { id: "aesthetic", name: "Aesthetic Chic", icon: "✨" },
  { id: "executive", name: "Executive Boss", icon: "💼" },
];

const TEMPLATES: Record<string, string[]> = {
  genz: [
    "Professional overthinker & caffeine enthusiast. ☕ Here for a good time, not a long algorithm.",
    "Making mistakes at 120fps. 💫 Probably listening to lo-fi right now.",
    "99% dry humor, 1% iced matcha. ⚡ Do not disturb unless you brought snacks.",
    "Uncertified chaos coordinator. ✨ Living rent-free in the cloud."
  ],
  tech: [
    "Building the future at 3 AM. 🚀 AI, Web3 & minimalist code. Let's disrupt reality.",
    "Turning coffee into shipping features. ☕ Ex-sleep enthusiast, current indie builder.",
    "Obsessed with UX micro-interactions, clean APIs, and mechanical keyboards. ⚡",
    "Prompt Whisperer & Product Strategist. 🔮 0 to 1 builder."
  ],
  aesthetic: [
    "chasing golden hour light ✨ design, espresso & slow living 🌿",
    "minimalist soul. creating quiet moments in a noisy digital world. 🕊️",
    "curator of vibes. 💫 coffee in one hand, camera in the other.",
    "soft palettes & deep thoughts ☁️ based somewhere between Paris & Tokyo."
  ],
  executive: [
    "Scaling products & leading high-growth engineering teams. 💼 Keynote speaker.",
    "Investor, advisor & strategy optimist. 📈 Building sustainable digital ecosystems.",
    "Connecting vision with execution. 🚀 Featured in TechCrunch & Forbes.",
    "Obsessed with customer obsession & 10x leverage. ⚡ Let's connect."
  ]
};

export default function AIBioGenerator() {
  const [style, setStyle] = useState("genz");
  const [keyword, setKeyword] = useState("Designer");
  const [bio, setBio] = useState("");
  const [cloutScore, setCloutScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateBio = () => {
    setLoading(true);
    setCopied(false);

    setTimeout(() => {
      const list = TEMPLATES[style] || TEMPLATES.genz;
      const randomBase = list[Math.floor(Math.random() * list.length)];
      const customBio = keyword.trim()
        ? `${randomBase} | ${keyword.trim()}`
        : randomBase;

      setBio(customBio);
      setCloutScore(Math.floor(Math.random() * 15) + 85); // 85 - 99 Clout
      setLoading(false);

      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 600);
  };

  const handleCopy = () => {
    if (!bio) return;
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-purple-200 dark:border-purple-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Bot className="w-3.5 h-3.5" />
          AI Persona Generator
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Viral Social Bio & Roast Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Pick your vibe, add your role, and generate punchy bios for Instagram, X, TikTok & LinkedIn.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Persona Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-bold border transition ${
                  style === s.id
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20"
                    : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-300"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Your Specialty or Keyword (Optional)
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. Designer, Gamer, Student, Founder"
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
          />
        </div>

        <button
          onClick={generateBio}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-base shadow-lg shadow-purple-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {loading ? "Generating Viral Bio..." : "Generate AI Bio"}
        </button>
      </div>

      <AnimatePresence>
        {bio && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-900/60 shadow-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Generated Bio
              </span>
              {cloutScore && (
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Clout Rating: {cloutScore}/100
                </span>
              )}
            </div>

            <p className="text-base md:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
              {bio}
            </p>

            <button
              onClick={handleCopy}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied to Clipboard!" : "Copy Bio Text"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
