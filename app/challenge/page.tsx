"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Zap, ArrowRight, CheckCircle2, Award, Users, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { TOOLS } from "@/lib/tools-data";
import { Tool } from "@/types/tool";
import { ChallengePayload } from "@/lib/recommendations/recommendation-types";
import { recordChallenge, useUserProfile, trackEvent } from "@/lib/recommendations";
import DynamicToolRenderer from "@/app/tools/[slug]/DynamicToolRenderer";
import SurpriseMeButton from "@/components/recommendations/SurpriseMeButton";

function ChallengeContent() {
  const searchParams = useSearchParams();
  const rawPayload = searchParams.get("c");
  const [challenge, setChallenge] = useState<ChallengePayload | null>(null);
  const [targetTool, setTargetTool] = useState<Tool | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [myScore, setMyScore] = useState<number | string | null>(null);
  const { profile } = useUserProfile();

  useEffect(() => {
    if (!rawPayload) return;
    try {
      const decoded = decodeURIComponent(escape(atob(decodeURIComponent(rawPayload))));
      const parsed: ChallengePayload = JSON.parse(decoded);
      setChallenge(parsed);
      const tool = TOOLS.find((t) => t.slug === parsed.toolSlug) || TOOLS[0];
      setTargetTool(tool);
      trackEvent("challenge_started", { toolSlug: parsed.toolSlug });
    } catch (e) {
      // Invalid challenge payload fallback
      setTargetTool(TOOLS[0]);
    }
  }, [rawPayload]);

  const handleFinishChallenge = (score: number | string) => {
    setMyScore(score);
    if (!challenge || !targetTool) return;

    let won = false;
    const s1 = parseFloat(String(challenge.challengerScore));
    const s2 = parseFloat(String(score));

    // For reaction time, lower is better. For percentage or others, higher is better.
    if (!isNaN(s1) && !isNaN(s2)) {
      if (challenge.toolSlug === "reaction-time-test") {
        won = s2 <= s1;
      } else {
        won = s2 >= s1;
      }
    }

    recordChallenge({
      id: challenge.id,
      toolSlug: challenge.toolSlug,
      challengerScore: challenge.challengerScore,
      friendScore: score,
      won,
      timestamp: Date.now(),
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  if (!challenge || !targetTool) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center space-y-8">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-md">
          <Trophy className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            🏆 GetFunTools Arena & Challenges
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Challenge your friends to see who has faster reflexes, higher cosmic compatibility, or better luck!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-left pt-4">
          {TOOLS.filter((t) =>
            ["reaction-time-test", "love-calculator", "decision-wheel"].includes(t.slug)
          ).map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition shadow-md group space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shadow-lg`}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{tool.description}</p>
              </div>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                <span>Start Challenge</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
      {/* Challenger Announcement Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-indigo-500/15 border border-amber-300/60 dark:border-amber-700/60 text-center space-y-5 shadow-xl relative overflow-hidden"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
          <Trophy className="w-4 h-4" />
          <span>Friend Challenge Active</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
          <span className="text-amber-500">{challenge.challengerName}</span> challenged you!
        </h1>

        <div className="max-w-sm mx-auto p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">Their Score to Beat:</span>
          <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
            {challenge.challengerScore} {challenge.scoreUnit}
          </div>
          <span className="text-xs text-slate-500 font-medium">on {challenge.toolTitle}</span>
        </div>

        {!accepted ? (
          <button
            onClick={() => setAccepted(true)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-black text-sm shadow-xl hover:scale-105 transition cursor-pointer inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Accept Challenge & Play</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Challenge in progress! Play the tool below.</span>
          </div>
        )}
      </motion.div>

      {/* Tool Container */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span>Interactive Tool: {targetTool.title}</span>
          </h2>
          <SurpriseMeButton currentSlug={targetTool.slug} variant="pill" />
        </div>

        <div className="rounded-3xl p-1 bg-gradient-to-b from-indigo-500/20 to-transparent">
          <DynamicToolRenderer tool={targetTool} />
        </div>
      </section>

      {/* Challenge Score Comparison / Conclusion */}
      {myScore !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 shadow-2xl text-center space-y-6"
        >
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Match Results!
          </h3>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                {challenge.challengerName}
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {challenge.challengerScore} {challenge.scoreUnit}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-300 dark:border-indigo-700">
              <span className="text-xs uppercase font-bold text-indigo-500 block mb-1">
                Your Score
              </span>
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {myScore} {challenge.scoreUnit}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              href={`/tools/${targetTool.slug}`}
              className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition"
            >
              Play Again
            </Link>
            <Link
              href="/tools"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
            >
              Explore More Tools
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function ChallengePage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center">Loading Challenge...</div>}>
      <ChallengeContent />
    </Suspense>
  );
}
