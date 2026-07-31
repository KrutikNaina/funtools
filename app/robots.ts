import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/private", "/_next", "/tmp"],
    },
    sitemap: "https://getfuntools.app/sitemap.xml",
    host: "https://getfuntools.app",
  };
}
