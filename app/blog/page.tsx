import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Articles - GetFunTools",
  description: "Read viral social media tips, font formatting guides, and fun wealth calculators.",
};

export default function BlogHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 space-y-10">
      <Breadcrumb items={[{ label: "Blog" }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          GetFunTools Insights
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Blog & Digital Tips
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Discover guides on personal branding, aesthetic text styles, and smart decision making.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition space-y-4 cursor-pointer h-full flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {post.author.name}
                    </span>
                    <span className="text-slate-400">{post.date}</span>
                  </div>
                </div>

                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
