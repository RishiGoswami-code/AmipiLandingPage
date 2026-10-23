/*
 * The gift guide's shared styles, defined once so every section reads as
 * one page rather than a stack of separately styled folds:
 *
 * - One ground: the page's warm cream runs behind every section. Sections
 *   are separated by even spacing only (FOLD), never by dividers.
 * - Four text roles, each its own colour: navy headings in Cormorant
 *   Italic, centred and one size everywhere (HEADING); antique-gold
 *   sub-headings (SUBHEAD); slate grey-navy body text (BODY); and the red
 *   call to action (GiftGuideButton, coloured from the page's --gift-cta).
 * - One card: white, rounded, with a soft gold edge and glow (CARD).
 * - The same few festive touches in every section: a thin gold ribbon line
 *   under each heading (SectionHeading) and faint gold sparkles in a card's
 *   corner (Sparkles).
 *
 * The masthead, hero, Trends and Jewelry Types have moved on to the
 * evergreen-and-white bands further down this file.
 */

/** Navy, for headings, product names and links. */
export const NAVY = "#0b1a3d";

/** Antique gold, a step deeper than the champagne on the dark hero, so it
 * reads on the cream and white. */
export const DEEP_GOLD = "#8a6630";

/** The size every section heading takes, the hero's included. */
export const HEADING_SIZE = "text-[clamp(2.5rem,4.4vw,4.5rem)]";

/** A section heading: navy Cormorant Italic, centred. */
export const HEADING = `text-center font-[family-name:var(--font-cormorant-italic)] ${HEADING_SIZE} leading-[1.08] font-medium text-balance italic text-[#0b1a3d]`;

/** A sub-heading: Cormorant Italic in antique gold, one size everywhere. */
export const SUBHEAD_TYPE =
  "font-[family-name:var(--font-cormorant-italic)] text-[clamp(1.5rem,2.2vw,2.125rem)] leading-snug font-medium italic";
export const SUBHEAD = `${SUBHEAD_TYPE} text-[#8a6630]`;

/** Body text: slate grey-navy, one size everywhere. */
export const BODY_TYPE = "text-[clamp(1rem,1.2vw,1.1875rem)] leading-relaxed";
export const BODY = `${BODY_TYPE} text-[#0b1a3d]/75`;

/** A product or category name: bold navy, centred. */
export const NAME = "text-center text-[0.9375rem] leading-snug font-bold text-[#0b1a3d]";

/** The one card: white, rounded, with a soft gold edge and a warm glow. */
export const CARD =
  "rounded-2xl border border-[#d4b06a]/40 bg-white shadow-[0_0_0_4px_rgba(223,191,123,0.08),0_26px_60px_-38px_rgba(138,102,48,0.55)]";

/** One section's box: the page gutter left and right, and the page's one
 * vertical rhythm above and below, so every gap between sections is the
 * same. */
export const FOLD = "px-edge py-[calc(var(--gift-gap)*0.8)]";

/** A four-point sparkle, the page's one festive mark. */
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

/**
 * Faint gold sparkles for a card's corner: three marks of different sizes,
 * low enough in contrast that they read as glints, not decoration. Place
 * inside a `relative` box; `corner` picks which corner. From 1024px only:
 * narrower, the copy fills the card's width and the marks would cross it.
 */
export function Sparkles({ corner = "top-right" }: { corner?: "top-right" | "top-left" }) {
  const side = corner === "top-right" ? "right-6" : "left-6";
  return (
    <div aria-hidden className={`pointer-events-none absolute top-6 hidden h-14 w-16 text-[#c9a04f] opacity-45 lg:block ${side}`}>
      <Sparkle className="absolute top-0 right-3 h-6 w-6" />
      <Sparkle className="absolute top-7 right-0 h-3 w-3" />
      <Sparkle className="absolute top-8 right-9 h-2.5 w-2.5" />
    </div>
  );
}

/** The thin gold ribbon line under every heading, a sparkle at its centre. */
export function RibbonLine() {
  return (
    <span aria-hidden className="mx-auto mt-4 flex w-44 items-center gap-2.5 text-[#b8904e]">
      <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,#b8904e)]" />
      <Sparkle className="h-3 w-3" />
      <span className="h-px flex-1 bg-[linear-gradient(270deg,transparent,#b8904e)]" />
    </span>
  );
}

