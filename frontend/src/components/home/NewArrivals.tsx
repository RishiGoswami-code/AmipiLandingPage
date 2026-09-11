"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

type Piece = {
  name: string;
  spec: string;
  price: string;
  icon: "bracelet" | "pendant" | "hoops" | "band";
};

/**
 * Placeholder content, not a live catalog. There's no product photography
 * or real pricing wired up yet - swap `name`/`spec`/`price` for the real
 * thing whenever it exists, and swap PieceIcon's line-art for a photo in
 * PieceCard's image slot (same fixed-height block, same position) rather
 * than restyling around it. The first two pieces deliberately match the
 * hero's bracelet/necklace hotspots (see HeroStage.tsx) so scrolling into
 * this section reads as "here they are again, closer" rather than
 * introducing two unrelated names.
 */
const PIECES: Piece[] = [
  {
    name: "The Diamond Riviera Bracelet",
    spec: "18k White Gold",
    price: "From $4,200",
    icon: "bracelet",
  },
  {
    name: "The Solitaire Diamond Choker",
    spec: "18k White Gold",
    price: "From $2,100",
    icon: "pendant",
  },
  {
    name: "Classic Diamond Hoops",
    spec: "14k White Gold",
    price: "From $1,650",
    icon: "hoops",
  },
  {
    name: "The Eternity Band",
    spec: "Platinum",
    price: "From $3,800",
    icon: "band",
  },
];

/**
 * New Arrivals — a seasonal/festival best-sellers carousel: kicker, heading
 * and "view all" up top, a horizontally-scrolling card rail below it, a
 * progress track and prev/next controls under that. Card *effects* (hover,
 * etc.) are intentionally left plain for now - structure and layout only,
 * per the reference this was built from.
 */
export function NewArrivals() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [progress, setProgress] = useState({ ratio: 1, offset: 0 });

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < max - 4);
    const ratio = max <= 0 ? 1 : el.clientWidth / el.scrollWidth;
    const offset = max <= 0 ? 0 : el.scrollLeft / max;
    setProgress({ ratio: Math.min(1, ratio), offset });
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    const amount = (card?.offsetWidth ?? 260) + gap;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-navy-950 px-6 py-20 sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
              New Arrivals
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-4xl">
              This Season&rsquo;s Best Sellers
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-2 text-[13px] font-semibold tracking-wide text-ice-100/70 transition-colors hover:text-gold-500 sm:flex"
          >
            View All New
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {PIECES.map((piece) => (
            <PieceCard key={piece.name} piece={piece} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="relative h-1 w-full max-w-[220px] rounded-full bg-ice-100/10">
            <div
              className="absolute inset-y-0 rounded-full bg-ice-100/60"
              style={{
                width: `${progress.ratio * 100}%`,
                left: `${progress.offset * (1 - progress.ratio) * 100}%`,
              }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous piece"
              className="grid h-10 w-10 place-items-center rounded-full border border-ice-100/15 text-ice-100/70 transition-colors hover:border-ice-100/30 hover:text-ice-100 disabled:opacity-30 disabled:hover:border-ice-100/15 disabled:hover:text-ice-100/70"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Next piece"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/60 text-gold-500 transition-colors hover:bg-gold-500/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <PillButton href="/collections" variant="outline" icon="arrow">
            View All New
          </PillButton>
        </div>
      </div>
    </section>
  );
}

function PieceCard({ piece }: { piece: Piece }) {
  const [saved, setSaved] = useState(false);

  return (
    <article
      data-card
      className="relative w-[72vw] max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-ice-100/8 bg-navy-900 sm:w-[260px]"
      style={{ scrollSnapAlign: "start" }}
    >
      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        aria-label={saved ? "Remove from saved pieces" : "Save this piece"}
        aria-pressed={saved}
        className="absolute top-3 right-3 z-10 text-ice-100/70 transition-colors hover:text-gold-500"
      >
        <Heart
          className={saved ? "h-[18px] w-[18px] fill-gold-500 text-gold-500" : "h-[18px] w-[18px]"}
        />
      </button>

      <div className="flex h-48 items-center justify-center sm:h-52">
        <PieceIcon type={piece.icon} className="h-20 w-20 text-gold-500/90" />
      </div>

      <div className="px-4 pb-5">
        <p className="text-[11px] tracking-[0.22em] text-gold-500 uppercase">
          {piece.spec}
        </p>
        <h3 className="mt-1 font-display text-base leading-snug font-semibold text-ice-100">
          {piece.name}
        </h3>
        <p className="mt-1 text-sm text-ice-100/55">{piece.price}</p>
      </div>
    </article>
  );
}

/** Simple gold line-art per piece type — a stand-in for real product photography. */
function PieceIcon({
  type,
  className,
}: {
  type: Piece["icon"];
  className?: string;
}) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  if (type === "bracelet") {
    return (
      <svg {...common}>
        <ellipse cx="32" cy="34" rx="24" ry="14" />
        {[16, 24, 32, 40, 48].map((x) => (
          <circle key={x} cx={x} cy={20.5 - Math.abs(32 - x) * 0.15} r="1.6" fill="currentColor" stroke="none" />
        ))}
      </svg>
    );
  }

  if (type === "pendant") {
    return (
      <svg {...common}>
        <path d="M10 14 L32 40 L54 14" />
        <circle cx="32" cy="44" r="4.5" />
      </svg>
    );
  }

  if (type === "hoops") {
    return (
      <svg {...common}>
        <path d="M22 18a4 4 0 1 1 8 0" />
        <circle cx="26" cy="34" r="12" />
        <path d="M36 18a4 4 0 1 1 8 0" />
        <circle cx="40" cy="34" r="12" />
      </svg>
    );
  }

  // band
  return (
    <svg {...common}>
      <circle cx="32" cy="36" r="16" />
      {[18, 24, 32, 40, 46].map((x) => (
        <circle key={x} cx={x} cy={22 - Math.abs(32 - x) * 0.25} r="1.7" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}
