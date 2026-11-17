"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionRule } from "@/components/home/SectionRule";
import { PillButton } from "@/components/ui/PillButton";
import { AMIPI_FINE_JEWELRY } from "@/lib/amipi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Collection = {
  name: string;
  image: string;
};

/** Six collections, left to right: gemstones, bezel-set, stackable, drop
 * earrings, bridal rings, multi-shape. Each name ends on a different word,
 * so the row doesn't read "Jewelry, Jewelry, Jewelry". */
const PREVIEW_COLLECTIONS: Collection[] = [
  { name: "Color Gemstones", image: "/Collections/color-collection-v2.webp" },
  { name: "Bezel-Set Designs", image: "/Collections/bezel-set-collection-v2.webp" },
  { name: "Stackable", image: "/Collections/stack-collection-v2.webp" },
  { name: "Drop Earrings", image: "/Collections/cascade-collection.webp" },
  {
    name: "Bridal Rings",
    image: "/Collections/ever-after-bridal-edit-v2.webp",
  },
  {
    name: "Multi-Shape Jewelry",
    image: "/Collections/mosaic-collection-v2.webp",
  },
];

/**
 * Collections - the editorial serif heading, then all six collections in a
 * single row of small 4:5 tiles (from 768px; three by two on phones, where
 * six across would be ~55px each), and one "Shop Now" under the row to
 * amipi.com's Fine Jewelry page. The tiles are display only - no links; the
 * button is the section's one way on.
 *
 * The animation is a scroll-scrubbed reveal across the row, 0 to 100% as the
 * row travels from the bottom of the screen to just below the middle:
 * each tile's photo is uncovered from the bottom up (a clip-path wipe)
 * while it rises into place and the photo settles from a slight zoom, the
 * tiles following one another left to right. One timeline for the whole
 * row, no pinning, so it adds no scroll length of its own. `scrub: 1`
 * (a one-second catch-up) rather than `scrub: true`, so it doesn't fight
 * Lenis's own smoothing. Reduced motion shows the row at rest.
 *
 * It replaces two rows of large tiles that each slid in from the left and
 * scaled up from 70% - the same scrubbed idea, at about three times the
 * height.
 */
export function CollectionsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const row = rowRef.current;
      const tiles = row?.querySelectorAll<HTMLElement>("[data-tile]");
      if (!row || !tiles?.length) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: row,
          start: "top 92%",
          end: "top 55%",
          scrub: 1,
        },
      });

      tiles.forEach((tile, i) => {
        const frame = tile.querySelector<HTMLElement>("[data-frame]");
        const photo = tile.querySelector<HTMLElement>("[data-photo]");
        const at = i * 0.12;
        timeline
          .fromTo(tile, { yPercent: 22, opacity: 0.25 }, { yPercent: 0, opacity: 1, duration: 0.5 }, at)
          .fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5 },
            at,
          )
          .fromTo(photo, { scale: 1.25 }, { scale: 1, duration: 0.6 }, at);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="collections-heading"
      className="relative overflow-hidden bg-surface px-6 pt-6 pb-8 sm:px-12 sm:pt-8 sm:pb-10 lg:px-20"
    >
      <h2
        id="collections-heading"
        className="font-[family-name:var(--font-cormorant)] text-5xl leading-[1.1] font-normal tracking-tight text-navy-700 sm:text-6xl"
      >
        Discover Our
        <br />
        Signature Collections
      </h2>
      <SectionRule />

      <ul
        ref={rowRef}
        className="mt-8 grid grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-6 lg:gap-x-5"
      >
        {PREVIEW_COLLECTIONS.map((collection) => (
          <li key={collection.name} data-tile>
            <div data-frame className="relative aspect-[4/5] overflow-hidden bg-background">
              <Image
                data-photo
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(min-width: 768px) 15vw, 31vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-3 font-display text-[13px] leading-snug font-semibold text-navy-700 sm:text-sm lg:text-base">
              {collection.name}
            </h3>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center sm:mt-10">
        <PillButton href={AMIPI_FINE_JEWELRY} variant="brand" icon="arrow">
          Shop Now
        </PillButton>
      </div>
    </section>
  );
}
