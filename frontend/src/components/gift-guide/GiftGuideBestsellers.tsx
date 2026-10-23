import {
  GiftGuideCarousel,
  PRODUCT_SLIDE,
  ProductCard,
} from "./GiftGuideCarousel";
import { FOLD, SectionHeading } from "./GiftGuideTheme";

/** AMIPI's bestsellers, on white grounds. The hoops, band and tennis
 * bracelet still use the site's new-arrival product shots. `contain` marks a
 * cut-out on a transparent ground, shown whole on the card's white rather
 * than cropped to fill it. */
const BESTSELLERS: { title: string; src?: string; contain?: boolean }[] = [
  {
    title: "Unflippable Necklace",
    src: "/gift-guide/bestsellers/tennis-necklace-fit.webp",
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
 * "Holiday Bestsellers" - on the page's cream like every other section: the
 * centred heading with its ribbon line and a line of copy, then a carousel
 * of product cards in the page's card style, each with the red "Shop"
 * button. The carousel moves on by itself every few seconds.
 *
 * Every card links to /categories until the product pages exist.
 */
export function GiftGuideBestsellers() {
  return (
    <section id="bestsellers" aria-labelledby="bestsellers-heading" className={FOLD}>
      <SectionHeading
        id="bestsellers-heading"
        title="Holiday Bestsellers"
        intro="A selection of our most-loved styles for the holiday season, from everyday essentials to classic diamond gifts."
      />

      <div className="mt-[clamp(1.25rem,2.5vw,2.25rem)]">
        <GiftGuideCarousel
          label="bestsellers"
          slideClassName={PRODUCT_SLIDE}
          autoplay
        >
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
