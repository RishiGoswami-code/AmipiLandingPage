import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { BannerTitle } from "./BannerTitle";

/** Ivory for the copy on the gold, as on the navy bands. */
const IVORY = "#f5efe4";

/** The gold lightscape behind the whole section: dark bronze at the left
 * where the copy sits, a beam of light and gold dust sweeping up to the
 * top-right. */
const LIGHTSCAPE = "/gift-guide/bridal/golden-lightscape.webp";

/**
 * "Shop Bridal Styles" - a full-bleed gold banner, after the ring banner on
 * Stuller's holiday page: the copy on the dark left of the lightscape and the
 * five rings together in the light at the right (under the copy on phones).
 * On desktop the band is 3:1, the lightscape's own shape, so the whole
 * picture shows uncropped, built the same way as the Brilliance and Bezel
 * banners.
 *
 * Links to /categories until the bridal pages exist.
 */
export function GiftGuideBridal() {
  return (
    // Desktop height is the banner's own shape (width / 3) clamped between a
    // floor and 80svh - set as a height, not aspect-ratio + min-height, since
    // that pair widens the box past the viewport whenever the floor wins.
    <section
      aria-labelledby="bridal-heading"
      className="relative isolate flex items-center overflow-hidden bg-[#140e07] px-edge py-16 lg:h-[clamp(30rem,33.333vw,80svh)] lg:py-10"
      style={{ color: IVORY }}
    >
      <Image
        quality={90}
        src={LIGHTSCAPE}
        alt=""
        fill
        // On phones the 3:1 picture fills a tall section, so it renders
        // several screens wide - ask for the full file, or it is upscaled
        sizes="(min-width: 1024px) 100vw, 2172px"
        className="-z-10 object-cover object-[75%_50%] lg:object-center"
      />
      <div className="relative w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-12">
          <div>
            {/* The kicker with a trailing rule, as on the About page */}
            <p className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#dcbc7e] uppercase">
              Bridal
              <span className="h-px w-20 bg-[#dcbc7e]/50 sm:w-32" />
            </p>
            {/* The same staggered title as the Diamonds and Bezel banners */}
            <div className="mt-4">
              <BannerTitle
                id="bridal-heading"
                lead="Shop Bridal"
                accent="Styles"
                uppercase
              />
            </div>
            <p className="mt-5 max-w-[46ch] text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/80">
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
      </div>
    </section>
  );
}
