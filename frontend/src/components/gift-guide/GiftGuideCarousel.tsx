"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Gem } from "lucide-react";

type GiftGuideCarouselProps = {
  /** Names the controls for screen readers, e.g. "bestsellers" gives
   * "Previous bestsellers" and "Show bestsellers page 2". */
  label: string;
  /** Width of each slide per breakpoint - how many fit, and how much of the
   * next one peeks in. */
  slideClassName: string;
  children: ReactNode;
};

/**
 * The carousel the gift guide's Stuller-style sections share (Holiday
 * Bestsellers, the Color of the Year collection, Shop Jewelry): a native
 * scroll-snap track, so it swipes on phones, with round white arrows either
 * side on desktop and page dots in a pill under it. The arrows and dots only
 * drive the track's scroll position.
 */
export function GiftGuideCarousel({ label, slideClassName, children }: GiftGuideCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  /** One slide's width plus the gap - the distance an arrow moves the track. */
  const step = useCallback(() => {
    const track = trackRef.current;
    const slide = track?.firstElementChild as HTMLElement | null;
    if (!track || !slide) return 0;
    return slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  // The dots count the scroll positions the track can stop at, which changes
  // with how many slides fit, so it is measured rather than fixed.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const s = step();
    if (!track || !s) return;
    const last = Math.max(0, Math.ceil((track.scrollWidth - track.clientWidth) / s - 0.05));
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

  const scrollToPage = (to: number) => {
    const target = Math.max(0, Math.min(to, pages - 1));
    trackRef.current?.scrollTo({ left: target * step(), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-[#0b1a3d] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.5)] transition-opacity disabled:cursor-default disabled:opacity-40 lg:grid";

  return (
    <div className="text-center">
      <div className="relative lg:px-14">
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
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
        <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/15 px-3 py-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${label} page ${i + 1}`}
              aria-current={i === page}
              onClick={() => scrollToPage(i)}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full border border-[#f5efe4]/80 transition-colors ${
                i === page ? "bg-[#f5efe4]" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Slide widths for a row of product cards: about 1.6 on phones, 3.3 on
 * tablets, 5.25 on desktop - the part card at the end says "there's more". */
export const PRODUCT_SLIDE = "w-[calc((100%-1rem)/1.6)] sm:w-[calc((100%-2rem)/3.3)] lg:w-[calc((100%-4rem)/5.25)]";

/**
 * A white product card, as in Stuller's carousels: a square photo on white
 * and the name under it. With no `src` it shows a placeholder until the
 * product photo is in. No hover effect.
 */
export function ProductCard({ title, src, href }: { title: string; src?: string; href: string }) {
  return (
    <Link href={href} className="flex h-full flex-col overflow-hidden rounded-lg bg-white text-left text-[#141414]">
      <div className="relative aspect-square">
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 15rem, (min-width: 640px) 30vw, 60vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#141414]/15 bg-[#f3efe7] text-[#8a6630]">
            <Gem className="h-7 w-7" strokeWidth={1.25} />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Photo coming soon</span>
          </div>
        )}
      </div>
      <p className="px-4 pt-2 pb-5 text-[0.9375rem] leading-snug">{title}</p>
    </Link>
  );
}
