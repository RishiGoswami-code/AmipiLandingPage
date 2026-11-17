"use client";

import { useEffect, useRef } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { AMIPI_CATEGORY, AMIPI_FINE_JEWELRY } from "@/lib/amipi";

/* Served from public/videos. hero.mp4 is the 1920x900 film compressed with no
   audio track (H.264, faststart so it starts playing before it has fully
   downloaded); the poster is its first frame. */
const VIDEO_SRC = "/videos/hero.mp4";
const POSTER_SRC = "/videos/hero-poster.webp";

type Chapter = {
  /** Second of the film where this piece comes on screen. */
  from: number;
  kicker: string;
  title: string;
  /** The button's label; "Shop now" when left out. */
  cta?: string;
  /** Where the button goes while this piece is on screen: its page on
   *  amipi.com (lib/amipi.ts). */
  href: string;
  /** Caption colours: the title, the small line above it, and a dark glow
   *  that lifts both off the bright daylight footage. */
  tone: { title: string; kicker: string; glow: string };
};

/**
 * The film shows three pieces in turn and then a sliding gallery of the
 * wider collection; the caption and its button follow it. `from` values are
 * the cuts in hero.mp4, measured frame by frame (necklace 0-3.1s, bracelet
 * 3.1-6.3s, hoops 6.3-9.1s, the gallery 9.1s to the end at 15.5s);
 * re-measure them if the film is replaced.
 */
export const CHAPTERS: Chapter[] = [
  {
    from: 0,
    kicker: "An everyday icon",
    title: "The Unflippable Necklace",
    href: AMIPI_CATEGORY.necklaces,
    tone: { title: "#f2c94c", kicker: "#ffffff", glow: "rgba(30, 14, 0, 0.8)" },
  },
  {
    from: 3.1,
    kicker: "Made to be worn every day",
    title: "The Tennis Bracelet",
    href: AMIPI_CATEGORY.bracelets,
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(30, 14, 0, 0.95)" },
  },
  {
    from: 6.3,
    kicker: "Brilliance from every angle",
    title: "The Diamond Hoops",
    href: AMIPI_CATEGORY.earrings,
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(30, 14, 0, 0.95)" },
  },
  {
    from: 9.1,
    kicker: "Fine jewelry for every moment",
    title: "Discover the Collection",
    href: AMIPI_FINE_JEWELRY,
    tone: { title: "#ffffff", kicker: "#ffffff", glow: "rgba(30, 14, 0, 0.95)" },
  },
];

function chapterAt(seconds: number) {
  let index = 0;
  CHAPTERS.forEach((c, i) => {
    if (seconds >= c.from) index = i;
  });
  return index;
}

/**
 * The hero's background film. Lives inside the intro's backdrop, so it is
 * what the third card shows and what that card opens out into.
 *
 * It starts playing on mount rather than when the intro resolves, so it is
 * already moving while it is still the small third card. Looped and muted
 * for good. Reports which piece is on screen through `onChapter`.
 *
 * Played from an effect instead of the `autoPlay` attribute, for two reasons:
 * visitors who asked for reduced motion get the still poster instead of the
 * film, and React does not reliably write `muted` into server-rendered HTML,
 * which browsers require before they will autoplay. Setting `muted` on the
 * element right before play() avoids that.
 *
 * Decorative: the caption carries the message, so the film is hidden from
 * assistive technology.
 */
export function HeroVideo({ onChapter }: { onChapter: (index: number) => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* timeupdate fires about four times a second, close enough to the cut
       for a caption that fades in anyway. React skips the re-render when the
       chapter has not changed. */
    const sync = () => onChapter(chapterAt(video.currentTime));
    video.addEventListener("timeupdate", sync);

    video.muted = true;
    /* Rejected when the browser blocks autoplay (e.g. some data-saver modes).
       The poster - the necklace - stays up, matching the first caption. */
    video.play().catch(() => {});

    return () => video.removeEventListener("timeupdate", sync);
  }, [onChapter]);

  return (
    <video
      ref={ref}
      className="hero-video"
      poster={POSTER_SRC}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}

const SERIF = "font-[family-name:var(--font-cormorant)]";

/**
 * The title of the piece on screen and the hero's one call to action,
 * bottom-left. Keyed on the chapter, so each title rises in again when the
 * film moves on to the next piece.
 */
export function HeroCaption({ index }: { index: number }) {
  const chapter = CHAPTERS[index];
  const { tone } = chapter;
  return (
    <div className="hero-slide-caption absolute inset-x-0 bottom-0 z-40 px-edge pb-7 sm:pb-10">
      <div key={index} className="hero-caption-in max-w-2xl">
        <p
          className="text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
          style={{ color: tone.kicker, textShadow: `0 1px 10px ${tone.glow}` }}
        >
          {chapter.kicker}
        </p>
        <h2
          className={`${SERIF} mt-3 text-4xl leading-[1.05] italic sm:text-6xl lg:text-7xl`}
          style={{ color: tone.title, textShadow: `0 2px 24px ${tone.glow}, 0 1px 3px ${tone.glow}` }}
        >
          {chapter.title}
        </h2>
      </div>
      <div className="mt-7">
        <PillButton href={chapter.href} variant="gold" icon="arrow">
          {chapter.cta ?? "Shop now"}
        </PillButton>
      </div>
    </div>
  );
}
