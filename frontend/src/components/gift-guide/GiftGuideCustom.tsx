import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the heading. */
const NAVY = "#0b1a3d";

/**
 * The photo, still to come. While it is null the right of the panel shows a
 * labelled placeholder; set it to a public/ path (4:3 works best) and the
 * photo fills that space.
 */
const PHOTO_SRC: string | null = null;

/** Why custom, in a word each - from AMIPI's Custom Design Studio page. */
const POINTS = ["Personalization", "Sentimental Value", "Unique Design", "Long-Term Satisfaction"];

/**
 * "Custom Jewelry" - AMIPI's Custom Design Studio (/custom), kept short so
 * the photo carries the section: a kicker, the heading, one line of copy, the
 * four reasons as small tags and one button, beside the photo in a white
 * panel on the cream like Top Holiday Trends. On phones the photo comes first.
 */
export function GiftGuideCustom() {
  return (
    <section aria-labelledby="custom-heading" className="px-edge py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#141414]/[0.06] bg-white shadow-[0_30px_70px_-40px_rgba(11,26,61,0.35)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 order-2 lg:order-1 lg:px-14 lg:py-16">
          {/* The kicker with a trailing rule, as on the About page */}
          <p className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#8a6630] uppercase">
            Custom Design Studio
            <span className="hidden h-px w-20 bg-[#8a6630]/50 sm:block" />
          </p>
          <h2
            id="custom-heading"
            className="mt-4 font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
            style={{ color: NAVY }}
          >
            Custom Jewelry
          </h2>
          <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[#141414]/70 sm:text-base">
            One-of-a-kind jewelry made to your customer&rsquo;s vision, brought
            to life in 5 easy steps.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {POINTS.map((point) => (
              <li
                key={point}
                className="rounded-full bg-[#f3ead8] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#8a6630] uppercase"
              >
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PillButton href="/custom" variant="dark" size="sm" icon="arrow">
              Get Started
            </PillButton>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[28rem]">
          {PHOTO_SRC ? (
            <Image quality={90} src={PHOTO_SRC} alt="" fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#141414]/15 bg-[#f3efe7] text-[#8a6630] sm:inset-4">
              <ImageIcon className="h-7 w-7" strokeWidth={1.25} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Photo coming soon</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
