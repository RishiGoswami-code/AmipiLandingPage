"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { italiana } from "@/styles/fonts";
import { CONTACT } from "@/components/nav/navigation";
import { CTA_CLASSES } from "./GiftGuideButton";
import { CONTACT_HOVER, SteadyBold } from "./GiftGuideTheme";

/** Navy from the hero banner. */
const NAVY = "#0b1a3d";

/** The small letterspaced label over each column. */
const LABEL = "text-[13px] font-semibold tracking-[0.22em] uppercase";

/** The newsletter form's text fields. Placeholders are upright Manrope,
 * like the rest of the footer. */
const FIELD =
  "w-full border border-[#0b1a3d]/15 bg-white px-5 py-3.5 text-base text-[#0b1a3d] transition-colors outline-none placeholder:text-[#0b1a3d]/45 focus:border-[#0b1a3d]/50 aria-[invalid=true]:border-crimson-500";

/** The newsletter form's fields, in order. Name and email are required;
 * the company name is optional. */
const FIELDS = [
  { name: "name", type: "text", autoComplete: "name", placeholder: "Name", required: true },
  { name: "email", type: "email", autoComplete: "email", placeholder: "Email", required: true },
  {
    name: "company",
    type: "text",
    autoComplete: "organization",
    placeholder: "Company name",
    required: false,
  },
] as const;

type FieldName = (typeof FIELDS)[number]["name"];

/** Phone, email and address lines in the Contact Us column. */
const DETAIL =
  "flex items-start gap-3 text-[15px] leading-snug text-[#0b1a3d]/75 max-lg:justify-center";

/**
 * The page's footer, under the last banner, after a classic footer strip:
 * three columns across the full width, split by dotted rules - "Follow Us"
 * with AMIPI's social accounts at the left, "Subscribe to Our Newsletter" in the
 * middle (name, email and company name fields with the Subscribe button
 * beneath them, set to the right), and "Contact Us" with the phone, email and showroom address
 * at the right. Below 1024px the three stack, centred, with the rules
 * running across between them. A hairline along the bottom separates it
 * from the yellow partner belt below. It sits on the page's own cream, and
 * behind the columns the AMIPI wordmark runs very large and very faint.
 *
 * The left column opens with AMIPI's intro, in the team's wording, on three
 * lines: "AMIPI Inc." and "Wholesale Diamonds & Fine Jewelry Since 1976" in
 * the upright Cormorant of the section headings above, then the paragraph.
 * Nothing in the footer is italic. The
 * social links, phone and email are the navbar's (CONTACT); the address is
 * the site footer's. No mailing-list
 * service is connected yet, so, as in the footer's NewsletterCard, a valid
 * sign-up gets an honest "not connected" reply.
 */
