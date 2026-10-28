"use client";

import { useState, useRef, useEffect, useCallback, useMemo, type ClipboardEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dices,
  RotateCw,
  Shuffle,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Copy,
  Check,
  Trash2,
  Trash,
  X,
  Share2,
  History,
  ListRestart,
  ClipboardPaste,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { recordToolComplete } from "@/lib/recommendations";

type Mode = "custom" | "yesno" | "yesnomaybe";

interface Preset {
  name: string;
  options: string[];
}

const PRESETS: Preset[] = [
  { name: "🍕 What to Eat", options: ["Pizza", "Tacos", "Sushi", "Burger", "Ramen", "Salad", "Pasta"] },
  { name: "🎬 What to Watch", options: ["Action", "Comedy", "Sci-Fi", "Horror", "Romance", "Documentary", "Thriller"] },
  { name: "🎮 What to Play", options: ["Board Game", "Video Game", "Card Game", "Charades", "Trivia"] },
  { name: "🎉 Party Games", options: ["Truth or Dare", "Charades", "Never Have I Ever", "Freeze Dance", "Musical Chairs"] },
  { name: "🏫 Classroom", options: ["Team A", "Team B", "Team C", "Team D"] },
  { name: "💼 Work Tasks", options: ["Reply to Emails", "Review Docs", "Team Standup", "Plan Sprint", "Clean Inbox"] },
  { name: "🏋️ Workout", options: ["Push-ups", "Squats", "Plank", "Jumping Jacks", "Rest Day"] },
  { name: "🌎 Travel", options: ["Beach", "Mountains", "City Trip", "Road Trip", "Stay Home"] },
  { name: "☕ Coffee / Food", options: ["Latte", "Cold Brew", "Espresso", "Tea", "Hot Chocolate"] },
  { name: "🎲 Random Numbers", options: ["1", "2", "3", "4", "5", "6"] },
];

const WEDGE_COLORS = [
  "#ef4444", "#8b5cf6", "#6366f1", "#3b82f6", "#10b981", "#f59e0b",
  "#ec4899", "#06b6d4", "#f97316", "#14b8a6", "#a855f7", "#84cc16",
  "#f43f5e", "#d946ef", "#0ea5e9", "#22c55e", "#eab308", "#64748b",
];

const MAX_ENTRIES = 500;
const STORAGE_KEY = "gft_decision_wheel_v1";
const DEFAULT_TEXT = PRESETS[0].options.join("\n");

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

export default function DecisionWheel() {
  const [mode, setMode] = useState<Mode>("custom");
  const [customText, setCustomText] = useState(DEFAULT_TEXT);
  const [yesNoList, setYesNoList] = useState<string[]>(["Yes", "No"]);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const [eliminationMode, setEliminationMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [confettiEnabled, setConfettiEnabled] = useState(true);

  const [presetConfirm, setPresetConfirm] = useState<Preset | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const wheelPanelRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Load saved state (and URL-shared list) on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedItems = params.get("items");
      if (sharedItems) {
        const decoded = sharedItems
          .split(",")
          .map((s) => decodeURIComponent(s.trim()))
          .filter(Boolean);
        if (decoded.length >= 2) {
          setCustomText(decoded.join("\n"));
          setMode("custom");
          setHydrated(true);
          return;
        }
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.mode) setMode(saved.mode);
        if (typeof saved.customText === "string") setCustomText(saved.customText);
        if (Array.isArray(saved.yesNoList)) setYesNoList(saved.yesNoList);
        if (typeof saved.eliminationMode === "boolean") setEliminationMode(saved.eliminationMode);
        if (typeof saved.soundEnabled === "boolean") setSoundEnabled(saved.soundEnabled);
        if (typeof saved.confettiEnabled === "boolean") setConfettiEnabled(saved.confettiEnabled);
        if (Array.isArray(saved.history)) setHistory(saved.history);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist state
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, customText, yesNoList, eliminationMode, soundEnabled, confettiEnabled, history })
      );
    } catch {
      // storage may be unavailable (private browsing, quota) - fail silently
    }
  }, [hydrated, mode, customText, yesNoList, eliminationMode, soundEnabled, confettiEnabled, history]);

  // Reset yes/no list when switching into those modes
  useEffect(() => {
    if (mode === "yesno") setYesNoList(["Yes", "No"]);
    if (mode === "yesnomaybe") setYesNoList(["Yes", "No", "Maybe"]);
  }, [mode]);

  const rawParsed = useMemo(() => parseLines(customText), [customText]);
  const limitReached = rawParsed.length > MAX_ENTRIES;
  const customEntries = useMemo(() => rawParsed.slice(0, MAX_ENTRIES), [rawParsed]);
  const duplicatesDetected = useMemo(() => new Set(customEntries).size !== customEntries.length, [customEntries]);

  const entries = mode === "custom" ? customEntries : mode === "yesno" ? (yesNoList.length ? yesNoList : ["Yes", "No"]) : (yesNoList.length ? yesNoList : ["Yes", "No", "Maybe"]);
  const numSlices = Math.max(entries.length, 1);
  const sliceAngle = 360 / numSlices;

  // ---- Sound ----
  const playTick = useCallback(() => {
    if (!soundEnabled) return;
    try {
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
    } catch {
      // audio unsupported/blocked - ignore
    }
  }, [soundEnabled]);

  const playWin = useCallback(() => {
    if (!soundEnabled) return;
    try {
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
    } catch {
      // audio unsupported/blocked - ignore
    }
  }, [soundEnabled]);

  // ---- Core selection + spin ----
  const SPIN_MS = prefersReducedMotion ? 500 : 4200;

  const applyWinnerRemoval = (won: string) => {
    if (mode === "custom") {
      const idx = customEntries.findIndex((o) => o === won);
      if (idx === -1) return;
      const next = [...customEntries];
      next.splice(idx, 1);
      setCustomText(next.join("\n"));
    } else {
      setYesNoList((prev) => {
        const idx = prev.indexOf(won);
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
    }
  };

  const spinWheel = () => {
    if (spinning || entries.length < 2) return;

    setSpinning(true);
    setWinner(null);

    // Determine the winning slice first, then animate the wheel to match it.
    const selectedIndex = Math.floor(Math.random() * entries.length);
    const targetMidpoint = selectedIndex * sliceAngle + sliceAngle / 2;
    const targetDegree = (360 - targetMidpoint) % 360;
    const currentModulo = rotation % 360;
    const extraDegrees = (targetDegree - currentModulo + 360) % 360;

    const spins = prefersReducedMotion ? 1 : 5;
    const finalDegree = rotation + spins * 360 + extraDegrees;
    setRotation(finalDegree);

    if (soundEnabled && !prefersReducedMotion) {
      let ticks = 0;
      const interval = setInterval(() => {
        if (ticks < 15) playTick();
        ticks++;
        if (ticks >= 20) clearInterval(interval);
      }, 150);
    }

    window.setTimeout(() => {
      const wonOption = entries[selectedIndex];
      setWinner(wonOption);
      setHistory((prev) => [wonOption, ...prev].slice(0, 20));
      recordToolComplete("decision-wheel", "random", wonOption);
      setSpinning(false);
      playWin();
      if (confettiEnabled && !prefersReducedMotion) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, zIndex: 100 });
      }
      if (eliminationMode) {
        applyWinnerRemoval(wonOption);
      }
    }, SPIN_MS);
  };

  // Ctrl+Enter keyboard shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        spinWheel();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, entries, rotation, soundEnabled, confettiEnabled, eliminationMode, prefersReducedMotion]);

  const removeWinner = () => {
    if (!winner) return;
    applyWinnerRemoval(winner);
    setWinner(null);
  };

  const copyResult = async () => {
    if (!winner) return;
    try {
      await navigator.clipboard.writeText(winner);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable - ignore
    }
  };

  const removeEntry = (index: number) => {
    if (mode === "custom") {
      const next = [...customEntries];
      next.splice(index, 1);
      setCustomText(next.join("\n"));
    } else {
      setYesNoList((prev) => {
        const next = [...prev];
        next.splice(index, 1);
        return next;
      });
    }
    setWinner(null);
  };

  const shuffleOptions = () => {
    if (mode !== "custom") return;
    const array = [...customEntries];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setCustomText(array.join("\n"));
  };

  const clearOptions = () => {
    if (mode !== "custom") return;
    if (confirm("Clear all entries? This cannot be undone.")) {
      setCustomText("");
      setWinner(null);
    }
  };

  const clearHistory = () => setHistory([]);

  const resetWheel = () => {
    if (!confirm("Reset the wheel to its default state? This clears your saved entries and settings.")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setMode("custom");
    setCustomText(DEFAULT_TEXT);
    setYesNoList(["Yes", "No"]);
    setEliminationMode(false);
    setHistory([]);
    setWinner(null);
  };

  const applyPreset = (preset: Preset) => {
    setMode("custom");
    setCustomText(preset.options.join("\n"));
    setWinner(null);
  };

  const handlePresetClick = (preset: Preset) => {
    if (mode === "custom" && customEntries.length > 0) {
      setPresetConfirm(preset);
    } else {
      applyPreset(preset);
    }
  };

  const handlePaste: ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    const clip = e.clipboardData.getData("text");
    if (!clip.includes("\n") && clip.includes(",")) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const converted = clip
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join("\n");
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const next = customText.slice(0, start) + converted + customText.slice(end);
      setCustomText(next);
      window.setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + converted.length;
      }, 0);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (!clip) return;
      const lines = clip.includes("\n") ? clip.split("\n") : clip.split(",");
      const cleaned = lines.map((s) => s.trim()).filter(Boolean);
      if (!cleaned.length) return;
      const merged = customText.trim() ? [...parseLines(customText), ...cleaned] : cleaned;
      setCustomText(merged.join("\n"));
    } catch {
      textareaRef.current?.focus();
    }
  };

  // Fullscreen
  const toggleFullscreen = async () => {
    if (!wheelPanelRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await wheelPanelRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // fullscreen unsupported - ignore
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Share
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const list = mode === "custom" ? customEntries : entries;
    if (list.length === 0) return "";
    const encoded = list.map((e) => encodeURIComponent(e)).join(",");
    return `${window.location.origin}${window.location.pathname}?items=${encoded}`;
  }, [customEntries, entries, mode]);

  const shareWheel = async () => {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Decision Wheel", url: shareUrl });
        return;
      } catch {
        // user cancelled or share failed - fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1500);
    } catch {
      // clipboard unavailable - ignore
    }
  };

  // Error / status message under entries
  let statusMessage: string | null = null;
  if (mode !== "custom") {
    if (entries.length < 2) statusMessage = "Add one more choice to start spinning.";
  } else {
    if (customEntries.length === 0) statusMessage = "Add at least 2 choices to spin the wheel.";
    else if (customEntries.length === 1) statusMessage = "Add one more choice to start spinning.";
    else if (limitReached) statusMessage = `That's a lot of choices — only the first ${MAX_ENTRIES} are used on the wheel.`;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* LEFT COLUMN: THE WHEEL */}
        <div
          ref={wheelPanelRef}
          className={`lg:col-span-7 flex flex-col items-center rounded-3xl relative ${
            isFullscreen
              ? "bg-slate-950"
              : "p-4 sm:p-6 md:p-7 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden"
          }`}
        >
          {/* Inner wrapper — in fullscreen this creates the centred, scrollable layout */}
          <div className={isFullscreen ? "flex flex-col items-center justify-center min-h-screen w-full max-w-2xl mx-auto px-6 py-8" : "flex flex-col items-center w-full h-full"}>
          <div className="w-full flex justify-between items-center mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Dices className="w-3.5 h-3.5" aria-hidden="true" />
              Decision Wheel
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setConfettiEnabled((v) => !v)}
                aria-pressed={confettiEnabled}
                aria-label={confettiEnabled ? "Disable confetti" : "Enable confetti"}
                className={`p-2 rounded-full border transition cursor-pointer ${confettiEnabled ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"}`}
                title="Toggle confetti"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSoundEnabled((v) => !v)}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
                className={`p-2 rounded-full border transition cursor-pointer ${soundEnabled ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"}`}
                title="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="p-2 rounded-full border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                title="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" aria-hidden="true" /> : <Maximize className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* SVG Wheel */}
          <div className={`relative flex items-center justify-center my-4 ${isFullscreen ? "w-[min(75vw,75vh)] h-[min(75vw,75vh)]" : "w-72 h-72 md:w-96 md:h-96"}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-slate-900 dark:border-t-white filter drop-shadow-xl" />

            <svg
              viewBox="0 0 300 300"
              className="w-full h-full drop-shadow-2xl rounded-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.99, 0.35, 1)`,
              }}
              role="img"
              aria-label={winner ? `Wheel result: ${winner}` : "Decision wheel"}
            >
              {entries.length > 0 ? (
                entries.map((opt, idx) => {
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
                  const pathData =
                    entries.length === 1
                      ? `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
                      : `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

                  const textR = 90;
                  const textX = (cx + textR * Math.cos(radMid)).toFixed(3);
                  const textY = (cy + textR * Math.sin(radMid)).toFixed(3);
                  const normalizedMid = ((midAngle % 360) + 360) % 360;
                  const textRotation = normalizedMid > 90 && normalizedMid < 270 ? midAngle + 180 : midAngle;
                  const midAngleFixed = textRotation.toFixed(3);
                  const truncatedName = opt.length > 18 ? opt.substring(0, 16) + "…" : opt;

                  return (
                    <g key={idx}>
                      <path d={pathData} fill={WEDGE_COLORS[idx % WEDGE_COLORS.length]} stroke="#FFFFFF" strokeWidth={entries.length > 20 ? "1" : "2"} />
                      <text
                        x={textX}
                        y={textY}
                        fill="#FFFFFF"
                        fontSize={numSlices > 12 ? "10" : "14"}
                        fontWeight="800"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngleFixed}, ${textX}, ${textY})`}
                        className="select-none filter drop-shadow-md font-sans"
                      >
                        {truncatedName}
                      </text>
                    </g>
                  );
                })
              ) : (
                <circle cx="150" cy="150" r="145" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
              )}
              <circle cx="150" cy="150" r="146" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="6" />
            </svg>

            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning || entries.length < 2}
              aria-label="Spin the wheel"
              className="absolute z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm md:text-base shadow-[0_0_40px_rgba(0,0,0,0.2)] border-8 border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {spinning ? <RotateCw className="w-8 h-8 animate-spin text-indigo-500" aria-hidden="true" /> : <span className="tracking-widest uppercase">Spin</span>}
            </button>
          </div>

          {/* Winner / status */}
          <div className={`w-full mt-3 sm:mt-4 flex items-center justify-center relative transition-all ${isFullscreen ? "min-h-[120px]" : winner ? "min-h-[120px]" : "min-h-[44px]"}`}>
            <AnimatePresence mode="wait">
              {winner ? (
                <motion.div
                  key="winner"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="w-full bg-indigo-500 text-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-indigo-500/20 text-center relative overflow-hidden"
                  role="status"
                  aria-live="polite"
                >
                  <span className="text-indigo-200 text-[11px] font-bold uppercase tracking-widest block mb-0.5">🎉 Winner</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black break-words">{winner}</h3>

                  <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                    <button
                      type="button"
                      onClick={copyResult}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                      {copied ? "Copied" : "Copy Result"}
                    </button>
                    <button
                      type="button"
                      onClick={removeWinner}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Remove Winner
                    </button>
                    <button
                      type="button"
                      onClick={spinWheel}
                      disabled={entries.length < 2}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-bold transition cursor-pointer disabled:opacity-50"
                    >
                      <RotateCw className="w-3.5 h-3.5" aria-hidden="true" /> Spin Again
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium text-center py-1">
                  {statusMessage ?? "Click SPIN or press Ctrl+Enter"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Elimination toggle + Share */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={eliminationMode}
                onChange={(e) => setEliminationMode(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-600"
              />
              Remove winner after each spin
            </label>

            <button
              type="button"
              onClick={shareWheel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold transition cursor-pointer"
            >
              {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{linkCopied ? "Link Copied!" : "Share Wheel"}</span>
            </button>
          </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS & ENTRIES */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800/70 shadow-lg flex-1 flex flex-col">
            {/* Integrated Mode Selector */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-3.5">
              {([
                { key: "custom", label: "Custom Wheel" },
                { key: "yesno", label: "Yes / No" },
                { key: "yesnomaybe", label: "Yes / No / Maybe" },
              ] as { key: Mode; label: string }[]).map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    setMode(m.key);
                    setWinner(null);
                  }}
                  aria-pressed={mode === m.key}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                    mode === m.key
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Quick Presets for Custom Wheel */}
            {mode === "custom" && (
              <div className="mb-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-0.5">
                  <span>Quick Presets</span>
                  <span className="text-[10px] lowercase font-normal text-slate-400">scroll for more →</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                  {PRESETS.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePresetClick(p)}
                      className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 transition cursor-pointer border border-slate-200/60 dark:border-slate-700/60 whitespace-nowrap"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListRestart className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                Entries ({entries.length})
              </h3>
              {mode === "custom" && (
                <div className="flex gap-1.5">
                  <button type="button" onClick={pasteFromClipboard} aria-label="Paste list from clipboard" className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition cursor-pointer" title="Paste List">
                    <ClipboardPaste className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={shuffleOptions} aria-label="Shuffle entries" className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition cursor-pointer" title="Shuffle">
                    <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={clearOptions} aria-label="Clear all entries" className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition cursor-pointer" title="Clear">
                    <Trash className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {mode === "custom" ? (
              <>
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    onPaste={handlePaste}
                    placeholder="Enter one choice per line...&#10;Pizza&#10;Tacos&#10;Sushi"
                    aria-label="Wheel entries, one per line"
                    className="w-full h-full min-h-[180px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-medium leading-relaxed"
                  />
                </div>

                {/* Individually removable chip list */}
                {customEntries.length > 0 && (
                  <div className="mt-4 max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {customEntries.map((opt, idx) => (
                      <div key={`${opt}-${idx}`} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <span className="truncate pr-2">{opt}</span>
                        <button type="button" onClick={() => removeEntry(idx)} aria-label={`Remove ${opt}`} className="text-slate-400 hover:text-rose-500 transition shrink-0">
                          <X className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {statusMessage && <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 text-center font-medium">{statusMessage}</p>}
                {duplicatesDetected && <p className="text-xs text-slate-400 mt-1 text-center">Duplicate choices detected — that&apos;s fine, they&apos;ll each get their own slice.</p>}
              </>
            ) : (
              <div className="space-y-2">
                {entries.map((opt, idx) => (
                  <div key={`${opt}-${idx}`} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>{opt}</span>
                    <button type="button" onClick={() => removeEntry(idx)} aria-label={`Remove ${opt}`} className="text-slate-400 hover:text-rose-500 transition">
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {statusMessage && <p className="text-xs text-amber-600 dark:text-amber-400 text-center font-medium">{statusMessage}</p>}
                <p className="text-xs text-slate-400 text-center pt-2">Switch to &ldquo;Custom Wheel&rdquo; to build your own list.</p>
              </div>
            )}

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">Enter</kbd> to spin.
            </p>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={resetWheel}
            className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition self-center"
          >
            Reset Wheel
          </button>

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
              <button type="button" onClick={() => setShowHistory((v) => !v)} className="w-full flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                  Spin History ({history.length})
                </span>
                <span className="text-xs text-slate-400">{showHistory ? "Hide" : "Show"}</span>
              </button>
              {showHistory && (
                <div className="mt-4 space-y-2">
                  <ol className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300 list-decimal list-inside max-h-48 overflow-y-auto">
                    {history.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ol>
                  <button type="button" onClick={clearHistory} className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition">
                    Clear History
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preset replace confirmation modal */}
      <AnimatePresence>
        {presetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Confirm replacing choices"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Replace your current choices?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Loading &ldquo;{presetConfirm.name}&rdquo; will overwrite your existing entries.
              </p>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setPresetConfirm(null)} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    applyPreset(presetConfirm);
                    setPresetConfirm(null);
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white"
                >
                  Replace
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
