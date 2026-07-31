import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import ToolCard from "@/components/ToolCard";
import { ArrowLeft, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} - GetFunTools Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.date,
  };

  const relatedToolsList = TOOLS.filter((t) => post.relatedTools.includes(t.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">
                {post.author.name}
              </span>
              <span className="text-slate-400">{post.author.role} • {post.date}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed text-base md:text-lg">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <AdBanner slot="6655443322" format="horizontal" label="In-Article Sponsor" />

        {/* Related Interactive Tools Section */}
        {relatedToolsList.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Try the Interactive Tools Mentioned in this Article
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedToolsList.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
