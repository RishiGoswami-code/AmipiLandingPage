"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ShopCategory = {
  name: string;
  image: string;
  /** Written out per tile rather than derived from the name: these are seven
   * near-identical cream-and-white-gold studio shots, so "Hoop Earrings" alone
   * would leave a screen reader unable to tell any of them apart. */
  alt: string;
};

/**
 * Seven categories, in browse order: bridal first, then the two earring
 * shapes, then neck and wrist.
 *
 * Photography is the `categoryImages` set, converted to WebP and filed under
 * /public/categories (1200px, ~120KB each, down from ~2MB PNGs). Every tile
 * links to /categories — there are no per-category routes yet, so a slug in
 * this table would be a promise the router cannot keep. When they exist, this
 * is the one place to add them.
 */
const SHOP_CATEGORIES: ShopCategory[] = [
  {
    name: "Engagement Rings",
    image: "/categories/engagement-rings.webp",
    alt: "Round brilliant halo engagement ring in white gold, set in an ivory ring box",
  },
  {
    name: "Wedding Bands",
    image: "/categories/wedding-bands.webp",
    alt: "White gold half-eternity diamond wedding band in an ivory ring box",
  },
  {
    name: "Diamond Studs",
    image: "/categories/diamond-studs.webp",
    alt: "Pair of round brilliant diamond stud earrings in white gold",
  },
  {
    name: "Hoop Earrings",
    image: "/categories/hoop-earrings.webp",
    alt: "Oval diamond inside-out hoop earrings in white gold, on a stone ledge",
  },
  {
    name: "Tennis Necklaces",
    image: "/categories/tennis-necklaces.webp",
    alt: "White gold diamond tennis necklace laid in an ivory presentation box",
  },
  {
    name: "Tennis Bracelets",
    image: "/categories/tennis-bracelets.webp",
    alt: "White gold diamond tennis bracelet on a marble surface",
  },
  {
    name: "Bangles",
    image: "/categories/bangles.webp",
    alt: "Flexible white gold diamond bangle resting on travertine",
  },
];

/**
 * Shop Jewelry by Category — a single horizontal row of square tiles with the
 * category name beneath each, scrolled by arrow or swipe rather than wrapped
 * into a grid.
 *
 * The row is a native scroll container, not a JS-driven track: the browser
 * already does momentum, snapping, keyboard and touch correctly, and the arrows
 * are a thin `scrollBy` wrapper on top of it. So it works before hydration and
 * with JS off, where a transform-based carousel would show one frozen frame.
 *
 * It also deliberately runs to the viewport's right edge - a left gutter, no
 * right one - so the next tile is always visibly cut off. That clipped tile is
 * the affordance; an arrow alone does not tell the eye there is more to see. The
 * left gutter is a margin, so the scroll box begins on the headline's left edge
 * and tiles leaving the row are clipped there rather than trailing into it.
 *
 * All of that applies at lg and up. Below lg the same tiles lay out as a
 * plain grid instead - see the note on the row itself for why.
 *
 * Replaces the old CategoriesPreview, which showed the same idea further down
 * the page off the /categories data (two of its six tiles were still Unsplash
 * placeholders). The /categories page itself is untouched.
 */
