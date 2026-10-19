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
 * "New Bridal Styles for the Season of Yes" - a full-bleed gold banner, after the ring banner on
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
    // Desktop height follows the copy, with only a little padding above and
    // below; the picture covers the band, cropped top and bottom.
    <section
      aria-labelledby="bridal-heading"
      className="relative isolate flex items-center overflow-hidden bg-[#140e07] px-edge py-14 lg:py-10"
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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div>
            {/* The same staggered title as the Diamonds and Bezel banners,
                its longer lead set a step smaller and broken over two lines,
                with "Yes" as the gold accent */}
            <BannerTitle
              id="bridal-heading"
              lead={
                <>
                  New Bridal Styles <br />
                  for the Season of
                </>
              }
              accent="“Yes”"
              long
            />
            <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/80">
              Celebrate forever with our newest bridal styles: timeless
              solitaires, modern settings, and stackable bands designed for
              proposals, weddings, and every moment after.
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

          {/* The bridal set together on a gold ribbon, in the light, with a
            warm glow behind it. Held to 34rem so it sits inside the band
            with some air above and below rather than filling it */}
          <div className="relative mx-auto aspect-[1200/744] w-full max-w-[34rem] lg:mr-0">
            <div className="absolute -inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(255,226,160,0.42),rgba(245,205,130,0.14)_55%,transparent)]" />
            <Image
              quality={90}
              src="/gift-guide/bridal/together.webp"
              alt="AMIPI engagement rings together on a gold ribbon"
              fill
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-contain drop-shadow-[0_18px_24px_rgba(20,12,2,0.45)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
