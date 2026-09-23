"use client";

import { useRef, type ComponentProps } from "react";
import Image, { getImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";
import { cormorant } from "@/styles/fonts";
import { HeroLockup } from "./HeroLockup";
import {
  BEATS,
  EXIT_FADE,
  EXIT_ROTATION_DEG,
  HERO_COPY,
  MASK,
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The hero, in two phases.
 *
 * Phase 1 runs on load, is not scroll-driven and is not pinned. The bull mark
 * resolves at centre, "Established 1976" and the AMIPI wordmark split to the
 * edges, three concentric jewelry cards stack up, two are thrown off
 * diagonally, and the third engulfs the viewport to become the page
 * background. Roughly 3.95s; any input fast-forwards it.
 *
 * Phase 2 is scroll-driven. The lockup hands over to the tagline, then the
 * section ends and normal page flow resumes.
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
      const lockup = pick(".hero-lockup");
      const copy = pick(".hero-copy");
      const kicker = pick(".hero-kicker");
      const divider = pick(".hero-divider");
      const cta = pick(".hero-cta");
      const lineInners = gsap.utils.toArray<HTMLElement>(
        stage.querySelectorAll(".hero-line-inner"),
      );

      if (
        !viewport ||
        !backdrop ||
        !cardOne ||
        !cardTwo ||
        !mark ||
        !est ||
        !wordmark ||
        !lockup ||
        !copy ||
        !kicker ||
        !divider ||
        !cta ||
        lineInners.length === 0
      ) {
        return;
      }

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /* ------------------------------------------------------------------
         Phase 2.

         Built synchronously, even though it must not run until the intro has
         finished, because gsap.context() only auto-collects animations created
         during this function's own execution. Anything created later from a
         callback would leak past unmount. So the timeline and its ScrollTrigger
         are created now and simply gated on a flag.

         Progress is mapped straight from scroll rather than using
         ScrollTrigger's own `scrub` smoothing, because Lenis is already
         smoothing the scroll input; layering a second smoother on top reads as
         lag rather than as polish.
      ------------------------------------------------------------------ */
      const phaseTwo = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      /* The frame-0 rules in hero.css stop matching the moment the attribute
         flips off "pending", so the tagline's hidden state has to be handed to
         GSAP explicitly — otherwise it would pop into view halfway through the
         intro, the instant CSS let go of it. */
      gsap.set(copy, { opacity: 0 });

      phaseTwo
        .to(lockup, { opacity: 0, y: -28, duration: 0.4 }, 0)
        .set(copy, { opacity: 1 }, 0.28);

      if (reduced) {
        /* No travel, no clipped roll — just the crossfade. */
        phaseTwo.from(
          [kicker, ...lineInners, divider, cta],
          { opacity: 0, duration: 0.3 },
          0.3,
        );
      } else {        phaseTwo
          .from(kicker, { opacity: 0, y: 16, duration: 0.22 }, 0.32)
          /* The clipped vertical roll is this site's signature move (see
             PillButton's label swap). No rotation is added to it: rotating a
             short wide bar about its centre lifts the far ends above the clip
             line and smears the hidden duplicate into view — see PillButton's
             docstring, where that was deliberately removed. */
          .from(
            lineInners,
            { yPercent: 115, duration: 0.34, stagger: 0.08 },
            0.38,
          )
          .from(divider, { scaleX: 0, duration: 0.2 }, 0.62)
          .from(cta, { opacity: 0, y: 16, duration: 0.22 }, 0.7);
      }

      let introResolved = false;

      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (!introResolved) return;

          if (reduced) {
            /* Equivalent to toggleActions "play none none none", which every
               scroll reveal on this site uses deliberately: the GSAP default
               replays in reverse when Lenis momentum overshoots back above the
               trigger line, stranding elements mid-reveal. */
            if (self.progress > 0.04) phaseTwo.play();
            return;
          }

          phaseTwo.progress(self.progress);
        },
      });

      /* ------------------------------------------------------------------
         Reduced motion: skip phase 1 entirely and render its end state.
      ------------------------------------------------------------------ */
      if (reduced) {
        gsap.set(backdrop, { opacity: 1, "--hero-mask": MASK.full });
        gsap.set([mark, est, wordmark], { opacity: 1 });
        gsap.set([cardOne, cardTwo], { display: "none" });
        stage.dataset.heroIntro = "done";
        introResolved = true;
        return;
      }

      /* ------------------------------------------------------------------
         Phase 1.
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
          introResolved = true;
          releaseInput();
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
      className="hero-stage relative h-[190svh] w-full"
    >
      {/* Sticky rather than pinned. page.tsx documents that ScrollTrigger's pin
          spacer grows when its wrapper is a flex column; that hazard is dormant
          today (nothing in src pins anything) and sticky avoids waking it. */}
      <div className="hero-viewport sticky top-0 h-svh w-full overflow-hidden">
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

        {/* Phase 2's payload. Held at opacity 0 by hero.css until the scroll
            phase reveals it — but present in the markup from the first byte, so
            the h1 is always there for crawlers and assistive technology. */}
        <div className="hero-copy pointer-events-none absolute inset-0 z-40 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-20">
          {/* Narrower than a full-width column on purpose. Recentring the subject
              moved her left, which pulled the clear backdrop band in from ~33% of
              the viewport to ~21.6%, and the copy has to stay inside it rather
              than run across her hair. */}
          <div className="max-w-xl">
            <p className="hero-kicker text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
              {HERO_COPY.kicker}
            </p>
            {/* Cormorant Garamond, not the theme's `font-display`. The font's own
                className sets the family, so `font-display` is removed rather
                than left to fight it — both resolve to font-family and Tailwind
                settles that by stylesheet order, not class order.

                Set to match the specimen this font was chosen from: all-caps at
                300. Weight is the whole point — Cormorant's character is its
                thick-to-thin contrast, and that contrast is widest at light.
                Anything heavier thickens the hairlines and the face stops looking
                like itself.

                Sized fluidly rather than in breakpoint steps, and the inner
                min(6.2vw, 11svh) is the part that matters responsively: a purely
                width-based display size looks right on a desktop and then fills a
                landscape phone from top to bottom, because that viewport is wide
                and short. Taking the smaller of the two axes means the headline
                answers to whichever one is actually scarce. The clamp floors it at
                30px so it stays readable on a 320px phone, and caps it at 60px —
                caps are materially wider than mixed case, and past 60px "JUST
                DIAMONDS." starts crowding both the column and the model's hair.

                The pb/-mb pair on each clipped line is insurance, not spacing.
                The roll animation hides each line by clipping it to its own box,
                and Cormorant's cap "J" drops below the baseline — visible in the
                specimen's "JUMPED". Tight leading shrinks that box, so the
                padding buys the descender room and the negative margin takes the
                visual gap back out. */}
            <h1
              className={`${cormorant.className} mt-5 text-[clamp(1.9rem,min(6.2vw,11svh),3.75rem)] leading-[1.0] font-light tracking-[0.01em] text-ice-100 uppercase`}
            >
              {HERO_COPY.headline.map((line) => (
                <span
                  key={line}
                  className="-mb-[0.16em] block overflow-hidden pb-[0.16em]"
                >
                  <span className="hero-line-inner block">{line}</span>
                </span>
              ))}
            </h1>
            <div className="hero-divider mt-6 h-px w-16 origin-left bg-gold-500/60" />
            <div className="hero-cta pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
              {/* Back to the pill. The `solid` variant it used to carry is a gold
                  gradient inside a white border under a coloured glow, and those
                  three effects together read as plastic on photography — but
                  `solid` is used in nine other places, so refining it here would
                  have restyled buttons across the whole site. The champagne
                  variant gets the elegance instead: same pill, same clipped label
                  roll, just a flat warm fill with no border and no glow. */}
              <PillButton href={HERO_COPY.ctaHref} variant="gold" icon="dot">
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
