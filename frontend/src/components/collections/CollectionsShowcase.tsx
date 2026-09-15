"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Collection = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** Bento sizing — the featured piece runs a full two-column, two-row
   * block; everything else is a single cell. */
  featured?: boolean;
};

export const COLLECTIONS: Collection[] = [
  {
    name: "The Riviera Collection",
    tagline: "Tennis-Line Fluidity",
    description:
      "Continuous lines of matched round brilliants, set edge to edge in 18k gold - our best-selling line-diamond silhouette.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&h=1400&q=80",
    featured: true,
  },
  {
    name: "The Aurora Bridal Edit",
    tagline: "Engagement & Wedding",
    description:
      "Solitaire to halo, in natural or lab-grown - built for the one ring that has to be right.",
    image:
      "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Lab-Grown Brilliance",
    tagline: "Same Fire, New Source",
    description:
      "IGI-certified lab diamonds, graded and priced with the same transparency as our natural stones.",
    image:
      "https://images.unsplash.com/photo-1750767323874-5946ad2c7e91?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "The Heritage Vault",
    tagline: "Vintage-Inspired Fine Jewelry",
    description:
      "Milgrain edges, filigree work and old-world settings, reimagined for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Men's Signet Series",
    tagline: "Chains, Bands & Signets",
    description:
      "Weighted gold and diamond-set pieces built for daily wear, not display cases.",
    image:
      "https://images.unsplash.com/photo-1613498510372-8901cad084a2?auto=format&fit=crop&w=900&h=1100&q=80",
  },
];

/** Degrees of tilt at the extreme edge of a card - kept small so the effect
 * reads as premium glass, not a gimmick. */
const TILT_MAX_DEG = 6;

/** Cursor-tracking 3D tilt, shared by the full showcase grid and the
 * homepage preview - pure DOM writes (see CollectionCard) so the pointer
 * stays glued to 60fps instead of round-tripping through React state. */
export function handleCardTiltMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--tilt-x", `${(py * -TILT_MAX_DEG).toFixed(2)}deg`);
  el.style.setProperty("--tilt-y", `${(px * TILT_MAX_DEG).toFixed(2)}deg`);
}

export function handleCardTiltLeave(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.setProperty("--tilt-x", "0deg");
  el.style.setProperty("--tilt-y", "0deg");
}

/**
 * Editorial bento grid: one oversized featured tile plus four supporting
 * cards, each tracking the cursor with a subtle 3D tilt (perspective +
 * rotateX/rotateY driven straight off CSS custom properties, updated
 * imperatively via the DOM rather than React state so the pointer stays
 * glued to 60fps instead of round-tripping through a re-render per move -
 * same imperative-style-write pattern HeroStage uses for its camera).
 * Pointer-only: touch devices never fire mousemove, so they simply keep
 * the flat hover state below.
 */
export function CollectionsShowcase() {
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
        y: 56,
        scale: 0.96,
        duration: 1,
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
      className="relative bg-navy-900 px-6 py-20 sm:px-12 sm:py-28 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {COLLECTIONS.map((collection) => (
          <CollectionCard
            key={collection.name}
            collection={collection}
            onMouseMove={handleCardTiltMove}
            onMouseLeave={handleCardTiltLeave}
          />
        ))}
      </div>
    </section>
  );
}

export function CollectionCard({
  collection,
  spanFeatured = collection.featured,
  onMouseMove,
  onMouseLeave,
}: {
  collection: Collection;
  /** Overrides `collection.featured` for the bento-spanning classes - the
   * homepage preview forces this false so every card in its plain row
   * comes out the same size, even for the collection normally featured
   * on the full showcase grid. */
  spanFeatured?: boolean;
  onMouseMove: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <article
      data-card
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={[
        "group relative overflow-hidden rounded-3xl border border-ice-100/8 bg-navy-950 [transform:perspective(1000px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform hover:border-gold-500/40 hover:shadow-[0_24px_50px_-16px_rgba(254,215,0,0.22)]",
        spanFeatured
          ? "aspect-[4/5] sm:col-span-2 sm:aspect-auto lg:col-span-2 lg:row-span-2"
          : "aspect-[4/5]",
      ].join(" ")}
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes={
          spanFeatured
            ? "(min-width: 1024px) 46vw, 92vw"
            : "(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-transparent" />

      <div
        className={[
          "absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:p-6",
          spanFeatured ? "lg:p-8" : "",
        ].join(" ")}
      >
        <p className="text-[10px] tracking-[0.3em] text-gold-500 uppercase sm:text-[11px]">
          {collection.tagline}
        </p>
        <h3
          className={[
            "mt-2 font-display font-extrabold tracking-[0.01em] text-ice-100 uppercase",
            spanFeatured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl",
          ].join(" ")}
        >
          {collection.name}
        </h3>
        <p
          className={[
            "mt-2 text-ice-100/60",
            spanFeatured
              ? "max-w-sm text-sm leading-relaxed sm:text-base"
              : "hidden text-xs leading-relaxed sm:block",
          ].join(" ")}
        >
          {collection.description}
        </p>

        <div className="mt-4 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <PillButton
              href="#contact"
              variant={spanFeatured ? "solid" : "outline"}
              size="sm"
              icon="arrow"
            >
              Explore Collection
            </PillButton>
          </div>
        </div>
      </div>
    </article>
  );
}
