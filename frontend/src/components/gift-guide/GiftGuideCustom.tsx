import Image from "next/image";
import { Gem, Lightbulb, Trophy, UserRound, type LucideIcon } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading and reason titles. */
const NAVY = "#0b1a3d";

/** Antique gold for type on the light photo - the champagne used on the dark
 * banners is too pale to read here. */
const ANTIQUE_GOLD = "#8a6630";

/** The warm cream of the photo's left side, evened out: the wash behind the
 * copy and the plain ground under it on phones and tablets. */
const CREAM = "#fbe5cc";

/** Three custom rings in warm window light, from GiftPageImages/Custom/
 * Luxurious Rings in Warm Sunlight.png: 3:1 (2171px wide), plain sunlit
 * cream across the left and, from 62% to 94% across, an emerald-cut halo
 * ring on a travertine block, a green flower bypass ring in front of it and
 * a pink sapphire eternity band, with baby's breath at the right edge. */
const PHOTO_SRC = "/gift-guide/custom/rings-warm-sunlight-v3-banner.webp";

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
 * banner, like the others on the page but light: the three-ring photo
 * fills the section, with the copy over its plain left side under a soft
 * cream wash. The copy follows the studio page - the Bodoni and gold
 * Cormorant Italic heading, a "Made for you" label over "Why Custom
 * Jewelry?", the four reasons with line icons, and two buttons: the studio
 * page, and straight to its design form.
 *
 * From 1280px the copy sets the height and the photo, height-bound, is held
 * to the right edge, so the taller the band, the further left the rings
 * reach. Up to 1500px the reasons are icon-and-title tiles (no sentence),
 * which keeps the band short and the copy narrow enough for the rings to
 * clear it; from 1500px there is room for the sentences too. On tablets the
 * copy, with the sentences, sits on plain cream and the rings form a band
 * beneath it, built the same way as the dark banners. On phones the rings
 * lead instead: a 5:4 crop across the top that keeps all three, then the
 * heading and the reasons as small tiles, two by two.
 */
export function GiftGuideCustom() {
  return (
    <section
      aria-labelledby="custom-heading"
      className="relative isolate flex items-center overflow-hidden pt-8 max-sm:pt-[80vw] max-sm:pb-12 xl:py-[clamp(2rem,3vw,4rem)]"
      style={{ backgroundColor: CREAM }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[5/4] max-sm:top-0 max-sm:bottom-auto sm:aspect-[5/2] xl:inset-0 xl:aspect-auto">
        <Image
          quality={90}
          src={PHOTO_SRC}
          alt=""
          fill
          // The phone 5:4 box shows 57% to 99% of the 3:1 photo, all three
          // rings (62% to 94%) whole, at 2.4x the screen width;
          // tablets' 5:2 box
          // shows its right five sixths. From 1280px the photo is
          // height-bound and held to the right edge, nudged 3vw past it
          // (only baby's breath is lost) so the rings clear the copy
          sizes="(min-width: 1280px) 130vw, (min-width: 640px) 120vw, 240vw"
          className="object-cover object-[98%_50%] sm:object-right xl:object-[calc(100%+3vw)_50%]"
        />
        {/* Phones: the photo fades down into the plain cream above the
            copy; tablets: it fades up into the cream under the copy,
            briefly, as the emerald ring sits near the photo's top;
            desktop: a light cream wash behind the copy, gone before the
            rings (the photo is plain cream there anyway) */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbe5cc_0%,rgb(251_229_204/0.5)_5%,transparent_14%)] max-sm:bg-[linear-gradient(0deg,#fbe5cc_0%,rgb(251_229_204/0.5)_5%,transparent_14%)] xl:bg-[linear-gradient(90deg,rgb(251_229_204/0.75)_0%,rgb(251_229_204/0.5)_22%,transparent_34%)]" />
      </div>

      <div className="w-full px-edge">
        <div className="max-w-[46rem] max-sm:text-center xl:max-[1500px]:max-w-[32rem]">

          <h2
            id="custom-heading"
            className="font-[family-name:var(--font-bodoni)] text-[clamp(2.75rem,5.2vw,5.5rem)] leading-[1.02] font-normal xl:whitespace-nowrap"
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
              they are small tiles, the icon above the title, and from 1280
              to 1500px the sentence is left out so the rings clear the
              copy */}
          <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-10 sm:gap-y-4 xl:max-[1500px]:gap-x-6">
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
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#141414]/75 max-sm:hidden xl:max-[1500px]:hidden">
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
        <div aria-hidden className="mt-4 aspect-[5/2] max-sm:hidden xl:hidden" />
      </div>
    </section>
  );
}
