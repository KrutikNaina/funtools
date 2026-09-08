"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Type, Search } from "lucide-react";
import { recordToolComplete } from "@/lib/recommendations";

// Unicode style transformers – 20 genuinely distinct styles
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
      if (code >= 97 && code <= 122) {
        if (code === 104) return "\u210e"; // italic h is a special case
        return String.fromCodePoint(0x1d44e + code - 97);
      }
      return c;
    },
    boldItalic: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d468 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d482 + code - 97);
      return c;
    },
    script: (c) => {
      const code = c.charCodeAt(0);
      const specials: Record<number, string> = { 66: "\u212c", 69: "\u2130", 70: "\u2131", 72: "\u210b", 73: "\u2110", 76: "\u2112", 77: "\u2133", 82: "\u211b" };
      if (code >= 65 && code <= 90) return specials[code] || String.fromCodePoint(0x1d49c + code - 65);
      if (code >= 97 && code <= 122) {
        const lower: Record<number, string> = { 101: "\u212f", 103: "\u210a", 111: "\u2134" };
        return lower[code] || String.fromCodePoint(0x1d4b6 + code - 97);
      }
      return c;
    },
    boldScript: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d4d0 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4ea + code - 97);
      return c;
    },
    gothic: (c) => {
      const code = c.charCodeAt(0);
      const specials: Record<number, string> = { 67: "\u212d", 72: "\u210c", 73: "\u2111", 82: "\u211c", 90: "\u2128" };
      if (code >= 65 && code <= 90) return specials[code] || String.fromCodePoint(0x1d56c + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + code - 97);
      return c;
    },
    boldGothic: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d56c + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + code - 97);
      return c;
    },
    doubleStruck: (c) => {
      const code = c.charCodeAt(0);
      const specials: Record<number, string> = { 67: "\u2102", 72: "\u210d", 78: "\u2115", 80: "\u2119", 81: "\u211a", 82: "\u211d", 90: "\u2124" };
      if (code >= 65 && code <= 90) return specials[code] || String.fromCodePoint(0x1d538 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d552 + code - 97);
      if (code >= 48 && code <= 57) {
        const nums = ["𝟘","𝟙","𝟚","𝟛","𝟜","𝟝","𝟞","𝟟","𝟠","𝟡"];
        return nums[code - 48];
      }
      return c;
    },
    monospace: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d670 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d68a + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7f6 + code - 48);
      return c;
    },
    sansSerif: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5a0 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ba + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7e2 + code - 48);
      return c;
    },
    boldSans: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + code - 97);
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ec + code - 48);
      return c;
    },
    italicSans: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d608 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d622 + code - 97);
      return c;
    },
    boldItalicSans: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d63c + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d656 + code - 97);
      return c;
    },
    bubble: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + code - 97);
      if (code >= 48 && code <= 57) {
        const nums = ["⓪","①","②","③","④","⑤","⑥","⑦","⑧","⑨"];
        return nums[code - 48];
      }
      return c;
    },
    filledBubble: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f150 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f150 + code - 97);
      if (code >= 49 && code <= 57) {
        const nums = ["❶","❷","❸","❹","❺","❻","❼","❽","❾"];
        return nums[code - 49];
      }
      return c;
    },
    square: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f130 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f130 + code - 97);
      return c;
    },
    smallCaps: (c) => {
      const smallCapsMap: Record<string, string> = {
        a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",
        k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",q:"q",r:"ʀ",s:"ꜱ",t:"ᴛ",
        u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ",
        A:"ᴀ",B:"ʙ",C:"ᴄ",D:"ᴅ",E:"ᴇ",F:"ꜰ",G:"ɢ",H:"ʜ",I:"ɪ",J:"ᴊ",
        K:"ᴋ",L:"ʟ",M:"ᴍ",N:"ɴ",O:"ᴏ",P:"ᴘ",Q:"Q",R:"ʀ",S:"ꜱ",T:"ᴛ",
        U:"ᴜ",V:"ᴠ",W:"ᴡ",X:"x",Y:"ʏ",Z:"ᴢ",
      };
      return smallCapsMap[c] ?? c;
    },
    superscript: (c) => {
      const map: Record<string, string> = {
        a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",
        k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",o:"ᵒ",p:"ᵖ",q:"q",r:"ʳ",s:"ˢ",t:"ᵗ",
        u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ",
        A:"ᴬ",B:"ᴮ",C:"ᶜ",D:"ᴰ",E:"ᴱ",F:"ᶠ",G:"ᴳ",H:"ᴴ",I:"ᴵ",J:"ᴶ",
        K:"ᴷ",L:"ᴸ",M:"ᴹ",N:"ᴺ",O:"ᴼ",P:"ᴾ",Q:"Q",R:"ᴿ",S:"ˢ",T:"ᵀ",
        U:"ᵁ",V:"ⱽ",W:"ᵂ",X:"ˣ",Y:"ʸ",Z:"ᶻ",
        "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",
      };
      return map[c] ?? c;
    },
    strikethrough: (c) => c + "\u0336",
    underline: (c) => c + "\u0332",
    wiggly: (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x249c + code - 65) ;
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x249c + code - 97);
      return c;
    },
  };

  const fn = charMap[style];
  if (!fn) return text;
  return text.split("").map(fn).join("");
};

const STYLES = [
  { id: "bold", name: "Bold Serif", badge: "POPULAR" },
  { id: "script", name: "Cursive Script", badge: "ELEGANT" },
  { id: "boldScript", name: "Bold Cursive", badge: "FANCY" },
  { id: "italic", name: "Italic Serif", badge: "CLEAN" },
  { id: "boldItalic", name: "Bold Italic", badge: "STRONG" },
  { id: "gothic", name: "Gothic Fraktur", badge: "DARK" },
  { id: "doubleStruck", name: "Outline Double", badge: "COOL" },
  { id: "bubble", name: "Bubble Circles", badge: "CUTE" },
  { id: "filledBubble", name: "Filled Bubble", badge: "BOLD" },
  { id: "square", name: "Squared Block", badge: "GAMING" },
  { id: "monospace", name: "Tech Monospace", badge: "GEEK" },
  { id: "sansSerif", name: "Sans Serif", badge: "MODERN" },
  { id: "boldSans", name: "Bold Sans", badge: "SHARP" },
  { id: "italicSans", name: "Italic Sans", badge: "SLEEK" },
  { id: "boldItalicSans", name: "Bold Italic Sans", badge: "VIVID" },
  { id: "smallCaps", name: "Small Capitals", badge: "CLASSIC" },
  { id: "superscript", name: "Superscript", badge: "TINY" },
  { id: "strikethrough", name: "Strikethrough", badge: "EDGY" },
  { id: "underline", name: "Underline", badge: "NEAT" },
  { id: "boldGothic", name: "Bold Gothic", badge: "HEAVY" },
];

export default function FancyFontGenerator() {
  const [inputText, setInputText] = useState("Aesthetic Bio & Handles");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (styledText: string, styleId: string) => {
    navigator.clipboard.writeText(styledText);
    setCopiedId(styleId);
    recordToolComplete("fancy-font-generator", "social", styleId);
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
          Unicode Text Converter
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Fancy Font Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Type your text and tap any style to copy it to your clipboard.
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
            {filteredStyles.length} of {STYLES.length} styles
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
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
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
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
