import Breadcrumb from "@/components/Breadcrumb";
import { Sparkles, Shield, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
      <Breadcrumb items={[{ label: "About Us" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          About FunTools
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          FunTools is a modern, privacy-first consumer platform dedicated to crafting delightful, interactive micro-tools, generators, decision spinners, and calculators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <Zap className="w-6 h-6 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Lightning Fast</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Built with Next.js 15 Server Components and client-side processing for instant performance.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <Shield className="w-6 h-6 text-emerald-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">100% Private</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All text formatting, math, and quiz logic run directly in your browser. We never store personal text.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Always Free</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every single micro-tool is free with no subscriptions or mandatory registration required.
          </p>
        </div>
      </div>
    </div>
  );
}
