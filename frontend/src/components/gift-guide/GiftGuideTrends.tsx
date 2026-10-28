import Image from "next/image";
import Link from "next/link";
import { GiftGuideTextLabel } from "./GiftGuideButton";
import { BAND_GREEN, BandHeading, INK } from "./GiftGuideTheme";

/**
 * The five trend cards, from GiftPageImages/HOLIDAY TRENDS. The photos are
 * 4:5; `position` is the focal point the crop keeps on the ones that aren't
 * (Stackables and Color are 2:3, Bezel is nearly square). There is no Drop
 * card yet - the product does not exist - so add it back here, between
 * Everyday Wearables and Bezel, when it does.
 */
const TRENDS = [
  {
    title: "Everyday Wearables",
    src: "/gift-guide/trends/everyday-wearables.webp",
    position: "50% 50%",
  },
  { title: "Bezel", src: "/gift-guide/trends/bezel.webp", position: "50% 50%" },
  {
    title: "Stackables",
    src: "/gift-guide/trends/stackables.webp",
    position: "50% 55%",
  },
  // Festive Sapphire Necklace Portrait: 2:3, so the crop sits a little low
  // so the whole necklace and the hand stay in frame
  {
    title: "Color",
    src: "/gift-guide/trends/sapphire-necklace-portrait.webp",
    position: "50% 55%",
  },
  {
    title: "Bridal",
    src: "/gift-guide/trends/bridal.webp",
    position: "50% 50%",
  },
];

/**
 * "Top Holiday Trends" - an evergreen band, after the "Holiday Edit" row in
 * the team's mockups: the eyebrow, heading and gold rule, then the five
 * trends as plain white cards - the photo on top, the name and a "Shop Now"
 * link under it. One row of five from 1280px, three per row on tablets and
 * laptops (the last two centred), two on phones (the last one centred).
 *
 * Each whole card - photo, name and "Shop Now" - is one link, as on the
 * Holiday Bestsellers tiles. Every link goes to /categories, since there
 * are no per-trend pages yet.
 */
export function GiftGuideTrends() {
  return (
    <section
      id="trends"
      aria-labelledby="trends-heading"
      className={`${BAND_GREEN} px-edge`}
    >
      <BandHeading id="trends-heading" tone="green" eyebrow="The Holiday Edit" title="Top Holiday Trends" />

      <ul className="mt-[clamp(1.75rem,3vw,2.75rem)] flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5">
        {TRENDS.map((trend) => (
          <li
            key={trend.title}
            className="flex w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-5rem)/5)]"
          >
            <Link
              href="/categories"
              className="group flex w-full flex-col overflow-hidden rounded-[2px] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5efe4]"
            >
              <div className="relative aspect-[4/5] bg-[#ebe7df]">
                <Image
                  quality={90}
                  src={trend.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 19vw, (min-width: 768px) 32vw, 48vw"
                  style={{ objectPosition: trend.position }}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-center gap-3 px-3 pt-4 pb-5 text-center">
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight font-semibold"
                  style={{ color: INK }}
                >
                  {trend.title}
                </h3>
                <GiftGuideTextLabel>Shop Now</GiftGuideTextLabel>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
