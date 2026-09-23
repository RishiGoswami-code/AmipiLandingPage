"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

/**
 * Always-on fixed booking card — sits at the bottom-right corner of the
 * viewport and persists no matter where the user has scrolled. Fades in
 * on mount via CSS animation so it feels intentional rather than abrupt.
 * At rest it's just the calendar icon; hovering (or keyboard focus) slides
 * the label and arrow out to the left into the full "Book an Appointment"
 * bar. Being pinned to the right edge, the extra width grows leftward.
 */
export function BookingCardFixed() {
  return (
    <Link
      href="/contact"
      aria-label="Book an appointment for private diamond viewing"
      className="appt-card-fixed group pointer-events-auto fixed right-4 bottom-4 z-50 flex items-center rounded-2xl border border-border bg-surface/90 p-2.5 opacity-0 shadow-[0_20px_50px_-12px_rgba(18,25,38,0.25)] backdrop-blur-md transition-all duration-300 hover:border-gold-300/60 hover:bg-surface hover:shadow-[0_20px_50px_-8px_rgba(212,175,55,0.35)] sm:right-8 sm:bottom-8"
      style={{
        // Fallback: fade in via CSS animation in case GSAP hasn't loaded yet
        animation: "apptCardIn 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards",
      }}
    >
      {/* Golden calendar icon container */}
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/50 text-navy-950 shadow-[0_2px_14px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.6)]"
        style={{
          background:
            "linear-gradient(135deg, #dfbf7b 0%, #fff8e7 35%, #ffffff 50%, #d4ae5c 70%, #b68a38 100%)",
        }}
      >
        <Calendar className="h-5 w-5" />
      </span>

      {/* Label + arrow - collapsed to zero width until hover/focus */}
      <span className="flex max-w-0 items-center gap-4 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,padding] duration-500 ease-out group-hover:max-w-[18rem] group-hover:pr-1.5 group-hover:pl-4 group-hover:opacity-100 group-focus-visible:max-w-[18rem] group-focus-visible:pr-1.5 group-focus-visible:pl-4 group-focus-visible:opacity-100">
        <span>
          <span className="block text-sm font-bold tracking-wide text-foreground">
            Book an Appointment
          </span>
          <span className="mt-0.5 block text-xs text-foreground/60">
            Private viewings, by request
          </span>
        </span>

        <ArrowRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#dfbf7b]" />
      </span>
    </Link>
  );
}
