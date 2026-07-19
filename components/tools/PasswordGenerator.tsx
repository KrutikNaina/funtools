"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Copy, Check, RefreshCw, Key, Lock } from "lucide-react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) return "Select at least 1 option";

    let pass = "";
    const array = new Uint32Array(length);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        pass += chars[array[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return pass;
  };

  const [password, setPassword] = useState(generatePassword());

  const handleRegenerate = () => {
    setPassword(generatePassword());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score
  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 2;
    if (length >= 16) score += 1;
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 2;

    if (score <= 3) return { label: "Weak", color: "text-rose-500", bg: "bg-rose-500" };
    if (score <= 5) return { label: "Good", color: "text-amber-500", bg: "bg-amber-500" };
    if (score <= 7) return { label: "Strong", color: "text-emerald-500", bg: "bg-emerald-500" };
    return { label: "Very Strong", color: "text-teal-400", bg: "bg-teal-400" };
  };

  const strength = getStrength();

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-emerald-200 dark:border-emerald-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Cryptographic Security Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Strong Password Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Generate unhackable passwords locally in your browser with 100% privacy.
        </p>
      </div>

      {/* Main Output Box */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-inner mb-6">
        <span className="font-mono text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-wider break-all">
          {password}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRegenerate}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition cursor-pointer"
            title="Generate New Password"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              copied
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Controls & Options */}
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <span>Password Length</span>
            <span className="text-emerald-600 font-extrabold">{length} Characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
              setTimeout(handleRegenerate, 0);
            }}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Strength Bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">Security Rating:</span>
          <span className={`text-xs font-extrabold ${strength.color}`}>{strength.label}</span>
          <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.bg} transition-all duration-300`}
              style={{
                width:
                  strength.label === "Weak"
                    ? "25%"
                    : strength.label === "Good"
                    ? "50%"
                    : strength.label === "Strong"
                    ? "75%"
                    : "100%",
              }}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <label className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => {
                setIncludeUppercase(e.target.checked);
                setTimeout(handleRegenerate, 0);
              }}
              className="accent-emerald-500 w-4 h-4 rounded"
            />
            <span>A-Z Uppercase</span>
          </label>

          <label className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => {
                setIncludeLowercase(e.target.checked);
                setTimeout(handleRegenerate, 0);
              }}
              className="accent-emerald-500 w-4 h-4 rounded"
            />
            <span>a-z Lowercase</span>
          </label>

          <label className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => {
                setIncludeNumbers(e.target.checked);
                setTimeout(handleRegenerate, 0);
              }}
              className="accent-emerald-500 w-4 h-4 rounded"
            />
            <span>0-9 Numbers</span>
          </label>

          <label className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => {
                setIncludeSymbols(e.target.checked);
                setTimeout(handleRegenerate, 0);
              }}
              className="accent-emerald-500 w-4 h-4 rounded"
            />
            <span>!@#$ Symbols</span>
          </label>
        </div>
      </div>
    </div>
  );
}
