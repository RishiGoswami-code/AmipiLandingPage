import Image from "next/image";
import type { ReactNode } from "react";

/**
 * One half of the Diamonds and Bridal row, after the team's mockups: a photo
 * filling its half of the screen, with the copy - heading, a line of body
 * text and the buttons - set over the photo's plain left half, ivory on the
 * dark ground. From 1280px the two halves sit side by side, edge to edge
 * (GiftGuideHalfRow), each 3:2 like the photos; from 768px to 1280px each
 * is a full-width banner of its own (3:2, then 16:9 from 1024px), where the
 * copy's half is wider than the copy. The heading is set large, so it holds
 * its own beside the jewelry rather than reading as a caption to it.
 *
 * The photo does not grow with the copy: it is a 3:2 box nine tenths of the
 * half's width, at the right and centred top to bottom, so the jewelry
 * keeps one scale however tall the copy makes the half. It crops to that
 * box, held at `position`, and its left, top and bottom edges fade into
 * the half's ground (`ground`, the photo's own plain colour), so there is
 * no seam; a further fade in that colour runs in from the left behind the
 * copy, so it still reads where a long button comes near the jewelry.
 *
 * On phones the photo leads at 3:2 and the copy follows on `ground`, so the
 * two read as one block.
 *
 * The shapes are minimum heights in vw rather than aspect-ratio: in the
 * grid, an aspect-ratio box with a minimum height widens past its column.
 *
 * Its own <section> with an id, for the masthead's tabs: the negative
 * scroll margin cancels the site's 5rem scroll-padding, as the page does
 * for its direct children (app/gift-guide/page.tsx).
 */
export function GiftGuideHalfBanner({
  id,
  title,
  src,
  position,
  ground,
  children,
}: {
  id: string;
  title: string;
  src: string;
  position: string;
  /** The photo's plain ground, for the fade and the phone copy block. */
  ground: string;
  /** The body text and buttons. */
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative isolate flex min-w-0 scroll-mt-[-5rem] flex-col overflow-hidden text-[#f5efe4] md:min-h-[66.67vw] md:justify-center lg:min-h-[56.25vw] xl:min-h-[max(27rem,33.33vw)]"
      style={{ backgroundColor: ground }}
    >
      <div className="relative aspect-[3/2] md:absolute md:top-1/2 md:right-0 md:-z-10 md:w-[90%] md:-translate-y-1/2 md:[mask-composite:intersect] md:[mask-image:linear-gradient(to_right,transparent,#000_30%),linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]">
        <Image
          quality={90}
          src={src}
          alt=""
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          style={{ objectPosition: position }}
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block"
          style={{ background: `linear-gradient(90deg, ${ground} 0%, ${ground}d9 35%, ${ground}00 65%)` }}
        />
      </div>

      <div className="px-edge py-10 sm:py-12 md:max-w-[50%] md:pr-0 md:pl-[clamp(1.5rem,3.5vw,3.5rem)]">
        <h2
          id={`${id}-heading`}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,4rem)] leading-[1.02] xl:text-[clamp(3.25rem,4.2vw,4.75rem)] font-medium text-balance"
        >
          {title}
        </h2>
        <span aria-hidden className="mt-5 block h-0.5 w-16 bg-[#d9b877]" />
        {children}
      </div>
    </section>
  );
}

/** The body line under a half banner's heading. */
export function HalfBannerText({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[40ch] text-[clamp(1.0625rem,1.4vw,1.3125rem)] leading-relaxed text-pretty text-[#f5efe4]/85">{children}</p>;
}

/** The buttons under a half banner's copy, stacked and left-aligned, each
 * on one line even where it runs past the copy's half. */
export function HalfBannerActions({ children }: { children: ReactNode }) {
  return <div className="mt-7 flex flex-col items-start gap-3 [&>*]:whitespace-nowrap">{children}</div>;
}

/** The row the two halves share: stacked below 1280px, side by side above. */
export function GiftGuideHalfRow({ children }: { children: ReactNode }) {
  return <div className="grid xl:grid-cols-2">{children}</div>;
}
