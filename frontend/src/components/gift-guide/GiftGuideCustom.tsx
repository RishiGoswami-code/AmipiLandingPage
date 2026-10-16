import Image from "next/image";
import { Gem, HeartHandshake, Lightbulb, UserRound, type LucideIcon } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading, reason titles and icons. */
const NAVY = "#0b1a3d";

/** Antique gold for type on the ivory ground - the champagne used on the
 * banners is too pale to read here. */
const ANTIQUE_GOLD = "#8a6630";

/** A custom emerald-cut cocktail ring in a baguette and pear halo, from
 * GiftPageImages/custom.png: a 500px square cut-out on a transparent ground.
 * Copied as-is so it is not re-compressed before Next serves it. */
const PHOTO_SRC = "/gift-guide/custom/custom-ring.png";

/**
 * Why custom - the four reasons and icons from the Custom Design Studio page
 * (src/app/custom/page.tsx, verbatim from amipi.com/custom), each cut to the
 * one sentence that carries it so the section stays a catalog page.
 */
const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: UserRound,
    title: "Personalization",
    body: "Custom-designed jewelry allows you to create a piece that reflects your unique style, personality, and preferences.",
  },
  {
    icon: HeartHandshake,
    title: "Sentimental Value",
    body: "The ability to incorporate personal elements, such as heirloom stones or symbols, adds significant sentimental value to the jewelry.",
  },
  {
    icon: Lightbulb,
    title: "Unique Design",
    body: "Custom jewelry ensures that you own a design that is exclusive to you.",
  },
  {
    icon: Gem,
    title: "Long-Term Satisfaction",
    body: "Knowing that your piece is uniquely yours and crafted to your specifications enhances the joy of wearing it for years to come.",
  },
];

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom), on the page's
 * ivory ground with no panel. The copy on the left follows the studio page:
 * a kicker, the Bodoni heading, the studio's introduction and its "5 easy
 * steps" line, the four reasons with their icons, and two buttons - the studio
 * page, and straight to its design form. The cut-out ring is centred in the
 * space to the right, in a soft warm glow, kept to about 28rem at most as the
 * file is only 500px.
 * On phones the ring comes first.
 */
export function GiftGuideCustom() {
  return (
    <section aria-labelledby="custom-heading" className="px-edge py-(--gift-gap)">
      {/* The copy column stops at a reading width; the ring is centred in
          whatever is left, so no empty band opens between the two */}
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,48rem)_minmax(0,1fr)]">
        <div className="order-2 max-w-3xl lg:order-1">
          {/* The kicker with a trailing rule, as on the Bridal banner */}
          <p
            className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] uppercase"
            style={{ color: ANTIQUE_GOLD }}
          >
            Custom Design Studio
            <span className="h-px w-20 bg-[#8a6630]/45 sm:w-32" />
          </p>

          <h2
            id="custom-heading"
            className="mt-4 font-[family-name:var(--font-bodoni)] text-[clamp(2.75rem,5.6vw,5.5rem)] leading-[1.02] font-normal"
            style={{ color: NAVY }}
          >
            Custom{" "}
            <span className="bg-[linear-gradient(180deg,#d4b06a_0%,#b8904e_50%,#8a6630_100%)] bg-clip-text pr-[0.08em] font-[family-name:var(--font-cormorant-italic)] text-[1.12em] font-medium text-transparent italic">
              Jewelry
            </span>
          </h2>

          <p className="mt-6 max-w-[54ch] text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed text-[#141414]/70">
            Custom Design Studio by AMIPI FINE JEWELS is your personalized
            service that allows each one of you to create unique and
            one-of-a-kind jewelry tailored to your preferences.
          </p>
          <p
            className="mt-3 font-[family-name:var(--font-cormorant-italic)] text-[clamp(1.375rem,2vw,1.875rem)] leading-snug font-medium italic"
            style={{ color: ANTIQUE_GOLD }}
          >
            In 5 easy steps, you can see your vision come to life.
          </p>

          {/* Why custom: icon, title and one line each, two by two */}
          <ul className="mt-10 grid gap-x-10 gap-y-7 border-t border-[#141414]/10 pt-8 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#dfbf7b] shadow-[0_8px_18px_-10px_rgba(11,26,61,0.6)]"
                  style={{ backgroundColor: NAVY }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3
                    className="font-[family-name:var(--font-cormorant-italic)] text-[1.5rem] leading-tight font-medium italic"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[#141414]/65">
                    {body}
                  </p>
                </div>
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

        <div className="relative order-1 mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[24rem] lg:order-2 lg:max-w-[28rem]">
          {/* A soft warm glow behind the ring, with no hard edge */}
          <div aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#fffdf8_0%,rgb(246_238_223/0.8)_40%,transparent_70%)]" />
          <Image
            quality={90}
            src={PHOTO_SRC}
            alt="Custom emerald-cut cocktail ring with a halo of pear and baguette diamonds"
            fill
            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 18rem"
            className="object-contain drop-shadow-[0_18px_22px_rgba(60,40,10,0.28)]"
          />
        </div>
      </div>
    </section>
  );
}
