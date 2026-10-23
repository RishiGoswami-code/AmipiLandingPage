import Image from "next/image";
import type { ReactNode } from "react";
import { CHAMPAGNE, EYEBROW } from "./GiftGuideTheme";

/**
 * A full-width photo band, after the team's "Made for You" mockup: the copy
 * - an eyebrow, a large upright heading, a short gold rule, then the body
 * and buttons - in ivory over the band's plain ground at the left, and the
 * photo at the right, fading into that ground so there is no seam.
 *
 * The photos are 3:1 with the jewelry towards the right, so from 1024px the
 * photo is a box the band's full height and 62% of its width (58% from
 * 1536px), cropped to `position`; the band is at least 30vw tall (26rem),
 * so the crop stays close to the photo's own shape. A further fade in the
 * ground colour runs in from the left behind the copy, so it reads where
 * a long line comes near the jewelry. Below 1024px the photo leads at 3:2
 * and the copy follows on the ground, the two reading as one block.
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
      className="relative isolate flex flex-col overflow-hidden text-[#f5efe4] lg:min-h-[max(26rem,30vw)] lg:justify-center"
      style={{ backgroundColor: ground }}
    >
      <div className="relative aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:aspect-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,#000_35%)] 2xl:w-[58%]">
        <Image
          quality={90}
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          style={{ objectPosition: position }}
          className={`object-cover ${photoClassName}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{ background: `linear-gradient(90deg, ${ground} 0%, ${ground}b3 25%, ${ground}00 50%)` }}
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
