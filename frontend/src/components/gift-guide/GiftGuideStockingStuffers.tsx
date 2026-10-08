import Image from "next/image";
import { Gem } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading. */
const NAVY = "#0b1a3d";

/**
 * The photo for the card's right side, still to come. While it is null the
 * side shows a placeholder; set it to a public/ path and the photo fills it.
 */
const PHOTO_SRC: string | null = null;

/**
 * The gold frame, after the textured gold board around Stuller's Stocking
 * Stuffers card: a champagne-gold sweep with fine diagonal grain over it.
 */
const GOLD_FRAME = [
  "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px)",
  "linear-gradient(135deg, #a07c3e 0%, #d9bd84 35%, #c9a35c 60%, #8a6630 100%)",
].join(", ");

/**
 * "Stocking Stuffers" - after Stuller's section of the same name: a white card
 * set in a gold frame, the copy and a button on the left, a photo on the right.
 */
export function GiftGuideStockingStuffers() {
  return (
    <section aria-labelledby="stuffers-heading" className="px-edge pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div className="mx-auto max-w-7xl rounded-xl p-4 sm:p-6 lg:p-8" style={{ background: GOLD_FRAME }}>
        <div className="grid overflow-hidden rounded-lg bg-white lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
            <h2
              id="stuffers-heading"
              className="font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
              style={{ color: NAVY }}
            >
              Stocking Stuffers
            </h2>
            <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-[#141414]/70 sm:text-base">
              Small gifts can make a beautiful impression. Discover thoughtful
              stocking stuffers and little luxuries that add an extra touch of
              joy to the holiday season.
            </p>
            <div className="mt-8">
              <PillButton href="/categories" variant="dark" size="sm" icon="arrow">
                Shop Now
              </PillButton>
            </div>
          </div>

          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[20rem]">
            {PHOTO_SRC ? (
              <Image src={PHOTO_SRC} alt="" fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
            ) : (
              <div className="absolute inset-4 flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#141414]/15 bg-[#f3efe7] text-[#8a6630]">
                <Gem className="h-8 w-8" strokeWidth={1.25} />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Image coming soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
