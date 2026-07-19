"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check, RefreshCw, UserCheck, Shield } from "lucide-react";

const STYLES = [
  { id: "aesthetic", label: "✨ Aesthetic", color: "from-pink-500 to-purple-600" },
  { id: "gaming", label: "⚡ Gaming / Cyber", color: "from-cyan-500 to-blue-600" },
  { id: "cute", label: "🌸 Cute & Cozy", color: "from-rose-400 to-pink-500" },
  { id: "tech", label: "🤖 Tech / Minimal", color: "from-emerald-500 to-teal-600" },
  { id: "anime", label: "🎌 Anime / Vibe", color: "from-violet-500 to-fuchsia-600" },
];

const SUFFIXES: Record<string, string[]> = {
  aesthetic: ["vibe", "soul", "haze", "lunar", "aura", "bloom", "velvet", "cloud", "echo", "mist"],
  gaming: ["x", "pro", "ninja", "god", "vortex", "shadow", "apex", "storm", "strxke", "zero"],
  cute: ["bear", "mochi", "boba", "bunny", "puff", "honey", "peach", "berry", "fairy", "cozy"],
  tech: ["dev", "io", "byte", "code", "node", "sync", "stack", "algo", "core", "grid"],
  anime: ["san", "sama", "kun", "chan", "senpai", "kai", "neko", "kami", "zen", "yuki"],
};

export default function UsernameGenerator() {
  const [keyword, setKeyword] = useState("pixel");
  const [selectedStyle, setSelectedStyle] = useState("aesthetic");
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const generateUsernames = () => {
    const clean = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, "") || "star";
    const list: string[] = [];
    const pool = SUFFIXES[selectedStyle] || SUFFIXES.aesthetic;

    pool.forEach((suf, i) => {
      if (selectedStyle === "aesthetic") {
        list.push(`${clean}.${suf}`);
        list.push(`soft.${clean}`);
        list.push(`${clean}_${suf}`);
      } else if (selectedStyle === "gaming") {
        list.push(`iAm_${clean}`);
        list.push(`${clean}.${suf}`);
        list.push(`x_${clean}_x`);
      } else if (selectedStyle === "cute") {
        list.push(`${clean}.${suf}`);
        list.push(`little_${clean}`);
        list.push(`${clean}Boba`);
      } else if (selectedStyle === "tech") {
        list.push(`${clean}.${suf}`);
        list.push(`get_${clean}`);
        list.push(`${clean}_io`);
      } else {
        list.push(`${clean}_${suf}`);
        list.push(`theReal_${clean}`);
        list.push(`${clean}Vibe`);
      }
    });

    return Array.from(new Set(list)).slice(0, 15);
  };

  const usernames = generateUsernames();

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-fuchsia-200 dark:border-fuchsia-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Aesthetic Handle Generator
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Viral Username Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Generate creative aesthetic usernames for Instagram, TikTok, Discord, and Gaming handles.
        </p>

        {/* Input & Style Controls */}
        <div className="mt-6 space-y-4">
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter your favorite keyword (e.g., lunar, pixel, rose)..."
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-fuchsia-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {STYLES.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStyle(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedStyle === st.id
                    ? `bg-gradient-to-r ${st.color} text-white shadow-md scale-105`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-fuchsia-500"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {usernames.map((name, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCopy(name)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 hover:border-fuchsia-400 transition cursor-pointer shadow-sm group"
          >
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 truncate">
              @{name}
            </span>
            <button
              className={`p-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                copiedName === name
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-fuchsia-500"
              }`}
            >
              {copiedName === name ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <UserCheck className="w-3.5 h-3.5 text-fuchsia-500" />
        <span>Click any username to copy directly to your clipboard</span>
      </div>
    </div>
  );
}
