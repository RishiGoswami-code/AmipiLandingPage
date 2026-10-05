"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";
import { italiana } from "@/styles/fonts";

gsap.registerPlugin(useGSAP);

/** Antique-gold ramp - a deeper cut of the champagne used on OurStory, since
 * the light champagne washes out on the paper background. The only colour on
 * an otherwise monochrome page: rules, index numbers, the title accent. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#c9a25e_0%,#a8803f_45%,#7d5c2a_100%)] bg-clip-text text-transparent";

/** Komal's themed edits from the ideas sheet, listed like a catalog's contents. */
const EDITS = [
  { title: "The Holiday Gift Edit", pieces: "Diamond Earrings · Tennis Bracelets" },
  { title: "Holiday Party", pieces: "Statement Earrings · Cocktail Rings" },
  { title: "New Year's Eve Sparkle", pieces: "Tennis Necklaces · Drop Earrings" },
  { title: "Meaningful Gifts", pieces: "Birthstone Pendants · Custom Pieces" },
  { title: "Last-Minute Gifts", pieces: "Diamond Studs · Hoops" },
];

/** The four tiles on the "Collection" spread. */
const SPREAD = [
  { src: "/categories/diamond-studs.webp", alt: "Diamond stud earrings in a gift box", label: "Studs" },
  { src: "/categories/tennis-bracelets.webp", alt: "Diamond tennis bracelet on marble", label: "Tennis" },
  { src: "/nav-jewelry/halo-ring.webp", alt: "Halo diamond ring", label: "Halo" },
  { src: "/Collections/Stack.png", alt: "Stacked diamond eternity bands", label: "Stack" },
];

/**
 * Holiday Gift Guide hero - trial design modelled on landingPageTheme.jpeg, a
 * black-and-white printed catalog, set on a warm paper-white ground.
 * Photography is desaturated to match it and regains its colour on hover;
 * antique gold is kept for accents only.
 *
 * Standalone: the root layout hides the navbar, footer, marquee and assistant
 * on /gift-guide, so the AMIPI wordmark top-left is the only way back home.
 */
