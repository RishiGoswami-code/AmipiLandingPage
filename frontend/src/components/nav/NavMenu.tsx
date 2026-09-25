"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Phone } from "lucide-react";
import {
  CONTACT,
  NAV_ITEMS,
  isUnbuilt,
  type NavChild,
  type NavItem,
} from "@/components/nav/navigation";

/** Stable element ids, so a trigger's aria-controls can name its panel. */
const panelId = (label: string) =>
  `nav-panel-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/**
 * The desktop link row and its dropdown panels, for lg and up.
 *
 * Structure, which is load-bearing rather than incidental:
 *
 * The whole thing is a full-width layer (`absolute inset-0`) laid over the bar,
 * with the link row centred inside it at `w-max`. That is what lets the
 * Fine Jewelry panel span the viewport - it positions against this layer, so
 * `inset-x-0` is exactly the viewport's width. The obvious alternative, a
 * `100vw` panel, is wrong on any desktop with a classic scrollbar: 100vw counts
 * the scrollbar gutter, so the panel would overhang by ~15px and put a
 * horizontal scrollbar on the page.
 *
 * It also keeps each panel a DOM child of the trigger that opens it, which is
 * what makes Tab work: the panel's links come immediately after their trigger in
 * source order, so tabbing off the trigger walks into the panel rather than
 * skipping to the next one. Hoisting the wide panel out to a sibling of the row
 * would have read the same on screen and been unreachable by keyboard.
 *
 * The layer is `pointer-events-none` with the row and panels re-enabling
 * pointers, so the logo and Login button underneath it stay clickable.
 *
 * Every item fills the bar's full height, which is how the panels sit flush
 * against the bar's bottom edge with no dead gap for the pointer to cross on its
 * way down - the usual reason a hover menu feels broken.
 */
export function NavMenu({
  linkClassName,
  underlineClassName,
}: {
  /** Built in Navbar and shared with the phone-number link, so the two cannot
   *  drift apart. It already carries the light/dark branching, which is why this
   *  component needs no notion of which route it is on - the panels are white
   *  everywhere, and only the triggers change colour. */
  linkClassName: string;
  underlineClassName: string;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement | null>());
  const pathname = usePathname();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  /* A close delay, not an open delay. Moving the pointer from a trigger into
     its panel is a diagonal, and for a few frames it can be over neither -
     closing instantly would make the panel impossible to reach. 120ms is long
     enough to cross and short enough not to feel stuck. */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenLabel(null), 120);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  /* Close on navigation. Inert today - every href is UNBUILT - but this is the
     one place that would silently break when they are wired up.

     Adjusted during render rather than in an effect. An effect would fire after
     the browser had already painted a frame of the new route with the old panel
     still open, and setState inside one costs a second render pass for no
     reason; React discards this pass before committing instead. */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenLabel(null);
  }

  useEffect(() => {
    if (!openLabel) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenLabel(null);
      /* Focus goes back to the trigger rather than being dropped on the body:
         Escape should leave a keyboard user where they were, not at the top of
         the document. */
      triggers.current.get(openLabel)?.focus();
    };

    /* pointerdown rather than click, so the panel is gone by the time a click
       lands somewhere else - and dismissing it does not eat that click. */
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest?.("[data-nav-menu]")) setOpenLabel(null);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openLabel]);

  /* Mouse only. A tap fires pointerenter too, so without this a touch user's tap
     would open the panel on enter and the click handler would immediately close
     it again. pointerType answers this exactly, where a hover media query only
     guesses at the device. */
  const onPointerEnter = (label: string) => (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    setOpenLabel(label);
  };

  const onPointerLeave = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    scheduleClose();
  };

  return (
    <div
      data-nav-menu
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <nav
        className="pointer-events-auto mx-auto flex h-full w-max items-center gap-3 xl:gap-7"
        aria-label="Primary"
      >
        {NAV_ITEMS.map((item) => {
          if (!item.menu) {
            return (
              <InertAwareLink
                key={item.label}
                href={item.href}
                className={linkClassName}
              >
                {item.label}
                <span aria-hidden className={underlineClassName} />
              </InertAwareLink>
            );
          }

          const open = openLabel === item.label;
          const id = panelId(item.label);

          return (
            <div
              key={item.label}
              /* Positioned only for the narrow panels, which anchor to their own
                 trigger. The wide one is deliberately left to position against
                 the full-width layer instead, which is the whole point of the
                 layer. */
              className={`flex h-full items-center ${
                item.menu.kind === "mega" ? "" : "relative"
              }`}
              onPointerEnter={onPointerEnter(item.label)}
              onPointerLeave={onPointerLeave}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget as Node)
                ) {
                  setOpenLabel(null);
                }
              }}
            >
              <button
                type="button"
                ref={(node) => {
                  triggers.current.set(item.label, node);
                }}
                /* A disclosure button, not role="menu"/"menuitem". That pattern
                   promises arrow-key navigation and takes its items out of the
                   normal tab order, which is wrong for what these actually are:
                   ordinary links that happen to be revealed. */
                aria-expanded={open}
                aria-controls={id}
                /* Click is the only deliberate open: it covers Enter and Space
                   through the button's own semantics, and a tap where there is
                   no hover to work with.

                   Explicitly *not* opening on focus, which is tempting and
                   wrong twice over. Clicking a button focuses it first, so
                   focus-to-open would set the panel open and the click that
                   followed would toggle it straight back shut - the panel would
                   never open by click or tap at all. And tabbing across the bar
                   would unfurl each panel in turn, forcing a keyboard user
                   through nineteen links to get past the navbar. The disclosure
                   pattern asks for Enter or Space here, which is what this is. */
                onClick={() => setOpenLabel(open ? null : item.label)}
                className={`${linkClassName} flex items-center gap-1`}
              >
                {item.label}
                <ChevronDown
                  aria-hidden
                  className={`h-3 w-3 transition-transform duration-300 motion-reduce:transition-none ${
                    open ? "rotate-180" : ""
                  }`}
                />
                <span aria-hidden className={underlineClassName} />
              </button>

              <Panel id={id} label={item.label} menu={item.menu} open={open} />
            </div>
          );
        })}
      </nav>
    </div>
  );
}

/**
 * A dropdown surface, in the one shape all three kinds share.
 *
 * Always mounted, visibility toggled - the same call the mobile overlay makes,
 * and for the same two reasons. A CSS transition cannot run on an element that
 * mounts already in its final state, and `aria-controls` has to name an element
 * that exists. `invisible` also takes the contents out of the tab order and the
 * accessibility tree while closed, which `opacity-0` alone would not.
 *
 * The cost is that the nine thumbnails load with the page rather than on first
 * hover. Measured, that is seven requests and about 4KB in total: next/image
 * serves a 112px variant for a 56px tile, not the 256px files in /public. Worth
 * paying to make the first open instant.
 *
 * White on every route, including the dark one. The bar itself is transparent
 * and borrows its contrast from whatever is beneath it, but a panel is a surface
 * in its own right - branching it on route would mean a translucent dark panel
 * over the hero photograph, which is exactly the unreadable case the white one
 * avoids.
 */
function Panel({
  id,
  label,
  menu,
  open,
}: {
  id: string;
  label: string;
  menu: NonNullable<NavItem["menu"]>;
  open: boolean;
}) {
  const surface =
    "pointer-events-auto bg-white shadow-[0_28px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-navy-100 transition-[opacity,visibility,transform] duration-300 ease-out motion-reduce:transition-none";

  const state = open
    ? "visible translate-y-0 opacity-100"
    : "invisible -translate-y-1 opacity-0";

  if (menu.kind === "mega") {
    return (
      <div
        id={id}
        role="group"
        aria-label={label}
        /* inset-x-0 against the full-width layer, so this is viewport-wide
           without the scrollbar arithmetic 100vw would have needed. */
        className={`absolute inset-x-0 top-full rounded-b-3xl ${surface} ${state}`}
      >
        {/* Gutter-aligned rather than centred in a max-width box: px-edge is the
            same token the logo sits on, so the first column starts on the
            logo's left edge and the three columns spread across the full bar
            width. A max-w-6xl box centred instead put column one at an
            arbitrary offset and left the last third of a 1600px panel empty,
            which read as content dumped to the left rather than as a layout. */}
        <div className="grid grid-cols-3 gap-x-10 px-edge py-10">
          {menu.groups.map((group) => (
            <div key={group.heading}>
              {/* The same 11px letterspaced caps as the nav links and the search
                  card's field labels, rather than a new heading style for a
                  panel that is chrome. */}
              <p className="text-[11px] font-semibold tracking-[0.2em] text-navy-500 uppercase">
                {group.heading}
              </p>
              <ul className="mt-5 space-y-1">
                {group.children.map((child) => (
                  <li key={child.label}>
                    <ThumbnailRow child={child} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      role="group"
      aria-label={label}
      className={`absolute top-full left-1/2 w-max min-w-52 -translate-x-1/2 rounded-b-2xl ${surface} ${state}`}
    >
      {menu.kind === "contact" ? (
        <ContactPanel />
      ) : (
        <ListPanel items={menu.children} />
      )}
    </div>
  );
}

function ListPanel({ items }: { items: NavChild[] }) {
  return (
    <ul className="py-2">
      {items.map((child) => (
        <li key={child.label}>
          <InertAwareLink
            href={child.href}
            className="block px-5 py-2.5 text-sm text-navy-800 transition-colors hover:bg-navy-50 hover:text-navy-950"
          >
            {child.label}
          </InertAwareLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Phone, email, then the four social marks, in that order.
 *
 * The marks are a row of circular buttons rather than four more stacked rows:
 * a logo with no label beside it does not read as a list item, and four of them
 * one under another read as a broken list. Each carries an aria-label, so the
 * name is there for anyone not going by the glyph.
 *
 * Phone and email are the only live destinations in this navbar - tel: and
 * mailto: need no route to exist.
 */
function ContactPanel() {
  return (
    <div className="px-5 py-4">
      <a
        href={CONTACT.phone.href}
        className="flex items-center gap-2.5 py-1.5 text-sm text-navy-800 transition-colors hover:text-navy-950"
      >
        <Phone aria-hidden className="h-4 w-4 shrink-0 text-gold-600" />
        {CONTACT.phone.label}
      </a>
      <a
        href={CONTACT.email.href}
        className="flex items-center gap-2.5 py-1.5 text-sm text-navy-800 transition-colors hover:text-navy-950"
      >
        <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold-600" />
        {CONTACT.email.label}
      </a>

      <div className="mt-3 flex items-center gap-2 border-t border-navy-100 pt-3">
        {CONTACT.socials.map(({ label, href, Icon }) => (
          <InertAwareLink
            key={label}
            href={href}
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-navy-900 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </InertAwareLink>
        ))}
      </div>
    </div>
  );
}

/** One category: thumbnail on a white tile, label beside it. The tile exists
 *  because the seven source photographs came off three different studio
 *  grounds; they are normalised to white at build time, and sitting them on
 *  white keeps the odd one out from showing as a square. */
function ThumbnailRow({ child }: { child: NavChild }) {
  return (
    <InertAwareLink
      href={child.href}
      className="group/row flex items-center gap-4 rounded-xl px-2 py-2 transition-colors hover:bg-navy-50"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-navy-100">
        {child.image ? (
          <Image
            src={child.image}
            alt={child.alt ?? ""}
            width={56}
            height={56}
            className="h-12 w-12 object-contain transition-transform duration-500 ease-out group-hover/row:scale-105 motion-reduce:transition-none"
          />
        ) : null}
      </span>
      <span className="text-sm leading-snug font-semibold text-navy-800 transition-colors group-hover/row:text-navy-950">
        {child.label}
      </span>
    </InertAwareLink>
  );
}

/**
 * A link whose destination may not exist yet.
 *
 * Everything in this menu is UNBUILT for now, and a bare href="#" would jump to
 * the top of the page and push a history entry on every click - a dead link that
 * also breaks the back button. Suppressing the default leaves the anchor
 * focusable, hoverable and styled exactly as it will be once it points
 * somewhere, which is what this pass is for. Real hrefs get next/link and its
 * prefetching.
 */
function InertAwareLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
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
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
