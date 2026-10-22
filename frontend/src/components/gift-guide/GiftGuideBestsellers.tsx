import Image from "next/image";
import {
  GiftGuideCarousel,
  PRODUCT_SLIDE,
  ProductCard,
} from "./GiftGuideCarousel";

/** The navy velvet banner from the hero - ribbons at both ends and plain
 * navy through the middle, where the centred heading and carousel sit. */
const BANNER_SRC = "/gift-guide/navy-velvet-banner.webp";

/** Ivory for the copy on the navy, as in the hero. */
const IVORY = "#f5efe4";

/** AMIPI's bestsellers, on white grounds. The hoops, band and tennis
 * bracelet still use the site's new-arrival product shots. `contain` marks a
 * cut-out on a transparent ground, shown whole on the card's white rather
 * than cropped to fill it. */
const BESTSELLERS: { title: string; src?: string; contain?: boolean }[] = [
  {
    title: "Unflippable Necklace",
    src: "/gift-guide/bestsellers/tennis-necklace-zoom.webp",
  },
  { title: "Tennis Bracelet", src: "/new-arrival/riviera-bracelet.webp" },
  { title: "Ultra Comfort Band", src: "/new-arrival/half-eternity-band.webp" },
  {
    title: "Diamond Studs",
    // The transparent cut-out from Shop by Jewelry Type
    src: "/gift-guide/types/diamond-studs.webp",
    contain: true,
  },
  {
    title: "3 Stone Huggies",
    src: "/gift-guide/bestsellers/three-stone-huggies-close.webp",
  },
  { title: "Split Prong Hoops", src: "/new-arrival/classic-hoops.webp" },
  {
    title: "Bezel Bracelet",
    src: "/gift-guide/bestsellers/bezel-bracelet.webp",
  },
];

/**
 * "Holiday Bestsellers" - laid out like the matching section on Stuller's
 * holiday page: a full-bleed banner with a centred heading and line of copy,
 * a carousel of white product cards, each with its own red "Shop" button.
 *
 * Every card links to /categories until the product pages exist.
 */
export function GiftGuideBestsellers() {
  return (
    <section
      aria-labelledby="bestsellers-heading"
      className="relative isolate overflow-hidden bg-[#0b1a3d] px-edge py-8 lg:px-[calc(var(--spacing-edge)/2)] lg:py-[clamp(1.75rem,2.25vw,2.5rem)]"
      style={{ color: IVORY }}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          quality={90}
          src={BANNER_SRC}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Darkened through the middle so the cards and copy sit on plain navy;
            wide enough now that the row runs nearly edge to edge */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,rgba(5,13,35,0.65),transparent)]" />
      </div>

      <div className="text-center">
        <h2
          id="bestsellers-heading"
          className="font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.75rem,5.2vw,5.5rem)] leading-[1.06] font-medium italic"
        >
          Holiday Bestsellers
        </h2>
        <p className="mx-auto mt-4 max-w-[60ch] max-sm:hidden text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#f5efe4]/80">
          A selection of our most-loved styles for the holiday season, from
          everyday essentials to classic diamond gifts.
        </p>
      </div>

      {/* The carousel spans the full width between the page gutters rather
          than the centred column the copy uses */}
      <div className="mt-6">
        <GiftGuideCarousel label="bestsellers" slideClassName={PRODUCT_SLIDE}>
          {BESTSELLERS.map((piece) => (
            <ProductCard
              key={piece.title}
              title={piece.title}
              src={piece.src}
              contain={piece.contain}
              href="/categories"
              shop
            />
          ))}
        </GiftGuideCarousel>
      </div>
    </section>
  );
}
