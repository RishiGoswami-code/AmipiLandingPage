import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { BannerTitle } from "./BannerTitle";

/** The blue diamond banner, from GiftPageImages/LuxuaryBlueDiamond.png:
 * about 3:1, plain midnight blue across the left half and, on the right, a
 * blue satin ribbon with loose diamonds, a tray of melee and hands holding a
 * diamond and a loupe. Full size (2123px wide). */
const BANNER_SRC = "/gift-guide/season-diamonds-banner.webp";

/** The banner's own plain blue, so the band and the fades match it. */
const BLUE = "#000c21";

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/**
 * "The Season Starts with Diamonds" - after the matching banner on Stuller's
 * holiday page: copy on the plain blue at the left, the ribbon, diamonds and
 * loupe of the banner at the right, with one button each for natural and lab-grown
 * diamond jewelry. The headline repeats the hero's pairing - a Cormorant
 * Italic line over a gold Bodoni word - so the two navy bands read as
 * a set.
 *
 * Full-bleed like the hero's band. On phones the copy sits on the plain blue
 * and the right half of the banner - the ribbon, hands and diamonds - forms
 * a 3:2 band beneath it.
 */
export function GiftGuideBrilliance() {
  return (
    // Desktop height is the banner's own shape (about width / 2.87) clamped between a
    // floor and 80svh - set as a height, not aspect-ratio + min-height, since
    // that pair widens the box past the viewport whenever the floor wins.
    <section
      aria-labelledby="brilliance-heading"
      className="relative isolate overflow-hidden lg:h-[clamp(28rem,34.9vw,80svh)]"
      style={{ color: IVORY, backgroundColor: BLUE }}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 aspect-[3/2] lg:inset-0 lg:aspect-auto">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On phones the 3:2 box shows the right half of the 3:1 banner,
          // which renders about twice the screen width
          sizes="(min-width: 1024px) 100vw, 191vw"
          className="object-cover object-right lg:object-center"
        />
        {/* Phones: the picture fades up into the plain blue under the copy;
            desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#000c21_0%,rgb(0_12_33/0.6)_18%,transparent_45%)] lg:bg-[radial-gradient(ellipse_50%_80%_at_22%_50%,rgb(12_20_40/0.45),transparent)]" />
      </div>

      <div className="h-full px-edge pt-14 lg:pt-0">
        <div className="grid h-full items-center gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10">
          <div>
            <BannerTitle
              id="brilliance-heading"
              lead="The Season Starts with"
              accent="Diamonds"
            />

            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-[40ch] text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/80">
              From natural diamonds to lab-grown favorites, explore beautiful
              pieces your customers will be looking for this holiday season.
            </p>

            <div className="mt-[clamp(1.25rem,3vh,2rem)] flex flex-wrap gap-3">
              <PillButton
                href="/categories"
                variant="gold"
                size="sm"
                icon="arrow"
              >
                Shop Natural Diamond Jewelry
              </PillButton>
              <PillButton
                href="/categories"
                variant="light"
                size="sm"
                icon="arrow"
              >
                Shop Lab-Grown Diamond Jewelry
              </PillButton>
            </div>
          </div>

          {/* Phones: room under the copy for the picture */}
          <div aria-hidden className="aspect-[3/2] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
