import localFont from "next/font/local";

/**
 * Font definitions file.
 *
 * Next's docs call this a "font definitions file" and it exists for a specific
 * reason: every call to a font loader hosts a separate instance of that font, so
 * a face used in more than one component has to be declared in exactly one place
 * or it downloads twice. Italiana is used by both the navbar masthead and the
 * hero lockup, which is what forced this out of the hero folder; the layout's
 * three faces were folded in here afterwards so there is one list, not two.
 *
 * These are `next/font/local` against the woff2 files in ./fonts rather than
 * `next/font/google`. The loaders are otherwise identical in API - `.className`
 * and `.variable` behave the same - but the Google loader fetches the stylesheet
 * and every font file from fonts.googleapis.com at compile time, and a single
 * failed or oddly-shaped response there fails the whole compile with
 * `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`
 * (vercel/next.js#97378: the fetch is not retried). Google had served a
 * dynamic-subsetting URL - fonts.gstatic.com/l/font?kit=... - whose own query
 * string Turbopack cannot encode, which is what broke the dev compile. Vendoring
 * the files takes the network off the build path entirely.
 *
 * The files are the variable woff2s, latin subset, pulled from the same
 * fonts.gstatic.com URLs the Google loader would have used. Latin only, matching
 * the `subsets: ["latin"]` these faces were declared with - `next/font/local`
 * has no per-file unicode-range, so a second latin-ext @font-face at the same
 * weight and style would shadow the first rather than extend it.
 */

/**
 * Manrope end to end - headings and body both - matching the reference
 * (kora.framer.media) rather than pairing a serif display face with a separate
 * UI sans. One variable family, and `--font-sans` and `--font-display` in
 * globals.css both point at it.
 *
 * The axis is declared at its full 200-800 rather than the 300-800 the site
 * actually spans: it is one variable file either way, so narrowing the range
 * would only make `font-extralight` silently synthesise.
 */
export const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Arial",
});

/**
 * Wired to `--font-mono` for completeness. Nothing on the site currently sets
 * `font-mono`, so it is deliberately not preloaded - preloading costs a request
 * on every route for a face that may never be painted.
 */
export const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
});

/**
 * The previous section-heading serif, replaced by Cormorant Garamond below.
 *
 * Playfair is a transitional-to-Didone face whose appeal is the contrast between
 * hairline and stem, and every heading here was setting it at `font-semibold`,
 * which thickens the hairlines until the contrast is gone and what is left reads
 * as a default serif. Rather than re-tune weight and size on a face nobody
 * chose, the headings moved to Cormorant, which is built for this.
 *
 * Kept declared as the restore point, `preload: false` for the reason described
 * on geistMono: no element paints it now, and preloading is settled per
 * font-definitions module, so leaving the flag off would put a
 * <link rel="preload"> for this woff2 on every route regardless.
 */
export const playfairDisplay = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

/**
 * The section-heading serif: NewArrivals, ShopByCategory, CollectionsPreview,
 * DiamondSearch and TradeShows, all through
 * `font-[family-name:var(--font-cormorant)]`. The rest of the site stays Manrope
 * per the decision above.
 *
 * Applied through the CSS variable rather than `--font-display`, which eighteen
 * files reference - remapping that token would turn every heading on the site
 * serif, including card titles and nav labels.
 *
 * Two things to know when setting it. It has a small x-height for its em, so at
 * an identical `font-size` it reads noticeably smaller than Playfair did; every
 * heading that moved over went up one step on the type scale to compensate. And
 * the weight is the point of the face: 400 keeps the hairlines that make it look
 * like jewelry copy, where 600 would flatten them into the same mush Playfair
 * was in. Headings on dark grounds are the exception - optical thinning eats a
 * light serif reversed out of navy, so those take 500.
 *
 * It was originally vendored for the hero headline, which is parked (see
 * heroIntro.ts). Preloaded now that there are five painted headings per page.
 */
export const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/**
 * The AMIPI wordmark. Italiana ships a single weight, which suits it - the face
 * is a high-contrast deco roman designed for display capitals, and it is the one
 * candidate here built for exactly this job rather than adapted to it.
 *
 * Because 400 is all there is, any `font-bold` or `font-extrabold` left on an
 * element using it is a lie: the browser would synthesise a fake bold and smear
 * the hairlines that are the whole point of the face.
 */
export const italiana = localFont({
  src: "./fonts/italiana-latin.woff2",
  variable: "--font-italiana",
  weight: "400",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
