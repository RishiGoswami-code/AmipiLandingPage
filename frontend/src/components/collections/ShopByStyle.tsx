"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Style = {
  tag: string;
  description: string;
  image: string;
};

const STYLES: Style[] = [
  {
    tag: "Bezel",
    description: "Smooth, Rim-Set Stones",
    // Source photo: Necklace.png - a clean, continuous line of stones with
    // no visible prongs, closest to a bezel-set look of the four shots.
    image: "/shop-by-style/bezel.png",
  },
  {
    tag: "Color",
    description: "Colored Gemstones",
    // Source photo: "Necklace + Bracelet.png" - an unambiguous match, the
    // only shot with colored stones.
    image: "/shop-by-style/color.png",
  },
  {
    tag: "Stack",
    description: "Stackable Bands",
    // Source photo: Ring.png - a single eternity band, the archetypal
    // stack-with-others piece.
    image: "/shop-by-style/stack.png",
  },
  {
    tag: "Fancy",
    description: "Fancy-Cut Diamonds",
    // Source photo: Bracelet.png - oval-cut stones, a fancy shape rather
    // than round brilliant.
    image: "/shop-by-style/fancy.png",
  },
];

/**
 * Shop-by-style quick nav - four square tiles (Bezel, Color, Stack, Fancy)
 * sitting between the collections hero and the full editorial showcase
 * below it. Same card language as CategoryCard (scrim, bottom-anchored
 * label, hover zoom) but square and tag-first rather than photo-first, so
 * it reads as a fast filter row rather than another full collection card.
 */
export function ShopByStyle() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tiles =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-style-tile]");
      if (!tiles || !tiles.length) return;

      gsap.from(tiles, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background px-6 py-[3.2rem] sm:px-12 sm:py-16 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
          Shop By Style
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STYLES.map((style) => (
            <article
              key={style.tag}
              data-style-tile
              className="group relative aspect-square overflow-hidden rounded-2xl border border-ice-100/8 bg-navy-900 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_20px_40px_-12px_rgba(254,215,0,0.18)]"
            >
              <Image
                src={style.image}
                alt={`${style.tag} jewelry`}
                fill
                sizes="(min-width: 1024px) 23vw, 46vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:p-5">
                <h3 className="font-display text-lg font-extrabold tracking-[0.04em] text-ice-100 uppercase sm:text-xl">
                  {style.tag}
                </h3>
                <p className="mt-1 text-[10px] tracking-[0.18em] text-gold-500 uppercase sm:text-[11px]">
                  {style.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
