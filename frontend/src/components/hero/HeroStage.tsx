"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(useGSAP);

export default function HeroStage() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Opening flourish only - a staggered reveal that plays once on mount.
    // Two real, stacked labels rolling past each other is already this
    // site's signature move (see PillButton's hover swap); the headline
    // reuses that same clipped-roll language instead of a generic fade.
    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .from(".hero-kicker", { opacity: 0, y: 16, duration: 0.7 }, 0.1)
      .from(
        ".hero-line-inner",
        { yPercent: 115, duration: 0.9, stagger: 0.12 },
        0.25,
      )
      .from(".hero-divider", { scaleX: 0, duration: 0.6 }, 0.75)
      .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6 }, 0.95)
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
  });

  return (
    <section className="relative h-svh w-full overflow-hidden bg-navy-950">
      <HeroPhoto />

      {/* Grade: lift the shadows toward the brand navy, for text legibility
          over the photo - independent of the page's own light theme. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-navy-950/45" />

      {/* Left-aligned into the open third of the frame the photo's crop
          (see HeroPhoto below) deliberately clears to the model's left. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-20">
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
          <div className="hero-cta pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
            <PillButton href="/collections" variant="solid" icon="dot">
              Start Your Diamond Search
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A static, art-directed crop pair - no scroll-driven pan or zoom. Anchored
 * at 27% from the left on both breakpoints, which keeps the model in the
 * right two-thirds of the frame and clears the left third for the copy
 * above; re-measure this anchor if the photograph is ever swapped.
 */
function HeroPhoto() {
  return (
    <>
      <Image
        src="/hero/rooftop-wide.jpg"
        alt="Model wearing a diamond tennis necklace and bracelet on a Manhattan rooftop at sunset"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hidden object-cover [object-position:27%_center] sm:block"
      />
      <Image
        src="/hero/rooftop-portrait.jpg"
        alt=""
        aria-hidden
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover [object-position:27%_center] sm:hidden"
      />
    </>
  );
}
