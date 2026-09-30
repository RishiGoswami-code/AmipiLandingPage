import type { Metadata } from "next";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { PostCard } from "@/components/blog/PostCard";
import { categoryLabel, isCategory } from "@/sanity/categories";
import { getPosts } from "@/sanity/posts";

export const metadata: Metadata = {
  title: "The Journal — AMIPI",
  description:
    "Press, AI, marketing and Retailer Therapy - news and notes from the AMIPI team.",
};

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { category: raw } = await searchParams;
  const category = isCategory(raw) ? raw : "";
  const posts = await getPosts(category);

  return (
    <div className="bg-background px-6 pt-32 pb-24 sm:px-12 sm:pt-36 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase">
          The Journal
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {category ? categoryLabel(category) : "All Posts"}
        </h1>

        <div className="mt-8">
          <CategoryTabs active={category} />
        </div>

        {posts.length ? (
          <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} priority={i < 3} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-foreground/60">
            No posts in {categoryLabel(category)} yet.
          </p>
        )}
      </div>
    </div>
  );
}
