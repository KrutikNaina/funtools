"use client";

import { EEATMetadata } from "@/types/tool";
import { ShieldCheck, UserCheck, Clock, FileCheck, AlertTriangle } from "lucide-react";

export default function TrustAuthorBox({ eeat }: { eeat: EEATMetadata }) {
  return (
    <div className="space-y-6">
      {/* Author & Reviewer Info Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={eeat.authorAvatar}
            alt={eeat.authorName}
            className="w-12 h-12 rounded-2xl object-cover shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                Written by {eeat.authorName}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Author
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {eeat.authorRole} • Expert Reviewed by <span className="font-semibold text-slate-700 dark:text-slate-300">{eeat.reviewerName}</span> ({eeat.reviewerRole})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Updated: {eeat.lastUpdated}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" /> Version: {eeat.contentVersion}
          </span>
        </div>
      </div>

      {/* Disclaimer Box */}
      {eeat.disclaimerText && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div>
            <span className="font-bold uppercase tracking-wider block text-[10px] mb-0.5">
              {eeat.disclaimerType || "Notice"} Disclaimer
            </span>
            <p className="leading-relaxed opacity-90">{eeat.disclaimerText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
