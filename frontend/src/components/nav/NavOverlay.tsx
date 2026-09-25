"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import {
  CONTACT,
  NAV_ITEMS,
  isUnbuilt,
  type NavChild,
  type NavItem,
} from "@/components/nav/navigation";

/**
 * The full-screen menu below lg.
 *
 * Always mounted rather than conditionally rendered: a CSS transition cannot run
 * on an element that appears already in its final state, so mounting on open
 * would make the fade and the stagger no-ops. Visibility is toggled instead,
 * which also keeps it out of the accessibility tree and out of the tab order
 * while closed.
 *
 * It scrolls, which it did not have to when this was four flat links. Five
 * groups with an expanded nine-item grid is taller than a phone, so the content
 * is top-aligned and the panel scrolls rather than being centred and clipped.
 * That brings in `data-lenis-prevent`: Lenis binds to the window, and without it
 * a swipe here would scroll the page behind the menu instead.
 */
export function NavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  /* Which group is expanded, at most one. Cleared when the menu closes so
     reopening it starts from the five collapsed labels rather than wherever it
     was left.

     Adjusted during render rather than in an effect, which React discards before
     committing - an effect here would collapse the group one painted frame into
     the closing transition, which is visible. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setExpanded(null);
  }

  return (
    <div
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className={`fixed inset-0 transition-[opacity,visibility] duration-500 ease-out motion-reduce:transition-none lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[#0e0b0a]/95 backdrop-blur-xl" />

      {/* The scroll region starts below the bar rather than at the top of the
          screen, so nothing slides under the close button and the logo - both
          sit on the transparent bar with no surface of their own to hide behind,
          and a thumbnail passing beneath them looked like a rendering fault.
          Matching the bar's own h-16/sm:h-20. */}
      <div
        data-lenis-prevent
        className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto sm:top-20"
      >
        <nav
          className="flex min-h-full flex-col px-edge pt-8 pb-12"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.label}
              /* Stagger is an inline delay rather than a keyframe so the order is
               derived from the list itself - add a sixth item and it joins the
               sequence with no other edit. Delays collapse to zero on close so
               dismissing the menu feels immediate. */
              style={{
                transitionDelay: open ? `${120 + index * 60}ms` : "0ms",
              }}
              className={`border-b border-white/10 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {item.menu ? (
                <AccordionGroup
                  item={item}
                  expanded={expanded === item.label}
                  onToggle={() =>
                    setExpanded(expanded === item.label ? null : item.label)
                  }
                  onNavigate={onClose}
                />
              ) : (
                <OverlayLink
                  href={item.href}
                  onNavigate={onClose}
                  className="block w-full py-4 text-left text-[clamp(1.25rem,5.5vw,1.75rem)] font-light tracking-[0.12em] text-ice-100/90 uppercase transition-colors hover:text-gold-100"
                >
                  {item.label}
                </OverlayLink>
              )}
            </div>
          ))}

          <div
            style={{
              transitionDelay: open
                ? `${120 + NAV_ITEMS.length * 60}ms`
                : "0ms",
            }}
            className={`mt-10 flex flex-col items-start gap-5 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <a
              href={CONTACT.phone.href}
              onClick={onClose}
              className="text-[11px] font-medium tracking-[0.2em] text-ice-100/60 uppercase transition-colors hover:text-ice-100"
            >
              {CONTACT.phone.label}
            </a>
            <PillButton
              href="/login"
              variant="gold"
              size="sm"
              icon="dot"
              onClick={onClose}
            >
              Login
            </PillButton>
          </div>
        </nav>
      </div>
    </div>
  );
}

/**
 * One collapsible group.
 *
 * Growth is `grid-template-rows: 0fr -> 1fr`, the same technique PillButton's
 * hover reveal and the card CTAs use, so the motion reads as part of one system
 * rather than a new trick. It is also the only way to animate to a content-driven
 * height without measuring it in JavaScript.
 */
function AccordionGroup({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: Extract<NavItem, { menu: object }>;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const id = `overlay-panel-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[clamp(1.25rem,5.5vw,1.75rem)] font-light tracking-[0.12em] text-ice-100/90 uppercase transition-colors hover:text-gold-100"
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            {item.menu.kind === "mega" ? (
              <div className="space-y-6">
                {item.menu.groups.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-500/70 uppercase">
                      {group.heading}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                      {group.children.map((child) => (
                        <OverlayThumbnail
                          key={child.label}
                          child={child}
                          onNavigate={onNavigate}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : item.menu.kind === "contact" ? (
              <OverlayContact onNavigate={onNavigate} />
            ) : (
              <ul>
                {item.menu.children.map((child) => (
                  <li key={child.label}>
                    <OverlayLink
                      href={child.href}
                      onNavigate={onNavigate}
                      className="block py-2 text-base text-ice-100/70 transition-colors hover:text-ice-100"
                    >
                      {child.label}
                    </OverlayLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function OverlayThumbnail({
  child,
  onNavigate,
}: {
  child: NavChild;
  onNavigate: () => void;
}) {
  return (
    <OverlayLink
      href={child.href}
      onNavigate={onNavigate}
      className="flex items-center gap-3"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-white/95">
        {child.image ? (
          <Image
            src={child.image}
            alt={child.alt ?? ""}
            width={48}
            height={48}
            className="h-10 w-10 object-contain"
          />
        ) : null}
      </span>
      <span className="text-sm leading-snug text-ice-100/80">
        {child.label}
      </span>
    </OverlayLink>
  );
}

function OverlayContact({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <a
        href={CONTACT.phone.href}
        onClick={onNavigate}
        className="flex items-center gap-3 py-2 text-base text-ice-100/70 transition-colors hover:text-ice-100"
      >
        <Phone aria-hidden className="h-4 w-4 shrink-0 text-gold-500" />
        {CONTACT.phone.label}
      </a>
      <a
        href={CONTACT.email.href}
        onClick={onNavigate}
        className="flex items-center gap-3 py-2 text-base text-ice-100/70 transition-colors hover:text-ice-100"
      >
        <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold-500" />
        {CONTACT.email.label}
      </a>
      <div className="mt-3 flex items-center gap-3">
        {CONTACT.socials.map(({ label, href, Icon }) => (
          <OverlayLink
            key={label}
            href={href}
            onNavigate={onNavigate}
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-ice-100 transition-colors hover:bg-white/20"
          >
            <Icon className="h-4 w-4" />
          </OverlayLink>
        ))}
      </div>
    </div>
  );
}

/** The overlay's equivalent of NavMenu's InertAwareLink, with the added job of
 *  dismissing the menu. See the note there on why UNBUILT suppresses the click
 *  rather than letting href="#" jump the page. */
function OverlayLink({
  href,
  onNavigate,
  className,
  children,
  ...rest
}: {
  href: string;
  onNavigate: () => void;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (isUnbuilt(href)) {
    return (
      <a
        href={href}
        onClick={(event) => event.preventDefault()}
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={className} {...rest}>
      {children}
    </Link>
  );
}
