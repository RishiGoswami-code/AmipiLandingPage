"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HEADING } from "./BannerTitle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SnowGlobe.module.css";

/** Navy from the hero banner, used for the heading, labels and arrows. */
const NAVY = "#0b1a3d";

/**
 * AMIPI's product lines, in the order the manager set: necklace, bracelet,
 * bands, studs, hoops, rings, bangles. Transparent cut-outs in
 * public/gift-guide/types; Diamond Studs is still the navbar's ~240px
 * thumbnail, so it reads soft at globe size. The bangle is the stretchy
 * diamond bangle from GiftPageImages/JeweleryType, cut out of its white
 * ground (inside the loop as well as around it).
 */
const TYPES: { label: string; src: string; wide?: boolean }[] = [
  { label: "Necklaces", src: "/gift-guide/types/tennis-necklace-hd.webp" },
  {
    label: "Tennis Bracelets",
    src: "/gift-guide/types/tennis-bracelet-hd.webp",
  },
  { label: "Bands", src: "/gift-guide/types/band-hd.webp" },
  { label: "Diamond Studs", src: "/gift-guide/types/diamond-studs.webp" },
  { label: "Hoops", src: "/gift-guide/types/hoops-hd.webp" },
  { label: "Rings", src: "/gift-guide/types/oval-ring.webp" },
  // A wide, flat piece (about 3.7:1), so it gets more of the globe's width
  { label: "Bangles", src: "/gift-guide/types/stretchy-bangle.webp", wide: true },
];

/**
 * A crystal-clear snow globe drawn in CSS, after the reference photo: the
 * sphere is transparent (the page shows through it), defined only by its
 * blue-tinted edge, a thin rim reflection and the snow inside - falling
 * flakes and a thin drift of settled snow. Nothing hazy crosses the piece. It rests on a thin clear-glass disc
 * with a soft shadow under it. No stand, no scenery. The glass is clear
 * through the middle and tinted ice blue only towards its rim.
 *
 * Everything is sized in cqw off the globe's own width (a size container),
 * so it scales as one object. The sphere is 92cqw across from the top; the
 * disc sits under its lowest point.
 */
function SnowGlobe({ src, wide = false }: { src: string; wide?: boolean }) {
  return (
    <div aria-hidden className={`@container relative aspect-[100/98] w-full`}>
      {/* Soft floor shadow */}
      <div className="absolute top-[88cqw] left-[14cqw] h-[8cqw] w-[72cqw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(11,26,61,0.3),rgba(11,26,61,0.1)_60%,transparent)] blur-[0.6cqw]" />

      {/* Clear glass disc the sphere rests in: a lit rim and a faint body */}
      <div className="absolute top-[85cqw] left-[24cqw] h-[7cqw] w-[52cqw] rounded-[50%] border-[0.35cqw] border-white bg-[linear-gradient(180deg,rgba(235,242,250,0.9),rgba(170,192,218,0.7))] ring-1 ring-[rgba(110,140,182,0.45)] shadow-[inset_0_-0.8cqw_1.2cqw_rgba(120,145,180,0.35),0_0.4cqw_1cqw_rgba(11,26,61,0.12)]" />

      {/* Glass sphere */}
      <div className={`absolute top-0 left-[4cqw] h-[92cqw] w-[92cqw] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_80%,rgba(140,172,215,0.25)_92%,rgba(90,128,185,0.6)_100%)] shadow-[0_0_0_1px_rgba(90,128,185,0.55)]`}>
        <div className={`${styles.snow} ${styles.back}`}>
          <div className={styles.fall} />
        </div>

        {/* Settled snow: a thin drift along the very bottom, so the glass
            stays clear behind the piece */}
        <div className="absolute -inset-x-[4%] bottom-[-3%] h-[13%] rounded-[50%_50%_0_0/100%_100%_0_0] bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(225,234,245,0.7)_60%,rgba(150,178,215,0.55)_100%)]" />

        {/* The piece: large and sharp, standing on the mound */}
        <div className={`absolute top-[13%] h-[72%] ${wide ? "left-[5%] w-[90%]" : "left-[10%] w-[80%]"}`}>
          <Image
            quality={90}
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 45vw"
            className="object-contain object-[50%_60%] contrast-[1.06] drop-shadow-[0_1.2cqw_1.4cqw_rgba(20,40,80,0.35)]"
          />
        </div>

        <div className={`${styles.snow} ${styles.front}`}>
          <div className={styles.fall} />
        </div>

        {/* Glass: a blue edge all round, a thin reflection hugging the
            top-left rim and a small glint - nothing over the piece */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_0.35cqw_rgba(255,255,255,0.7),inset_0_0_1.6cqw_rgba(80,120,180,0.35)]" />
        <div className="absolute inset-[2.5%] -rotate-[45deg] rounded-full border-[0.9cqw] border-transparent border-t-white/80 blur-[0.15cqw]" />
        <div className="absolute top-[11%] left-[19%] h-[4%] w-[7%] -rotate-[40deg] rounded-[50%] bg-white/90 blur-[0.3cqw]" />
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
 * call scrollBy. About 1.6 globes show on phones, 3.4 on tablets, 5.4 on
 * desktop.
 *
 * Each globe ends in an underlined "Shop now" link to /categories, since there
 * are no per-type pages yet.
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
      id="jewelry-types"
      aria-labelledby="types-heading"
      className="bg-[linear-gradient(180deg,rgb(238_243_248/0)_0%,#eef3f8_18%,#eef3f8_82%,rgb(238_243_248/0)_100%)] pt-[calc(var(--gift-gap)*0.6)] pb-[max(0px,calc(var(--gift-gap)-1.5rem))]"
    >
      <div className="flex items-end justify-between gap-6 px-edge">
        <h2
          id="types-heading"
          className={`max-sm:w-full max-sm:text-center ${HEADING}`}
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
            className="flex w-[58vw] shrink-0 snap-start flex-col items-center sm:w-[26vw] lg:w-[clamp(11rem,16vw,17rem)]"
          >
            <SnowGlobe src={type.src} wide={type.wide} />
            <p
              className="mt-4 text-center text-[13px] font-semibold tracking-[0.14em] uppercase sm:mt-5 sm:text-sm sm:tracking-[0.2em] lg:text-base"
              style={{ color: NAVY }}
            >
              {type.label}
            </p>
            {/* Underlined text only, not a button. */}
            <Link
              href="/categories"
              className="mt-2 text-[13px] font-medium text-[#0b1a3d] underline underline-offset-4 transition-colors hover:text-[#8a6630] sm:text-sm"
            >
              Shop now
            </Link>
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
