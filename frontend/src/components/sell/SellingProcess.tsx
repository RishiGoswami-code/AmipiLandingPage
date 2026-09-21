"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = {
  step: string;
  title: string;
  body: string;
};

const SELLING_STEPS: Step[] = [
  {
    step: "01",
    title: "Get Your Price",
    body: "Shop around - we will quote a fair, final number on your diamond or jewelry piece.",
  },
  {
    step: "02",
    title: "Send The Details",
    body: "Confirm your price with item details and photos. No obligation to sell.",
  },
  {
    step: "03",
    title: "Ship & Get Paid",
    body: "Prepaid, insured shipping. Funds out within one business day of receipt.",
  },
];

/**
 * Sell Your Diamonds — three-step process, laid out like a timeline (a
 * connecting line behind the numbers on desktop) rather than plain cards,
 * since this is meant to read as a sequence, not a set of equal options.
 */
export function SellingProcess() {
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
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
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
            Sell Your Diamonds
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-4xl md:text-5xl">
            Three Steps. <span className="text-gold-500">One Business Day.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
            We buy loose diamonds and fine jewelry direct - no consignment,
            no waiting on a buyer to show up.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {/* Connecting line - desktop only, sits behind the step numbers */}
          <div
            aria-hidden
            className="absolute top-6 right-[16.5%] left-[16.5%] hidden h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent sm:block"
          />

          {SELLING_STEPS.map((s) => (
            <div key={s.step} data-card className="relative text-center">
              <span className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold-500/50 bg-background font-display text-sm font-bold text-gold-500">
                {s.step}
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-foreground sm:text-xl">
                {s.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-foreground/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <PillButton href="/contact" variant="solid" icon="arrow">
            Get Your Price
          </PillButton>
        </div>
      </div>
    </section>
  );
}
