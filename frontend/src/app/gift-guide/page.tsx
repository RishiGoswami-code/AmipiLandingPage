import type { Metadata } from "next";
import localFont from "next/font/local";
import { GiftGuideHero } from "@/components/gift-guide/GiftGuideHero";

/*
 * Catalog display face for the gift guide only, vendored as latin-subset
 * variable woff2s in src/styles/fonts for the same reason as fonts.ts (no
 * fonts.googleapis.com fetch at build time). It is not declared anywhere else,
 * so the one-loader-call-per-family rule still holds. The small print on the
 * catalog mockups is the site's Manrope - a second sans at 9-10px was
 * indistinguishable from it and not worth the download.
 *
 * `preload: false`: in this Next/Turbopack build, preloaded fonts get
 * a <link rel="preload"> on every route no matter where they are declared
 * (checked in the built index.html and about.html), which would make the main
 * site download ~100 KB of type it never paints. The cost is a brief
 * fallback-to-Bodoni swap on first paint here, narrowed by adjustFontFallback.
 */

/**
 * Bodoni Moda - high-contrast Didone, the closest match to the "CATALOG"
 * masthead in landingPageTheme.jpeg. Variable weight plus an optical-size axis
 * the browser drives from font-size, so big headings get fine hairlines and
 * small labels stay sturdy. Italic is its own file so the italic "Catalog" in
 * the headline is not a synthesised slant.
 */
const bodoniModa = localFont({
  src: [
    { path: "../../styles/fonts/bodoni-moda-latin.woff2", weight: "400 900", style: "normal" },
    { path: "../../styles/fonts/bodoni-moda-italic-latin.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Holiday Gift Guide — AMIPI",
  description:
    "AMIPI's holiday gift guide - diamond essentials, holiday trends and new collections for Christmas, New Year and the winter season.",
};

export default function GiftGuidePage() {
  return (
    <div className={bodoniModa.variable}>
      <GiftGuideHero />
    </div>
  );
}
