"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

export default function AdBanner({
  slot = "1234567890",
  format = "horizontal",
  className = "",
  label = "Advertisement",
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // AdSense script fallback handled safely
    }
  }, []);

  return (
    <div
      className={`my-8 w-full flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 text-center min-h-[100px] overflow-hidden ${className}`}
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
        {label}
      </span>
      {/* Real AdSense Ins Tag */}
      <ins
        className="adsbygoogle w-full block"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with real pub-id when live
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Fallback preview indicator for development/review */}
      <div className="w-full py-3 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        Google AdSense Compliant Banner Slot ({format})
      </div>
    </div>
  );
}
