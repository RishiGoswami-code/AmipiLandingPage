import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { GiftGuideCarousel, PRODUCT_SLIDE, ProductCard } from "./GiftGuideCarousel";

/** The navy velvet banner from the hero - ribbons at both ends and plain
 * navy through the middle, where the centred heading and carousel sit. */
const BANNER_SRC = "/gift-guide/navy-velvet-banner.webp";

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/**
 * AMIPI's bestsellers. The photos are stand-ins from the site's new-arrival
 * product shots (white ground) where one is close; the pieces with no close
 * match show a placeholder until the product photography is in.
 */
const BESTSELLERS: { title: string; src?: string }[] = [
  { title: "Split Prong Hoops", src: "/new-arrival/classic-hoops.webp" },
  { title: "3 Stone Huggies" },
  { title: "Ultra Comfort Band", src: "/new-arrival/half-eternity-band.webp" },
  { title: "Tennis Bracelet", src: "/new-arrival/riviera-bracelet.webp" },
  { title: "Unflippable Necklace", src: "/new-arrival/tennis-necklace.webp" },
  { title: "Bezel Bracelet" },
  { title: "Rainbow Bracelet", src: "/new-arrival/rainbow-tennis-set.webp" },
];

/**
 * "Holiday Bestsellers" - laid out like the matching section on Stuller's
 * holiday page: a full-bleed banner with a centred heading and line of copy,
 * a carousel of white product cards, then one "Shop All" button.
 *
 * Every card links to /categories until the product pages exist.
 */
export function GiftGuideBestsellers() {
  return (
    <section
      aria-labelledby="bestsellers-heading"
      className="relative isolate overflow-hidden bg-[#0b1a3d] px-edge py-16 lg:py-20"
      style={{ color: IVORY }}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={BANNER_SRC} alt="" fill sizes="100vw" className="object-cover" />
        {/* Darkened through the middle so the cards and copy sit on plain navy
            and only the ribbons at the ends show through */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_50%_50%,rgba(5,13,35,0.65),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl text-center">
        <h2
          id="bestsellers-heading"
          className="font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
        >
          Holiday Bestsellers
        </h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-[#f5efe4]/80 sm:text-base">
          Give them a style they&rsquo;ll love season after season - the pieces
          retailers reorder most for their timeless appeal, effortless
          versatility and gift-worthy sparkle.
        </p>

        <div className="mt-10">
          <GiftGuideCarousel label="bestsellers" slideClassName={PRODUCT_SLIDE}>
            {BESTSELLERS.map((piece) => (
              <ProductCard key={piece.title} title={piece.title} src={piece.src} href="/categories" />
            ))}
          </GiftGuideCarousel>
        </div>

        <div className="mt-8">
          <PillButton href="/categories" variant="light" size="sm" icon="arrow">
            Shop All Bestsellers
          </PillButton>
        </div>
      </div>
    </section>
  );
}
