"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Tab =
  | { label: string; href: string; items?: undefined }
  | { label: string; href?: undefined; items: { label: string; href: string }[] };

/**
 * The masthead's tabs, the same four as amipi.com's own navbar and linking
 * to amipi.com: Diamonds and Fine Jewelry are pages there, About and More
 * are menus of the same items as amipi.com's (checked against its navbar on
 * 17 November 2026).
 */
const TABS: Tab[] = [
  { label: "Diamonds", href: "https://www.amipi.com/diamonds/" },
  { label: "Fine Jewelry", href: "https://www.amipi.com/basics/" },
  {
    label: "About",
    items: [
      { label: "Why Amipi?", href: "https://www.amipi.com/about-us/" },
      { label: "Amipi Cares", href: "https://www.amipi.com/amipi-cares/" },
      { label: "Testimonials", href: "https://www.amipi.com/testimonials/" },
      { label: "Contact Us", href: "https://www.amipi.com/contact-us/" },
    ],
  },
  {
    label: "More",
    items: [
      { label: "Registration", href: "https://www.amipi.com/register/" },
      { label: "Make a Payment", href: "https://www.amipi.com/pay/" },
      { label: "Remote Assistance", href: "https://www.amipi.com/remote/" },
      { label: "Schedule Appointment", href: "https://www.amipi.com/schedule-appointment/" },
    ],
  },
];

/** A tab's label: small tracked ivory capitals, underlined in champagne on
 * hover, as the section tabs were. */
const TAB =
  "flex items-center gap-1 text-[11px] font-bold tracking-[0.16em] whitespace-nowrap text-[#f5efe4]/75 uppercase underline-offset-[6px] decoration-[#d9b877] transition-colors hover:text-white hover:underline";

/**
 * A tab that opens a small menu under it: on hover with a mouse, and on
 * click or tap (which also works with Enter or Space). Escape closes it and
 * hands focus back to the tab; so does moving focus or the pointer away.
 */
function MenuTab({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = `masthead-menu-${label.toLowerCase()}`;

  // A tap outside closes it (a touch screen has no mouseleave)
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="relative"
      // Hover opens it for a mouse only: on touch, the tap's click toggles it
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`${TAB} cursor-pointer`}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* pt bridges the gap to the panel, so the pointer can cross it */}
      <div id={menuId} hidden={!open} className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
        <ul className="min-w-52 rounded-[2px] bg-white py-2 text-[#141a17] shadow-[0_18px_40px_-12px_rgba(5,20,12,0.45)] ring-1 ring-black/5">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors hover:bg-[#f5efe4] hover:text-(--gift-green) focus-visible:bg-[#f5efe4] focus-visible:outline-none"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** The four amipi.com tabs, in the masthead's middle from 1024px. */
export function GiftGuideMastheadNav() {
  return (
    <nav aria-label="AMIPI" className="hidden lg:block">
      <ul className="flex items-center gap-[clamp(1.25rem,2.2vw,2.5rem)]">
        {TABS.map((tab) =>
          tab.items ? (
            <MenuTab key={tab.label} label={tab.label} items={tab.items} />
          ) : (
            <li key={tab.label}>
              <a href={tab.href} className={TAB}>
                {tab.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
