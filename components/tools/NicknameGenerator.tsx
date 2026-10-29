"use client";

import { useState, useId, useTransition, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Share2,
  Dice5,
  X,
  ShieldCheck,
  CheckCheck
} from "lucide-react";

interface VibeOption {
  id: string;
  label: string;
  color: string;
  description: string;
}

const VIBES: VibeOption[] = [
  {
    id: "cyber",
    label: "⚡ Cyberpunk",
    color: "from-cyan-500 to-blue-600",
    description: "Futuristic neon, glitch, netrunning & synth aesthetics",
  },
  {
    id: "mythic",
    label: "🐉 Mythic Legend",
    color: "from-amber-500 to-purple-600",
    description: "Cosmic dragons, astral knights & ancient fantasy lore",
  },
  {
    id: "cute",
    label: "🌸 Cute & Cozy",
    color: "from-pink-400 to-rose-500",
    description: "Sweet pastels, boba, mochi & wholesome profile handles",
  },
  {
    id: "vip",
    label: "👑 VIP / Executive",
    color: "from-yellow-400 to-amber-600",
    description: "Prestigious titles, clan captains & competitive esports handles",
  },
];

const NICK_POOLS: Record<string, string[]> = {
  cyber: [
    "NeonPhantom",
    "ZeroEntropy",
    "CyberVortex",
    "GlitchNinja",
    "PixelWarlock",
    "SynthPulse",
    "NetRunner",
    "ByteBlade",
    "CircuitRider",
    "QuantumShift",
    "EchoStrike",
    "BinaryGhost",
    "TurboViper",
    "DataReaper",
    "MatrixRonin",
    "OverclockX",
    "HyperDrift",
    "NullPointer",
    "WirePhantom",
    "ApexCyber",
    "BitStriker",
    "ChromeShade",
    "LaserHound",
    "CyberSpecter",
    "CodeBreaker",
  ],
  mythic: [
    "ShadowPhoenix",
    "CosmicDragon",
    "AetherKnight",
    "ValkyriePrime",
    "TitanStorm",
    "SolarEmperor",
    "AstralRider",
    "RuneSovereign",
    "FrostHydra",
    "CelestialReaper",
    "ThunderBane",
    "VoidEmperor",
    "MysticGryphon",
    "ArcaneSage",
    "StarWeaver",
    "ChronoTitan",
    "EclipseWolf",
    "DragonHeart",
    "AbyssalKnight",
    "PhantomValkyrie",
    "SolarGuardian",
    "StormBringer",
    "ZenithDrake",
  ],
  cute: [
    "BobaBunny",
    "HoneyCloud",
    "VelvetMochi",
    "PeachFairy",
    "CozyKitten",
    "PuffBerry",
    "StarryPanda",
    "SugarSprout",
    "MarshmallowPip",
    "SweetMatcha",
    "AngelicPaws",
    "DaisyDoodle",
    "CinnamonRoll",
    "SakuraPetal",
    "PastelPixie",
    "ButtercupBee",
    "CottonTaffy",
    "BerryBlush",
    "MilkyOtter",
    "LittlePudding",
    "SnuggleFox",
    "TinyWhiskers",
  ],
  vip: [
    "LordAesthetic",
    "ApexFounder",
    "MaverickPro",
    "VanguardX",
    "ZenithMaster",
    "RoyalNova",
    "SovereignX",
    "CrimsonExecutive",
    "PrimeSenator",
    "MonarchPrime",
    "EliteDirector",
    "TitanVanguard",
    "ImperialAce",
    "SupremeKaiser",
    "VelvetPrestige",
    "GrandMaster",
    "PrestigeBaron",
    "SterlingValor",
    "NobleCommand",
    "ArchonPrime",
  ],
};

const RANDOM_SEEDS = [
  "Nova",
  "Shadow",
  "Luna",
  "Kira",
  "Frost",
  "Ace",
  "Pixel",
  "Vortex",
  "Echo",
  "Blaze",
  "Zoe",
  "Kai",
  "Raven",
  "Ash",
  "Milo",
  "Sky",
  "Storm",
  "Nyx",
];

