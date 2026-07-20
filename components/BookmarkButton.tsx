"use client";

import { useState, useEffect } from "react";
import { Bookmark, Heart } from "lucide-react";
import { isFavoriteTool, toggleFavoriteTool } from "@/lib/user-store";

interface BookmarkButtonProps {
  slug: string;
  className?: string;
  variant?: "button" | "icon";
}

export default function BookmarkButton({ slug, className = "", variant = "button" }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(isFavoriteTool(slug));
  }, [slug]);

  const handleToggle = () => {
    const nextState = toggleFavoriteTool(slug);
    setIsBookmarked(nextState);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full transition cursor-pointer ${
          isBookmarked
            ? "bg-rose-500/10 text-rose-500 dark:text-rose-400"
            : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500"
        } ${className}`}
        title={isBookmarked ? "Remove Bookmark" : "Bookmark Tool"}
      >
        <Heart className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shadow-sm ${
        isBookmarked
          ? "bg-rose-500 text-white shadow-rose-500/20"
          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white"
      } ${className}`}
    >
      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
      <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
}
