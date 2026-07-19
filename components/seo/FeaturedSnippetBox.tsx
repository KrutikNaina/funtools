"use client";

import { FeaturedSnippets } from "@/types/tool";
import { Sparkles, ListOrdered, Table, FileText } from "lucide-react";

export default function FeaturedSnippetBox({ snippets }: { snippets: FeaturedSnippets }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Featured Snippets & Fast Reference
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paragraph Snippet */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-500 flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Direct Definition Snippet
          </span>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {snippets.paragraphSnippet}
          </p>
        </div>

        {/* Numbered Snippet */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-500 flex items-center gap-1.5">
            <ListOrdered className="w-4 h-4" /> Quick How-To List Snippet
          </span>
          <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
            {snippets.numberedSnippet.map((step, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Table Snippet */}
      {snippets.tableSnippet && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm overflow-x-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
            <Table className="w-4 h-4" /> Data Reference Table
          </span>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                {snippets.tableSnippet.header.map((h, idx) => (
                  <th key={idx} className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {snippets.tableSnippet.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
