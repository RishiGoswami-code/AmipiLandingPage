"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis momentum scrolling, driven by GSAP's ticker.
 *
 * The wiring matters more than it looks. Lenis and ScrollTrigger each want to
 * own the frame loop, and if they run on separate rAF callbacks the pinned
 * hero lags the scroll position by a frame and visibly judders. Handing Lenis
 * GSAP's ticker puts both on one clock; lagSmoothing(0) stops GSAP from
 * silently skipping time after a stall, which would desync the scrub.
 *
 * Touch devices skip Lenis entirely and hand scrolling to
 * ScrollTrigger.normalizeScroll instead. Phone browsers resize the viewport
 * mid-gesture as their address bar hides and shows, and that resize lands
 * while the hero is pinned - ScrollTrigger recomputes the pin's scroll range
 * against the new viewport height but the finger's native scroll position
 * doesn't reflect it, so the scrub stalls for a stretch of swipes and then
 * snaps through the rest in one jump the moment the numbers reconcile.
 * normalizeScroll takes scrolling off the browser's native path and drives it
 * itself, so the address bar's resize never desyncs the pin in the first
 * place. Running it alongside Lenis would just give the gesture two owners,
 * so this is either/or based on input type, not both.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Someone who asked for less motion should get the native scroll, not a
    // smoothed one - momentum scrolling is itself a motion effect.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Every section below builds its own scroll-triggered reveal in its own
    // effect, and React fires child effects before this parent one, so every
    // trigger on the page already exists by the time we get here. GSAP
    // normally re-measures all of them itself on the browser's native "load"
    // event - but on a slow connection or a cold cache, "load" can fire
    // before hydration ever runs, so that listener gets registered too late
    // to catch it. Any trigger whose start/end was measured against a
    // not-yet-settled layout is then stuck wrong until the next full
    // reload - cards left mid-reveal (partway through their fade/rise/scale)
    // or, worse, never played at all. Refreshing again here, after every
    // section has mounted, re-measures against the final layout regardless
    // of how that race landed; a second pass on "load" catches anything that
    // still shifts after (e.g. a slow-decoding image). Both are no-ops for a
    // page that measured correctly the first time.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      /* allowNestedScroll lets a gesture that starts inside a scrollable child
         scroll that child natively instead of being normalised into page
         scroll. Without it the horizontal category row on the home page
         (ShopByCategory) cannot be swiped at all on a phone — which is the only
         input it has there, since its arrows are desktop-only. Passing an object
         rather than `true` leaves everything else as it was: `type` defaults to
         "wheel,touch" inside normalizeScroll. */
      ScrollTrigger.normalizeScroll({ allowNestedScroll: true });
      return () => {
        window.removeEventListener("load", refresh);
        ScrollTrigger.normalizeScroll(false);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
