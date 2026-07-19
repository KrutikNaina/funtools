"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Search, Grid, Bookmark, Filter, ArrowUpDown } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/tools-data";
import ToolCard from "@/components/ToolCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";

function DirectoryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "latest">("popular");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesQuery =
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesCat = selectedCategory === "all" || tool.category === selectedCategory;

      let matchesBookmark = true;
      if (onlyBookmarks) {
        matchesBookmark = !!localStorage.getItem(`funtools_bookmark_${tool.id}`);
      }

      return matchesQuery && matchesCat && matchesBookmark;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.isPopular ? 1 : -1;
      return 0;
    });
  }, [query, selectedCategory, sortBy, onlyBookmarks]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-16 space-y-8">
      <Breadcrumb items={[{ label: "Tools Directory" }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Grid className="w-3.5 h-3.5" />
          Interactive Tools Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          All Fun Tools & Micro-Apps
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Explore our complete directory of viral font generators, love meters, mini-games, and calculators.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by tool name, keyword or tag..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Sort Selector */}
            <div className="relative flex-1 md:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="latest">Recently Added</option>
              </select>
            </div>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                onlyBookmarks
                  ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Bookmarks</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <AdBanner slot="7766554433" format="horizontal" label="Catalog Ad" />

      {/* Tool Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Sparkles className="w-10 h-10 mx-auto text-indigo-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No tools found</h3>
          <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}

export default function ToolsDirectoryPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading directory...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}
