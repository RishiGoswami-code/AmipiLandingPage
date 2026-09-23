/**
 * Choreography data for the hero's on-load intro.
 *
 * Deliberately pure: no GSAP import, no DOM access, no React. Everything here
 * is a number, a string or a function of its arguments, which keeps the whole
 * timing model in one readable place and makes retiming a single-file edit
 * rather than a hunt through tween calls.
 *
 * Card *geometry* is NOT here — it lives in hero.css, because it is
 * breakpoint-dependent and CSS is where responsive logic belongs. hero.css
 * also self-enforces the one geometric invariant that matters (see
 * --hero-pan-max there), so there is nothing to duplicate on this side.
 */

export interface Beat {
  /** Absolute position on the timeline, in seconds. */
  readonly at: number;
  /** Tween duration, in seconds. */
  readonly dur: number;
}

/**
 * The eight beats of the intro, plus the chrome hand-off.
 *
 * Positions are absolute rather than relative so that reading the table tells
 * you what is on screen at any given moment, and so that nudging one beat
 * cannot silently cascade into the rest of the sequence.
 *
 * Beats 6 and 7 (the two card exits) overlap by 0.15s on purpose. Run them
 * back to back and the eye reads a queue; overlap them and it reads as one
 * gesture throwing both cards apart.
 */
export const BEATS = {
  /** 1. Bull mark resolves at centre: fade, settle up from 0.92, blur off. */
  markIn: { at: 0.0, dur: 0.7 },
  /** 2. "ESTABLISHED 1976" and the AMIPI wordmark split to the edges. */
  split: { at: 0.55, dur: 0.8 },
  /** 3. Earrings card (4:5) appears behind the mark. */
  cardOneIn: { at: 1.0, dur: 0.55 },
  /** 4. Bracelet card (3:2) stacks behind it. */
  cardTwoIn: { at: 1.22, dur: 0.55 },
  /** 5. Necklace card (16:9) stacks behind that — mask opens from below zero. */
  cardThreeIn: { at: 1.44, dur: 0.55 },
  /** 6. Earrings card leaves toward bottom-right. */
  cardOneOut: { at: 1.95, dur: 0.85 },
  /** 7. Bracelet card leaves toward bottom-left. */
  cardTwoOut: { at: 2.1, dur: 0.85 },
  /** 8a. The necklace card tightens a touch — the "pop" before it opens. */
  pop: { at: 2.55, dur: 0.18 },
  /** 8b. …then engulfs the viewport and becomes the page background. */
  engulf: { at: 2.73, dur: 0.85 },
  /** Hand-off: navbar and booking card fade in, scroll is released. */
  chromeIn: { at: 3.35, dur: 0.6 },
} as const satisfies Record<string, Beat>;

/** Wall-clock length of the whole intro, in seconds. */
export const INTRO_TOTAL = BEATS.chromeIn.at + BEATS.chromeIn.dur;

/**
 * Values for `--hero-mask`, the single scalar that drives the background's
 * clip window *and* its internal pan (see hero.css).
 *
 * 0 = the window is exactly card-sized. 1 = full bleed. Negative values pull
 * the window in tighter than the card, which is how both the entrance and the
 * pop are expressed — one mechanism, three uses.
 */
export const MASK = {
  /** Beat 5 starts here, so the card grows into place rather than just fading. */
  enter: -0.08,
  /** Beat 8a dips to here, the inhale before the expansion. */
  pop: -0.05,
  /** Card-sized. */
  card: 0,
  /** Full bleed. */
  full: 1,
} as const;

/** Tilt applied to a departing card, in degrees. Mirrored for the other one. */
export const EXIT_ROTATION_DEG = 7;

/**
 * The exit fade runs inside the exit move rather than alongside it.
 *
 * Offsets are relative to the start of the card's own exit tween. Ending the
 * fade at 0.78s of an 0.85s move means the card is invisible while still
 * marginally on screen — the brief asked for cards that "fade as they approach
 * the edge", not cards that slide fully out and then vanish.
 */
export const EXIT_FADE = { offset: 0.35, dur: 0.43 } as const;

export type ExitDirection = "bottom-left" | "bottom-right";

export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface Vector {
  readonly x: number;
  readonly y: number;
}

/**
 * Travel distance, in pixels, for a card leaving the stage.
 *
 * Measured rather than hardcoded in viewport units because the cards are sized
 * in svh/vw and their real pixel size depends on the breakpoint, the device
 * pixel ratio and — on mobile — whether the address bar is currently
 * collapsed. Callers pass the live `getBoundingClientRect()` of the card and
 * the stage, so the same table produces correct motion on a 360px phone and a
 * 3440px ultrawide.
 *
 * A card starts centred, so clearing the edge takes half the stage plus half
 * the card. `EXIT_FADE` finishes before the move does, so the card is already
 * invisible on arrival; the returned distance only has to be plausible, not
 * generous, which keeps the velocity from looking flung.
 */
export function exitVector(
  card: Size,
  stage: Size,
  direction: ExitDirection,
): Vector {
  const x = stage.width / 2 + card.width / 2;
  const y = stage.height / 2 + card.height / 2;

  return { x: direction === "bottom-left" ? -x : x, y };
}

/**
 * Every string the hero renders, in one place.
 *
 * The founding year and the anniversary agree: 2026 − 1976 = 50, which matches
 * both `kicker` here and the footer's "Celebrating 50 Years Of AMIPI". Worth
 * keeping in step — the two strings appear within about four seconds of each
 * other, so a visitor can see both at once. (This previously read 1956, which
 * implied 70 years and contradicted both.)
 */
export const HERO_COPY = {
  established: "Established 1976",
  wordmark: "Amipi",
  kicker: "Celebrating 50 Years of AMIPI",
  headline: ["No Bull.", "Just Diamonds."],
  ctaLabel: "Start Your Diamond Search",
  ctaHref: "/collections",
  alt: {
    backdrop:
      "Model wearing a graduated round-brilliant diamond tennis necklace, lit against a dark espresso backdrop",
    earrings: "Diamond drop earrings worn against a dark espresso backdrop",
    bracelet: "Diamond tennis bracelet worn on the wrist, hand relaxed",
  },
} as const;
