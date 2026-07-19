import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS, CATEGORIES } from "@/lib/tools-data";
import { getToolContent } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import DynamicToolRenderer from "./DynamicToolRenderer";
import AEOOverviewBox from "@/components/seo/AEOOverviewBox";
import FeaturedSnippetBox from "@/components/seo/FeaturedSnippetBox";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import TrustAuthorBox from "@/components/seo/TrustAuthorBox";
import {
  Sparkles,
  CheckCircle2,
  ListOrdered,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Flame,
  Zap,
  Users,
  Grid,
  AlertTriangle,
  Bookmark
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};

  const module = getToolContent(slug);

  return {
    title: module.metadata.metaTitle,
    description: module.metadata.metaDescription,
    keywords: [
      module.keywords.primary,
      ...module.keywords.secondary,
      ...module.keywords.longTail,
    ],
    authors: [{ name: module.eeat.authorName }],
    openGraph: {
      title: module.metadata.openGraph.title,
      description: module.metadata.openGraph.description,
      url: module.metadata.openGraph.url,
      type: "website",
      siteName: "FunTools",
    },
    twitter: {
      card: "summary_large_image",
      title: module.metadata.twitterCard.title,
      description: module.metadata.twitterCard.description,
    },
    alternates: {
      canonical: module.metadata.canonicalUrl,
    },
    robots: module.metadata.robots,
  };
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const module = getToolContent(slug);
  const categoryObj = CATEGORIES.find((c) => c.id === tool.category);

  // 1. Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FunTools",
    url: "https://funtools.com",
    logo: "https://funtools.com/favicon.ico",
  };

  // 2. WebSite Schema
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FunTools",
    url: "https://funtools.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://funtools.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // 3. WebPage / MedicalWebPage Schema
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": module.schemaType === "MedicalWebPage" ? "MedicalWebPage" : "WebPage",
    name: tool.title,
    description: module.metadata.metaDescription,
    url: module.metadata.canonicalUrl,
    ...(module.schemaType === "MedicalWebPage" && {
      aspect: "Overview",
      medicalAudience: "Patient",
    }),
  };

  // 4. SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: tool.category === "finance" ? "FinanceApplication" : "UtilityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.toString(),
      ratingCount: "1850",
    },
  };

  // 5. HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.title}`,
    description: `Step-by-step instructions on using ${tool.title} online.`,
    step: module.howTo.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };

  // Internal Linking Collections
  const relatedToolsCards = TOOLS.filter((t) => t.id !== tool.id).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
        {/* SECTION 1: Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: categoryObj?.name || tool.category, href: `/categories/${tool.category}` },
            { label: tool.title },
          ]}
        />

        {/* SECTION 2: Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {categoryObj?.name || tool.category} Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {module.content.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {module.content.heroSubheading}
          </p>

          {/* E-E-A-T Quick Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium pt-2">
            <span>By <strong className="text-slate-900 dark:text-white">{module.eeat.authorName}</strong> ({module.eeat.authorRole})</span>
            <span>•</span>
            <span>Reviewed by <strong className="text-slate-900 dark:text-white">{module.eeat.reviewerName}</strong></span>
            <span>•</span>
            <span>Updated: {module.eeat.lastUpdated}</span>
            <span>•</span>
            <span>{module.eeat.readTime}</span>
          </div>
        </header>

        {/* SECTION 3: Interactive Tool Component */}
        <section id="interactive-tool" className="max-w-4xl mx-auto">
          <DynamicToolRenderer tool={tool} />
        </section>

        {/* Top Banner Ad Container */}
        <AdBanner slot="7788990011" format="horizontal" label="In-Article Ad" />

        {/* SECTION 4: Quick Answer & AI Overview Box */}
        <section id="aeo-overview" className="max-w-4xl mx-auto">
          <AEOOverviewBox summaries={{
            oneSentence: module.aiOverview.oneSentence,
            twoSentence: module.aiOverview.twoSentence,
            bulletAnswer: module.aiOverview.bulletSummary,
            tableAnswer: module.aiOverview.tableSummary.map(t => ({ col1: t.label, col2: t.value })),
            summary50: module.aiOverview.summary50,
            summary100: module.aiOverview.summary100,
            summary200: module.aiOverview.summary200
          }} />
        </section>

        {/* SECTION 5: Definition Section */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Definition & Core Overview
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {module.content.definition}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            {module.content.introduction}
          </p>
        </section>

        {/* SECTION 6: Step-by-Step How It Works Guide */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-purple-500" />
            How It Works (Step-by-Step)
          </h2>
          <div className="space-y-3">
            {module.howTo.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {step.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Optional Mathematical Formula */}
          {module.content.formula && (
            <div className="mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-200 dark:border-indigo-900 text-xs space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                {module.content.formula.title}
              </span>
              <p className="text-slate-700 dark:text-slate-300">{module.content.formula.explanation}</p>
              <code className="block p-2 rounded-lg bg-white dark:bg-slate-900 font-mono text-indigo-500 font-bold">
                {module.content.formula.mathNotation}
              </code>
            </div>
          )}
        </section>

        {/* SECTION 7: Featured Snippets */}
        <section className="max-w-4xl mx-auto">
          <FeaturedSnippetBox snippets={{
            paragraphSnippet: module.snippets.paragraph,
            listSnippet: module.snippets.list,
            numberedSnippet: module.snippets.numbered,
            tableSnippet: {
              header: module.snippets.table.headers,
              rows: module.snippets.table.rows
            }
          }} />
        </section>

        {/* SECTION 8 & 9: Features & Benefits Grid */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Key Features
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {module.content.features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{f.title}: </span>
                    <span>{f.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Benefits & Value Proposition
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {module.content.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{b.title}: </span>
                    <span>{b.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 10 & 11: Use Cases & Target Audience */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Who Should Use This Tool & Practical Scenarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {module.content.useCases.map((target, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                  {target.audience}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {target.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12: Trust & Disclaimers */}
        <section className="max-w-4xl mx-auto">
          <TrustAuthorBox eeat={{
            authorName: module.eeat.authorName,
            authorRole: module.eeat.authorRole,
            authorAvatar: module.eeat.authorAvatar,
            reviewerName: module.eeat.reviewerName,
            reviewerRole: module.eeat.reviewerRole,
            lastUpdated: module.eeat.lastUpdated,
            contentVersion: module.eeat.contentVersion,
            readTime: module.eeat.readTime,
            disclaimerType: module.content.disclaimer?.type || "general",
            disclaimerText: module.content.disclaimer?.text
          }} />
        </section>

        {/* SECTION 13: 15+ Unique FAQ Accordion */}
        <section className="max-w-4xl mx-auto">
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* SECTION 14: Contextually Relevant Related Tools */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-wider block">Contextual Recommendations</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Tools Relevant to {tool.title}
              </h3>
            </div>
            <Link href="/tools" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.relatedTools.map((rel, idx) => (
              <Link key={idx} href={`/tools/${rel.slug}`}>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition space-y-1.5 cursor-pointer shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    💡 {rel.relationReason}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 15 & 16: Popular & Latest Tools Grid */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" /> Viral Popular Tools
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOLS.filter(t => t.isPopular).slice(0, 4).map((pt) => (
                <Link key={pt.id} href={`/tools/${pt.slug}`} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 transition flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${pt.gradient} text-white flex items-center justify-center text-xs font-bold`}>
                    ✨
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">{pt.title}</h5>
                    <span className="text-[10px] text-slate-400">{pt.useCount} uses</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" /> Newest Micro-Apps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOLS.slice(0, 4).map((lt) => (
                <Link key={lt.id} href={`/tools/${lt.slug}`} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 transition flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${lt.gradient} text-white flex items-center justify-center text-xs font-bold`}>
                    ✨
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">{lt.title}</h5>
                    <span className="text-[10px] text-slate-400">{lt.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 17: Internal Links Index */}
        <section className="max-w-4xl mx-auto p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Explore Category Directory
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/categories/${c.id}`} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition">
                {c.name} ({c.count})
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 21: User Discussion & Comments Placeholder */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            User Feedback & Rating
          </h3>
          <p className="text-xs text-slate-500">
            Have feedback or suggestions for {tool.title}? Leave a comment below:
          </p>

          <form className="space-y-3">
            <textarea
              rows={3}
              placeholder="Share your feedback or score..."
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition cursor-pointer"
            >
              Post Comment
            </button>
          </form>
        </section>

        {/* SECTION 22: Footer CTA */}
        <section className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black">
            Explore 50+ Interactive Fun Tools!
          </h3>
          <p className="text-xs sm:text-sm opacity-90 max-w-md mx-auto">
            Bookmark FunTools to enjoy instant viral generators, love meters, reflex games, and financial visualizers every day.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-indigo-600 font-extrabold text-xs shadow-lg hover:scale-105 transition cursor-pointer"
          >
            <Grid className="w-4 h-4" /> Browse Full Directory
          </Link>
        </section>
      </div>
    </>
  );
}
