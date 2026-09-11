"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [data-cursor-hover]";

/**
 * Custom cursor for fine-pointer desktops: a gold dot glued exactly to the
 * pointer, and a ring that trails a beat behind it, then blooms gold on
 * hover.
 *
 * Touch devices and prefers-reduced-motion keep the system cursor untouched -
 * there's no pointer to decorate on one, and the trailing lag is itself a
 * motion effect on the other.
 */
export function CustomCursor() {
  const dotWrap = useRef<HTMLDivElement>(null!);
  const ringWrap = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isFinePointer || reduceMotion) return;

    const root = document.documentElement;
    const dot = dotWrap.current;
    const ring = ringWrap.current;

    root.classList.add("custom-cursor-active");

    // The dot tracks the raw pointer position every frame - zero lag, so it
    // always reads as "the" cursor. The ring eases toward the same point on
    // its own clock, which is what makes it feel like it's trailing rather
    // than just a second, redundant pointer.
    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    const setRingX = gsap.quickTo(ring, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const setRingY = gsap.quickTo(ring, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const show = () => root.classList.add("custom-cursor-visible");
    const hide = () => root.classList.remove("custom-cursor-visible");

    const onMove = (e: PointerEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setRingX(e.clientX);
      setRingY(e.clientY);
      show();
    };

    const onOver = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR)) {
        root.classList.add("custom-cursor-hover");
      }
    };
    const onOut = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR)) {
        root.classList.remove("custom-cursor-hover");
      }
    };
    const onDown = () => root.classList.add("custom-cursor-down");
    const onUp = () => root.classList.remove("custom-cursor-down");

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", hide);

    return () => {
      root.classList.remove(
        "custom-cursor-active",
        "custom-cursor-visible",
        "custom-cursor-hover",
        "custom-cursor-down",
      );
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      <div ref={dotWrap} className="cursor-dot-wrap">
        <span className="cursor-dot-shape" />
      </div>
      <div ref={ringWrap} className="cursor-ring-wrap">
        <span className="cursor-ring-shape" />
      </div>
    </>
  );
}
