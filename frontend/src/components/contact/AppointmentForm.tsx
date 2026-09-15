"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

const CONTACT_DETAILS = [
  { icon: Phone, label: "(800) 530-2647", href: "tel:+18005302647" },
  { icon: Mail, label: "info@amipi.com", href: "mailto:info@amipi.com" },
  { icon: MapPin, label: "42 W 48th St, New York, NY", href: undefined },
];

const inputClasses =
  "w-full rounded-xl border border-ice-100/15 bg-navy-950 px-4 py-3 text-sm text-ice-100 placeholder:text-ice-100/35 transition-colors focus:border-gold-500/60 focus:outline-none";

/**
 * Appointment request form. There is no backend behind this yet - see the
 * TODO on handleSubmit - so it validates client-side and drops into a
 * confirmation state on "submit" rather than claiming to email or store
 * anything it doesn't actually send anywhere.
 */
export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire this up to a real endpoint (or a mailto:/booking service)
    // once one exists. For now this only confirms the visit locally - no
    // request actually leaves the browser.
    setSubmitted(true);
  };

  return (
    <section className="relative bg-navy-950 px-6 pt-24 pb-20 sm:px-12 sm:pt-28 sm:pb-28 lg:px-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Get In Touch
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-4xl">
            Book a Private <span className="text-gold-500">Appointment</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ice-100/60 sm:text-base">
            Tell us what you&rsquo;re after - buying, selling, or just want
            to see a piece in person - and our team will follow up within
            one business day.
          </p>

          <ul className="mt-10 space-y-4">
            {CONTACT_DETAILS.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/30 text-gold-500">
                  <Icon className="h-4 w-4" />
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-sm text-ice-100/80 transition-colors hover:text-gold-500"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-sm text-ice-100/80">{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          {submitted ? (
            <div className="rounded-2xl border border-gold-500/30 bg-navy-900 p-8 text-center sm:p-10">
              <p className="text-[10px] tracking-[0.3em] text-gold-500 uppercase">
                Request Received
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold text-ice-100 sm:text-2xl">
                Thank you - we&rsquo;ll be in touch
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ice-100/60">
                A member of the AMIPI team will follow up within one
                business day to confirm your appointment.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-ice-100/8 bg-navy-900 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-ice-100/60 uppercase">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    className={`mt-2 ${inputClasses}`}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-ice-100/60 uppercase">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@email.com"
                    className={`mt-2 ${inputClasses}`}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-ice-100/60 uppercase">
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(800) 530-2647"
                    className={`mt-2 ${inputClasses}`}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-ice-100/60 uppercase">
                    Preferred Date
                  </span>
                  <input type="date" name="date" className={`mt-2 ${inputClasses}`} />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-[11px] font-semibold tracking-[0.15em] text-ice-100/60 uppercase">
                  What Can We Help With?
                </span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="I'd like to see the Riviera Collection in person..."
                  className={`mt-2 resize-none ${inputClasses}`}
                />
              </label>

              <div className="mt-6">
                <PillButton type="submit" variant="solid" icon="arrow">
                  Request Appointment
                </PillButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
