"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CATEGORIES, CategoryCard } from "@/components/categories/CategoriesGrid";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PREVIEW_CATEGORIES = CATEGORIES.slice(0, 4);

/**
 * Homepage teaser for the full /categories page - same kicker/heading/
 * "view all" header New Arrivals uses, four cards (evenly divides both
 * the 2- and 4-column grid steps, so there's never an orphaned row), then
 * a link out to the full catalog.
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
      className="relative bg-surface px-6 py-16 sm:px-12 sm:py-[5.6rem] lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
              Shop By Category
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-4xl">
              Find Your Perfect Piece
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {PREVIEW_CATEGORIES.map((category, i) => (
            <CategoryCard key={category.name} category={category} index={i} />
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
