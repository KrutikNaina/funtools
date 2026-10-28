import React from "react";
import { ShieldCheck, Zap, Lock, Clock, User, Calendar, CheckCircle2 } from "lucide-react";

export interface ToolTrustBarItem {
  icon?: React.ReactNode;
  label: string;
}

export interface ToolTrustBarProps {
  items?: ToolTrustBarItem[];
  readTime?: string;
  authorName?: string;
  lastUpdated?: string;
  className?: string;
}

/**
 * Clean trust & metadata bar to display below the interactive tool
 * Preserves EEAT authorship, security assurance, and feature badges without blocking above-the-fold interactivity.
 */
export default function ToolTrustBar({
  items,
  readTime,
  authorName,
  lastUpdated,
  className = "",
}: ToolTrustBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3 px-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/70 text-xs font-medium text-slate-500 dark:text-slate-400 ${className}`}
    >
      {items && items.length > 0 ? (
        items.map((it, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            {it.icon || <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            <span>{it.label}</span>
          </span>
        ))
      ) : (
        <>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Free &amp; Secure</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Results</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Zero Server Storage</span>
          </span>
        </>
      )}

      {readTime && (
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span>{readTime}</span>
        </span>
      )}
      {authorName && (
        <span className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-purple-500" />
          <span>By {authorName}</span>
        </span>
      )}
      {lastUpdated && (
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-pink-500" />
          <span>Updated {lastUpdated}</span>
        </span>
      )}
    </div>
  );
}
