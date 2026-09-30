import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { imageUrl, type PostSummary } from "@/sanity/client";
import { categoryLabel } from "@/sanity/categories";

/**
 * A Journal card after BigCommerce's blog grid: wide image, an outlined
 * category chip, the author, a bold title, then READ NOW with an arrow that
 * nudges right on hover. The whole card is one link.
 */
export function PostCard({ post, priority = false }: { post: PostSummary; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-navy-50">
        <Image
          src={imageUrl(post.mainImage, 900, 506)}
          alt={post.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <span className="mt-5 self-start rounded-md border border-foreground/20 px-3 py-1 text-[13px] text-foreground/80">
        {categoryLabel(post.category)}
      </span>
      <p className="mt-4 text-[14px] text-foreground/65">{post.author}</p>
      <h3 className="mt-2 text-xl leading-snug font-bold text-foreground transition-colors group-hover:text-navy-700">
        {post.title}
      </h3>
      <span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-semibold tracking-[0.08em] text-foreground uppercase">
        Read now
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
