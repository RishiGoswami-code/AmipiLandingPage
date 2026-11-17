import { GiftGuideHalfBanner, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Color" - the coloured-gemstone holiday trend, from GiftPageImages/COLOR/
 * Emerald Hoops and Ruby Tennis Bracelet.png (1416x1111): on espresso satin
 * at the right, the pieces run top to bottom - the emerald hoops near the
 * top, the emerald and diamond band lying flat in the middle, the ruby tennis bracelet
 * near the bottom - on a plain espresso ground (#1f0d02) at the left, the
 * dark half beside Bezel's light one. The photo's own plain side sits behind
 * the copy without a veil. It runs the half's full height (`fill`), so
 * neither the hoops nor the bracelet are cropped, and on phones it is 5:4
 * rather than 3:2 for the same reason (GiftGuideHalfBanner). No button of
 * its own: Bridal, Bezel and Color share one "Shop Now" under this row
 * (app/gift-guide/page.tsx).
 */
export function GiftGuideColor() {
  return (
    <GiftGuideHalfBanner
      id="color"
      title="Color"
      src="/gift-guide/color/color-emerald-ruby-espresso-banner-v3.webp"
      position="100% 50%"
      photo="medium"
      ground="#1f0d02"
      veil={false}
      fill
      phoneAspect="max-md:aspect-[5/4]"
      shape="md:aspect-[1416/1111]"
    >
      <HalfBannerText>
        Rich emeralds and deep rubies bring personality to holiday gifting.
        Bold enough to stand out, easy enough to wear every day.
      </HalfBannerText>
    </GiftGuideHalfBanner>
  );
}
