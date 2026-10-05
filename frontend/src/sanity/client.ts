import { createClient, defineQuery } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";
import { apiVersion, dataset, projectId } from "./env";

/** Read-only, CDN-backed: published posts only, no token. */
export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder({ projectId: projectId || "missing-project-id", dataset });

/** Sized, auto-format URL for a Sanity image (respects the editor's hotspot). */
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");

export type PostImage = SanityImageSource & { alt?: string };

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
  excerpt?: string;
  /** A Sanity image, or a plain URL for the built-in sample posts. */
  mainImage: PostImage | string;
  imageAlt: string;
};

export type Post = PostSummary & {
  pullQuote?: string;
  body: PortableTextBlock[];
};

const summaryFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  author,
  publishedAt,
  excerpt,
  mainImage,
  "imageAlt": coalesce(mainImage.alt, title)
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && ($category == "" || category == $category)]
  | order(publishedAt desc) { ${summaryFields} }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] { ${summaryFields}, pullQuote, body }
`);

export const RELATED_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != $slug]
  | order((category == $category) desc, publishedAt desc)[0...3] { ${summaryFields} }
`);

export const SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)].slug.current`);

/** Cropped URL for a post image - a Sanity asset, or a sample post's plain URL. */
export const imageUrl = (image: PostImage | string, width: number, height: number) =>
  typeof image === "string"
    ? image
    : urlFor(image).width(width).height(height).fit("crop").url();
