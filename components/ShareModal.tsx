"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Copy, Check, MessageCircle, Send } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export default function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`Check out ${title} on GetFunTools! 🔥`);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const redditUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Share this Tool
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            Share <span className="font-bold text-slate-900 dark:text-white">{title}</span> with friends or on social media:
          </p>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 hover:bg-sky-500 hover:text-white transition flex flex-col items-center gap-1.5"
            >
              <Share2 className="w-5 h-5" />
              <span>Twitter / X</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-500 hover:text-white transition flex flex-col items-center gap-1.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 hover:bg-orange-500 hover:text-white transition flex flex-col items-center gap-1.5"
            >
              <Send className="w-5 h-5" />
              <span>Reddit</span>
            </a>
          </div>

          {/* Copy Link Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-mono truncate focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
