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
  /** On-model shot - what the tile shows at rest. Cropped to the tile's
   * 4:5 so `object-cover` has nothing left to trim. */
  modelImage: string;
  /** Product-only studio shot, cross-faded in on hover. Each file is
   * pre-framed onto the same 4:5 white canvas with the piece centered at a
   * consistent scale, so the row lines up without per-tile crop tweaks. */
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
    name: "The Riviera Bracelet",
    spec: "18k White Gold",
    modelImage: "/new-arrival/riviera-bracelet-model.webp",
    image: "/new-arrival/riviera-bracelet.webp",
  },
  {
    name: "The Tennis Necklace",
    spec: "18k White Gold",
    modelImage: "/new-arrival/tennis-necklace-model.webp",
    image: "/new-arrival/tennis-necklace.webp",
  },
  {
    name: "Classic Hoops",
    spec: "14k White Gold",
    modelImage: "/new-arrival/classic-hoops-model.webp",
    image: "/new-arrival/classic-hoops.webp",
  },
  {
    name: "The Eternity Band",
    spec: "Platinum",
    modelImage: "/new-arrival/eternity-band-model.webp",
    image: "/new-arrival/eternity-band.webp",
  },
  {
    name: "The Half-Eternity Band",
    spec: "18k White Gold",
    modelImage: "/new-arrival/half-eternity-band-model.webp",
    image: "/new-arrival/half-eternity-band.webp",
  },
  {
    name: "The Rainbow Tennis Set",
    spec: "18k Yellow Gold",
    modelImage: "/new-arrival/rainbow-tennis-set-model.webp",
    image: "/new-arrival/rainbow-tennis-set.webp",
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
      className="relative bg-background px-6 py-3 sm:px-12 sm:py-4 lg:px-20"
    >
      <div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              New Arrival
            </h2>
            <p className="mt-3 max-w-md text-sm text-foreground/60">
              Freshly cut, freshly set - the pieces that just landed in the
              case.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All New
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {PIECES.map((piece) => (
            <Link
              key={piece.name}
              href="/categories"
              data-card
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image
                  src={piece.modelImage}
                  alt={`${piece.name}, ${piece.spec}, worn`}
                  fill
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 31vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <Image
                  src={piece.image}
                  alt={`${piece.name}, ${piece.spec}`}
                  fill
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 31vw, 46vw"
                  className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground sm:text-lg">
                {piece.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <PillButton href="/categories" variant="outline" icon="arrow">
            View All New
          </PillButton>
        </div>
      </div>
    </section>
  );
}
