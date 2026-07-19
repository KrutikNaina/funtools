"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, RefreshCw, CheckCircle2, Trophy, Share2 } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  options: { text: string; archetype: string; emoji: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What's your ideal setup when getting to work?",
    options: [
      { text: "3 monitors, dark mode, mechanical keyboard clicks", archetype: "ninja", emoji: "⌨️" },
      { text: "ChatGPT + Midjourney open on full screen", archetype: "whisperer", emoji: "🤖" },
      { text: "Figma with 100 artboards and exact pixel grids", archetype: "designer", emoji: "🎨" },
      { text: "Terminal, coffee, and Lo-Fi beats at 2 AM", archetype: "debugger", emoji: "🌙" },
    ],
  },
  {
    id: 2,
    question: "When a bug or obstacle occurs, you...",
    options: [
      { text: "Console log everything and inspect stack traces", archetype: "debugger", emoji: "🔍" },
      { text: "Ask AI to refactor the entire component", archetype: "whisperer", emoji: "🔮" },
      { text: "Redesign the UI flow so the bug becomes a feature", archetype: "designer", emoji: "✨" },
      { text: "Write a 5-line bash script to automate it away", archetype: "ninja", emoji: "⚡" },
    ],
  },
  {
    id: 3,
    question: "Your favorite tech secret weapon is...",
    options: [
      { text: "Keyboard shortcuts and Vim commands", archetype: "ninja", emoji: "🚀" },
      { text: "Prompt engineering frameworks", archetype: "whisperer", emoji: "🧠" },
      { text: "Custom CSS animations and color palettes", archetype: "designer", emoji: "🌈" },
      { text: "Deep focus state with zero notifications", archetype: "debugger", emoji: "🎧" },
    ],
  },
  {
    id: 4,
    question: "How do you define product perfection?",
    options: [
      { text: "Instant 60fps load speeds and lightweight bundle", archetype: "ninja", emoji: "💨" },
      { text: "Flawless UX micro-interactions and stunning visuals", archetype: "designer", emoji: "💎" },
      { text: "Generative AI intelligence built into every click", archetype: "whisperer", emoji: "🌟" },
      { text: "100% test coverage and rock-solid architecture", archetype: "debugger", emoji: "🛡️" },
    ],
  },
];

const ARCHETYPES: Record<string, { title: string; badge: string; desc: string; superpower: string; color: string }> = {
  ninja: {
    title: "⚡ Keyboard Ninja",
    badge: "10x SPEED DEMON",
    desc: "You navigate software at the speed of thought. Shortcuts are your love language and slow software is your nemesis.",
    superpower: "Insane execution speed & terminal mastery",
    color: "from-blue-500 to-indigo-600",
  },
  whisperer: {
    title: "🤖 AI Prompt Whisperer",
    badge: "FUTURE ARCHITECT",
    desc: "You see AI as a force multiplier. You craft prompts that turn simple ideas into fully polished products in minutes.",
    superpower: "Synthesizing AI intelligence into reality",
    color: "from-purple-500 to-pink-600",
  },
  designer: {
    title: "🎨 Pixel Perfectionist",
    badge: "VISUAL MAESTRO",
    desc: "You care deeply about aesthetics, spacing, colors, and delightful micro-interactions. You make products people love to use.",
    superpower: "Crafting modern, unforgettable UX",
    color: "from-pink-500 to-rose-600",
  },
  debugger: {
    title: "🌙 Midnight Debugger",
    badge: "ROCK SOLID LOGIC",
    desc: "You love solving complex puzzles, deep dive architecture, and making systems bulletproof under pressure.",
    superpower: "Unstoppable problem-solving grit",
    color: "from-emerald-500 to-teal-600",
  },
};

export default function TechArchetypeQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    ninja: 0,
    whisperer: 0,
    designer: 0,
    debugger: 0,
  });
  const [finalArchetype, setFinalArchetype] = useState<string | null>(null);

  const handleSelectOption = (archetype: string) => {
    const updatedScores = {
      ...scores,
      [archetype]: (scores[archetype] || 0) + 1,
    };
    setScores(updatedScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate top archetype
      let topKey = "ninja";
      let maxScore = -1;
      Object.entries(updatedScores).forEach(([k, v]) => {
        if (v > maxScore) {
          maxScore = v;
          topKey = k;
        }
      });
      setFinalArchetype(topKey);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setScores({ ninja: 0, whisperer: 0, designer: 0, debugger: 0 });
    setFinalArchetype(null);
  };

  const currentQ = QUESTIONS[currentStep];
  const progressPercent = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-violet-200 dark:border-violet-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <BrainCircuit className="w-3.5 h-3.5" />
          Tech Personality Test
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Which Tech Archetype Are You?
        </h2>
      </div>

      {!finalArchetype ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(progressPercent)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white text-center mb-4">
                {currentQ.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.archetype)}
                    className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500 text-left font-medium text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-3 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-sm"
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Result Screen */
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-5"
          >
            <div className={`p-6 rounded-3xl bg-gradient-to-r ${ARCHETYPES[finalArchetype].color} text-white shadow-xl space-y-2`}>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-white/20 px-3 py-1 rounded-full">
                {ARCHETYPES[finalArchetype].badge}
              </span>
              <h3 className="text-3xl font-black">{ARCHETYPES[finalArchetype].title}</h3>
              <p className="text-sm opacity-90 leading-relaxed max-w-md mx-auto">
                {ARCHETYPES[finalArchetype].desc}
              </p>
              <div className="pt-3 border-t border-white/20 text-xs font-semibold">
                ✨ Superpower: {ARCHETYPES[finalArchetype].superpower}
              </div>
            </div>

            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Retake Archetype Quiz
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
