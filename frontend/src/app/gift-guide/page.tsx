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
import { GiftGuideColor } from "@/components/gift-guide/GiftGuideColor";
import { GiftGuideConnect } from "@/components/gift-guide/GiftGuideConnect";
import { PartnerMarquee } from "@/components/nav/PartnerMarquee";

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

/**
 * The page ground: warm champagne ivory under a faint paper grain
 * (public/gift-guide/paper-grain.svg, a 220px tiling noise), so the plain
 * sections read as printed card rather than flat screen white. Sections
 * without a banner are transparent and sit on it.
 *
 * The page runs edge to edge: it narrows the site's --spacing-edge gutter
 * (max(1.25rem, 5.5vw) in globals.css) to 3vw for this route only (never
 * under 16px on phones), so every px-edge, mx-edge and ml-edge in the
 * gift-guide sections leaves the same small margin left and right.
 * --gift-gap is the matching space above and below the plain sections, a
 * little more than the side gutter (about 24px on phones, 50px at 1440).
 *
 * A thin white line runs between every two sections, from the masthead
 * down to the footer, so each banner and fold reads as its own panel.
 */
export default function GiftGuidePage() {
  return (
    <div data-no-navbar className={`${bodoniModa.variable} ${cormorantItalic.variable} min-h-svh bg-[#f5efe4] [--spacing-edge:max(1rem,3vw)] [--gift-gap:clamp(1.5rem,3.5vw,3.5rem)] bg-[url(/gift-guide/paper-grain.svg)]`}>
      <div className="[&>*+*]:border-t-[3px] [&>*+*]:border-white">
        <GiftGuideHero />
        <GiftGuideTrends />
        <GiftGuideJewelryTypes />
        <GiftGuideBrilliance />
        <GiftGuideBridal />
        <GiftGuideBestsellers />
        <GiftGuideCustom />
        <GiftGuideBezel />
        <GiftGuideColor />
        <GiftGuideConnect />
      </div>
      {/* The site chrome is hidden on this route (layout.tsx), so the home
          page's yellow partner belt is added here to close the page */}
      <PartnerMarquee />
    </div>
  );
}
