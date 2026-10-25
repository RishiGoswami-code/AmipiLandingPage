import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideHalfBanner, HalfBannerActions, HalfBannerText } from "./GiftGuideHalfBanner";

/**
 * "Bezel-Set Styles", from GiftPageImages/Bezel/Luxury Jewelry on Crimson
 * Satin.png, extended above and below with its own satin, mirrored (the
 * necklace's strands carried on straight), to 1536x1684: a plain warm
 * off-white surface across the left 42% and, on a drape of crimson satin
 * running off the top, right and bottom edges, the bezel eternity band, the
 * emerald-cut bezel pendant (its chain running in from the top edge) and the
 * white-gold bezel solitaire, from 48% to 98% across and centred top to
 * bottom. The photo runs the half's full height (`fill`), held to the right,
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
      src="/gift-guide/bezel/bezel-crimson-satin-banner.webp"
      position="100% 50%"
      photo="small"
      ground="#f9f4f0"
      tone="light"
      veil={false}
      fill
    >
      <HalfBannerText>
        A fresh take on diamond jewelry, bezel settings frame each stone with a
        smooth, polished edge that feels modern, refined, and easy to wear.
        From rings to necklaces, these are pieces that work beautifully for
        everyday looks and feel special enough for gifting.
      </HalfBannerText>
      <HalfBannerActions>
        <GiftGuideButton href="/categories">Shop Bezel Jewelry</GiftGuideButton>
      </HalfBannerActions>
    </GiftGuideHalfBanner>
  );
}
