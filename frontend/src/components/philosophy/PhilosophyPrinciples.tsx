"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Principle = {
  title: string;
  body: string;
};

const PHILOSOPHY: Principle[] = [
  {
    title: "It Is The Amipi Way",
    body: "Excellence in every interaction, from the first call to the final shipment.",
  },
  {
    title: "We Say It Like It Is",
    body: "Accurate grading and honest descriptions. What you see is exactly what you get.",
  },
  {
    title: "Transparent Fixed Pricing",
    body: "One fair, clearly marked price on every piece. No haggling, no back-room negotiating.",
  },
  {
    title: "Clear Terms & Conditions",
    body: "Every policy explained in plain language before you buy - never buried in fine print.",
  },
  {
    title: "We Know How To Say Sorry",
    body: "Mistakes happen. We own them, fix them fast, and make it right.",
  },
  {
    title: "No Bull",
    body: "We simply refuse to do business the dishonest way. Full stop.",
  },
];

/**
 * Our Philosophy — six principles as numbered cards. Same one-shot
 * scroll-stagger reveal as the rest of the site's grids; the intro block
 * folds a kicker + heading directly into this section now that the shared
 * PageHero banner has been retired, rather than pulling in a separate
 * component for six words of framing.
 */
export function PhilosophyPrinciples() {
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
      className="relative bg-background px-6 pt-12 pb-12 sm:px-12 sm:pt-16 sm:pb-16 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Our Philosophy
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-4xl md:text-5xl">
            Experience The <span className="text-gold-500">No Bull</span> Philosophy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
            Six rules we hold ourselves to on every single order - not a
            marketing line, the actual operating manual.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PHILOSOPHY.map((principle, i) => (
            <article
              key={principle.title}
              data-card
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_20px_40px_-12px_rgba(254,215,0,0.18)] sm:p-8"
            >
              <span className="font-mono text-sm tracking-widest text-gold-500/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground sm:text-xl">
                {principle.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
