"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  COLLECTIONS,
  CollectionCard,
  handleCardTiltMove,
  handleCardTiltLeave,
} from "@/components/collections/CollectionsShowcase";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PREVIEW_COLLECTIONS = COLLECTIONS.slice(0, 3);

/**
 * Homepage teaser for the full /collections page - three cards in one
 * plain row (spanFeatured forced off so none of them claims the bento's
 * double-wide slot), same tilt-on-hover effect as the full showcase, then
 * a link out to the complete set of editorial collections.
 */
export function CollectionsPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const cards =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards || !cards.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 48,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background px-6 py-16 sm:px-12 sm:py-[5.6rem] lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
              Curated Edits
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-4xl">
              Our Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PREVIEW_COLLECTIONS.map((collection) => (
            <CollectionCard
              key={collection.name}
              collection={collection}
              spanFeatured={false}
              onMouseMove={handleCardTiltMove}
              onMouseLeave={handleCardTiltLeave}
            />
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
