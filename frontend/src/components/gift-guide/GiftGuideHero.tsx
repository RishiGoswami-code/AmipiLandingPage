"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { italiana } from "@/styles/fonts";

gsap.registerPlugin(useGSAP);

/** The page ground around the banner: the masthead above it and the page below. */
const GROUND = "bg-[#fbfaf7]";

/** The navy velvet-and-ribbon banner. 3:1, with the ribbons at both ends and
 * plain navy through the middle-left, where the copy sits. */
const BANNER_SRC = "/gift-guide/navy-velvet-banner.webp";

/** Ivory for the copy on the navy banner. */
const IVORY = "#f5efe4";

/** Champagne gold for "Catalog". Light enough to hold up on the navy; the
 * darker antique gold used on the cream ground disappears against it. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/** The banner photo, filling whichever box it is placed in. */
function BannerImage({ position = "50% 50%" }: { position?: string }) {
  return (
    <Image
      src={BANNER_SRC}
      alt=""
      fill
      priority
      sizes="100vw"
      style={{ objectPosition: position }}
      className="object-cover"
    />
  );
}

/** The four tiles on the spread mockup, from GiftPageImages. All four are
 * portrait shots cropped to square tiles, so each sets the focal point the
 * crop keeps. Shown in colour - the photos were picked for it (the sapphire,
 * the red gloves), unlike the cover, which stays black-and-white. */
const SPREAD = [
  { src: "/gift-guide/rings.jpeg", position: "50% 55%" },
  { src: "/gift-guide/champagne-bracelet.jpeg", position: "50% 40%" },
  { src: "/gift-guide/sapphire-ring.jpeg", position: "50% 45%" },
  { src: "/gift-guide/pendant-gloves.jpeg", position: "50% 50%" },
];

/**
 * Holiday Gift Guide hero - trial design. The headline is laid out like the
 * banner on Stuller's holiday page: a large display word on the first line
 * and a serif capital word on the second, pushed right so the two lines stagger
 * rather than share a left edge. The collage on the right borrows the printed
 * catalog from landingPageTheme.jpeg; each page carries a single cover line.
 *
 * The banner is held to 60-70% of the viewport height on desktop (on phones
 * it stacks and takes its natural height). The masthead sits above it,
 * outside that height, the way Stuller's site header sits above its banner.
 *
 * Standalone: the root layout hides the site chrome on /gift-guide, so the
 * masthead wordmark is the way back home.
 */
