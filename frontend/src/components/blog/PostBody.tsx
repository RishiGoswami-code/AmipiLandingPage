import Image from "next/image";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { urlFor, type PostImage } from "@/sanity/client";

/** How rich text written in the Studio renders on the reading page. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl leading-snug font-semibold text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl leading-snug font-semibold text-foreground">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-[#d4ae5c] pl-5 text-lg text-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[#a47a35] underline underline-offset-2 hover:text-foreground"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: PostImage & { caption?: string } }) => (
      <figure className="my-10">
        <Image
          src={urlFor(value).width(1400).url()}
          alt={value.alt ?? ""}
          width={1400}
          height={900}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full rounded-xl"
        />
        {value.caption && (
          <figcaption className="mt-3 text-center text-[13px] text-foreground/55">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
