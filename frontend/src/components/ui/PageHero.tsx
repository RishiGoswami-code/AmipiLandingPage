"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type PageHeroProps = {
  breadcrumb: string;
  kicker: string;
  title: ReactNode;
  description: string;
};

/**
 * Shared interior-page banner for routes off the single-page home scroll
 * (Categories, Collections, ...). Centered kicker/heading/description over
 * the same navy-950 canvas New Arrivals uses, with a faint gold aurora
 * behind it standing in for a hero photograph these pages don't have.
 *
 * Plays a one-shot fade-rise on mount (there's nothing to scroll past
 * above it) rather than a ScrollTrigger reveal.
 */
export function PageHero({ breadcrumb, kicker, title, description }: PageHeroProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!targets || !targets.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-navy-950 px-6 pt-36 pb-20 text-center sm:px-12 sm:pt-44 sm:pb-28 lg:px-20"
    >
      {/* Aurora glow standing in for a hero photo on these text-first pages */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(254,215,0,0.35) 0%, rgba(254,215,0,0.08) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <div
          data-reveal
          className="flex items-center justify-center gap-2 text-[11px] tracking-[0.3em] text-ice-100/40 uppercase"
        >
          <Link href="/" className="transition-colors hover:text-gold-500">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ice-100/70">{breadcrumb}</span>
        </div>

        <p
          data-reveal
          className="mt-8 text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs"
        >
          {kicker}
        </p>

        <h1
          data-reveal
          className="mt-4 font-display text-4xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-5xl md:text-6xl"
        >
          {title}
        </h1>

        <p
          data-reveal
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ice-100/60 sm:text-base"
        >
          {description}
        </p>
      </div>
    </section>
  );
}
