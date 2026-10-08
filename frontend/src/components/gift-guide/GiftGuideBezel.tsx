import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/**
 * The banner photo, still to come. While it is null the band is plain navy;
 * set it to a public/ path (3:1, plain on the left where the copy sits) and
 * the photo fills the band behind the copy.
 */
const BANNER_SRC: string | null = null;

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/** Champagne gold for "Styles" - the same ramp as "Catalog" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/**
 * "Bezel-Set Styles" - after the matching banner on Stuller's holiday page:
 * a full-bleed band with the copy on the left, built the same way as
 * "Give the Gift of Brilliance" so the two read as a pair - a Cormorant
 * Italic line over a gold Bodoni capital word.
 */
export function GiftGuideBezel() {
  return (
    <section
      aria-labelledby="bezel-heading"
      className="relative isolate flex items-center overflow-hidden bg-[#0b1a3d] py-16 lg:aspect-[3/1] lg:max-h-[80svh] lg:min-h-[26rem] lg:py-0"
      style={{ color: IVORY }}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {BANNER_SRC && <Image src={BANNER_SRC} alt="" fill sizes="100vw" className="object-cover" />}
        {/* A soft lift behind the copy and a glow off to the right, so the
            plain navy isn't flat until the photo is in */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_80%_at_22%_50%,rgba(5,13,35,0.55),transparent),radial-gradient(ellipse_50%_90%_at_85%_50%,rgba(60,90,160,0.35),transparent)]" />
      </div>

      <div className="w-full px-edge">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <h2 id="bezel-heading" className="leading-none">
              <span className="block font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.15] font-medium italic">
                Bezel-Set
              </span>
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
        </div>
      </div>
    </section>
  );
}
