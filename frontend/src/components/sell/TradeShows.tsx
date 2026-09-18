"use client";

import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TradeShow = {
  name: string;
  dates: string;
  location: string;
};

const TRADE_SHOWS: TradeShow[] = [
  {
    name: "RJO Liberty Tour",
    dates: "Sept 29 - Oct 2, 2026",
    location: "42 W 48th St, 15th Floor, New York, NY",
  },
  {
    name: "JIS Miami",
    dates: "Oct 16 - 19, 2026",
    location: "Booth #1335, Miami Beach Convention Center",
  },
];

/**
 * Where to find AMIPI in person, for sellers who'd rather hand off a piece
 * face to face than ship it. Sits right under the sell process since
 * "meet us at a show" is really just another way to complete step two.
 */
export function TradeShows() {
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
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface px-6 py-16 sm:px-12 sm:py-[4.8rem] lg:px-20"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Meet Us In Person
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-3xl">
            Upcoming Trade Shows
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TRADE_SHOWS.map((show) => (
            <div
              key={show.name}
              data-card
              className="rounded-2xl border border-border bg-background p-6 transition-colors duration-300 hover:border-gold-500/40 sm:p-8"
            >
              <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                {show.name}
              </h3>
              <p className="mt-4 flex items-center gap-2.5 text-sm text-foreground/70">
                <Calendar className="h-4 w-4 shrink-0 text-gold-500" />
                {show.dates}
              </p>
              <p className="mt-2 flex items-start gap-2.5 text-sm text-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {show.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
