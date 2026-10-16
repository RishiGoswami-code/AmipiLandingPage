import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The red velvet banner, from GiftPageImages/Luxury Jewelry on Red
 * Velvet.png: 3:1, plain deep red across the left where the copy sits, and a
 * bezel-set eternity band, emerald-cut pendant and bezel solitaire on red
 * satin with gold-edged ribbon at the right. */
const BANNER_SRC = "/gift-guide/bezel-red-velvet-banner.webp";

/** The banner's own plain red, so the band and the fades match it. */
const RED = "#2b0000";

/** Ivory for the copy on the burgundy. */
const IVORY = "#f5efe4";

/** Champagne gold for "Styles" - the same ramp as "Gift Guide" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/**
 * "Bezel-Set Styles" - after the matching banner on Stuller's holiday page:
 * a full-bleed band with the copy on the left, built the same way as
 * "Give the Gift of Brilliance" so the two read as a pair - a Cormorant
 * Italic line over a gold Bodoni capital word.
 *
 * On phones the copy sits on the plain red and the right half of the banner -
 * the three pieces - forms a 3:2 band beneath it.
 */
export function GiftGuideBezel() {
  return (
    <section
      aria-labelledby="bezel-heading"
      className="relative isolate flex items-center overflow-hidden pt-14 lg:aspect-[3/1] lg:max-h-[80svh] lg:min-h-[26rem] lg:pt-0"
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
        <div>
          <div className="max-w-xl">
            <h2 id="bezel-heading" className="leading-none">
              <span className="block font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.15] font-medium italic">
                Bezel-Set
              </span>{" "}
              <span
                className={`mt-[0.15em] block font-[family-name:var(--font-bodoni)] text-[clamp(2rem,3.8vw,3.5rem)] font-medium tracking-[0.06em] uppercase ${GOLD_TEXT}`}
              >
                Styles
              </span>
            </h2>

            <p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-[42ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-[#f5efe4]/80">
              Modern bezel-set designs strike the balance between durability
              and sophistication - a clean, sleek setting for everyday luxury.
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
