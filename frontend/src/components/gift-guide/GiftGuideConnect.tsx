"use client";

import { useState } from "react";
import { CircleArrowRight } from "lucide-react";
import { CONTACT } from "@/components/nav/navigation";

/** Navy from the hero banner, as on the Custom Jewelry section. */
const NAVY = "#0b1a3d";

/** The small letterspaced label over each column. */
const LABEL = "text-[13px] font-semibold tracking-[0.22em] uppercase";

/**
 * The sign-off strip under the last banner, after a classic footer strip: a
 * "Follow Us" column with AMIPI's social accounts at the left, a dotted rule,
 * and "Newsletter Signup" at the right - an email field with an italic
 * Subscribe pill beneath it, set to the right. On phones the two stack,
 * centred, with the rule running across between them.
 *
 * The social links are the navbar's (CONTACT.socials). No mailing-list
 * service is connected yet, so, as in the footer's NewsletterCard, a valid
 * address gets an honest "not connected" reply.
 */
export function GiftGuideConnect() {
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "invalid");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="px-edge py-[var(--gift-gap)]"
      style={{ color: NAVY }}
    >
      <div className="mx-auto grid max-w-5xl max-md:text-center md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
        <div className="pb-8 md:pr-[clamp(2rem,5vw,4.5rem)] md:pb-0">
          <h2 className={LABEL}>Follow Us</h2>
          <ul className="mt-5 flex flex-wrap gap-3 max-md:justify-center">
            {CONTACT.socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AMIPI on ${label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0b1a3d]/25 transition-colors hover:border-[#0b1a3d] hover:bg-[#0b1a3d] hover:text-[#f5efe4]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-dotted border-[#0b1a3d]/35 max-md:border-t max-md:pt-8 md:border-l md:pl-[clamp(2rem,5vw,4.5rem)]">
          <h2 id="newsletter-heading" className={LABEL}>
            Newsletter Signup
          </h2>
          {state === "done" ? (
            <p
              role="status"
              className="mt-5 border border-[#0b1a3d]/15 bg-white/70 px-5 py-4 text-[15px] leading-snug text-[#0b1a3d]/80"
            >
              Thanks! Sign-up isn&rsquo;t connected yet - please email{" "}
              <a href={CONTACT.email.href} className="font-semibold underline underline-offset-2">
                {CONTACT.email.label}
              </a>{" "}
              to join the list.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-5">
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email…"
                aria-label="Email address"
                aria-invalid={state === "invalid"}
                onChange={() => state === "invalid" && setState("idle")}
                className="w-full border border-[#0b1a3d]/15 bg-white px-5 py-3.5 text-base text-[#0b1a3d] transition-colors outline-none placeholder:font-[family-name:var(--font-cormorant-italic)] placeholder:text-xl placeholder:text-[#0b1a3d]/45 placeholder:italic focus:border-[#0b1a3d]/50"
              />
              {state === "invalid" && (
                <p role="alert" className="mt-2 text-left text-[13px] font-medium text-crimson-500">
                  Please enter a valid email address.
                </p>
              )}
              <div className="mt-4 flex max-md:justify-center md:justify-end">
                <button
                  type="submit"
                  className="group flex cursor-pointer items-center gap-4 rounded-full bg-[#0b1a3d] py-2.5 pr-5 pl-8 font-[family-name:var(--font-cormorant-italic)] text-2xl text-[#f5efe4] italic transition-colors hover:bg-[#13285a]"
                >
                  subscribe
                  <CircleArrowRight
                    aria-hidden
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
