import type { Metadata } from "next";
import localFont from "next/font/local";
import { GiftGuideHero } from "@/components/gift-guide/GiftGuideHero";
import { GiftGuideTrends } from "@/components/gift-guide/GiftGuideTrends";
import { GiftGuideJewelryTypes } from "@/components/gift-guide/GiftGuideJewelryTypes";
import { GiftGuideBrilliance } from "@/components/gift-guide/GiftGuideBrilliance";
import { GiftGuideBridal } from "@/components/gift-guide/GiftGuideBridal";
import { GiftGuideBestsellers } from "@/components/gift-guide/GiftGuideBestsellers";
import { GiftGuideCustom } from "@/components/gift-guide/GiftGuideCustom";
import { GiftGuideBezel } from "@/components/gift-guide/GiftGuideBezel";
import { GiftGuideColorOfYear } from "@/components/gift-guide/GiftGuideColorOfYear";
import { GiftGuideShopJewelry } from "@/components/gift-guide/GiftGuideShopJewelry";
import { GiftGuideStockingStuffers } from "@/components/gift-guide/GiftGuideStockingStuffers";

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

/**
 * Cormorant Garamond Italic - the "Holiday" line of the headline. The upright
 * Cormorant in fonts.ts has no italic file, so `italic` there would be a
 * synthesised slant; this is the real calligraphic italic. Declared here
 * rather than added to fonts.ts so it loads on /gift-guide only (fonts.ts is
 * imported by the root layout). A separate file from the upright face, so the
 * one-loader-call-per-family rule's concern - the same file downloading
 * twice - does not arise.
 */
const cormorantItalic = localFont({
  src: "../../styles/fonts/cormorant-garamond-italic-latin.woff2",
  variable: "--font-cormorant-italic",
  weight: "300 700",
  style: "italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Holiday Gift Guide — AMIPI",
  description:
    "AMIPI's holiday gift guide - diamond essentials, holiday trends and new collections for Christmas, New Year and the winter season.",
  alternates: { canonical: "/gift-guide" },
};

export default function GiftGuidePage() {
  return (
    <div className={`${bodoniModa.variable} ${cormorantItalic.variable} min-h-svh bg-[#fbfaf7]`}>
      <GiftGuideHero />
      <GiftGuideTrends />
      <GiftGuideJewelryTypes />
      <GiftGuideBrilliance />
      <GiftGuideBridal />
      <GiftGuideBestsellers />
      <GiftGuideCustom />
      <GiftGuideBezel />
      <GiftGuideColorOfYear />
      <GiftGuideShopJewelry />
      <GiftGuideStockingStuffers />
    </div>
  );
}