export default function NicknameGenerator() {
  const inputId = useId();
  const [, startTransition] = useTransition();

  const [name, setName] = useState("Alex");
  const [vibe, setVibe] = useState("cyber");
  const [seedIndex, setSeedIndex] = useState(0);
  const [copiedNick, setCopiedNick] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [shared, setShared] = useState(false);

  // Fallback copy implementation for maximum browser compatibility
  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fallback below
      }
    }
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  };

  // Generate deterministic-yet-shuffleable fresh nicknames
  const generateNicknames = useCallback((): string[] => {
    const rawTrimmed = name.trim();
    const effectiveBase = rawTrimmed.length > 0 ? rawTrimmed : "Nova";
    const pool = NICK_POOLS[vibe] || NICK_POOLS.cyber;

    // Use seedIndex to rotate and shuffle results deterministically
    const rotatedPool = [...pool.slice(seedIndex % pool.length), ...pool.slice(0, seedIndex % pool.length)];

    const results: string[] = [];

    rotatedPool.forEach((word) => {
      // Style 1: Under score suffix
      results.push(`${effectiveBase}_${word}`);
      // Style 2: Prefix underscore
      results.push(`${word}_${effectiveBase}`);
      // Style 3: Clean dot notation
      results.push(`${effectiveBase}.${word}`);
      // Style 4: CamelCase joined (if short enough)
      results.push(`${effectiveBase}${word}`);
    });

    // Deduplicate and return a clean, honest batch of 24 distinct nicknames
    const unique = Array.from(new Set(results));
    return unique.slice(0, 24);
  }, [name, vibe, seedIndex]);

  const nicknames = generateNicknames();

  const handleShuffle = () => {
    startTransition(() => {
      setSeedIndex((prev) => prev + 3);
    });
  };

  const handleRandomSeed = () => {
    startTransition(() => {
      const nextSeed = RANDOM_SEEDS[(seedIndex + 1) % RANDOM_SEEDS.length];
      setName(nextSeed);
      setSeedIndex((prev) => prev + 1);
    });
  };

  const handleClear = () => {
    setName("");
  };

  const handleCopySingle = async (nick: string) => {
    const ok = await copyTextToClipboard(nick);
    if (ok) {
      setCopiedNick(nick);
      setTimeout(() => setCopiedNick(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const textToCopy = nicknames.join("\n");
    const ok = await copyTextToClipboard(textToCopy);
    if (ok) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  const handleShare = async () => {
    const canonicalUrl = "https://www.getfuntools.app/tools/nickname-generator";
    const shareText = `Check out these cool ${VIBES.find((v) => v.id === vibe)?.label || "gaming"} nicknames generated on GetFunTools: ${nicknames.slice(0, 3).join(", ")} and more! Try it free: ${canonicalUrl}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Cool Nickname Generator | GetFunTools",
          text: shareText,
          url: canonicalUrl,
        });
        return;
      } catch {
        // User cancelled or unsupported, fallback to clipboard
      }
    }

    const ok = await copyTextToClipboard(shareText);
    if (ok) {
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const activeVibe = VIBES.find((v) => v.id === vibe) || VIBES[0];

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 md:p-8 glass-card rounded-3xl border border-pink-200 dark:border-pink-900/40 shadow-xl relative overflow-hidden space-y-6">
      {/* Header Info Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Nickname Studio
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cool Nickname Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Create personalized gamer tags, Discord handles, and aesthetic social monikers. Type your name, pick an aesthetic vibe, or generate fresh randomized ideas.
        </p>
      </div>

      {/* Input & Filter Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
        {/* Name / Seed Input Field */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <label htmlFor={inputId} className="cursor-pointer">
              Your Name or Keyword <span className="font-normal text-slate-500">(Optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRandomSeed}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 dark:text-pink-400 hover:underline cursor-pointer"
                title="Populate a random seed keyword"
              >
                <Dice5 className="w-3 h-3" />
                Random Word
              </button>
              {name.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              id={inputId}
              type="text"
              value={name}
              maxLength={24}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex, Nova, Shadow, Luna..."
              aria-label="Seed name or keyword for nickname generation"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 transition shadow-xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400">
              {name.length}/24
            </span>
          </div>
        </div>

        {/* Vibe Selection Buttons */}
        <div>
          <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Select Aesthetic Vibe
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VIBES.map((vb) => {
              const isActive = vibe === vb.id;
              return (
                <button
                  key={vb.id}
                  type="button"
                  onClick={() => setVibe(vb.id)}
                  aria-pressed={isActive}
                  className={`p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center text-center cursor-pointer border ${
                    isActive
                      ? `bg-gradient-to-r ${vb.color} text-white border-transparent shadow-md scale-[1.02]`
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-pink-300 dark:hover:border-pink-800"
                  }`}
                >
                  <span>{vb.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
            {activeVibe.description}
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={handleShuffle}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-extrabold transition shadow-md hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Shuffle &amp; Fresh Ideas</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyAll}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              title="Copy all generated nicknames to clipboard"
            >
              {copiedAll ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied 24!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy All</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              title="Share generated nickname list"
            >
              {shared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Link!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Honest Count & Instructions Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Showing 24 Generated Nicknames
        </span>
        <span className="text-[11px] hidden sm:inline">Click any card to copy</span>
      </div>

      {/* Nicknames Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {nicknames.map((nick) => {
          const isCopied = copiedNick === nick;
          const charLen = nick.length;
          // Platform length guidelines: Valorant (3-16), Discord (up to 32)
          const fitsShortGames = charLen <= 16;

          return (
            <motion.div
              key={nick}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleCopySingle(nick)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopySingle(nick);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Copy nickname ${nick}`}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-400 dark:hover:border-pink-600 transition flex items-center justify-between gap-2 cursor-pointer shadow-xs group focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 truncate">
                  {nick}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    fitsShortGames ? "text-slate-400" : "text-amber-500 dark:text-amber-400"
                  }`}
                  title={
                    fitsShortGames
                      ? "Fits standard 16-character game limits (Valorant, Roblox, Minecraft)"
                      : "Recommended for Discord and platforms supporting up to 32 characters"
                  }
                >
                  {charLen} chars {fitsShortGames ? "• All Games" : "• Discord/Steam"}
                </span>
              </div>

              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className={`p-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  isCopied
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-pink-500 group-hover:bg-pink-50 dark:group-hover:bg-slate-700"
                }`}
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Platform Availability Note */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-start sm:items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 sm:mt-0" />
        <span>
          <strong>Platform Availability Note:</strong> Nicknames are generated algorithmic suggestions. Real-time availability depends on existing registrations on Discord, Roblox, Steam, and Riot Games.
        </span>
      </div>
    </div>
  );
}
