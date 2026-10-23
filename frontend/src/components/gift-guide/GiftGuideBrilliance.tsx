import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "The Season Starts with Diamonds" - the left half of the Diamonds and
 * Bridal row, from GiftPageImages/Natural or Lab Grown/Emerald Velvet
 * Diamond Collection.png: 3:2, plain near-black evergreen velvet across the
 * left half and eight loose diamonds (round, marquise, emerald, oval,
 * princess, pear, a small round and cushion) from 50% to 93% across, with a
 * pine sprig in the top-right corner - so the crop is held to the right.
 *
 * Both buttons link to /categories until the natural and lab-grown pages
 * exist.
 */
export function GiftGuideBrilliance() {
  return (
    <GiftGuideHalfBanner
      id="diamonds"
      title="The Season Starts with Diamonds"
      src="/gift-guide/diamonds/emerald-velvet-diamonds.webp"
      position="100% 50%"
      ground="#021a10"
    >
      <HalfBannerText>
        From natural diamonds to lab-grown favorites, explore beautiful pieces
        your customers will be looking for this holiday season.
      </HalfBannerText>
      <HalfBannerActions>
        <GiftGuideButton href="/categories">Shop Natural Diamond Jewelry</GiftGuideButton>
        <GiftGuideButton href="/categories">Shop Lab-Grown Diamond Jewelry</GiftGuideButton>
      </HalfBannerActions>
    </GiftGuideHalfBanner>
  );
}
