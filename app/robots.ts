import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/private", "/tmp"],
    },
    sitemap: "https://www.getfuntools.app/sitemap.xml",
  };
}
