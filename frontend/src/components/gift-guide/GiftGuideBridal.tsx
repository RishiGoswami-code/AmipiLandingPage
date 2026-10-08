import { PillButton } from "@/components/ui/PillButton";
import { GiftGuideCard } from "./GiftGuideCard";

/** Ivory for the copy on the gold, as on the navy bands. */
const IVORY = "#f5efe4";

/**
 * The gold ground, after the ring banner on Stuller's bridal block: dark
 * espresso at the left where the copy sits, warming to gold at the right, a
 * pool of light from the top-right corner with a soft diagonal beam through
 * it, and a darker floor so the card captions keep their contrast.
 */
const GOLD_GROUND = [
  "linear-gradient(180deg, transparent 50%, rgba(16,11,5,0.5) 100%)",
  "linear-gradient(125deg, transparent 50%, rgba(255,226,160,0.10) 60%, rgba(255,232,180,0.22) 68%, rgba(255,226,160,0.10) 76%, transparent 86%)",
  "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(245,215,145,0.5), rgba(245,215,145,0.15) 45%, transparent 75%)",
  "linear-gradient(125deg, #15100a 0%, #211810 28%, #3d2e1a 48%, #6e5429 68%, #a8843f 86%, #c19a52 100%)",
].join(", ");

/**
 * AMIPI's featured bridal styles - the ideas sheet's "Bridal / Stack" new
 * collections plus the two core categories. Placeholder photos from the site's
 * existing shots; `position` is the focal point the 4:5 crop keeps.
 */
const STYLES = [
  { title: "Engagement Rings", src: "/categories/engagement-rings.webp", position: "50% 45%" },
  { title: "Wedding Bands", src: "/categories/wedding-bands.webp", position: "50% 50%" },
  { title: "The Bridal Stack", src: "/Collections/Stack.png", position: "50% 45%" },
  { title: "Ever After Bridal Edit", src: "/Collections/ever-after-bridal-edit.webp", position: "50% 60%" },
];

/**
 * "Shop Bridal Styles" - one gold band, after the ring banner on Stuller's
 * holiday page: the copy on the dark left of the gradient, and the four
 * featured styles on the band beneath it, so the whole bridal block reads as
 * one piece. The right of the copy row is left to the light, where a banner
 * photo can go later.
 *
 * Everything links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    <section
      aria-labelledby="bridal-heading"
      className="px-edge py-20 lg:py-24"
      style={{ background: GOLD_GROUND, color: IVORY }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          {/* The kicker with a trailing rule, as on the About page */}
          <p className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#dcbc7e] uppercase">
            Bridal
            <span className="h-px w-20 bg-[#dcbc7e]/50 sm:w-32" />
          </p>
          <h2
            id="bridal-heading"
            className="mt-4 font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
          >
            Shop Bridal Styles
          </h2>
          <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[#f5efe4]/80 sm:text-base">
            Celebrate the moments that last a lifetime with bridal jewelry made
            for every love story - timeless solitaires, modern silhouettes and
            stackable bands, ready for the season of proposals.
          </p>
          <div className="mt-8">
            <PillButton href="/categories" variant="gold" size="sm" icon="arrow">
              Shop Now
            </PillButton>
          </div>
        </div>

        <h3 className="mt-16 flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#dcbc7e] uppercase lg:mt-20">
          Featured Bridal Styles
          <span className="h-px flex-1 bg-[#f5efe4]/20" />
        </h3>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {STYLES.map((style) => (
            <li key={style.title}>
              <GiftGuideCard
                title={style.title}
                src={style.src}
                position={style.position}
                href="/categories"
                tone="dark"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
