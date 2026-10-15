"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SnowGlobe.module.css";

/** Navy from the hero banner, used for the heading, labels and arrows. */
const NAVY = "#0b1a3d";

/**
 * AMIPI's product lines. Placeholder cut-outs made from the navbar's
 * white-background thumbnails (public/nav-jewelry) - to be replaced by proper
 * high-resolution transparent product PNGs in public/gift-guide/types. The
 * current ones are only ~120-240px wide, so they read soft at globe size.
 */
const TYPES = [
  { label: "Diamond Studs", src: "/gift-guide/types/diamond-studs.webp" },
  { label: "Hoops", src: "/gift-guide/types/hoops-hd.webp" },
  {
    label: "Tennis Bracelets",
    src: "/gift-guide/types/tennis-bracelet-hd.webp",
  },
  { label: "Flexi Bangles", src: "/gift-guide/types/flexi-bangle.webp" },
  { label: "Bands", src: "/gift-guide/types/band-hd.webp" },
  { label: "Rings", src: "/gift-guide/types/ring-hd.webp" },
  { label: "Necklaces", src: "/gift-guide/types/tennis-necklace-hd.webp" },
];

/**
 * A crystal-clear snow globe drawn in CSS, after the reference photo: the
 * sphere is transparent (the page shows through it), defined only by its
 * edge, reflections and the snow inside - falling flakes and a mound of
 * settled snow the piece stands on. It rests on a thin clear-glass disc
 * with a soft shadow under it. No stand, no scenery.
 *
 * Everything is sized in cqw off the globe's own width (a size container),
 * so it scales as one object. The sphere is 92cqw across from the top; the
 * disc sits under its lowest point.
 */
function SnowGlobe({ src }: { src: string }) {
  return (
    <div aria-hidden className="@container relative aspect-[100/98] w-full">
      {/* Soft floor shadow */}
      <div className="absolute top-[88cqw] left-[14cqw] h-[8cqw] w-[72cqw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(11,26,61,0.3),rgba(11,26,61,0.1)_60%,transparent)] blur-[0.6cqw]" />

      {/* Clear glass disc the sphere rests in: a lit rim and a faint body */}
      <div className="absolute top-[85cqw] left-[24cqw] h-[7cqw] w-[52cqw] rounded-[50%] border-[0.35cqw] border-white bg-[linear-gradient(180deg,rgba(235,242,250,0.9),rgba(170,192,218,0.7))] ring-1 ring-[rgba(110,140,182,0.45)] shadow-[inset_0_-0.8cqw_1.2cqw_rgba(120,145,180,0.35),0_0.4cqw_1cqw_rgba(11,26,61,0.12)]" />

      {/* Glass sphere */}
      <div className="absolute top-0 left-[4cqw] h-[92cqw] w-[92cqw] overflow-hidden rounded-full bg-[radial-gradient(circle_at_46%_42%,transparent_0%,transparent_55%,rgba(150,178,212,0.16)_78%,rgba(105,138,182,0.48)_100%)] shadow-[0_0_0_1px_rgba(110,140,182,0.45)]">
        <div className={`${styles.snow} ${styles.far}`} />

        {/* Settled snow: a broad mound across the bottom of the sphere,
            heaped a little higher in the middle under the piece */}
        <div className="absolute -inset-x-[4%] bottom-[-3%] h-[22%] rounded-[50%_50%_0_0/100%_100%_0_0] bg-[linear-gradient(180deg,#ffffff_0%,#eef3f8_40%,#cfdbe8_100%)] shadow-[0_-0.5cqw_1.2cqw_rgba(120,150,190,0.3)]" />
        <div className="absolute bottom-[11%] left-[24%] h-[12%] w-[52%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f6f8fb_55%,rgba(230,237,245,0)_100%)]" />

        {/* The piece: large and sharp, standing on the mound */}
        <div className="absolute top-[13%] left-[10%] h-[70%] w-[80%]">
          <Image
            quality={90}
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 45vw"
            className="object-contain object-[50%_72%] drop-shadow-[0_1cqw_1.4cqw_rgba(20,40,80,0.28)]"
          />
        </div>

        <div className={`${styles.snow} ${styles.near}`} />

        {/* Glass: a thin bright edge all round, a curved window reflection
            top-left, a crisp specular glint, and a bright arc on the right */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_0.3cqw_rgba(255,255,255,0.9),inset_0_0_0_0.6cqw_rgba(140,165,200,0.25),inset_0_0_2.5cqw_rgba(110,140,185,0.3)]" />
        <div className="absolute inset-[5%] -rotate-[45deg] rounded-full border-[2cqw] border-transparent border-t-white/90 blur-[0.25cqw] drop-shadow-[0_0.3cqw_0.4cqw_rgba(100,130,175,0.45)]" />
        <div className="absolute top-[15%] left-[22%] h-[6%] w-[11%] -rotate-[40deg] rounded-[50%] bg-white blur-[0.35cqw] drop-shadow-[0_0_0.5cqw_rgba(100,130,175,0.5)]" />
        <div className="absolute inset-[3%] rotate-[100deg] rounded-full border-[0.9cqw] border-transparent border-t-white/80 blur-[0.2cqw] drop-shadow-[0_0.2cqw_0.3cqw_rgba(100,130,175,0.4)]" />
      </div>
    </div>
  );
}

