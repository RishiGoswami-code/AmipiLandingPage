"use client";

import { useState } from "react";

/**
 * Footer newsletter sign-up: a card with a thin golden-brown border (the
 * site's bronze, #a47a35) and a hard offset shadow that lifts on hover, the
 * title's underline sliding in, and a button whose navy face rolls up over
 * it on hover. The shape is the neo-brutalist card it was adapted from, kept
 * light so it sits quietly beside the footer links.
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
      className="group w-full max-w-[19rem] border-2 border-[#a47a35] bg-white p-5 shadow-[6px_6px_0_#a47a35] transition-[transform,box-shadow] duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#a47a35]"
    >
      <span className="relative mb-3 block overflow-hidden pb-1 text-[22px] leading-tight font-bold tracking-wide text-navy-900 uppercase">
        Newsletter
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-[85%] -translate-x-full bg-[#a47a35] transition-transform duration-300 group-hover:translate-x-0"
        />
      </span>
      <p className="mb-5 text-[14px] leading-snug text-navy-900/80">
        New arrivals, trade-show dates and market notes from the AMIPI team, straight to your
        inbox.
      </p>

      {state === "done" ? (
        <p role="status" className="border border-[#a47a35] bg-[#faf3e3] p-3 text-[13px] leading-snug text-navy-900">
          Thanks! Sign-up isn&rsquo;t connected yet - please email{" "}
          <a href="mailto:info@amipi.com" className="font-bold underline underline-offset-2">
            info@amipi.com
          </a>{" "}
          to join the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            aria-label="Email address"
            aria-invalid={state === "invalid"}
            onChange={() => state === "invalid" && setState("idle")}
            className="w-full border border-[#a47a35] bg-white px-3 py-2.5 text-[15px] text-navy-900 transition-[transform,box-shadow] duration-300 outline-none placeholder:text-navy-900/45 focus:scale-[1.02] focus:shadow-[0_0_0_1px_#a47a35]"
          />
          {state === "invalid" && (
            <p role="alert" className="-mt-1.5 text-[12px] font-semibold text-crimson-500">
              Please enter a valid email address.
            </p>
          )}
          <button
            type="submit"
            className="relative mx-auto w-3/5 cursor-pointer overflow-hidden border border-[#a47a35] bg-[#a47a35] py-2.5 text-[13px] font-semibold tracking-[0.12em] text-white uppercase transition-transform duration-300 before:absolute before:inset-0 before:flex before:translate-y-full before:items-center before:justify-center before:bg-navy-900 before:text-white before:transition-transform before:duration-300 before:content-['Sign_me_up'] hover:before:translate-y-0 active:scale-95"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
