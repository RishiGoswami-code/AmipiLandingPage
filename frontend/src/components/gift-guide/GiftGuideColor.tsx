import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The golden shimmer banner, from GiftPageImages/Luxury Jewellery on Golden
 * Shimmer.png: 3:1, plain dark bronze across the left where the copy sits,
 * and an alternating emerald band, emerald hoops and a ruby tennis bracelet
 * on sweeping gold shimmer at the right. */
const BANNER_SRC = "/gift-guide/color-shimmer-jewels-banner.webp";

/** The banner's own plain bronze, so the band and the fades match it. */
const BRONZE = "#290b00";

/** Ivory for the copy on the bronze. */
const IVORY = "#f5efe4";

/** Champagne gold for "Color" - the same ramp as "Gift Guide" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#f6e2b8_0%,#ecd3a0_50%,#dcbc7e_100%)] bg-clip-text text-transparent";

/**
 * "Color" - the coloured-gemstone holiday trend: a full-bleed banner built
 * the same way as "Bezel-Set Styles", with the copy on the left.
 *
 * On phones the copy sits on the plain bronze and the right of the banner -
 * the three pieces - forms a 3:2 band beneath it.
 */
export function GiftGuideColor() {
  return (
    // Desktop height is the banner's own shape (width / 3) clamped between a
    // floor and 80svh - set as a height, not aspect-ratio + min-height, since
    // that pair widens the box past the viewport whenever the floor wins.
    <section
      aria-labelledby="color-heading"
      className="relative isolate flex items-center overflow-hidden pt-14 lg:h-[clamp(26rem,33.333vw,80svh)] lg:pt-0"
      style={{ color: IVORY, backgroundColor: BRONZE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] lg:inset-0 lg:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On phones the 3:2 box shows the right half of the 3:1 banner,
          // which renders about twice the screen width
          sizes="(min-width: 1024px) 100vw, 200vw"
          className="object-cover object-right lg:object-center"
        />
        {/* Phones: the picture fades up into the plain bronze under the copy;
            desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#290b00_0%,rgb(41_11_0/0.6)_18%,transparent_45%)] lg:bg-[radial-gradient(ellipse_45%_80%_at_22%_50%,rgb(40_18_4/0.35),transparent)]" />
      </div>

      <div className="w-full px-edge">
        <div>
          <div className="max-w-xl">
            <h2
              id="color-heading"
              className={`font-[family-name:var(--font-bodoni)] text-[clamp(3.75rem,7.6vw,8rem)] leading-[0.95] font-medium tracking-[0.08em] uppercase ${GOLD_TEXT}`}
            >
              Color
            </h2>
            <p className="mt-4 text-xs font-semibold tracking-[0.3em] text-[#ecd3a0] uppercase sm:text-sm">
              Colored Gemstones
            </p>
            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-[42ch] text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/85">
              Colored gemstones are one of the season&rsquo;s biggest trends.
              Rich greens, deep reds and bright accents bring warmth and
              personality to every holiday gift.
            </p>
            <div className="mt-[clamp(1.25rem,3vh,2rem)]">
              <PillButton href="/categories" variant="light" size="sm" icon="arrow">
                Shop Now
              </PillButton>
            </div>
          </div>

          {/* Phones: room under the copy for the jewelry */}
          <div aria-hidden className="aspect-[3/2] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
