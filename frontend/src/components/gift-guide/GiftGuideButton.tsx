import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** The one call-to-action look: a squared red button with a white label,
 * after the team's mockups. The red is the page's --gift-cta (set once in
 * app/gift-guide/page.tsx, with its hover shade --gift-cta-hover), so
 * changing it is a one-line change. */
export const CTA_CLASSES =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[2px] bg-(--gift-cta) font-semibold tracking-[0.14em] text-white uppercase transition-colors duration-300 hover:bg-(--gift-cta-hover)";

/**
 * amipi.com's Fine Jewelry page, for the page's "Shop Now" buttons that lead
 * there: under Top Holiday Trends, under the Bezel and Color row (for
 * Bezel and Color) and under "Your Holiday Season, Made Easier".
 * It is the link the manager sent, and also what amipi.com itself opens
 * /basics/ on: its default filters (metal 10, natural "Earth" diamonds).
 * Set it to null to hide those buttons.
 */
export const FINE_JEWELRY_HREF: string | null =
  "https://www.amipi.com/basics/?category=&stonetype=&metal=10&origin=Earth";

/** The same Fine Jewelry page, filtered to natural or to lab-grown diamond
 * jewelry: amipi.com's `origin` filter takes Earth or Lab (anything else
 * falls back to Earth). */
export const NATURAL_JEWELRY_HREF =
  "https://www.amipi.com/basics/?category=&stonetype=&metal=10&origin=Earth";
export const LAB_GROWN_JEWELRY_HREF =
  "https://www.amipi.com/basics/?category=&stonetype=&metal=10&origin=Lab";

/** The rings page on amipi.com (its default filters), for Bridal. */
export const RINGS_HREF =
  "https://www.amipi.com/rings/?category=&stonetype=&metal=10&origin=Earth";

/** `md` for the sections' buttons, `sm` for the compact ones under a
 * product or category, `lg` for a button that stands on its own between
 * sections. */
const SIZES = {
  lg: "h-14 px-10 text-[12.5px] gap-2.5 sm:h-[3.75rem] sm:px-14 sm:text-[13px]",
  md: "h-11 px-6 text-[11px]",
  sm: "h-8 px-4 text-[10px]",
};

/** `green`: the page's deep evergreen (--gift-green) in place of the red,
 * with a fine champagne inner rule a few px in, like a printed card's
 * border, and a soft lift on hover. */
const GREEN =
  "group relative inline-flex shrink-0 items-center justify-center rounded-[2px] bg-(--gift-green) font-semibold tracking-[0.2em] text-[#f5efe4] uppercase shadow-[0_10px_24px_-14px_rgba(15,59,42,0.9)] transition-[background-color,box-shadow,transform] duration-300 before:pointer-events-none before:absolute before:inset-[4px] before:rounded-[1px] before:border before:border-[#d9b877]/45 before:transition-colors hover:-translate-y-px hover:bg-[#0a2c1f] hover:shadow-[0_16px_30px_-14px_rgba(15,59,42,0.95)] hover:before:border-[#d9b877]/80 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--gift-green)";

/**
 * The gift guide's call to action. The label stays still on hover; the
 * button's colour answers it, a shade deeper. Kept to the gift guide, so the
 * rest of the site's buttons are left as they are.
 */
export function GiftGuideButton({
  href,
  size = "md",
  tone = "red",
  children,
}: {
  href: string;
  size?: keyof typeof SIZES;
  tone?: "red" | "green";
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${tone === "green" ? GREEN : `group ${CTA_CLASSES}`} ${SIZES[size]}`}
    >
      <span className="block leading-none">{children}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * The quiet call to action under a card or globe, as in the mockups: red
 * tracked capitals and an arrow, no button. The whole card around it is the
 * link (a `group`), so this is drawn, not nested: hovering anywhere on the
 * card underlines it and nudges the arrow on.
 */
export function GiftGuideTextLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] leading-none font-semibold tracking-[0.2em] text-(--gift-cta) uppercase underline-offset-4 transition-colors group-hover:text-(--gift-cta-hover) group-hover:underline">
      {children}
      <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </span>
  );
}
