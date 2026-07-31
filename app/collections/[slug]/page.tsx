import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COLLECTIONS } from "@/lib/collections-data";
import { getToolsBySlugs } from "@/lib/recommendations";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { Sparkles, ArrowRight, Layers, CheckCircle2, Lightbulb, Compass } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) return {};

  return {
    title: `${col.title} - Curated Tools | GetFunTools`,
    description: col.seoDescription,
    openGraph: {
      title: `${col.title} | GetFunTools`,
      description: col.seoDescription,
      url: `https://getfuntools.app/collections/${col.slug}`,
    },
  };
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) notFound();

  const colTools = getToolsBySlugs(col.toolSlugs);
  const otherCollections = COLLECTIONS.filter((c) => c.id !== col.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12 pt-4">
      <Breadcrumb
        items={[
          { label: "Collections", href: "/collections" },
          { label: col.title },
        ]}
      />

      {/* Hero Card */}
      <div className={`p-8 md:p-12 rounded-3xl bg-gradient-to-r ${col.gradient} text-white shadow-xl space-y-4 relative overflow-hidden`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          Curated Collection
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">{col.title}</h1>
        <p className="text-base md:text-lg opacity-90 max-w-2xl leading-relaxed">
          {col.description}
        </p>

        <div className="pt-2 text-xs font-semibold opacity-80 flex items-center gap-4">
          <span>{colTools.length} Premium Micro-Tools Included</span>
          <span>•</span>
          <span>100% Free & No Sign-up Required</span>
        </div>
      </div>

      <AdBanner slot="7766554433" format="horizontal" label="Collection Sponsor" />

      {/* Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Tools in this Collection
          </h2>
          <span className="text-xs font-bold text-slate-400">Showing {colTools.length} tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Curated Tips & Best Practices */}
      <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-black text-lg">
          <Lightbulb className="w-6 h-6" />
          <h3>Curated Usage Tips & Growth Advice</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {col.curatedTips.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tip #{idx + 1}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Curated Collections */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-500" />
            Explore More Collections
          </h2>
          <Link href="/collections" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {otherCollections.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.badgeBg}`}>
                  {c.toolSlugs.length} Tools
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-indigo-500 group-hover:translate-x-1 transition">
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
