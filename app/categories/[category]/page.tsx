import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, TOOLS, BLOG_POSTS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { Sparkles, Heart, Clock, Gamepad2, Dices, Share2, Coins, Smile, BrainCircuit, Zap, Compass, ArrowRight, Flame, HelpCircle } from "lucide-react";

const CAT_ICON_MAP: Record<string, any> = {
  Sparkles,
  Heart,
  Clock,
  Gamepad2,
  Dices,
  Share2,
  Coins,
  Smile,
  BrainCircuit,
  Zap,
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catId } = await params;
  const category = CATEGORIES.find((c) => c.id === catId);
  if (!category) return {};

  return {
    title: `${category.name} Micro-Tools & Calculators | GetFunTools`,
    description: `${category.description}. Discover free, fast, interactive tools in the ${category.name} category.`,
    openGraph: {
      title: `${category.name} Tools | GetFunTools`,
      description: category.description,
      url: `https://www.getfuntools.app/categories/${category.id}`,
    },
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: catId } = await params;
  const category = CATEGORIES.find((c) => c.id === catId);
  if (!category) notFound();

  const IconComp = CAT_ICON_MAP[category.iconName] || Sparkles;
  const categoryTools = TOOLS.filter((t) => t.category === category.id);
  const otherCategories = CATEGORIES.filter((c) => c.id !== category.id);
  const relatedPosts = BLOG_POSTS.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12 pt-4">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/#categories" },
          { label: category.name },
        ]}
      />

      {/* Category Hero Header */}
      <div className={`p-8 md:p-12 rounded-3xl bg-gradient-to-r ${category.gradient} text-white shadow-xl space-y-4 relative overflow-hidden`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <IconComp className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full bg-white/20 tracking-wider">
              Category Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mt-1">
              {category.name} Tools
            </h1>
          </div>
        </div>

        <p className="text-sm md:text-base opacity-90 max-w-2xl leading-relaxed">
          {category.description}
        </p>

        <div className="pt-2 text-xs font-bold opacity-80 flex items-center gap-4">
          <span>{categoryTools.length} Interactive Micro-Tools</span>
          <span>•</span>
          <span>100% Free Browser-Based</span>
        </div>
      </div>

      <AdBanner slot="3322110099" format="horizontal" label="Category Sponsor" />

      {/* Main Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            All {category.name} Micro-Tools
          </h2>
          <span className="text-xs font-bold text-slate-400">Showing {categoryTools.length} tools</span>
        </div>

        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            More tools being added to this category soon!
          </div>
        )}
      </section>

      {/* Related Categories Navigation */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-500" />
            Explore Other Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherCategories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition group flex items-center justify-between"
            >
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">{cat.count} tools</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* Category Guides & Blog Articles */}
      <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          {category.name} Guides & FAQ Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-slate-800 transition space-y-1.5 border border-slate-200/60 dark:border-slate-700/60 group">
                <span className="text-[10px] font-bold uppercase text-purple-500">{post.readTime}</span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {post.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
