"use client";

import { useState } from "react";
import { AEOSummaries } from "@/types/tool";
import { Bot, Sparkles, CheckCircle2, Table as TableIcon } from "lucide-react";

export default function AEOOverviewBox({ summaries }: { summaries: AEOSummaries }) {
  const [activeTab, setActiveTab] = useState<"50" | "100" | "200">("100");

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-slate-900 text-white border border-purple-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-purple-300 block">
              AI Overview & LLM Citation Hub
            </span>
            <h3 className="text-xl font-black text-white">
              AI Search Quick Summary
            </h3>
          </div>
        </div>

        {/* Word Length Selector */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-slate-950/60 border border-purple-500/30 text-xs font-bold">
          <button
            onClick={() => setActiveTab("50")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "50" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            50 Words
          </button>
          <button
            onClick={() => setActiveTab("100")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "100" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            100 Words
          </button>
          <button
            onClick={() => setActiveTab("200")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "200" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            200 Words
          </button>
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="p-4 rounded-2xl bg-slate-950/50 border border-purple-500/20 text-sm text-purple-100 leading-relaxed font-medium">
        {activeTab === "50" && <p>{summaries.summary50}</p>}
        {activeTab === "100" && <p>{summaries.summary100}</p>}
        {activeTab === "200" && <p>{summaries.summary200}</p>}
      </div>

      {/* Bullet & Table Answer Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        {/* Bullet Answer */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-2">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Answer Points
          </span>
          <ul className="space-y-1.5 text-xs text-purple-100 font-medium">
            {summaries.bulletAnswer.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Table Answer */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-2">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block flex items-center gap-1.5">
            <TableIcon className="w-4 h-4 text-cyan-400" /> Quick Data Matrix
          </span>
          <div className="space-y-1.5 text-xs">
            {summaries.tableAnswer.map((row, idx) => (
              <div key={idx} className="flex justify-between py-1 border-b border-purple-500/20 last:border-0">
                <span className="text-slate-400 font-medium">{row.col1}</span>
                <span className="text-white font-bold">{row.col2}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