export function GiftGuideHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-reveal]", { opacity: 0, y: 28, duration: 0.9, ease: "power3.out", stagger: 0.08 });
      // The catalog pages drop in one after the other. Their tilt is the CSS
      // `rotate` property, which GSAP's transform tween leaves alone.
      gsap.from("[data-page]", { opacity: 0, y: 60, duration: 1.2, ease: "power3.out", stagger: 0.15, delay: 0.2 });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={`${GROUND} text-[#141414]`}>
      {/* Masthead strip, on the cream above the banner */}
      <header
        data-reveal
        className="mx-edge flex items-center justify-between border-b border-[#141414]/15 pt-6 pb-4 text-[11px] tracking-[0.35em] text-[#141414]/60 uppercase"
      >
        {/* Same lockup as the Navbar - roundel plus Italiana at 0.06em - since
            this page hides the site chrome and the wordmark is the way home. */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <Image src="/icon.png" alt="" aria-hidden width={512} height={512} className="h-8 w-8 sm:h-9 sm:w-9" />
          <span
            className={`${italiana.className} text-xl tracking-[0.06em] text-[#141414] uppercase transition-colors hover:text-[#a8803f] sm:text-2xl`}
          >
            Amipi
          </span>
        </Link>
        <span className="hidden sm:block">Holiday 2026 · Winter Edition</span>
        <span>Vol. 01</span>
      </header>

      {/* Hero: 65% of the viewport on desktop. The navy band runs edge to edge
          but is shorter than the hero, so the catalog pages break out above
          and below it the way the products do on Stuller's banner. On phones,
          where the hero stacks, the band sits behind the copy only and the
          collage follows on the cream. */}
      <section className="relative isolate mt-6 grid items-center gap-10 pb-10 lg:mt-0 lg:h-[65svh] lg:min-h-[30rem] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:px-edge lg:py-[clamp(1rem,3vh,2rem)]">
        <div aria-hidden className="absolute inset-x-0 top-[13%] bottom-[13%] -z-10 hidden overflow-hidden bg-[#0b1a3d] lg:block">
          <BannerImage />
          {/* Soft navy pool behind the copy, so the left ribbon's sheen
              doesn't run through the paragraph */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_75%_at_24%_55%,rgba(5,13,35,0.7),transparent)]" />
        </div>

        {/* Copy - inset from the masthead edge so it sits nearer the collage */}
        <div
          className="relative isolate overflow-hidden bg-[#0b1a3d] px-edge py-14 sm:py-16 lg:overflow-visible lg:bg-transparent lg:px-0 lg:py-0"
          style={{ color: IVORY }}
        >
          {/* Phone-only copy of the band, anchored left so the satin ribbon shows */}
          <div aria-hidden className="absolute inset-0 -z-10 lg:hidden">
            <BannerImage position="0% 50%" />
            <div className="absolute inset-0 bg-[#050d23]/50" />
          </div>
          <div className="max-w-2xl lg:pl-4 xl:pl-[clamp(1.5rem,6vw,7rem)]">
          <h1 data-reveal className="leading-none">
            {/* Cormorant Garamond Italic (the real italic, loaded in the route's
                page.tsx) at 500 - heavy enough that its hairlines survive on
                the velvet, calligraphic without turning into a script. */}
            <span className="block font-[family-name:var(--font-cormorant-italic)] text-[clamp(3.5rem,min(7.5vw,11.5vh),6.25rem)] leading-[1.2] font-medium italic">
              Holiday
            </span>
            {/* Second line pushed right - the stagger on Stuller's "Magic /
                MOMENT" - so the two lines don't share a left edge. */}
            <span
              className={`mt-[0.2em] ml-[clamp(2.75rem,6.5vw,6.5rem)] block font-[family-name:var(--font-bodoni)] text-[clamp(2.25rem,min(4.8vw,7.5vh),4.25rem)] font-normal tracking-[0.06em] uppercase ${GOLD_TEXT}`}
            >
              Catalog
            </span>
          </h1>

          <div data-reveal className="mt-[clamp(1rem,3vh,1.75rem)] flex items-center gap-4">
            <span className="h-px w-12 bg-[#dcbc7e]/60" />
            <span className="text-xs tracking-[0.25em] whitespace-nowrap text-[#f5efe4]/75 uppercase sm:tracking-[0.35em]">
              Christmas · New Year · Winter
            </span>
          </div>

          <p data-reveal className="mt-[clamp(0.75rem,2.5vh,1.5rem)] max-w-[42ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-[#f5efe4]/80">
            One page, every gift your customers will ask for this season - the
            essentials that sell themselves, the trends worth stocking, and the
            new collections ready for the holiday counter.
          </p>
          </div>
        </div>

        {/* Catalog collage: a cover and an open spread, each carrying one
            cover line. 4:3, capped by the banner's height so it never
            overflows it, and held slightly in from the right edge. A size
            container, so the cover lines scale with the collage (cqw) rather
            than the viewport. The photos stay decorative (alt=""). */}
        <div
          className="@container relative mx-auto aspect-[4/3] w-[calc(100%-2*var(--spacing-edge)-1rem)] max-w-[min(50rem,calc(58svh*4/3))] sm:w-[calc(100%-2*var(--spacing-edge))] lg:mr-[clamp(1rem,3vw,3.5rem)] lg:w-full"
        >
          {/* Cover */}
          <div
            data-page
            className="group absolute top-[2%] left-[1%] w-[54%] -rotate-3 bg-white p-[4%] shadow-[0_30px_60px_-20px_rgba(5,12,30,0.55)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/new-arrival/tennis-necklace-model.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 55vw"
                className="object-cover grayscale contrast-125 transition duration-700 group-hover:grayscale-0"
              />
              {/* Cover line, magazine style: a dark fade up from the bottom
                  keeps white type readable over any part of the photo. */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-[7%] pt-[30%] pb-[7%] text-white">
                <p className="text-[max(8px,1.6cqw)] font-medium tracking-[0.14em] sm:tracking-[0.3em] text-white/80 uppercase">
                  The Holiday Edit
                </p>
                <p className="mt-[0.4em] font-[family-name:var(--font-bodoni)] text-[4.4cqw] leading-[1.05] italic">
                  Made to Be
                  <br />
                  Unwrapped
                </p>
              </div>
            </div>
          </div>

          {/* Spread */}
          <div
            data-page
            className="absolute right-[1%] bottom-[2%] w-[60%] rotate-2 bg-[#ebe7df] p-[4%] shadow-[0_30px_60px_-20px_rgba(5,12,30,0.55)]"
          >
            {/* Ribbon tag across the spread's top edge */}
            <p className="absolute top-0 left-[6%] -translate-y-1/2 bg-[linear-gradient(180deg,#ecd3a0,#c9a35c)] px-[0.9em] py-[0.55em] text-[max(8px,1.5cqw)] font-medium tracking-[0.18em] whitespace-nowrap sm:tracking-[0.28em] text-[#0b1a3d] uppercase shadow-[0_8px_20px_-8px_rgba(5,12,30,0.6)]">
              Little Boxes · <span className="font-semibold">Big Sparkle</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SPREAD.map((tile) => (
                <div key={tile.src} className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 13rem, 28vw"
                    style={{ objectPosition: tile.position }}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
