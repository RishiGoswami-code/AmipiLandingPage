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
 * would run into them: there the copy sits on the plain bronze and the
 * rings form a band beneath it.
 *
 * Links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    // Desktop height follows the copy, with only a little padding above and
    // below; the picture covers the band, cropped top and bottom.
    <section
      aria-labelledby="bridal-heading"
      className="relative isolate flex items-center overflow-hidden pt-14 xl:py-10"
      style={{ color: IVORY, backgroundColor: BRONZE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] sm:aspect-[5/2] xl:inset-0 xl:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On phones the 3:2 box shows the rings' part of the 3:1 banner,
          // which renders about twice the screen width; 5:2 from 640px
          sizes="(min-width: 1280px) 105vw, (min-width: 640px) 120vw, 200vw"
          // The rings sit 42% to 89% across: on phones the crop is held far
          // enough right that the 3:2 box shows all five (41% to 91%)
          className="object-cover object-[82%_55%] xl:object-[100%_55%]"
        />
        {/* Below 1280px: the picture fades up into the plain bronze under
            the copy; from 1280px: a soft shade behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2f1c05_0%,rgb(47_28_5/0.6)_15%,transparent_40%)] xl:bg-[linear-gradient(90deg,rgb(40_24_4/0.5)_0%,rgb(40_24_4/0.25)_25%,transparent_40%)]" />
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
          {/* 42ch from 1280px keeps the paragraph clear of the oval ring */}
          <p className="mt-5 max-w-[48ch] max-sm:mx-auto text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/80 xl:max-w-[42ch]">
            Celebrate forever with our newest bridal styles: timeless
            solitaires, modern settings, and stackable bands designed for
            proposals, weddings, and every moment after.
          </p>
          <div className="mt-8">
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

        {/* Below 1280px: room under the copy for the rings */}
        <div aria-hidden className="aspect-[3/2] sm:aspect-[5/2] xl:hidden" />
      </div>
    </section>
  );
}
