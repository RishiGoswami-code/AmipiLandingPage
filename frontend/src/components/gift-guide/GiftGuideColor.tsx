import { GiftGuideButton } from "./GiftGuideButton";
import { FeatureActions, GiftGuideFeature } from "./GiftGuideFeature";
import { BODY } from "./GiftGuideTheme";

/**
 * "Color" - the coloured-gemstone holiday trend, from GiftPageImages/COLOR/
 * Luxury Gemstone Jewelry on Golden Satin.png: 3:1, dark bronze satin at the
 * left and four pieces on golden satin from 47% to 95% across - a ruby
 * tennis bracelet, a diamond and sapphire necklace hanging in from the top
 * edge, an emerald and diamond band, and emerald hoops. Photo on the right.
 *
 * The satin is vivid, so the photo is dimmed and desaturated a little to
 * sit calmly beside the copy.
 */
export function GiftGuideColor() {
  return (
    <GiftGuideFeature
      id="color"
      title="Color"
      src="/gift-guide/color-gemstones-golden-satin-v2-banner.webp"
      position="94% 50%"
      photoSide="right"
      photoClassName="brightness-[.9] saturate-[.8]"
    >
      <p className={`max-w-[48ch] text-pretty ${BODY}`}>
        Bring a little more personality to holiday gifting with rich emeralds,
        deep rubies, and vibrant gemstone accents. Bold enough to stand out,
        easy enough to wear every day, and made to feel special long after the
        season is over.
      </p>
      <FeatureActions>
        <GiftGuideButton href="/categories">Shop Now</GiftGuideButton>
      </FeatureActions>
    </GiftGuideFeature>
  );
}
