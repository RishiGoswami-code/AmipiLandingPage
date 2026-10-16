import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading and reason titles. */
const NAVY = "#0b1a3d";

/** Antique gold for type on the ivory ground - the champagne used on the
 * banners is too pale to read here. */
const ANTIQUE_GOLD = "#8a6630";

/** The custom emerald-cut halo ring on a travertine block in warm window
 * light, with baby's breath at the right, from GiftPageImages/HOLIDAY TRENDS/
 * Emerald Halo Ring in Warm Golden Light.png. 16:9 (1672px wide); the crops
 * are held on the ring, which sits right of centre. */
const PHOTO_SRC = "/gift-guide/custom/emerald-halo-golden-light.webp";

/**
 * Why custom - the four reasons from the Custom Design Studio page
 * (src/app/custom/page.tsx, verbatim from amipi.com/custom), each cut to the
 * one sentence that carries it so the section stays a catalog page.
 */
const REASONS = [
  {
    title: "Personalization",
    body: "Custom-designed jewelry allows you to create a piece that reflects your unique style, personality, and preferences.",
  },
  {
    title: "Sentimental Value",
    body: "The ability to incorporate personal elements, such as heirloom stones or symbols, adds significant sentimental value to the jewelry.",
  },
  {
    title: "Unique Design",
    body: "Custom jewelry ensures that you own a design that is exclusive to you.",
  },
  {
    title: "Long-Term Satisfaction",
    body: "Knowing that your piece is uniquely yours and crafted to your specifications enhances the joy of wearing it for years to come.",
  },
];

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom), on the page's
 * ivory ground with no panel. The copy follows the studio page: a kicker, the
 * heading, the studio's introduction and its "5 easy steps" line, the four
 * reasons and two buttons - the studio page, and straight to its design form.
 *
 * Set upright throughout, like a printed catalog page: Bodoni for the heading
 * and the reason titles, the site's Manrope for everything else, with gold
 * kept to the small type. The photo of the ring sits beside the copy (above
 * it on phones).
 */
export function GiftGuideCustom() {
  return (
    <section aria-labelledby="custom-heading" className="px-edge py-(--gift-gap)">
      {/* The copy column stops at a reading width; the photo takes the rest */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,46rem)_minmax(0,1fr)] xl:gap-20">
        <div className="order-2 lg:order-1">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: ANTIQUE_GOLD }}
          >
            Custom Design Studio
          </p>

          <h2
            id="custom-heading"
            className="mt-4 font-[family-name:var(--font-bodoni)] text-[clamp(2.75rem,5.2vw,5rem)] leading-[1.02] font-normal tracking-[-0.01em]"
            style={{ color: NAVY }}
          >
            Custom Jewelry
          </h2>

          <p className="mt-6 max-w-[54ch] text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-[#141414]/70">
            Custom Design Studio by AMIPI FINE JEWELS is your personalized
            service that allows each one of you to create unique and
            one-of-a-kind jewelry tailored to your preferences.
          </p>
          <p
            className="mt-4 text-[clamp(1rem,1.2vw,1.125rem)] font-semibold"
            style={{ color: ANTIQUE_GOLD }}
          >
            In 5 easy steps, you can see your vision come to life.
          </p>

          {/* Why custom, two by two: each a hairline, a Bodoni title and one
              line - no icons, like the feature list in a printed catalog */}
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {REASONS.map(({ title, body }) => (
              <li key={title} className="border-t border-[#141414]/15 pt-5">
                <h3
                  className="font-[family-name:var(--font-bodoni)] text-[1.375rem] leading-tight font-medium"
                  style={{ color: NAVY }}
                >
                  {title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#141414]/65">
                  {body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <PillButton href="/custom" variant="dark" size="sm" icon="arrow">
              Get Started
            </PillButton>
            <PillButton href="/custom#design-form" variant="outline" size="sm" icon="arrow">
              Send Us Your Design
            </PillButton>
          </div>
        </div>

        {/* Phones 4:5, tablets 16:10; on desktop the photo stretches to the
            copy's height rather than keeping a shape, so a wide column
            can't make it taller than the text beside it */}
        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(60,40,10,0.45)] sm:aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[28rem] lg:self-stretch">
          <Image
            quality={90}
            src={PHOTO_SRC}
            alt="Custom emerald-cut halo ring with pear and baguette diamonds on travertine in warm light"
            fill
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[82%_50%] sm:object-center lg:object-[82%_50%]"
          />
        </div>
      </div>
    </section>
  );
}
