"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Collection = {
  name: string;
  image: string;
};

/** Top row is the three signature lines; the bottom row is the
 * shop-by-style edits (bezel, colored stones, stackable bands). */
const PREVIEW_COLLECTIONS: Collection[] = [
  { name: "The Riviera Collection", image: "/Collections/riviera-collection.webp" },
  { name: "The Aurora Bridal Edit", image: "/Collections/aurora-bridal-edit.webp" },
  { name: "Lab-Grown Brilliance", image: "/Collections/lab-grown-brilliance.webp" },
  { name: "The Bezel-Set Collection", image: "/Collections/bezel.webp" },
  { name: "The Color Collection", image: "/Collections/color.webp" },
  { name: "The Stackable Collection", image: "/Collections/stack.webp" },
];

/**
 * Collections - an editorial serif heading beside a staggered grid of
 * portrait tiles. Each tile slides in from the left and scales up from
 * ~70% as it scrolls through the viewport, so it reads as travelling
 * left-to-right into its resting spot rather than just fading up in
 * place. Unlike every other reveal on this site (one-shot `gsap.from`,
 * plays once), this is `scrub: 1` per tile: the motion is tied to
 * scroll position with a one-second catch-up, so it advances and
 * reverses in step with the scrollbar rather than firing once and
 * holding. The catch-up (rather than `scrub: true`) is deliberate:
 * an unsmoothed scrub re-reads Lenis's own momentum on every tick,
 * and the two smoothers fighting is a documented source of visible
 * jitter in GSAP+Lenis setups. The middle column
 * sits lower than its neighbors for the masonry stagger the effect is
 * built to show off.
 */
export function CollectionsPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tiles =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-tile]");
      if (!tiles || !tiles.length) return;

      tiles.forEach((tile) => {
        gsap.fromTo(
          tile,
          { x: -140, scale: 0.7, opacity: 0.4 },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: tile,
              start: "top 95%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface px-6 py-12 sm:px-12 sm:py-16 lg:px-20"
    >
      <div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl leading-[1.1] font-semibold text-foreground sm:text-5xl">
            Discover Our
            <br />
            Signature Collections
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {PREVIEW_COLLECTIONS.map((collection, i) => (
            <Link
              key={collection.name}
              href="/categories"
              data-tile
              className={`group block ${i % 3 === 1 ? "sm:mt-16" : ""}`}
              style={{ transformOrigin: "50% 100%" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-background">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(min-width: 640px) 30vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground sm:text-lg">
                {collection.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
