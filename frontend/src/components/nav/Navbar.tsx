"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PillButton } from "@/components/ui/PillButton";
import { italiana } from "@/styles/fonts";

const LINKS = [
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Our Philosophy", href: "/philosophy" },
  { label: "Sell Your Diamonds", href: "/sell-your-diamonds" },
  { label: "Visit Us", href: "/contact" },
];

const PHONE = "(800) 530-2647";

/** Horizontal breathing room between the viewport edge and the outermost
 *  elements. Deliberately a viewport fraction rather than a fixed inset, so the
 *  logo and the login button stay proportionally placed from 1024px to
 *  ultrawide instead of drifting toward the centre. The max() floor only
 *  engages below ~364px, where 5.5vw would start to crowd the logo. */
const EDGE_GUTTER = "max(1.25rem,5.5vw)";

/**
 * Full-width transparent navbar: logo hard left, links centred on the viewport,
 * login hard right, and a full-screen overlay menu below 1024px.
 *
 * It carries no surface of its own, so it has nothing to sit on and must borrow
 * contrast from whatever is beneath it. On the home route that is the hero
 * photograph, which is warm espresso, so the nav paints light. Every other route
 * renders on `--color-background` (#f5f7fb), where light-on-light would be
 * invisible, so the nav paints dark there instead. One boolean, because there is
 * exactly one dark route.
 *
 * The centre nav is absolutely positioned rather than being the middle cell of a
 * three-column grid: equal thirds would force the five links to fit inside a
 * third of the viewport, which they do not at 1024px. Absolute centring makes
 * them true-centre on screen at any width and lets the block be wider than the
 * side clusters.
 *
 * The mark is assembled here from the roundel plus live text rather than using
 * the composite amipi-logo.png. That asset's wordmark is navy and its tagline
 * crimson, both drawn for light print, and over dark photography the wordmark
 * simply disappears. CSS cannot recolour it either: filtering the roundel light
 * enough to read collapses its internal artwork into a solid disc. Live text
 * sidesteps all of it, stays crisp at any density, and lets the wordmark pick up
 * the same letterspaced treatment as the hero lockup. The composite logo still
 * ships in the footer, where it sits on a light surface as intended.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* The bar is fixed (see the header below) and stays fully transparent - no
     surface of its own, even once scrolled - so the home route's
     light-on-hero styling can only drop once the hero photo has actually
     scrolled out from under it. Doing this on a small scroll-position
     threshold instead (as most sticky navs do) would flip the text to navy
     the instant the page moves at all, while still deep in the dark hero -
     illegible with no surface behind it. Tracked against the hero section
     itself rather than a hardcoded scroll distance, since the hero's height
     is 190svh and varies with viewport height. */
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".hero-stage");
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* The hero is the only dark canvas in the app; everywhere else is the light
     theme. If a second dark route ever appears this wants to become a list. */
  const onDark = usePathname() === "/" && !scrolled;

  /* The overlay is espresso on every route, so once it is open the button has to
     read against the overlay rather than against the page underneath it. */
  const lightChrome = onDark || open;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Letterspaced uppercase at 11px, which is the same typographic vocabulary as
     the hero's "ESTABLISHED 1976" band. Sentence-case 13px semibold read as
     generic application chrome against cinematic photography. */
  const linkClasses = [
    "group/link relative text-[11px] font-medium tracking-[0.14em] uppercase transition-colors",
    onDark
      ? "text-ice-100/70 hover:text-ice-100"
      : "text-navy-700/80 hover:text-navy-900",
  ].join(" ");

  /* Per-link hairline, wiped in from the left. This replaces a single gradient
     line that used to span the whole bar and carried a white glow — drawn back
     when the nav was a contained white pill, but on a transparent full-width bar
     it read as a light leak across the hero. */
  const underlineClasses = [
    "pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0",
    "transition-transform duration-300 ease-out group-hover/link:scale-x-100",
    onDark ? "bg-gold-500/70" : "bg-crimson-500/60",
  ].join(" ");

  const barColour = lightChrome ? "bg-ice-100" : "bg-navy-900";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Rendered before the bar so the bar's own stacking wins and the close
          button stays clickable while the menu is open.

          Always mounted rather than conditionally rendered: a CSS transition
          cannot run on an element that appears already in its final state, so
          mounting on open would make the fade and the stagger no-ops. Visibility
          is toggled instead, which also keeps it out of the accessibility tree
          and out of the tab order while closed. */}
      <div
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed inset-0 transition-[opacity,visibility] duration-500 ease-out lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#0e0b0a]/95 backdrop-blur-xl" />

        <nav
          className="relative flex h-full flex-col justify-center"
          style={{ paddingInline: EDGE_GUTTER }}
          aria-label="Primary"
        >
          {LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              /* Stagger is an inline delay rather than a keyframe so the order
                 is derived from the list itself — add a sixth link and it joins
                 the sequence with no other edit. Delays collapse to zero on
                 close so dismissing the menu feels immediate. */
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
              className={`py-3 text-[clamp(1.5rem,6.5vw,2.25rem)] font-light tracking-[0.12em] text-ice-100/90 uppercase transition-[opacity,transform] duration-500 ease-out hover:text-gold-100 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div
            style={{
              transitionDelay: open ? `${120 + LINKS.length * 60}ms` : "0ms",
            }}
            className={`mt-8 flex flex-col items-start gap-5 transition-[opacity,transform] duration-500 ease-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <a
              href={`tel:+1${PHONE.replace(/\D/g, "")}`}
              onClick={() => setOpen(false)}
              className="text-[11px] font-medium tracking-[0.2em] text-ice-100/60 uppercase transition-colors hover:text-ice-100"
            >
              {PHONE}
            </a>
            <PillButton
              href="/login"
              variant="gold"
              size="sm"
              icon="dot"
              onClick={() => setOpen(false)}
            >
              Login
            </PillButton>
          </div>
        </nav>
      </div>

      <div
        className="relative z-10 flex h-16 items-center justify-between sm:h-20"
        style={{ paddingInline: EDGE_GUTTER }}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3"
          onClick={() => setOpen(false)}
        >
          {/* Decorative: the adjacent text is the link's accessible name.
              Held below full opacity on the dark route so the roundel's
              saturated yellow and red sit back into the espresso photograph
              instead of punching a hole in it. On the light routes it keeps full
              strength, where that brightness is an asset rather than a problem. */}
          <Image
            src="/icon.png"
            alt=""
            aria-hidden
            width={512}
            height={512}
            priority
            className={`h-8 w-8 sm:h-9 sm:w-9 ${
              lightChrome ? "opacity-75" : ""
            }`}
          />
          {/* Italiana, with no weight class. The face ships only at 400, so a
              bold utility here would have the browser synthesise one and thicken
              the hairlines that are the reason for choosing it.

              Tracking is light at 0.06em. Wide letterspacing suits the small caps
              elsewhere in the chrome, but this is a wordmark rather than a label:
              it has to read as one object, and Italiana's caps already carry
              generous sidebearings of their own, so added space pulls the five
              letters apart instead of setting them off. Just enough to stop caps
              designed for mixed-case fitting from looking tight. */}
          <span
            className={`${italiana.className} text-xl tracking-[0.06em] uppercase sm:text-2xl ${
              lightChrome ? "text-gold-100/85" : "text-navy-900"
            }`}
          >
            Amipi
          </span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7"
          aria-label="Primary"
        >
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
              <span aria-hidden className={underlineClasses} />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {/* Letterspacing widens the centred link row by roughly 80px, which
              overflows at 1024px. Holding the phone number back to xl frees the
              ~140px that closes the gap, so laptops keep the links from 1024px
              instead of dropping to a hamburger. */}
          <a
            href={`tel:+1${PHONE.replace(/\D/g, "")}`}
            className={`${linkClasses} hidden xl:block`}
          >
            {PHONE}
            <span aria-hidden className={underlineClasses} />
          </a>
          {/* Brand gold rather than navy. Navy-on-espresso was a dark shape on a
              dark photograph whose edge dissolved into it, needing a hairline to
              stay visible at all; gold separates on value alone and ties the
              button to the accent already used by the kicker and the lockup. */}
          <PillButton href="/login" variant="gold" size="sm" icon="dot">
            Login
          </PillButton>
        </div>

        {/* Two rules rather than three. A third bar adds nothing at this scale
            and the pair reads quieter, which suits the rest of the chrome. The
            lower rule is short when closed and grows to full width as it rotates,
            so the gesture resolves into a symmetrical cross instead of a stack
            that merely tilts. Both rules animate `top` and `rotate` only, so the
            morph composites rather than triggering layout. */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-overlay"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-full origin-center transition-all duration-300 ease-out ${barColour} ${
                open ? "top-1/2 rotate-45" : "top-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px origin-center transition-all duration-300 ease-out ${barColour} ${
                open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3 rotate-0"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
