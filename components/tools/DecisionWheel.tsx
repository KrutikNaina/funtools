"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, Sparkles, RotateCw, Trash2, Shuffle, ListRestart, Volume2, VolumeX, Maximize, Copy, Download, Trash } from "lucide-react";
import confetti from "canvas-confetti";

const PRESETS = [
  { name: "🍕 What to Eat", options: ["Pizza", "Tacos", "Sushi", "Burger", "Ramen", "Salad", "Pasta", "Thai", "Indian"] },
  { name: "🎮 Movie Picker", options: ["Action", "Comedy", "Sci-Fi", "Horror", "Romance", "Documentary", "Thriller"] },
  { name: "⚡ Truth or Dare", options: ["Truth: Biggest fear?", "Dare: Call a friend", "Truth: Secret crush?", "Dare: 10 pushups", "Truth: Embarrassing moment?"] },
  { name: "🏫 Classroom", options: ["Team A", "Team B", "Team C", "Team D", "Pop Quiz", "Free Time"] }
];

const WEDGE_COLORS = [
  "#ef4444", "#8b5cf6", "#6366f1", "#3b82f6", "#10b981", "#f59e0b",
  "#ec4899", "#06b6d4", "#f97316", "#14b8a6", "#a855f7", "#84cc16",
  "#f43f5e", "#d946ef", "#0ea5e9", "#10b981", "#eab308", "#64748b"
];

export default function DecisionWheel() {
  const [optionsText, setOptionsText] = useState(PRESETS[0].options.join("\n"));
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Parse text area to options array, filtering empties
  const options = optionsText.split("\n").filter(o => o.trim() !== "");
  const numSlices = Math.max(options.length, 1);
  const sliceAngle = 360 / numSlices;

  // Sound effects
  const playTick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, [soundEnabled]);

  const playWin = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, [soundEnabled]);

  const spinWheel = () => {
    if (spinning || options.length < 2) return;

    setSpinning(true);
    setWinner(null);

    const selectedIndex = Math.floor(Math.random() * options.length);
    const targetMidpoint = selectedIndex * sliceAngle + sliceAngle / 2;
    const targetDegree = (360 - targetMidpoint) % 360;
    const currentModulo = rotation % 360;
    const extraDegrees = (targetDegree - currentModulo + 360) % 360;
    
    // Add extra spins
    const finalDegree = rotation + (5 * 360) + extraDegrees;
    setRotation(finalDegree);

    // Approximate tick sounds based on transition time (4000ms)
    if (soundEnabled) {
      let ticks = 0;
      const interval = setInterval(() => {
        if (ticks < 15) playTick();
        ticks++;
        if (ticks >= 20) clearInterval(interval);
      }, 150);
    }

    setTimeout(() => {
      const wonOption = options[selectedIndex];
      setWinner(wonOption);
      setHistory(prev => [wonOption, ...prev].slice(0, 10)); // Keep last 10
      setSpinning(false);
      playWin();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, zIndex: 100 });
    }, 4000);
  };

  const removeWinner = () => {
    if (!winner) return;
    const newOptions = options.filter(o => o !== winner);
    setOptionsText(newOptions.join("\n"));
    setWinner(null);
  };

  const shuffleOptions = () => {
    const array = [...options];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setOptionsText(array.join("\n"));
  };

  const clearOptions = () => {
    if (confirm("Are you sure you want to clear all entries?")) {
      setOptionsText("");
      setWinner(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Preset Library Carousel */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setOptionsText(p.options.join("\n"));
                setWinner(null);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer shadow-sm flex items-center gap-2"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: THE WHEEL */}
        <div className="lg:col-span-7 flex flex-col items-center p-6 md:p-10 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
          
          {/* Wheel Controls Header */}
          <div className="w-full flex justify-between items-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Dices className="w-4 h-4" />
              Ultimate Wheel
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-full border transition ${soundEnabled ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SVG Wheel Canvas */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center my-4">
            {/* Top Pointer Arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-slate-900 dark:border-t-white filter drop-shadow-xl" />

            <svg
              viewBox="0 0 300 300"
              className="w-full h-full drop-shadow-2xl rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0.99, 0.35, 1)"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {options.length > 0 ? options.map((opt, idx) => {
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
                const pathData = options.length === 1 
                  ? `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r*2},0 a ${r},${r} 0 1,0 -${r*2},0`
                  : `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

                const textR = 90;
                const textX = cx + textR * Math.cos(radMid);
                const textY = cy + textR * Math.sin(radMid);
                const truncatedName = opt.length > 18 ? opt.substring(0, 16) + "…" : opt;

                return (
                  <g key={idx}>
                    <path
                      d={pathData}
                      fill={WEDGE_COLORS[idx % WEDGE_COLORS.length]}
                      stroke="#FFFFFF"
                      strokeWidth={options.length > 20 ? "1" : "2"}
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="#FFFFFF"
                      fontSize={numSlices > 12 ? "10" : "14"}
                      fontWeight="800"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      className="select-none filter drop-shadow-md font-sans"
                    >
                      {truncatedName}
                    </text>
                  </g>
                );
              }) : (
                <circle cx="150" cy="150" r="145" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
              )}
              {/* Outer Wheel Rim */}
              <circle cx="150" cy="150" r="146" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="6" />
            </svg>

            {/* Center Spinning Hub Button */}
            <button
              onClick={spinWheel}
              disabled={spinning || options.length < 2}
              className="absolute z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm md:text-base shadow-[0_0_40px_rgba(0,0,0,0.2)] border-8 border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {spinning ? (
                <RotateCw className="w-8 h-8 animate-spin text-indigo-500" />
              ) : (
                <span className="tracking-widest uppercase">Spin</span>
              )}
            </button>
          </div>

          {/* Winner Display Area */}
          <div className="h-32 w-full mt-6 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {winner ? (
                <motion.div
                  key="winner"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="w-full bg-indigo-500 text-white p-6 rounded-3xl shadow-xl shadow-indigo-500/20 text-center relative overflow-hidden"
                >
                  {/* Decorative shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  
                  <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest block mb-1">
                    Winner
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black break-words">
                    {winner}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button 
                      onClick={() => navigator.clipboard.writeText(winner)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                    <button 
                      onClick={removeWinner}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white text-xs font-bold transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 dark:text-slate-500 text-sm font-medium"
                >
                  {options.length < 2 ? "Add at least 2 entries to spin!" : "Spin the wheel to make a decision!"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: INPUT PANEL */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListRestart className="w-5 h-5 text-indigo-500" />
                Entries ({options.length})
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={shuffleOptions}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition tooltip-trigger"
                  title="Shuffle List"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button 
                  onClick={clearOptions}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition tooltip-trigger"
                  title="Clear List"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <textarea
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                placeholder="Paste your list here...&#10;One item per line&#10;Unlimited entries!"
                className="w-full h-full min-h-[300px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-medium leading-relaxed"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">
                Bulk Paste Supported
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              Add as many choices as you want. Perfect for names, places, or custom raffles.
            </p>
          </div>

          {/* History Panel */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Recent Winners</h3>
              <div className="flex flex-wrap gap-2">
                {history.map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
