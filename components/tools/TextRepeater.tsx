"use client";

import { useState } from "react";
import { Copy, RotateCcw, Type, Check } from "lucide-react";

export default function TextRepeater() {
  const [inputText, setInputText] = useState("Hello");
  const [repeatCount, setRepeatCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>("space");
  const [customSeparator, setCustomSeparator] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(repeatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText("");
    setRepeatCount(10);
    setSeparator("space");
    setCustomSeparator("");
  };

  const getActualSeparator = () => {
    switch (separator) {
      case "space":
        return " ";
      case "newline":
        return "\n";
      case "none":
        return "";
      case "custom":
        return customSeparator;
      default:
        return " ";
    }
  };

  const repeatedText = inputText
    ? Array(Math.min(Math.max(repeatCount || 0, 0), 10000))
        .fill(inputText)
        .join(getActualSeparator())
    : "";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-indigo-200 dark:border-indigo-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Type className="w-3.5 h-3.5" />
          Text Multiplier
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Text Repeater Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Repeat your text up to 10,000 times instantly with custom separators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Input Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Text to Repeat
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text..."
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Number of Repeats (Max 10,000)
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={repeatCount}
              onChange={(e) => setRepeatCount(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Separator
            </label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none"
            >
              <option value="space">Space</option>
              <option value="newline">New Line</option>
              <option value="none">None</option>
              <option value="custom">Custom String...</option>
            </select>
          </div>

          {separator === "custom" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Custom Separator
              </label>
              <input
                type="text"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                placeholder="e.g. - or ,"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCopy}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                isCopied
                  ? "bg-emerald-500 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {isCopied ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 transition cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output Preview */}
        <div className="flex flex-col h-full min-h-[300px]">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Output Preview
          </label>
          <textarea
            readOnly
            value={repeatedText}
            placeholder="Your repeated text will appear here..."
            className="flex-1 w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-slate-300 text-sm focus:outline-none resize-none shadow-inner"
          />
          <div className="mt-2 text-right text-xs text-slate-500 font-medium">
            Length: {repeatedText.length} characters
          </div>
        </div>
      </div>
    </div>
  );
}
