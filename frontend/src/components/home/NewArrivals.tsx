"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Piece = {
  name: string;
  spec: string;
  /** Unsplash placeholder photo - freely licensed, standing in for real
   * product photography. Swap for the real shot whenever it exists; the
   * tile's `fill` + `object-cover` treatment needs no changes either way. */
  image: string;
};

/**
 * Placeholder content, not a live catalog - no real product data is wired
 * up yet (pricing removed for the same reason - nothing here is a real
 * quote). The first two pieces deliberately match the hero's
 * bracelet/necklace hotspots (see HeroStage.tsx) so scrolling into this
 * section reads as "here they are again, closer" rather than introducing
 * two unrelated names.
 */
const PIECES: Piece[] = [
  {
    name: "The Diamond Riviera Bracelet",
    spec: "18k White Gold",
    image:
      "https://images.unsplash.com/photo-1763029513623-37d488cb97b1?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "The Solitaire Diamond Choker",
    spec: "18k White Gold",
    image:
      "https://images.unsplash.com/photo-1689775703655-6d999e38e64c?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "Classic Diamond Hoops",
    spec: "14k White Gold",
    image:
      "https://images.unsplash.com/photo-1729101913531-69d0954b191e?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "The Eternity Band",
    spec: "Platinum",
    image:
      "https://images.unsplash.com/photo-1679156271376-3a69ba96a2dc?auto=format&fit=crop&w=800&h=1000&q=80",
  },
];

/**
 * New Arrivals - kicker, heading and a one-line description up top, then a
 * plain row of photo tiles with the spec/name sitting below each image
 * rather than overlaid on it. Deliberately the editorial-catalog treatment
 * (clean tile, caption underneath, no scrim/hover-CTA) rather than the
 * dark card language used elsewhere on the site, so this section reads as
 * a quieter "here's what's new" browse rather than another sales card.
 */
export function NewArrivals() {
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
        stagger: 0.1,
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
      className="relative bg-background px-6 py-12 sm:px-12 sm:py-16 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
              New Arrivals
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-4xl">
              This Season&rsquo;s Best Sellers
            </h2>
            <p className="mt-3 max-w-md text-sm text-foreground/60">
              Freshly cut, freshly set - the pieces that just landed in the case.
            </p>
          </div>
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All New
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {PIECES.map((piece) => (
            <Link key={piece.name} href="/collections" data-card className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  sizes="(min-width: 640px) 23vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-[11px] tracking-[0.18em] text-gold-500 uppercase">
                {piece.spec}
              </p>
              <h3 className="mt-1 font-display text-sm font-semibold text-foreground transition-colors group-hover:text-gold-500">
                {piece.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <PillButton href="/collections" variant="outline" icon="arrow">
            View All New
          </PillButton>
        </div>
      </div>
    </section>
  );
}
