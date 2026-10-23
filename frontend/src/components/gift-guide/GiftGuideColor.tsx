import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Color" - the coloured-gemstone holiday trend, from GiftPageImages/COLOR/
 * Luxury Gemstone Jewelry on Golden Satin.png: 3:1, dark bronze satin at the
 * left and four pieces on golden satin from 47% to 95% across - a ruby
 * tennis bracelet, a diamond and sapphire necklace hanging in from the top
 * edge, an emerald and diamond band, and emerald hoops. The other half of
 * the row with Bezel (GiftGuideHalfBanner), on the photo's own bronze.
 */
export function GiftGuideColor() {
  return (
    <GiftGuideHalfBanner
      id="color"
      title="Color"
      src="/gift-guide/color-gemstones-golden-satin-v2-banner.webp"
      position="94% 50%"
      photo="small"
      ground="#251203"
    >
      <HalfBannerText>
        Bring a little more personality to holiday gifting with rich emeralds,
        deep rubies, and vibrant gemstone accents. Bold enough to stand out,
        easy enough to wear every day, and made to feel special long after the
        season is over.
      </HalfBannerText>
      <HalfBannerActions>
        <GiftGuideButton href="/categories">Shop Now</GiftGuideButton>
      </HalfBannerActions>
    </GiftGuideHalfBanner>
  );
}
