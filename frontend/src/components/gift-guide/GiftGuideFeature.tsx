import Image from "next/image";
import type { ReactNode } from "react";
import { CARD, FOLD, SectionHeading, Sparkles } from "./GiftGuideTheme";

/**
 * The layout the gift guide's banner sections share (Diamonds, Bridal,
 * Custom, Bezel, Color), so they read as one page: the centred heading with
 * its ribbon line on the page's cream, then one card holding the banner
 * photo and the copy, centred, with the call to action under it.
 *
 * The banner photos are 3:1 with the jewelry towards the right and plain
 * ground at the left, so the card shows a crop: `position` is the focal
 * point it keeps. From 1024px the photo and copy sit side by side, the photo
 * taking the larger share - the sections alternate which side it takes -
 * and the photo is as tall as the copy (at least 24rem); below that the
 * photo leads, 3:2, and the copy follows.
 */
export function GiftGuideFeature({
  id,
  title,
  src,
  position,
  photoSide,
  photoClassName = "",
  children,
}: {
  /** The section's id, for the masthead's tabs; the heading's is `${id}-heading`. */
  id: string;
  title: string;
  src: string;
  position: string;
  photoSide: "left" | "right";
  /** Extra classes for the photo, e.g. a filter. */
  photoClassName?: string;
  /** The copy: body text and buttons, centred by the card. */
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={FOLD}>
      <SectionHeading id={`${id}-heading`} title={title} />

      <div
        className={`mt-[clamp(1.75rem,3vw,2.75rem)] grid overflow-hidden ${
          photoSide === "right"
            ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        } ${CARD}`}
      >
        <div className={`relative aspect-[3/2] lg:aspect-auto lg:min-h-[24rem] ${photoSide === "right" ? "lg:order-2" : ""}`}>
          <Image
            quality={90}
            src={src}
            alt=""
            fill
            // The 3:1 photo, cropped to the box, renders about twice the
            // box's width: the full width below 1024px, 58% above
            sizes="(min-width: 1024px) 110vw, 200vw"
            style={{ objectPosition: position }}
            className={`object-cover ${photoClassName}`}
          />
        </div>

        <div className="relative flex flex-col items-center justify-center px-6 py-10 text-center sm:px-10 lg:px-[clamp(2.5rem,4vw,4.5rem)] lg:py-14">
          <Sparkles corner={photoSide === "right" ? "top-left" : "top-right"} />
          {children}
        </div>
      </div>
    </section>
  );
}

/** The row of buttons under a feature's copy, centred. */
export function FeatureActions({ children }: { children: ReactNode }) {
  return <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>;
}
