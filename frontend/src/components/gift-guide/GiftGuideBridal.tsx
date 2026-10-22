import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { BannerTitle } from "./BannerTitle";

/** Ivory for the copy on the gold, as on the navy bands. */
const IVORY = "#f5efe4";

/** The banner's own plain dark bronze, so the band and the fades match it. */
const BRONZE = "#2f1c05";

/** The bridal banner, from GiftPageImages/Bridal/Golden Rings on Shimmering
 * Velvet.png: 3:1, dark bronze velvet across the left where the copy sits,
 * and five engagement rings - one on a stone pedestal - on shimmering gold
 * velvet from 42% to 89% across, 26% to 85% down. */
const BANNER_SRC = "/gift-guide/bridal/golden-rings-velvet-banner.webp";

/**
 * "New Bridal Styles for the Season of Yes" - a full-bleed gold banner, built
 * the same way as the Custom Jewelry section: from 1280px the photo covers
 * the band, with the copy on its dark left.
 *
 * The rings start well left of centre, so narrower than 1280px the copy
 * would run into them: on tablets the copy sits on the plain bronze and the
 * rings form a band beneath it. On phones the rings lead instead: an 8:5
 * crop across the top with all five rings whole, then the title
 * and button (the paragraph is left to larger screens).
 *
 * Links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    // Desktop height follows the copy, with only a little padding above and
    // below; the picture covers the band, cropped top and bottom.
    <section
      aria-labelledby="bridal-heading"
      className="relative isolate flex items-center overflow-hidden pt-14 max-sm:pt-[calc(100vw*5/8)] max-sm:pb-12 xl:py-10"
      style={{ color: IVORY, backgroundColor: BRONZE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] max-sm:top-0 max-sm:bottom-auto max-sm:aspect-[8/5] sm:aspect-[5/2] xl:inset-0 xl:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On phones an 8:5 box shows the rings' part of the 3:1 banner,
          // which renders about 1.9x the screen width; 5:2 from 640px
          sizes="(min-width: 1280px) 105vw, (min-width: 640px) 120vw, 190vw"
          // The rings sit 42% to 89% across. The phone box shows 39% to 92%,
          // all five whole. From
          // 1280px the picture is nudged 3vw right, so the oval ring clears
          // the three-line paragraph; the strip it uncovers at the left is
          // the section's own bronze, the same as the picture's edge
          className="object-cover object-[82%_55%] max-sm:object-[84%_55%] xl:translate-x-[3vw] xl:object-[100%_55%]"
        />
        {/* Phones: the picture fades down into the plain bronze above the
            copy; tablets: it fades up into the bronze under the copy; from
            1280px: a soft shade behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2f1c05_0%,rgb(47_28_5/0.6)_15%,transparent_40%)] max-sm:bg-[linear-gradient(0deg,#2f1c05_0%,rgb(47_28_5/0.5)_5%,transparent_14%)] xl:bg-[linear-gradient(90deg,rgb(40_24_4/0.5)_0%,rgb(40_24_4/0.25)_25%,transparent_40%)]" />
      </div>

      <div className="w-full px-edge">
        <div className="max-sm:text-center">
          {/* The same staggered title as the Diamonds and Bezel banners,
              its longer lead set a step smaller and broken over two lines,
              with "Yes" as the gold accent */}
          <BannerTitle
            id="bridal-heading"
            lead={
              <>
                New Bridal Styles <br />
                for the Season of
              </>
            }
            accent="“Yes”"
            long
          />
          <p className="mt-5 max-w-[48ch] max-sm:hidden text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/80">
            Celebrate forever with our newest bridal styles: timeless
            solitaires, modern settings, and stackable bands designed for
            proposals, weddings, and every moment after.
          </p>
          <div className="mt-8 max-sm:mt-6">
            <PillButton
              href="/categories"
              variant="gold"
              size="sm"
              icon="arrow"
            >
              Shop Now
            </PillButton>
          </div>
        </div>

        {/* Tablets: room under the copy for the rings */}
        <div aria-hidden className="aspect-[3/2] max-sm:hidden sm:aspect-[5/2] xl:hidden" />
      </div>
    </section>
  );
}
