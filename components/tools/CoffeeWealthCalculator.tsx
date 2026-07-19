"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Sparkles, Coffee, Smartphone, Car, Plane } from "lucide-react";

export default function CoffeeWealthCalculator() {
  const [dailyCost, setDailyCost] = useState(6);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(8);

  // Math for compound interest: FV = P * (((1 + r)^n - 1) / r) where P is monthly deposit
  const monthlyDeposit = dailyCost * 30.4;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  const futureValue =
    monthlyRate > 0
      ? monthlyDeposit * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : monthlyDeposit * totalMonths;

  const totalSpent = monthlyDeposit * totalMonths;
  const interestEarned = futureValue - totalSpent;

  // Equivalence milestones
  const iPhones = Math.floor(futureValue / 1100);
  const trips = Math.floor(futureValue / 2500);
  const teslas = (futureValue / 38000).toFixed(1);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-green-200 dark:border-green-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Coins className="w-3.5 h-3.5" />
          Fun Wealth Visualizer
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Coffee to Wealth Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          See what your daily coffee, boba, or takeout habit grows into with compound interest!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span>Daily Habit Cost</span>
              <span className="text-green-600 dark:text-green-400 text-sm">${dailyCost} / day</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={dailyCost}
              onChange={(e) => setDailyCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$2 (Espresso)</span>
              <span>$10 (Lunch)</span>
              <span>$25 (Splurge)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span>Time Horizon</span>
              <span className="text-green-600 dark:text-green-400 text-sm">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span>Expected Annual Return</span>
              <span className="text-green-600 dark:text-green-400 text-sm">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="14"
              step="1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Historical S&P 500 average is ~8-10% return.
            </p>
          </div>
        </div>

        {/* Wealth Output Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs uppercase font-extrabold text-green-400 tracking-wider">
              Future Investment Value
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-1">
              ${Math.round(futureValue).toLocaleString()}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Out of Pocket</span>
                <span className="font-bold text-slate-200">${Math.round(totalSpent).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Compound Growth Earned</span>
                <span className="font-bold text-emerald-400">+${Math.round(interestEarned).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400">
              What This Could Buy You:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <Smartphone className="w-4 h-4 mx-auto text-pink-400 mb-1" />
                <span className="font-extrabold text-white">{iPhones}</span>
                <span className="block text-[9px] text-slate-400">iPhones</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <Plane className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                <span className="font-extrabold text-white">{trips}</span>
                <span className="block text-[9px] text-slate-400">Vacations</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <Car className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                <span className="font-extrabold text-white">{teslas}</span>
                <span className="block text-[9px] text-slate-400">EV Cars</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
