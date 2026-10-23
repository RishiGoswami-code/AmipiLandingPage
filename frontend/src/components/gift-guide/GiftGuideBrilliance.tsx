import Image from "next/image";
import { GiftGuideButton } from "./GiftGuideButton";
import { BannerTitle, SUBTEXT, SUBTEXT_ON_DARK } from "./BannerTitle";

/** The blue diamond banner, from GiftPageImages/LuxuaryBlueDiamond.png:
 * about 3:1, plain midnight blue across the left half and, on the right, a
 * blue satin ribbon with loose diamonds, a tray of melee and hands holding a
 * diamond and a loupe. Full size (2123px wide). */
const BANNER_SRC = "/gift-guide/season-diamonds-banner.webp";

/** The banner's own plain blue, so the band and the fades match it. */
const BLUE = "#000c21";

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/**
 * "The Season Starts with Diamonds" - after the matching banner on Stuller's
 * holiday page: copy on the plain blue at the left, the ribbon, diamonds and
 * loupe of the banner at the right, with one button each for natural and lab-grown
 * diamond jewelry. The headline repeats the hero's pairing - a Cormorant
 * Italic line over a gold Bodoni word - so the two navy bands read as
 * a set.
 *
 * Full-bleed like the hero's band. On tablets the copy sits on the plain
 * blue and the right half of the banner - the ribbon, hands and diamonds -
 * forms a 3:2 band beneath it. On phones the picture leads instead: a square
 * crop of the hands and diamonds across the top, then the title and buttons
 * (the paragraph is left to larger screens).
 */
export function GiftGuideBrilliance() {
  return (
    // Desktop height follows the copy, with only a little padding above and
    // below; the picture covers the band, cropped top and bottom.
    <section
      id="diamonds"
      aria-labelledby="brilliance-heading"
      className="relative isolate flex items-center overflow-hidden max-sm:pt-[100vw] max-sm:pb-12 lg:py-10"
      style={{ color: IVORY, backgroundColor: BLUE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] max-sm:top-0 max-sm:bottom-auto max-sm:aspect-square lg:inset-0 lg:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On tablets the 3:2 box shows the right half of the 3:1 banner,
          // which renders about twice the screen width; the phone square
          // shows its right third (65% to 100%), about three times the
          // width - the diamonds, both hands and the loupe (69% to 100%)
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 191vw, 290vw"
          className="object-cover object-right lg:object-center"
        />
        {/* Phones: the picture fades down into the plain blue above the
            copy; tablets: it fades up into the blue under the copy;
            desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#000c21_0%,rgb(0_12_33/0.6)_18%,transparent_45%)] max-sm:bg-[linear-gradient(0deg,#000c21_0%,rgb(0_12_33/0.5)_5%,transparent_14%)] lg:bg-[radial-gradient(ellipse_50%_80%_at_22%_50%,rgb(12_20_40/0.45),transparent)]" />
      </div>

      <div className="w-full px-edge pt-14 max-sm:pt-0 lg:pt-0">
        <div className="grid h-full items-center gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10">
          <div className="max-sm:text-center">
            <BannerTitle
              id="brilliance-heading"
              lead="The Season Starts with"
              accent="Diamonds"
            />

            <p className={`mt-[clamp(1rem,2.5vh,1.5rem)] max-w-[40ch] max-sm:hidden ${SUBTEXT} ${SUBTEXT_ON_DARK}`}>
              From natural diamonds to lab-grown favorites, explore beautiful
              pieces your customers will be looking for this holiday season.
            </p>

            <div className="mt-[clamp(1.25rem,3vh,2rem)] flex flex-wrap gap-3 max-sm:justify-center">
              <GiftGuideButton
                href="/categories"
                variant="gold"
              >
                Shop Natural Diamond Jewelry
              </GiftGuideButton>
              <GiftGuideButton
                href="/categories"
                variant="light"
              >
                Shop Lab-Grown Diamond Jewelry
              </GiftGuideButton>
            </div>
          </div>

          {/* Tablets: room under the copy for the picture */}
          <div aria-hidden className="aspect-[3/2] max-sm:hidden lg:hidden" />
        </div>
      </div>
    </section>
  );
}
