"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Footer newsletter sign-up, styled to sit with the rest of the footer: a
 * soft rounded card (the same faint border and shadow as the site's other
 * cards), the footer columns' small navy letterspaced label, a serif heading,
 * the footer's muted body text, and a pill email field with a gold Subscribe
 * pill like the navbar's Login.
 *
 * No mailing-list service is connected yet, so a valid address gets an
 * honest "not connected" reply, as the site's other forms do.
 */
export function NewsletterCard() {
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "invalid");
  }

  return (
    <div
      id="newsletter"
      className="w-full max-w-[19rem] rounded-2xl border border-[#a47a35]/25 bg-[#fcf4dc] p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]"
    >
      <p className="text-[11px] font-semibold tracking-[0.3em] text-navy-900 uppercase">
        Newsletter
      </p>
      <p className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl leading-tight text-navy-900">
        Stay in the know
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/60">
        New arrivals, trade-show dates and market notes from the AMIPI team, straight to your
        inbox.
      </p>

      {state === "done" ? (
        <p
          role="status"
          className="mt-5 rounded-xl border border-[#d4ae5c]/40 bg-[#faf3e3] px-4 py-3 text-[13px] leading-snug text-foreground/75"
        >
          Thanks! Sign-up isn&rsquo;t connected yet - please email{" "}
          <a href="mailto:info@amipi.com" className="font-semibold underline underline-offset-2">
            info@amipi.com
          </a>{" "}
          to join the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            aria-label="Email address"
            aria-invalid={state === "invalid"}
            onChange={() => state === "invalid" && setState("idle")}
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm text-navy-900 transition-colors outline-none placeholder:text-foreground/40 focus:border-[#a47a35]"
          />
          {state === "invalid" && (
            <p role="alert" className="px-1 text-[12px] font-medium text-crimson-500">
              Please enter a valid email address.
            </p>
          )}
          <button
            type="submit"
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#dfbf7b] py-2.5 text-[12px] font-semibold tracking-[0.16em] text-navy-900 uppercase transition-colors hover:bg-[#d4ae5c]"
          >
            Subscribe
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>
      )}
    </div>
  );
}
