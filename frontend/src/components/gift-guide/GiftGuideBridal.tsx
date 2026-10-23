import { GiftGuideButton } from "./GiftGuideButton";
import { FeatureActions, GiftGuideFeature } from "./GiftGuideFeature";
import { BODY } from "./GiftGuideTheme";

/**
 * "New Bridal Styles for the Season of “Yes”", from GiftPageImages/Bridal/
 * Golden Rings on Shimmering Velvet.png: 3:1, dark bronze velvet at the left
 * and five engagement rings - one on a stone pedestal - on shimmering gold
 * velvet from 42% to 89% across. The card's crop (a little over half the
 * photo's width) is centred on the rings. Photo on the left.
 *
 * Links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    <GiftGuideFeature
      id="bridal"
      title="New Bridal Styles for the Season of “Yes”"
      src="/gift-guide/bridal/golden-rings-velvet-banner.webp"
      position="83% 55%"
      photoSide="left"
    >
      <p className={`max-w-[46ch] text-pretty ${BODY}`}>
        Celebrate forever with our newest bridal styles: timeless solitaires,
        modern settings, and stackable bands designed for proposals, weddings,
        and every moment after.
      </p>
      <FeatureActions>
        <GiftGuideButton href="/categories">Shop Now</GiftGuideButton>
      </FeatureActions>
    </GiftGuideFeature>
  );
}
