"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Type, Sparkles, Search } from "lucide-react";

// Unicode style transformers
const transformFont = (text: string, style: string): string => {
  if (!text) return "Preview Text Here";

  const charMap: Record<string, (char: string) => string> = {
    bold: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + code - 48);
      return c;
    },
    italic: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d44e + code - 97);
      return c;
    },
    script: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d49c + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4b6 + code - 97);
      return c;
    },
    doubleStruck: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d538 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d552 + code - 97);
      return c;
    },
    gothic: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d56c + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + code - 97);
      return c;
    },
    monospace: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d670 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d68a + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7f6 + code - 48);
      return c;
    },
    bubble: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + code - 97);
      return c;
    },
    square: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f130 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f130 + code - 97);
      return c;
    },
  };

  const fn = charMap[style];
  if (!fn) return text;
  return text.split("").map(fn).join("");
};

const STYLES = [
  { id: "bold", name: "Bold Sans", badge: "POPULAR" },
  { id: "script", name: "Cursive Script", badge: "ELEGANT" },
  { id: "gothic", name: "Gothic Fraktur", badge: "DARK" },
  { id: "doubleStruck", name: "Outline Double", badge: "COOL" },
  { id: "bubble", name: "Bubble Circles", badge: "CUTE" },
  { id: "italic", name: "Slanted Italic", badge: "CLEAN" },
  { id: "monospace", name: "Tech Monospace", badge: "GEEK" },
  { id: "square", name: "Squared Block", badge: "BOLD" },
];

export default function FancyFontGenerator() {
  const [inputText, setInputText] = useState("Aesthetic Bio & Handles");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (styledText: string, styleId: string) => {
    navigator.clipboard.writeText(styledText);
    setCopiedId(styleId);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredStyles = STYLES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-fuchsia-200 dark:border-fuchsia-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Type className="w-3.5 h-3.5" />
          Aesthetic Text Converter
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Viral Fancy Font Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Type your text below and tap any font style to copy it directly to your clipboard.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your bio, caption or name here..."
            className="w-full px-5 py-4 text-base md:text-lg rounded-2xl bg-white dark:bg-slate-900 border-2 border-fuchsia-300 dark:border-fuchsia-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/20 transition shadow-inner"
          />
          {inputText && (
            <button
              onClick={() => setInputText("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter font styles..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {filteredStyles.length} Styles Available
          </span>
        </div>
      </div>

      {/* Font Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStyles.map((style) => {
          const styledText = transformFont(inputText, style.id);
          const isCopied = copiedId === style.id;

          return (
            <motion.div
              key={style.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-fuchsia-400 dark:hover:border-fuchsia-600 flex flex-col justify-between transition shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  {style.name}
                </span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400">
                  {style.badge}
                </span>
              </div>

              <p className="text-lg md:text-xl font-medium text-slate-900 dark:text-white break-all my-2 min-h-[36px] flex items-center">
                {styledText}
              </p>

              <button
                type="button"
                onClick={() => handleCopy(styledText, style.id)}
                className={`mt-2 w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                  isCopied
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-fuchsia-500 hover:text-white dark:hover:bg-fuchsia-600"
                }`}
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? "Copied to Clipboard!" : "Copy Font"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
