import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The golden silk banner, from GiftPageImages/Emerald and Ruby Jewelry on
 * Golden Silk.png: plain dark bronze across the left where the copy sits,
 * and an alternating emerald band, emerald hoops and a ruby tennis bracelet
 * on sweeping golden silk at the right. The photo is 3:1 with the set ending
 * 93% across; this copy is widened 72px on the right with more of the plain
 * silk (copied from just right of the hoops, offset along the light streaks
 * and cross-faded in), so it is 3.1:1 and the set ends 90% across - 10vw in
 * from the right edge of the band. */
const BANNER_SRC = "/gift-guide/color-golden-silk-wide-banner.webp";

/** The banner's own plain bronze, so the band and the fades match it. */
const BRONZE = "#290b00";

/** Ivory for the copy on the bronze. */
const IVORY = "#f5efe4";

/** Champagne gold for "Color" - the same ramp as "Gift Guide" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#f6e2b8_0%,#ecd3a0_50%,#dcbc7e_100%)] bg-clip-text text-transparent";

/**
 * "Color" - the coloured-gemstone holiday trend: a full-bleed banner built
 * the same way as "Bezel-Set Styles", with the copy on the left.
 *
 * On phones the copy sits on the plain bronze and the right of the banner -
 * the three pieces - forms a 3:2 band beneath it.
 */
export function GiftGuideColor() {
  return (
    // Desktop height follows the copy, with only a little padding above and
    // below; the picture covers the band, cropped top and bottom.
    <section
      aria-labelledby="color-heading"
      className="relative isolate flex items-center overflow-hidden pt-12 lg:py-10"
      style={{ color: IVORY, backgroundColor: BRONZE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] lg:inset-0 lg:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On phones the 3:2 box shows the right half of the 3:1 banner,
          // which renders about twice the screen width. Around 1024px the
          // band is a little taller than 3:1, so the picture runs slightly
          // wider than the screen
          sizes="(min-width: 1280px) 100vw, (min-width: 1024px) 110vw, 200vw"
          // Desktop: the band is only as tall as the copy, so the 3:1 picture
          // is cropped top and bottom. The jewelry sits low in the photo (31%
          // to 84% of its height), so the crop is held a little below the
          // middle, which keeps the hoops' tops and the bracelet in the band.
          className="object-cover object-right lg:object-[100%_70%]"
        />
        {/* Phones: the picture fades up into the plain bronze under the copy;
            desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#290b00_0%,rgb(41_11_0/0.6)_18%,transparent_45%)] lg:bg-[radial-gradient(ellipse_45%_80%_at_22%_50%,rgb(40_18_4/0.35),transparent)]" />
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
            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-sm:mx-auto max-w-[64ch] lg:max-w-[52ch] xl:max-w-[64ch] text-[clamp(1rem,1.25vw,1.1875rem)] leading-relaxed text-pretty text-[#f5efe4]/85">
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

          {/* Phones: room under the copy for the jewelry */}
          <div aria-hidden className="aspect-[3/2] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
