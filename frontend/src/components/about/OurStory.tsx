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

/** Champagne-to-antique ramp for the gold serif type - the brand's bright
 * yellow reads as neon against espresso, the same hue muted reads as metal. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ead3a0_0%,#d4ae6a_45%,#b08744_100%)] bg-clip-text text-transparent";

/**
 * About / Our Story - a dark espresso hero: editorial serif headline and the
 * founding story on the left, an "Est. 1976" marker on the right, then three
 * plain facts along the bottom rather than invented performance numbers
 * (units sold, clients served, etc.) that nothing in this codebase
 * substantiates. The navbar paints light on this route to sit on it (see
 * Navbar's `onDark`).
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
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#0f0c0a] px-edge pt-[clamp(5rem,11vh,7rem)] pb-4 text-ice-100"
    >
      {/* Warm glow, strongest right of centre, fading to espresso at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 68% 32%, rgba(120,84,40,0.45), transparent 70%), radial-gradient(ellipse 40% 45% at 20% 55%, rgba(80,56,28,0.25), transparent 70%)",
        }}
      />
      {/* Hairline under the navbar */}
      <div aria-hidden className="absolute inset-x-0 top-16 h-px bg-white/10 sm:top-20" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <p
              data-reveal
              className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#d4ae6a] uppercase"
            >
              Our Story
              <span className="h-px w-24 bg-[#d4ae6a]/50 sm:w-36" />
            </p>

            <h1
              data-reveal
              className="mt-[clamp(0.75rem,2.5vh,1.5rem)] font-[family-name:var(--font-cormorant)] text-[clamp(2.25rem,min(6.5vw,8.5vh),5.25rem)] leading-[1.02] font-medium tracking-tight uppercase"
            >
              <span className="block text-white">Fifty Years In The</span>
              <span className={`block ${GOLD_TEXT}`}>Diamond District</span>
            </h1>

            <div
              data-reveal
              className="mt-[clamp(1rem,3.5vh,2rem)] max-w-[44rem] space-y-[clamp(0.75rem,2.5vh,1.5rem)] text-[clamp(0.9375rem,2.1vh,1.125rem)] leading-relaxed text-ice-100/80"
            >
              <p>
                AMIPI started in 1976 on New York&rsquo;s 47th Street the way
                most diamond businesses did back then - one dealer, a loupe,
                and a reputation that had to be earned one handshake at a time.
                Fifty years later, that&rsquo;s still the whole business model.
                We just do more of it, for more people, from a storefront a
                block over.
              </p>
              <p>
                What changed is who we sell to. AMIPI grew from a trade-only
                wholesaler working the bourse floor into a hub that serves
                independent retailers and individual buyers side by side -
                without ever adopting the markup games or vague grading
                language that made the old trade-only world hard to trust from
                the outside.
              </p>
            </div>

            <div data-reveal className="mt-[clamp(1.25rem,3.5vh,2rem)]">
              <PillButton href="/categories" variant="jewel" icon="gem">
                Explore AMIPI
              </PillButton>
            </div>
          </div>

          {/* Est. 1976 marker - desktop only, where there's room beside the copy */}
          <div
            data-reveal
            className="hidden items-center gap-6 self-center border-l border-white/15 py-10 pl-8 lg:flex"
          >
            <span className="text-[10px] font-medium tracking-[0.3em] text-ice-100/75 uppercase">
              Est. 1976
            </span>
            <span className="h-px w-14 bg-ice-100/40" />
            <span className="text-xs leading-loose font-medium tracking-[0.4em] text-ice-100/85 uppercase">
              Five
              <br />
              Decades
              <br />
              Of Trust
            </span>
          </div>
        </div>

        {/* Facts row */}
        <div
          data-reveal
          className="mt-[clamp(1.5rem,5vh,4rem)] grid grid-cols-1 divide-y divide-white/10 border-b border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center sm:py-[clamp(0.5rem,1.5vh,1rem)]">
              <p
                className={`font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vh,3rem)] leading-none font-normal tracking-tight [font-variant-numeric:lining-nums] ${GOLD_TEXT}`}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-[11px] font-medium tracking-[0.3em] text-ice-100/80 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