export function ShopByCategory() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  /* Both start false so the server-rendered markup and the first client render
     agree. The arrows are desktop-only chrome on a row that scrolls fine
     without them, so a frame with neither is the correct pre-measurement
     state. */
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollOn, setCanScrollOn] = useState(false);

  const syncArrows = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    /* 1px of slack at both ends: scrollLeft is fractional on fractional-DPR
       displays and at a hard stop it settles at e.g. 0.5 or max - 0.5, which
       would otherwise leave an arrow lit with nowhere to go. */
    const max = row.scrollWidth - row.clientWidth;
    setCanScrollBack(row.scrollLeft > 1);
    setCanScrollOn(row.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    syncArrows();

    /* Resize, not just scroll: the tile width is in vw, so a window resize
       changes how much overflow there is — including to none at all — without
       the row ever being scrolled. */
    const observer = new ResizeObserver(syncArrows);
    observer.observe(row);
    return () => observer.disconnect();
  }, [syncArrows]);

  const step = useCallback((direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;

    /* Measured off the live tile rather than recomputing the vw expression, so
       the arrows stay correct if the widths below are ever retuned. */
    const tile = row.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;
    const distance = (tile?.offsetWidth ?? row.clientWidth * 0.8) + gap;

    row.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const cards =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards || !cards.length) return;

      /* The same one-shot rise-and-fade New Arrivals and Collections use, so
         three consecutive sections reveal identically. Only the tiles that
         start on screen are really animated — the rest are already scrolled
         out of the row's own overflow when it fires, which is fine: this is a
         page-entrance flourish, not a per-tile reveal. */
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
      aria-labelledby="shop-by-category-heading"
      /* One tile width, declared once. The arrows centre themselves on the
         image band with it (`top: calc(var(--cat-tile) / 2)`), which they
         cannot do from the row's own box — that box includes the captions, and
         centring on it would drop both arrows ~20px low.

         15.5vw puts six tiles plus the clipped seventh across a ~1600px
         viewport, which is the reference proportion. The 11rem floor is for the
         bottom of the lg range: at 1024px the bare vw value resolves to 159px,
         which is too narrow for "Engagement Rings" to sit on one line, so the
         caption band goes ragged while every other label stays single-line.
         Below the floor the row simply shows fewer tiles, which a scroller can
         afford.

         Declared at lg only, because that is the only breakpoint that reads
         it: below lg the tiles are grid cells and size themselves.

         Top padding is asymmetric on purpose. New Arrivals above is the same
         bg-background with the same py-3/sm:py-4, so the two sections met with
         24-32px between a row of captions and this headline and no colour
         change to mark the seam - the headline read as a label on the row above
         it. The bottom stays tight because CollectionsPreview below is
         bg-surface and brings its own py-12/sm:py-16, so that seam is already
         both spaced and visible. */
      className="relative bg-background pt-12 pb-3 sm:pt-16 sm:pb-4 lg:pt-20 lg:[--cat-tile:max(11rem,15.5vw)]"
    >
      <div className="px-6 sm:px-12 lg:px-20">
        <h2
          id="shop-by-category-heading"
          className="font-[family-name:var(--font-cormorant)] text-4xl font-normal tracking-tight text-foreground sm:text-5xl"
        >
          Shop Jewelry by Category
        </h2>
        <p className="mt-3 max-w-md text-sm text-foreground/60">
          From bridal to everyday - browse the case by the piece you&rsquo;re
          looking for.
        </p>
      </div>

      <div className="relative mt-12">
        <div
          ref={rowRef}
          onScroll={syncArrows}
          /* Two layouts, one set of markup. Below lg this is an ordinary
             two-then-three column grid, because a horizontal scroller on a phone
             is the wrong control: it competes with the page's own vertical
             scroll, shows an overlay scrollbar mid-swipe, and - through
             ScrollTrigger.normalizeScroll, which owns touch gestures - was
             firing stray taps on the tiles it was being swiped across. At lg and
             up it becomes the scroll-snap row the design asks for, driven by the
             arrows.

             At lg: the left gutter is a *margin*, not padding, and that is the
             difference between a clipped tile and a stray one. Padding is inside
             the scroll box, so content scrolled into it stays painted - a tile
             leaving the row kept going across the full 80px and sat in the
             gutter as a sliver, level with the headline's own left edge but with
             nothing to explain it. As a margin, the scroll box itself starts on
             that line, so an outgoing tile is cut off exactly where the headline
             begins. scroll-pl went with it: snap-start now aligns to the content
             edge, which is already where the gutter ends.

             There is still no right gutter - the row runs to the viewport edge
             so the next tile is always visibly clipped, and that clipped tile is
             the affordance. pb-12 is load-bearing rather than spacing: overflow
             clips at the padding edge, so the 48px the reveal translates each
             tile down has to exist inside this box or the captions animate in
             cut off. The scrollbar is hidden because a permanent grey trough
             under a row of photographs reads as a browser artifact rather than
             as part of the page.

             data-lenis-prevent-horizontal is inert below lg, where nothing
             scrolls horizontally. Above it, it stops Lenis from reading a
             trackpad swipe as page scroll and swallowing it. */
          data-lenis-prevent-horizontal
          className="grid grid-cols-2 gap-x-7 gap-y-10 px-6 sm:grid-cols-3 sm:px-12 lg:ml-20 lg:flex lg:snap-x lg:gap-x-5 lg:gap-y-0 lg:overflow-x-auto lg:overflow-y-hidden lg:px-0 lg:pb-12 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
        >
          {SHOP_CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href="/categories"
              className="group block lg:w-[var(--cat-tile)] lg:shrink-0 lg:snap-start"
            >
              {/* The reveal is animated on this wrapper rather than on the
                  <Link> itself, and that is a correctness fix, not a style
                  choice. The Link is the scroll-snap target, so transforming it
                  moves its snap area; Chrome re-snaps a snap container whenever
                  layout changes under it, so the tween's own motion made the row
                  snap to the nearest point and settle ~4px in — which lit the
                  "previous" arrow on a row that had never been scrolled.
                  Transforming a descendant leaves every snap area where it
                  was. */}
              <div data-card>
                <div className="relative aspect-square overflow-hidden bg-surface">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 31vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground sm:text-lg">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}

          {/* The scroller's right gutter, as a flex child. As padding-right it
              would be ignored: browsers do not include the end padding of a
              horizontal flex scroll container in its scrollable area, so the
              last tile would sit hard against the viewport edge at full
              scroll. Absent below lg, where the grid's own px-6/sm:px-12
              supplies both gutters. */}
          <div aria-hidden className="hidden lg:block lg:w-20 lg:shrink-0" />
        </div>

        <ScrollArrow
          direction="back"
          enabled={canScrollBack}
          onClick={() => step(-1)}
        />
        <ScrollArrow
          direction="on"
          enabled={canScrollOn}
          onClick={() => step(1)}
        />
      </div>
    </section>
  );
}

/**
 * One of the two scroll controls.
 *
 * Kept mounted and disabled at the ends rather than unmounted, so neither arrow
 * can vanish from under a cursor mid-click. `disabled` also takes it out of the
 * tab order, which `opacity-0` alone would not.
 *
 * Hidden below `lg`, where the tiles lay out as a grid and there is nothing
 * to scroll.
 */
function ScrollArrow({
  direction,
  enabled,
  onClick,
}: {
  direction: "back" | "on";
  enabled: boolean;
  onClick: () => void;
}) {
  const isBack = direction === "back";
  const Icon = isBack ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={isBack ? "Previous categories" : "Next categories"}
      className={`absolute top-[calc(var(--cat-tile)/2)] hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-950 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.45)] transition-[opacity,background-color] duration-300 hover:bg-ice-100 lg:grid ${
        isBack ? "left-4 lg:left-6" : "right-4 lg:right-6"
      } ${enabled ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