export function GiftGuideHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const reveal = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (reveal?.length) {
        gsap.from(reveal, { opacity: 0, y: 28, duration: 0.9, ease: "power3.out", stagger: 0.08 });
      }
      // The catalog pages drop in one after the other. Their tilt is the CSS
      // `rotate` property, which GSAP's transform tween leaves alone.
      gsap.from("[data-page]", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-surface px-edge pt-6 pb-8 text-[#141414]"
    >
      {/* Soft paper glow behind the catalog, with a faint warm wash bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 72% 40%, rgba(255,255,255,0.9), transparent 70%), radial-gradient(ellipse 35% 40% at 15% 80%, rgba(168,128,63,0.08), transparent 70%)",
        }}
      />

      {/* Masthead strip */}
      <header
        data-reveal
        className="relative flex items-center justify-between border-b border-[#141414]/15 pb-4 text-[11px] tracking-[0.35em] text-[#141414]/60 uppercase"
      >
        {/* Same lockup as the Navbar - roundel plus Italiana at 0.06em - since
            this page hides the site chrome and the wordmark is the way home. */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <Image src="/icon.png" alt="" aria-hidden width={512} height={512} className="h-8 w-8 sm:h-9 sm:w-9" />
          <span
            className={`${italiana.className} text-xl tracking-[0.06em] text-[#141414] uppercase transition-colors hover:text-[#a8803f] sm:text-2xl`}
          >
            Amipi
          </span>
        </Link>
        <span className="hidden sm:block">Holiday 2026 · Winter Edition</span>
        <span>Vol. 01</span>
      </header>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 py-[clamp(1.5rem,4vh,2.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* Copy */}
        <div className="max-w-xl">
          <p data-reveal className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#8a6630] uppercase">
            The Gift Guide
            <span className="h-px w-20 bg-[#8a6630]/50 sm:w-32" />
          </p>

          <h1
            data-reveal
            className="mt-5 font-[family-name:var(--font-bodoni)] text-[clamp(3rem,min(7.5vw,11vh),6.5rem)] leading-[0.95] font-normal uppercase"
          >
            Holiday
            <span className={`block italic normal-case tracking-normal ${GOLD_TEXT}`}>
              Catalog
            </span>
          </h1>

          <div data-reveal className="mt-6 flex items-center gap-4">
            <span className="h-px w-12 bg-[#141414]/30" />
            <span className="text-[11px] tracking-[0.35em] text-[#141414]/60 uppercase">
              Christmas · New Year · Winter
            </span>
          </div>

          <p data-reveal className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[#141414]/70">
            One page, every gift your customers will ask for this season - the
            essentials that sell themselves, the trends worth stocking, and the
            new collections ready for the holiday counter.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-6">
            <PillButton href="/categories" variant="gold" icon="gem">
              Explore The Guide
            </PillButton>
            <Link
              href="/categories"
              className="border-b border-[#141414]/30 pb-1 text-xs tracking-[0.3em] text-[#141414]/80 uppercase transition-colors hover:border-[#a8803f] hover:text-[#a8803f]"
            >
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Catalog collage: a cover and an open "Collection" spread. A size
            container so the cover masthead scales with the collage rather than
            the viewport, and 10:9 so the tilted cover stays inside the box
            instead of running into the contents row on short screens. */}
        <div className="@container relative mx-auto aspect-[10/9] w-[calc(100%-1rem)] max-w-[min(38rem,62vh)] sm:w-full">
          {/* Cover */}
          <figure
            data-page
            className="group absolute top-0 left-0 w-[56%] -rotate-3 bg-white p-[4%] shadow-[0_30px_60px_-24px_rgba(20,20,20,0.35)]"
          >
            <p className="text-center font-[family-name:var(--font-bodoni)] text-[5.5cqw] leading-none tracking-[0.12em] whitespace-nowrap text-[#111] uppercase">
              Gift Guide
            </p>
            <div className="mx-auto mt-2 mb-3 h-px w-2/3 bg-[#111]/30" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/new-arrival/tennis-necklace-model.webp"
                alt="Model wearing a diamond tennis necklace"
                fill
                priority
                sizes="(min-width: 1024px) 22rem, 55vw"
                className="object-cover grayscale contrast-125 transition duration-700 group-hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-3 flex justify-between text-[10px] tracking-[0.25em] text-[#111]/60 uppercase">
              <span>The Gift Edit</span>
              <span>AMIPI</span>
            </figcaption>
          </figure>

          {/* Collection spread */}
          <div
            data-page
            className="absolute right-0 bottom-0 w-[60%] rotate-2 bg-[#ebe7df] p-[4%] shadow-[0_30px_60px_-24px_rgba(20,20,20,0.35)]"
          >
            <p className="font-[family-name:var(--font-bodoni)] text-[clamp(1rem,2.2vw,1.6rem)] tracking-[0.18em] text-[#111] uppercase">
              Collection
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SPREAD.map((item) => (
                <div key={item.label} className="group relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 11rem, 28vw"
                    className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-white/85 px-1.5 py-0.5 text-[9px] tracking-[0.2em] text-[#111] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contents: the themed edits */}
      <ol
        data-reveal
        aria-label="Gift guide edits"
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 border-t border-[#141414]/15 sm:grid-cols-2 lg:grid-cols-5"
      >
        {EDITS.map((edit, i) => (
          <li key={edit.title} className="border-[#141414]/10 py-4 sm:pr-6 lg:border-l lg:px-4 lg:first:border-l-0 lg:first:pl-0">
            <p className={`font-[family-name:var(--font-bodoni)] text-lg leading-none [font-variant-numeric:lining-nums] ${GOLD_TEXT}`}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-xs font-medium tracking-[0.14em] text-[#141414] uppercase">{edit.title}</p>
            <p className="mt-1 text-xs text-[#141414]/65">{edit.pieces}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
