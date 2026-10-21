"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { PillButton } from "@/components/ui/PillButton";

import unflippableNecklace from "../../../Hero-Images/slides/unflippable-necklace-navy.webp";
import ultraComfortBracelet from "../../../Hero-Images/slides/ultra-comfort-bracelet.webp";
import ultraComfortBand from "../../../Hero-Images/slides/ultra-comfort-band.webp";
import colorCollection from "../../../Hero-Images/slides/color-collection.webp";
import bezelCollection from "../../../Hero-Images/slides/bezel-collection.webp";

type Slide = {
  src: StaticImageData;
  alt: string;
  kicker: string;
  title: string;
  /** The button's label; "Shop the collection" when left out. */
  cta?: string;
  /** Where to anchor the crop on phones, where cover keeps only a narrow
   *  vertical slice of these wide frames - aimed at the model or the piece. */
  phoneFocus: string;
  /** Where to anchor the crop from 640px up (default: centre). Only needed
   *  for the very wide frames, where cover keeps well under two thirds of the
   *  width and the centre would cut the piece in half. */
  desktopFocus?: string;
  /** A frame wider than the hero (about 3:1) is scaled up to the hero's
   *  height, so it is served as the full-size file rather than resized to
   *  the screen's width, which would leave it soft once cropped. */
  wide?: boolean;
  /** Caption colours chosen to contrast with what sits behind the text in
   *  this photograph (measured under the hero's scrim), so the title stands
   *  out rather than blending in: the title, the small line above it (and the
   *  active dot), and a dark glow that lifts both off lighter backgrounds. */
  tone: { title: string; kicker: string; glow: string };
};

/**
 * The hero's slides, in play order: the Unflippable necklace leads - it is
 * the frame the intro lands on - then bracelet, band, color and bezel,
 * wrapping round.
 */
export const SLIDES: Slide[] = [
  {
    src: unflippableNecklace,
    alt: "Model wearing a diamond tennis necklace against navy velvet",
    kicker: "An everyday icon",
    title: "The Unflippable Necklace",
    phoneFocus: "58% center",
    // Behind the text: deep navy velvet. Gold title, white line, navy glow.
    tone: { title: "#f2c94c", kicker: "#ffffff", glow: "rgba(0, 6, 30, 0.7)" },
  },
  {
    src: ultraComfortBracelet,
    alt: "A diamond tennis bracelet worn on the wrist beside a second bracelet, clasp open, on a cream marble table",
    kicker: "Made to be worn every day",
    title: "The Ultra Comfort Bracelet",
    cta: "Shop now",
    phoneFocus: "76% center",
    desktopFocus: "100% center",
    wide: true,
    // Behind the text: cream marble and a knit sleeve, darkened by the hero's
    // scrim. White title and line with a heavy dark-brown glow.
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(30, 14, 0, 0.95)" },
  },
  {
    src: ultraComfortBand,
    alt: "Two diamond eternity bands on dark marble beside a hand wearing a third",
    kicker: "Made to be worn every day",
    title: "The Ultra Comfort Band",
    phoneFocus: "28% center",
    // Behind the text: dark marble. White title, gold line.
    tone: { title: "#ffffff", kicker: "#ffd166", glow: "rgba(0, 0, 0, 0.7)" },
  },
  {
    src: colorCollection,
    alt: "Sapphire halo ring, ruby tennis bracelet and sapphire and diamond tennis necklace on stone plinths",
    kicker: "Sapphire, ruby & diamond",
    title: "The Color Collection",
    phoneFocus: "50% center",
    // Behind the text: light olive satin and stone - the lightest frame, so
    // white with the heaviest glow.
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(20, 16, 0, 0.95)" },
  },
  {
    src: bezelCollection,
    alt: "Bezel-set diamond tennis bracelet and yellow gold bezel eternity band on cream stone beside an emerald-cut bezel pendant on driftwood",
    kicker: "Clean lines, modern settings",
    title: "The Bezel Collection",
    phoneFocus: "48% center",
    desktopFocus: "62% center",
    wide: true,
    // Behind the text: cream stone and satin, darkened by the hero's scrim.
    // White title and line, heavy dark-brown glow.
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(30, 14, 0, 0.95)" },
  },
];

/** Each slide holds this long before the next fades in. */
export const SLIDE_MS = 6000;

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
          style={{ opacity: i === index ? 1 : 0, "--slide-focus": slide.phoneFocus, "--slide-focus-lg": slide.desktopFocus ?? "center" } as CSSProperties}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            unoptimized={slide.wide}
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
          {slide.cta ?? "Shop the collection"}
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
