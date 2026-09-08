"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  Trash2,
  Flame,
  Heart,
  Zap,
  Type,
  Dices,
  Coins,
  Bot,
  BrainCircuit,
  Orbit,
  Smile,
  CornerDownLeft,
  SlidersHorizontal,
} from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/tools-data";
import { useUserStore } from "@/lib/user-store";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, any> = {
  HeartHandshake: Heart,
  Heart,
  Type,
  Zap,
  CircleDot: Dices,
  Dices,
  TrendingUp: Coins,
  Coins,
  Bot,
  BrainCircuit,
  Orbit,
  Clock,
  Smile,
};

const CATEGORY_ICON_MAP: Record<string, any> = {
  love: Heart,
  social: Type,
  gaming: Zap,
  random: Dices,
  finance: Coins,
  ai: Bot,
  quiz: BrainCircuit,
  age: Clock,
  personality: Smile,
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { recentSearches, addSearch, clearSearches } = useUserStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCat("all");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const filteredTools = useMemo(() => {
    const q = query.toLowerCase().trim();
    return TOOLS.filter((tool) => {
      const matchesCat = selectedCat === "all" || tool.category === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCat]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCat]);

  const handleSelectTool = (slug: string, toolTitle: string) => {
    addSearch(toolTitle);
    router.push(`/tools/${slug}`);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredTools.length > 0 && selectedIndex < filteredTools.length) {
      const selected = filteredTools[selectedIndex];
      handleSelectTool(selected.slug, selected.title);
      return;
    }
    if (query.trim()) {
      addSearch(query.trim());
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (filteredTools.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredTools, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/70 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-950/20 border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] relative"
        >
          {/* Search Header Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 bg-white dark:bg-slate-900"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 50+ tools, generators & calculators..."
              aria-label="Search tools, generators and calculators"
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="px-2.5 py-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search dialog"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </form>

          {/* Category Filter Pills Container with Smooth Fade Mask */}
          <div className="relative border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/50">
            <div className="px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => setSelectedCat("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer shadow-xs ${
                  selectedCat === "all"
                    ? "bg-indigo-600 text-white shadow-indigo-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer shadow-xs ${
                    selectedCat === cat.id
                      ? "bg-indigo-600 text-white shadow-indigo-500/20"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {/* Right edge smooth indicator fade */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent" />
          </div>

          {/* Body Section with Sleek Slim Scrollbar */}
          <div
            ref={listRef}
            className="p-4 overflow-y-auto space-y-4 flex-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {/* Recent Searches (when query is empty) */}
            {!query && recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-bold px-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Recent Searches
                  </span>
                  <button
                    type="button"
                    onClick={clearSearches}
                    className="text-[11px] hover:text-rose-500 dark:hover:text-rose-400 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches Pills (Formatted Cleanly) */}
            {!query && (
              <div className="space-y-2">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold px-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Popular Suggestions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TOOLS.filter((t) => t.isTrending || t.isPopular)
                    .slice(0, 5)
                    .map((t) => {
                      const displayTitle = t.title.split("–")[0].trim();
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleSelectTool(t.slug, t.title)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-200/40 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition cursor-pointer shadow-xs"
                        >
                          {displayTitle}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Tool Results List */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 px-1 mb-1">
                <span>{query ? `Search Results (${filteredTools.length})` : "All Micro-Tools"}</span>
                {filteredTools.length > 0 && (
                  <span className="text-[10px] hidden sm:inline">Use ↑ ↓ to navigate</span>
                )}
              </div>

              {filteredTools.length > 0 ? (
                filteredTools.map((tool, idx) => {
                  const IconComp =
                    ICON_MAP[tool.iconName] ||
                    CATEGORY_ICON_MAP[tool.category] ||
                    Sparkles;
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={tool.id}
                      data-index={idx}
                      onClick={() => handleSelectTool(tool.slug, tool.title)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition group border ${
                        isSelected
                          ? "bg-indigo-50/80 dark:bg-slate-800/90 border-indigo-200 dark:border-indigo-900/60 shadow-xs"
                          : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center font-extrabold text-sm shadow-sm shrink-0`}
                        >
                          <IconComp className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-bold text-sm truncate transition ${
                                isSelected
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                              }`}
                            >
                              {tool.title}
                            </h4>
                            <span className="hidden sm:inline text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                              {tool.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition shrink-0 pl-1">
                        {isSelected && (
                          <span className="hidden sm:inline-flex items-center text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded mr-1">
                            <CornerDownLeft className="w-3 h-3 mr-0.5" />
                          </span>
                        )}
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "translate-x-1 text-indigo-500 dark:text-indigo-400" : ""
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 px-4 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    No tools found for &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-slate-400">
                    Try searching for terms like &quot;love&quot;, &quot;wheel&quot;, &quot;font&quot;, or &quot;age&quot;.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Search Footer */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold">
                  ↑↓
                </kbd>{" "}
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold">
                  ↵
                </kbd>{" "}
                select
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span>Exit</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold">
                ESC
              </kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

