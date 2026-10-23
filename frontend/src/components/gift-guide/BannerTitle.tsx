import type { ReactNode } from "react";

/*
 * The gift guide's type scale, in one place so every section uses the same
 * faces, sizes and colours:
 *
 * - Headings: Cormorant Garamond Italic, one size for every section. A
 *   two-part title adds a gold Bodoni accent word on a second line
 *   (BannerTitle below).
 * - Subheadings (the hero's tagline, "Why Custom Jewelry?"): Cormorant
 *   Italic a few steps down.
 * - Body text: the site's Manrope, one size for every section's paragraph.
 *
 * Colours: on the dark banners, ivory headings, ivory/80 body and the
 * champagne accent; on the light grounds, navy headings, navy/75 body and
 * the deeper antique-gold accent, which holds on cream where champagne
 * would wash out.
 */

/** The size every section heading takes. */
export const HEADING_SIZE = "text-[clamp(2.75rem,5.2vw,5.5rem)]";

/** A one-part section heading ("Top Holiday Trends"). */
export const HEADING = `font-[family-name:var(--font-cormorant-italic)] ${HEADING_SIZE} leading-[1.06] font-medium italic`;

/** A subheading under a section heading. */
export const SUBHEAD =
  "font-[family-name:var(--font-cormorant-italic)] text-[clamp(1.5rem,2.2vw,2.125rem)] leading-snug font-medium italic";

/** Every section's paragraph. */
export const SUBTEXT = "text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed";

/** Body text colour on the dark banners and on the light grounds. */
export const SUBTEXT_ON_DARK = "text-[#f5efe4]/80";
export const SUBTEXT_ON_LIGHT = "text-[#0b1a3d]/75";

/** Champagne gold for the accent word on the dark banners. */
export const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/** Antique gold for the accent word on the light grounds. */
export const GOLD_TEXT_ON_LIGHT =
  "bg-[linear-gradient(180deg,#d4b06a_0%,#b8904e_50%,#8a6630_100%)] bg-clip-text text-transparent";

/**
 * The two-line title the gift guide's sections share, after "The Season
 * Starts with Diamonds": a Cormorant Italic lead line over a gold Bodoni
 * accent word, the second line pushed right so the two stagger rather than
 * share a left edge. With no lead it is the accent word alone ("Color"),
 * at the heading size.
 *
 * The lead line carries a hanging indent, so if it wraps its continuation
 * steps in too instead of sitting flush under the first word. A space
 * between the spans keeps the heading's accessible name as one phrase
 * ("Bezel-Set Styles", not "Bezel-SetStyles"). The lead takes the
 * section's text colour.
 */
export function BannerTitle({
  id,
  lead,
  accent,
  as: Tag = "h2",
  tone = "dark",
  uppercase = false,
}: {
  id?: string;
  /** Text, or text with a <br /> where a long lead should break. */
  lead?: ReactNode;
  accent: string;
  /** The hero's title is the page's h1. */
  as?: "h1" | "h2";
  /** `light` for a cream ground: the antique-gold accent. */
  tone?: "dark" | "light";
  /** Set the accent word in tracked capitals. */
  uppercase?: boolean;
}) {
  return (
    <Tag id={id} className="leading-none">
      {lead && (
        <>
          <span
            className={`block pl-[0.9em] -indent-[0.9em] max-sm:pl-0 max-sm:indent-0 max-sm:text-balance font-[family-name:var(--font-cormorant-italic)] ${HEADING_SIZE} leading-[1.06] font-medium italic`}
          >
            {lead}
          </span>{" "}
        </>
      )}
      <span
        className={`block font-[family-name:var(--font-bodoni)] leading-[1.08] font-medium ${
          // Alone, the accent word is the heading, so it takes the heading size
          lead ? "mt-[0.1em] ml-[1.4em] text-[clamp(2.375rem,4.4vw,4.75rem)] max-sm:ml-0" : HEADING_SIZE
        } ${
          uppercase ? "tracking-[0.08em] uppercase" : "tracking-[0.03em]"
        } ${tone === "light" ? GOLD_TEXT_ON_LIGHT : GOLD_TEXT}`}
      >
        {accent}
      </span>
    </Tag>
  );
}
