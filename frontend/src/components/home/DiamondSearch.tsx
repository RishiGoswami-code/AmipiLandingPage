"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Gem, Leaf, ShieldCheck } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

type ShapeIconProps = { className?: string };
type Point = [number, number];

// ---------------------------------------------------------------------------
// Facet geometry helpers - every coordinate below is computed from an angle
// and a radius, never eyeballed, so a spoke always lands exactly on the
// vertex it's drawn to meet. This is what lets the icons carry the denser,
// gemological-diagram level of detail (crown spokes, step-cut layers) seen
// on amipi.com's live shape row, while staying original artwork - no
// third-party file, no licensing question.
// ---------------------------------------------------------------------------
const r2 = (n: number) => Math.round(n * 100) / 100;

/** A point at `radius` from (cx, cy), `deg` degrees clockwise from up. */
function polar(cx: number, cy: number, radius: number, deg: number): Point {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + radius * Math.cos(rad)), r2(cy + radius * Math.sin(rad))];
}

/** Same as `polar` but for an ellipse (independent x/y radii). */
function polarEllipse(cx: number, cy: number, rx: number, ry: number, deg: number): Point {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + rx * Math.cos(rad)), r2(cy + ry * Math.sin(rad))];
}

/** `count` angles evenly spread around a circle, starting at `offset`. */
function fan(count: number, offset = 0): number[] {
  return Array.from({ length: count }, (_, i) => offset + (360 / count) * i);
}

/** One `M..L..` segment per pair, connecting each anchor to its point. */
function spokes(points: Point[], anchors: Point[]): string {
  return points.map(([x, y], i) => `M${anchors[i][0]} ${anchors[i][1]}L${x} ${y}`).join(" ");
}

/** A closed polygon through the given points. */
function polygon(points: Point[]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ") + "Z";
}

/** Scales a hand-specified outline toward (cx, cy) - draws the nested
 * step-cut layers on emerald/asscher/radiant without retyping coordinates
 * for every layer. */
function inset(points: Point[], cx: number, cy: number, scale: number): Point[] {
  return points.map(([x, y]) => [r2(cx + (x - cx) * scale), r2(cy + (y - cy) * scale)]);
}

const CENTER: Point = [20, 20];
const fillCenter = (n: number) => Array.from({ length: n }, () => CENTER);

// Round brilliant: octagonal table, 8 main crown spokes to the girdle, 8
// shorter upper-girdle spokes interleaved between them.
const ROUND_TABLE = fan(8).map((d) => polar(20, 20, 6, d));
const ROUND_GIRDLE = fan(8).map((d) => polar(20, 20, 15, d));
const ROUND_MID = fan(8, 22.5).map((d) => polar(20, 20, 11, d));

// Oval: the same brilliant spoke pattern, traced onto an ellipse.
const OVAL_TABLE = fan(8).map((d) => polarEllipse(20, 20, 4.5, 7.5, d));
const OVAL_GIRDLE = fan(8).map((d) => polarEllipse(20, 20, 11, 15, d));
const OVAL_MID = fan(8, 22.5).map((d) => polarEllipse(20, 20, 8, 11, d));

// Cushion: rounded-square outline and table, 4 diagonal + 4 cardinal crown
// facets between them.
const CUSHION_OUTER_CORNERS: Point[] = [
  [8, 8],
  [32, 8],
  [32, 32],
  [8, 32],
];
const CUSHION_TABLE_CORNERS: Point[] = [
  [15, 15],
  [25, 15],
  [25, 25],
  [15, 25],
];
const CUSHION_OUTER_MIDS: Point[] = [
  [20, 6],
  [34, 20],
  [20, 34],
  [6, 20],
];
const CUSHION_TABLE_MIDS: Point[] = [
  [20, 14],
  [26, 20],
  [20, 26],
  [14, 20],
];

// Princess: square outline, diamond table, corner-to-corner X plus cardinal
// ticks connecting the table to each edge - the classic "bowtie" pattern.
const PRINCESS_CORNERS: Point[] = [
  [7, 7],
  [33, 7],
  [33, 33],
  [7, 33],
];
const PRINCESS_TABLE: Point[] = [
  [20, 12],
  [28, 20],
  [20, 28],
  [12, 20],
];
const PRINCESS_EDGE_MIDS: Point[] = [
  [20, 7],
  [33, 20],
  [20, 33],
  [7, 20],
];

