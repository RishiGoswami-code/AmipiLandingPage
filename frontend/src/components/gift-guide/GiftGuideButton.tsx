import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** The one call-to-action look: a squared red button with a white label,
 * after the team's mockups. The red is the page's --gift-cta (set once in
 * app/gift-guide/page.tsx, with its hover shade --gift-cta-hover), so
 * changing it is a one-line change. */
export const CTA_CLASSES =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[2px] bg-(--gift-cta) font-semibold tracking-[0.14em] text-white uppercase transition-colors duration-300 hover:bg-(--gift-cta-hover)";

/** `md` for the sections' buttons, `sm` for the compact ones under a
 * product or category. */
const SIZES = {
  md: "h-11 px-6 text-[11px]",
  sm: "h-8 px-4 text-[10px]",
};

/**
 * The gift guide's call to action. The label stays still on hover; the
 * button's colour answers it, a shade deeper. Kept to the gift guide, so the
 * rest of the site's buttons are left as they are.
 */
export function GiftGuideButton({
  href,
  size = "md",
  children,
}: {
  href: string;
  size?: keyof typeof SIZES;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`group ${CTA_CLASSES} ${SIZES[size]}`}>
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
