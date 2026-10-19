/** Champagne gold for the accent word - the same ramp as "Gift Guide" in the
 * hero. Light enough to hold up on the dark banners. */
export const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

import type { ReactNode } from "react";

/**
 * The two-line title the gift guide's banners share, after the hero's
 * "Holiday / Gift Guide": a large Cormorant Italic lead line over a gold
 * Bodoni accent word, the second line pushed right so the two stagger rather
 * than share a left edge.
 *
 * The lead line carries a hanging indent, so if it wraps on a narrow screen
 * its continuation steps in too instead of sitting flush under the first
 * word. A space between the spans keeps the heading's accessible name as one
 * phrase ("Bezel-Set Styles", not "Bezel-SetStyles").
 */
export function BannerTitle({
  id,
  lead,
  accent,
  uppercase = false,
  long = false,
}: {
  id: string;
  /** Text, or text with a <br /> where a long lead should break. */
  lead: ReactNode;
  accent: string;
  /** Set the accent word in tracked capitals, as on "STYLES". */
  uppercase?: boolean;
  /** A lead of several words, broken over two lines: set a step smaller so
   * the title keeps to the banner's height. The hanging indent steps the
   * second line in, so the three lines stagger. */
  long?: boolean;
}) {
  return (
    <h2 id={id} className="leading-none">
      <span
        className={`block pl-[0.9em] -indent-[0.9em] font-[family-name:var(--font-cormorant-italic)] ${
          long
            ? "text-[clamp(2.5rem,4.3vw,4.5rem)]"
            : "text-[clamp(2.75rem,5.2vw,5.5rem)]"
        } leading-[1.06] font-medium italic`}
      >
        {lead}
      </span>{" "}
      <span
        className={`mt-[0.1em] ml-[1.4em] block font-[family-name:var(--font-bodoni)] text-[clamp(2.375rem,4.4vw,4.75rem)] leading-[1.08] font-medium ${
          uppercase ? "tracking-[0.08em] uppercase" : "tracking-[0.03em]"
        } ${GOLD_TEXT}`}
      >
        {accent}
      </span>
    </h2>
  );
}
