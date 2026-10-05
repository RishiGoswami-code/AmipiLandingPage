import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** robots.txt: everything is crawlable except the editor, the API and account pages. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/", "/login", "/register", "/forgot-password"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
