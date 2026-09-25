"use client";

import { useRef, type ComponentProps } from "react";
import Image, { getImageProps } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";
import { HeroLockup } from "./HeroLockup";
import {
  BEATS,
  EXIT_FADE,
  EXIT_ROTATION_DEG,
  HERO_COPY,
  LOCKUP_DRIFT_PX,
  MARK_EXIT,
  MASK,
  REVEAL,
  exitVector,
} from "./heroIntro";
import "./hero.css";

/* Imported rather than referenced from /public on purpose. A static import
   gives Next the intrinsic dimensions at build time, which is what lets the
   art-directed <picture> below be built without hardcoding pixel sizes that
   would silently go stale — including when the 16:9 backdrop is swapped for its
   upscaled version. */
import backdropWide from "../../../Hero-Images/necklace_final.png";
import backdropPortrait from "../../../Hero-Images/Necklace-mobile.png";
import cardEarrings from "../../../Hero-Images/earrings-Photoroom.png";
import cardBracelet from "../../../Hero-Images/Hand.png";

gsap.registerPlugin(useGSAP);

/**
 * The hero: one self-contained sequence that plays on load and answers to
 * nothing else.
 *
 * The intro runs first. The bull mark resolves at centre, "Established 1976"
 * and the AMIPI wordmark split to the edges, three concentric jewelry cards
 * stack up, two are thrown off diagonally, and the third engulfs the viewport
 * to become the page background. Roughly 3.6s; any input fast-forwards it.
 *
 * The moment it resolves, the reveal hands the stage over: the lockup dissolves
 * and the hero's copy — the anniversary line and the CTA — takes its place.
 * Driven by the intro's own completion rather than by scroll, so the whole hero
 * is a single viewport tall and the first scroll goes straight into the next
 * section.
 *
 * Deliberately self-contained: every style it needs lives in hero.css and every
 * timing constant in heroIntro.ts, so the whole feature is three files plus
 * this one and touches nothing a second developer would be editing in the
 * sections below.
 */
