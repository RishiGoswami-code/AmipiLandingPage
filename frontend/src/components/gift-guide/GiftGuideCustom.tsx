import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideBanner } from "./GiftGuideBanner";
import { GREEN } from "./GiftGuideTheme";

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom), as the team's
 * "Made for You" mockup (frontend/Update), whose copy it uses verbatim: an
 * evergreen band, the copy at the left and the photo at the right
 * (GiftGuideBanner). The photo is GiftPageImages/Custom/Emerald Elegance
 * with Diamond and Pink Gemstone Rings.png, its velvet graded to the page's
 * evergreen (#0f3b2a) so it meets the band without a seam: 3:1, plain green
 * across the left half and, from 53% to 92% across, a round diamond
 * split-shank solitaire and an upright pink sapphire eternity band. On
 * phones the 2:1 crop is held to the right edge, so both rings show whole.
 */
export function GiftGuideCustom() {
  return (
    <GiftGuideBanner
      id="custom"
      eyebrow="Custom Jewelry"
      title="Made for You"
      src="/gift-guide/custom/diamond-pink-sapphire-evergreen-banner.webp"
      position="100% 50%"
      ground={GREEN}
    >
      <p className="mt-6 max-w-[46ch] text-[clamp(1.0625rem,1.4vw,1.3125rem)] leading-relaxed text-pretty text-[#f5efe4]/85">
        Bring your vision to life with our custom design experience. A
        meaningful, one-of-a-kind gift for life&rsquo;s most special moments.
      </p>

      <div className="mt-8">
        <GiftGuideButton href="/custom">Create a Custom Design</GiftGuideButton>
      </div>
    </GiftGuideBanner>
  );
}
