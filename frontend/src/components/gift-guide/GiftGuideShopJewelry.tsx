import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { GiftGuideCarousel } from "./GiftGuideCarousel";

/** Ivory for the copy on the green. */
const IVORY = "#f5efe4";

/**
 * Deep emerald, after Stuller's Shop Jewelry band: a soft glow behind the
 * cards, falling to near-black green at the edges.
 */
const EMERALD_GROUND =
  "radial-gradient(ellipse 55% 85% at 62% 45%, #1f5c40 0%, #12402c 45%, #0a2a1c 75%, #061a11 100%)";

/**
 * AMIPI's jewelry categories, the same set as the navbar's Fine Jewelry menu,
 * each on one of the navy-and-gold studio shots in public/Collections.
 */
const CATEGORIES = [
  { title: "Diamond Studs", src: "/Collections/Rings.png" },
  { title: "Hoops & Earrings", src: "/Collections/Hoop.png" },
  { title: "Bracelets & Bangles", src: "/Collections/Bracelet.png" },
  { title: "Anniversary Bands", src: "/Collections/Bangles.png" },
  { title: "Rings", src: "/Collections/Ring.png" },
  { title: "Necklaces & Pendants", src: "/Collections/Necklace.png" },
];

/** Three cards across on desktop with the fourth just peeking in, as on
 * Stuller's; one and a bit on phones. */
const CATEGORY_SLIDE = "w-[calc((100%-1rem)/1.3)] sm:w-[calc((100%-2rem)/2.4)] lg:w-[calc((100%-2rem)/3.15)]";

/**
 * "Shop Jewelry" - after Stuller's band of the same name: copy and a "Shop All"
 * button on the left of a deep emerald band, and a carousel of tall category
 * cards on the right, each with its title at the top and a "Shop Now" button
 * at the bottom.
 *
 * Everything links to /categories until the category pages exist.
 */
export function GiftGuideShopJewelry() {
  return (
    <section
      aria-labelledby="shop-jewelry-heading"
      className="px-edge py-16 lg:py-20"
      style={{ background: EMERALD_GROUND, color: IVORY }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] lg:gap-8">
        <div className="text-center">
          <h2
            id="shop-jewelry-heading"
            className="font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
          >
            Shop Jewelry
          </h2>
          <p className="mx-auto mt-4 max-w-[36ch] text-[0.9375rem] leading-relaxed text-[#f5efe4]/80">
            Find something for every style, story and celebration - diamond
            studs, hoops, bracelets, bands, rings and necklaces, all set and
            ready for the holiday counter.
          </p>
          <div className="mt-7">
            <PillButton href="/categories" variant="light" size="sm" icon="arrow">
              Shop All Jewelry
            </PillButton>
          </div>
        </div>

        <GiftGuideCarousel label="jewelry categories" slideClassName={CATEGORY_SLIDE}>
          {CATEGORIES.map((category) => (
            <div key={category.title} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#0b1a3d] text-left">
              <Image
                src={category.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 40vw, 75vw"
                className="object-cover"
              />
              {/* Shade at the top for the title */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/55 to-transparent" />
              <h3 className="absolute inset-x-0 top-0 p-5 text-[clamp(1.125rem,1.6vw,1.375rem)] font-semibold text-white">
                {category.title}
              </h3>
              <div className="absolute bottom-5 left-5">
                <PillButton href="/categories" variant="light" size="sm">
                  Shop Now
                </PillButton>
              </div>
            </div>
          ))}
        </GiftGuideCarousel>
      </div>
    </section>
  );
}
