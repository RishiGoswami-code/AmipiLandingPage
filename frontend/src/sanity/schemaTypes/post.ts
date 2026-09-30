import { defineArrayMember, defineField, defineType } from "sanity";
import { CATEGORIES } from "../categories";

/** A Journal post. Field order is the order editors see in the Studio. */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      description: "The post's web address. Click Generate to make it from the title.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: CATEGORIES.map(({ value, label }) => ({ value, title: label })), layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          description: "Describe the image for screen readers.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      description: "One or two sentences for the blog list and search results.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "pullQuote",
      title: "Pull quote",
      description: "Optional. Shown large beside the opening of the post.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", category: "category", media: "mainImage" },
    prepare: ({ title, category, media }) => ({
      title,
      subtitle: CATEGORIES.find((c) => c.value === category)?.label,
      media,
    }),
  },
});
