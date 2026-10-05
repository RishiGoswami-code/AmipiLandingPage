import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { imageUrl } from "@/sanity/client";
import { categoryLabel } from "@/sanity/categories";
import { getPost, getRelated, getSlugs } from "@/sanity/posts";

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — AMIPI`,
    description: post.excerpt,
    openGraph: { images: [imageUrl(post.mainImage, 1200, 630)] },
  };
}

/** "Posted 01 January 2026, 09:30am", New York time (AMIPI's office). */
function posted(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/New_York" });
  const time = d
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "America/New_York" })
    .replace(" ", "")
    .toLowerCase();
  return `Posted ${date}, ${time}`;
}

/**
 * Reading page after the reference: a small "Journal — Posted ..." line, the
 * title, a wide image with two corners cut off, then the pull quote on the
 * left, the article in the middle and share buttons down the right.
 */
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const related = await getRelated(post);

  return (
    <article className="bg-background px-6 pt-32 pb-24 sm:px-12 sm:pt-36 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-foreground/60">
          <Link href="/blog" className="font-medium text-[#a47a35] hover:text-foreground">
            Journal
          </Link>
          <span aria-hidden className="h-px w-8 bg-[#a47a35]" />
          <Link href={`/blog?category=${post.category}`} className="hover:text-foreground">
            {categoryLabel(post.category)}
          </Link>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{posted(post.publishedAt)}</time>
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.12] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden [clip-path:polygon(9%_0,100%_0,100%_86%,93%_100%,0_100%,0_14%)] sm:aspect-[16/8]">
          <Image
            src={imageUrl(post.mainImage, 1800, 900)}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>

        <div
          className={`mt-14 grid gap-10 lg:gap-14 ${
            post.pullQuote ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto]" : "lg:grid-cols-[minmax(0,1fr)_auto]"
          }`}
        >
          {post.pullQuote && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="flex gap-3 text-2xl leading-snug font-medium text-foreground sm:text-[1.7rem]">
                <span aria-hidden className="text-4xl leading-none text-[#d4ae5c]">
                  &ldquo;
                </span>
                <span>{post.pullQuote}</span>
              </p>
              <p className="mt-6 pl-9 text-[14px] text-foreground/60">{post.author}</p>
            </aside>
          )}

          <div className={`text-[16px] leading-[1.8] text-foreground/75 ${post.pullQuote ? "" : "max-w-3xl"}`}>
            {!post.pullQuote && <p className="mb-6 text-[14px] text-foreground/60">By {post.author}</p>}
            <PostBody value={post.body} />
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ShareLinks title={post.title} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-border pt-14">
            <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Keep reading
            </h2>
            <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
