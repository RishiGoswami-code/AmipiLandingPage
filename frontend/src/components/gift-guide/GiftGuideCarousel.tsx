"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Gem, ArrowRight } from "lucide-react";
import { CTA_CLASSES } from "./GiftGuideButton";
import { INK } from "./GiftGuideTheme";

type GiftGuideCarouselProps = {
  /** Names the controls for screen readers, e.g. "bestsellers" gives
   * "Previous bestsellers" and "Show bestsellers page 2". */
  label: string;
  /** Width of each slide per breakpoint - how many fit, and how much of the
   * next one peeks in. */
  slideClassName: string;
  /** Move on a page every few seconds on its own (see AUTOPLAY_MS). */
  autoplay?: boolean;
  children: ReactNode;
};

/** How long autoplay rests on a page, and how long it waits after the
 * visitor last clicked, swiped or keyed through the carousel. */
const AUTOPLAY_MS = 3000;

/**
 * The carousel the gift guide's Stuller-style sections share (Holiday
 * Bestsellers): a native scroll-snap track, so it swipes on phones, with
 * square outlined arrows either side on desktop, as in Shop by Jewelry
 * Type, and page dots under it. The arrows and dots only
 * drive the track's scroll position.
 *
 * With `autoplay` it also moves on a page every three seconds and wraps
 * back to the start after the last. It holds while a finger is on it, for
 * a moment after the visitor uses its arrows, dots or swipe, and while it
 * is off screen. Resting the pointer over it does not hold it - the row
 * spans the page, so the pointer is often there. For visitors who prefer
 * reduced motion it steps without the sliding animation.
 */
export function GiftGuideCarousel({
  label,
  slideClassName,
  autoplay = false,
  children,
}: GiftGuideCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  /** One slide's width plus the gap - the distance an arrow moves the track. */
  const step = useCallback(() => {
    const track = trackRef.current;
    const slide = track?.firstElementChild as HTMLElement | null;
    if (!track || !slide) return 0;
    return (
      slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0")
    );
  }, []);

  // The dots count the scroll positions the track can stop at, which changes
  // with how many slides fit, so it is measured rather than fixed.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const s = step();
    if (!track || !s) return;
    const last = Math.max(
      0,
      Math.ceil((track.scrollWidth - track.clientWidth) / s - 0.05),
    );
    setPages(last + 1);
    setPage(Math.min(Math.round(track.scrollLeft / s), last));
  }, [step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", measure);
    };
  }, [measure]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!autoplay || !root || !track) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let visible = false;
    let touching = false;
    let lastUsed = 0;
    const used = () => {
      lastUsed = Date.now();
    };
    const touchStart = () => {
      touching = true;
      used();
    };
    const touchEnd = () => {
      touching = false;
      used();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    root.addEventListener("pointerdown", used);
    root.addEventListener("keydown", used);
    root.addEventListener("touchstart", touchStart, { passive: true });
    root.addEventListener("touchend", touchEnd);
    root.addEventListener("touchcancel", touchEnd);

    const timer = window.setInterval(() => {
      if (
        !visible ||
        touching ||
        document.hidden ||
        Date.now() - lastUsed < AUTOPLAY_MS
      )
        return;
      const s = step();
      if (!s) return;
      const last = Math.max(
        0,
        Math.ceil((track.scrollWidth - track.clientWidth) / s - 0.05),
      );
      const current = Math.min(Math.round(track.scrollLeft / s), last);
      const next = current >= last ? 0 : current + 1;
      track.scrollTo({
        left: next * s,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      root.removeEventListener("pointerdown", used);
      root.removeEventListener("keydown", used);
      root.removeEventListener("touchstart", touchStart);
      root.removeEventListener("touchend", touchEnd);
      root.removeEventListener("touchcancel", touchEnd);
    };
  }, [autoplay, step]);

  const scrollToPage = (to: number) => {
    const target = Math.max(0, Math.min(to, pages - 1));
    trackRef.current?.scrollTo({ left: target * step(), behavior: "smooth" });
  };

  const arrow =
    "absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-[2px] border border-[#141a17]/25 bg-white text-[#141a17] transition-[opacity,background-color,color,border-color] hover:border-(--gift-green) hover:bg-(--gift-green) hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-[#141a17]/25 disabled:hover:bg-white disabled:hover:text-[#141a17] lg:grid";

  return (
    <div ref={rootRef} className="text-center">
      <div className="relative lg:px-16">
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => scrollToPage(page - 1)}
          disabled={page === 0}
          className={`${arrow} left-0`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 max-lg:-mx-edge lg:gap-5 max-lg:scroll-px-edge max-lg:px-edge [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {Children.map(children, (child) => (
            <li className={`shrink-0 snap-start ${slideClassName}`}>{child}</li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={() => scrollToPage(page + 1)}
          disabled={page >= pages - 1}
          className={`${arrow} right-0`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {pages > 1 && (
        <div className="mt-1 inline-flex items-center px-1">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${label} page ${i + 1}`}
              aria-current={i === page}
              onClick={() => scrollToPage(i)}
              // A 24px tap target around the 8px dot it draws
              className={`grid h-6 w-6 cursor-pointer place-items-center before:h-2 before:w-2 before:rounded-full before:border before:border-[#141a17]/50 before:transition-colors before:content-[''] ${
                i === page ? "before:bg-[#141a17]" : "before:bg-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Slide widths for a row of product tiles: about 1.6 on phones and 3.3 on
 * tablets, the part tile at the end saying "there's more"; exactly five on
 * desktop, as in the mockups, where the arrows say it. */
export const PRODUCT_SLIDE =
  "w-[calc((100%-1rem)/1.6)] sm:w-[calc((100%-2rem)/3.3)] lg:w-[calc((100%-5rem)/5)]";

/**
 * A product tile, after the mockups: flat, with no card - a square photo on
 * a faint warm-grey tile (multiplied, so a product shot's white ground
 * takes the tile's tone) and the name under it in ink, centred. With no
 * `src` it shows a placeholder until the product photo is in. `shop` adds
 * the page's squared red call to action under the name (the whole tile
 * stays the link, so the button is drawn, not nested).
 */
export function ProductCard({
  title,
  src,
  href,
  shop = false,
  contain = false,
}: {
  title: string;
  src?: string;
  href: string;
  shop?: boolean;
  /** A cut-out on a transparent ground: shown whole, inset on the white,
   * instead of cropped to fill the square. */
  contain?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col items-center"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6f4f1]">
        {src ? (
          <Image
            quality={90}
            src={src}
            alt=""
            fill
            // The tile's real width: a fifth of the row from 1024px, about a
            // third on tablets and 1/1.6 on phones - so wide and retina
            // screens get a file big enough to stay sharp
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 62vw"
            className={`mix-blend-multiply ${contain ? "object-contain p-[7%]" : "object-cover"}`}
          />
        ) : (
          <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#141414]/15 bg-[#f3efe7] text-[#8a6630]">
            <Gem className="h-7 w-7" strokeWidth={1.25} />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
              Photo coming soon
            </span>
          </div>
        )}
      </div>
      <p
        className={`px-2 pt-4 text-center text-[0.9375rem] leading-snug font-semibold ${shop ? "pb-3" : "pb-2"}`}
        style={{ color: INK }}
      >
        {title}
      </p>
      {shop && (
        <span className={`mt-auto h-9 px-5 text-[10px] group-hover:bg-(--gift-cta-hover) ${CTA_CLASSES}`}>
          Shop
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </Link>
  );
}
