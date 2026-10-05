import type { PortableTextBlock } from "@portabletext/react";
import type { Post } from "./client";

/**
 * Placeholder posts, shown only while no Sanity project is connected (see
 * sanityConfigured in env.ts) so the Journal can be designed and reviewed
 * before real content exists. They carried over from the old static Journal
 * grid; none of this is published copy. Once Sanity is set up these are never
 * read.
 */

let key = 0;
const paragraphs = (...texts: string[]): PortableTextBlock[] =>
  texts.map((text) => ({
    _type: "block",
    _key: `s${key++}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${key++}`, text, marks: [] }],
  }));

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&h=900&q=80`;

export const SAMPLE_POSTS: Post[] = [
  {
    _id: "sample-jis-miami",
    title: "AMIPI at JIS Miami 2026: What We're Bringing",
    slug: "amipi-at-jis-miami-2026",
    category: "press",
    author: "AMIPI Team",
    publishedAt: "2026-05-12T09:30:00Z",
    excerpt: "A preview of the pieces and price points we're bringing to Booth #1335 this October.",
    mainImage: unsplash("photo-1613498510372-8901cad084a2"),
    imageAlt: "Diamond jewelry on display",
    pullQuote: "Come see the stones in person - no bull, just fair prices.",
    body: paragraphs(
      "Sample post. This is placeholder text shown until the Journal is connected to Sanity.",
      "Find us at Booth #1335 at the Miami Beach Convention Center this October.",
    ),
  },
  {
    _id: "sample-grading",
    title: "How AMIPI Grades Every Stone We List",
    slug: "how-amipi-grades-every-stone",
    category: "retailer-therapy",
    author: "AMIPI Team",
    publishedAt: "2026-07-18T09:30:00Z",
    excerpt: "No upgraded paper, no vague \"eye clean.\" A look at the certification process behind every listing.",
    mainImage: unsplash("photo-1524805444758-089113d48a6d"),
    imageAlt: "A jeweler inspecting a diamond",
    pullQuote: "All internally graded merchandise is based on GIA standards.",
    body: paragraphs(
      "Sample post. This is placeholder text shown until the Journal is connected to Sanity.",
      "No upgraded paper, no vague \"eye clean.\" A look at the certification process behind every listing.",
    ),
  },
  {
    _id: "sample-lab-natural",
    title: "Natural vs. Lab-Grown: What Actually Changes at the Register",
    slug: "natural-vs-lab-grown",
    category: "retailer-therapy",
    author: "AMIPI Team",
    publishedAt: "2026-08-04T09:30:00Z",
    excerpt: "Same chemistry, same grading scale, very different price per carat. Here's what the difference does and doesn't affect.",
    mainImage: unsplash("photo-1605100804567-1ffe942b5cd6"),
    imageAlt: "Loose diamonds on a dark surface",
    body: paragraphs(
      "Sample post. This is placeholder text shown until the Journal is connected to Sanity.",
      "Same chemistry, same grading scale, very different price per carat.",
    ),
  },
  {
    _id: "sample-4cs",
    title: "The 4Cs, Explained Without the Sales Pitch",
    slug: "the-4cs-explained",
    category: "marketing",
    author: "AMIPI Team",
    publishedAt: "2026-07-02T09:30:00Z",
    excerpt: "Cut, color, clarity, carat - and which one actually matters most for how a diamond looks in person.",
    mainImage: unsplash("photo-1750767323874-5946ad2c7e91"),
    imageAlt: "A diamond ring close up",
    body: paragraphs(
      "Sample post. This is placeholder text shown until the Journal is connected to Sanity.",
      "Cut, color, clarity, carat - and which one actually matters most for how a diamond looks in person.",
    ),
  },
  {
    _id: "sample-ai-search",
    title: "Choosing a Diamond Shape: Round Brilliant vs. Fancy Cuts",
    slug: "choosing-a-diamond-shape",
    category: "ai",
    author: "AMIPI Team",
    publishedAt: "2026-06-20T09:30:00Z",
    excerpt: "Round brilliants aren't the only option - a practical look at how oval, cushion and emerald cuts wear differently.",
    mainImage: unsplash("photo-1611591437281-460bfbe1220a"),
    imageAlt: "Diamonds in different shapes",
    body: paragraphs(
      "Sample post. This is placeholder text shown until the Journal is connected to Sanity.",
      "Round brilliants aren't the only option.",
    ),
  },
];
