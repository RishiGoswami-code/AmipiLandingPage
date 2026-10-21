"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { italiana } from "@/styles/fonts";
import { GOLD_TEXT } from "./BannerTitle";

gsap.registerPlugin(useGSAP);

/** The navy velvet-and-ribbon banner. 3:1, with the ribbons at both ends and
 * plain navy through the middle-left, where the copy sits. */
const BANNER_SRC = "/gift-guide/navy-velvet-banner.webp";

/** Ivory for the copy on the navy banner. */
const IVORY = "#f5efe4";

/** The banner photo, filling whichever box it is placed in. */
function BannerImage({ position = "50% 50%" }: { position?: string }) {
  return (
    <Image
      quality={90}
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

/** The catalog cover: the model in the red dress wearing the diamond
 * necklace, from GiftPageImages/Top banner grid of 4/Single. 4:5, the same
 * shape as the cover's photo box, so nothing is cropped. */
const COVER_SRC = "/gift-guide/hero/cover-necklace.webp";

/** The four tiles on the spread mockup, from GiftPageImages/Top banner grid
 * of 4. All four are 4:5 shots cropped to square tiles, so each sets the
 * focal point the crop keeps - the hands and rings. */
const SPREAD = [
  { src: "/gift-guide/hero/spread-cupcake.webp", position: "50% 62%" },
  { src: "/gift-guide/hero/spread-can.webp", position: "50% 45%" },
  { src: "/gift-guide/hero/spread-cocoa.webp", position: "50% 60%" },
  { src: "/gift-guide/hero/spread-croissant.webp", position: "50% 35%" },
];

/**
 * Holiday Gift Guide hero - trial design. The headline is laid out like the
 * banner on Stuller's holiday page: a large display word on the first line
 * and a serif capital word on the second, pushed right so the two lines stagger
 * rather than share a left edge. The collage on the right borrows the printed
 * catalog from landingPageTheme.jpeg; the cover carries a single cover line.
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

      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });
      // The catalog pages drop in one after the other. Their tilt is the CSS
      // `rotate` property, which GSAP's transform tween leaves alone.
      gsap.from("[data-page]", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="text-[#141414]">
      {/* Masthead strip, on the cream above the banner */}
      <header
        data-reveal
        className="mx-edge flex items-center justify-between border-b border-[#141414]/15 pt-6 pb-4 text-[11px] tracking-[0.35em] text-[#141414]/60 uppercase"
      >
        {/* Same lockup as the Navbar - roundel plus Italiana at 0.06em - since
            this page hides the site chrome and the wordmark is the way home. */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <Image
            quality={90}
            src="/icon.png"
            alt=""
            aria-hidden
            width={512}
            height={512}
            className="h-8 w-8 sm:h-9 sm:w-9"
          />
          <span className="flex flex-col">
            <span
              className={`${italiana.className} text-xl tracking-[0.06em] text-[#141414] uppercase transition-colors hover:text-[#a8803f] sm:text-2xl`}
            >
              Amipi
            </span>
            {/* The anniversary line under the wordmark, in Cormorant Italic
                on a metallic gold ramp - deeper than the champagne used on
                the dark banners, so it holds on the cream */}
            <span className="-mt-0.5 bg-[linear-gradient(100deg,#9a6b25_0%,#c9a04f_35%,#e6c47a_50%,#c9a04f_65%,#9a6b25_100%)] bg-clip-text font-[family-name:var(--font-cormorant-italic)] text-[13px] leading-tight font-semibold tracking-[0.04em] text-transparent normal-case italic lining-nums sm:text-[15px]">
              Celebrating 50 Years
            </span>
          </span>
        </Link>
      </header>

      {/* Hero: 65% of the viewport on desktop. The navy band runs edge to edge
          but is shorter than the hero, so the catalog pages break out above
          and below it the way the products do on Stuller's banner. On phones,
          where the hero stacks, the band sits behind the copy only and the
          collage follows on the cream. */}
      <section className="relative isolate mt-6 grid items-center gap-10 lg:mt-0 lg:h-[65svh] lg:min-h-[30rem] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:px-edge lg:py-[clamp(1rem,3vh,2rem)]">
        <div
          aria-hidden
          className="absolute inset-x-0 top-[13%] bottom-[13%] -z-10 hidden overflow-hidden bg-[#0b1a3d] lg:block"
        >
          <BannerImage />
          {/* Soft navy pool behind the copy, so the left ribbon's sheen
              doesn't run through the paragraph */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_75%_at_24%_55%,rgba(5,13,35,0.7),transparent)]" />
        </div>

        {/* Copy - on the page gutter, like the copy on the other banners */}
        <div
          className="relative isolate overflow-hidden bg-[#0b1a3d] px-edge py-14 sm:py-16 lg:overflow-visible lg:bg-transparent lg:px-0 lg:py-0"
          style={{ color: IVORY }}
        >
          {/* Phone-only copy of the band, anchored left so the satin ribbon shows */}
          <div aria-hidden className="absolute inset-0 -z-10 lg:hidden">
            <BannerImage position="0% 50%" />
            <div className="absolute inset-0 bg-[#050d23]/50" />
          </div>
          <div className="max-w-2xl max-sm:text-center">
            <h1 data-reveal className="leading-none">
              {/* Cormorant Garamond Italic (the real italic, loaded in the route's
                page.tsx) at 500 - heavy enough that its hairlines survive on
                the velvet, calligraphic without turning into a script. */}
              <span className="block font-[family-name:var(--font-cormorant-italic)] text-[clamp(3.5rem,min(7.5vw,11.5vh),6.25rem)] leading-[1.1] font-medium italic">
                Holiday
              </span>{" "}
              {/* Second line pushed right - the stagger on Stuller's "Magic /
                MOMENT" - so the two lines don't share a left edge. */}
              <span
                className={`mt-[0.2em] ml-[clamp(2.75rem,6.5vw,6.5rem)] max-sm:ml-0 block font-[family-name:var(--font-bodoni)] text-[clamp(2.25rem,min(4.8vw,7.5vh),4.25rem)] font-normal tracking-[0.04em] ${GOLD_TEXT}`}
              >
                Gift Guide
              </span>
            </h1>

            {/* Tagline: Cormorant italic like "Holiday", a step down in size */}
            <p
              data-reveal
              className="mt-[clamp(0.5rem,1.5vh,1rem)] font-[family-name:var(--font-cormorant-italic)] text-[clamp(1.375rem,min(2.2vw,3.6vh),2rem)] leading-snug font-medium italic text-[#f5efe4]/90"
            >
              Make This Season One to Remember.
            </p>

            <p
              data-reveal
              className="mt-[clamp(0.75rem,2.5vh,1.5rem)] max-w-[50ch] max-sm:mx-auto text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-[#f5efe4]/80"
            >
              From timeless favorites to standout new arrivals, explore a
              collection of diamonds and fine jewelry your customers will love
              to gift, receive, and cherish long after the holidays.
            </p>
          </div>
        </div>

        {/* Catalog collage: a cover, carrying one cover line, and an open
            spread. 4:3, capped by the banner's height so it never
            overflows it, and held slightly in from the right edge. A size
            container, so the cover lines scale with the collage (cqw) rather
            than the viewport. The photos stay decorative (alt=""). */}
        <div className="@container relative mx-auto aspect-[4/3] w-[calc(100%-2*var(--spacing-edge)-1rem)] max-w-[min(50rem,calc(58svh*4/3))] sm:w-[calc(100%-2*var(--spacing-edge))] lg:mr-[clamp(1rem,3vw,3.5rem)] lg:w-full">
          {/* Cover */}
          <div
            data-page
            className="absolute top-[2%] left-[1%] w-[54%] -rotate-3 bg-white p-[4%] shadow-[0_30px_60px_-20px_rgba(5,12,30,0.55)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                quality={90}
                src={COVER_SRC}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 55vw"
                className="object-cover object-[50%_35%]"
              />
              {/* Cover line, magazine style: a dark fade up from the bottom
                  keeps white type readable over any part of the photo. */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-[7%] pt-[30%] pb-[7%] text-white">
                <p className="text-[max(8px,1.6cqw)] font-medium tracking-[0.14em] sm:tracking-[0.3em] text-white/80 uppercase">
                  The Holiday Edit
                </p>
                <p className="mt-[0.4em] font-[family-name:var(--font-bodoni)] text-[4.4cqw] leading-[1.05] italic">
                  A Season Set
                  <br />
                  in Diamonds
                </p>
              </div>
            </div>
          </div>

          {/* Spread */}
          <div
            data-page
            className="absolute right-[1%] bottom-[2%] w-[60%] rotate-2 bg-[#ebe7df] p-[4%] shadow-[0_30px_60px_-20px_rgba(5,12,30,0.55)]"
          >
            <div className="grid grid-cols-2 gap-2">
              {SPREAD.map((tile) => (
                <div
                  key={tile.src}
                  className="relative aspect-square overflow-hidden bg-white"
                >
                  <Image
                    quality={90}
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
