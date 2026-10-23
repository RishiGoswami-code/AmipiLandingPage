import Image from "next/image";
import { GiftGuideButton } from "./GiftGuideButton";
import { CARD, FOLD, SectionHeading } from "./GiftGuideTheme";

/**
 * The six trend tiles, from GiftPageImages/HOLIDAY TRENDS. The tiles are 4:5;
 * `position` is the focal point the crop keeps on the photos that aren't
 * (Stackables and Color are 2:3, Bezel is nearly square, and Drop - chain drop earrings
 * in a velvet box - is landscape, so its crop sets the earrings left of the
 * big numeral).
 */
const TRENDS = [
  {
    title: "Everyday Wearables",
    src: "/gift-guide/trends/everyday-wearables.webp",
    position: "50% 50%",
  },
  {
    title: "Drop",
    src: "/gift-guide/trends/drop-chain-earrings.webp",
    position: "95% 50%",
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

/** The tall model shot beside the grid (sapphire rings and studs). */
const MODEL_SRC = "/gift-guide/trends/model.webp";

/**
 * "Top Holiday Trends" - the page's centred heading, then a card holding a
 * 3x2 grid of numbered trend tiles, with a tall model photo filling the
 * card's right side. On phones the grid drops to two columns and the model
 * photo follows it.
 *
 * Each tile ends in the page's red button, "Shop Now", to /categories, since
 * there are no per-trend pages yet. The names stay white on the tiles' dark
 * fade, where navy would not read.
 */
export function GiftGuideTrends() {
  return (
    <section
      id="trends"
      aria-labelledby="trends-heading"
      // Closer under the hero, whose catalog pages already overhang it
      className={`${FOLD} pt-[calc(var(--gift-gap)*0.35)]`}
    >
      <SectionHeading id="trends-heading" title="Top Holiday Trends" />

      <div className={`mt-[clamp(1.75rem,3vw,2.75rem)] grid overflow-hidden lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] ${CARD}`}>
        <div className="p-4 sm:p-8 xl:p-10">
          <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {TRENDS.map((trend, i) => (
              <li
                key={trend.title}
                className="@container relative aspect-[4/5] overflow-hidden rounded-xl bg-[#ebe7df]"
              >
                <Image
                  quality={90}
                  src={trend.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 15rem, 45vw"
                  style={{ objectPosition: trend.position }}
                  className="object-cover"
                />
                {/* Dark fade from the top for the numeral and from the bottom
                    for the label, so both read on any photo */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,35,0.28)_0%,transparent_35%,transparent_50%,rgba(5,13,35,0.78)_100%)]"
                />
                {/* Big Bodoni numeral, Stuller style */}
                <span
                  aria-hidden
                  className="absolute top-[4%] right-[8%] font-[family-name:var(--font-bodoni)] text-[46cqw] leading-none font-medium [font-optical-sizing:none] text-[#f5efe4] [text-shadow:0_2px_18px_rgba(5,13,35,0.45)]"
                >
                  {i + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 px-[8%] pb-[8%] text-center">
                  <h3 className="text-[max(12px,6.2cqw)] leading-snug font-bold text-white">
                    {trend.title}
                  </h3>
                  {/* No per-trend pages yet, so every link goes to the shop. */}
                  <div className="mt-2">
                    <GiftGuideButton href="/categories" size="sm">
                      Shop Now
                    </GiftGuideButton>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Model photo: fills the panel's right side on desktop, follows the grid on phones */}
        <div className="relative m-4 mt-0 aspect-square overflow-hidden sm:aspect-[16/10] rounded-xl sm:m-8 sm:mt-0 lg:m-0 lg:aspect-auto lg:rounded-none">
          <Image
            quality={90}
            src={MODEL_SRC}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[50%_40%] sm:object-[50%_62%] lg:object-[50%_40%]"
          />
        </div>
      </div>
    </section>
  );
}
