"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, Sparkles, RotateCw, Plus, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

const PRESETS = [
  { name: "🍕 What to Eat", options: ["Pizza", "Tacos", "Sushi", "Burger", "Ramen", "Salad"] },
  { name: "🎮 Weekend Plan", options: ["Gaming Session", "Movie Night", "Hiking Trip", "Read a Book", "Cafe Chill"] },
  { name: "⚡ Truth or Dare", options: ["Truth 1", "Dare 1", "Truth 2", "Dare 2", "Bonus Spin"] },
];

const WEDGE_COLORS = [
  "#ef4444", // Rose
  "#8b5cf6", // Purple
  "#6366f1", // Indigo
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#14b8a6", // Teal
  "#a855f7", // Violet
  "#84cc16", // Lime
];

export default function DecisionWheel() {
  const [options, setOptions] = useState<string[]>(PRESETS[0].options);
  const [newOption, setNewOption] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [mode, setMode] = useState<"wheel" | "coin">("wheel");
  const [coinResult, setCoinResult] = useState<"HEADS" | "TAILS" | null>(null);
  const [flipping, setFlipping] = useState(false);

  const spinWheel = () => {
    if (spinning || options.length < 2) return;

    setSpinning(true);
    setWinner(null);

    const selectedIndex = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    const targetMidpoint = selectedIndex * sliceAngle + sliceAngle / 2;
    const targetDegree = (360 - targetMidpoint) % 360;
    const currentModulo = rotation % 360;
    const extraDegrees = (targetDegree - currentModulo + 360) % 360;
    const finalDegree = rotation + (5 * 360) + extraDegrees;

    setRotation(finalDegree);

    setTimeout(() => {
      setWinner(options[selectedIndex]);
      setSpinning(false);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }, 4000);
  };

  const flipCoin = () => {
    if (flipping) return;
    setFlipping(true);
    setCoinResult(null);

    setTimeout(() => {
      const res = Math.random() > 0.5 ? "HEADS" : "TAILS";
      setCoinResult(res);
      setFlipping(false);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    }, 1500);
  };

  const addOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOption.trim() || options.length >= 12) return;
    setOptions([...options, newOption.trim()]);
    setNewOption("");
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const numSlices = options.length;
  const sliceAngle = 360 / numSlices;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-blue-200 dark:border-blue-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Dices className="w-3.5 h-3.5" />
          Random Decision Maker
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Ultimate Decision Wheel & Coin Flip
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Spin the wheel of fortune or flip a 3D coin to make quick decisions instantly.
        </p>

        {/* Mode Switcher */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mt-4">
          <button
            onClick={() => setMode("wheel")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === "wheel"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🎡 Spinning Wheel
          </button>
          <button
            onClick={() => setMode("coin")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === "coin"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🪙 3D Coin Flip
          </button>
        </div>
      </div>

      {mode === "wheel" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Wheel Visual Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            {/* Top Pointer Arrow */}
            <div className="z-20 -mb-5 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-rose-500 filter drop-shadow-lg" />

            {/* SVG Wheel Canvas */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full drop-shadow-2xl rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0.99, 0.35, 1)"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {options.map((opt, idx) => {
                  const startAngle = -90 + idx * sliceAngle;
                  const endAngle = -90 + (idx + 1) * sliceAngle;
                  const midAngle = startAngle + sliceAngle / 2;

                  const radStart = (startAngle * Math.PI) / 180;
                  const radEnd = (endAngle * Math.PI) / 180;
                  const radMid = (midAngle * Math.PI) / 180;

                  const r = 145;
                  const cx = 150;
                  const cy = 150;

                  const x1 = cx + r * Math.cos(radStart);
                  const y1 = cy + r * Math.sin(radStart);
                  const x2 = cx + r * Math.cos(radEnd);
                  const y2 = cy + r * Math.sin(radEnd);

                  const largeArcFlag = sliceAngle > 180 ? 1 : 0;
                  const pathData = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

                  // Text position at radius 95
                  const textR = 90;
                  const textX = cx + textR * Math.cos(radMid);
                  const textY = cy + textR * Math.sin(radMid);

                  // Truncate long names for clear rendering inside slice
                  const truncatedName = opt.length > 10 ? opt.substring(0, 8) + "…" : opt;

                  return (
                    <g key={idx}>
                      <path
                        d={pathData}
                        fill={WEDGE_COLORS[idx % WEDGE_COLORS.length]}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill="#FFFFFF"
                        fontSize={numSlices > 8 ? "10" : "12"}
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                        className="select-none filter drop-shadow-sm font-sans"
                      >
                        {truncatedName}
                      </text>
                    </g>
                  );
                })}

                {/* Outer Wheel Rim Ring */}
                <circle cx="150" cy="150" r="146" fill="none" stroke="#FFFFFF" strokeWidth="4" />
              </svg>

              {/* Center Spinning Hub Button */}
              <button
                onClick={spinWheel}
                disabled={spinning}
                className="absolute z-10 w-16 h-16 rounded-full bg-slate-900 text-white font-black text-xs shadow-2xl border-4 border-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition"
              >
                {spinning ? (
                  <RotateCw className="w-6 h-6 animate-spin text-blue-400" />
                ) : (
                  <span className="tracking-wider">SPIN!</span>
                )}
              </button>
            </div>

            {/* Winner Display */}
            <AnimatePresence>
              {winner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-300 dark:border-blue-800 text-center shadow-lg w-full max-w-sm"
                >
                  <span className="text-xs uppercase font-extrabold text-blue-500 tracking-wider">
                    The Wheel Has Spoken!
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    🎉 {winner}
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options Editor & Presets */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase">
                Preset Choice Lists
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setOptions(p.options);
                      setWinner(null);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-500 hover:text-white transition cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase">
                Custom Choices ({options.length}/12)
              </label>
              <form onSubmit={addOption} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add choice..."
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={options.length >= 12}
                  className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <span className="truncate">{opt}</span>
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(idx)}
                        className="text-slate-400 hover:text-rose-500 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Coin Flip Mode */
        <div className="py-8 flex flex-col items-center justify-center space-y-6">
          <motion.div
            animate={{ rotateY: flipping ? 1800 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-600 shadow-2xl flex items-center justify-center text-amber-900 font-black text-2xl"
          >
            {flipping ? "🪙" : coinResult || "FLIP ME"}
          </motion.div>

          <button
            onClick={flipCoin}
            disabled={flipping}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-extrabold text-base shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            {flipping ? "Flipping Coin..." : "Flip 3D Coin"}
          </button>

          {coinResult && !flipping && (
            <div className="text-center">
              <span className="text-xs uppercase font-extrabold text-amber-500 tracking-wider">
                Coin Result
              </span>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                {coinResult === "HEADS" ? "👑 HEADS!" : "⭐ TAILS!"}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
