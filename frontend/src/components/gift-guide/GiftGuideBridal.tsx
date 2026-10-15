import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { GiftGuideCard } from "./GiftGuideCard";

/** Ivory for the copy on the gold, as on the navy bands. */
const IVORY = "#f5efe4";

/** The gold lightscape behind the whole section: dark bronze at the left
 * where the copy sits, a beam of light and gold dust sweeping up to the
 * top-right. */
const LIGHTSCAPE = "/gift-guide/bridal/golden-lightscape.webp";

/** AMIPI's featured bridal styles, each a styled holiday shot of the ring. */
const STYLES = [
  {
    title: "Bridal With Unique Shapes",
    src: "/gift-guide/bridal/unique-shapes.webp",
  },
  { title: "East-West Styles", src: "/gift-guide/bridal/east-west.webp" },
  {
    title: "Split Shank Engagement Rings",
    src: "/gift-guide/bridal/split-shank.webp",
  },
  {
    title: "Oval Solitaires",
    src: "/gift-guide/bridal/oval-holiday-glow.webp",
  },
  {
    title: "Yellow Gold Solitaires",
    src: "/gift-guide/bridal/classic-solitaire.webp",
  },
];

/**
 * "Shop Bridal Styles" - one gold band, after the ring banner on Stuller's
 * holiday page: the copy on the dark left of the gradient, and the four
 * featured styles on the band beneath it, so the whole bridal block reads as
 * one piece, all on the gold lightscape. The right of the copy row holds the
 * five rings together (under the copy on phones), and the five featured
 * styles sit on the band beneath it.
 *
 * Everything links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    <section
      aria-labelledby="bridal-heading"
      className="relative isolate overflow-hidden bg-[#140e07] px-edge py-20 lg:py-24"
      style={{ color: IVORY }}
    >
      <Image
        quality={90}
        src={LIGHTSCAPE}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[75%_50%]"
      />
      {/* Darken the floor a little so the card captions keep their contrast */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_55%,rgba(12,8,3,0.55)_100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-12">
          <div>
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
              Celebrate the moments that last a lifetime with bridal jewelry
              made for every love story - timeless solitaires, modern
              silhouettes and stackable bands, ready for the season of
              proposals.
            </p>
            <div className="mt-8">
              <PillButton
                href="/categories"
                variant="gold"
                size="sm"
                icon="arrow"
              >
                Shop Now
              </PillButton>
            </div>
          </div>

          {/* The bridal set together on a gold ribbon, large in the light,
            with a warm glow behind it */}
          <div className="relative mx-auto aspect-[1200/744] w-full max-w-[38rem] lg:mr-0">
            <div className="absolute -inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(255,226,160,0.42),rgba(245,205,130,0.14)_55%,transparent)]" />
            <Image
              quality={90}
              src="/gift-guide/bridal/together.webp"
              alt="AMIPI engagement rings together on a gold ribbon"
              fill
              sizes="(min-width: 1024px) 38rem, 90vw"
              className="object-contain drop-shadow-[0_18px_24px_rgba(20,12,2,0.45)]"
            />
          </div>
        </div>

        <h3 className="mt-16 flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#dcbc7e] uppercase lg:mt-20">
          Featured Bridal Styles
          <span className="h-px flex-1 bg-[#f5efe4]/20" />
        </h3>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
          {STYLES.map((style) => (
            <li key={style.title}>
              <GiftGuideCard
                title={style.title}
                src={style.src}
                href="/categories"
                tone="dark"
                // The 4:5 card crops a landscape photo, which renders about
                // 1.6x the card's width - ask for that, or it is upscaled
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 48vw, 72vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
