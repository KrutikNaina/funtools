import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BLOG_POSTS, TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import ToolCard from "@/components/ToolCard";
import { Clock } from "lucide-react";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const description = post.metaDescription || post.excerpt;

  return {
    title: `${post.title} | GetFunTools`,
    description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      siteName: "GetFunTools",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1024,
          height: 1024,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
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

  const authorName = typeof post.author === "string" ? post.author : post.author?.name || "GetFunTools Team";
  const authorRole = typeof post.author === "object" ? post.author?.role : "Editorial Team";
  const authorAvatar = typeof post.author === "object" ? post.author?.avatar : "/favicon.ico";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "GetFunTools",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon-icon.png`,
      },
    },
    image: `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  const relatedToolsList = TOOLS.filter((t) => post.relatedTools.includes(t.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
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
              src={authorAvatar}
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">
                {authorName}
              </span>
              <span className="text-slate-400">{authorRole} • {post.date}</span>
            </div>
          </div>
        </div>

        {/* Article Body with ReactMarkdown & remark-gfm */}
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed text-base md:text-lg">
          {post.content.map((paragraph, idx) => (
            <ReactMarkdown
              key={idx}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <Link
                    href={href || "#"}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    {...(href?.startsWith("http") && !href?.includes("getfuntools.app")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {children}
                  </Link>
                ),
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-800">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/40">
                    {children}
                  </tbody>
                ),
                th: ({ children }) => (
                  <th className="p-3.5 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-3.5 text-xs sm:text-sm">
                    {children}
                  </td>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-1">
                    {children}
                  </h3>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
                    {children}
                  </ol>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-slate-300">
                    {children}
                  </ul>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed">
                    {children}
                  </p>
                ),
              }}
            >
              {paragraph}
            </ReactMarkdown>
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
