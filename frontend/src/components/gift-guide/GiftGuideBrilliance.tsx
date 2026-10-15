import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The blue diamond banner: about 3:1, plain deep blue across the left half
 * and, on the right, a blue satin ribbon on velvet with loose diamonds and
 * hands holding a diamond and a loupe. Full size (2123px wide). */
const BANNER_SRC = "/gift-guide/brilliance-blue-diamond-banner.webp";

/** The banner's own plain blue, so the band and the fades match it. */
const BLUE = "#10192c";

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/** Champagne gold for "Brilliance" - the same ramp as "Catalog" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/**
 * "Give the Gift of Brilliance" - after the matching banner on Stuller's
 * holiday page: copy on the plain blue at the left, the ribbon, diamonds and
 * loupe of the banner at the right, with one button each for natural and lab-grown
 * diamond jewelry. The headline repeats the hero's pairing - a Cormorant
 * Italic line over a gold Bodoni capital word - so the two navy bands read as
 * a set.
 *
 * Full-bleed like the hero's band. On phones the copy sits on the plain blue
 * and the right half of the banner - the ribbon, hands and diamonds - forms
 * a 3:2 band beneath it.
 */
export function GiftGuideBrilliance() {
  return (
    <section
      aria-labelledby="brilliance-heading"
      className="relative isolate overflow-hidden lg:aspect-[2123/741] lg:max-h-[80svh] lg:min-h-[28rem]"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#10192c_0%,rgb(16_25_44/0.6)_18%,transparent_45%)] lg:bg-[radial-gradient(ellipse_50%_80%_at_22%_50%,rgb(12_20_40/0.45),transparent)]" />
      </div>

      <div className="h-full px-edge pt-14 lg:pt-0">
        <div className="mx-auto grid h-full max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="max-w-2xl">
            <h2 id="brilliance-heading" className="leading-none">
              <span className="block font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.15] font-medium italic">
                Give the Gift of
              </span>
              <span
                className={`mt-[0.15em] block font-[family-name:var(--font-bodoni)] text-[clamp(2rem,3.8vw,3.5rem)] font-medium tracking-[0.06em] uppercase ${GOLD_TEXT}`}
              >
                Brilliance
              </span>
            </h2>

            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-[40ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-[#f5efe4]/80">
              Diamond jewelry made to bring exceptional sparkle to every
              celebration - natural or lab-grown, ready for the holiday counter.
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
