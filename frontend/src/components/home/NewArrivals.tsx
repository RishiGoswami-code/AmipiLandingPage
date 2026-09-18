"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
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
   * card's `fill` + `object-cover` treatment needs no changes either way. */
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
 * New Arrivals — a seasonal/festival best-sellers carousel: kicker, heading
 * and "view all" up top, a horizontally-scrolling card rail below it, a
 * progress track and prev/next controls under that.
 */
export function NewArrivals() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [progress, setProgress] = useState({ ratio: 1, offset: 0 });

  // Entrance: cards rise and fade in, staggered, the first time this
  // section crosses into view - a one-shot reveal, not a scrub. Skipped
  // for prefers-reduced-motion, same as the hero's own entrance.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Queried directly rather than passed as the "[data-card]" string -
      // GSAP resolves string selectors through its scope-closure lazily,
      // which is one more moving part than this needs when the elements
      // are trivially reachable from the ref already in hand.
      const cards =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards || !cards.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 48,
        scale: 0.94,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          // Without this, ScrollTrigger's default ("play none none
          // reverse") replays the stagger backwards the moment the section
          // scrolls back above the trigger line - easy to trip with Lenis's
          // momentum overshoot. Catching that reverse mid-flight is what
          // left the cards sitting at different heights/opacities instead
          // of the settled row this is meant to be. "play none none none"
          // makes it the one-shot reveal the comment above already says it
          // is: plays once, never un-plays.
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < max - 4);
    const ratio = max <= 0 ? 1 : el.clientWidth / el.scrollWidth;
    const offset = max <= 0 ? 0 : el.scrollLeft / max;
    setProgress({ ratio: Math.min(1, ratio), offset });
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    const amount = (card?.offsetWidth ?? 280) + gap;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background px-6 py-16 sm:px-12 sm:py-[5.6rem] lg:px-20"
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
          </div>
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All New
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {PIECES.map((piece) => (
            <PieceCard key={piece.name} piece={piece} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="relative h-1 w-full max-w-[220px] rounded-full bg-foreground/10">
            <div
              className="absolute inset-y-0 rounded-full bg-foreground/50"
              style={{
                width: `${progress.ratio * 100}%`,
                left: `${progress.offset * (1 - progress.ratio) * 100}%`,
              }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous piece"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground/70"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Next piece"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/60 text-gold-500 transition-colors hover:bg-gold-500/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
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

function PieceCard({ piece }: { piece: Piece }) {
  const [saved, setSaved] = useState(false);

  return (
    <article
      data-card
      className="group relative h-[380px] w-[72vw] max-w-[300px] shrink-0 overflow-hidden rounded-2xl border border-ice-100/8 bg-navy-900 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_20px_40px_-12px_rgba(254,215,0,0.18)] sm:h-[420px] sm:w-[280px]"
      style={{ scrollSnapAlign: "start" }}
    >
      <Image
        src={piece.image}
        alt={piece.name}
        fill
        sizes="(min-width: 640px) 280px, 72vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Scrim - always present enough to keep the heart icon and info
          legible over a bright photo, deepens on hover to seat the
          Buy Now button that grows in below the name. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/95 via-navy-950/55 to-transparent transition-opacity duration-300 group-hover:opacity-100" />

      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        aria-label={saved ? "Remove from saved pieces" : "Save this piece"}
        aria-pressed={saved}
        className="absolute top-3 right-3 z-10 text-ice-100/80 transition-[color,transform] duration-200 hover:text-gold-500 active:scale-90"
      >
        <Heart
          className={
            saved
              ? "h-[18px] w-[18px] fill-gold-500 text-gold-500"
              : "h-[18px] w-[18px]"
          }
        />
      </button>

      <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <p className="text-[11px] tracking-[0.22em] text-gold-500 uppercase">
          {piece.spec}
        </p>
        <h3 className="mt-1 font-display text-base leading-snug font-semibold text-ice-100">
          {piece.name}
        </h3>

        {/* Buy Now - clipped to zero height at rest, grows open on hover.
            The grid-rows trick animates a height that's naturally "auto",
            which a plain max-height transition can't do smoothly. */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <PillButton
              href="/contact"
              variant="solid"
              size="sm"
              className="w-full justify-center"
            >
              Buy Now
            </PillButton>
          </div>
        </div>
      </div>
    </article>
  );
}
