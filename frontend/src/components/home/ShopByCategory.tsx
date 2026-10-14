"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ShopCategory = {
  name: string;
  /** The small letterspaced line under the name. */
  tagline: string;
  image: string;
  /** Written out per tile rather than derived from the name: these are
   * near-identical cream-and-white-gold studio shots, so "Earrings" alone
   * would leave a screen reader unable to tell any of them apart. */
  alt: string;
  /** CSS object-position for the 4:3 crop. The photos are portrait (roughly
   * 4:5, bangles 2:3), so this picks which band of the height the card keeps -
   * set per photo so the piece stays in frame. */
  position: string;
};

/**
 * Eight categories, in the order of the approved design: necklaces,
 * bracelets, studs, bands across the top; earrings, pendants, bangles, rings
 * below.
 *
 * Photography is the October `categoryImages` set, converted to WebP and
 * filed under /public/categories. Every card links to /categories - there are
 * no per-category routes yet, so a slug in this table would be a promise the
 * router cannot keep. When they exist, this is the one place to add them.
 */
const SHOP_CATEGORIES: ShopCategory[] = [
  {
    name: "Necklaces",
    tagline: "Elegance around you",
    image: "/categories/necklaces.webp",
    alt: "White gold diamond tennis necklace worn with an open-collared linen shirt",
    position: "50% 30%",
  },
  {
    name: "Bracelets",
    tagline: "Grace in every detail",
    image: "/categories/bracelets.webp",
    alt: "A hand holding a bundle of white and yellow gold diamond tennis bracelets",
    position: "50% 70%",
  },
  {
    name: "Studs & Jackets",
    tagline: "Everyday elegance",
    image: "/categories/studs-jackets.webp",
    alt: "Round brilliant diamond stud earring in white gold, worn",
    position: "50% 45%",
  },
  {
    name: "Anniversary Bands & Eternity",
    tagline: "Celebrate forever",
    image: "/categories/anniversary-bands.webp",
    alt: "Yellow and white gold diamond eternity bands worn on a hand holding a glass",
    position: "50% 65%",
  },
  {
    name: "Earrings",
    tagline: "For every occasion",
    image: "/categories/earrings.webp",
    alt: "Pair of white gold diamond inside-out hoop earrings held between fingertips",
    position: "50% 50%",
  },
  {
    name: "Pendants",
    tagline: "Meaning in every piece",
    image: "/categories/pendants.webp",
    alt: "White gold diamond cross pendant on a fine chain, worn",
    position: "50% 45%",
  },
  {
    name: "Bangles",
    tagline: "Timeless sophistication",
    image: "/categories/bangles.webp",
    alt: "Yellow and white gold diamond flexi bangles worn on crossed wrists",
    position: "50% 45%",
  },
  {
    name: "Rings",
    tagline: "Symbols of your story",
    image: "/categories/rings.webp",
    alt: "Round and emerald-cut bezel-set diamond rings in white gold, worn on one hand",
    position: "50% 40%",
  },
];

const SERIF = "font-[family-name:var(--font-cormorant)]";

/**
 * Shop Jewelry by Category - a centred heading block ("Explore by style",
 * the title and a one-line subtitle) over a four-by-two grid of cards on warm
 * cream. Each card is a landscape photograph with the category name, a short
 * letterspaced tagline and a round arrow button beneath it; the whole card is
 * one link. Two columns on tablets, one on phones.
 */
export function ShopByCategory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards?.length) return;

      /* The same one-shot rise-and-fade New Arrivals and Collections use, so
         consecutive sections reveal identically. */
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
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
      aria-labelledby="shop-by-category-heading"
      className="relative bg-[#faf6ef] px-6 py-16 sm:px-12 sm:py-20 lg:px-14"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="text-center">
          <p className="flex items-center justify-center gap-4 text-[12px] tracking-[0.45em] text-[#8a6a35] uppercase sm:text-[13px]">
            <span aria-hidden className="h-px w-8 bg-[#a47a35]/60 sm:w-10" />
            Explore by style
            <span aria-hidden className="h-px w-8 bg-[#a47a35]/60 sm:w-10" />
          </p>
          <h2
            id="shop-by-category-heading"
            className={`${SERIF} mt-4 text-4xl font-normal tracking-tight text-navy-900 sm:text-5xl lg:text-6xl`}
          >
            Shop Jewelry by Category
          </h2>
          <p className={`${SERIF} mx-auto mt-3 max-w-2xl text-lg text-foreground/70 sm:text-xl`}>
            From everyday essentials to timeless treasures, explore pieces for every occasion.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {SHOP_CATEGORIES.map((category) => (
            <li key={category.name} data-card>
              <Link
                href="/categories"
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-[#a47a35]/15 bg-[#fdfbf7] shadow-[0_14px_34px_-26px_rgba(60,40,10,0.45)] transition-shadow duration-300 hover:shadow-[0_22px_44px_-24px_rgba(60,40,10,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                    style={{ objectPosition: category.position }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 items-center gap-2.5 px-5 py-5 lg:px-4">
                  <div className="min-w-0 flex-1">
                    <h3 className={`${SERIF} text-[1.375rem] leading-tight tracking-[-0.01em] text-navy-900`}>
                      {category.name}
                    </h3>
                    <p className="mt-2 text-[10.5px] tracking-[0.28em] text-foreground/55 uppercase">
                      {category.tagline}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#a47a35]/35 text-[#8a6a35] transition-colors duration-300 group-hover:border-[#a47a35] group-hover:bg-[#a47a35] group-hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
