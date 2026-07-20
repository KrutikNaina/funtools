import { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS } from "@/lib/collections-data";
import { getToolsBySlugs } from "@/lib/recommendations";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { Sparkles, ArrowRight, Layers, Compass, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Tool Collections | FunTools",
  description: "Browse hand-picked micro-tool collections for students, Instagram creators, developers, designers, and productivity power users.",
  openGraph: {
    title: "Curated Tool Collections | FunTools",
    description: "Hand-picked collections of top micro-tools, calculators, generators, and fun games.",
    url: "https://funtools.com/collections",
  },
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12 pt-4">
      <Breadcrumb items={[{ label: "Collections" }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          Curated Hubs
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Featured Micro-Tool <span className="gradient-text-primary">Collections</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Hand-picked tool bundles engineered for specific goals—whether you're studying for exams, growing an Instagram profile, or boosting productivity.
        </p>
      </div>

      <AdBanner slot="8877665544" format="horizontal" label="Collections Sponsor" />

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COLLECTIONS.map((col) => {
          const colTools = getToolsBySlugs(col.toolSlugs);
          return (
            <div
              key={col.id}
              className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-2xl transition duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${col.badgeBg}`}>
                    {colTools.length} Hand-picked Tools
                  </div>
                  <Sparkles className="w-5 h-5 text-indigo-500 opacity-60 group-hover:opacity-100 transition" />
                </div>

                <div className={`p-6 rounded-2xl bg-gradient-to-r ${col.gradient} text-white space-y-2 shadow-lg`}>
                  <h2 className="text-2xl font-black">{col.title}</h2>
                  <p className="text-sm opacity-90 leading-relaxed">{col.description}</p>
                </div>

                {/* Preview Mini Tool Chips */}
                <div className="pt-2">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Included Tools:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {colTools.map((t) => (
                      <Link
                        key={t.id}
                        href={`/tools/${t.slug}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold transition"
                      >
                        {t.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Curated & Updated Weekly</span>
                <Link
                  href={`/collections/${col.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
