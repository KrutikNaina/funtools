"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Trophy, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

type State = "WAITING_START" | "WAITING_GREEN" | "READY_CLICK" | "RESULT" | "TOO_EARLY";

export default function ReactionSpeedTest() {
  const [state, setState] = useState<State>("WAITING_START");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("funtools_reaction_best");
    if (saved) setBestTime(parseInt(saved, 10));
  }, []);

  const startTest = () => {
    setState("WAITING_GREEN");
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 3000) + 1500; // 1.5s - 4.5s random
    timerRef.current = setTimeout(() => {
      setState("READY_CLICK");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (state === "WAITING_START") {
      startTest();
    } else if (state === "WAITING_GREEN") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setState("TOO_EARLY");
    } else if (state === "READY_CLICK") {
      const elapsed = Date.now() - startTimeRef.current;
      setReactionTime(elapsed);
      setState("RESULT");

      if (!bestTime || elapsed < bestTime) {
        setBestTime(elapsed);
        localStorage.setItem("funtools_reaction_best", elapsed.toString());
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    } else if (state === "RESULT" || state === "TOO_EARLY") {
      startTest();
    }
  };

  const getRank = (ms: number) => {
    if (ms < 180) return { title: "⚡ Cyber Ninja Godlike", color: "text-purple-500", desc: "Top 0.1% esports reflex speed!" };
    if (ms < 230) return { title: "🔥 Pro Gamer Reflexes", color: "text-emerald-500", desc: "Faster than 90% of humans!" };
    if (ms < 280) return { title: "✨ Swift Human", color: "text-blue-500", desc: "Great visual reaction speed." };
    return { title: "🐢 Chill Sloth", color: "text-amber-500", desc: "Relaxed vibe! Try again to boost your score." };
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-emerald-200 dark:border-emerald-900/40 shadow-xl text-center select-none">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
        <Zap className="w-3.5 h-3.5" />
        Reflex Challenge
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
        Emoji Reaction Speed Test
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
        When the box turns GREEN, tap or click as fast as humanly possible!
      </p>

      {/* Interactive Box */}
      <motion.div
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        className={`w-full min-h-[260px] rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 shadow-inner relative ${
          state === "WAITING_START"
            ? "bg-slate-100 dark:bg-slate-800/80 border-2 border-dashed border-slate-300 dark:border-slate-700"
            : state === "WAITING_GREEN"
            ? "bg-rose-500 text-white"
            : state === "READY_CLICK"
            ? "bg-emerald-500 text-white animate-pulse"
            : state === "TOO_EARLY"
            ? "bg-amber-500 text-white"
            : "bg-indigo-600 text-white"
        }`}
      >
        {state === "WAITING_START" && (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Tap Anywhere to Start
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Wait for the screen to turn green.
            </p>
          </div>
        )}

        {state === "WAITING_GREEN" && (
          <div className="space-y-2">
            <span className="text-5xl">🔴</span>
            <h3 className="text-2xl font-black">Wait for GREEN...</h3>
            <p className="text-xs text-rose-100">Don't click yet!</p>
          </div>
        )}

        {state === "READY_CLICK" && (
          <div className="space-y-2">
            <span className="text-6xl">🟢</span>
            <h3 className="text-3xl font-black">CLICK NOW!</h3>
          </div>
        )}

        {state === "TOO_EARLY" && (
          <div className="space-y-2">
            <AlertCircle className="w-12 h-12 mx-auto text-white" />
            <h3 className="text-2xl font-bold">Too Early!</h3>
            <p className="text-xs text-amber-100">Tap to try again.</p>
          </div>
        )}

        {state === "RESULT" && reactionTime && (
          <div className="space-y-3">
            <span className="text-5xl font-black">{reactionTime} ms</span>
            <div>
              <h3 className="text-xl font-bold">{getRank(reactionTime).title}</h3>
              <p className="text-xs text-indigo-100 mt-1">{getRank(reactionTime).desc}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mt-2">
              <RefreshCw className="w-3.5 h-3.5" /> Tap to retry
            </div>
          </div>
        )}
      </motion.div>

      {/* Best Score Footer */}
      {bestTime && (
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 py-2.5 px-4 rounded-2xl w-max mx-auto">
          <Trophy className="w-4 h-4 text-amber-500" />
          Personal Best: <span className="text-emerald-500 font-extrabold">{bestTime} ms</span>
        </div>
      )}
    </div>
  );
}
