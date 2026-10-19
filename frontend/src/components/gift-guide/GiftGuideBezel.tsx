import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { BannerTitle } from "./BannerTitle";

/** The burgundy velvet banner, from GiftPageImages/Burgundy Velvet Jewelry
 * Luxe.png: 3:1, plain deep red across the left where the copy sits, and a
 * bezel-set eternity band, emerald-cut pendant and bezel solitaire on red
 * satin with gold-edged ribbon at the right. */
const BANNER_SRC = "/gift-guide/bezel-burgundy-luxe-banner.webp";

/** The banner's own plain red, so the band and the fades match it. */
const RED = "#2b0000";

/** Ivory for the copy on the burgundy. */
const IVORY = "#f5efe4";

/**
 * "Bezel-Set Styles" - after the matching banner on Stuller's holiday page:
 * a full-bleed band with the copy on the left, built the same way as
 * the diamonds banner so the two read as a pair - a Cormorant Italic line
 * over a gold Bodoni word.
 *
 * On phones the copy sits on the plain red and the right half of the banner -
 * the three pieces - forms a 3:2 band beneath it.
 */
export function GiftGuideBezel() {
  return (
    // Desktop height is at least the banner's own shape (width / 3) clamped
    // between a floor and 80svh, growing if the copy needs it - a min-height,
    // not aspect-ratio + min-height, since that pair widens the box past the
    // viewport whenever the floor wins.
    <section
      aria-labelledby="bezel-heading"
      className="relative isolate flex items-center overflow-hidden pt-14 lg:min-h-[clamp(26rem,33.333vw,80svh)] lg:py-10"
      style={{ color: IVORY, backgroundColor: RED }}
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
        {/* Phones: the picture fades up into the plain red under the copy;
            desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2b0000_0%,rgb(43_0_0/0.6)_18%,transparent_45%)] lg:bg-[radial-gradient(ellipse_45%_80%_at_22%_50%,rgb(35_5_4/0.4),transparent)]" />
      </div>

      <div className="w-full px-edge">
        {/* Desktop: the copy is centred in the plain left of the banner,
            clear of the jewelry, rather than pressed to the gutter */}
        <div className="lg:flex lg:w-[56%] lg:justify-center">
          <div className="w-full lg:max-w-[clamp(30rem,42vw,44rem)]">
            <BannerTitle id="bezel-heading" lead="Bezel-Set" accent="Styles" />

            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-[56ch] text-[clamp(1rem,1.25vw,1.1875rem)] leading-relaxed text-pretty text-[#f5efe4]/80">
              A fresh take on diamond jewelry, bezel settings frame each stone
              with a smooth, polished edge that feels modern, refined, and easy
              to wear. From rings to necklaces, these are pieces that work
              beautifully for everyday looks and feel special enough for
              gifting.
            </p>

            <div className="mt-[clamp(1.25rem,3vh,2rem)]">
              <PillButton href="/categories" variant="gold" size="sm" icon="arrow">
                Shop Bezel Jewelry
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
