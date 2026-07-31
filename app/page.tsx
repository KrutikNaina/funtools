"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  Compass,
  ArrowRight,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Heart,
  Star,
  Clock,
  Layers,
  Award,
  ShieldCheck,
  Send,
  Grid
} from "lucide-react";
import { TOOLS, CATEGORIES, BLOG_POSTS, HOME_FAQS } from "@/lib/tools-data";
import { COLLECTIONS } from "@/lib/collections-data";
import { getToolOfTheDay, getToolsBySlugs, getRecentlyAddedTools } from "@/lib/recommendations";
import { useUserStore } from "@/lib/user-store";
import ToolCard from "@/components/ToolCard";
import CategoryCard from "@/components/CategoryCard";
import AdBanner from "@/components/AdBanner";
import FancyFontGenerator from "@/components/tools/FancyFontGenerator";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { recentlyViewed, favorites } = useUserStore();

  const toolOfTheDay = getToolOfTheDay();
  const recentlyViewedTools = getToolsBySlugs(recentlyViewed).slice(0, 4);
  const favoriteToolsList = getToolsBySlugs(favorites).slice(0, 4);
  const recentlyAdded = getRecentlyAddedTools(4);
  const trendingTools = TOOLS.filter((t) => t.isTrending);
  const featuredTools = TOOLS.filter((t) =>
    selectedCategory === "all" ? true : t.category === selectedCategory
  );

  const toggleFaq = (idx: number) => {
    setFaqOpenIndex(faqOpenIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-8 md:pt-16 pb-8 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl -z-10 animate-float-1 pointer-events-none" />
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -z-10 animate-float-2 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
            <span>50+ Free Interactive Micro-Tools & Generators</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Explore, Play & Create with{" "}
            <span className="gradient-text-primary">Modern Fun Tools</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A premium collection of viral font generators, love calculators, reaction speed tests, decision wheels & wealth visualizers designed for instant delight.
          </motion.p>

          {/* Global Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto pt-2"
          >
            <div className="relative glass-card p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-indigo-200 dark:border-indigo-900 shadow-xl flex items-center gap-1.5 sm:gap-2">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 text-indigo-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What tool do you want to explore today?"
                className="flex-1 min-w-0 bg-transparent py-2 sm:py-2.5 px-1.5 sm:px-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <Link
                href={searchQuery ? `/tools?q=${encodeURIComponent(searchQuery)}` : "/tools"}
                className="px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Popular Quick Search Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-400 font-medium">Popular:</span>
              <Link href="/tools/love-calculator" className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-500 hover:text-white transition">
                💖 Love Calculator
              </Link>
              <Link href="/tools/fancy-font-generator" className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-500 hover:text-white transition">
                ✨ Fancy Fonts
              </Link>
              <Link href="/tools/decision-wheel" className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-500 hover:text-white transition">
                🎡 Spin Wheel
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOP BANNER AD */}
      <div className="max-w-7xl mx-auto px-6">
        <AdBanner slot="9988776655" format="horizontal" label="Featured Sponsor" />
      </div>

      {/* TOOL OF THE DAY / DAILY CHALLENGE */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-500/30">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              <Award className="w-3.5 h-3.5" />
              Tool of the Day & Daily Challenge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">{toolOfTheDay.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{toolOfTheDay.description}</p>
            <div className="flex items-center gap-4 text-xs font-semibold text-amber-400 justify-center md:justify-start">
              <span>★ {toolOfTheDay.rating} Score</span>
              <span>•</span>
              <span>{toolOfTheDay.useCount} Active Daily Users</span>
            </div>
          </div>

          <Link
            href={`/tools/${toolOfTheDay.slug}`}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs hover:scale-105 transition shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Play Daily Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CONTINUE WHERE YOU LEFT OFF / RECENTLY VIEWED (Client-side rehydrated) */}
      {recentlyViewedTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-xl">
              <Clock className="w-5 h-5 text-indigo-500" />
              <span>Continue Where You Left Off</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Saved locally</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyViewedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* TRENDING TOOLS SECTION */}
      <section id="trending" className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
              <Flame className="w-4 h-4 fill-current" />
              Viral Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Trending This Week
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTools.slice(0, 4).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* CURATED COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-500 mb-1">
              <Layers className="w-4 h-4" />
              Hand-picked Bundles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Curated Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COLLECTIONS.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.badgeBg}`}>
                  {c.toolSlugs.length} Tools
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-indigo-500 group-hover:translate-x-1 transition">
                <span>Explore Bundle</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            <Compass className="w-4 h-4" />
            Curated Directories
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Browse Tools by Category
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Every category features custom HSL gradients and interactive tools tailored for your vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* LIVE INTERACTIVE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 py-1 px-3 rounded-full">
            ⚡ Instant Play Mode
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            Try a Live Micro-Tool Right Now
          </h2>
        </div>
        <FancyFontGenerator />
      </section>

      {/* RECENTLY ADDED TOOLS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Fresh Releases</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Recently Added Tools
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentlyAdded.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* FEATURED TOOLS GRID & CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Tool Explorer
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Featured Interactive Tools
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400"
              }`}
            >
              All Tools
            </button>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Mid Feed Ad Container */}
      <div className="max-w-7xl mx-auto px-6">
        <AdBanner slot="4433221100" format="rectangle" label="Sponsored Content" />
      </div>

      {/* BLOG ARTICLES HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Read & Learn
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              GetFunTools Insights & Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Explore Blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition space-y-4 cursor-pointer h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {post.author.name}
                    </span>
                    <span className="text-slate-400">{post.date}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase">
            <Send className="w-3.5 h-3.5" /> GetFunTools Weekly Newsletter
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">Stay Updated on New Viral Tools</h2>
          <p className="text-sm opacity-90 max-w-lg mx-auto">
            Get early access to new AI bio roasters, fancy text generators, and productivity tools every Monday. Zero spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 text-xs focus:outline-none border border-white/30"
            />
            <button className="px-6 py-3 rounded-2xl bg-white text-indigo-600 font-black text-xs shadow-lg hover:scale-105 transition cursor-pointer">
              Subscribe Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
