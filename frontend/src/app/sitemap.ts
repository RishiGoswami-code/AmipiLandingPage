import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/sanity/posts";

/* Re-read hourly so new Journal posts reach search engines without a deploy. */
export const revalidate = 3600;

/** Public pages, most important first. Account pages and the Studio are left out on purpose. */
const PAGES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/categories", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/meet", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sell", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/custom", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gift-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/philosophy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/amipi-cares", priority: 0.5, changeFrequency: "monthly" },
  { path: "/testimonials", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A Sanity outage shouldn't take the whole sitemap down with it.
  const posts = await getPosts().catch(() => []);
  return [
    ...PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      changeFrequency,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
