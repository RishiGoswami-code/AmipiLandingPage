import { Gem, Lightbulb, Trophy, UserRound, type LucideIcon } from "lucide-react";
import { GiftGuideButton } from "./GiftGuideButton";
import { GiftGuideBanner } from "./GiftGuideBanner";
import { CHAMPAGNE, GREEN, SUBHEAD_TYPE } from "./GiftGuideTheme";

/**
 * Why custom - the four reasons from the Custom Design Studio page
 * (src/app/custom/page.tsx, verbatim from amipi.com/custom), each cut to the
 * one sentence that carries it.
 */
const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: UserRound,
    title: "Personalization",
    body: "Custom-designed jewelry allows you to create a piece that reflects your unique style, personality, and preferences.",
  },
  {
    icon: Gem,
    title: "Sentimental Value",
    body: "The ability to incorporate personal elements, such as heirloom stones or symbols, adds significant sentimental value to the jewelry.",
  },
  {
    icon: Lightbulb,
    title: "Unique Design",
    body: "Custom jewelry ensures that you own a design that is exclusive to you.",
  },
  {
    icon: Trophy,
    title: "Long-Term Satisfaction",
    body: "Knowing that your piece is uniquely yours and crafted to your specifications enhances the joy of wearing it for years to come.",
  },
];

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom), as the team's
 * "Made for You" mockup: an evergreen band, the copy at the left and the
 * photo at the right fading into the green (GiftGuideBanner). The photo is
 * GiftPageImages/Custom/Luxurious Rings in Warm Sunlight.png: 3:1, plain
 * sunlit cream at the left and, from 62% to 94% across, an emerald-cut halo
 * ring on a travertine block, a green flower bypass ring and a pink
 * sapphire eternity band - so the crop is held to the right edge.
 *
 * The copy is the studio page's in brief: "Why Custom Jewelry?", the four
 * reasons with line icons, and the button. The reasons' sentences show on
 * tablets and from 1280px; on phones, and from 1024 to 1280px where the
 * copy shares the band with the photo in a narrow column, the titles stand
 * alone so the band stays short.
 */
export function GiftGuideCustom() {
  return (
    <GiftGuideBanner
      id="custom"
      eyebrow="Custom Jewelry"
      title="Made for You"
      src="/gift-guide/custom/rings-warm-sunlight-v3-banner.webp"
      position="100% 50%"
      ground={GREEN}
    >
      <h3 className={`mt-6 ${SUBHEAD_TYPE}`} style={{ color: CHAMPAGNE }}>
        Why Custom Jewelry?
      </h3>

      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-10">
        {REASONS.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex flex-col items-start gap-1.5">
            <Icon aria-hidden className="h-6 w-6" strokeWidth={1.4} style={{ color: CHAMPAGNE }} />
            <h4 className="text-[0.9375rem] leading-snug font-bold">{title}</h4>
            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-[#f5efe4]/75 max-sm:hidden lg:max-xl:hidden">
              {body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <GiftGuideButton href="/custom">Get Started</GiftGuideButton>
      </div>
    </GiftGuideBanner>
  );
}
