"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Clock, Calendar, Share2, RefreshCw, Check, Sparkles, AlertCircle } from "lucide-react";

export default function CountdownTimer() {
  // Initialize sensible future date (30 days from now at 09:00 local time)
  const getDefaultTarget = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    d.setHours(9, 0, 0, 0);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day}T${h}:${min}`;
  };

  const [eventName, setEventName] = useState("Vacation Countdown");
  const [targetDate, setTargetDate] = useState(getDefaultTarget);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  // Read URL query params on mount for shared countdown links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sharedEvent = params.get("event");
      const sharedDate = params.get("date");
      if (sharedEvent) setEventName(sharedEvent);
      if (sharedDate) setTargetDate(sharedDate);
    }
  }, []);

  // Tick calculation logic
  const calculate = useCallback(() => {
    if (!targetDate) {
      setTimeLeft(null);
      setIsFinished(false);
      return;
    }

    const targetTime = new Date(targetDate).getTime();
    if (isNaN(targetTime)) {
      setTimeLeft(null);
      setIsFinished(false);
      return;
    }

    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsFinished(true);
      return;
    }

    setIsFinished(false);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  }, [targetDate]);

  useEffect(() => {
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [calculate]);

  // Dispatch completion for gamification
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("funtools_event", {
          detail: { name: "tool_complete", toolSlug: "countdown-timer" },
        })
      );
    }
  }, [targetDate, eventName]);

  // Handle Share: Web Share API with Copy Link fallback
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const origin = window.location.origin;
    const shareUrl = `${origin}/tools/countdown-timer?event=${encodeURIComponent(eventName)}&date=${encodeURIComponent(targetDate)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${eventName} – Countdown Timer`,
          text: `Countdown to ${eventName} on GetFunTools!`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard write failure
    }
  };

  // Quick preset helper
  const applyPreset = (preset: "newyear" | "+24h" | "+7d" | "+30d" | "weekend") => {
    const now = new Date();
    let target = new Date();

    switch (preset) {
      case "newyear": {
        const nextYear = now.getFullYear() + 1;
        target = new Date(nextYear, 0, 1, 0, 0, 0);
        setEventName(`New Year ${nextYear}`);
        break;
      }
      case "+24h": {
        target = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        setEventName("24-Hour Goal");
        break;
      }
      case "+7d": {
        target = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        setEventName("Weekly Milestone");
        break;
      }
      case "+30d": {
        target = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        setEventName("30-Day Challenge");
        break;
      }
      case "weekend": {
        // Next Friday 17:00
        const day = now.getDay();
        const daysUntilFriday = (5 - day + 7) % 7 || 7;
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilFriday, 17, 0, 0);
        setEventName("Weekend Countdown");
        break;
      }
    }

    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, "0");
    const d = String(target.getDate()).padStart(2, "0");
    const h = String(target.getHours()).padStart(2, "0");
    const min = String(target.getMinutes()).padStart(2, "0");
    setTargetDate(`${y}-${m}-${d}T${h}:${min}`);
  };

  const handleReset = () => {
    setEventName("Upcoming Event");
    setTargetDate(getDefaultTarget());
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-5 sm:p-7 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative">
      {/* Header Tag */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Live Ticking Clock</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Create Your Countdown Timer
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          Enter your event title, pick a target date and time, and watch the live ticking countdown.
        </p>
      </div>

      {/* Main Countdown Display Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 text-white text-center shadow-xl space-y-4 mb-6">
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-200 block truncate max-w-lg mx-auto">
          {eventName.trim() || "Event Countdown"}
        </span>

        {isFinished ? (
          <div className="py-6 space-y-3">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              🎉 Time&apos;s Up!
            </div>
            <p className="text-purple-100 text-sm sm:text-base font-medium max-w-md mx-auto">
              Your countdown for &ldquo;{eventName}&rdquo; has reached zero.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-2xl bg-white text-indigo-700 font-bold text-xs hover:bg-purple-50 transition cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Start a New Countdown</span>
              </button>
            </div>
          </div>
        ) : timeLeft ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
            {/* Days */}
            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black block tracking-tight">
                {timeLeft.days.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-purple-200 block mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black block tracking-tight">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-purple-200 block mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black block tracking-tight">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-purple-200 block mt-1">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black block tracking-tight">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-purple-200 block mt-1">
                Secs
              </span>
            </div>
          </div>
        ) : (
          <div className="py-6 text-purple-200 text-sm">
            Please enter a valid target date and time below.
          </div>
        )}

        <div className="text-[11px] text-purple-200/90 font-medium">
          Counting down in your local browser timezone.
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Event Name
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g. Birthday, Summer Vacation, Product Launch..."
            aria-label="Event name"
            maxLength={60}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Target Date &amp; Time
          </label>
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            aria-label="Target date and time"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]"
          />
        </div>
      </div>

      {/* Quick Action Presets */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Presets:
          </span>
          <button
            type="button"
            onClick={() => applyPreset("newyear")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            New Year
          </button>
          <button
            type="button"
            onClick={() => applyPreset("weekend")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            Weekend
          </button>
          <button
            type="button"
            onClick={() => applyPreset("+24h")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            +24 Hours
          </button>
          <button
            type="button"
            onClick={() => applyPreset("+7d")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            +7 Days
          </button>
          <button
            type="button"
            onClick={() => applyPreset("+30d")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            +30 Days
          </button>
        </div>

        {/* Share and Reset Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer inline-flex items-center gap-1.5"
            title="Reset to default timer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            title="Share this countdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Timer"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
