"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Building2, CalendarCheck, Mail, MapPin, MessageSquare, Phone, User, Users } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { Field, FieldAlert, NotConnectedNote, Select, TextArea } from "@/components/account/fields";

/**
 * The Calendly event visitors book, e.g. https://calendly.com/amipi/virtual-meeting.
 * Only calendly.com links are accepted, so a typo can't frame some other site.
 */
const CALENDLY_URL = /^https:\/\/calendly\.com\/[\w-]+(\/[\w-]+)?\/?$/.test(
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
)
  ? process.env.NEXT_PUBLIC_CALENDLY_URL!.replace(/\/$/, "")
  : "";

/** The team members amipi.com/meet lets visitors pick (optional). */
const STAFF = [
  "Anyone",
  "Amish Mehta",
  "Joti",
  "Karan Bhulla",
  "Krish Jhaveri",
  "Sankalp Raut",
  "Shreya Mehta",
  "Sneha Rawal",
  "Sujay Choksi",
];

type Details = {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  notes: string;
  staff: string;
};

/**
 * Prefilled Calendly embed. Calendly fills name and email itself; everything
 * else goes into the event's first question (a1) as one line per detail, so
 * it reaches the team with Calendly's default "anything that will help
 * prepare" question and no extra setup on the Calendly side.
 */
function calendlySrc(d: Details) {
  const summary = [
    `Company: ${d.company}`,
    d.phone && `Phone: ${d.phone}`,
    d.address && `Address: ${d.address}`,
    `Preferred team member: ${d.staff}`,
    d.notes && `Special requests: ${d.notes}`,
  ]
    .filter(Boolean)
    .join("\n");
  const params = new URLSearchParams({
    embed_domain: window.location.host,
    embed_type: "Inline",
    hide_gdpr_banner: "1",
    primary_color: "1b2438",
    name: d.name,
    email: d.email,
    a1: summary,
  });
  return `${CALENDLY_URL}?${params}`;
}

const isCalendlyEvent = (e: MessageEvent) =>
  e.origin === "https://calendly.com" && typeof e.data?.event === "string";

/**
 * amipi.com/meet's booking form (a Microsoft Bookings page) rebuilt on
 * Calendly: the visitor gives the same details first - name, email and
 * company required; phone, address, requests and a preferred team member
 * optional - then picks a date, time and time zone
 * in Calendly with those details already filled in.
 */
export function MeetScheduler() {
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [height, setHeight] = useState(700);
  const [booked, setBooked] = useState(false);

  // Calendly reports its content height (so the frame never scrolls inside the
  // page) and tells us when a time has been booked.
  useEffect(() => {
    if (!details) return;
    function onMessage(e: MessageEvent) {
      if (!isCalendlyEvent(e)) return;
      if (e.data.event === "calendly.page_height") {
        const h = parseInt(e.data.payload?.height, 10);
        if (h > 0) setHeight(h);
      }
      if (e.data.event === "calendly.event_scheduled") setBooked(true);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [details]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Details = {
      name: get("name"),
      email: get("email"),
      company: get("company"),
      phone: get("phone"),
      address: get("address"),
      notes: get("notes"),
      staff: get("staff") || "Anyone",
    };
    if (!next.name || !next.email || !next.company) {
      setError("Please add your name, email and company name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      setError("Please check your email address.");
      return;
    }
    setError(null);
    setDetails(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const card =
    "rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)] sm:p-8";

  if (!details) {
    return (
      <form onSubmit={onSubmit} noValidate className={card}>
        <Step n={1} title="Your details" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Field label="First and last name *" name="name" icon={User} placeholder="Jane Smith" autoComplete="name" required />
          <Field label="Email *" name="email" type="email" icon={Mail} placeholder="you@company.com" autoComplete="email" required />
          <Field label="Company name *" name="company" icon={Building2} placeholder="Your store or business" autoComplete="organization" required />
          <Field label="Phone number" name="phone" type="tel" icon={Phone} placeholder="Optional" autoComplete="tel" />
          <Field label="Address" name="address" icon={MapPin} placeholder="Optional" autoComplete="street-address" />
          <Select label="Preferred team member" name="staff" icon={Users} options={STAFF} defaultValue="Anyone" />
          <TextArea label="Special requests" name="notes" icon={MessageSquare} placeholder="What would you like to discuss? (optional)" className="sm:col-span-2" />
        </div>
        {error && <FieldAlert>{error}</FieldAlert>}
        <div className="mt-6">
          <PillButton type="submit" variant="dark" size="sm" icon="arrow">
            Choose a time
          </PillButton>
        </div>
      </form>
    );
  }

  if (booked) {
    return (
      <div className={`${card} text-center`}>
        <CalendarCheck className="mx-auto h-10 w-10 text-[#a47a35]" strokeWidth={1.5} />
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-3xl text-foreground">
          You&rsquo;re booked, {details.name.split(" ")[0]}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-foreground/70">
          A confirmation with the meeting link is on its way to {details.email}. We look
          forward to meeting you.
        </p>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Step n={2} title="Pick a time" />
        <button
          type="button"
          onClick={() => setDetails(null)}
          className="flex cursor-pointer items-center gap-1.5 text-[13px] text-foreground/60 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Edit details
        </button>
      </div>

      {CALENDLY_URL ? (
        <iframe
          title="Choose a meeting time"
          src={calendlySrc(details)}
          style={{ height }}
          className="mt-6 -mx-6 w-[calc(100%+3rem)] border-0 sm:mx-0 sm:w-full"
        />
      ) : (
        <div className="mt-6">
          <NotConnectedNote>
            Online booking isn&rsquo;t connected yet. Please email{" "}
            <a href="mailto:info@amipi.com" className="font-semibold">
              info@amipi.com
            </a>{" "}
            or call{" "}
            <a href="tel:+18005302647" className="font-semibold">
              +1 (800) 530-2647
            </a>{" "}
            to set up your meeting.
          </NotConnectedNote>
        </div>
      )}
    </div>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-3xl text-foreground">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-900 font-[family-name:var(--font-manrope)] text-[13px] font-semibold text-[#dfbf7b]">
        {n}
      </span>
      {title}
    </h2>
  );
}
