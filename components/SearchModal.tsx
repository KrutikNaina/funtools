"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, ArrowRight, Clock, Trash2, Flame, Grid } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/tools-data";
import { useUserStore } from "@/lib/user-store";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const router = useRouter();
  const { recentSearches, addSearch, clearSearches } = useUserStore();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCat("all");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCat = selectedCat === "all" || tool.category === selectedCat;
    const matchesQuery =
      tool.title.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleSelectTool = (slug: string, toolTitle: string) => {
    addSearch(toolTitle);
    router.push(`/tools/${slug}`);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearch(query.trim());
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[82vh]"
        >
          {/* Search Header Form */}
          <form onSubmit={handleSearchSubmit} className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 50+ tools, generators & calculators..."
              className="flex-1 bg-transparent text-base md:text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-150 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCat("all")}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCat === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-400"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Body Section */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1">
            {/* Recent Searches (when query is empty) */}
            {!query && recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Recent Searches
                  </span>
                  <button
                    type="button"
                    onClick={clearSearches}
                    className="text-[11px] hover:text-rose-500 transition flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches Pills */}
            {!query && (
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-bold px-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Popular Suggestions
                </span>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.filter((t) => t.isTrending).slice(0, 5).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTool(t.slug, t.title)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-600 hover:text-white transition"
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tool Results List */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 px-1">
                {query ? `Search Results (${filteredTools.length})` : "All Micro-Tools"}
              </span>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.slug, tool.title)}
                    className="p-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center font-extrabold text-sm shadow-sm`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                          {tool.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition" />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-sm">
                  No tools found for "{query}". Try searching another keyword!
                </div>
              )}
            </div>
          </div>

          {/* Search Footer */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between px-6">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">ESC</kbd> to exit</span>
            <span>Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">Ctrl+K</kbd> anywhere</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
