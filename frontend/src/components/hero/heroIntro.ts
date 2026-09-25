/**
 * Choreography data for the hero's on-load sequence — the intro (`BEATS`) and
 * the copy hand-off that follows it (`REVEAL`).
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
  /**
   * Position on the owning timeline, in seconds. `BEATS` is measured from page
   * load; `REVEAL` is measured from its own start (see that table's note).
   */
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
  /**
   * Hand-off: navbar and booking card fade in, scroll is released, and the
   * copy reveal below begins.
   *
   * Descriptive rather than driving — there is no tween here. The engulf is the
   * intro's last tween, so its end is where the timeline completes, the
   * `data-hero-intro` attribute flips to "done" and hero.css runs the chrome's
   * own `dur`-long fade. Listed anyway so the table still accounts for what is
   * on screen at that moment; `at` must therefore equal the engulf's end, which
   * the guard below enforces. (It previously read 3.35, which described an
   * intent the code never implemented.)
   */
  chromeIn: { at: 3.58, dur: 0.6 },
} as const satisfies Record<string, Beat>;

/**
 * Wall-clock length of the intro, in seconds — and the origin `REVEAL`'s
 * positions are measured from.
 *
 * Derived from the engulf rather than from `chromeIn` because the engulf is the
 * last actual tween, and the timeline's own duration is what triggers the
 * hand-off. Rounded to 2dp so a future retiming cannot fail the guard below on
 * float error alone — 2.7 + 0.85 is 3.5499999999999998, not 3.55.
 */
export const INTRO_TOTAL =
  Math.round((BEATS.engulf.at + BEATS.engulf.dur) * 100) / 100;

/* Keeps the documented hand-off in step with the tween that actually causes it.
   Same dev-time-only guard pattern as the carat brackets in DiamondSearch: a
   hand-typed number that has to agree with a derived one, checked where it is
   declared rather than discovered later as a timing bug. */
if (process.env.NODE_ENV !== "production") {
  if (BEATS.chromeIn.at !== INTRO_TOTAL) {
    throw new Error(
      `BEATS.chromeIn.at (${BEATS.chromeIn.at}s) must equal the end of the engulf (${INTRO_TOTAL}s) — the intro completes there, and that completion is what releases the chrome.`,
    );
  }
}

/**
 * The copy hand-off: the centre lockup dissolves and the hero's copy —
 * anniversary line, then CTA — takes its place.
 *
 * Positions here are relative to the *reveal's own* start, not to page load.
 * Add `INTRO_TOTAL` for wall-clock time. The reveal is a separate timeline
 * played from the intro's `onComplete` rather than more beats on the intro's
 * clock, which is what makes the hand-off causal: skip the intro at 0.5s and
 * the reveal starts at 0.5s too, instead of a timer leaving a three-second dead
 * pause on a hero that has already resolved.
 *
 * The lockup leaves by reversing its own entrance rather than by doing
 * something new — the two text lines drift back out along the axis they
 * converged on, and the mark dissolves back into the blur it arrived from. The
 * mark goes last: the frame releases, then the centrepiece, so the eye stays
 * anchored at centre while the incoming type establishes itself.
 */
export const REVEAL = {
  /** 9. "ESTABLISHED 1976" and the AMIPI wordmark fade back outward. */
  lockupOut: { at: 0.0, dur: 0.68 },
  /** 10. The bull mark dissolves — scales up into a blur. */
  markOut: { at: 0.12, dur: 0.68 },
  /** 11. Kicker fades up, overlapping the tail of the dissolve. */
  kicker: { at: 0.22, dur: 0.5 },
  /** 12. CTA fades up behind it. */
  cta: { at: 0.58, dur: 0.45 },
} as const satisfies Record<string, Beat>;

/* ---------------------------------------------------------------------------
   Parked: the tagline beats.

   The headline ("No Bull." / "Just Diamonds.") and the gold hairline that
   separated it from the CTA are out of the hero for now, so their beats are out
   of this table — a beat nothing tweens is a timing document that lies. Their
   values are recorded here instead, because the copy is expected back:

     headline: { at: 0.52, dur: 0.7 }   // lines rolled up out of clip boxes,
                                        //   ease expo.out, stagger 0.12s
     divider:  { at: 1.15, dur: 0.55 }  // hairline drew itself from the left,
                                        //   ease power2.inOut
     cta:      { at: 1.3,  dur: 0.45 }  // followed the hairline

   The headline waited until 0.52 rather than following the kicker in because on
   desktop "Established 1976" sits at left: 20%, on the composition centreline —
   the same row the headline's second line occupied. The two genuinely overlapped
   in space, so they could not also overlap in time: an earlier cut had "JUST
   DIAMONDS." rolling into a box that still had legible letterspaced caps in it,
   which read as stray text rather than as a crossfade. Restoring the headline
   means restoring that 0.3s gap with it.

   With the headline gone the CTA is the only thing left to follow the kicker,
   and holding it until 1.3s would leave a second of a near-empty stage after the
   dissolve has finished. It now trails the kicker by the same ~0.36s the kicker
   trails the lockup's exit, so the two lines read as one pair arriving rather
   than as two separate events.
--------------------------------------------------------------------------- */

/**
 * How far "Established 1976" and the wordmark drift as they leave, in pixels.
 *
 * Mirrored: the wordmark takes the positive value. Half the 48px they entered
 * from — an exit only has to register as an exit, and the fade is doing most of
 * the work, so matching the entrance distance would read as a retreat.
 */
export const LOCKUP_DRIFT_PX = 24;

/**
 * The mark's dissolve.
 *
 * Beat 1 brought it in from `scale: 0.92, blur(6px)`, so leaving through a blur
 * is the same grammar read backwards. It scales *up* rather than back down,
 * though: growing into the blur reads as dissolving into light, where shrinking
 * would read as being withdrawn. Slightly past the blur radius it arrived with,
 * so the exit is unmistakably an exit and not a rewind.
 */
export const MARK_EXIT = { scale: 1.06, blur: 8 } as const;

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
  /**
   * Out of the hero for now — the anniversary line carries the message on its
   * own and the CTA follows it directly. Kept here, unused, because the tagline
   * is expected back; see the parked beats above for the motion that went with
   * it.
   */
  headline: ["No Bull.", "Just Diamonds."],
  ctaLabel: "Explore Amipi",
  ctaHref: "/categories",
  alt: {
    backdrop:
      "Model wearing a graduated round-brilliant diamond tennis necklace, lit against a dark espresso backdrop",
    earrings: "Diamond drop earrings worn against a dark espresso backdrop",
    bracelet: "Diamond tennis bracelet worn on the wrist, hand relaxed",
  },
} as const;
