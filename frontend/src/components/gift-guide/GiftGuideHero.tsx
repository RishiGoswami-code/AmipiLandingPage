"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Phone } from "lucide-react";
import { italiana } from "@/styles/fonts";
import { CONTACT } from "@/components/nav/navigation";
import { GiftGuideButton } from "./GiftGuideButton";
import { BODY_TYPE, CONTACT_HOVER_LIGHT, EYEBROW, INK, SteadyBold } from "./GiftGuideTheme";

gsap.registerPlugin(useGSAP);

/** Ivory for the masthead's wordmark, links and icons on the evergreen. */
const IVORY = "#f5efe4";

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
 * Holiday Gift Guide hero, after the team's mockups: dark copy on white at
 * the left - a small "AMIPI · Holiday Gift Guide" line, the headline "A
 * Season Set in Diamonds" in upright Cormorant, a short red rule, the
 * tagline and paragraph, and a red button down to the trends - and a
 * visual at the right. Until the mockup's hero photo arrives, the visual is
 * the catalog collage (a cover and an open spread, after
 * landingPageTheme.jpeg).
 *
 * The hero is held to 65% of the viewport height on desktop (on phones it
 * stacks and takes its natural height). The masthead sits above it,
 * outside that height: one slim evergreen bar with the wordmark at the
 * left, a tab per section in the middle (from 1280px) and the phone, email
 * and social links at the right (from 640px). On phones it is the wordmark
 * alone, centred.
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
    <div ref={rootRef} className="bg-white text-[#141414]">
      {/* Masthead: one slim evergreen bar above the hero */}
      <div className="bg-(--gift-green)">
        <header
          data-reveal
          className="mx-edge flex items-center justify-between gap-6 py-2.5 max-sm:justify-center"
          style={{ color: IVORY }}
        >
          {/* Same lockup as the Navbar - roundel plus Italiana at 0.06em - since
              this page hides the site chrome and the wordmark is the way home.
              Ivory and a step larger, so the thin Italiana reads on the green.
              Centred on phones, over the centred hero copy. */}
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
                className={`${italiana.className} text-[1.625rem] leading-none tracking-[0.06em] uppercase transition-colors hover:text-[#d9b877] sm:text-[1.875rem]`}
              >
                Amipi
              </span>
              {/* The anniversary line under the wordmark, in Cormorant Italic
                  on a champagne ramp - light enough to hold on the evergreen */}
              <span className="mt-0.5 bg-[linear-gradient(100deg,#c9a35c_0%,#e6cc93_35%,#f4e2b8_50%,#e6cc93_65%,#c9a35c_100%)] bg-clip-text font-[family-name:var(--font-cormorant-italic)] text-[14px] leading-tight font-bold tracking-[0.04em] text-transparent italic lining-nums sm:text-[15px]">
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
                    className="text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap text-[#f5efe4]/75 uppercase underline-offset-[6px] decoration-[#d9b877] transition-colors hover:text-white hover:underline"
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
              className={`flex items-center gap-2 text-[13px] font-medium whitespace-nowrap ${CONTACT_HOVER_LIGHT}`}
            >
              <Phone aria-hidden className="h-4 w-4" />
              <SteadyBold>{CONTACT.phone.label}</SteadyBold>
            </a>
            <a
              href={CONTACT.email.href}
              aria-label={`Email ${CONTACT.email.label}`}
              className={`flex items-center gap-2 text-[13px] font-medium ${CONTACT_HOVER_LIGHT}`}
            >
              <Mail aria-hidden className="h-4 w-4" />
              <span className="xl:max-2xl:hidden">
                <SteadyBold>{CONTACT.email.label}</SteadyBold>
              </span>
            </a>
            <span aria-hidden className="h-5 w-px bg-[#f5efe4]/25" />
            <ul className="flex items-center gap-1.5">
              {CONTACT.socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AMIPI on ${label}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f5efe4]/30 transition-colors hover:border-[#f5efe4] hover:bg-[#f5efe4] hover:text-(--gift-green)"
                  >
                    <Icon className="h-[15px] w-[15px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>

      {/* Hero: 65% of the viewport on desktop, on white. The copy sits on
          the page gutter at the left, the collage at the right. On phones
          the hero stacks: the copy, centred, then the collage. */}
      <section className="relative isolate grid items-center gap-10 px-edge pt-12 pb-10 sm:pt-14 lg:h-[65svh] lg:min-h-[30rem] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-[clamp(1rem,3vh,2rem)]">
        <div className="max-w-2xl max-sm:text-center" style={{ color: INK }}>
          <p data-reveal className={`${EYEBROW} text-[#141a17]/60`}>
            AMIPI · Holiday Gift Guide
          </p>

          <h1
            data-reveal
            className="mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(2.75rem,5.2vw,5.25rem)] leading-[1.02] font-medium text-balance"
          >
            A Season Set in Diamonds
          </h1>

          {/* The short red rule under the headline */}
          <span
            data-reveal
            aria-hidden
            className="mt-[clamp(1rem,2.5vh,1.5rem)] block h-0.5 w-12 bg-(--gift-cta) max-sm:mx-auto"
          />

          <p
            data-reveal
            className="mt-[clamp(1rem,2.5vh,1.5rem)] font-[family-name:var(--font-cormorant)] text-[clamp(1.375rem,1.9vw,1.875rem)] leading-snug font-medium"
          >
            Make This Season One to Remember.
          </p>

          <p
            data-reveal
            className={`mt-[clamp(0.5rem,1.5vh,1rem)] max-w-[50ch] text-pretty max-sm:hidden ${BODY_TYPE} text-[#141a17]/70`}
          >
            From timeless favorites to standout new arrivals, explore a
            collection of diamonds and fine jewelry your customers will love
            to gift, receive, and cherish long after the holidays.
          </p>

          <div data-reveal className="mt-[clamp(1.25rem,3.5vh,2.25rem)]">
            <GiftGuideButton href="#trends">Explore the Gift Guide</GiftGuideButton>
          </div>
        </div>

        {/* Catalog collage, the stand-in until the hero photo arrives: a
            cover, carrying one cover line, and an open
            spread. 4:3, capped by the banner's height so it never
            overflows it, and held slightly in from the right edge. A size
            container, so the cover lines scale with the collage (cqw) rather
            than the viewport. The photos stay decorative (alt=""). */}
        <div className="@container relative mx-auto aspect-[4/3] w-[calc(100%-1rem)] max-w-[min(50rem,calc(58svh*4/3))] sm:w-full lg:mr-[clamp(1rem,3vw,3.5rem)]">
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-[7%] pt-[18%] pb-[7%] text-white">
                <p className="text-[max(8px,1.6cqw)] font-medium tracking-[0.14em] sm:tracking-[0.3em] text-white/80 uppercase">
                  The Holiday Edit
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
