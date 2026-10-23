import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "gold" | "light" | "dark";

/* The site's PillButton colours and small size, with a hover that changes
   the colour outright rather than deepening it a shade, since the colour
   change is the whole hover signal. Champagne lightens to ivory, white warms
   to champagne, navy turns antique gold. */
const VARIANT_CLASSES: Record<Variant, string> = {
  gold: "bg-[#dfbf7b] text-navy-950 hover:bg-[#f5efe4]",
  light:
    "bg-white text-navy-950 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)] hover:bg-[#dfbf7b]",
  dark: "bg-navy-900 text-ice-100 hover:bg-[#8a6630] hover:text-white",
};

/**
 * The gift guide's call-to-action pill: the same shape, type and arrow as the
 * site's PillButton at `size="sm"`, but the label stays still on hover - the
 * button's colour answers it instead of the label rolling over to a copy of
 * itself. Kept to the gift guide so the rest of the site's buttons are left
 * as they are.
 */
export function GiftGuideButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: Variant;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-[background-color,box-shadow,color] duration-300 ${VARIANT_CLASSES[variant]}`}
    >
      <span className="block leading-none">{children}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
