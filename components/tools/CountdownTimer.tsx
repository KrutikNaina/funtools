"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Play, Pause, RefreshCw, Sparkles, Share2 } from "lucide-react";

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("2026-12-31T23:59");
  const [eventName, setEventName] = useState("New Year 2027 Celebration");
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculate = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-purple-200 dark:border-purple-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          Event Countdown Clock
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Event & Goal Countdown Timer
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Create live ticking countdown timers for product launches, holidays, and milestones.
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. Summer Vacation, Birthday..."
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Target Date & Time
            </label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Live Timer Display */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center shadow-xl space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-200 block">
            {eventName || "Countdown"}
          </span>

          {timeLeft ? (
            <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg mx-auto">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-2xl md:text-4xl font-black block">{timeLeft.days}</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-purple-200">Days</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-2xl md:text-4xl font-black block">{timeLeft.hours}</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-purple-200">Hours</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-2xl md:text-4xl font-black block">{timeLeft.minutes}</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-purple-200">Mins</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-2xl md:text-4xl font-black block">{timeLeft.seconds}</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-purple-200">Secs</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