// Step cuts (emerald / asscher / radiant): one hand-specified outline, then
// two more layers scaled toward center - no coordinates retyped per layer.
const EMERALD_OUTER: Point[] = [
  [13, 8],
  [27, 8],
  [34, 15],
  [34, 25],
  [27, 32],
  [13, 32],
  [6, 25],
  [6, 15],
];
const EMERALD_MID = inset(EMERALD_OUTER, 20, 20, 0.78);
const EMERALD_INNER = inset(EMERALD_OUTER, 20, 20, 0.54);

const ASSCHER_OUTER: Point[] = [
  [14, 7],
  [26, 7],
  [33, 14],
  [33, 26],
  [26, 33],
  [14, 33],
  [7, 26],
  [7, 14],
];
const ASSCHER_MID = inset(ASSCHER_OUTER, 20, 20, 0.78);
const ASSCHER_INNER = inset(ASSCHER_OUTER, 20, 20, 0.55);

const RADIANT_OUTER: Point[] = [
  [11, 7],
  [29, 7],
  [34, 12.5],
  [34, 27.5],
  [29, 33],
  [11, 33],
  [6, 27.5],
  [6, 12.5],
];
const RADIANT_INNER = inset(RADIANT_OUTER, 20, 20, 0.56);
const RADIANT_CORNERS: Point[] = [
  [11, 7],
  [29, 7],
  [29, 33],
  [11, 33],
];

// Marquise: pointed-oval outline, table, and 8 spokes radiating from center
// to the tips/bulges of the silhouette.
const MARQUISE_POINTS: Point[] = [
  [20, 4],
  [26, 11],
  [30, 20],
  [26, 29],
  [20, 36],
  [14, 29],
  [10, 20],
  [14, 11],
];

// Pear: teardrop outline, table, and spokes from an off-center focal point
// (the widest part of the stone) out to tip and shoulders.
const PEAR_FOCAL: Point = [20, 22];
const PEAR_POINTS: Point[] = [
  [20, 5],
  [26, 10],
  [30, 21],
  [25, 30],
  [20, 35],
  [15, 30],
  [10, 21],
  [14, 10],
];

// "All Others" isn't a real cut - a diamond outline with a "?", plus faint
// corner spokes so it sits at the same visual density as the rest of the row.
const OTHER_OUTLINE: Point[] = [
  [20, 4],
  [34, 20],
  [20, 36],
  [6, 20],
];

/**
 * Ten diamond-shape icons, each drawn as a real top-view facet map -
 * outline, table, and crown spokes or step-cut layers - at the same density
 * as the reference shape row on amipi.com. Original artwork built from the
 * polar-geometry helpers above: a shared glass-gradient fill and a single
 * catch-light sparkle (see `ShapeIconDefs` / `SPARKLE_D` below) give each
 * one the dimensional, photographic feel of a real stone, without hosting
 * or licensing anyone else's product photography.
 */

/**
 * One shared gem-glass gradient plus one catch-light sparkle, both defined
 * once and referenced by every icon below via `url(#...)` - a white
 * highlight sliding into a cool gray shadow for the facet fill, and a tiny
 * four-point glint for the sparkle a studio photo would catch on a girdle
 * facet. Fixed, neutral stops (not `currentColor`) so the glass tone stays
 * consistent while the linework on top still switches to gold on the
 * active shape via `stroke="currentColor"`.
 */
function ShapeIconDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="diamondFacetShine" x1="15%" y1="8%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#c7d2e0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6b7690" stopOpacity="0.65" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const FACET_FILL = "url(#diamondFacetShine)";

/** A tiny four-point glint, positioned toward the upper-left crown of every
 * icon - the one consistent element that reads as "photographed gem" rather
 * than "line diagram" at a glance. */
const SPARKLE_D = "M13.5 9.5L14.6 12.4L17.5 13.5L14.6 14.6L13.5 17.5L12.4 14.6L9.5 13.5L12.4 12.4Z";
const Sparkle = () => <path d={SPARKLE_D} fill="#ffffff" opacity="0.9" />;

