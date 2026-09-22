import { Cormorant_Garamond, Italiana } from "next/font/google";

/**
 * Display font definitions.
 *
 * Next's docs call this a "font definitions file" and it exists for a specific
 * reason: every call to a font loader hosts a separate instance of that font, so
 * a face used in more than one component has to be declared in exactly one place
 * or it downloads twice. Italiana is used by both the navbar masthead and the
 * hero lockup, which is what forced this out of the hero folder.
 *
 * Neither face is wired into the theme's `--font-display`. That token is
 * referenced by eighteen files, so remapping it would turn every heading on the
 * site serif. These are opted into per element instead.
 */

/**
 * The hero headline. Two weights: a display serif at hero size needs exactly
 * one, but 300 sits alongside 400 so the headline can be taken lighter without a
 * round trip. Every extra weight is a real download on a hero whose LCP is
 * already delayed by the intro, which is why the list stops at two.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

/**
 * The AMIPI wordmark. Italiana ships a single weight, which suits it — the face
 * is a high-contrast deco roman designed for display capitals, and it is the one
 * candidate here built for exactly this job rather than adapted to it.
 *
 * Because 400 is all there is, any `font-bold` or `font-extrabold` left on an
 * element using it is a lie: the browser would synthesise a fake bold and smear
 * the hairlines that are the whole point of the face.
 */
export const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
