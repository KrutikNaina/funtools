"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Orbit, HeartPulse, Calendar, Sparkles } from "lucide-react";

export default function CosmicAgeClock() {
  const [birthdate, setBirthdate] = useState("2000-01-01");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const birthDateObj = new Date(birthdate);
  const diffMs = Math.max(0, now.getTime() - birthDateObj.getTime());
  const seconds = Math.floor(diffMs / 1000);
  const days = Math.floor(seconds / 86400);
  const yearsEarth = (days / 365.25).toFixed(2);
  const heartbeats = (seconds * 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 }); // ~70bpm average

  // Space ages
  const marsAge = (days / 687).toFixed(2);
  const venusAge = (days / 224.7).toFixed(2);
  const jupiterAge = (days / 4333).toFixed(2);

  // Next birthday calculation
  const currentYear = now.getFullYear();
  let nextBday = new Date(currentYear, birthDateObj.getMonth(), birthDateObj.getDate());
  if (now > nextBday) {
    nextBday = new Date(currentYear + 1, birthDateObj.getMonth(), birthDateObj.getDate());
  }
  const daysToBday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-amber-200 dark:border-amber-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Orbit className="w-3.5 h-3.5" />
          Live Cosmic Stats
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Cosmic Age & Life Stats Clock
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Enter your date of birth to reveal live ticking seconds, heartbeats, and planetary ages!
        </p>
      </div>

      <div className="max-w-xs mx-auto mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 text-center">
          Your Date of Birth
        </label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-slate-900 dark:text-white font-bold text-center text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg text-center space-y-1">
          <Clock className="w-6 h-6 mx-auto text-amber-200" />
          <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-80 block">
            Exact Age on Earth
          </span>
          <span className="text-3xl font-black">{yearsEarth}</span>
          <span className="text-xs block text-amber-100 font-semibold">{seconds.toLocaleString()} seconds</span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg text-center space-y-1">
          <HeartPulse className="w-6 h-6 mx-auto text-rose-200 animate-pulse" />
          <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-80 block">
            Estimated Heartbeats
          </span>
          <span className="text-2xl font-black">{heartbeats}</span>
          <span className="text-xs block text-rose-100 font-semibold">Total Beats</span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg text-center space-y-1">
          <Calendar className="w-6 h-6 mx-auto text-purple-200" />
          <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-80 block">
            Next Birthday Countdown
          </span>
          <span className="text-3xl font-black">{daysToBday} Days</span>
          <span className="text-xs block text-purple-100 font-semibold">Party Incoming 🎉</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 text-white">
        <h4 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider mb-3 text-center">
          🪐 Planetary Orbital Ages
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <span className="block text-[10px] text-slate-400">Venus Years</span>
            <span className="text-lg font-bold text-pink-400">{venusAge}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <span className="block text-[10px] text-slate-400">Mars Years</span>
            <span className="text-lg font-bold text-rose-400">{marsAge}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <span className="block text-[10px] text-slate-400">Jupiter Years</span>
            <span className="text-lg font-bold text-amber-400">{jupiterAge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
