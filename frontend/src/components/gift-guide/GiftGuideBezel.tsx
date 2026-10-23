import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Bezel-Set Styles", from GiftPageImages/Burgundy Velvet Jewelry Luxe.png:
 * 3:1, plain deep red at the left and a bezel-set eternity band, emerald-cut
 * pendant and bezel solitaire on red satin from 59% to 94% across - so the
 * crop is held near the right edge. One half of a row with Color, laid out
 * as Diamonds and Bridal are (GiftGuideHalfBanner), on the photo's own red.
 */
export function GiftGuideBezel() {
  return (
    <GiftGuideHalfBanner
      id="bezel"
      title="Bezel-Set Styles"
      src="/gift-guide/bezel-burgundy-luxe-banner.webp"
      position="97% 50%"
      photo="small"
      ground="#2e0101"
    >
      <HalfBannerText>
        A fresh take on diamond jewelry, bezel settings frame each stone with a
        smooth, polished edge that feels modern, refined, and easy to wear.
        From rings to necklaces, these are pieces that work beautifully for
        everyday looks and feel special enough for gifting.
      </HalfBannerText>
      <HalfBannerActions>
        <GiftGuideButton href="/categories">Shop Bezel Jewelry</GiftGuideButton>
      </HalfBannerActions>
    </GiftGuideHalfBanner>
  );
}
