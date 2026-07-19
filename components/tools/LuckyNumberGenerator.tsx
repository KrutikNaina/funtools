"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dices, Sparkles, RefreshCw, Star } from "lucide-react";

const ZODIACS = [
  { name: "Aries", element: "Fire", color: "from-red-500 to-amber-500" },
  { name: "Taurus", element: "Earth", color: "from-emerald-500 to-green-600" },
  { name: "Gemini", element: "Air", color: "from-yellow-400 to-amber-500" },
  { name: "Cancer", element: "Water", color: "from-cyan-500 to-blue-500" },
  { name: "Leo", element: "Fire", color: "from-orange-500 to-yellow-500" },
  { name: "Virgo", element: "Earth", color: "from-teal-500 to-emerald-600" },
  { name: "Libra", element: "Air", color: "from-pink-400 to-purple-500" },
  { name: "Scorpio", element: "Water", color: "from-purple-600 to-indigo-800" },
  { name: "Sagittarius", element: "Fire", color: "from-indigo-500 to-purple-600" },
  { name: "Capricorn", element: "Earth", color: "from-slate-600 to-slate-800" },
  { name: "Aquarius", element: "Air", color: "from-sky-400 to-blue-600" },
  { name: "Pisces", element: "Water", color: "from-violet-400 to-fuchsia-500" },
];

export default function LuckyNumberGenerator() {
  const [selectedZodiac, setSelectedZodiac] = useState("Leo");
  const [birthdate, setBirthdate] = useState("2000-08-15");
  const [isSpinning, setIsSpinning] = useState(false);

  const generateLuckyNumbers = () => {
    const d = new Date(birthdate);
    const seed = (d.getFullYear() || 2000) + (d.getMonth() + 1) + (d.getDate() || 15);
    const numbers: number[] = [];

    while (numbers.length < 6) {
      const num = ((seed * (numbers.length + 7) * 31) % 69) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    const megaBall = ((seed * 13) % 26) + 1;

    return { main: numbers.sort((a, b) => a - b), megaBall };
  };

  const [lucky, setLucky] = useState(generateLuckyNumbers());

  const handleRegenerate = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setLucky(generateLuckyNumbers());
      setIsSpinning(false);
    }, 200);
  };

  const currentZodiacObj = ZODIACS.find((z) => z.name === selectedZodiac) || ZODIACS[4];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-violet-200 dark:border-violet-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Astrological Numerology Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Cosmic Lucky Number Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Calculate personal lucky numbers for lottery picks, horoscope, and daily choices.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-lg mx-auto text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Zodiac Sign
            </label>
            <select
              value={selectedZodiac}
              onChange={(e) => setSelectedZodiac(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              {ZODIACS.map((z) => (
                <option key={z.name} value={z.name}>
                  {z.name} ({z.element})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Output Display */}
      <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-r ${currentZodiacObj.color} text-white text-center shadow-xl space-y-4`}>
        <span className="text-xs uppercase font-extrabold tracking-widest text-white/80 block">
          {selectedZodiac} Lucky Numbers • {currentZodiacObj.element} Energy
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {lucky.main.map((n, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-11 h-11 rounded-2xl bg-white text-slate-900 font-black text-lg flex items-center justify-center shadow-lg"
            >
              {n}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-900 font-black text-lg flex items-center justify-center shadow-lg border-2 border-white"
            title="Cosmic Power Ball"
          >
            {lucky.megaBall}
          </motion.span>
        </div>

        <button
          onClick={handleRegenerate}
          disabled={isSpinning}
          className="mt-2 px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin" : ""}`} />
          <span>Recalculate Energy</span>
        </button>
      </div>
    </div>
  );
}
