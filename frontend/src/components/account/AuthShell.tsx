"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Gem, Gift, Heart } from "lucide-react";
import { BRONZE } from "./fields";

/** One slide per member benefit, each with its own photograph. */
const SLIDES = [
  {
    icon: Gem,
    title: "Exclusive Collections",
    text: "Be the first to explore new arrivals.",
    image: "/categories/tennis-bracelets.webp",
    alt: "Diamond tennis bracelet on marble",
  },
  {
    icon: Gift,
    title: "Member-Only Offers",
    text: "Special benefits and early access.",
    image: "/categories/tennis-necklaces.webp",
    alt: "Diamond tennis necklace in an ivory box",
  },
  {
    icon: Heart,
    title: "A Personalized Experience",
    text: "Curated recommendations for you.",
    image: "/categories/diamond-studs.webp",
    alt: "Pair of diamond stud earrings in a ring box",
  },
];

const AUTO_ADVANCE_MS = 5000;

/**
 * Split layout shared by the account pages: an even half-and-half, with a
 * cream panel on the left and the form on the right. The footer and partner
 * strip are dropped on these routes (see layout.tsx) so the form's button
 * stays in view.
 *
 * The panel stacks its heading above a rounded photo card rather than
 * laying text over the photograph, so the two can never collide whatever the
 * window height. The card cycles through three member benefits: when the
 * page passes `activeSlide` (create-account ties it to the form section in
 * view) the panel follows that; otherwise it advances on a timer. The dots
 * under the card jump straight to a slide.
 *
 * On desktop the panel is pinned while the form scrolls. Below lg it
 * collapses to just the heading above the form.
 */
export function AuthShell({
  title,
  subtitle,
  activeSlide,
  centered = false,
  children,
}: {
  title: React.ReactNode;
  subtitle: string;
  /** Slide to show; leave undefined to auto-advance. */
  activeSlide?: number;
  /** Vertically centre a short form beside the panel on desktop. */
  centered?: boolean;
  children: React.ReactNode;
}) {
  const [autoSlide, setAutoSlide] = useState(0);
  // A clicked dot, remembered with the page-driven slide it overrode; it
  // lapses as soon as the page moves on to another slide.
  const [picked, setPicked] = useState<{ slide: number; over?: number } | null>(null);

  const controlled = activeSlide !== undefined;
  useEffect(() => {
    if (controlled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(
      () => setAutoSlide((i) => (i + 1) % SLIDES.length),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(t);
  }, [controlled]);

  const driven = controlled ? activeSlide : autoSlide;
  const current = picked && picked.over === driven ? picked.slide : driven;

  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-2">
      <aside className="flex flex-col bg-[#f7f1e6] px-6 pt-24 pb-8 sm:px-10 lg:sticky lg:top-0 lg:h-svh lg:px-14 lg:pt-28">
        <div className="shrink-0">
          <span className="block h-px w-12" style={{ background: BRONZE }} />
          <h1 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl leading-[1.05] font-normal text-foreground xl:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground/60">
            {subtitle}
          </p>
        </div>

        <div className="mt-6 hidden min-h-0 flex-1 flex-col lg:flex">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl shadow-[0_24px_50px_-28px_rgba(60,40,10,0.55)]">
            {SLIDES.map((slide, i) => (
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="50vw"
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-out ${
                  i === current ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/75 via-navy-950/30 to-transparent" />

            {/* Caption - on the dark fade, never over the bright middle of the photo */}
            <div className="absolute inset-x-0 bottom-0 p-6" aria-live="polite">
              {SLIDES.map(({ icon: Icon, title: t, text }, i) => (
                <div
                  key={t}
                  className={`flex items-center gap-4 transition-[opacity,transform] duration-500 ${
                    i === current
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none absolute inset-x-6 bottom-6 translate-y-2 opacity-0"
                  }`}
                  aria-hidden={i !== current}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/90"
                    style={{ color: BRONZE }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-white">
                      {t}
                    </span>
                    <span className="block text-sm text-white/80">{text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex shrink-0 justify-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setPicked({ slide: i, over: driven })}
                aria-label={`Show ${slide.title}`}
                aria-current={i === current}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-[#d4ae5c]" : "w-3 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>
        </div>
      </aside>

      <main
        className={`px-5 pt-8 pb-10 sm:px-10 lg:pt-24 ${
          centered ? "lg:flex lg:items-center lg:justify-center" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
