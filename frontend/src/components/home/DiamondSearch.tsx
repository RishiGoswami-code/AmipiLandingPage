"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
 * Ten diamond-shape line icons, each drawn as a real top-view facet map -
 * outline, table, and crown spokes or step-cut layers - at the same density
 * as the reference shape row on amipi.com. Original artwork built from the
 * polar-geometry helpers above, so it's themeable via `currentColor` and
 * needs no image hosting or third-party license.
 */
const ShapeIcons: Record<string, (props: ShapeIconProps) => React.JSX.Element> = {
  round: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.3" />
      <path d={spokes(ROUND_GIRDLE, ROUND_TABLE)} stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <path d={spokes(ROUND_MID, fillCenter(8))} stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <path d={polygon(ROUND_TABLE)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  oval: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <ellipse cx="20" cy="20" rx="11" ry="15" stroke="currentColor" strokeWidth="1.3" />
      <path d={spokes(OVAL_GIRDLE, OVAL_TABLE)} stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <path d={spokes(OVAL_MID, fillCenter(8))} stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <path d={polygon(OVAL_TABLE)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  cushion: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="6" y="6" width="28" height="28" rx="11" stroke="currentColor" strokeWidth="1.3" />
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
      <rect x="7" y="7" width="26" height="26" stroke="currentColor" strokeWidth="1.3" />
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
      <path d={polygon(EMERALD_OUTER)} stroke="currentColor" strokeWidth="1.3" />
      <path d={polygon(EMERALD_MID)} stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path d={polygon(EMERALD_INNER)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  marquise: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 4C26 11 30 15.5 30 20C30 24.5 26 29 20 36C14 29 10 24.5 10 20C10 15.5 14 11 20 4Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
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
      <path d={polygon(ASSCHER_OUTER)} stroke="currentColor" strokeWidth="1.3" />
      <path d={spokes(ASSCHER_MID, ASSCHER_OUTER)} stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
      <path d={polygon(ASSCHER_MID)} stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path d={polygon(ASSCHER_INNER)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  radiant: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d={polygon(RADIANT_OUTER)} stroke="currentColor" strokeWidth="1.3" />
      <path d={spokes(RADIANT_CORNERS, fillCenter(4))} stroke="currentColor" strokeWidth="0.55" opacity="0.4" />
      <path d={polygon(RADIANT_INNER)} stroke="currentColor" strokeWidth="1" opacity="0.85" />
    </svg>
  ),
  pear: ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 5C25.5 12 31 17.5 31 24.5C31 30.5 26 35 20 35C14 35 9 30.5 9 24.5C9 17.5 14.5 12 20 5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
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
      <path d={polygon(OTHER_OUTLINE)} stroke="currentColor" strokeWidth="1.3" />
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
 * A filter "box" reproducing the reference's gold rule-above, gold
 * verticals-either-side treatment - a fieldset with no fill, just a thin
 * accent frame, so the navy backdrop still shows through.
 */
function FilterBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="text-[11px] font-semibold tracking-[0.3em] text-ice-100/60 uppercase">
        {label}
      </span>
      <div className="mt-4 border-x-2 border-gold-500/60">
        <div className="border-y border-ice-100/10 px-4 py-3">{children}</div>
      </div>
    </div>
  );
}

/**
 * "Start Your Diamond Search Here" - a filter widget lifted from the classic
 * diamond-retailer search bar, redrawn in the Amipi palette. Deliberately a
 * *different* navy step (navy-900) than the sections it sits between
 * (page canvas navy-700, New Arrivals navy-950), so the widget reads as its
 * own panel rather than a seam - while staying inside the committed palette
 * rather than reaching for the reference's white.
 */
export function DiamondSearch() {
  const [shape, setShape] = useState("round");
  const [color, setColor] = useState<string | null>(null);
  const [clarity, setClarity] = useState<string | null>(null);
  const [weightOpen, setWeightOpen] = useState(false);
  const [weightIndex, setWeightIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-navy-900 px-6 py-20 sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Find Your Stone
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-4xl md:text-5xl">
            Start Your <span className="text-gold-500">Diamond Search</span> Here
          </h2>
        </div>

        {/* Shape */}
        <div className="mt-14">
          <div className="flex items-center border-b-2 border-gold-500/50 pb-2">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-ice-100/60 uppercase">
              Shape
            </span>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-x-2 gap-y-8 sm:grid-cols-5 lg:grid-cols-10">
            {SHAPES.map((s) => {
              const Icon = ShapeIcons[s.id];
              const active = shape === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShape(s.id)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-3 text-center transition-colors ${
                    active ? "text-gold-500" : "text-ice-100/70 hover:text-ice-100"
                  }`}
                >
                  <Icon className="h-9 w-9" />
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carat weight / Color / Clarity */}
        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <FilterBox label="Carat Weight">
            <button
              type="button"
              onClick={() => setWeightOpen((v) => !v)}
              aria-expanded={weightOpen}
              className="flex w-full items-center justify-between text-xs font-semibold tracking-[0.15em] text-ice-100 uppercase"
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
                <div className="absolute top-full left-0 z-20 mt-2 w-[280px] rounded-lg border border-gold-500/30 bg-navy-950 p-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
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
                            : "text-ice-100/70 hover:bg-ice-100/10 hover:text-ice-100"
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

          <FilterBox label="Color">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
              {COLORS.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={`px-1.5 py-0.5 text-xs font-semibold tracking-wide transition-colors ${
                    color === c
                      ? "text-gold-500 underline underline-offset-4"
                      : "text-ice-100/70 hover:text-ice-100"
                  } ${i < COLORS.length - 1 ? "border-r border-ice-100/10" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </FilterBox>

          <FilterBox label="Clarity">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
              {CLARITIES.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClarity(c)}
                  aria-pressed={clarity === c}
                  className={`px-1.5 py-0.5 text-xs font-semibold tracking-wide transition-colors ${
                    clarity === c
                      ? "text-gold-500 underline underline-offset-4"
                      : "text-ice-100/70 hover:text-ice-100"
                  } ${i < CLARITIES.length - 1 ? "border-r border-ice-100/10" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </FilterBox>
        </div>

        {/* CTAs */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PillButton href="#contact" variant="outline" size="md">
            Search Earth Mined Diamonds
          </PillButton>
          <PillButton href="#contact" variant="solid" size="md">
            Search Lab Grown Diamonds
          </PillButton>
        </div>
      </div>
    </section>
  );
}