const ShapeIcons: Record<string, (props: ShapeIconProps) => React.JSX.Element> = {
  round: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="15" fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={spokes(ROUND_GIRDLE, ROUND_TABLE)} stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <path d={spokes(ROUND_MID, fillCenter(8))} stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <path d={polygon(ROUND_TABLE)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  oval: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <ellipse cx="20" cy="20" rx="11" ry="15" fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={spokes(OVAL_GIRDLE, OVAL_TABLE)} stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <path d={spokes(OVAL_MID, fillCenter(8))} stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <path d={polygon(OVAL_TABLE)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  cushion: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="6" y="6" width="28" height="28" rx="11" fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path
        d={spokes(CUSHION_TABLE_CORNERS, CUSHION_OUTER_CORNERS)}
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.6"
      />
      <path
        d={spokes(CUSHION_TABLE_MIDS, CUSHION_OUTER_MIDS)}
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.45"
      />
      <rect x="15" y="15" width="10" height="10" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  princess: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="7" y="7" width="26" height="26" fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={spokes(PRINCESS_CORNERS, fillCenter(4))} stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      <path
        d={spokes(PRINCESS_TABLE, PRINCESS_EDGE_MIDS)}
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.6"
      />
      <path d={polygon(PRINCESS_TABLE)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  emerald: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d={polygon(EMERALD_OUTER)} fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={polygon(EMERALD_MID)} stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path d={polygon(EMERALD_INNER)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  marquise: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 4C26 11 30 15.5 30 20C30 24.5 26 29 20 36C14 29 10 24.5 10 20C10 15.5 14 11 20 4Z"
        fill={FACET_FILL}
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <Sparkle />
      <path d={spokes(MARQUISE_POINTS, fillCenter(8))} stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <path
        d="M20 10C24 15 26.5 17.5 26.5 20C26.5 22.5 24 25 20 30C16 25 13.5 22.5 13.5 20C13.5 17.5 16 15 20 10Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.85"
      />
    </svg>
  ),
  asscher: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d={polygon(ASSCHER_OUTER)} fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={spokes(ASSCHER_MID, ASSCHER_OUTER)} stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
      <path d={polygon(ASSCHER_MID)} stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path d={polygon(ASSCHER_INNER)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  radiant: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d={polygon(RADIANT_OUTER)} fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={spokes(RADIANT_CORNERS, fillCenter(4))} stroke="currentColor" strokeWidth="0.55" opacity="0.4" />
      <path d={polygon(RADIANT_INNER)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  pear: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 5C25.5 12 31 17.5 31 24.5C31 30.5 26 35 20 35C14 35 9 30.5 9 24.5C9 17.5 14.5 12 20 5Z"
        fill={FACET_FILL}
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <Sparkle />
      <path
        d={spokes(PEAR_POINTS, PEAR_POINTS.map(() => PEAR_FOCAL))}
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <path
        d="M20 11C23.5 15.5 27 19 27 24C27 27.8 24 31 20 31C16 31 13 27.8 13 24C13 19 16.5 15.5 20 11Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.85"
      />
    </svg>
  ),
  other: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d={polygon(OTHER_OUTLINE)} fill={FACET_FILL} stroke="currentColor" strokeWidth="1.3" />
      <Sparkle />
      <path d={spokes(OTHER_OUTLINE, fillCenter(4))} stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <text x="20" y="24.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" stroke="none">
        ?
      </text>
    </svg>
  ),
};

const SHAPES: { id: string; label: string }[] = [
  { id: "round", label: "Round" },
  { id: "oval", label: "Oval" },
  { id: "cushion", label: "Cushion" },
  { id: "princess", label: "Princess" },
  { id: "emerald", label: "Emerald" },
  { id: "marquise", label: "Marquise" },
  { id: "asscher", label: "Asscher" },
  { id: "radiant", label: "Radiant" },
  { id: "pear", label: "Pear" },
  { id: "other", label: "All Others" },
];

/**
 * Real per-shape renders (AMIPI's own asset, generated fresh rather than
 * cropped from a competitor's product photography) for every cut except
 * "All Others" - which isn't a real cut, so it keeps the custom line-icon
 * with its "?" mark instead of a photo that would misrepresent a shape.
 */
const SHAPE_PHOTOS: Record<string, string> = {
  round: "/diamond-shapes/round.svg",
  oval: "/diamond-shapes/oval.svg",
  cushion: "/diamond-shapes/cushion.svg",
  princess: "/diamond-shapes/princess.svg",
  emerald: "/diamond-shapes/emerald.svg",
  marquise: "/diamond-shapes/marquise.svg",
  asscher: "/diamond-shapes/asscher.svg",
  radiant: "/diamond-shapes/radiant.svg",
  pear: "/diamond-shapes/pear.svg",
};

const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L+"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "SI3", "I1+"];

/**
 * Carat-weight brackets as numeric bounds, not typed-out strings - the label
 * is derived from `min`/`max` so every bracket's text is guaranteed to match
 * its own math. `max: null` means open-ended ("5.50+"). The bounds mirror
 * the trade-standard breakpoints already used on amipi.com (0.23ct up to
 * 5.50ct+), each one contiguous with the next (previous max + 0.01 = next
 * min) so nothing overlaps and nothing gaps.
 */
type CaratBracket = { min: number; max: number | null };

const CARAT_BOUNDS: [number, number | null][] = [
  [0.23, 0.29],
  [0.3, 0.39],
  [0.4, 0.45],
  [0.46, 0.49],
  [0.5, 0.59],
  [0.6, 0.69],
  [0.7, 0.79],
  [0.8, 0.89],
  [0.9, 0.99],
  [1.0, 1.09],
  [1.1, 1.19],
  [1.2, 1.29],
  [1.3, 1.39],
  [1.4, 1.49],
  [1.5, 1.69],
  [1.7, 1.99],
  [2.0, 2.49],
  [2.5, 2.99],
  [3.0, 3.49],
  [3.5, 3.99],
  [4.0, 4.49],
  [4.5, 4.99],
  [5.0, 5.49],
  [5.5, null],
];

const CARAT_BRACKETS: CaratBracket[] = CARAT_BOUNDS.map(([min, max]) => ({ min, max }));

// Guards the hand-typed bounds above at module load: every bracket must
// pick up exactly where the previous one left off, so the grid can never
// silently drift out of sequence or double-count a weight.
if (process.env.NODE_ENV !== "production") {
  CARAT_BRACKETS.forEach((bracket, i) => {
    if (i === 0) return;
    const prev = CARAT_BRACKETS[i - 1];
    const expectedMin = Math.round((prev.max! + 0.01) * 100) / 100;
    if (bracket.min !== expectedMin) {
      throw new Error(
        `Carat bracket ${i} (${bracket.min}ct) does not pick up where bracket ${i - 1} (${prev.max}ct) left off.`,
      );
    }
  });
}

function formatCarat(value: number) {
  return value.toFixed(2);
}

function caratBracketLabel({ min, max }: CaratBracket) {
  return max === null ? `${formatCarat(min)}+` : `${formatCarat(min)}-${formatCarat(max)}`;
}

/**
 * A filter column for the light search card - numbered label, then the
 * control in its own bordered field (matching the reference's boxed
 * "WEIGHT RANGE" / letter-row inputs, rather than bare text floating on
 * the card).
 */
function FilterBox({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="text-[11px] font-semibold tracking-[0.3em] text-foreground/75 uppercase">
        {label}
      </span>
      <div className="mt-4 rounded-xl border border-navy-200 px-4 py-3.5">{children}</div>
    </div>
  );
}

/**
 * "Start Your Diamond Search Here" - laid out after amipi.com's own search
 * panel: a centred heading, a full-width row of shapes, then carat weight /
 * color / clarity side by side, and the two search buttons centred
 * underneath. The whole panel sits on a white card with no banner
 * photo behind the heading.
 */
export function DiamondSearch() {
  const [shape, setShape] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [clarity, setClarity] = useState<string | null>(null);
  const [weightOpen, setWeightOpen] = useState(false);
  const [weightIndex, setWeightIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-background">
      {/* One white panel carrying everything - heading, shapes, filters,
          buttons - top to bottom. */}
      <div className="relative rounded-t-[3rem] bg-white px-6 pt-12 pb-10 shadow-[0_30px_60px_-24px_rgba(15,23,42,0.18)] sm:rounded-t-[5rem] sm:px-12 sm:pt-16 lg:px-20">
        {/* Heading, centred */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl leading-[1.05] font-semibold text-foreground sm:text-5xl lg:text-6xl">
            Start Your{" "}
            <span className="relative inline-block text-gold-500">
              <span className="absolute inset-x-0 bottom-1 h-[0.3em] -rotate-1 bg-gold-500/20" />
              <span className="relative">Diamond</span>
            </span>{" "}
            Search Here
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gold-500/60" />
        </div>

        <div className="mt-10">
          <div className="rounded-2xl border border-navy-200 p-6 sm:p-8">
            <div className="border-b border-navy-200 pb-5">
              <span className="text-[11px] font-semibold tracking-[0.3em] text-foreground/75 uppercase">
                1. Shape
              </span>
            </div>
            <ShapeIconDefs />
            <div className="mt-8 grid grid-cols-3 gap-x-2 gap-y-8 sm:grid-cols-5 lg:grid-cols-10">
              {SHAPES.map((s) => {
                const photo = SHAPE_PHOTOS[s.id];
                const Icon = ShapeIcons[s.id];
                const active = shape === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id)}
                    aria-pressed={active}
                    className={`group flex flex-col items-center overflow-hidden rounded-xl border pt-3 text-center transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none ${
                      active
                        ? "border-navy-700 bg-white text-foreground shadow-[0_10px_24px_-8px_rgba(18,25,38,0.45)]"
                        : "border-transparent text-foreground/80 hover:border-navy-700 hover:bg-white hover:text-foreground hover:shadow-[0_10px_24px_-8px_rgba(18,25,38,0.45)] focus-visible:border-navy-700 focus-visible:bg-white focus-visible:shadow-[0_10px_24px_-8px_rgba(18,25,38,0.45)]"
                    }`}
                  >
                    {photo ? (
                      <span className="relative mb-3 block h-11 w-11 drop-shadow-[0_2px_3px_rgba(15,23,42,0.15)]">
                        <Image src={photo} alt="" fill sizes="44px" className="object-contain" />
                      </span>
                    ) : (
                      <Icon className="mb-3 block h-11 w-11 drop-shadow-[0_2px_3px_rgba(15,23,42,0.15)]" />
                    )}
                    {/* Fills navy under the icon - like a caption tab on the
                        lifted card - on hover/focus, and stays filled on the
                        selected shape. */}
                    <span
                      className={`mt-auto block w-full py-2 text-[10px] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 ${
                        active
                          ? "bg-navy-700 text-white"
                          : "group-hover:bg-navy-700 group-hover:text-white group-focus-visible:bg-navy-700 group-focus-visible:text-white"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carat weight / Color / Clarity, side by side */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <FilterBox label="2. Carat Weight">
            <button
              type="button"
              onClick={() => setWeightOpen((v) => !v)}
              aria-expanded={weightOpen}
              className="flex w-full items-center justify-between text-xs font-semibold tracking-[0.15em] text-foreground uppercase"
            >
              {weightIndex === null ? "Weight Range" : caratBracketLabel(CARAT_BRACKETS[weightIndex]) + "ct"}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-gold-500 transition-transform ${weightOpen ? "rotate-180" : ""}`}
              />
            </button>

            {weightOpen && (
              <>
                {/* Click-outside catcher, sits under the panel and above the
                    rest of the page. */}
                <button
                  type="button"
                  aria-hidden
                  tabIndex={-1}
                  onClick={() => setWeightOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="absolute top-full left-0 z-20 mt-2 w-[280px] rounded-lg border border-gold-500/30 bg-background p-3 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.16)]">
                  <div className="grid grid-cols-5 gap-1">
                    {CARAT_BRACKETS.map((bracket, i) => (
                      <button
                        key={caratBracketLabel(bracket)}
                        type="button"
                        onClick={() => {
                          setWeightIndex(i);
                          setWeightOpen(false);
                        }}
                        aria-pressed={weightIndex === i}
                        className={`rounded px-1 py-1.5 text-center text-[10px] font-semibold tracking-tight transition-colors ${
                          weightIndex === i
                            ? "bg-gold-500 text-navy-950"
                            : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                        }`}
                      >
                        {caratBracketLabel(bracket)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </FilterBox>

          <FilterBox label="3. Color">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              {COLORS.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={`flex-1 py-0.5 text-center text-xs font-semibold tracking-wide transition-colors ${
                    color === c
                      ? "text-gold-500 underline underline-offset-4"
                      : "text-foreground/80 hover:text-foreground"
                  } ${i < COLORS.length - 1 ? "border-r border-navy-200" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </FilterBox>

          <FilterBox label="4. Clarity">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              {CLARITIES.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClarity(c)}
                  aria-pressed={clarity === c}
                  className={`flex-1 py-0.5 text-center text-xs font-semibold tracking-wide transition-colors ${
                    clarity === c
                      ? "text-gold-500 underline underline-offset-4"
                      : "text-foreground/80 hover:text-foreground"
                  } ${i < CLARITIES.length - 1 ? "border-r border-navy-200" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </FilterBox>
        </div>

        {/* Search buttons, centred */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <div className="sm:w-72">
            <PillButton
              href="/contact"
              variant="light"
              icon="dot"
              className="w-full border border-[#dfbf7b]"
            >
              Earth Mined Diamonds
            </PillButton>
          </div>
          <div className="sm:w-72">
            <PillButton href="/contact" variant="gold" icon="dot" className="w-full">
              Lab Grown Diamonds
            </PillButton>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[11px] font-semibold tracking-[0.2em] text-foreground/65 uppercase">
          <span className="inline-flex items-center gap-2">
            <Gem className="h-4 w-4 text-gold-500" />
            Ethical Sourcing
          </span>
          <span className="inline-flex items-center gap-2">
            <Leaf className="h-4 w-4 text-gold-500" />
            A Brighter Tomorrow
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold-500" />
            Trust &amp; Transparency
          </span>
        </div>
      </div>
    </section>
  );
}
