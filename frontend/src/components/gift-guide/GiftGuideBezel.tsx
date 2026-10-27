import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Bezel-Set Styles", from GiftPageImages/Bezel/Luxury Jewelry on Crimson
 * Satin.png (1198x1313): a plain warm off-white surface across the left 42%
 * and, on a drape of crimson satin running off the top, right and bottom
 * edges, the jewelry stacked top to bottom from 52% to 92% across - the
 * emerald-cut bezel pendant (its chain running in from the top edge), the
 * bezel eternity band, then the white-gold bezel solitaire. On phones the
 * photo is square rather than 3:2, so the pendant and the solitaire keep
 * their place at either end. The photo runs the half's full height (`fill`), held to the right,
 * so the satin has no top or bottom edge to fade; its own off-white side
 * sits behind the copy, so there is no veil. Light, as Bridal is: ink copy
 * beside the dark Color half. One half of a row with Color
 * (GiftGuideHalfBanner).
 */
export function GiftGuideBezel() {
  return (
    <GiftGuideHalfBanner
      id="bezel"
      title="Bezel-Set Styles"
      src="/gift-guide/bezel/bezel-crimson-satin-banner-v2.webp"
      position="100% 50%"
      photo="small"
      ground="#f9f4f0"
      tone="light"
      veil={false}
      fill
      phoneAspect="max-md:aspect-square"
      shape="md:aspect-[1198/1313]"
    >
      <HalfBannerText>
        Bezel settings frame each stone in a smooth, polished edge: modern,
        refined, and special enough for gifting.
      </HalfBannerText>
      <HalfBannerActions>
        <GiftGuideButton href="/categories">Shop Bezel Jewelry</GiftGuideButton>
      </HalfBannerActions>
    </GiftGuideHalfBanner>
  );
}
