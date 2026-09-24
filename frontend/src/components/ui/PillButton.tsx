import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "dark" | "gold" | "jewel" | "outline" | "light";
type Size = "sm" | "md" | "hero";
type Icon = "arrow" | "dot" | "gem" | "none";

type PillButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  icon?: Icon;
  className?: string;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  solid:
    "gold-shimmer-gradient border border-white/40 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_30px_-2px_rgba(212,175,55,0.6)]",
  dark: "bg-navy-900 text-ice-100",
  /* Champagne rather than the brand gold-500 (#fed700). Flat, with no gradient,
     border or glow, so it holds its shape against photography instead of
     dissolving into it, and it needs no hairline to separate from a dark
     backdrop because the value jump does that on its own.

     #dfbf7b is not an arbitrary pick: it is the opening stop of the existing
     gold-shimmer-gradient in globals.css, so it is already part of the palette.
     Brand gold at full saturation reads as neon against warm espresso
     photography; the same hue muted to champagne reads as metal. Hover deepens
     to #d4ae5c, another stop from that same gradient. */
  gold: "bg-[#dfbf7b] text-navy-950 hover:bg-[#d4ae5c]",
  /* The hero's primary CTA, and the only variant drawn for photography rather
     than for a flat panel.

     It reuses `gold-shimmer-gradient` from globals.css — the real metallic ramp
     (#b8863a through #eccf85 and back down to #a8762f, no white stops) on a
     200%-wide background that slides on hover, so the highlight travels across
     the face like light across polished gold. `solid` uses that same ramp and
     was still rejected for the hero, but the gradient was never the problem: it
     was the `border-white/40` hairline and the gold `box-shadow` glow stacked on
     top of it, which together read as backlit plastic.

     So the ramp stays and those two go. In their place:

       - a warm near-black drop shadow, which grounds the button on the
         photograph instead of haloing it off the surface, and
       - a 1px inset highlight on the top edge only. That is a bevel, not a
         border: it catches light along one edge the way a milled metal surface
         does, where a full outline just draws a rectangle around the thing.

     Hover deepens the same shadow rather than swapping it, so there is nothing
     for the transition to jump between. No text colour either — the utility
     ships its own near-navy ink, and setting one here would be two declarations
     racing on stylesheet order. That race is settled in the utility's favour
     generally: it is a plain class in globals.css, so it sits unlayered and
     outranks anything Tailwind emits into `@layer utilities` — which is also why
     its own `transition` (background-position, box-shadow, transform) is the one
     in force here, not the base `transition-[...]` below. */
  jewel:
    "gold-shimmer-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_34px_-14px_rgba(14,11,10,0.9)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_40px_-14px_rgba(14,11,10,0.95)]",
  outline: "border-2 border-foreground/40 text-foreground hover:border-foreground/60",
  light: "bg-white text-navy-950 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)] hover:bg-ice-100",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-10 px-5 text-[11px] gap-1.5",
  md: "h-12 px-7 text-xs gap-2 sm:h-14",
  /* The primary-CTA size: fluid rather than stepped, because it is the one
     button whose label is long enough to run out of room.

     "Start Your Diamond Search" is 25 characters of letterspaced caps. At the
     `md` size that is a ~300px pill, which fits a 360px phone with 35px to
     spare and clips on a 320px one — and stepping it at `sm:` would fix the
     small end by jolting the size at a single width rather than easing it.

     Every axis therefore scales with the viewport and clamps at both ends. The
     floors are what keep it legible and tappable on a 320px screen: 11px caps
     in a 44px-high pill. The ceilings are the `md` geometry it used to have, so
     nothing changes from ~620px upward. Height leads and the padding follows a
     shallower curve, since padding that shrank as fast as the box would crowd
     the label against the edge. */
  hero:
    "h-[clamp(2.75rem,9vw,3.5rem)] px-[clamp(1.25rem,4.5vw,2.25rem)] text-[clamp(0.6875rem,2.2vw,0.75rem)] gap-2",
};

/**
 * Pill CTA reproducing the kora.framer.media hover effect: the label lives
 * in a clipped window with a duplicate of itself parked just below. On hover
 * the original rolls up and out while the duplicate rolls in to replace it -
 * a "flip up" swap rather than a colour or scale change. Two real text
 * nodes, not a background image, so it stays crisp at any zoom and screen
 * readers still see one label, not two.
 *
 * The reference adds a slight rotation to that roll. Left in here, a fixed
 * rotation angle overshoots the clip on a wide button: rotating a short,
 * wide bar around its centre swings the far ends up by roughly
 * half-width * sin(angle), which on a 200px-plus label is more than enough
 * to poke the "hidden" copy back above the clip line - exactly the smeared
 * double-text this button used to render. A straight vertical roll has no
 * such failure mode at any label width, so that is what ships.
 */
export function PillButton({
  href,
  onClick,
  type = "button",
  variant = "solid",
  size = "md",
  icon = "none",
  className = "",
  children,
}: PillButtonProps) {
  const classes = [
    "group relative inline-flex shrink-0 items-center justify-center rounded-full",
    "font-semibold tracking-[0.14em] uppercase transition-[background-color,border-color,box-shadow] duration-300",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(" ");

  const content = (
    <>
      <span className="relative block overflow-hidden leading-none">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon === "arrow" && (
        <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
      {/* Lucide's `Gem` rather than its `Diamond`, which is a plain rhombus —
          `Gem` is drawn as a brilliant cut seen from above, with a table and
          crown facets, so it matches the shape row in DiamondSearch and actually
          reads as a stone rather than as a card suit.

          The hover tilt is small on purpose. A gem shows its fire when it turns
          a few degrees under a light, not when it spins; 10deg with a slight
          scale is enough to catch the eye while the label rolls. */}
      {icon === "gem" && (
        <Gem
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[10deg] group-hover:scale-110"
          strokeWidth={1.75}
        />
      )}
      {icon === "dot" && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
