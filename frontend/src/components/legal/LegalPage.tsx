import Link from "next/link";

/**
 * Shell for long-form legal text (Terms of Use, Privacy Policy): a serif
 * title, a short line of links to the sibling document, then the body in a
 * readable measure. Headings, paragraphs and lists inside `children` are
 * styled here through descendant selectors, so the documents themselves stay
 * plain markup.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background px-6 pt-32 pb-20 sm:px-12 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase">Legal</p>
        <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-foreground/60">{intro}</p>
        <nav aria-label="Legal documents" className="mt-4 flex gap-4 text-sm">
          <Link href="/terms-of-use" className="text-foreground/70 underline-offset-4 hover:text-gold-600 hover:underline">
            Terms of Use
          </Link>
          <span aria-hidden className="text-foreground/25">
            |
          </span>
          <Link href="/privacy-policy" className="text-foreground/70 underline-offset-4 hover:text-gold-600 hover:underline">
            Privacy Policy
          </Link>
        </nav>

        <div className="mt-10 border-t border-black/10 pt-8 text-[15px] leading-relaxed text-foreground/75 [&_a]:text-[#a47a35] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-cormorant)] [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:tracking-[0.15em] [&_h3]:text-foreground [&_h3]:uppercase [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&>*:first-child]:mt-0">
          {children}
        </div>
      </div>
    </section>
  );
}
