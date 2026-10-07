import Image from "next/image";

/** Navy from the hero banner, used here for the heading. */
const NAVY = "#0b1a3d";

/**
 * The six trend tiles. Placeholder photos from the site's existing product
 * shots until the gift-guide photography is in; `position` is the focal
 * point the square-ish tile crop keeps.
 */
const TRENDS = [
  { title: "Everyday Wearables", src: "/new-arrival/riviera-bracelet-model.webp", position: "50% 45%" },
  { title: "Ultra-Comfort Bands", src: "/categories/wedding-bands.webp", position: "55% 55%" },
  { title: "Tennis & Line Bracelets", src: "/categories/tennis-bracelets.webp", position: "50% 55%" },
  { title: "Diamond Studs & Hoops", src: "/categories/hoop-earrings.webp", position: "40% 55%" },
  { title: "Flexi Bangles", src: "/categories/bangles.webp", position: "50% 50%" },
  { title: "Eternity & Stackable Bands", src: "/new-arrival/half-eternity-band-model.webp", position: "50% 50%" },
];

/** Placeholder for the tall model shot beside the grid. */
const MODEL_SRC = "/new-arrival/eternity-band-model.webp";

/**
 * "Top Holiday Trends" - laid out like the matching section on Stuller's
 * holiday page: a white panel holding a 3x2 grid of numbered trend tiles,
 * with a tall model photo filling the panel's right side. On phones the grid
 * drops to two columns and the model photo follows it.
 *
 * Visual only for now: the tiles do not link anywhere.
 */
export function GiftGuideTrends() {
  return (
    <section aria-labelledby="trends-heading" className="px-edge pt-10 pb-20 lg:pt-16 lg:pb-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#141414]/[0.06] bg-white shadow-[0_30px_70px_-40px_rgba(11,26,61,0.35)] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
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
                className="group @container relative aspect-[4/5] overflow-hidden rounded-xl bg-[#ebe7df]"
              >
                <Image
                  src={trend.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 15rem, 45vw"
                  style={{ objectPosition: trend.position }}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                {/* Dark fade from the top for the numeral and from the bottom
                    for the label; the placeholder photos are mostly pale. */}
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
                <h3 className="absolute inset-x-0 bottom-0 px-[8%] pb-[8%] text-center text-[max(12px,6.2cqw)] leading-snug font-semibold text-white">
                  {trend.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>

        {/* Model photo: fills the panel's right side on desktop, follows the grid on phones */}
        <div className="relative m-4 mt-0 aspect-[4/5] overflow-hidden rounded-xl sm:m-8 sm:mt-0 lg:m-0 lg:aspect-auto lg:rounded-none">
          <Image
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
