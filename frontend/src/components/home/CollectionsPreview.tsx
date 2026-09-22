"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COLLECTIONS } from "@/components/collections/CollectionsShowcase";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PREVIEW_COLLECTIONS = COLLECTIONS.slice(0, 5);

/**
 * Collections - an editorial serif heading beside a staggered grid of
 * portrait tiles, each one scaling up from ~72% as it scrolls through the
 * viewport. Unlike every other reveal on this site (one-shot `gsap.from`,
 * plays once), this is `scrub: true` per tile: the scale is tied directly
 * to scroll position, so it grows and shrinks in step with the scrollbar
 * rather than firing once and holding. The middle column sits lower than
 * its neighbors for the masonry stagger the effect is built to show off.
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
          { scale: 0.72, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: tile,
              start: "top 95%",
              end: "top 55%",
              scrub: true,
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
      <div className="mx-auto max-w-6xl">
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
