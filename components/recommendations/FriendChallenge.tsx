"use client";

import { useState } from "react";
import { Trophy, Copy, Check, Share2, Users, Send } from "lucide-react";
import { ChallengePayload } from "@/lib/recommendations/recommendation-types";
import { trackEvent } from "@/lib/recommendations/event-bus";

interface FriendChallengeProps {
  toolSlug: string;
  toolTitle: string;
  myScore: number | string;
  scoreUnit?: string;
  className?: string;
}

export default function FriendChallenge({
  toolSlug,
  toolTitle,
  myScore,
  scoreUnit = "",
  className = "",
}: FriendChallengeProps) {
  const [challengerName, setChallengerName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const createChallenge = () => {
    const name = challengerName.trim() || "A Friend";
    const payload: ChallengePayload = {
      id: Math.random().toString(36).substring(2, 9),
      toolSlug,
      toolTitle,
      challengerName: name,
      challengerScore: myScore,
      scoreUnit,
      createdAt: Date.now(),
    };

    const encoded = encodeURIComponent(
      typeof window !== "undefined"
        ? btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
        : ""
    );

    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "https://getfuntools.app";
    const link = `${baseUrl}/challenge?c=${encoded}`;
    setGeneratedLink(link);
    trackEvent("challenge_created", { toolSlug, score: myScore });
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  const shareWhatsApp = () => {
    if (!generatedLink) return;
    const text = encodeURIComponent(
      `🏆 I scored ${myScore}${scoreUnit} on ${toolTitle}! Can you beat me? Accept my challenge: ${generatedLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div
      className={`w-full max-w-md mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-300 dark:border-amber-700/60 shadow-lg text-center space-y-4 ${className}`}
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
        <Trophy className="w-3.5 h-3.5" />
        <span>Rivalry Mode</span>
      </div>

      <div className="space-y-1">
        <h4 className="text-xl font-black text-slate-900 dark:text-white">
          🏆 Challenge a Friend!
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          I scored <span className="font-extrabold text-amber-500">{myScore} {scoreUnit}</span>. Can your friends beat your score?
        </p>
      </div>

      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            createChallenge();
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-extrabold text-xs shadow-md hover:scale-105 transition flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span>Challenge a Friend Now</span>
        </button>
      ) : (
        <div className="space-y-3 pt-2 text-left">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Your Name / Nickname
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={challengerName}
                onChange={(e) => setChallengerName(e.target.value)}
                placeholder="e.g. Alex"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                onClick={createChallenge}
                className="px-3 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>

          {generatedLink && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-600 dark:text-slate-300 truncate"
                />
                <button
                  onClick={copyLink}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <button
                onClick={shareWhatsApp}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
