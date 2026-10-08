import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The midnight-blue satin banner: 3:1, plain navy across the left two-thirds
 * and a satin ribbon over an envelope on the right. */
const BANNER_SRC = "/gift-guide/midnight-satin-banner.webp";

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/** Champagne gold for "Brilliance" - the same ramp as "Catalog" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/**
 * "Give the Gift of Brilliance" - after the matching banner on Stuller's
 * holiday page: copy on the plain navy at the left, the satin ribbon at the
 * right (product photos to be laid on it later), with one button each for
 * natural and lab-grown diamond jewelry. The headline repeats the hero's pairing - a Cormorant Italic line
 * over a gold Bodoni capital word - so the two navy bands read as a set.
 *
 * Full-bleed like the hero's band. On phones the banner is anchored right so
 * the ribbon shows, with the copy on a navy fade at the top and the ribbon
 * left clear beneath it.
 */
export function GiftGuideBrilliance() {
  return (
    <section
      aria-labelledby="brilliance-heading"
      className="relative isolate overflow-hidden bg-[#011737] lg:aspect-[3/1] lg:max-h-[80svh] lg:min-h-[28rem]"
      style={{ color: IVORY }}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={BANNER_SRC}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[80%_50%] lg:object-center"
        />
        {/* Phones: navy fade down from the top so the copy sits on plain
            colour; desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#011737_0%,#011737_45%,rgba(1,23,55,0.4)_70%,transparent_100%)] lg:bg-[radial-gradient(ellipse_50%_80%_at_22%_50%,rgba(1,13,35,0.55),transparent)]" />
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
              <PillButton href="/categories" variant="gold" size="sm" icon="arrow">
                Shop Natural Diamond Jewelry
              </PillButton>
              <PillButton href="/categories" variant="light" size="sm" icon="arrow">
                Shop Lab-Grown Diamond Jewelry
              </PillButton>
            </div>
          </div>

          {/* Phones: room under the copy for the ribbon to show */}
          <div aria-hidden className="aspect-[4/3] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
