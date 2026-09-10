"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  DESKTOP_FOCUS,
  MOBILE_FOCUS,
  PORTRAIT_ASPECT,
  WIDE_ASPECT,
  panFor,
  screenPointFor,
  toContainerSpace,
  type FocusPoint,
} from "@/lib/heroFocus";
import { JewelTag } from "./JewelTag";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Scroll distance the pinned sequence occupies, as a share of viewport height. */
const SCROLL_LENGTH = "+=340%";

export default function HeroStage() {
  const root = useRef<HTMLElement>(null!);
  const softWrap = useRef<HTMLDivElement>(null!);
  const sharpWrap = useRef<HTMLDivElement>(null!);
  const softPlate = useRef<HTMLDivElement>(null!);
  const sharpPlate = useRef<HTMLDivElement>(null!);
  const tagAnchor = useRef<HTMLDivElement>(null!);
  const braceletTag = useRef<HTMLDivElement>(null!);
  const necklaceTag = useRef<HTMLDivElement>(null!);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const focus = isMobile ? MOBILE_FOCUS : DESKTOP_FOCUS;

      // Reduced motion: present the photograph as a still. No pin, no scrub,
      // no entrance flourish - the copy below just renders at rest.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([braceletTag.current, necklaceTag.current], { opacity: 0 });
        // No scrub to write the anchor, so plant the opening framing by hand.
        root.current.style.setProperty(
          "--hero-object-x",
          `${focus.hero.align * 100}%`,
        );
        return;
      }

      // The camera state. GSAP tweens this plain object; one onUpdate writes
      // the result to the DOM. Tweening the object rather than the elements
      // keeps scale, pan, blur and aperture in lockstep on every frame.
      const cam: FocusPoint = { ...focus.hero };

      const apply = () => {
        const frame = softWrap.current;
        if (!frame) return;
        const w = frame.offsetWidth;
        const h = frame.offsetHeight;

        // Focus points are measured on the photograph; object-cover crops it,
        // so they must be mapped into container space before any panning.
        const c = toContainerSpace(
          cam.x,
          cam.y,
          isMobile ? PORTRAIT_ASPECT : WIDE_ASPECT,
          w,
          h,
          cam.align,
        );

        // The anchor has to reach the <img> itself - it is object-position, not
        // a transform - so it travels as a custom property on the section and
        // all four plates (soft/sharp x wide/portrait) inherit the one write.
        // toContainerSpace above is doing its arithmetic against this exact
        // number, so the two can never drift apart.
        root.current.style.setProperty(
          "--hero-object-x",
          `${cam.align * 100}%`,
        );

        const pan = panFor(c.x, c.y, cam.scale, w, h);
        const transform = `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${cam.scale})`;
        softPlate.current.style.transform = transform;
        sharpPlate.current.style.transform = transform;

        // Blur and mask live on the viewport-sized wrappers, never on the
        // scaled plate. A filter or mask forces the browser to rasterise its
        // whole box in one go; on a 3x-scaled full-bleed plate that box runs
        // past the max texture size and Chrome silently drops most of it.
        softWrap.current.style.filter = `blur(${cam.blur}px)`;

        // The sharp copy is cut back to a pocket around the focus point and
        // the defocused copy shows through elsewhere. That is the depth of
        // field: blurring the whole frame would soften the jewellery too.
        const point = screenPointFor(c.x, c.y, cam.scale, w, h);
        const radius = (cam.aperture / 100) * Math.min(w, h);
        const gradient = `radial-gradient(circle at ${point.x}px ${point.y}px, #000 ${radius * 0.45}px, transparent ${radius}px)`;
        sharpWrap.current.style.maskImage = gradient;
        sharpWrap.current.style.setProperty("-webkit-mask-image", gradient);

        // Keep the hotspot glued to the jewel, including when the pan clamped.
        tagAnchor.current.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      };

      apply();

      // ---- Opening flourish: a staggered reveal on first paint ----------
      // Independent of the scroll-scrubbed camera above - this runs once,
      // on mount, and never again. Two real, stacked labels rolling past
      // each other is already this site's signature move (see PillButton's
      // hover swap); the headline reuses that same clipped-roll language
      // instead of a generic fade, so the entrance and the rest of the page
      // read as one idea rather than two unrelated effects bolted together.
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-kicker", { opacity: 0, y: 16, duration: 0.7 }, 0.1)
        .from(
          ".hero-line-inner",
          { yPercent: 115, duration: 0.9, stagger: 0.12 },
          0.25,
        )
        .from(".hero-divider", { scaleX: 0, duration: 0.6 }, 0.75)
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, 0.85)
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, duration: 0.6 },
          1,
        )
        .from(
          ".hero-appointment",
          { opacity: 0, x: 28, duration: 0.8, ease: "back.out(1.5)" },
          1.05,
        );

      // The booking card is fixed on screen always — fade it in once on mount.
      gsap.fromTo(
        ".appt-card-fixed",
        { opacity: 0, x: 28 },
        { opacity: 1, x: 0, duration: 0.9, ease: "back.out(1.5)", delay: 1.1 },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: SCROLL_LENGTH,
          pin: true,
          // Pin by transform rather than position:fixed. Lenis drives scroll
          // from JS, and a fixed-position pin can land a frame out of step
          // with it; transform pinning stays inside the same compositing
          // context as the zoom, so the two can never disagree.
          pinType: "transform",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.inOut", duration: 1 },
        onUpdate: apply,
      });

      /* -- Stage 1 -> 2: push in on the bracelet ------------------------- */
      // ".hero-intro" also matches the floating appointment card - it fades
      // and lifts out with the rest of the opening copy, clearing the frame
      // for the zoom rather than sitting frozen over it.
      tl.to(cam, { ...focus.bracelet }, 0)
        .to(".hero-intro", { opacity: 0, y: -40, duration: 0.45 }, 0)
        .to(braceletTag.current, { opacity: 1, duration: 0.3 }, 0.75)

        /* -- Stage 2 -> 3: travel up to the necklace --------------------- */
        .to(braceletTag.current, { opacity: 0, duration: 0.25 }, 1.05)
        .to(cam, { ...focus.necklace }, 1.1)
        .to(necklaceTag.current, { opacity: 1, duration: 0.3 }, 1.85)

        /* -- Stage 3 -> 4: release and hand off to the next section ------ */
        .to(necklaceTag.current, { opacity: 0, duration: 0.25 }, 2.35)
        .to(cam, { ...focus.exit }, 2.4)
        .to(".hero-outro", { opacity: 1, y: 0, duration: 0.4 }, 2.6);

      // The plate is sized in CSS pixels, so a resize invalidates every cached
      // pan. Recompute rather than waiting for the next scroll tick.
      const onResize = () => apply();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: root, dependencies: [isMobile], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      className="relative h-svh w-full overflow-hidden bg-navy-950"
      style={
        {
          "--hero-object-x": `${(isMobile ? MOBILE_FOCUS : DESKTOP_FOCUS).hero.align * 100}%`,
        } as React.CSSProperties
      }
    >
      {/* ---- Defocused copy: the background of the depth-of-field pair ---- */}
      <div ref={softWrap} className="absolute inset-0 overflow-hidden">
        <div ref={softPlate} className="absolute inset-0 will-change-transform">
          <HeroPhoto priority />
        </div>
      </div>

      {/* ---- Sharp copy, masked back to a pocket around the focus point ---- */}
      <div ref={sharpWrap} className="absolute inset-0 overflow-hidden">
        <div ref={sharpPlate} className="absolute inset-0 will-change-transform">
          <HeroPhoto />
        </div>
      </div>

      {/* ---- Grade: lift the shadows toward the brand navy ---- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-navy-950/45" />

      {/* ---- Hotspots. Positioned in screen space, never scaled. ---- */}
      <div ref={tagAnchor} className="absolute top-0 left-0 h-0 w-0">
        <JewelTag
          ref={braceletTag}
          title="The Diamond Riviera Bracelet"
          spec="18k White Gold"
          side="left"
        />
        <JewelTag
          ref={necklaceTag}
          title="The Solitaire Diamond Choker"
          spec="18k White Gold"
          side="right"
        />
      </div>

      {/* ---- Stage 1 typography - left-aligned into the open third of the
           frame the camera's opening anchor (see heroFocus.ts) deliberately
           clears to the model's left ---- */}
      <div className="hero-intro pointer-events-none absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-2xl">
          <p className="hero-kicker text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Celebrating 50 Years of AMIPI
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[0.95] font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">No Bull.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">Just Diamonds.</span>
            </span>
          </h1>
          <div className="hero-divider mt-6 h-px w-16 origin-left bg-gold-500/60" />
          <p className="hero-sub mt-6 max-w-md text-sm leading-7 text-ice-100/70 sm:text-base">
            Natural and lab-grown diamonds, fine jewelry, and transparent wholesale pricing — everything retailers need from a trusted diamond hub.
          </p>
          <div className="hero-cta pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
            <PillButton href="/collections" variant="solid" icon="dot">
              Start Your Diamond Search
            </PillButton>
            <PillButton href="/login" variant="outline" icon="arrow" className="h-12 sm:h-14">
              Login
            </PillButton>
          </div>
        </div>
      </div>

      {/* ---- Floating booking card — FIXED so it persists everywhere on the page ---- */}

      {/* ---- Stage 4 handoff line ---- */}
      <div className="hero-outro pointer-events-none absolute inset-x-0 bottom-16 translate-y-6 px-6 text-center opacity-0">
        <p className="font-display text-xl tracking-[0.24em] text-ice-100 uppercase sm:text-2xl">
          The No-Bull Standard
        </p>
      </div>
    </section>
  );
}

/**
 * Art-directed source pair. The `sizes` hint is deliberately far larger than
 * the viewport: the camera pushes in to 3x, so Next must serve the biggest
 * variant it has or the zoom resolves to a soft upscale.
 */
function HeroPhoto({ priority = false }: { priority?: boolean }) {
  return (
    <>
      <Image
        src="/hero/rooftop-wide.jpg"
        alt="Model wearing a diamond tennis necklace and bracelet on a Manhattan rooftop at sunset"
        fill
        priority={priority}
        quality={90}
        sizes="320vw"
        className="hidden object-cover [object-position:var(--hero-object-x)_center] sm:block"
      />
      <Image
        src="/hero/rooftop-portrait.jpg"
        alt=""
        aria-hidden
        fill
        priority={priority}
        quality={90}
        sizes="260vw"
        className="object-cover [object-position:var(--hero-object-x)_center] sm:hidden"
      />
    </>
  );
}
