import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
 * thing whenever it exists, and swap PieceIcon's line-art for photos
 * (aspect-square, same grid) rather than restyling around them. The first
 * two pieces deliberately match the hero's bracelet/necklace hotspots
 * (see HeroStage.tsx) so scrolling into this section reads as "here they
 * are again, closer" rather than introducing two unrelated names.
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
 * New Arrivals — a seasonal/festival best-sellers rail, framer-Aurelle in
 * structure (kicker, heading, "view all", four-up card grid) but rebuilt in
 * the site's own navy/gold palette instead of that template's cream one.
 */
export function NewArrivals() {
  return (
    <section className="relative bg-navy-900 px-6 py-20 sm:px-12 sm:py-28 lg:px-20">
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PIECES.map((piece) => (
            <PieceCard key={piece.name} piece={piece} />
          ))}
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
  return (
    <article className="group overflow-hidden rounded-2xl border border-ice-100/10 bg-navy-800 transition-colors hover:border-gold-500/40">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950">
        <PieceIcon
          type={piece.icon}
          className="h-20 w-20 text-gold-500/90 transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-[11px] tracking-[0.22em] text-gold-500/80 uppercase">
          {piece.spec}
        </p>
        <h3 className="mt-1 font-display text-base leading-snug font-semibold text-ice-100">
          {piece.name}
        </h3>
        <p className="mt-2 text-sm text-ice-100/70">{piece.price}</p>
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
