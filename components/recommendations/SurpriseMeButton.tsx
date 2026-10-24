"use client";

import { Dices, Sparkles } from "lucide-react";
import { openSurpriseMe } from "./SurpriseMeModal";

interface SurpriseMeButtonProps {
  currentSlug?: string;
  variant?: "pill" | "header" | "inline" | "hero";
  className?: string;
}

export default function SurpriseMeButton({
  currentSlug,
  variant = "pill",
  className = "",
}: SurpriseMeButtonProps) {
  const handleClick = () => {
    openSurpriseMe(currentSlug);
  };

  if (variant === "header") {
    return (
      <button
        onClick={handleClick}
        className={`px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-purple-500/15 hover:from-amber-500/25 hover:to-purple-500/25 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-105 shrink-0 whitespace-nowrap ${className}`}
        title="Surprise Me with a Random Tool"
      >
        <Dices className="w-3.5 h-3.5 animate-bounce shrink-0" />
        <span className="hidden xl:inline">Surprise Me</span>
        <span className="hidden md:inline xl:hidden">Surprise</span>
        <span className="inline md:hidden">Surprise Me</span>
      </button>
    );
  }

  if (variant === "hero") {
    return (
      <button
        onClick={handleClick}
        className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-black text-xs sm:text-sm hover:scale-105 transition shadow-lg flex items-center gap-2 cursor-pointer ${className}`}
      >
        <Dices className="w-4 h-4" />
        <span>🎲 Surprise Me!</span>
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition cursor-pointer ${className}`}
      >
        <Dices className="w-4 h-4 text-purple-500" />
        <span>🎲 Surprise Me with another tool</span>
      </button>
    );
  }

  // Default "pill" variant
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:to-pink-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-extrabold transition flex items-center gap-2 cursor-pointer shadow-sm ${className}`}
    >
      <Dices className="w-4 h-4 text-purple-500" />
      <span>🎲 Surprise Me</span>
    </button>
  );
}
