"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/components/categories/CategoriesGrid";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PREVIEW_CATEGORIES = CATEGORIES.slice(0, 6);

/**
 * Homepage teaser for the full /categories page - rebuilt to match New
 * Arrivals' editorial-catalog treatment (full-bleed, serif heading, plain
 * tiles with the name sitting below the image rather than overlaid on a
 * dark scrim) so the two sit together as one visual system. The full
 * /categories page keeps its own darker CategoryCard styling untouched -
 * this is a homepage-only look.
 */
export function CategoriesPreview() {
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
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground sm:text-4xl">
              Shop By Category
            </h2>
            <p className="mt-3 max-w-md text-sm text-foreground/60">
              Every cut, every setting - browse by what you&rsquo;re looking for.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {PREVIEW_CATEGORIES.map((category) => (
            <Link key={category.name} href="/categories" data-card className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={category.image}
                  alt={`${category.name}, ${category.spec}`}
                  fill
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 31vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground sm:text-lg">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <PillButton href="/categories" variant="outline" icon="arrow">
            View All Categories
          </PillButton>
        </div>
      </div>
    </section>
  );
}