export default function HeroStage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stage = sectionRef.current;
      if (!stage) return;

      const pick = (selector: string) =>
        stage.querySelector<HTMLElement>(selector);

      const viewport = pick(".hero-viewport");
      const backdrop = pick(".hero-backdrop");
      const cardOne = pick('[data-hero-card="one"]');
      const cardTwo = pick('[data-hero-card="two"]');
      const mark = pick(".hero-mark");
      const est = pick(".hero-est");
      const wordmark = pick(".hero-wordmark");
      const copy = pick(".hero-copy");
      const kicker = pick(".hero-kicker");
      const cta = pick(".hero-cta");

      if (
        !viewport ||
        !backdrop ||
        !cardOne ||
        !cardTwo ||
        !mark ||
        !est ||
        !wordmark ||
        !copy ||
        !kicker ||
        !cta
      ) {
        return;
      }

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /* ------------------------------------------------------------------
         Reduced motion: no intro and no hand-off, just the finished hero.

         The lockup is hidden rather than dissolved. A crossfade someone asked
         not to see is still a crossfade, and hero.css paints this same end state
         pre-hydration — so JS and CSS agree, and there is no frame where the
         lockup appears only to be taken away again.
      ------------------------------------------------------------------ */
      if (reduced) {
        gsap.set(backdrop, { opacity: 1, "--hero-mask": MASK.full });
        gsap.set([cardOne, cardTwo], { display: "none" });
        gsap.set([mark, est, wordmark], { display: "none" });
        gsap.set(copy, { opacity: 1 });
        stage.dataset.heroIntro = "done";
        return;
      }

      /* ------------------------------------------------------------------
         The reveal: the lockup dissolves, the copy takes the stage.

         Built synchronously, even though it must not run until the intro has
         finished, because gsap.context() only auto-collects animations created
         during this function's own execution. Anything created later from a
         callback would leak past unmount. So the timeline is created here and
         simply left paused for the intro's onComplete to play.
      ------------------------------------------------------------------ */
      const reveal = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      /* The frame-0 rules in hero.css stop matching the moment the attribute
         flips off "pending", so the copy's hidden state has to be handed to
         GSAP explicitly — otherwise it would pop into view halfway through the
         intro, the instant CSS let go of it. */
      gsap.set(copy, { opacity: 0 });

      reveal
        /* The lockup leaves the way it came: "Established 1976" and the wordmark
           drift back out along the axis they converged on, and the mark
           dissolves into the blur it arrived from a beat later, so the frame
           releases before the centrepiece.

           These inherit the timeline's power2.out rather than easing in and out,
           and the difference is not cosmetic. An inOut curve barely moves in its
           first third, which left all three parts sitting at near-full opacity
           for ~0.3s after the reveal had already started — it read as a stall,
           not a hand-off. Front-loading the fade clears the stage early and
           leaves only a ghost behind, which is what a dissolve should look like
           and what keeps the incoming copy from arriving over legible
           letterspaced caps. */
        .to(
          est,
          {
            opacity: 0,
            x: -LOCKUP_DRIFT_PX,
            duration: REVEAL.lockupOut.dur,
          },
          REVEAL.lockupOut.at,
        )
        .to(
          wordmark,
          {
            opacity: 0,
            x: LOCKUP_DRIFT_PX,
            duration: REVEAL.lockupOut.dur,
          },
          REVEAL.lockupOut.at,
        )
        .to(
          mark,
          {
            opacity: 0,
            scale: MARK_EXIT.scale,
            filter: `blur(${MARK_EXIT.blur}px)`,
            duration: REVEAL.markOut.dur,
          },
          REVEAL.markOut.at,
        )
        /* The copy container carries no motion of its own — it is only released
           from the hidden state set above. Each child's own from() keeps it
           invisible until its beat arrives, so nothing shows early. */
        .set(copy, { opacity: 1 }, REVEAL.kicker.at)
        .from(
          kicker,
          { opacity: 0, y: 12, duration: REVEAL.kicker.dur },
          REVEAL.kicker.at,
        )
        .from(
          cta,
          { opacity: 0, y: 10, duration: REVEAL.cta.dur },
          REVEAL.cta.at,
        );

      /* ------------------------------------------------------------------
         The intro.
      ------------------------------------------------------------------ */

      /* A reload halfway down the page must not play a centre-of-screen intro
         somewhere the visitor cannot see. Restored on cleanup so client-side
         navigation elsewhere is unaffected. */
      const priorRestoration = history.scrollRestoration;
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      /* Measured with offsetWidth/offsetHeight rather than
         getBoundingClientRect() because the cards are about to be scaled down
         to 0.88, and a rect would report the scaled box. Sizes are read once,
         here, so the same beat table produces correct travel on a 360px phone
         and a 3440px ultrawide. */
      const stageSize = {
        width: viewport.offsetWidth,
        height: viewport.offsetHeight,
      };
      const exitOne = exitVector(
        { width: cardOne.offsetWidth, height: cardOne.offsetHeight },
        stageSize,
        "bottom-right",
      );
      const exitTwo = exitVector(
        { width: cardTwo.offsetWidth, height: cardTwo.offsetHeight },
        stageSize,
        "bottom-left",
      );

      gsap.set(mark, { opacity: 0, scale: 0.92, filter: "blur(6px)" });
      gsap.set(est, { opacity: 0, x: -48 });
      gsap.set(wordmark, { opacity: 0, x: 48 });
      gsap.set([cardOne, cardTwo], { opacity: 0, scale: 0.88 });
      gsap.set(backdrop, { opacity: 0, "--hero-mask": MASK.enter });

      /* Hand over from CSS to GSAP. This releases the frame-0 rules and engages
         the will-change hint on the backdrop, and it happens in the same
         pre-paint layout effect as the set() calls above — so there is no frame
         where CSS has let go but GSAP has not yet taken hold. */
      stage.dataset.heroIntro = "running";

      const stage1 = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          stage.dataset.heroIntro = "done";
          releaseInput();
          /* Causal hand-off rather than a timer. Skip the intro two seconds in
             and the reveal starts two seconds in with it, instead of a
             delayedCall leaving a dead pause on a hero that has already
             resolved. A skip fast-forwards the intro, not the copy: the
             gesture asked for the intro to stop, not for the message to be
             thrown away, and the visitor is free to scroll past it either way
             since input is released on the same line above. */
          reveal.play();
        },
      });

      stage1
        /* 1 — the mark resolves. */
        .to(
          mark,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: BEATS.markIn.dur,
            ease: "power2.out",
          },
          BEATS.markIn.at,
        )
        /* 2 — the band splits to the edges. */
        .to(
          [est, wordmark],
          {
            opacity: 1,
            x: 0,
            duration: BEATS.split.dur,
            ease: "power4.out",
          },
          BEATS.split.at,
        )
        /* 3, 4 — the two foreground cards. */
        .to(
          cardOne,
          { opacity: 1, scale: 1, duration: BEATS.cardOneIn.dur },
          BEATS.cardOneIn.at,
        )
        .to(
          cardTwo,
          { opacity: 1, scale: 1, duration: BEATS.cardTwoIn.dur },
          BEATS.cardTwoIn.at,
        )
        /* 5 — the backdrop joins the stack, its window growing from tighter
               than card-sized so it arrives rather than just appears. */
        .to(
          backdrop,
          { opacity: 1, duration: BEATS.cardThreeIn.dur * 0.6 },
          BEATS.cardThreeIn.at,
        )
        .to(
          backdrop,
          { "--hero-mask": MASK.card, duration: BEATS.cardThreeIn.dur },
          BEATS.cardThreeIn.at,
        )
        /* 6, 7 — both cards leave. Overlapped by 0.15s in the beat table so
                  the eye reads one gesture rather than a queue. The fade is a
                  separate, later tween so each card is already invisible while
                  still marginally on screen. */
        .to(
          cardOne,
          {
            x: exitOne.x,
            y: exitOne.y,
            rotate: EXIT_ROTATION_DEG,
            duration: BEATS.cardOneOut.dur,
            ease: "power2.in",
          },
          BEATS.cardOneOut.at,
        )
        .to(
          cardOne,
          { opacity: 0, duration: EXIT_FADE.dur, ease: "none" },
          BEATS.cardOneOut.at + EXIT_FADE.offset,
        )
        .to(
          cardTwo,
          {
            x: exitTwo.x,
            y: exitTwo.y,
            rotate: -EXIT_ROTATION_DEG,
            duration: BEATS.cardTwoOut.dur,
            ease: "power2.in",
          },
          BEATS.cardTwoOut.at,
        )
        .to(
          cardTwo,
          { opacity: 0, duration: EXIT_FADE.dur, ease: "none" },
          BEATS.cardTwoOut.at + EXIT_FADE.offset,
        )
        /* 8a — the pop: the window tightens below card size. */
        .to(
          backdrop,
          {
            "--hero-mask": MASK.pop,
            duration: BEATS.pop.dur,
            ease: "power2.in",
          },
          BEATS.pop.at,
        )
        /* 8b — and opens to full bleed. */
        .to(
          backdrop,
          {
            "--hero-mask": MASK.full,
            duration: BEATS.engulf.dur,
            ease: "power3.inOut",
          },
          BEATS.engulf.at,
        );

      /* ------------------------------------------------------------------
         Input during the intro.

         The intro needs scroll held for ~4s, but `overflow: hidden` on <html>
         is the wrong tool: removing the scrollbar widens the viewport and
         reflows the page, producing a layout shift at both ends of the intro.

         Since any input is specified to fast-forward the intro, the lock only
         ever has to neutralise the single event that triggers the skip. A
         capture-phase listener does that, and `stopImmediatePropagation()` also
         stops Lenis's own window listener from ever seeing the event — which is
         why none of this requires reaching into SmoothScroll.tsx. React runs
         layout effects before passive effects, and this is a layout effect while
         Lenis is created in a passive one, so this listener is guaranteed to be
         registered first and therefore to run first.
      ------------------------------------------------------------------ */
      const INPUT_EVENTS = [
        "wheel",
        "touchstart",
        "touchmove",
        "keydown",
        "pointerdown",
      ] as const;

      function releaseInput() {
        for (const type of INPUT_EVENTS) {
          window.removeEventListener(type, skip, { capture: true });
        }
      }

      function skip(event: Event) {
        /* Pointer and wheel events are cancelled so the gesture that triggered
           the skip does not also scroll the page. Keyboard events deliberately
           are not: cancelling keydown would swallow Ctrl+R and F5 and leave the
           visitor unable to reload for four seconds. A key that would have
           scrolled costs one step, and the end state arrives in the same frame
           anyway. */
        if (event.type !== "keydown" && event.cancelable) {
          event.preventDefault();
        }
        event.stopImmediatePropagation();
        releaseInput();
        /* Fast-forward rather than kill, so every element lands on the exact
           end state the timeline defines and onComplete still fires. */
        stage1.progress(1);
      }

      for (const type of INPUT_EVENTS) {
        window.addEventListener(type, skip, { capture: true, passive: false });
      }

      return () => {
        releaseInput();
        history.scrollRestoration = priorRestoration;
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-hero-intro="pending"
      className="hero-stage relative h-svh w-full"
    >
      {/* Exactly one viewport, so this is a plain box rather than the sticky
          one it used to be: with nothing below it inside the section, there is
          no scroll distance for a sticky child to hold against. (It was never a
          ScrollTrigger pin either — page.tsx documents why that spacer is a
          hazard here, and sticky sidestepped it.) */}
      <div className="hero-viewport relative h-svh w-full overflow-hidden">
        <div className="hero-backdrop z-0">
          <div className="hero-backdrop-pan">
            <HeroBackdrop />
          </div>
        </div>

        {/* Bracelet behind earrings, backdrop behind both: the stacking order
            the choreography calls for. */}
        <HeroCard
          slot="two"
          src={cardBracelet}
          alt={HERO_COPY.alt.bracelet}
          sizes="(min-width: 640px) 580px, 66vw"
          className="z-10"
        />
        <HeroCard
          slot="one"
          src={cardEarrings}
          alt={HERO_COPY.alt.earrings}
          sizes="(min-width: 640px) 420px, 55vw"
          className="z-20"
        />

        <div className="hero-scrim z-30" />

        {/* The reveal's payload. Held at opacity 0 by hero.css until the intro
            resolves and the hand-off runs — but present in the markup from the
            first byte, so the h1 is always there for crawlers and assistive
            technology.

            `px-edge` rather than the px-6/sm:px-12/lg:px-20 ramp the sections
            below use: this column has to start on the same vertical line as the
            navbar's logo, which is directly above it, and that means reading the
            same shared gutter token rather than a fixed inset that only agreed
            with it near 1454px. */}
        <div className="hero-copy pointer-events-none absolute inset-0 z-40 flex flex-col items-start justify-center px-edge">
          {/* Narrower than a full-width column on purpose. Recentring the subject
              moved her left, which pulled the clear backdrop band in from ~33% of
              the viewport to ~21.6%, and the copy has to stay inside it rather
              than run across her hair. */}
          <div className="max-w-xl">
            {/* The h1, now that the display headline is parked. The page needs
                one and this is the only copy left in the hero, so the level is
                carried here rather than pushed down into the first section
                below. Nothing changes visually — the styling was never coming
                from the element. */}
            <h1 className="hero-kicker text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
              {HERO_COPY.kicker}
            </h1>
            {/* mt-7 rather than the mt-8 this carried under the hairline: with
                the headline and divider gone, the button is answering directly
                to the line above it and a full 32px reads as a gap rather than
                as a pair. */}
            <div className="hero-cta pointer-events-auto mt-7 flex flex-wrap items-center gap-4">
              {/* The `jewel` variant, which exists for this one button: the
                  metallic ramp the rest of the site uses, minus the white
                  hairline and gold glow that made `solid` read as plastic over
                  photography, plus a bevel and a grounding shadow. `solid` is
                  used in nine other places and is left alone.

                  A gem in place of the bullet dot. The dot was a neutral marker
                  that could have terminated any label on the site; this is the
                  hero's one CTA on a diamond house's landing page, so the mark
                  may as well be a stone. Sized a touch larger than the arrow
                  icon because a faceted glyph needs the extra pixels to stay
                  legible as a gem rather than a blob.

                  `size="hero"` is kept even though "Explore Amipi" is less than
                  half the length of the label it replaced. It is still the one
                  CTA standing over photography at the top of the page, and a
                  fluid size ties its geometry to the viewport instead of
                  stepping at a single width; from ~620px up it resolves to the
                  same box `md` would have given it anyway. */}
              <PillButton
                href={HERO_COPY.ctaHref}
                variant="jewel"
                size="hero"
                icon="gem"
              >
                {HERO_COPY.ctaLabel}
              </PillButton>
            </div>
          </div>
        </div>

        <HeroLockup />
      </div>
    </section>
  );
}

