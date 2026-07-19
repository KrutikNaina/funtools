import { MetadataRoute } from "next";
import { TOOLS, CATEGORIES, BLOG_POSTS } from "@/lib/tools-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://funtools.com";

  const toolUrls = TOOLS.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categoryUrls = CATEGORIES.map((c) => ({
    url: `${baseUrl}/categories/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...toolUrls,
    ...categoryUrls,
    ...blogUrls,
  ];
}
