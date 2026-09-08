"use client";

import { useState, useRef } from "react";
import {
  Share2,
  Copy,
  Check,
  Download,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { trackEvent, recordToolShare } from "@/lib/recommendations";

interface ShareableResultCardProps {
  toolTitle: string;
  toolSlug: string;
  metricLabel: string;
  metricValue: string | number;
  highlightBadge?: string;
  subtitle?: string;
  callToAction?: string;
  className?: string;
}

export default function ShareableResultCard({
  toolTitle,
  toolSlug,
  metricLabel,
  metricValue,
  highlightBadge = "🔥 TOP PERFORMANCE",
  subtitle = "Tested on GetFunTools.app",
  callToAction = "Can you beat me?",
  className = "",
}: ShareableResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toolUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/tools/${toolSlug}`
      : `https://getfuntools.app/tools/${toolSlug}`;

  const shareText = `${metricLabel}: ${metricValue} — ${callToAction} Check out ${toolTitle} on GetFunTools!`;

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${toolUrl}`);
      setCopied(true);
      recordToolShare(toolSlug);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback
    }
  };

  const shareTo = (platform: "whatsapp" | "twitter" | "facebook" | "linkedin") => {
    recordToolShare(toolSlug);
    const encodedUrl = encodeURIComponent(toolUrl);
    const encodedText = encodeURIComponent(shareText);

    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (url && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Pure HTML5 Canvas Client-side card generator (Zero external dependencies!)
  const downloadCardImage = () => {
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
      bgGrad.addColorStop(0, "#0b0f19");
      bgGrad.addColorStop(0.5, "#1e1b4b");
      bgGrad.addColorStop(1, "#311042");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // Ambient circles
      ctx.beginPath();
      ctx.arc(1000, 150, 250, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(200, 500, 300, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(99, 102, 241, 0.12)";
      ctx.fill();

      // Card Border & Container
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 1080, 510);

      // Tool Title
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(toolTitle.toUpperCase(), 600, 150);

      // Metric Label
      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 28px sans-serif";
      ctx.fillText(metricLabel.toUpperCase(), 600, 220);

      // Big Metric Value
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 100px sans-serif";
      ctx.fillText(String(metricValue), 600, 340);

      // Highlight Badge
      ctx.fillStyle = "#f43f5e";
      ctx.font = "bold 34px sans-serif";
      ctx.fillText(highlightBadge, 600, 420);

      // Call to action & Site
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "500 26px sans-serif";
      ctx.fillText(`${callToAction} — GetFunTools.app`, 600, 480);

      // Convert to blob and download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${toolSlug}-result.png`;
      link.href = dataUrl;
      link.click();
      recordToolShare(toolSlug);
    } catch (err) {
      // Fail gracefully
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl space-y-5 text-center relative overflow-hidden ${className}`}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-black uppercase tracking-wider border border-rose-500/30">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{highlightBadge}</span>
      </div>

      {/* Main Score Output */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
          {metricLabel}
        </span>
        <div className="text-5xl sm:text-6xl font-black tracking-tight text-white py-1">
          {metricValue}
        </div>
        <p className="text-sm font-extrabold text-indigo-300">{callToAction}</p>
      </div>

      <div className="text-[11px] text-slate-400 border-t border-white/10 pt-3 flex items-center justify-between">
        <span>{toolTitle}</span>
        <span className="font-bold text-pink-400">GetFunTools.app</span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={copyResult}
          className="py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied!" : "Copy Result"}</span>
        </button>

        <button
          onClick={downloadCardImage}
          disabled={downloading}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? "Saving..." : "Save Image"}</span>
        </button>
      </div>

      {/* Social Row */}
      <div className="flex items-center justify-center gap-2 pt-1 text-xs">
        <button
          onClick={() => shareTo("whatsapp")}
          className="p-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white transition cursor-pointer"
          title="Share to WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button
          onClick={() => shareTo("twitter")}
          className="p-2.5 rounded-full bg-sky-500/20 hover:bg-sky-500 text-sky-400 hover:text-white transition cursor-pointer"
          title="Share to X"
        >
          <span className="font-bold text-xs">𝕏</span>
        </button>
        <button
          onClick={() => shareTo("facebook")}
          className="p-2.5 rounded-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition cursor-pointer"
          title="Share to Facebook"
        >
          <span className="font-bold text-xs">f</span>
        </button>
        <button
          onClick={() => shareTo("linkedin")}
          className="p-2.5 rounded-full bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white transition cursor-pointer"
          title="Share to LinkedIn"
        >
          <span className="font-bold text-xs">in</span>
        </button>
      </div>
    </div>
  );
}