/**
 * One of the two foreground cards.
 *
 * The faint cream ring is load-bearing rather than decorative: the earrings
 * frame fades to near-black at its lower edge, and without a ring the bottom of
 * the card dissolves into the stage and it stops reading as a card at all.
 */
function HeroCard({
  slot,
  src,
  alt,
  sizes,
  className,
}: {
  slot: "one" | "two";
  src: ComponentProps<typeof Image>["src"];
  alt: string;
  sizes: string;
  className: string;
}) {
  return (
    <div
      data-hero-card={slot}
      className={`hero-card overflow-hidden rounded-[20px] ring-1 ring-ice-100/10 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

/**
 * The backdrop, art-directed.
 *
 * Two different photographs, not two crops of one: on a 9:19.5 phone a
 * `object-cover` against the 16:9 frame shows only its central ~26%, which
 * decapitates the model. The previous hero solved this with a `hidden sm:block`
 * pair, but CSS visibility does not prevent a download — both files were
 * fetched on every viewport, for the largest image on the page.
 *
 * `getImageProps` is the documented escape hatch for exactly this, letting a
 * real <picture>/<source> pair carry the optimizer's srcSets so the browser
 * fetches precisely one. Its one documented restriction is that it cannot be
 * combined with `placeholder`, so there is no blur-up here.
 *
 * `quality` is deliberately not set: as of Next 16 `images.qualities` defaults
 * to [75] and any other value is silently coerced to the nearest allowed entry,
 * so passing 90 would document an intent the build does not honour. Raising it
 * means adding `qualities` to next.config.ts.
 */
function HeroBackdrop() {
  const common = {
    alt: HERO_COPY.alt.backdrop,
    priority: true,
  };

  /* `sizes` has to describe the rendered width, not the viewport width. The
     16:9 frame now renders at exactly 100vw — the subject is centred in the
     source, so the corrective zoom that used to justify 120vw here is gone. The
     4:5 frame is a different story: cover-cropping it to a phone screen renders
     it at roughly 1.75x the viewport width, and claiming 100vw for that would
     have the browser pick a candidate one step too small and hand back a
     visibly soft hero. Each <source> carries its own value, since a <source>
     without `sizes` falls back to 100vw rather than inheriting the <img>'s. */
  const {
    props: { srcSet: wideSrcSet, sizes: wideSizes },
  } = getImageProps({
    ...common,
    sizes: "100vw",
    src: backdropWide,
    width: backdropWide.width,
    height: backdropWide.height,
  });

  const {
    props: { srcSet: portraitSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    sizes: "175vw",
    src: backdropPortrait,
    width: backdropPortrait.width,
    height: backdropPortrait.height,
  });

  return (
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet={wideSrcSet}
        sizes={wideSizes}
      />
      <source srcSet={portraitSrcSet} sizes={imgProps.sizes} />
      {/* A raw <img> is correct here, not an oversight: getImageProps exists
          precisely so the optimizer's output can be driven through a hand-built
          <picture>, which next/image cannot express. The no-img-element rule
          allows this when the img is a <picture> child. */}
      <img
        {...imgProps}
        alt={HERO_COPY.alt.backdrop}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </picture>
  );
}
