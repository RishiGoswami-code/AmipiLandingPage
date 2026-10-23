import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "New Bridal Styles for the Season of “Yes”" - the right half of the
 * Diamonds and Bridal row, from GiftPageImages/Bridal/Elegant Diamond Ring
 * in Velvet Box.png: 3:2, plain near-black red velvet across the left half
 * and, from 48% to 94% across, the oval solitaire (Bridal/OVAL DIAMOND
 * RING.png) in an open red velvet ring box, with a pine sprig and berries
 * in the top-right corner - so the crop is held to the right.
 *
 * Links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    <GiftGuideHalfBanner
      id="bridal"
      title="New Bridal Styles for the Season of “Yes”"
      src="/gift-guide/bridal/oval-ring-velvet-box.webp"
      position="100% 50%"
      ground="#1a0101"
    >
      <HalfBannerText>
        Celebrate forever with our newest bridal styles: timeless solitaires,
        modern settings, and stackable bands designed for proposals, weddings,
        and every moment after.
      </HalfBannerText>
      <HalfBannerActions>
        <GiftGuideButton href="/categories">Shop Now</GiftGuideButton>
      </HalfBannerActions>
    </GiftGuideHalfBanner>
  );
}
