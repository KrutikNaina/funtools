"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Heart, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="mt-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                GetFunTools<span className="text-pink-500">.</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              The modern consumer platform for interactive micro-tools, creative generators, personality quizzes, and fun calculators. Play, explore, and create.
            </p>

            {/* Playful Newsletter */}
            <form onSubmit={handleNewsletter} className="space-y-2 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Get Weekly Viral Tools
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : <Send className="w-3.5 h-3.5" />}
                  {subscribed ? "Subscribed!" : "Join"}
                </button>
              </div>
            </form>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/categories/ai" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">💜 AI & Magic</Link></li>
              <li><Link href="/categories/love" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">❤️ Love & Compatibility</Link></li>
              <li><Link href="/categories/gaming" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">🎮 Arcade Games</Link></li>
              <li><Link href="/categories/social" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">📱 Social & Fancy Fonts</Link></li>
              <li><Link href="/categories/finance" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">💰 Fun Finance</Link></li>
              <li><Link href="/categories/personality" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">⭐ Personality Quizzes</Link></li>
            </ul>
          </div>

          {/* Top Tools */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Popular Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/tools/love-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Love Calculator</Link></li>
              <li><Link href="/tools/fancy-font-generator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Fancy Font Generator</Link></li>
              <li><Link href="/tools/emoji-reaction-test" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Reaction Speed Test</Link></li>
              <li><Link href="/tools/decision-wheel" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Ultimate Decision Wheel</Link></li>
              <li><Link href="/tools/coffee-to-wealth" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Coffee Wealth Math</Link></li>
              <li><Link href="/tools/ai-bio-generator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">AI Bio & Roast</Link></li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Legal & Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About GetFunTools</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Blog & Articles</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact & Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} GetFunTools. Built with Next.js 15, React & Tailwind CSS.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for curious minds worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
