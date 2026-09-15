import { Diamond } from "lucide-react";

const DEFAULT_WORDS = [
  "Natural Diamonds",
  "Lab-Grown Brilliance",
  "Fixed Transparent Pricing",
  "Fine Jewelry",
  "Bridal & Engagement",
  "Wholesale Direct",
];

type MarqueeStripProps = {
  words?: string[];
};

/**
 * Endless scrolling word strip — the ticker banner every modern jewelry
 * Framer template runs between hero and content. Pure CSS animation (no
 * GSAP): the track is the word list rendered twice back to back, and a
 * -50% translate loop hands off between the two copies invisibly.
 */
export function MarqueeStrip({ words = DEFAULT_WORDS }: MarqueeStripProps) {
  const items = [...words, ...words];

  return (
    <div
      className="group overflow-hidden border-y border-gold-500/15 bg-navy-900/60 py-4"
      aria-hidden="true"
    >
      <div className="flex w-max shrink-0 items-center [animation:marquee-scroll_32s_linear_infinite] motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-6 px-6"
          >
            <span className="text-xs font-semibold tracking-[0.3em] text-ice-100/60 uppercase sm:text-sm">
              {word}
            </span>
            <Diamond className="h-3 w-3 shrink-0 text-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
