import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "dark" | "outline";
type Size = "sm" | "md";
type Icon = "arrow" | "dot" | "none";

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
  outline: "border-2 border-foreground/40 text-foreground hover:border-foreground/60",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-10 px-5 text-[11px] gap-1.5",
  md: "h-12 px-7 text-xs gap-2 sm:h-14",
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
