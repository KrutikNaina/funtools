"use client";

import { useState, useEffect, useMemo } from "react";
import { Clock, Orbit, HeartPulse, Calendar, Sparkles, Copy, Check, Share2, Rocket, Award } from "lucide-react";

interface PlanetInfo {
  name: string;
  period: number; // in Earth days
  color: string;
  accentBg: string;
  symbol: string;
}

const PLANETS: PlanetInfo[] = [
  { name: "Mercury", period: 87.97, color: "text-amber-400", accentBg: "bg-amber-400/10", symbol: "☿" },
  { name: "Venus", period: 224.70, color: "text-pink-400", accentBg: "bg-pink-400/10", symbol: "♀" },
  { name: "Earth", period: 365.25, color: "text-emerald-400", accentBg: "bg-emerald-400/10", symbol: "🜨" },
  { name: "Mars", period: 686.98, color: "text-rose-400", accentBg: "bg-rose-400/10", symbol: "♂" },
  { name: "Jupiter", period: 4332.59, color: "text-orange-400", accentBg: "bg-orange-400/10", symbol: "♃" },
  { name: "Saturn", period: 10759.22, color: "text-yellow-400", accentBg: "bg-yellow-400/10", symbol: "♄" },
  { name: "Uranus", period: 30688.5, color: "text-cyan-400", accentBg: "bg-cyan-400/10", symbol: "♅" },
  { name: "Neptune", period: 60182.0, color: "text-indigo-400", accentBg: "bg-indigo-400/10", symbol: "♆" },
];

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function CosmicAgeClock() {
  const [birthdate, setBirthdate] = useState("2000-01-01");
  const [now, setNow] = useState<Date>(() => new Date());
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Parse birthdate cleanly in local timezone at 00:00:00 reference time
  const birthDateObj = useMemo(() => {
    if (!birthdate) return new Date(2000, 0, 1);
    const parts = birthdate.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day, 0, 0, 0);
    }
    return new Date(birthdate);
  }, [birthdate]);

  const isFuture = birthDateObj.getTime() > now.getTime();
  const diffMs = Math.max(0, now.getTime() - birthDateObj.getTime());
  const seconds = Math.floor(diffMs / 1000);
  const days = Math.floor(seconds / 86400);
  const yearsEarth = (days / 365.25).toFixed(2);

  // Heartbeats: ~70 bpm resting average = ~1.167 beats/sec
  const heartbeats = Math.floor(seconds * 1.167).toLocaleString();

  // Next Earth Birthday Calculation (handles Feb 29 leap day)
  const nextEarthBdayInfo = useMemo(() => {
    const currentYear = now.getFullYear();
    const bMonth = birthDateObj.getMonth();
    const bDay = birthDateObj.getDate();

    let targetDate = new Date(currentYear, bMonth, bDay, 0, 0, 0);

    // If today is after this year's birthday
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    if (todayMidnight.getTime() > targetDate.getTime()) {
      targetDate = new Date(currentYear + 1, bMonth, bDay, 0, 0, 0);
    }

    const isToday = todayMidnight.getTime() === targetDate.getTime();
    const daysRemaining = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      date: targetDate,
      isToday,
      daysRemaining: Math.max(0, daysRemaining),
    };
  }, [birthDateObj, now]);

  // One-Billion-Seconds Milestone (1,000,000,000 seconds after birth reference)
  const billionMilestone = useMemo(() => {
    const billionMs = 1_000_000_000 * 1000;
    const targetDate = new Date(birthDateObj.getTime() + billionMs);
    const isPast = now.getTime() >= targetDate.getTime();

    if (isPast) {
      const pastMs = now.getTime() - targetDate.getTime();
      const pastDays = Math.floor(pastMs / (1000 * 86400));
      return {
        targetDate,
        isPast: true,
        days: pastDays,
        formattedDate: targetDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    } else {
      const remSec = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
      const remDays = Math.floor(remSec / 86400);
      const remHours = Math.floor((remSec % 86400) / 3600);
      const remMins = Math.floor((remSec % 3600) / 60);
      const remSecs = remSec % 60;
      return {
        targetDate,
        isPast: false,
        days: remDays,
        hours: remHours,
        mins: remMins,
        secs: remSecs,
        formattedDate: targetDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    }
  }, [birthDateObj, now]);

  // Next Martian Birthday Calculation
  const martianBirthday = useMemo(() => {
    const marsPeriodMs = 686.98 * 86400 * 1000;
    const currentMarsAge = diffMs / marsPeriodMs;
    const nextMarsYearNum = Math.floor(currentMarsAge) + 1;
    const targetDate = new Date(birthDateObj.getTime() + nextMarsYearNum * marsPeriodMs);

    const remMs = Math.max(0, targetDate.getTime() - now.getTime());
    const remDays = Math.ceil(remMs / (1000 * 86400));

    return {
      yearNum: nextMarsYearNum,
      targetDate,
      remDays,
      formattedDate: targetDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  }, [birthDateObj, diffMs, now]);

  const marsAgeVal = (days / 686.98).toFixed(2);

  // Copy Summary Action
  const handleCopy = async () => {
    if (isFuture) return;
    const milestoneSummary = billionMilestone.isPast
      ? `Reached on ${billionMilestone.formattedDate}`
      : `Reaches on ${billionMilestone.formattedDate} (in ${billionMilestone.days} days)`;

    const summaryText = `My Cosmic Age Stats:
• Earth Age: ${yearsEarth} years (${seconds.toLocaleString()} seconds, ${days.toLocaleString()} days)
• Estimated Heartbeats: ${heartbeats} beats (~70 bpm)
• Mars Age: ${marsAgeVal} Martian years
• 1-Billion-Seconds Milestone: ${milestoneSummary}
• Next Martian Birthday: ${getOrdinal(martianBirthday.yearNum)} on ${martianBirthday.formattedDate} (in ${martianBirthday.remDays} days)
Calculated with GetFunTools Cosmic Age Clock: https://www.getfuntools.app/tools/cosmic-age-clock`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  // Web Share API Action
  const handleShare = async () => {
    if (isFuture) return;
    const milestoneSummary = billionMilestone.isPast
      ? `reached on ${billionMilestone.formattedDate}`
      : `incoming on ${billionMilestone.formattedDate}`;

    const shareData = {
      title: "My Cosmic Age Stats | GetFunTools",
      text: `I am ${yearsEarth} Earth years old (${seconds.toLocaleString()} seconds lived, ${marsAgeVal} Mars years). 1-Billion-Seconds milestone: ${milestoneSummary}!`,
      url: "https://www.getfuntools.app/tools/cosmic-age-clock",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback to copy
      await handleCopy();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-amber-200 dark:border-amber-900/40 shadow-xl relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Orbit className="w-3.5 h-3.5" />
          Live Astronomical Clock &amp; Solar System Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Cosmic Age &amp; Life Stats Clock
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto leading-relaxed">
          Enter your date of birth to reveal live ticking seconds, estimated heartbeats, solar system orbital ages, your next Martian birthday, and your 1-billion-second milestone.
        </p>
      </div>

      {/* Date Picker Input */}
      <div className="max-w-xs mx-auto">
        <label htmlFor="birthdate-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 text-center">
          Your Date of Birth
        </label>
        <input
          id="birthdate-input"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-slate-900 dark:text-white font-bold text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner"
        />
        <span className="block text-[11px] text-slate-500 dark:text-slate-400 text-center mt-1">
          Assumes 00:00:00 reference time in your local timezone.
        </span>
      </div>

      {isFuture ? (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800 text-center space-y-1">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
            Selected date is in the future.
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Please choose a date in the past to calculate your cosmic age statistics.
          </p>
        </div>
      ) : (
        <>
          {/* Top 3 Live Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Exact Earth Age & Seconds */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md text-center space-y-1">
              <Clock className="w-5 h-5 mx-auto text-amber-200" />
              <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-85 block">
                Exact Earth Age
              </span>
              <span className="text-3xl font-black block tracking-tight">{yearsEarth}</span>
              <span className="text-xs block text-amber-100 font-semibold font-mono">
                {seconds.toLocaleString()} seconds
              </span>
              <span className="text-[10px] text-amber-200/80 block">
                {days.toLocaleString()} days lived
              </span>
            </div>

            {/* Estimated Heartbeats */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md text-center space-y-1">
              <HeartPulse className="w-5 h-5 mx-auto text-rose-200 animate-pulse" />
              <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-85 block">
                Estimated Heartbeats
              </span>
              <span className="text-2xl sm:text-3xl font-black block tracking-tight font-mono">
                {heartbeats}
              </span>
              <span className="text-xs block text-rose-100 font-semibold">Total Pulses</span>
              <span className="text-[10px] text-rose-200/80 block">
                Assumes ~70 bpm average resting rate
              </span>
            </div>

            {/* Next Birthday Countdown */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md text-center space-y-1">
              <Calendar className="w-5 h-5 mx-auto text-purple-200" />
              <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-85 block">
                Next Earth Birthday
              </span>
              {nextEarthBdayInfo.isToday ? (
                <>
                  <span className="text-2xl font-black block text-amber-300 animate-bounce">
                    Today! 🎉
                  </span>
                  <span className="text-xs block text-purple-100 font-semibold">
                    Happy Birthday!
                  </span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-black block tracking-tight">
                    {nextEarthBdayInfo.daysRemaining} Days
                  </span>
                  <span className="text-xs block text-purple-100 font-semibold">
                    Countdown Running
                  </span>
                </>
              )}
              <span className="text-[10px] text-purple-200/80 block">
                Standard 365.25-day calendar cycle
              </span>
            </div>
          </div>

          {/* New Feature B & C: 1-Billion-Seconds Milestone + Next Martian Birthday */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1-Billion-Seconds Milestone Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Award className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Your 1-Billion-Second Milestone
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Find the date you reach one billion elapsed seconds (roughly 31.7 years), or see when you passed this milestone.
              </p>
              <div className="pt-2 border-t border-slate-800">
                {billionMilestone.isPast ? (
                  <div className="space-y-0.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 mb-1">
                      Milestone Achieved ✓
                    </span>
                    <p className="text-sm font-extrabold text-white">
                      Passed on {billionMilestone.formattedDate}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {billionMilestone.days.toLocaleString()} days ago
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 mb-1">
                      Upcoming Milestone
                    </span>
                    <p className="text-sm font-extrabold text-white">
                      Target: {billionMilestone.formattedDate}
                    </p>
                    <p className="text-[11px] text-amber-300 font-mono font-semibold">
                      {billionMilestone.days}d {billionMilestone.hours}h {billionMilestone.mins}m {billionMilestone.secs}s remaining
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Martian Birthday Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-2">
              <div className="flex items-center gap-2 text-rose-400">
                <Rocket className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Next Martian Birthday
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                A Martian year is 686.98 Earth days. Celebrate your next orbital-year anniversary on the Red Planet!
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-0.5">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 mb-1">
                  {getOrdinal(martianBirthday.yearNum)} Martian Birthday
                </span>
                <p className="text-sm font-extrabold text-white">
                  {martianBirthday.formattedDate}
                </p>
                <p className="text-[11px] text-rose-300 font-mono font-semibold">
                  in {martianBirthday.remDays} Earth days (Age: {marsAgeVal} Mars yrs)
                </p>
              </div>
            </div>
          </div>

          {/* New Feature A: Expanded Planetary Orbital Ages (8 Planets) */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="text-center space-y-0.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                <Orbit className="w-3.5 h-3.5" />
                <span>Solar System Orbital Ages (All 8 Planets)</span>
              </div>
              <p className="text-[11px] text-slate-400 max-w-lg mx-auto">
                Orbital age = elapsed Earth days ÷ planet orbital period in Earth days (NASA heliocentric data).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PLANETS.map((planet) => {
                const age = (days / planet.period).toFixed(2);
                return (
                  <div
                    key={planet.name}
                    className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1 hover:border-slate-600 transition"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs opacity-70">{planet.symbol}</span>
                      <span className="text-[11px] font-bold text-slate-300">{planet.name}</span>
                    </div>
                    <span className={`text-xl font-black block ${planet.color}`}>
                      {age}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {planet.period}d / orbit
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Feature D: Copy and Share Result Actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              title="Copy your complete cosmic stats to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-200" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Stats!" : "Copy Summary"}</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Share your cosmic age stats"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareSuccess ? "Shared!" : "Share"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
