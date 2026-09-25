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
 * It also deliberately runs to the viewport's right edge — left gutter only, no
 * right one — so the next tile is always visibly cut off. That clipped tile is
 * the affordance; an arrow alone does not tell the eye there is more to see.
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
         afford. */
      className="relative bg-background py-3 sm:py-4 [--cat-tile:42vw] sm:[--cat-tile:26vw] lg:[--cat-tile:max(11rem,15.5vw)]"
    >
      <div className="px-6 sm:px-12 lg:px-20">
        <h2
          id="shop-by-category-heading"
          className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground sm:text-4xl"
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
          /* Lenis swallows any gesture it reads as horizontal and scrolls the
             page with it instead, which would leave this row unable to move
             under a trackpad swipe. The attribute makes it pass horizontal
             gestures through to the browser here only; vertical ones are not
             consulted against it, so page scrolling over the row is unchanged.
             Touch devices run ScrollTrigger.normalizeScroll rather than Lenis
             and need the matching allowNestedScroll flag — see
             SmoothScroll.tsx. */
          data-lenis-prevent-horizontal
          /* Scrollbar hidden rather than styled: this is a six-across row of
             photographs with an arrow control, and a permanent grey trough
             under it reads as a browser artifact.

             pb-12 is load-bearing, not spacing. Overflow clips at the padding
             edge, so the 48px the reveal above translates each tile down has to
             exist inside this box or the captions animate in cut off.

             Left gutter only, matching the heading; the trailing spacer at the
             end of the row supplies the right one so the last tile does not end
             up flush against the viewport edge. */
          className="flex snap-x gap-4 overflow-x-auto overflow-y-hidden pb-12 pl-6 scroll-pl-6 [scrollbar-width:none] sm:gap-5 sm:pl-12 sm:scroll-pl-12 lg:pl-20 lg:scroll-pl-20 [&::-webkit-scrollbar]:hidden"
        >
          {SHOP_CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href="/categories"
              className="group block w-[var(--cat-tile)] shrink-0 snap-start"
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
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 26vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground sm:text-lg">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}

          {/* The right gutter, as a flex child. As padding-right it would be
              ignored: browsers do not include the end padding of a horizontal
              flex scroll container in its scrollable area, so the last tile
              would sit hard against the viewport edge at full scroll. */}
          <div aria-hidden className="w-6 shrink-0 sm:w-12 lg:w-20" />
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
 * Hidden below `sm`, where the row is swiped instead. A 40px control over a
 * 42vw tile would cover most of the photograph it sits on, and the clipped
 * tile at the edge already advertises that the row scrolls.
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
      className={`absolute top-[calc(var(--cat-tile)/2)] hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-950 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.45)] transition-[opacity,background-color] duration-300 hover:bg-ice-100 sm:grid ${
        isBack ? "left-4 lg:left-6" : "right-4 lg:right-6"
      } ${enabled ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
