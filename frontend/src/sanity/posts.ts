import { client, POST_QUERY, POSTS_QUERY, RELATED_QUERY, SLUGS_QUERY, type Post, type PostSummary } from "./client";
import { sanityConfigured } from "./env";
import { SAMPLE_POSTS } from "./samplePosts";

/**
 * What the Journal pages call. Published posts are cached and re-fetched at
 * most once a minute, so a post published in the Studio shows up on the site
 * within about a minute without a redeploy. Until a Sanity project is
 * connected, the built-in sample posts stand in.
 */
const cache = { next: { revalidate: 60, tags: ["post"] } };

const newestFirst = (a: PostSummary, b: PostSummary) => b.publishedAt.localeCompare(a.publishedAt);

export async function getPosts(category = ""): Promise<PostSummary[]> {
  if (!sanityConfigured) {
    return SAMPLE_POSTS.filter((p) => !category || p.category === category).sort(newestFirst);
  }
  return client.fetch<PostSummary[]>(POSTS_QUERY, { category }, cache);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!sanityConfigured) return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
  return client.fetch<Post | null>(POST_QUERY, { slug }, cache);
}

export async function getRelated(post: PostSummary): Promise<PostSummary[]> {
  if (!sanityConfigured) {
    return SAMPLE_POSTS.filter((p) => p.slug !== post.slug)
      .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || newestFirst(a, b))
      .slice(0, 3);
  }
  return client.fetch<PostSummary[]>(RELATED_QUERY, { slug: post.slug, category: post.category }, cache);
}

export async function getSlugs(): Promise<string[]> {
  if (!sanityConfigured) return SAMPLE_POSTS.map((p) => p.slug);
  return client.fetch<string[]>(SLUGS_QUERY, {}, cache);
}
