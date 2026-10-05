"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AMIPI_WAY } from "@/content/noBull";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERIF = "font-[family-name:var(--font-cormorant)]";

/**
 * Our Philosophy - the No Bull roundel beside "It is the Amipi way.", then the
 * other five values as numbered cards with amipi.com's icons. Same one-shot
 * scroll-stagger reveal as the rest of the site's grids.
 */
export function PhilosophyPrinciples() {
  const sectionRef = useRef<HTMLElement>(null);
  const [intro, ...values] = AMIPI_WAY;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards || !cards.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="px-6 pt-32 pb-20 sm:px-12 sm:pt-36 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Image
            src="/about-us/nobull-circle.png"
            alt="Experience the No Bull Philosophy"
            width={516}
            height={477}
            priority
            className="mx-auto w-56 sm:w-72 lg:w-80"
          />
          <div className="text-center lg:text-left">
            <p className="text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase">
              Our Philosophy
            </p>
            <h1 className={`${SERIF} mt-3 text-4xl tracking-tight text-foreground sm:text-6xl`}>
              {intro.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/70 lg:mx-0">
              {intro.body}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <article
              key={v.icon}
              data-card
              className={`group rounded-2xl border border-border bg-white p-7 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#d4ae5c]/60 ${
                i === values.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden
                  className="h-11 w-14 bg-[length:100%_auto] bg-top bg-no-repeat transition-[background-position] duration-300 group-hover:bg-bottom"
                  style={{ backgroundImage: `url(/about-us/${v.icon}.png)` }}
                />
                <span className="font-mono text-xs tracking-widest text-foreground/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-6 text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
                {v.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
