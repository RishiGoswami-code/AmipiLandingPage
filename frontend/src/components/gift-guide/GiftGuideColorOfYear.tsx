import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { GiftGuideCarousel, PRODUCT_SLIDE, ProductCard } from "./GiftGuideCarousel";

/** Ivory for the copy on the sapphire, as on the navy bands. */
const IVORY = "#f5efe4";

/** Champagne gold for "Sapphire" - the same ramp as "Catalog" in the hero. */
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#ecd3a0_0%,#dcbc7e_50%,#c9a35c_100%)] bg-clip-text text-transparent";

/** The banner photo: a sapphire halo ring on a stack of blueberries. */
const PHOTO_SRC = "/gift-guide/sapphire-ring.jpeg";

/**
 * Soft out-of-focus lights behind the banner copy, the way Stuller's Signature
 * Red banner has bokeh - a handful of blurred discs in pale sapphire.
 */
const BOKEH = [
  "radial-gradient(circle at 62% 22%, rgba(150,185,255,0.2) 0, rgba(150,185,255,0.12) 2.5rem, transparent 3.75rem)",
  "radial-gradient(circle at 88% 30%, rgba(150,185,255,0.16) 0, rgba(150,185,255,0.08) 1.75rem, transparent 2.75rem)",
  "radial-gradient(circle at 78% 78%, rgba(150,185,255,0.18) 0, rgba(150,185,255,0.1) 3rem, transparent 4.25rem)",
  "radial-gradient(circle at 95% 62%, rgba(150,185,255,0.12) 0, rgba(150,185,255,0.06) 1.25rem, transparent 2.25rem)",
  "radial-gradient(circle at 56% 70%, rgba(150,185,255,0.1) 0, rgba(150,185,255,0.05) 1rem, transparent 2rem)",
  "radial-gradient(ellipse 80% 90% at 75% 40%, #1d3f99 0%, #12286a 50%, #0a1a45 100%)",
].join(", ");

/**
 * The collection's pieces - named for the piece types in the collection until
 * the product list and photos are in, so every card is a placeholder for now.
 */
const COLLECTION = [
  "Sapphire Stud Earrings",
  "Sapphire Stackable Ring",
  "Sapphire Huggie Earrings",
  "Sapphire Solitaire Necklace",
  "Sapphire Bezel Bracelet",
  "Sapphire Tennis Bracelet",
];

/**
 * "Midnight Sapphire" - AMIPI's Color of the Year, after Stuller's Signature
 * Red section: an inset sapphire panel holding a banner (photo on the left;
 * the colour's name, a line of copy and a button on the right, over soft
 * bokeh), then the colour's collection in the same carousel as Holiday
 * Bestsellers.
 */
export function GiftGuideColorOfYear() {
  return (
    <section aria-labelledby="color-heading" className="px-edge py-20 lg:py-28">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl p-3 shadow-[0_30px_70px_-40px_rgba(11,26,61,0.6)] sm:p-6 lg:p-8"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 100%, #1f4bb0 0%, transparent 70%), linear-gradient(180deg, #0a1a45, #102a73)",
          color: IVORY,
        }}
      >
        {/* Banner */}
        <div
          className="grid overflow-hidden rounded-xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          style={{ background: BOKEH }}
        >
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]">
            <Image
              src={PHOTO_SRC}
              alt="Sapphire halo ring"
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover object-[50%_30%] lg:[mask-image:linear-gradient(90deg,#000_55%,transparent)]"
            />
          </div>

          <div className="px-6 py-10 sm:px-10 lg:py-14 lg:pr-14 lg:pl-10">
            <h2 id="color-heading" className="leading-none">
              <span className="block font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.1] font-medium italic">
                Midnight
              </span>
              <span
                className={`block font-[family-name:var(--font-bodoni)] text-[clamp(2.25rem,4.4vw,4rem)] font-medium tracking-[0.06em] uppercase ${GOLD_TEXT}`}
              >
                Sapphire
              </span>
            </h2>
            <p className="mt-4 text-xs font-semibold tracking-[0.3em] text-[#dcbc7e] uppercase">
              AMIPI&rsquo;s 2026 Color of the Year
            </p>
            <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[#f5efe4]/80 sm:text-base">
              Midnight Sapphire is deep, luminous and made for winter nights.
              This rich blue brings calm confidence and a cool, starlit glow to
              the holiday season.
            </p>
            <div className="mt-8">
              <PillButton href="/categories" variant="light" size="sm" icon="arrow">
                Shop Now
              </PillButton>
            </div>
          </div>
        </div>

        {/* The colour's collection */}
        <div className="px-1 pt-12 pb-4 text-center sm:px-0 lg:pt-14">
          <h3 className="font-[family-name:var(--font-cormorant-italic)] text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.1] font-medium italic">
            Midnight Sapphire Collection
          </h3>
          <div className="mt-8">
            <GiftGuideCarousel label="Midnight Sapphire pieces" slideClassName={PRODUCT_SLIDE}>
              {COLLECTION.map((title) => (
                <ProductCard key={title} title={title} href="/categories" />
              ))}
            </GiftGuideCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}
