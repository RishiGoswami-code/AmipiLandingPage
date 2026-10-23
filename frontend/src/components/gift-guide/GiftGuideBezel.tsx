import Image from "next/image";
import { GiftGuideButton } from "./GiftGuideButton";
import { BannerTitle, SUBTEXT, SUBTEXT_ON_DARK } from "./BannerTitle";

/** The burgundy velvet banner, from GiftPageImages/Burgundy Velvet Jewelry
 * Luxe.png: 3:1, plain deep red across the left where the copy sits, and a
 * bezel-set eternity band, emerald-cut pendant and bezel solitaire on red
 * satin with gold-edged ribbon at the right. */
const BANNER_SRC = "/gift-guide/bezel-burgundy-luxe-banner.webp";

/** The banner's own plain red, so the band and the fades match it. */
const RED = "#2b0000";

/** Ivory for the copy on the burgundy. */
const IVORY = "#f5efe4";

/**
 * "Bezel-Set Styles" - after the matching banner on Stuller's holiday page:
 * a full-bleed band with the copy on the left, built the same way as
 * the diamonds banner so the two read as a pair - a Cormorant Italic line
 * over a gold Bodoni word.
 *
 * On tablets the copy sits on the plain red and the right half of the
 * banner - the three pieces - forms a 3:2 band beneath it. On phones the
 * pieces lead instead: a 5:4 crop across the top, then the title and
 * button (the paragraph is left to larger screens).
 */
export function GiftGuideBezel() {
  return (
    // Desktop height follows the copy, with only a little padding above and
    // below; the picture covers the band, cropped top and bottom.
    <section
      id="bezel"
      aria-labelledby="bezel-heading"
      className="relative isolate flex items-center overflow-hidden pt-14 max-sm:pt-[80vw] max-sm:pb-12 lg:py-10"
      style={{ color: IVORY, backgroundColor: RED }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] max-sm:top-0 max-sm:bottom-auto max-sm:aspect-[5/4] lg:inset-0 lg:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On tablets the 3:2 box shows the right half of the 3:1 banner,
          // which renders about twice the screen width; the phone 5:4 box
          // shows 56% to 98%, the three pieces (59% to 94%) whole, at 2.4x
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 200vw, 240vw"
          className="object-cover object-right max-sm:object-[97%_50%] lg:object-center"
        />
        {/* Phones: the picture fades down into the plain red above the
            copy; tablets: it fades up into the red under the copy; desktop:
            a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2b0000_0%,rgb(43_0_0/0.6)_18%,transparent_45%)] max-sm:bg-[linear-gradient(0deg,#2b0000_0%,rgb(43_0_0/0.5)_5%,transparent_14%)] lg:bg-[radial-gradient(ellipse_45%_80%_at_22%_50%,rgb(35_5_4/0.4),transparent)]" />
      </div>

      <div className="w-full px-edge">
        <div>
          {/* No width cap on the block: the large title reaches into the
              plain middle of the banner, while the paragraph keeps a
              readable measure */}
          <div className="max-sm:text-center">
            <BannerTitle id="bezel-heading" lead="Bezel-Set" accent="Styles" />

            <p className={`mt-[clamp(1rem,2.5vh,1.5rem)] max-sm:hidden max-w-[64ch] lg:max-w-[52ch] xl:max-w-[64ch] text-pretty ${SUBTEXT} ${SUBTEXT_ON_DARK}`}>
              A fresh take on diamond jewelry, bezel settings frame each stone
              with a smooth, polished edge that feels modern, refined, and easy
              to wear. From rings to necklaces, these are pieces that work
              beautifully for everyday looks and feel special enough for
              gifting.
            </p>

            <div className="mt-[clamp(1.25rem,3vh,2rem)]">
              <GiftGuideButton href="/categories" variant="gold">
                Shop Bezel Jewelry
              </GiftGuideButton>
            </div>
          </div>

          {/* Tablets: room under the copy for the jewelry */}
          <div aria-hidden className="aspect-[3/2] max-sm:hidden lg:hidden" />
        </div>
      </div>
    </section>
  );
}
