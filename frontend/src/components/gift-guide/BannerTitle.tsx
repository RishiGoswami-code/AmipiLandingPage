import { HEADING_SIZE } from "./GiftGuideTheme";

/** Champagne gold for the accent line on the dark hero band. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/**
 * The hero's two-line title, after the earlier "The Season Starts with
 * Diamonds" banner: an ivory Cormorant Italic lead line over a champagne
 * Bodoni accent, the second line pushed right so the two stagger rather than
 * share a left edge (on phones both are centred). The one heading on the
 * page that sits on dark imagery, so the one that is not navy; the lead is
 * the page's heading size, the accent a step smaller.
 *
 * A space between the spans keeps the heading's accessible name as one
 * phrase ("Holiday Gift Guide", not "HolidayGift Guide"). The lead takes the
 * band's text colour.
 */
export function BannerTitle({
  lead,
  accent,
  as: Tag = "h2",
}: {
  lead: string;
  accent: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag className="leading-none">
      <span
        className={`block font-[family-name:var(--font-cormorant-italic)] ${HEADING_SIZE} leading-[1.06] font-medium italic`}
      >
        {lead}
      </span>{" "}
      <span
        className={`mt-[0.1em] ml-[1.4em] block font-[family-name:var(--font-bodoni)] text-[clamp(2.25rem,4vw,4rem)] leading-[1.08] font-medium tracking-[0.03em] max-sm:ml-0 ${GOLD_TEXT}`}
      >
        {accent}
      </span>
    </Tag>
  );
}
