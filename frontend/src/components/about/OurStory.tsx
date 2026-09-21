"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: "1976", label: "Founded" },
  { value: "50", label: "Years In The Diamond District" },
  { value: "42 W 48th St", label: "New York, NY" },
];

/**
 * About / Our Story — narrative intro, then three plain facts rather than
 * invented performance numbers (units sold, clients served, etc.) that
 * nothing in this codebase substantiates.
 */
export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const targets =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!targets || !targets.length) return;

      gsap.from(targets, {
        opacity: 0,
        y: 32,
        duration: 0.8,
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
      className="relative bg-background px-6 pt-12 pb-12 sm:px-12 sm:pt-16 sm:pb-16 lg:px-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p data-reveal className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
          Our Story
        </p>
        <h1
          data-reveal
          className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-4xl md:text-5xl"
        >
          Fifty Years In The <span className="text-gold-500">Diamond District</span>
        </h1>

        <div data-reveal className="mx-auto mt-8 max-w-2xl space-y-5 text-left text-sm leading-relaxed text-foreground/70 sm:text-base">
          <p>
            AMIPI started in 1976 on New York&rsquo;s 47th Street the way most
            diamond businesses did back then - one dealer, a loupe, and a
            reputation that had to be earned one handshake at a time. Fifty
            years later, that&rsquo;s still the whole business model. We just
            do more of it, for more people, from a storefront a block over.
          </p>
          <p>
            What changed is who we sell to. AMIPI grew from a
            trade-only wholesaler working the bourse floor into a hub that
            serves independent retailers and individual buyers side by side -
            without ever adopting the markup games or vague grading language
            that made the old trade-only world hard to trust from the
            outside.
          </p>
          <p>
            Every principle on our{" "}
            <a
              href="/philosophy"
              className="text-gold-500 underline underline-offset-4 transition-colors hover:text-gold-300"
            >
              philosophy page
            </a>{" "}
            exists because we watched someone break it somewhere else in
            this industry and decided AMIPI wouldn&rsquo;t. Fixed pricing.
            Honest grading. Terms you can actually read. No bull - that was
            true on day one, and it&rsquo;s non-negotiable now.
          </p>
        </div>

        <div data-reveal className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-surface px-6 py-8"
            >
              <p className="font-display text-2xl font-extrabold text-gold-500 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] tracking-[0.18em] text-foreground/60 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-12 flex justify-center">
          <PillButton href="/contact" variant="solid" icon="arrow">
            Come See Us
          </PillButton>
        </div>
      </div>
    </section>
  );
}
