import { GiftGuideButton } from "./GiftGuideButton";
import { FeatureActions, GiftGuideFeature } from "./GiftGuideFeature";
import { BODY } from "./GiftGuideTheme";

/**
 * "The Season Starts with Diamonds", from GiftPageImages/LuxuaryBlueDiamond.png:
 * about 3:1, plain midnight blue across the left half and, on the right
 * (69% to 100% across), a blue satin ribbon with loose diamonds, a tray of
 * melee and hands holding a diamond and a loupe - so the card's crop is held
 * to the right edge. Photo on the right.
 *
 * Both buttons link to /categories until the natural and lab-grown pages
 * exist.
 */
export function GiftGuideBrilliance() {
  return (
    <GiftGuideFeature
      id="diamonds"
      title="The Season Starts with Diamonds"
      src="/gift-guide/season-diamonds-banner.webp"
      position="100% 50%"
      photoSide="right"
    >
      <p className={`max-w-[44ch] text-pretty ${BODY}`}>
        From natural diamonds to lab-grown favorites, explore beautiful pieces
        your customers will be looking for this holiday season.
      </p>
      <FeatureActions>
        <GiftGuideButton href="/categories">Shop Natural Diamond Jewelry</GiftGuideButton>
        <GiftGuideButton href="/categories">Shop Lab-Grown Diamond Jewelry</GiftGuideButton>
      </FeatureActions>
    </GiftGuideFeature>
  );
}
