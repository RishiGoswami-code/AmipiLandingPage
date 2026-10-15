import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** The burgundy velvet banner: 3:1, plain deep red across the left where the
 * copy sits, and a bezel-set pendant and solitaire on velvet at the right. */
const BANNER_SRC = "/gift-guide/burgundy-velvet-banner.webp";

/** Ivory for the copy on the burgundy. */
const IVORY = "#f5efe4";

/** Champagne gold for "Styles" - the same ramp as "Catalog" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/**
 * "Bezel-Set Styles" - after the matching banner on Stuller's holiday page:
 * a full-bleed band with the copy on the left, built the same way as
 * "Give the Gift of Brilliance" so the two read as a pair - a Cormorant
 * Italic line over a gold Bodoni capital word.
 *
 * On phones the banner is anchored right so the jewelry shows, with the copy
 * on a burgundy fade at the top and the jewelry left clear beneath it.
 */
export function GiftGuideBezel() {
  return (
    <section
      aria-labelledby="bezel-heading"
      className="relative isolate flex items-center overflow-hidden bg-[#2a0508] pt-14 lg:aspect-[3/1] lg:max-h-[80svh] lg:min-h-[26rem] lg:pt-0"
      style={{ color: IVORY }}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          // On phones the 3:1 banner fills a tall section, so it renders
          // about four screens wide - ask for that, or it is upscaled
          sizes="(min-width: 1024px) 100vw, 1700px"
          className="object-cover object-[85%_50%] lg:object-center"
        />
        {/* Phones: burgundy fade down from the top so the copy sits on plain
            colour; desktop: a soft pool behind the copy only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2a0508_0%,#2a0508_45%,rgba(42,5,8,0.4)_70%,transparent_100%)] lg:bg-[radial-gradient(ellipse_45%_80%_at_22%_50%,rgba(25,3,5,0.5),transparent)]" />
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

          {/* Phones: room under the copy for the jewelry */}
          <div aria-hidden className="aspect-[4/3] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
