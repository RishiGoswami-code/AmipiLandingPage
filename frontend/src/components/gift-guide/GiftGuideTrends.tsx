import Image from "next/image";
import Link from "next/link";

/** Navy from the hero banner, used here for the heading. */
const NAVY = "#0b1a3d";

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
 * "Top Holiday Trends" - laid out like the matching section on Stuller's
 * holiday page: a white panel holding a 3x2 grid of numbered trend tiles,
 * with a tall model photo filling the panel's right side. On phones the grid
 * drops to two columns and the model photo follows it.
 *
 * Each tile ends in an underlined "Explore" link to /categories, since there
 * are no per-trend pages yet.
 */
export function GiftGuideTrends() {
  return (
    <section
      aria-labelledby="trends-heading"
      className="px-edge pt-(--gift-gap) pb-(--gift-gap) lg:pt-[calc(var(--gift-gap)/3)]"
    >
      <div className="grid overflow-hidden rounded-2xl border border-[#141414]/[0.06] bg-white shadow-[0_30px_70px_-40px_rgba(11,26,61,0.35)] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div className="px-4 pt-10 pb-4 sm:px-8 lg:px-8 lg:pt-12 lg:pb-8 xl:px-10">
          {/* Cormorant Italic, as "Holiday" in the hero */}
          <h2
            id="trends-heading"
            className="text-center font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
            style={{ color: NAVY }}
          >
            Top Holiday Trends
          </h2>

          <ol className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-3">
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
                  <h3 className="text-[max(12px,6.2cqw)] leading-snug font-semibold text-white">
                    {trend.title}
                  </h3>
                  {/* No per-trend pages yet, so every link goes to the shop. */}
                  <Link
                    href="/categories"
                    className="mt-1 inline-block text-[max(11px,4.6cqw)] font-medium text-white/90 underline underline-offset-4 transition-colors hover:text-[#ecd3a0]"
                  >
                    Shop Now
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Model photo: fills the panel's right side on desktop, follows the grid on phones */}
        <div className="relative m-4 mt-0 aspect-[4/5] overflow-hidden rounded-xl sm:m-8 sm:mt-0 lg:m-0 lg:aspect-auto lg:rounded-none">
          <Image
            quality={90}
            src={MODEL_SRC}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
      </div>
    </section>
  );
}
