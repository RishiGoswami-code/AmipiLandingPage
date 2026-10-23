import { GiftGuideButton } from "./GiftGuideButton";
import { FeatureActions, GiftGuideFeature } from "./GiftGuideFeature";
import { BODY } from "./GiftGuideTheme";

/**
 * "Bezel-Set Styles", from GiftPageImages/Burgundy Velvet Jewelry Luxe.png:
 * 3:1, plain deep red at the left and a bezel-set eternity band, emerald-cut
 * pendant and bezel solitaire on red satin from 59% to 94% across - so the
 * card's crop is held near the right edge. Photo on the left.
 *
 * Lighter than the full-bleed red band it was: the photo is one half of a
 * white card, like every other section, rather than the whole fold.
 */
export function GiftGuideBezel() {
  return (
    <GiftGuideFeature
      id="bezel"
      title="Bezel-Set Styles"
      src="/gift-guide/bezel-burgundy-luxe-banner.webp"
      position="97% 50%"
      photoSide="left"
    >
      <p className={`max-w-[50ch] text-pretty ${BODY}`}>
        A fresh take on diamond jewelry, bezel settings frame each stone with a
        smooth, polished edge that feels modern, refined, and easy to wear.
        From rings to necklaces, these are pieces that work beautifully for
        everyday looks and feel special enough for gifting.
      </p>
      <FeatureActions>
        <GiftGuideButton href="/categories">Shop Bezel Jewelry</GiftGuideButton>
      </FeatureActions>
    </GiftGuideFeature>
  );
}
