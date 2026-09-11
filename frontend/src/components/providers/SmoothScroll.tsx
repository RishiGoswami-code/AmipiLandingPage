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

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      ScrollTrigger.normalizeScroll(true);
      return () => {
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
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
