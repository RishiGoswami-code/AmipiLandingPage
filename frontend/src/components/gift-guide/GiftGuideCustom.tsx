import Image from "next/image";
import { Gem, Lightbulb, Trophy, UserRound, type LucideIcon } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading and reason titles. */
const NAVY = "#0b1a3d";

/** Antique gold for type on the light photo - the champagne used on the dark
 * banners is too pale to read here. */
const ANTIQUE_GOLD = "#8a6630";

/** The warm ivory of the photo's left side, evened out: the wash behind the
 * copy and the plain ground under it on phones. */
const CREAM = "#f2e7d7";

/** The custom emerald-cut halo ring on a travertine block in warm window
 * light, with baby's breath at the right, from GiftPageImages/HOLIDAY TRENDS/
 * Emerald Halo Ring in Warm Golden Light.png. 16:9 (1672px wide), the ring
 * right of centre and the left side plain light, where the copy sits. */
const PHOTO_SRC = "/gift-guide/custom/emerald-halo-golden-light.webp";

/**
 * Why custom - the four reasons from the Custom Design Studio page
 * (src/app/custom/page.tsx, verbatim from amipi.com/custom), each cut to the
 * one sentence that carries it so the section stays a catalog page.
 */
const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: UserRound,
    title: "Personalization",
    body: "Custom-designed jewelry allows you to create a piece that reflects your unique style, personality, and preferences.",
  },
  {
    icon: Gem,
    title: "Sentimental Value",
    body: "The ability to incorporate personal elements, such as heirloom stones or symbols, adds significant sentimental value to the jewelry.",
  },
  {
    icon: Lightbulb,
    title: "Unique Design",
    body: "Custom jewelry ensures that you own a design that is exclusive to you.",
  },
  {
    icon: Trophy,
    title: "Long-Term Satisfaction",
    body: "Knowing that your piece is uniquely yours and crafted to your specifications enhances the joy of wearing it for years to come.",
  },
];

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom) as a full-bleed
 * banner, like the others on the page but light: the emerald halo photo
 * fills the section, with the copy over its plain left side under a soft
 * ivory wash. The copy follows the studio page - the Bodoni and gold
 * Cormorant Italic heading, a "Made for you" label over "Why Custom
 * Jewelry?", the four reasons with line icons, and two buttons: the studio
 * page, and straight to its design form.
 *
 * From 1280px the copy sets the height, kept compact; the photo is cropped
 * to cover, held so the ring stays clear of the copy. Narrower than that - phones, tablets and small
 * laptops, where half the width is too tight for the reasons two by two -
 * the copy sits on plain cream and the ring forms a band beneath it, built
 * the same way as the dark banners. On phones the ring leads instead: a
 * square crop across the top, then the heading and the four reasons as
 * small icon-and-title tiles, two by two (their sentences are left to
 * larger screens).
 */
export function GiftGuideCustom() {
  return (
    <section
      aria-labelledby="custom-heading"
      className="relative isolate flex items-center overflow-hidden pt-8 max-sm:pt-[100vw] max-sm:pb-12 xl:py-[clamp(1.75rem,2.5vw,2.75rem)]"
      style={{ backgroundColor: CREAM }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] max-sm:top-0 max-sm:bottom-auto max-sm:aspect-square sm:aspect-[5/2] xl:inset-0 xl:aspect-auto">
        <Image
          quality={90}
          src={PHOTO_SRC}
          alt=""
          fill
          // The phone square shows the middle of the 16:9 photo, about
          // 1.8x the screen width, held on the ring
          sizes="(min-width: 640px) 100vw, 180vw"
          className="object-cover object-[70%_50%] max-sm:object-[72%_50%] xl:object-[30%_50%]"
        />
        {/* Phones: the photo fades down into the plain cream above the
            copy; tablets: it fades up into the cream under the copy;
            desktop: an ivory wash across the left, gone before the ring */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f2e7d7_0%,rgb(242_231_215/0.6)_20%,transparent_45%)] max-sm:bg-[linear-gradient(0deg,#f2e7d7_0%,rgb(242_231_215/0.6)_12%,transparent_30%)] xl:bg-[linear-gradient(90deg,rgb(242_231_215/0.92)_0%,rgb(242_231_215/0.84)_40%,rgb(242_231_215/0.4)_54%,transparent_63%)]" />
      </div>

      <div className="w-full px-edge">
        <div className="max-w-[46rem] max-sm:text-center xl:max-w-[min(46rem,52%)]">

          <h2
            id="custom-heading"
            className="font-[family-name:var(--font-bodoni)] text-[clamp(2.75rem,5.2vw,5.5rem)] leading-[1.02] font-normal"
            style={{ color: NAVY }}
          >
            Custom{" "}
            <span className="bg-[linear-gradient(180deg,#d4b06a_0%,#b8904e_50%,#8a6630_100%)] bg-clip-text pr-[0.08em] font-[family-name:var(--font-cormorant-italic)] text-[1.12em] font-medium text-transparent italic">
              Jewelry
            </span>
          </h2>

          {/* "Made for you" as a small label over the heading for the
              reasons */}
          <p
            className="mt-[clamp(1rem,2vw,1.5rem)] text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: ANTIQUE_GOLD }}
          >
            Made for you
          </p>
          <h3
            className="mt-1.5 font-[family-name:var(--font-cormorant-italic)] text-[clamp(1.75rem,2.4vw,2.375rem)] leading-tight font-medium italic"
            style={{ color: NAVY }}
          >
            Why Custom Jewelry?
          </h3>

          {/* Why custom, two by two: a bare line icon in antique gold, set on
              the title's first line, then the title and one line. On phones
              they stay two by two as small tiles: the icon above the title,
              without the sentence */}
          <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-10 sm:gap-y-4">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3.5 max-sm:flex-col max-sm:items-center max-sm:gap-1.5">
                <Icon
                  aria-hidden
                  className="h-6 w-6 shrink-0 sm:mt-1"
                  strokeWidth={1.4}
                  style={{ color: ANTIQUE_GOLD }}
                />
                <div>
                  <h4
                    className="font-[family-name:var(--font-cormorant-italic)] text-[1.625rem] leading-tight font-medium italic max-sm:text-[1.3125rem]"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h4>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#141414]/75 max-sm:hidden">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 max-sm:justify-center">
            <PillButton href="/custom" variant="dark" size="sm" icon="arrow">
              Get Started
            </PillButton>
          </div>
        </div>

        {/* Tablets: room under the copy for the photo */}
        <div aria-hidden className="mt-4 aspect-[3/2] max-sm:hidden sm:aspect-[5/2] xl:hidden" />
      </div>
    </section>
  );
}
