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
 * The animation is the section's original one: each tile slides in from
 * the left and grows from ~70% as it scrolls into view, tied to the
 * scrollbar (it plays back in reverse on the way up). In one row the tiles
 * would all move in step, so they share one timeline, each starting a
 * little after the one before it - a left-to-right cascade. The timeline
 * runs from the row entering the bottom of the screen until it is near the
 * top, so each tile takes more than half a screen of scrolling (the old
 * per-tile range was half): slow and smooth. `scrub: 1.5` (a 1.5s catch-up)
 * rather than `scrub: true`, so it eases after the scroll and doesn't fight
 * Lenis's own smoothing. No pinning, so it adds no scroll length. Reduced
 * motion shows the row at rest.
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

      gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "top 15%",
          scrub: 1.5,
        },
      }).fromTo(
        tiles,
        { x: -140, scale: 0.7, opacity: 0.4 },
        { x: 0, scale: 1, opacity: 1, ease: "none", duration: 1, stagger: 0.12 },
      );
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
          <li key={collection.name} data-tile style={{ transformOrigin: "50% 100%" }}>
            <div className="relative aspect-[4/5] overflow-hidden bg-background">
              <Image
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
