import Image from "next/image";
import type { ReactNode } from "react";
import { CHAMPAGNE, EYEBROW } from "./GiftGuideTheme";

/**
 * A full-width photo band, after the team's "Made for You" mockup: the copy
 * - an eyebrow, a large upright heading, a short gold rule, then the body
 * and buttons - in ivory over the band's plain ground at the left, and the
 * photo behind it, fading into that ground so there is no seam.
 *
 * The photos are 3:1, shot on the band's own ground with the left half
 * empty and the jewelry from about 53% across. From 1024px the photo is
 * held at its own shape to 76% of the band's width, against the right edge
 * and centred top to bottom, so the jewelry sits at a modest scale from
 * about 64% to 94% across, well clear of the copy (held to the left half).
 * The band is at least 28vw tall (24rem), a little taller than the photo,
 * which is never cut off; its top, bottom and plain left edges fade into
 * the ground. Below 1024px the photo leads at 2:1, cropped to `position`,
 * its bottom edge fading into the ground where the copy follows, the two
 * reading as one block.
 *
 * Its own <section> with an id, for the masthead's tabs: the page's
 * negative scroll margin applies, as it is a direct child of the page.
 */
export function GiftGuideBanner({
  id,
  eyebrow,
  title,
  src,
  position,
  ground,
  photoClassName = "",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  src: string;
  position: string;
  /** The band's ground: the green, or the photo's own plain colour. */
  ground: string;
  /** Extra classes for the photo, e.g. a filter. */
  photoClassName?: string;
  /** The body and buttons. */
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative isolate flex flex-col overflow-hidden text-[#f5efe4] lg:min-h-[max(24rem,28vw)] lg:justify-center"
      style={{ backgroundColor: ground }}
    >
      <div className="relative aspect-[2/1] [mask-image:linear-gradient(to_bottom,#000_82%,transparent)] lg:absolute lg:right-0 lg:top-1/2 lg:w-[76%] lg:-z-10 lg:aspect-[3/1] lg:-translate-y-1/2 lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(to_right,transparent,#000_25%),linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)]">
        <Image
          quality={90}
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 76vw, 100vw"
          style={{ objectPosition: position }}
          className={`object-cover ${photoClassName}`}
        />
      </div>

      <div className="px-edge py-10 sm:py-12 lg:max-w-[min(48rem,50%)] lg:py-[var(--gift-gap)] lg:pr-0 lg:pl-[clamp(1.5rem,3.5vw,3.5rem)]">
        {eyebrow && (
          <p className={`mb-4 ${EYEBROW}`} style={{ color: CHAMPAGNE }}>
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-heading`}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,4rem)] leading-[1.02] font-medium text-balance xl:text-[clamp(3rem,3.7vw,4.125rem)]"
        >
          {title}
        </h2>
        <span aria-hidden className="mt-5 block h-0.5 w-16" style={{ backgroundColor: CHAMPAGNE }} />
        {children}
      </div>
    </section>
  );
}
