"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Category = {
  name: string;
  spec: string;
  /** Unsplash placeholder photo - swap for real category photography
   * whenever it exists, no layout changes needed either way. */
  image: string;
};

const CATEGORIES: Category[] = [
  {
    name: "Rings & Bands",
    spec: "Bridal to Anniversary",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Necklaces & Pendants",
    spec: "Solitaire to Riviera",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Diamond Studs & Hoops",
    spec: "Natural & Lab-Grown",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Tennis Bracelets",
    spec: "18k White & Yellow Gold",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Bridal & Engagement",
    spec: "Solitaire to Halo",
    image:
      "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Men's Jewelry",
    spec: "Signets, Chains & Bands",
    image:
      "https://images.unsplash.com/photo-1613498510372-8901cad084a2?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Loose Diamonds",
    spec: "GIA & IGI Certified",
    image:
      "https://images.unsplash.com/photo-1750767323874-5946ad2c7e91?auto=format&fit=crop&w=900&h=1100&q=80",
  },
  {
    name: "Fine Watches",
    spec: "Swiss & Diamond-Set",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&h=1100&q=80",
  },
];

/**
 * Category grid — eight editorial cards (image, number, name, spec) that
 * rise and fade in on scroll, same one-shot stagger reveal NewArrivals uses
 * on the home page. Each card zooms its photo and slides an arrow chip in
 * on hover, mirroring the New Arrivals piece cards so this page reads as
 * part of the same system rather than a bolted-on template.
 */
export function CategoriesGrid() {
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
      className="relative bg-navy-950 px-6 py-20 sm:px-12 sm:py-28 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {CATEGORIES.map((category, i) => (
          <article
            key={category.name}
            data-card
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-ice-100/8 bg-navy-900 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_20px_40px_-12px_rgba(254,215,0,0.18)]"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />

            <span className="absolute top-3 left-3 font-mono text-[11px] tracking-widest text-ice-100/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-ice-100/20 text-ice-100/70 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:border-gold-500/60 group-hover:text-gold-500 group-hover:opacity-100 sm:translate-x-2">
              <ArrowUpRight className="h-4 w-4" />
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:p-5">
              <p className="text-[10px] tracking-[0.22em] text-gold-500 uppercase sm:text-[11px]">
                {category.spec}
              </p>
              <h3 className="mt-1 font-display text-sm leading-snug font-semibold text-ice-100 sm:text-base">
                {category.name}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
