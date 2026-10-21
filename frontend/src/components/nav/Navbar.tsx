"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PillButton } from "@/components/ui/PillButton";
import { CONTACT } from "@/components/nav/navigation";
import { NavMenu } from "@/components/nav/NavMenu";
import { NavOverlay } from "@/components/nav/NavOverlay";
import { italiana } from "@/styles/fonts";

/** Routes whose top section is a dark canvas. LINKS and the phone number used to
 *  sit here too; they are in navigation.ts now, which NavMenu and NavOverlay both
 *  read. */
const DARK_ROUTES = ["/", "/about"];

/**
 * Full-width transparent navbar: logo hard left, links centred on the viewport,
 * login hard right, and a full-screen overlay menu below 1024px.
 *
 * This file is the shell - the bar, the logo, the phone number, the Login button
 * and the hamburger. The link row and its dropdowns live in NavMenu, the mobile
 * menu in NavOverlay, and what either of them contains in navigation.ts. They
 * were split out when the four flat links became five items with nineteen
 * children between them: the open/close state machine, the desktop panels and
 * the mobile accordion are three separate concerns, and holding all of them here
 * put the file past 700 lines.
 *
 * It is fixed to the top of the viewport so it stays in reach on a long page.
 * At the top of a page it carries no surface of its own, so it has nothing to
 * sit on and must borrow contrast from whatever is beneath it. On the home route that is the hero
 * photograph, which is warm espresso, so the nav paints light - as it does on
 * the About page, which opens on the same espresso. Every other route renders on
 * `--color-background` (#f5f7fb), where light-on-light would be invisible, so
 * the nav paints dark there instead. Once the page scrolls, whatever is beneath
 * it is content rather than a hero, so the bar takes a frosted white surface and
 * paints dark on every route.
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

  /* Read once on mount too, so a reload partway down a page starts on the white
     bar instead of flashing the clear one over content. 20px is enough to tell
     a scroll from a stray trackpad nudge. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The surface becomes frosted cream when scrolled */
  const surfaced = scrolled && !open;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClasses = [
    "group/link relative text-[11px] font-medium tracking-[0.08em] uppercase transition-colors 2xl:tracking-[0.14em]",
    "text-[#2A251F]/85 hover:text-[#110E0C]",
  ].join(" ");

  const underlineClasses = [
    "pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0",
    "transition-transform duration-300 ease-out group-hover/link:scale-x-100",
    "bg-[#A68551]",
  ].join(" ");

  const barColour = open ? "bg-ice-100" : "bg-[#2A251F]";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Rendered before the bar so the bar's own stacking wins and the close
          button stays clickable while the menu is open. */}
      <NavOverlay open={open} onClose={() => setOpen(false)} />

      <div
        className={`nav-bar relative z-10 flex items-center justify-between px-edge transition-[background-color,box-shadow,height] duration-300 ease-out motion-reduce:transition-none ${
          surfaced
            ? "h-16 bg-[#F5E9DD]/95 shadow-[0_8px_24px_-16px_rgba(40,30,20,0.25)] backdrop-blur-md"
            : "h-16 sm:h-20 bg-[#F5E9DD]"
        }`}
      >
        <Link
          href="/"
          className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 sm:gap-3 lg:static lg:translate-x-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/icon.png"
            alt=""
            aria-hidden
            width={512}
            height={512}
            priority
            className={`h-9 w-9 sm:h-10 sm:w-10 transition-[width,height] duration-300 motion-reduce:transition-none ${
              surfaced ? "sm:h-9 sm:w-9" : "sm:h-10 sm:w-10"
            }`}
          />
          <span
            className={`${italiana.className} text-2xl tracking-[0.06em] uppercase sm:text-[1.75rem] xl:text-3xl text-[#2A251F]`}
          >
            Amipi
          </span>
          <span className="hidden h-4 w-px bg-[#D4B28C]/80 xl:block mx-1.5" aria-hidden />
          <span className="hidden text-[8px] font-medium tracking-[0.1em] text-[#A07F4E] uppercase xl:inline-block 2xl:text-[9.5px] 2xl:tracking-[0.14em] whitespace-nowrap">
            Celebrating 50 Years of Amipi
          </span>
        </Link>

        <NavMenu
          linkClassName={linkClasses}
          underlineClassName={underlineClasses}
        />

        <div className="relative z-10 ml-auto hidden items-center gap-2 lg:flex xl:gap-3">
          <span className="hidden h-5 w-px bg-[#D4B28C]/80 xl:block mr-1" aria-hidden />
          <ul className="flex items-center">
            {CONTACT.socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="grid h-10 w-7 place-items-center transition-colors xl:w-9 text-[#2A251F]/80 hover:text-[#110E0C]"
                >
                  <Icon className="h-5 w-5 xl:h-6 xl:w-6" />
                </a>
              </li>
            ))}
          </ul>
          <PillButton href="/login" variant="gold" size="sm" icon="dot">
            Login
          </PillButton>
        </div>

        {/* Two rules rather than three. A third bar adds nothing at this scale
            and the pair reads quieter, which suits the rest of the chrome. The
            lower rule is short when closed and grows to full width as it rotates,
            so the gesture resolves into a symmetrical cross instead of a stack
            that merely tilts. Both rules animate `top` and `rotate` only, so the
            morph composites rather than triggering layout.

            1.5px rather than a true 1px hairline - a single device pixel reads
            as barely-there against a photograph, especially the hero's, so the
            icon needs a hair more weight to still register as a tappable
            control rather than a stray mark. */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-overlay"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 -ml-2 grid h-11 w-11 place-items-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-full origin-center rounded-full transition-all duration-300 ease-out ${barColour} ${
                open ? "top-1/2 rotate-45" : "top-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] origin-center rounded-full transition-all duration-300 ease-out ${barColour} ${
                open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3 rotate-0"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
