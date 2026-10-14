"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { PillButton } from "@/components/ui/PillButton";

import tennisBracelet from "../../../Hero-Images/slides/tennis-bracelet-velvet.webp";
import tennisNecklace from "../../../Hero-Images/slides/tennis-necklace-noir.webp";
import sapphireRuby from "../../../Hero-Images/slides/sapphire-ruby-set.webp";
import eternityBand from "../../../Hero-Images/slides/eternity-band.webp";
import bezelPendant from "../../../Hero-Images/slides/bezel-pendant-gold.webp";

type Slide = {
  src: StaticImageData;
  alt: string;
  kicker: string;
  title: string;
  /** Where to anchor the crop on phones, where cover keeps only a narrow
   *  vertical slice of these wide frames - aimed at the model or the piece. */
  phoneFocus: string;
  /** Caption colours chosen to contrast with what sits behind the text in
   *  this photograph (measured under the hero's scrim), so the title stands
   *  out rather than blending in: the title, the small line above it (and the
   *  active dot), and a dark glow that lifts both off lighter backgrounds. */
  tone: { title: string; kicker: string; glow: string };
};

/**
 * The hero's slides, in play order. The velvet tennis bracelet leads - it is
 * the frame the intro lands on - then the rest follow in the order they were
 * supplied, wrapping round.
 */
export const SLIDES: Slide[] = [
  {
    src: tennisBracelet,
    alt: "Model with a diamond tennis bracelet, the bracelet on red velvet beside her",
    kicker: "Timeless brilliance",
    title: "The Diamond Tennis Bracelet",
    phoneFocus: "22% center",
    // Behind the text: dark red-brown. White title (9.9:1), bright gold line.
    tone: { title: "#ffffff", kicker: "#ffd166", glow: "rgba(30, 0, 6, 0.7)" },
  },
  {
    src: tennisNecklace,
    alt: "Black-and-white portrait of a model wearing a diamond tennis necklace",
    kicker: "An everyday icon",
    title: "The Riviera Necklace",
    phoneFocus: "72% center",
    // Behind the text: cool charcoal. Gold title (10:1) - the one colour in a
    // monochrome frame - with a white line.
    tone: { title: "#f2c94c", kicker: "#ffffff", glow: "rgba(0, 0, 0, 0.7)" },
  },
  {
    src: sapphireRuby,
    alt: "Model wearing a sapphire ring, sapphire and diamond necklace and ruby bracelet",
    kicker: "Gemstone collection",
    title: "Sapphire & Ruby, Set in Diamonds",
    phoneFocus: "30% center",
    // Behind the text: dark skin and navy. White title (13:1), gold line.
    tone: { title: "#ffffff", kicker: "#ffd166", glow: "rgba(0, 8, 30, 0.7)" },
  },
  {
    src: eternityBand,
    alt: "Smiling model wearing a diamond eternity band, the band resting in sunlight",
    kicker: "Forever, in diamonds",
    title: "The Eternity Band",
    phoneFocus: "62% center",
    // Behind the text: mid-tone sunlit stone, where only white clears 4.5:1
    // (5.6:1); a heavy navy glow lifts both title and line off it.
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(0, 8, 25, 0.95)" },
  },
  {
    src: bezelPendant,
    alt: "Model wearing an emerald-cut diamond bezel pendant on a yellow gold chain",
    kicker: "Emerald cut, yellow gold",
    title: "The Bezel Solitaire",
    phoneFocus: "68% center",
    // Behind the text: light stone and gold - the same as above (white, 5.3:1)
    // with a heavy navy glow.
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(0, 8, 25, 0.95)" },
  },
];

/** Each slide holds this long before the next fades in. */
export const SLIDE_MS = 4000;

/**
 * Which slide is showing. Advances every SLIDE_MS once `started` (the intro
 * has finished), never for visitors who asked for reduced motion, and
 * restarts its count whenever someone picks a slide by hand.
 */
export function useSlideshow(started: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [started, index]);

  return [index, setIndex] as const;
}

/**
 * The slides themselves, stacked and cross-faded. Lives inside the intro's
 * backdrop, so the first slide is what the third card opens out into.
 */
export function HeroSlideImages({ index }: { index: number }) {
  return (
    <div className="absolute inset-0">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          aria-hidden={i !== index}
          className="hero-slide absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none"
          style={{ opacity: i === index ? 1 : 0, "--slide-focus": slide.phoneFocus } as CSSProperties}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

const SERIF = "font-[family-name:var(--font-cormorant)]";

/**
 * The current slide's title and the hero's one call to action, bottom-left,
 * in that slide's own colours (see `tone`).
 * Keyed on the slide, so each title rises in again just after its image has
 * faded in. Dots below let a visitor pick a slide directly.
 */
export function HeroSlideCaption({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  const slide = SLIDES[index];
  return (
    <div className="hero-slide-caption absolute inset-x-0 bottom-0 z-40 px-edge pb-10 sm:pb-14">
      <div key={index} className="hero-caption-in max-w-2xl" aria-live="polite">
        <p
          className="text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
          style={{ color: slide.tone.kicker, textShadow: `0 1px 10px ${slide.tone.glow}` }}
        >
          {slide.kicker}
        </p>
        <h2
          className={`${SERIF} mt-3 text-4xl leading-[1.05] italic sm:text-6xl lg:text-7xl`}
          style={{ color: slide.tone.title, textShadow: `0 2px 24px ${slide.tone.glow}, 0 1px 3px ${slide.tone.glow}` }}
        >
          {slide.title}
        </h2>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-6">
        <PillButton href="/categories" variant="gold" icon="arrow">
          Shop the collection
        </PillButton>
        <div className="flex gap-2" role="group" aria-label="Choose a slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === index}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                i === index ? "w-8" : "w-3 bg-white/45 hover:bg-white/70"
              }`}
              style={i === index ? { backgroundColor: slide.tone.kicker } : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