/**
 * "Shop by Jewelry Type" - one row of snow globes, one per product line.
 *
 * Not centred: the heading sits on the page gutter with the arrows at the
 * right end of its row, and the globes run in a native scroll-snap track
 * that starts on the gutter and runs off the viewport's right edge, so the
 * clipped globe at the end shows there is more. Native scrolling means
 * swipe, momentum and keyboard all work before hydration; the arrows only
 * call scrollBy. About 2.3 globes show on phones, 3.4 on tablets, 5.4 on
 * desktop.
 *
 * Visual only for now: the globes do not link anywhere.
 */
export function GiftGuideJewelryTypes() {
  const rowRef = useRef<HTMLUListElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canOn, setCanOn] = useState(false);

  const sync = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    // 1px of slack: scrollLeft is fractional on fractional-DPR screens.
    const max = row.scrollWidth - row.clientWidth;
    setCanBack(row.scrollLeft > 1);
    setCanOn(row.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(row);
    return () => observer.disconnect();
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const row = rowRef.current;
    const slide = row?.firstElementChild as HTMLElement | null;
    if (!row || !slide) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({
      left: direction * (slide.offsetWidth + gap) * 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const arrow =
    "grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[#0b1a3d]/25 bg-white text-[#0b1a3d] shadow-[0_6px_18px_-8px_rgba(11,26,61,0.45)] transition-[opacity,background-color] hover:bg-[#f3efe7] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white";

  return (
    <section
      aria-labelledby="types-heading"
      className="relative pb-24 lg:pb-32"
    >
      <div className="flex items-end justify-between gap-6 px-edge">
        <h2
          id="types-heading"
          className="font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
          style={{ color: NAVY }}
        >
          Shop by Jewelry Type
        </h2>

        <div className="hidden shrink-0 gap-3 pb-2 lg:flex">
          <button
            type="button"
            aria-label="Previous jewelry types"
            onClick={() => step(-1)}
            disabled={!canBack}
            className={arrow}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next jewelry types"
            onClick={() => step(1)}
            disabled={!canOn}
            className={arrow}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* The left gutter is a margin, not padding, so the scroll box itself
          starts on the heading's line and outgoing globes are cut off there.
          No right gutter: the row runs to the viewport edge. Bottom padding
          leaves room for the floor shadows inside the scroll box, which clips. */}
      <ul
        ref={rowRef}
        onScroll={sync}
        data-lenis-prevent-horizontal
        className="mt-10 ml-edge flex snap-x snap-mandatory gap-x-5 overflow-x-auto overflow-y-hidden pt-2 pb-6 [scrollbar-width:none] sm:gap-x-7 lg:mt-12 lg:gap-x-8 [&::-webkit-scrollbar]:hidden"
      >
        {TYPES.map((type) => (
          <li
            key={type.label}
            className="flex w-[40vw] shrink-0 snap-start flex-col items-center sm:w-[26vw] lg:w-[clamp(11rem,16vw,17rem)]"
          >
            <SnowGlobe src={type.src} />
            <p
              className="mt-4 text-center text-[13px] font-semibold tracking-[0.14em] uppercase sm:mt-5 sm:text-sm sm:tracking-[0.2em] lg:text-base"
              style={{ color: NAVY }}
            >
              {type.label}
            </p>
          </li>
        ))}
        {/* Trailing gutter as a flex child: browsers ignore end padding on a
            horizontal flex scroller, so the last globe would sit against the
            viewport edge at full scroll. */}
        <li aria-hidden className="w-edge shrink-0" />
      </ul>
    </section>
  );
}
