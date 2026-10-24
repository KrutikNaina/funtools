import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS, CATEGORIES, BLOG_POSTS } from "@/lib/tools-data";
import { getToolContent } from "@/lib/content";
import { getRelatedTools, getPeopleAlsoUsed, getPopularInCategory } from "@/lib/recommendations";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/site";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import DynamicToolRenderer from "./DynamicToolRenderer";
import AEOOverviewBox from "@/components/seo/AEOOverviewBox";
import FeaturedSnippetBox from "@/components/seo/FeaturedSnippetBox";
import ToolFAQSection from "@/components/seo/ToolFAQSection";

import BookmarkButton from "@/components/BookmarkButton";
import ToolComments from "@/components/ToolComments";
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
  Bookmark,
  Lightbulb,
  BookOpen,
  Star,
  Check,
  Clock,
  Calendar,
  User,
  TrendingUp
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
      siteName: "GetFunTools",
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

  // Smart Contextual Recommendations
  const smartRelatedTools = getRelatedTools(slug, 4);
  const peopleAlsoUsedTools = getPeopleAlsoUsed(slug, 4);
  const popularInCategoryTools = getPopularInCategory(tool.category, slug, 4);

  // Relevant blog posts
  const relevantPosts = BLOG_POSTS.slice(0, 2);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GetFunTools",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
  };

  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GetFunTools",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": module.schemaType === "MedicalWebPage" ? "MedicalWebPage" : "WebPage",
    name: tool.title,
    description: module.metadata.metaDescription,
    url: module.metadata.canonicalUrl,
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: module.metadata.canonicalUrl,
    applicationCategory:
      tool.category === "finance"
        ? "FinanceApplication"
        : tool.category === "personality" || tool.category === "quiz"
        ? "EntertainmentApplication"
        : "UtilityApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: module.metadata.metaDescription,
  };

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

  function renderParagraphWithLinks(text: string) {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {match[1]}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12 pt-2">
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
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {categoryObj?.name || tool.category} Tool
            </div>
            <BookmarkButton slug={tool.slug} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {module.content.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {module.content.heroSubheading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Free & Secure</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-500" /> Instant Results</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500" /> {module.eeat?.readTime || "5 min read"}</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4 text-purple-500" /> By {module.eeat?.authorName || "GetFunTools"}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-pink-500" /> Updated {module.eeat?.lastUpdated || "2026"}</span>
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

        {/* SECTION 5: Definition & Overview */}
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

        {/* SECTION 5.5: Deep Dive Editorial Guide Sections */}
        {module.content.guideSections && module.content.guideSections.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-6">
            {module.content.guideSections.map((sec, idx) => (
              <section
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {sec.icon && <span className="text-lg">{sec.icon}</span>}
                  {sec.title}
                </h2>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{renderParagraphWithLinks(p)}</p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-1.5 list-disc pl-5 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{renderParagraphWithLinks(b)}</li>
                      ))}
                    </ul>
                  )}
                  {sec.callout && (
                    <div className="mt-3 p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 font-medium">
                      {renderParagraphWithLinks(sec.callout)}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}

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

        {/* SECTION 8: Features & Benefits */}
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

        {/* SECTION 9: Expert Tips & Common Mistakes */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-200 dark:border-amber-900/50 space-y-3">
            <h3 className="text-base font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" /> Expert Best Practices
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {module.content.bestPractices?.length > 0 ? (
                module.content.bestPractices.map((practice, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{practice}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Bookmark this tool on your home screen for instant browser access.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Use 1-click results copying to quickly paste formatting into notes or chats.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-200 dark:border-rose-900/50 space-y-3">
            <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes to Avoid
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {module.content.limitations?.length > 0 ? (
                module.content.limitations.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{mistake}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Entering mismatched unit inputs when performing calculations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Forgetting to copy generated output before reloading the page.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* SECTION 9.5: Practical Examples */}
        {module.content.examples && module.content.examples.length > 0 && (
          <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-pink-500" />
              Practical Real-World Examples
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {module.content.examples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Example {idx + 1}</div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{ex.scenario}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded mb-2">
                    <span className="font-bold text-indigo-500">Input:</span> {ex.input}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded">
                    <span className="font-bold text-emerald-500">Output:</span> {ex.output}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 9.6: Comparison Table */}
        {module.content.comparisonTable && module.content.comparisonTable.rows.length > 0 && (
          <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 overflow-hidden">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Reference Data & Comparisons
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold">
                  <tr>
                    {module.content.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="p-4 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {module.content.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      {row.map((cell, j) => (
                        <td key={j} className="p-4">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 10: Use Cases & Target Audience */}
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



        {/* SECTION 12: Tool FAQ Accordion */}
        <section className="max-w-4xl mx-auto">
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* SECTION 12.5: People Also Ask (PAA) */}
        {module.peopleAlsoAsk && module.peopleAlsoAsk.length > 0 && (
          <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              People Also Ask (Conversational Search)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.peopleAlsoAsk.map((paa, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700/50 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{paa.question}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{paa.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 12.6: Author EEAT Box */}
        {module.eeat && (
          <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 flex flex-col md:flex-row gap-6 items-center shadow-sm">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shrink-0 border-4 border-white dark:border-slate-800 shadow-md">
              <img src={module.eeat.authorAvatar || "/avatars/default.png"} alt={module.eeat.authorName} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Written by {module.eeat.authorName}</h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{module.eeat.authorRole}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{module.eeat.authorBio}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] text-slate-500 pt-2">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Reviewed by {module.eeat.reviewerName || "Editorial Team"}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Updated: {module.eeat.lastUpdated}</span>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 12.7: Semantic Keywords */}
        {module.keywords && module.keywords.semantic && module.keywords.semantic.length > 0 && (
           <section className="max-w-4xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
             <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
               <ListOrdered className="w-4 h-4 text-slate-500" /> Related Concepts
             </h3>
             <div className="flex flex-wrap gap-2">
               {module.keywords.semantic.slice(0, 15).map((kw, i) => (
                 <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700">
                   {kw}
                 </span>
               ))}
             </div>
           </section>
        )}

        {/* SECTION 13: SMART DISCOVERY SECTION - Contextual Related Tools */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-wider block">Smart Recommendations</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related Tools You Might Like
              </h3>
            </div>
            <Link href="/tools" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {smartRelatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>

        {/* SECTION 14: SMART DISCOVERY SECTION - People Also Used */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-purple-500 uppercase tracking-wider block">Cross-Category Exploration</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                People Who Used This Also Tried
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {peopleAlsoUsedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>

        {/* SECTION 15: Relevant Articles & Blog Integration */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" /> Relevant Guides & Deep Dives
            </h3>
            <Link href="/blog" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relevantPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-slate-800 transition space-y-2 border border-slate-200/60 dark:border-slate-700/60 group">
                  <span className="text-[10px] font-bold uppercase text-purple-500">{post.readTime} read</span>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 16: Interactive Community Comments */}
        <section className="max-w-4xl mx-auto">
          <ToolComments toolSlug={tool.slug} />
        </section>

        {/* SECTION 17: Newsletter Subscription & Footer CTA */}
        <section className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black">
            Never Miss a New Micro-Tool!
          </h3>
          <p className="text-xs sm:text-sm opacity-90 max-w-md mx-auto">
            Get weekly updates on viral generators, productivity calculators, and social utilities delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 text-xs focus:outline-none border border-white/30"
            />
            <button className="px-6 py-3 rounded-2xl bg-white text-indigo-600 font-extrabold text-xs shadow-lg hover:scale-105 transition cursor-pointer">
              Subscribe Free
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
