"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, ArrowRight, Flame } from "lucide-react";
import { TOOLS } from "@/lib/tools-data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTools = TOOLS.filter(
    (tool) =>
      tool.title.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectTool = (slug: string) => {
    router.push(`/tools/${slug}`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Search Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-indigo-500" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 50+ fun tools, generators & calculators..."
              className="flex-1 bg-transparent text-base md:text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="p-4 overflow-y-auto space-y-2 flex-1">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.slug)}
                  className="p-3.5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center font-extrabold text-sm shadow-md`}>
                      <Sparkles className="w-5 h-5" />
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
              <div className="text-center py-12 text-slate-400 text-sm">
                No tools found for "{query}". Try searching "love", "font", "wheel", or "age"!
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Pro Tip: Press <kbd className="px-1 bg-white dark:bg-slate-800 rounded font-mono">ESC</kbd> to exit
            </span>
            <span className="font-semibold text-indigo-500">
              {filteredTools.length} tools available
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
