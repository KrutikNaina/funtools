"use client";

import Link from "next/link";
import { Compass, ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/tools-data";
import { CategoryId } from "@/types/tool";
import { getCategoryAffinities } from "@/lib/recommendations/tool-affinity";

interface CategoryDiscoveryProps {
  currentCategory: CategoryId;
  className?: string;
}

export default function CategoryDiscovery({
  currentCategory,
  className = "",
}: CategoryDiscoveryProps) {
  const currentCatObj = CATEGORIES.find((c) => c.id === currentCategory);
  const relatedCategoryIds = getCategoryAffinities(currentCategory).slice(0, 3);
  const relatedCategories = relatedCategoryIds
    .map((id) => CATEGORIES.find((c) => c.id === id))
    .filter(Boolean);

  if (relatedCategories.length === 0) return null;

  return (
    <div
      className={`p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Vibe Discovery
          </span>
          <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
            Enjoying {currentCatObj?.name || currentCategory}? Discover Next Vibes
          </h4>
        </div>
        <Link
          href="/#categories"
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          All Categories →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {relatedCategories.map((cat) => {
          if (!cat) return null;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition group flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition block">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 line-clamp-1">{cat.description}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-500 transition shrink-0 ml-2" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
