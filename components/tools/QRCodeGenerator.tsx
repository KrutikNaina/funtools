"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, Copy, Check, Sparkles } from "lucide-react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://funtools.com");
  const [fgColor, setFgColor] = useState("#4f46e5");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  // Free high-res QR code API endpoint
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    text
  )}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 glass-card rounded-3xl border border-indigo-200 dark:border-indigo-900/40 shadow-xl relative overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <QrCode className="w-3.5 h-3.5" />
          HD Vector QR Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Free QR Code Generator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Create downloadable high-resolution QR codes for websites, WiFi, and contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL or Text Content
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste website link or text..."
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Foreground Color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 rounded-xl cursor-pointer bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-xl cursor-pointer bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* QR Preview Box */}
        <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-300 dark:border-indigo-900/50 space-y-4 text-center shadow-lg flex flex-col items-center justify-center">
          <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-100">
            {/* Standard HTML Image for generated QR */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="Generated QR Code" className="w-44 h-44 rounded-lg object-contain" />
          </div>

          <div className="flex items-center gap-2">
            <a
              href={qrUrl}
              download="qrcode.png"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Image</span>
            </a>

            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Content"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
