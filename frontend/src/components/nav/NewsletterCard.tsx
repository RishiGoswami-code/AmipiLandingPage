"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Footer newsletter sign-up: a soft rounded card in the brand light blue
 * (ice-200) with all its text - the small letterspaced label, the serif
 * heading and the body copy - in the brand dark blue (navy-700), a pill email
 * field and a red Subscribe pill with a white label (the site's CTA red,
 * crimson-500, 5.8:1).
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
      className="w-full max-w-[19rem] rounded-2xl border border-navy-700/15 bg-ice-200 p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]"
    >
      <p className="text-[11px] font-semibold tracking-[0.3em] text-navy-700 uppercase">
        Newsletter
      </p>
      <p className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl leading-tight text-navy-700">
        Stay in the know
      </p>
      <p className="mt-2 text-sm leading-relaxed text-navy-700">
        New arrivals, trade-show dates and market notes from the AMIPI team, straight to your
        inbox.
      </p>

      {state === "done" ? (
        <p
          role="status"
          className="mt-5 rounded-xl border border-navy-700/15 bg-white/70 px-4 py-3 text-[13px] leading-snug text-navy-700"
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
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm text-navy-900 transition-colors outline-none placeholder:text-foreground/40 focus:border-navy-700"
          />
          {state === "invalid" && (
            <p role="alert" className="px-1 text-[12px] font-medium text-crimson-500">
              Please enter a valid email address.
            </p>
          )}
          <button
            type="submit"
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-crimson-500 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-crimson-600"
          >
            Subscribe
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>
      )}
    </div>
  );
}
