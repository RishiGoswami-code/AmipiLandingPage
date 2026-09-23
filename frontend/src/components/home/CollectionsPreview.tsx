"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COLLECTIONS, type Collection } from "@/components/collections/CollectionsShowcase";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Preview-only sixth tile - the full /collections page's bento grid is
 * fitted exactly to the shared COLLECTIONS array's 5 entries (1 featured
 * 2x2 + 4 singles = a clean 4x2), so this stays local to the homepage row
 * rather than growing that array and throwing the bento off. */
const HOOP_EDIT: Collection = {
  name: "The Hoop Edit",
  tagline: "Classic Hoops & Huggies",
  description:
    "Polished hoops in every size, from a subtle huggie to a statement circle.",
  image:
    "https://images.unsplash.com/photo-1517857399767-a9dc28f5a734?auto=format&fit=crop&w=900&h=1100&q=80",
};

const PREVIEW_COLLECTIONS = [...COLLECTIONS.slice(0, 5), HOOP_EDIT];

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
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {PREVIEW_COLLECTIONS.map((collection, i) => (
            <Link
              key={collection.name}
              href="/collections"
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
              <p className="mt-4 text-[11px] tracking-[0.18em] text-gold-500 uppercase">
                {collection.tagline}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold text-foreground sm:text-lg">
                {collection.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <PillButton href="/collections" variant="outline" icon="arrow">
            View All Collections
          </PillButton>
        </div>
      </div>
    </section>
  );
}
