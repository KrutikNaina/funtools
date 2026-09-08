"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sparkles,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  Flame,
  Grid,
  BookOpen,
  Zap,
  Dices,
} from "lucide-react";
import SearchModal from "./SearchModal";
import SurpriseMeButton from "./recommendations/SurpriseMeButton";
import ExplorerProfileBadge from "./recommendations/ExplorerProfileBadge";
import { useUserProfile } from "@/lib/recommendations/user-profile";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { profile } = useUserProfile();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Backdrop to close menu on outside tap */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[92%] max-w-7xl transition-all duration-300 ${
          mobileMenuOpen ? "rounded-3xl" : "rounded-full"
        } ${
          scrolled
            ? "glass-header shadow-2xl py-2 px-3 sm:px-6 border-slate-200/80 dark:border-slate-800/80 scale-[0.99]"
            : "glass-header shadow-lg py-2 sm:py-2.5 px-3 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-105 transition shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                GetFunTools<span className="text-pink-500">.</span>
              </span>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-widest text-slate-400 font-extrabold -mt-1">
                Play &amp; Explore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Visible on lg+ screens to prevent squishing) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
            <Link
              href="/tools"
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                pathname === "/tools"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              All Tools
            </Link>

            <Link
              href="/#trending"
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Trending
            </Link>

            <Link
              href="/#categories"
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-rose-500" />
              Categories
            </Link>

            <Link
              href="/collections"
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                pathname.startsWith("/collections")
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-purple-500" />
              Collections
            </Link>

            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                pathname.startsWith("/blog")
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Surprise Me Button (Visible on sm+ screens) */}
            <div className="hidden sm:flex items-center">
              <SurpriseMeButton variant="header" />
            </div>

            {/* Explorer Profile Badge (Visible on sm+ screens) */}
            <div className="hidden sm:flex items-center">
              <ExplorerProfileBadge />
            </div>

            {/* Cmd+K Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tools"
              className="w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition cursor-pointer border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center sm:justify-start gap-2 shrink-0"
            >
              <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-105 transition cursor-pointer border border-slate-200/60 dark:border-slate-700/60 shrink-0"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </button>
            )}

            {/* Mobile Menu Trigger (Visible on < lg screens) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer border border-slate-200/60 dark:border-slate-700/60 shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2 pb-1 max-h-[calc(100vh-5.5rem)] overflow-y-auto [scrollbar-width:thin]">
            {/* Explorer Profile Card (Mobile Only) */}
            {mounted && (
              <div className="sm:hidden p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                    {profile.level}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                      Level {profile.level} Explorer
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {profile.xp} XP Earned
                    </div>
                  </div>
                </div>
                <Link
                  href="/challenge"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                >
                  Challenges &rarr;
                </Link>
              </div>
            )}

            {/* Quick Surprise Me Button for Mobile */}
            <div className="sm:hidden">
              <SurpriseMeButton
                variant="header"
                className="w-full justify-center !py-2.5 !rounded-2xl"
              />
            </div>

            {/* Navigation Links */}
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition ${
                pathname === "/tools"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Grid className="w-4 h-4 text-indigo-500" />
              All Tools Directory
            </Link>
            <Link
              href="/#trending"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-2 transition"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              Trending Tools
            </Link>
            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-2 transition"
            >
              <Compass className="w-4 h-4 text-rose-500" />
              Browse Categories
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition ${
                pathname.startsWith("/collections")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Zap className="w-4 h-4 text-purple-500" />
              Featured Collections
            </Link>
            <Link
              href="/challenge"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition ${
                pathname.startsWith("/challenge")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              🏆 Challenge Arena
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition ${
                pathname.startsWith("/blog")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Blog &amp; Articles
            </Link>
          </div>
        )}
      </header>

      {/* Cmd+K Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
