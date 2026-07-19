import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import { Sparkles, Heart, Clock, Gamepad2, Dices, Share2, Coins, Smile, BrainCircuit, Zap } from "lucide-react";

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
    title: `${category.name} Tools - FunTools`,
    description: category.description,
    openGraph: {
      title: `${category.name} Tools | FunTools`,
      description: category.description,
      url: `https://funtools.com/categories/${category.id}`,
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

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 space-y-10">
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
            <h1 className="text-3xl sm:text-4xl font-black mt-1">
              {category.name}
            </h1>
          </div>
        </div>

        <p className="text-sm md:text-base opacity-90 max-w-2xl leading-relaxed">
          {category.description}
        </p>

        <div className="pt-2 text-xs font-bold opacity-80">
          Showing {categoryTools.length} interactive tools in this category
        </div>
      </div>

      <AdBanner slot="3322110099" format="horizontal" label="Category Sponsor" />

      {/* Tools Grid */}
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
    </div>
  );
}