export function GiftGuideConnect() {
  const [done, setDone] = useState(false);
  // The first field that failed, with its message
  const [error, setError] = useState<{ field: FieldName; message: string } | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (field: FieldName) => String(data.get(field) ?? "").trim();
    if (!value("name")) {
      setError({ field: "name", message: "Please enter your name." });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) {
      setError({ field: "email", message: "Please enter a valid email address." });
    } else {
      setError(null);
      setDone(true);
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden border-b border-[#0b1a3d]/70 px-edge py-[calc(var(--gift-gap)*1.6)]"
      style={{ color: NAVY }}
    >
      {/* The wordmark in the background: the navbar's Italiana, as wide as
          the page and barely darker than the cream, so the columns over it
          read as clearly as without it */}
      <p
        aria-hidden
        className={`${italiana.className} pointer-events-none absolute inset-x-0 bottom-[-0.12em] -z-10 text-center text-[24vw] leading-none tracking-[0.06em] text-[#0b1a3d]/[0.035] uppercase select-none`}
      >
        Amipi
      </p>

      {/* --gap is the space either side of the dotted rules */}
      <div className="grid [--gap:clamp(2rem,4vw,4.5rem)] lg:max-xl:[--gap:1.5rem] max-lg:text-center lg:grid-cols-[max-content_minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="pb-8 lg:pr-[var(--gap)] lg:pb-0">
          {/* AMIPI's intro, exactly as the team sent it, one line each. The
              Wholesale line never wraps: on phones it scales with the
              screen, and from 1024px the column is as wide as the line
              (the gaps by the rules narrow to 1.5rem up to 1280px so the
              other two columns keep their room) */}
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,2.6vw,2.5rem)] leading-none font-semibold">
            AMIPI Inc.
          </h2>
          <p className="mt-2 font-[family-name:var(--font-cormorant)] text-[clamp(1rem,4.6vw,1.375rem)] leading-snug font-medium whitespace-nowrap lg:text-[clamp(1.125rem,1.5vw,1.5rem)]">
            Wholesale Diamonds &amp; Fine Jewelry Since 1976
          </p>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[#0b1a3d]/75 max-lg:mx-auto">
            For over 50 years, AMIPI has supplied fine jewelry and wholesale
            diamonds with transparent fixed pricing, GIA standard grading, and
            accurate weights. Discover our No Bull approach to quality and
            value.
          </p>

          <h2 className={`mt-7 ${LABEL}`}>Follow Us</h2>
          <ul className="mt-5 flex flex-wrap gap-3 max-lg:justify-center">
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

        <div className={`border-dotted border-[#0b1a3d]/35 max-lg:border-y max-lg:py-8 lg:border-x lg:px-[var(--gap)]`}>
          <h2 id="newsletter-heading" className={LABEL}>
            Subscribe to Our Newsletter
          </h2>
          {done ? (
            <p
              role="status"
              className="mt-5 border border-[#0b1a3d]/15 bg-white/70 px-5 py-4 max-lg:mx-auto max-lg:max-w-md text-[15px] leading-snug text-[#0b1a3d]/80"
            >
              Thanks! Sign-up isn&rsquo;t connected yet - please email{" "}
              <a href={CONTACT.email.href} className="font-semibold underline underline-offset-2">
                {CONTACT.email.label}
              </a>{" "}
              to join the list.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3 max-lg:mx-auto max-lg:max-w-md">
              {FIELDS.map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  aria-label={field.placeholder}
                  aria-invalid={error?.field === field.name}
                  aria-describedby={error?.field === field.name ? "newsletter-error" : undefined}
                  onChange={() => error?.field === field.name && setError(null)}
                  className={FIELD}
                />
              ))}
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="text-left text-[13px] font-medium text-crimson-500"
                >
                  {error.message}
                </p>
              )}
              <div className="flex pt-1 max-lg:justify-center lg:justify-end">
                {/* The page's one call-to-action style */}
                <button
                  type="submit"
                  className={`group h-10 cursor-pointer px-5 text-[11px] ${CTA_CLASSES}`}
                >
                  <span className="block leading-none">Subscribe</span>
                  <ArrowRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="pt-8 lg:pt-0 lg:pl-[var(--gap)]">
          <h2 className={LABEL}>Contact Us</h2>
          <ul className="mt-5 space-y-3.5">
            <li>
              <a href={CONTACT.phone.href} className={`${DETAIL} ${CONTACT_HOVER}`}>
                <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#0b1a3d]" />
                <SteadyBold>{CONTACT.phone.label}</SteadyBold>
              </a>
            </li>
            <li>
              <a href={CONTACT.email.href} className={`${DETAIL} ${CONTACT_HOVER}`}>
                <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#0b1a3d]" />
                <SteadyBold>{CONTACT.email.label}</SteadyBold>
              </a>
            </li>
            <li className={DETAIL}>
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#0b1a3d]" />
              <address className="not-italic">
                42 W 48th St, 15th Flr
                <br />
                New York, NY 10036
              </address>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
