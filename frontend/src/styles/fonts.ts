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
 * One-off serif, scoped to the section headings that explicitly ask for the
 * editorial engagement-ring-site look (NewArrivals, CollectionsPreview,
 * CategoriesPreview, DiamondSearch, TradeShows, all via
 * `font-[family-name:var(--font-playfair)]`) - the rest of the site stays
 * Manrope per the decision above.
 */
export const playfairDisplay = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/**
 * The hero headline, applied as `cormorant.className` rather than through a
 * theme token - `--font-display` is referenced by eighteen files, so remapping
 * it would turn every heading on the site serif.
 *
 * Weight is the whole point of the face at hero size: the headline took it to
 * `font-light` (300), which the 300-700 axis reaches without a second file.
 *
 * Currently unimported: the hero tagline it was chosen for is parked (see
 * heroIntro.ts), and nothing else on the site is serif-by-Cormorant. Kept
 * declared, since the definition is the restore point - but with `preload:
 * false`, for the same reason geistMono carries it above. Preloading is decided
 * per font-definitions module, not per component, so layout.tsx importing this
 * file was enough to put a <link rel="preload"> for this woff2 on every route
 * even with no element left to paint it. Restoring the headline means dropping
 * this line again.
 */
export const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  style: "normal",
  display: "swap",
  preload: false,
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
