import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "New Bridal Styles for the Season of “Yes”" - the right half of the
 * Diamonds and Bridal row, from GiftPageImages/Bridal/Golden Rings on
 * Shimmering Velvet.png: 3:1, dark bronze velvet at the left and five
 * engagement rings - one on a stone pedestal - on shimmering gold velvet
 * from 42% to 89% across. The half's crop (about half the photo's width)
 * keeps the rings; the bronze fade carries the copy over them.
 *
 * A stand-in until the bridal photo for this row arrives. Links to
 * /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    <GiftGuideHalfBanner
      id="bridal"
      title="New Bridal Styles for the Season of “Yes”"
      src="/gift-guide/bridal/golden-rings-velvet-banner.webp"
      position="83% 55%"
      ground="#2b1a07"
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
