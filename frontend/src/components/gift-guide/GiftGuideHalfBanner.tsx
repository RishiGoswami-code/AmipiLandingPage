import Image from "next/image";
import type { ReactNode } from "react";

/**
 * One half of the Diamonds and Bridal row (and of Bezel and Color), after
 * the team's mockups: a photo
 * filling its half of the screen, with the copy - heading, a line of body
 * text and the buttons - set over the photo's plain left half: ivory on a
 * dark ground, or (`tone="light"`) ink on a light one. From 1280px the two
 * halves sit side by side, edge to edge (GiftGuideHalfRow), each at least
 * 30vw (24rem) tall - a little wider than 3:2, with slim padding above and
 * below the copy; from 768px to 1280px each is a full-width banner of its
 * own (at least 60vw tall, then 50vw from 1024px), where the copy's half is
 * wider than the copy. The heading is set large, so it holds its own
 * beside the jewelry rather than reading as a caption to it.
 *
 * The photo does not grow with the copy: it is a 3:2 box 88% of the half's
 * width (72% on the full-width banners from 1024px, 82% from 1536px), at
 * the right and centred top to bottom, so the jewelry keeps one scale
 * however tall the copy makes the half. It crops to that
 * box, held at `position`, and its left, top and bottom edges fade into
 * the half's ground (`ground`, the photo's own plain colour), so there is
 * no seam. On a light ground the box sits in the bottom corner instead,
 * fading only at its left and top, for photos whose cloth runs off the
 * bottom and right edges; a further fade in that colour runs in from the left behind the
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
  tone = "dark",
  photo = "large",
  children,
}: {
  id: string;
  /** The heading: one string, wrapped to the copy's half, or its lines,
   * each kept whole from 768px however far it runs towards the photo. */
  title: string | string[];
  src: string;
  position: string;
  /** The photo's plain ground, for the fade and the phone copy block. */
  ground: string;
  /** The ground's tone: ivory copy on a dark one, ink copy on a light one. */
  tone?: "dark" | "light";
  /** `small` side by side holds the photo to 66% of the half (62% from
   * 1536px), so a long paragraph clears jewelry that starts further left. */
  photo?: "large" | "small";
  /** The body text and buttons. */
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative isolate flex min-w-0 scroll-mt-[-5rem] flex-col overflow-hidden md:min-h-[60vw] md:justify-center lg:min-h-[50vw] xl:min-h-[max(24rem,30vw)] ${
        tone === "light"
          ? "text-[#141a17] [--half-body:rgb(20_26_23/0.75)] [--half-rule:#8a6630]"
          : "text-[#f5efe4] [--half-body:rgb(245_239_228/0.85)] [--half-rule:#d9b877]"
      }`}
      style={{ backgroundColor: ground }}
    >
      <div
        className={`relative aspect-[3/2] md:absolute md:right-0 md:-z-10 md:w-[88%] md:[mask-composite:intersect] lg:w-[72%] ${
          photo === "small" ? "xl:w-[66%] 2xl:w-[62%]" : "xl:w-[88%] 2xl:w-[82%]"
        } ${
          tone === "light"
            ? "md:bottom-0 md:[mask-image:linear-gradient(to_right,transparent,#000_30%),linear-gradient(to_bottom,transparent,#000_14%)]"
            : "md:top-1/2 md:-translate-y-1/2 md:[mask-image:linear-gradient(to_right,transparent,#000_30%),linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]"
        }`}
      >
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

      <div className="px-edge py-9 sm:py-10 md:py-8 md:pr-0 md:pl-[clamp(1.5rem,3.5vw,3.5rem)]">
        <h2
          id={`${id}-heading`}
          className={`font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,4rem)] leading-[1.02] font-medium text-balance xl:text-[clamp(3rem,3.7vw,4.125rem)] ${
            typeof title === "string" ? "md:max-w-[48%]" : ""
          }`}
        >
          {typeof title === "string"
            ? title
            : // A space between the lines keeps the heading's accessible
              // name one phrase
              title.map((line, i) => (
                <span key={line}>
                  {i > 0 && " "}
                  <span className="block md:whitespace-nowrap">{line}</span>
                </span>
              ))}
        </h2>
        <span aria-hidden className="mt-5 block h-0.5 w-16 bg-(--half-rule)" />
        {children}
      </div>
    </section>
  );
}

/** The body line under a half banner's heading, held to the photo's plain
 * half. */
export function HalfBannerText({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[40ch] md:max-w-[min(40ch,50%)] text-[clamp(1.0625rem,1.4vw,1.3125rem)] leading-relaxed text-pretty text-(--half-body)">{children}</p>;
}

/** The buttons under a half banner's copy, stacked and left-aligned, each
 * on one line. */
export function HalfBannerActions({ children }: { children: ReactNode }) {
  return <div className="mt-7 flex flex-col items-start gap-3 [&>*]:whitespace-nowrap">{children}</div>;
}

/** The row the two halves share: stacked below 1280px, side by side above. */
export function GiftGuideHalfRow({ children }: { children: ReactNode }) {
  return <div className="grid xl:grid-cols-2">{children}</div>;
}
