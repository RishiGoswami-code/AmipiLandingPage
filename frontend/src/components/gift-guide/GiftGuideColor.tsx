import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The golden satin banner, from GiftPageImages/COLOR/Luxury Gemstone
 * Jewelry on Golden Satin.png: 3:1, dark bronze satin at the left and four
 * pieces on golden satin from 47% to 95% across - a ruby tennis bracelet, a
 * diamond and sapphire necklace hanging in from the top edge, an emerald and
 * diamond band, and emerald hoops. */
const BANNER_SRC = "/gift-guide/color-gemstones-golden-satin-v2-banner.webp";

/** The banner's own dark bronze at its left edge, so the band and the fades
 * match it. */
const BRONZE = "#271304";

/** Ivory for the copy on the bronze. */
const IVORY = "#f5efe4";

/** Champagne gold for "Color" - the same ramp as "Gift Guide" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#f6e2b8_0%,#ecd3a0_50%,#dcbc7e_100%)] bg-clip-text text-transparent";

/**
 * "Color" - the coloured-gemstone holiday trend: a full-bleed banner built
 * the same way as "Bezel-Set Styles", with the copy on the left.
 *
 * The set starts left of centre, so from 1280px the picture starts 22vw in
 * from the left (its edge fading into the bronze), which moves the
 * bracelet clear of the paragraph. Narrower than 1280px there is no room
 * beside the copy: on tablets it sits on the plain bronze and the set forms
 * a band beneath it, as on the Bridal banner. On phones the set leads
 * instead: a 7:5 crop across the top - wide enough for all four pieces -
 * then the title and button (the paragraph is left to larger screens).
 */
export function GiftGuideColor() {
  return (
    // Desktop height follows the copy, with room above and below it; the
    // picture covers the band.
    <section
      aria-labelledby="color-heading"
      className="relative isolate flex items-center overflow-hidden pt-16 max-sm:pt-[calc(100vw*5/7)] max-sm:pb-12 xl:py-[clamp(4.5rem,6vw,7rem)]"
      style={{ color: IVORY, backgroundColor: BRONZE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[2/1] max-sm:top-0 max-sm:bottom-auto max-sm:aspect-[7/5] sm:aspect-[5/2] xl:inset-y-0 xl:right-0 xl:left-[22vw] xl:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // Phones: the 7:5 box shows 47% to 93% of the 3:1 banner, which
          // renders about 2.1x the screen width, so the whole set fits; from
          // 640px a 5:2 box shows nearly all of it
          sizes="(min-width: 1280px) 80vw, (min-width: 640px) 120vw, 215vw"
          // From 1280px the band is only as tall as the copy, so the picture
          // is cropped top and bottom; the necklace hangs in from the top
          // edge of the photo anyway
          className="object-cover object-[87%_50%] sm:object-[85%_50%] xl:object-[100%_50%]"
        />
        {/* Phones: the picture fades down into the plain bronze above the
            copy; tablets: it fades up into the bronze under the copy; from
            1280px: its left edge fades into the bronze */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#271304_0%,rgb(39_19_4/0.6)_15%,transparent_35%)] max-sm:bg-[linear-gradient(0deg,#271304_0%,rgb(39_19_4/0.6)_12%,transparent_30%)] xl:bg-[linear-gradient(90deg,#271304_0%,rgb(39_19_4/0.6)_8%,transparent_22%)]" />
      </div>

      <div className="w-full px-edge">
        <div>
          {/* No width cap on the block: the large title reaches into the
              plain middle of the banner, while the paragraph keeps a
              readable measure */}
          <div className="max-sm:text-center">
            <h2
              id="color-heading"
              className={`font-[family-name:var(--font-bodoni)] text-[clamp(3.75rem,7vw,7.5rem)] leading-[0.95] font-medium tracking-[0.01em] lg:text-[clamp(4.25rem,9vw,10rem)] ${GOLD_TEXT}`}
            >
              Color
            </h2>
            {/* From 1280px the picture is height-bound, so the taller the
                band, the wider the picture and the further left the
                bracelet: below 1600px the paragraph takes a narrower
                measure to clear it */}
            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-sm:hidden max-w-[64ch] xl:max-[1600px]:max-w-[44ch] min-[1600px]:max-[1900px]:max-w-[52ch] text-[clamp(1rem,1.25vw,1.1875rem)] leading-relaxed text-pretty text-[#f5efe4]/85">
              Bring a little more personality to holiday gifting with rich
              emeralds, deep rubies, and vibrant gemstone accents. Bold enough
              to stand out, easy enough to wear every day, and made to feel
              special long after the season is over.
            </p>
            <div className="mt-[clamp(1.25rem,3vh,2rem)]">
              <PillButton href="/categories" variant="light" size="sm" icon="arrow">
                Shop Now
              </PillButton>
            </div>
          </div>

          {/* Tablets: room under the copy for the jewelry, a little clear
              of the button so the necklace doesn't crowd it */}
          <div aria-hidden className="mt-8 aspect-[2/1] max-sm:hidden sm:aspect-[5/2] xl:hidden" />
        </div>
      </div>
    </section>
  );
}
