import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Color" - the coloured-gemstone holiday trend, from GiftPageImages/COLOR/
 * Emerald Hoops and Ruby Tennis Bracelet.png: a ruby tennis bracelet and a
 * pair of emerald hoops on espresso satin at the right-centre, on a plain
 * espresso ground (#1f0d02) - the dark half beside Bezel's light one, as
 * the mockup pairs a light and a dark half. The square photo is widened on
 * the left with that ground, to 1600x1254, so the bracelet starts about
 * halfway across and clears the copy, and the photo's own plain side sits
 * behind the copy without a veil; `medium` keeps the pair from shrinking
 * into the corner side by side (GiftGuideHalfBanner).
 */
export function GiftGuideColor() {
  return (
    <GiftGuideHalfBanner
      id="color"
      title="Color"
      src="/gift-guide/color/color-emerald-ruby-espresso-banner.webp"
      position="100% 50%"
      photo="medium"
      ground="#1f0d02"
      veil={false}
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
