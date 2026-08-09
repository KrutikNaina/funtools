"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, RefreshCw, AlertCircle, Share2, Copy, Check, BarChart2, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

type State = "WAITING_START" | "WAITING_GREEN" | "READY_CLICK" | "TOO_EARLY" | "ROUND_RESULT" | "FINAL_RESULT";

export default function ReactionSpeedTest() {
  const [state, setState] = useState<State>("WAITING_START");
  const [scores, setScores] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const ROUNDS_TO_WIN = 5;

  useEffect(() => {
    const saved = localStorage.getItem("funtools_reaction_best_time");
    if (saved) setBestTime(parseFloat(saved));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, scores]); // Re-bind so handleClick uses latest state

  const startNextRound = useCallback(() => {
    setState("WAITING_GREEN");
    setCurrentScore(null);
    const delay = Math.floor(Math.random() * 3000) + 1500; // 1.5s - 4.5s random
    timerRef.current = setTimeout(() => {
      setState("READY_CLICK");
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (state === "WAITING_START" || state === "ROUND_RESULT" || state === "TOO_EARLY") {
      startNextRound();
    } else if (state === "WAITING_GREEN") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setState("TOO_EARLY");
    } else if (state === "READY_CLICK") {
      const elapsed = parseFloat((performance.now() - startTimeRef.current).toFixed(1));
      setCurrentScore(elapsed);
      
      const newScores = [...scores, elapsed];
      setScores(newScores);

      if (newScores.length >= ROUNDS_TO_WIN) {
        setState("FINAL_RESULT");
        const avg = newScores.reduce((a, b) => a + b, 0) / newScores.length;
        if (!bestTime || avg < bestTime) {
          setBestTime(parseFloat(avg.toFixed(1)));
          localStorage.setItem("funtools_reaction_best_time", avg.toFixed(1));
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setState("ROUND_RESULT");
      }
    }
  }, [state, scores, bestTime, startNextRound]);

  const resetTest = () => {
    setScores([]);
    setCurrentScore(null);
    setState("WAITING_START");
  };

  const calculateStats = () => {
    if (scores.length === 0) return { avg: 0, best: 0, worst: 0, median: 0, consistency: 0 };
    const sorted = [...scores].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const avg = sum / sorted.length;
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 
      : sorted[Math.floor(sorted.length / 2)];
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    
    // Variance/Consistency (Standard Deviation)
    const variance = sorted.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / sorted.length;
    const consistency = Math.sqrt(variance);

    return { 
      avg: parseFloat(avg.toFixed(1)), 
      best: parseFloat(best.toFixed(1)), 
      worst: parseFloat(worst.toFixed(1)), 
      median: parseFloat(median.toFixed(1)),
      consistency: parseFloat(consistency.toFixed(1))
    };
  };

  const getPerformanceLevel = (ms: number) => {
    if (ms < 150) return { level: "World Class", color: "text-purple-500", border: "border-purple-500/30", bg: "bg-purple-500/10" };
    if (ms < 180) return { level: "Professional Esports", color: "text-rose-500", border: "border-rose-500/30", bg: "bg-rose-500/10" };
    if (ms < 200) return { level: "Elite", color: "text-amber-500", border: "border-amber-500/30", bg: "bg-amber-500/10" };
    if (ms < 230) return { level: "Very Fast", color: "text-emerald-500", border: "border-emerald-500/30", bg: "bg-emerald-500/10" };
    if (ms < 260) return { level: "Average", color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10" };
    if (ms < 300) return { level: "Slow", color: "text-orange-500", border: "border-orange-500/30", bg: "bg-orange-500/10" };
    return { level: "Needs Improvement", color: "text-slate-500", border: "border-slate-500/30", bg: "bg-slate-500/10" };
  };

  const handleShare = async () => {
    const stats = calculateStats();
    const rank = getPerformanceLevel(stats.avg);
    const shareText = `⚡ I scored \${stats.avg}ms on the Reaction Time Test!
🏆 Rank: \${rank.level}
🎯 Consistency: \${stats.consistency}ms

Test your reflexes at: https://www.getfuntools.app/tools/reaction-time-test`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Reaction Time Score",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // User cancelled or failed
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stats = calculateStats();
  const perf = getPerformanceLevel(stats.avg);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 glass-card rounded-3xl border border-emerald-200 dark:border-emerald-900/40 shadow-xl select-none" ref={containerRef}>
      
      {state !== "FINAL_RESULT" && (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              Reaction Time Test
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Measure Your Reflexes
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-md mx-auto">
              Click as fast as possible when the red screen turns green. Complete 5 rounds to get your average score.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: ROUNDS_TO_WIN }).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-10 rounded-full transition-colors duration-300 \${i < scores.length ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} 
              />
            ))}
          </div>
        </>
      )}

      {state === "FINAL_RESULT" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Final Report</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Here is your 5-round performance breakdown</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Primary Score Card */}
            <div className={`p-6 rounded-3xl border \${perf.border} \${perf.bg} flex flex-col items-center justify-center text-center`}>
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Average Response</span>
              <div className={`text-6xl font-black \${perf.color} mb-3 flex items-baseline gap-1`}>
                {stats.avg} <span className="text-xl">ms</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-black/20 rounded-full">
                <CheckCircle2 className={`w-4 h-4 \${perf.color}`} />
                <span className={`text-sm font-bold \${perf.color}`}>{perf.level}</span>
              </div>
            </div>

            {/* Sub Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Fastest</span>
                <span className="text-2xl font-black text-emerald-500">{stats.best}ms</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Slowest</span>
                <span className="text-2xl font-black text-rose-500">{stats.worst}ms</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Median</span>
                <span className="text-2xl font-black text-blue-500">{stats.median}ms</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center relative group">
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Consistency (Var)</span>
                <span className="text-2xl font-black text-purple-500">±{stats.consistency}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={resetTest}
              className="px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Play Again
            </button>
            <button
              onClick={handleShare}
              className="px-8 py-3 rounded-full bg-emerald-500 text-white font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              {copied ? "Copied!" : "Share Result"}
            </button>
          </div>
        </motion.div>
      ) : (
        /* Interactive Box */
        <motion.div
          onClick={handleClick}
          whileTap={state === "READY_CLICK" ? { scale: 0.98 } : {}}
          className={`w-full min-h-[300px] md:min-h-[400px] rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-100 shadow-inner relative \${
            state === "WAITING_START"
              ? "bg-slate-100 dark:bg-slate-800/80 border-2 border-dashed border-slate-300 dark:border-slate-700"
              : state === "WAITING_GREEN"
              ? "bg-rose-500 text-white"
              : state === "READY_CLICK"
              ? "bg-emerald-500 text-white"
              : state === "TOO_EARLY"
              ? "bg-amber-500 text-white"
              : "bg-indigo-600 text-white"
          }`}
        >
          <AnimatePresence mode="wait">
            {state === "WAITING_START" && (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                    Click to Start
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                    Press Spacebar or Click. Round {scores.length + 1} of {ROUNDS_TO_WIN}
                  </p>
                </div>
              </motion.div>
            )}

            {state === "WAITING_GREEN" && (
              <motion.div key="wait" className="text-center space-y-3">
                <span className="text-7xl">🔴</span>
                <h3 className="text-4xl font-black">Wait for green...</h3>
              </motion.div>
            )}

            {state === "READY_CLICK" && (
              <motion.div key="ready" className="text-center space-y-3">
                <span className="text-7xl">🟢</span>
                <h3 className="text-5xl font-black">CLICK NOW!</h3>
              </motion.div>
            )}

            {state === "TOO_EARLY" && (
              <motion.div key="early" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-3">
                <AlertCircle className="w-16 h-16 mx-auto text-white" />
                <h3 className="text-4xl font-black">Too Early!</h3>
                <p className="text-lg font-medium text-amber-100">Click to try round {scores.length + 1} again.</p>
              </motion.div>
            )}

            {state === "ROUND_RESULT" && currentScore && (
              <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4">
                <span className="text-6xl font-black block">{currentScore} ms</span>
                <p className="text-lg text-indigo-100 font-medium mt-2">
                  Click to continue to round {scores.length + 1} of {ROUNDS_TO_WIN}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Best Score Footer */}
      {bestTime !== null && state !== "FINAL_RESULT" && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 py-3 px-6 rounded-full w-max mx-auto shadow-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          All-Time Average Best: <span className="text-emerald-500 font-black">{bestTime} ms</span>
        </div>
      )}
    </div>
  );
}
