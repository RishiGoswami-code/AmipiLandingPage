"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Phone } from "lucide-react";
import { italiana } from "@/styles/fonts";
import { CONTACT } from "@/components/nav/navigation";
import { BannerTitle } from "./BannerTitle";
import { BODY_TYPE, CONTACT_HOVER, SteadyBold, SUBHEAD_TYPE } from "./GiftGuideTheme";

gsap.registerPlugin(useGSAP);

/** The navy velvet-and-ribbon banner. 3:1, with the ribbons at both ends and
 * plain navy through the middle-left, where the copy sits. */
const BANNER_SRC = "/gift-guide/navy-velvet-banner.webp";

/** Ivory for the copy on the navy banner. */
const IVORY = "#f5efe4";

/** Navy for the masthead's wordmark, links and icons. */
const NAVY = "#0b1a3d";

/** One tab per section, for the masthead's quick links (wide screens). The
 * hashes are the sections' ids. */
const FOLDS = [
  { label: "Trends", href: "#trends" },
  { label: "Jewelry Types", href: "#jewelry-types" },
  { label: "Diamonds", href: "#diamonds" },
  { label: "Bridal", href: "#bridal" },
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "Custom", href: "#custom" },
  { label: "Bezel", href: "#bezel" },
  { label: "Color", href: "#color" },
];

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
 * Holiday Gift Guide hero - trial design. The headline is the same two-line
 * title as "The Season Starts with Diamonds" (BannerTitle): a Cormorant
 * Italic line over a gold Bodoni line, pushed right so the two stagger.
 * The collage on the right borrows the printed
 * catalog from landingPageTheme.jpeg; the cover carries a single cover line.
 *
 * The banner is held to 60-70% of the viewport height on desktop (on phones
 * it stacks and takes its natural height). The masthead sits above it,
 * outside that height: one slim line with the wordmark at the left, a tab
 * per section in the middle (from 1280px) and the phone, email and social
 * links at the right (from 640px). On phones it is the wordmark alone,
 * centred.
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
      {/* Masthead: one slim line on the cream above the banner */}
      <header
        data-reveal
        className="mx-edge flex items-center justify-between gap-6 border-b border-[#0b1a3d]/15 py-2.5 max-sm:justify-center"
        style={{ color: NAVY }}
      >
        {/* Same lockup as the Navbar - roundel plus Italiana at 0.06em - since
            this page hides the site chrome and the wordmark is the way home.
            Navy and a step larger, so the thin Italiana reads on the cream.
            Centred on phones, over the centred banner copy. */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Image
            quality={90}
            src="/icon.png"
            alt=""
            aria-hidden
            width={512}
            height={512}
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <span className="flex flex-col">
            <span
              className={`${italiana.className} text-[1.625rem] leading-none tracking-[0.06em] uppercase transition-colors hover:text-[#8a6630] sm:text-[1.875rem]`}
            >
              Amipi
            </span>
            {/* The anniversary line under the wordmark, in Cormorant Italic
                on a metallic gold ramp - deep enough to hold on the cream */}
            <span className="mt-0.5 bg-[linear-gradient(100deg,#7d5418_0%,#a87d32_35%,#c9a04f_50%,#a87d32_65%,#7d5418_100%)] bg-clip-text font-[family-name:var(--font-cormorant-italic)] text-[14px] leading-tight font-bold tracking-[0.04em] text-transparent italic lining-nums sm:text-[15px]">
              Celebrating 50 Years
            </span>
          </span>
        </Link>

        {/* A tab per section, for quick access */}
        <nav aria-label="Gift guide sections" className="hidden xl:block">
          <ul className="flex items-center gap-[clamp(0.875rem,1.5vw,1.75rem)]">
            {FOLDS.map((fold) => (
              <li key={fold.href}>
                <a
                  href={fold.href}
                  className="text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap text-[#0b1a3d]/70 uppercase transition-colors hover:text-[#0b1a3d]"
                >
                  {fold.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact and social links, on the wordmark's line. The email
            address gives way to its icon while the section tabs need the
            room (1280 to 1535px). */}
        <div className="hidden shrink-0 items-center gap-4 sm:flex">
          <a
            href={CONTACT.phone.href}
            className={`flex items-center gap-2 text-[13px] font-medium whitespace-nowrap ${CONTACT_HOVER}`}
          >
            <Phone aria-hidden className="h-4 w-4" />
            <SteadyBold>{CONTACT.phone.label}</SteadyBold>
          </a>
          <a
            href={CONTACT.email.href}
            aria-label={`Email ${CONTACT.email.label}`}
            className={`flex items-center gap-2 text-[13px] font-medium ${CONTACT_HOVER}`}
          >
            <Mail aria-hidden className="h-4 w-4" />
            <span className="xl:max-2xl:hidden">
              <SteadyBold>{CONTACT.email.label}</SteadyBold>
            </span>
          </a>
          <span aria-hidden className="h-5 w-px bg-[#0b1a3d]/20" />
          <ul className="flex items-center gap-1.5">
            {CONTACT.socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AMIPI on ${label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0b1a3d]/20 transition-colors hover:border-[#0b1a3d] hover:bg-[#0b1a3d] hover:text-[#f5efe4]"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Hero: 65% of the viewport on desktop. The navy band runs edge to edge
          but is shorter than the hero, so the catalog pages break out above
          and below it the way the products do on Stuller's banner. On phones,
          where the hero stacks, the band sits behind the copy only and the
          collage follows on the cream. */}
      <section className="relative isolate mt-6 grid items-center gap-10 lg:mt-0 lg:h-[65svh] lg:min-h-[30rem] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:px-edge lg:pt-[clamp(0.25rem,1vh,0.75rem)] lg:pb-[clamp(1rem,3vh,2rem)]">
        {/* The band starts close under the masthead, so little cream shows
            between the two; the catalog pages still break out of it */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[5%] bottom-[13%] -z-10 hidden overflow-hidden bg-[#0b1a3d] lg:block"
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
            {/* The same title as "The Season Starts with Diamonds" */}
            <div data-reveal>
              <BannerTitle as="h1" lead="Holiday" accent="Gift Guide" />
            </div>

            {/* Tagline: the page's subheading style */}
            <p
              data-reveal
              className={`mt-[clamp(0.75rem,2vh,1.25rem)] ${SUBHEAD_TYPE} text-[#f5efe4]/90`}
            >
              Make This Season One to Remember.
            </p>

            <p
              data-reveal
              className={`mt-[clamp(0.75rem,2.5vh,1.5rem)] max-w-[50ch] max-sm:hidden ${BODY_TYPE} text-[#f5efe4]/80`}
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
