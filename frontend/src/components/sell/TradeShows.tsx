"use client";

import { useRef } from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TradeShow = {
  name: string;
  dates: string;
  location: string;
  /** Editorial jewelry photography rather than literal booth/expo-hall
   * shots - matches the polished, magazine-style card language the rest
   * of the site uses for photo-overlay cards. */
  image: string;
};

const TRADE_SHOWS: TradeShow[] = [
  {
    name: "RJO Liberty Tour",
    dates: "Sept 29 - Oct 2, 2026",
    location: "42 W 48th St, 15th Floor, New York, NY",
    image: "/hero/rooftop-wide.jpg",
  },
  {
    name: "JIS Miami",
    dates: "Oct 16 - 19, 2026",
    location: "Booth #1335, Miami Beach Convention Center",
    image:
      "https://images.unsplash.com/photo-1621782049672-e426106946ca?auto=format&fit=crop&w=900&h=1100&q=80",
  },
];

/**
 * Where to find AMIPI in person, for sellers who'd rather hand off a piece
 * face to face than ship it. Sits right under the sell process since
 * "meet us at a show" is really just another way to complete step two.
 * Full-bleed photo cards (serif name, white pill CTA) rather than plain
 * bordered text cards - the same photo-overlay language used elsewhere,
 * scaled up to carry the section on its own.
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
        y: 40,
        scale: 0.97,
        duration: 0.9,
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
      className="relative bg-surface px-6 py-12 sm:px-12 sm:py-16 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Meet Us In Person
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground sm:text-4xl">
            Upcoming Trade Shows
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TRADE_SHOWS.map((show) => (
            <article
              key={show.name}
              data-card
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4]"
            >
              <Image
                src={show.image}
                alt={show.name}
                fill
                sizes="(min-width: 640px) 46vw, 92vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-ice-100 sm:text-3xl">
                  {show.name}
                </h3>
                <p className="mt-3 flex items-center gap-2.5 text-sm text-ice-100/80">
                  <Calendar className="h-4 w-4 shrink-0 text-gold-500" />
                  {show.dates}
                </p>
                <p className="mt-2 flex items-start gap-2.5 text-sm text-ice-100/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  {show.location}
                </p>
                <div className="mt-5">
                  <PillButton href="/contact" variant="light" size="sm">
                    Schedule Appointment
                  </PillButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
