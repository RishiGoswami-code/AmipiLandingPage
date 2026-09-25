"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PillButton } from "@/components/ui/PillButton";
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
 * It carries no surface of its own, so it has nothing to sit on and must borrow
 * contrast from whatever is beneath it. On the home route that is the hero
 * photograph, which is warm espresso, so the nav paints light - as it does on
 * the About page, which opens on the same espresso. Every other route renders on
 * `--color-background` (#f5f7fb), where light-on-light would be invisible, so
 * the nav paints dark there instead.
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

  /* Routes whose top section is a dark canvas - the home hero and the About
     story; everywhere else is the light theme. */
  const onDark = DARK_ROUTES.includes(usePathname());

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
     generic application chrome against cinematic photography.

     Held at 90% rather than 70% over the hero. Letterspacing thins a word's
     apparent weight — the glyphs stay the same but the whitespace between them
     grows — so type that reads comfortably at 70% when set tight goes faint once
     it is tracked out this far, and it has to survive a photographic backdrop
     rather than a flat panel. Hover goes to pure white for a clear step up.

     Tracking is 0.08em until 2xl, where it opens back up to 0.14em. Five labels
     with dropdown chevrons are about 90px wider than the four plain links this
     replaced, which overflowed into the logo at 1024px; tightening the tracking
     and the row's gap buys that back, so laptops keep the full link row instead
     of dropping to a hamburger.

     It holds to 2xl rather than xl because the row is centred, so its width is
     spent twice: every pixel it grows takes one from each side, and the Schedule
     button takes its full label at xl. Both expanding at 1280 left 16px between
     the row and the cluster; staggering them leaves ~69px. */
  const linkClasses = [
    "group/link relative text-[11px] font-medium tracking-[0.08em] uppercase transition-colors 2xl:tracking-[0.14em]",
    onDark
      ? "text-ice-100/90 hover:text-white"
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
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Rendered before the bar so the bar's own stacking wins and the close
          button stays clickable while the menu is open. */}
      <NavOverlay open={open} onClose={() => setOpen(false)} />

      {/* `px-edge` is the shared gutter token from globals.css, not a local
          choice: the hero's tagline lines up with the logo below it, so both
          sides have to read the same value.

          `relative` is what NavMenu's dropdowns position against - the panels
          hang off the bottom edge of this box, and the wide one spans its full
          width. */}
      <div className="nav-bar relative z-10 flex h-16 items-center justify-between px-edge sm:h-20">
        {/* Centred on mobile, flush left from lg. Centring it also does the work
            of moving the hamburger: with the logo out of flow and both the centre
            nav and the right cluster hidden, the button is the only remaining
            flex child, so justify-between drops it at the start edge. No order
            utilities needed. */}
        <Link
          href="/"
          className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 sm:gap-3 lg:static lg:translate-x-0"
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
              lightChrome ? "text-ice-100" : "text-navy-900"
            }`}
          >
            Amipi
          </span>
        </Link>

        <NavMenu
          linkClassName={linkClasses}
          underlineClassName={underlineClasses}
        />

        <div className="relative z-10 ml-auto hidden items-center gap-3 lg:flex">
          {/* The bar's primary business action, and the reason the phone number
              that used to sit here is gone: two competing ways to start a
              conversation, and the one that books a slot beats the one that
              hopes someone picks up. The number is still a tap away in the
              Contact Us panel, in the mobile menu and in the footer.

              Neither href nor onClick, so this renders as a real button that
              does nothing yet - the scheduling flow is UNBUILT like the rest of
              the menu (see navigation.ts). It is focusable and hoverable
              meanwhile, which is what a design pass needs. */}
          {/* Navy against the champagne Login, which is the pairing the rest of
              the site runs on - no new colour enters the palette for this.

              The two shadows are what let a dark fill sit on the hero
              photograph, and they are lifted straight from the `jewel` variant's
              reasoning: a warm near-black drop shadow grounds the pill on the
              photo instead of haloing it off the surface, and a 1px inset
              highlight on the top edge alone is a bevel rather than a border, so
              it catches light along one edge instead of drawing a rectangle.
              That is the specific fix for what the Login comment below records -
              a navy shape on espresso whose edge dissolves into it. Passed here
              rather than baked into the variant because it is only the navbar
              that sits on photography. */}
          <PillButton
            variant="dark"
            size="xs"
            className="shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_26px_-12px_rgba(14,11,10,0.85)]"
          >
            {/* Two labels, because the link row is centred on the viewport and
                that fixes how much room this button has: the gap between the
                centred row and the gutter is ~125px at 1024, ~186px at 1280 and
                ~330px at 1600, and Login takes ~96px of it first. The full
                26-character label is ~170px even at this size, so it only fits
                from 1280 up. Below that it would push the row off centre, which
                is the one thing the bar is not allowed to do, so a shorter label
                carries the same action.

                Both copies render in both of PillButton's text layers - it keeps
                a duplicate of the label parked below for the roll-up hover - so
                the visible one has to be chosen by CSS rather than by picking a
                string, or the hover would swap between two different words. */}
            <span className="xl:hidden">Book a meeting</span>
            <span className="hidden xl:inline">Schedule a virtual meeting</span>
          </PillButton>
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
