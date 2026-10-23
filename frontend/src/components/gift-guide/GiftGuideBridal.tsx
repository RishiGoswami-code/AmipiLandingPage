import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Styles for the Season of “Yes”" - the right half of the
 * Diamonds and Bridal row, from GiftPageImages/Bridal/Elegant Diamond Ring
 * in Velvet Box.png (the light one): 3:2, a plain warm off-white surface
 * across the left half and, from 48% to 95% across, the oval solitaire
 * (Bridal/OVAL DIAMOND RING.png) in an open red velvet ring box on a fold of
 * red velvet, with a pine sprig and berries in the top-right corner - so
 * the crop is held to the right. Light, as in the mockups: ink copy on the
 * off-white, beside the green Diamonds half.
 *
 * Links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    <GiftGuideHalfBanner
      id="bridal"
      title="Styles for the Season of “Yes”"
      src="/gift-guide/bridal/oval-ring-velvet-box-light.webp"
      position="100% 50%"
      ground="#f9f4f0"
      tone="light"
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
