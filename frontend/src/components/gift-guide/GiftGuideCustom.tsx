import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading. */
const NAVY = "#0b1a3d";

/** A custom emerald-cut cocktail ring in a baguette and pear halo, from
 * GiftPageImages/custom.png: a 500px square cut-out on a transparent ground.
 * Copied as-is so it is not re-compressed before Next serves it. */
const PHOTO_SRC = "/gift-guide/custom/custom-ring.png";

/** Why custom, in a word each - from AMIPI's Custom Design Studio page. */
const POINTS = ["Personalization", "Sentimental Value", "Unique Design", "Long-Term Satisfaction"];

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom), kept short so
 * the ring carries the section. It sits straight on the page's ivory ground,
 * no panel: the copy on the left - a Bodoni heading, one
 * line, the four reasons in Cormorant italic and one button - and the cut-out ring on the right, floating in a
 * softly lit sand arch with a gold hairline arch set behind it. The ring is
 * kept to about 25rem at most, as the file is only 500px. On phones the ring comes first.
 */
export function GiftGuideCustom() {
  return (
    <section aria-labelledby="custom-heading" className="px-edge py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div className="order-2 lg:order-1">
          <h2
            id="custom-heading"
            className="font-[family-name:var(--font-bodoni)] text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.02] font-normal"
            style={{ color: NAVY }}
          >
            Custom{" "}
            <span className="bg-[linear-gradient(180deg,#d4b06a_0%,#b8904e_50%,#8a6630_100%)] bg-clip-text pr-[0.08em] font-[family-name:var(--font-cormorant-italic)] text-[1.12em] font-medium text-transparent italic">
              Jewelry
            </span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-[0.9375rem] leading-relaxed text-[#141414]/70 sm:text-lg">
            One-of-a-kind jewelry made to your customer&rsquo;s vision, brought
            to life in 5 easy steps.
          </p>

          {/* The four reasons, set as a quiet serif list - no markers or rules */}
          <ul className="mt-8 grid max-w-lg gap-x-10 gap-y-2 font-[family-name:var(--font-cormorant-italic)] text-[1.375rem] leading-snug italic sm:grid-cols-2 sm:text-2xl" style={{ color: NAVY }}>
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="mt-10">
            <PillButton href="/custom" variant="dark" size="sm" icon="arrow">
              Get Started
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