/**
 * A section's heading block: the navy heading, the gold ribbon line under
 * it, and an optional line of body text, all centred.
 */
export function SectionHeading({
  id,
  title,
  intro,
}: {
  id: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-[60rem] text-center">
      <h2 id={id} className={HEADING}>
        {title}
      </h2>
      <RibbonLine />
      {intro && <p className={`mx-auto mt-5 max-w-[56ch] text-pretty ${BODY}`}>{intro}</p>}
    </div>
  );
}

/**
 * A contact link's label (phone, email) whose hover turns it bold without
 * moving anything: an invisible bold copy underneath reserves the bold
 * width from the start.
 */
export function SteadyBold({ children }: { children: string }) {
  return (
    <span
      data-label={children}
      className="inline-flex flex-col after:invisible after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)]"
    >
      {children}
    </span>
  );
}

/** The hover the contact links share: dark, bold and underlined. */
export const CONTACT_HOVER =
  "transition-colors hover:font-bold hover:text-[#0b1a3d] hover:underline hover:underline-offset-4";

/** The same hover on the evergreen masthead: ivory, bold and underlined. */
export const CONTACT_HOVER_LIGHT =
  "transition-colors hover:font-bold hover:text-white hover:underline hover:underline-offset-4";

/*
 * The evergreen-and-white redesign (the team's mockups in frontend/Update),
 * so far for the masthead, hero, Trends and Jewelry Types: full-width bands
 * that alternate between deep evergreen and white, meeting on hard edges,
 * with upright Cormorant headings over a small tracked eyebrow and a short
 * gold rule. The sections further down keep the cream styles above until
 * they move over too.
 */

/** Deep evergreen, sampled from the mockups. The page also sets it as
 * --gift-green (app/gift-guide/page.tsx), which the bands paint with. */
export const GREEN = "#0f3b2a";

/** Near-black with a hint of green, for headings and names on white. */
export const INK = "#141a17";

/** Champagne, for eyebrows and rules on the evergreen. */
export const CHAMPAGNE = "#d9b877";

/** A band heading: upright Cormorant, centred, smaller than the italic. */
export const DISPLAY =
  "text-center font-[family-name:var(--font-cormorant)] text-[clamp(2.25rem,3.6vw,3.75rem)] leading-[1.1] font-medium text-balance";

/** The small tracked capitals above a heading or under a globe. */
export const EYEBROW = "text-[11px] leading-snug font-semibold tracking-[0.32em] uppercase";

/** An evergreen band and a white one: the ground, the text colour and the
 * band's vertical rhythm. */
export const BAND_GREEN = "bg-(--gift-green) text-[#f5efe4] py-[calc(var(--gift-gap)*0.9)]";
export const BAND_WHITE = "bg-white text-[#141a17] py-[calc(var(--gift-gap)*0.9)]";

/**
 * A band's heading block, after the mockups: an optional eyebrow, the
 * heading, a short gold rule with a sparkle at its centre, and an optional
 * line of body text. `tone` is
 * the band it sits on - ivory and champagne on the evergreen, ink and
 * antique gold on white.
 */
export function BandHeading({
  id,
  title,
  eyebrow,
  intro,
  tone,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  /** An optional line of body text under the rule. */
  intro?: string;
  tone: "green" | "white";
}) {
  const gold = tone === "green" ? CHAMPAGNE : DEEP_GOLD;
  return (
    <div className="mx-auto max-w-[60rem] text-center">
      {eyebrow && (
        <p className={`mb-3 ${EYEBROW}`} style={{ color: gold }}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={DISPLAY} style={{ color: tone === "green" ? "#f5efe4" : INK }}>
        {title}
      </h2>
      <span aria-hidden className="mx-auto mt-4 flex w-32 items-center gap-2.5" style={{ color: gold }}>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,currentColor)]" />
        <Sparkle className="h-2.5 w-2.5" />
        <span className="h-px flex-1 bg-[linear-gradient(270deg,transparent,currentColor)]" />
      </span>
      {intro && (
        <p
          className={`mx-auto mt-5 max-w-[56ch] text-pretty ${BODY_TYPE}`}
          style={{ color: tone === "green" ? "rgb(245 239 228 / 0.8)" : "rgb(20 26 23 / 0.7)" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
