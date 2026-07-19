"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check, UserCheck, Flame } from "lucide-react";

const VIBES = [
  { id: "cyber", label: "⚡ Cyberpunk", color: "from-cyan-500 to-blue-600" },
  { id: "mythic", label: "🐉 Mythic Legend", color: "from-amber-500 to-purple-600" },
  { id: "cute", label: "🌸 Cute & Cozy", color: "from-pink-400 to-rose-500" },
  { id: "vip", label: "👑 VIP / Executive", color: "from-yellow-400 to-amber-600" },
];

const NICK_POOLS: Record<string, string[]> = {
  cyber: ["NeonPhantom", "ZeroEntropy", "CyberVortex", "GlitchNinja", "PixelWarlock", "SynthPulse", "NetRunner", "ByteBlade"],
  mythic: ["ShadowPhoenix", "CosmicDragon", "AetherKnight", "ValkyriePrime", "TitanStorm", "SolarEmperor", "AstralRider"],
  cute: ["BobaBunny", "HoneyCloud", "VelvetMochi", "PeachFairy", "CozyKitten", "PuffBerry", "StarryPanda"],
  vip: ["LordAesthetic", "ApexFounder", "MaverickPro", "VanguardX", "ZenithMaster", "RoyalNova"],
};

export default function NicknameGenerator() {
  const [name, setName] = useState("Alex");
  const [vibe, setVibe] = useState("cyber");
  const [copiedNick, setCopiedNick] = useState<string | null>(null);

  const generateNicknames = () => {
    const base = name.trim() || "Nova";
    const pool = NICK_POOLS[vibe] || NICK_POOLS.cyber;
    const result: string[] = [];

    pool.forEach((p) => {
      result.push(`${base}_${p}`);
      result.push(`${p}_${base}`);
      result.push(`${base}.${p}`);
    });

    return Array.from(new Set(result)).slice(0, 12);
  };

  const nicks = generateNicknames();

  const handleCopy = (nick: string) => {
    navigator.clipboard.writeText(nick);
    setCopiedNick(nick);
    setTimeout(() => setCopiedNick(null), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-pink-200 dark:border-pink-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Gamer & Social Alias Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Cool Nickname Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Generate epic gamer tags, Discord nicknames, and social media alter-egos.
        </p>

        <div className="mt-6 space-y-4 max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your real name or keyword..."
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-pink-500 shadow-sm"
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            {VIBES.map((vb) => (
              <button
                key={vb.id}
                onClick={() => setVibe(vb.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  vibe === vb.id
                    ? `bg-gradient-to-r ${vb.color} text-white shadow-md scale-105`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-pink-500"
                }`}
              >
                {vb.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {nicks.map((nick, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCopy(nick)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 hover:border-pink-400 transition cursor-pointer shadow-sm group"
          >
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 truncate">
              {nick}
            </span>
            <button
              className={`p-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                copiedNick === nick
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-pink-500"
              }`}
            >
              {copiedNick === nick ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
