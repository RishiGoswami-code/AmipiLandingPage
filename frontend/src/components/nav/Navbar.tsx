"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

const LINKS = [
  { label: "Diamonds & Jewelry", href: "#collection" },
  { label: "Our Philosophy", href: "#philosophy" },
  { label: "Sell Your Diamonds", href: "#sell" },
  { label: "Visit Us", href: "#visit" },
];

/**
 * Floating pill navbar, structured after kora.framer.media: a white,
 * fully-rounded bar inset from the viewport edges, sitting fixed above
 * everything (including the pinned hero) rather than living in normal flow.
 * It is the one deliberately light surface on an otherwise all-dark canvas -
 * same trick the reference uses against its own photo hero.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="group/nav fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-5">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full bg-ice-100/95 px-4 shadow-[0_8px_30px_-4px_rgba(18,25,38,0.35)] backdrop-blur-md sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="h-2 w-2 rounded-full bg-crimson-500" />
          <span className="font-display text-base font-extrabold tracking-[0.2em] text-navy-900 uppercase sm:text-lg">
            Amipi
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold tracking-wide text-navy-700 transition-colors hover:text-crimson-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+18005302647"
            className="text-[13px] font-semibold tracking-wide text-navy-700 transition-colors hover:text-crimson-500"
          >
            (800) 530-2647
          </a>
          <PillButton href="/login" variant="dark" size="sm" icon="dot">
            Login
          </PillButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Animated horizontal line drawn across bottom edge of the navbar on hover */}
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-[2.5px] overflow-hidden rounded-full sm:inset-x-10">
          <div className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-transparent via-[#dfbf7b] via-[#ffffff] to-transparent opacity-0 transition-all duration-500 ease-out group-hover/nav:scale-x-100 group-hover/nav:opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl bg-ice-100/98 p-4 shadow-[0_8px_30px_-4px_rgba(18,25,38,0.35)] backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+18005302647"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/5"
            >
              (800) 530-2647
            </a>
          </nav>
          <div className="mt-2 border-t border-navy-900/10 pt-3">
            <PillButton
              href="/login"
              variant="dark"
              size="sm"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Login
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
}
