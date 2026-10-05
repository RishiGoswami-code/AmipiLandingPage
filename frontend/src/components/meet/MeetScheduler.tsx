"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { Field, FieldAlert, Select, TextArea } from "@/components/account/fields";
import { track } from "@/lib/analytics";
import type { Staff } from "@/lib/bookings";

const ANYONE = "Anyone";

type Details = {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  notes: string;
  staffId: string;
  staffName: string;
  /** Honeypot - stays empty for real visitors. */
  website: string;
};

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * Free start times for one calendar month (the visitor's local month), from
 * /api/meet/slots. Returns null while loading; `reload` bumps after a failed
 * booking so a time someone else just took disappears.
 */
function useSlots(staffId: string, year: number, month: number, reload: number) {
  const key = `${staffId}|${year}-${month}|${reload}`;
  const [state, setState] = useState<{ key: string; slots: Date[]; failed: boolean } | null>(null);

  useEffect(() => {
    let live = true;
    const params = new URLSearchParams({
      from: new Date(year, month, 1).toISOString(),
      to: new Date(year, month + 1, 1).toISOString(),
    });
    if (staffId) params.set("staff", staffId);
    fetch(`/api/meet/slots?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: { slots: string[] }) => {
        if (live) setState({ key, slots: j.slots.map((s) => new Date(s)), failed: false });
      })
      .catch(() => {
        if (live) setState({ key, slots: [], failed: true });
      });
    return () => {
      live = false;
    };
  }, [key, staffId, year, month]);

  return state?.key === key ? state : null;
}

/**
 * /meet's booking flow, in the site's own design on top of AMIPI's Microsoft
 * Bookings calendar: the visitor gives the details Bookings asks for (name,
 * email and company required) and optionally a team member, then picks a day
 * and time from that person's real availability. Booking goes through
 * /api/meet/book into Microsoft Bookings, which puts it on the staff member's
 * calendar and emails the confirmation. Times show in the visitor's own zone.
 */
export function MeetScheduler({ staff, bookingPage }: { staff: Staff[]; bookingPage: string }) {
  const [details, setDetails] = useState<Details | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [booked, setBooked] = useState<{ start: Date; staffName: string } | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const chosen = staff.find((s) => s.name === get("staff"));
    const next: Details = {
      name: get("name"),
      email: get("email"),
      company: get("company"),
      phone: get("phone"),
      address: get("address"),
      notes: get("notes"),
      staffId: chosen?.id ?? "",
      staffName: chosen?.name ?? "",
      website: get("website"),
    };
    if (!next.name || !next.email || !next.company) {
      setFormError("Please add your name, email and company name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      setFormError("Please check your email address.");
      return;
    }
    setFormError(null);
    setDetails(next);
  }

  const card =
    "rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)] sm:p-8";

  if (booked && details) {
    return (
      <div className={`${card} text-center`}>
        <CalendarCheck className="mx-auto h-10 w-10 text-[#a47a35]" strokeWidth={1.5} />
        <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-3xl text-foreground">
          You&rsquo;re booked, {details.name.split(" ")[0]}
        </h2>
        <p className="mt-3 text-lg font-medium text-foreground">
          {booked.start.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          {" at "}
          {booked.start.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
          {booked.staffName && ` with ${booked.staffName}`}
        </p>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-foreground/70">
          A confirmation with the meeting details is on its way to {details.email}. We look
          forward to meeting you.
        </p>
      </div>
    );
  }

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
          <Select label="Preferred team member" name="staff" icon={Users} options={[ANYONE, ...staff.map((s) => s.name)]} defaultValue={ANYONE} />
          <TextArea label="Special requests" name="notes" icon={MessageSquare} placeholder="What would you like to discuss? (optional)" className="sm:col-span-2" />
        </div>
        {/* Off-screen trap for form-filling bots; real visitors never see it. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        {formError && <FieldAlert>{formError}</FieldAlert>}
        <div className="mt-6">
          <PillButton type="submit" variant="dark" size="sm" icon="arrow">
            Choose a time
          </PillButton>
        </div>
      </form>
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
      <TimePicker
        details={details}
        bookingPage={bookingPage}
        onBooked={(start, staffName) => {
          // GA4's standard lead event; mark it as a key event (conversion) in Analytics.
          track("generate_lead", { form: "meeting", team_member: details.staffId ? "chosen" : "anyone" });
          setBooked({ start, staffName });
        }}
      />
    </div>
  );
}

function TimePicker({
  details,
  bookingPage,
  onBooked,
}: {
  details: Details;
  bookingPage: string;
  onBooked: (start: Date, staffName: string) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Date | null>(null);
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ text: string; fallback?: boolean } | null>(null);

  const data = useSlots(details.staffId, view.year, view.month, reload);

  const byDay = useMemo(() => {
    const map = new Map<string, Date[]>();
    for (const s of data?.slots ?? []) {
      const list = map.get(dayKey(s));
      if (list) list.push(s);
      else map.set(dayKey(s), [s]);
    }
    return map;
  }, [data]);

  const first = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const isCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth();
  const times = day ? (byDay.get(day) ?? []) : [];
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function move(by: number) {
    const d = new Date(view.year, view.month + by, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
    setDay(null);
    setSlot(null);
  }

  async function confirm() {
    if (!slot || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/meet/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, start: slot.toISOString(), timeZone: zone }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        onBooked(slot, json.staffName ?? details.staffName);
        return;
      }
      if (json.slotTaken) {
        setSlot(null);
        setReload((n) => n + 1);
      }
      setError({ text: json.error ?? "We couldn't complete the booking.", fallback: !json.slotTaken });
    } catch {
      setError({ text: "We couldn't reach the booking service.", fallback: true });
    } finally {
      setBusy(false);
    }
  }

  const navButton =
    "grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-black/10 text-foreground/70 transition-colors hover:border-navy-900 hover:text-navy-900 disabled:cursor-default disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-foreground/70";

  return (
    <div className="mt-6">
      <p className="text-[13px] text-foreground/65">
        Meeting with{" "}
        <span className="font-semibold text-foreground">
          {details.staffName || "the first available team member"}
        </span>
        . Times are shown in your time zone ({zone.replace(/_/g, " ")}).
      </p>

      <div className="mt-5 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-foreground">
              {first.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </h3>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} disabled={isCurrentMonth} aria-label="Previous month" className={navButton}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Next month" className={navButton}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((w, i) => (
              <span key={i} className="pb-1 text-[11px] font-medium tracking-wider text-foreground/45">
                {w}
              </span>
            ))}
            {Array.from({ length: first.getDay() }, (_, i) => (
              <span key={`pad${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = new Date(view.year, view.month, i + 1);
              const key = dayKey(date);
              const open = byDay.has(key);
              const selected = key === day;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!open}
                  onClick={() => {
                    setDay(key);
                    setSlot(null);
                    setError(null);
                  }}
                  aria-label={`${date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}${open ? "" : ", no times available"}`}
                  aria-pressed={selected}
                  className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-[14px] transition-colors ${
                    selected
                      ? "bg-navy-900 font-semibold text-white"
                      : open
                        ? "cursor-pointer bg-[#f7f1e6] font-medium text-foreground hover:bg-[#ecdfc6]"
                        : "text-foreground/25"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite">
          <h3 className="text-[15px] font-semibold text-foreground">
            {day && times[0]
              ? times[0].toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
              : "Available times"}
          </h3>
          <div className="mt-4">
            {!data ? (
              <p className="text-[14px] text-foreground/55">Loading available times&hellip;</p>
            ) : data.failed ? (
              <Fallback text="We couldn't load available times." bookingPage={bookingPage} />
            ) : !byDay.size ? (
              <p className="text-[14px] text-foreground/55">
                No times left this month. Try the next month
                {details.staffName ? " or another team member" : ""}.
              </p>
            ) : !day ? (
              <p className="text-[14px] text-foreground/55">Pick a highlighted day to see its times.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                {times.map((t) => {
                  const selected = slot?.getTime() === t.getTime();
                  return (
                    <button
                      key={t.getTime()}
                      type="button"
                      onClick={() => {
                        setSlot(t);
                        setError(null);
                      }}
                      aria-pressed={selected}
                      className={`cursor-pointer rounded-lg border px-2 py-2 text-[13px] transition-colors ${
                        selected
                          ? "border-navy-900 bg-navy-900 font-semibold text-white"
                          : "border-black/10 text-foreground hover:border-[#a47a35] hover:text-[#a47a35]"
                      }`}
                    >
                      {t.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {error &&
        (error.fallback ? (
          <div className="mt-5">
            <Fallback text={error.text} bookingPage={bookingPage} />
          </div>
        ) : (
          <FieldAlert>{error.text}</FieldAlert>
        ))}

      <div className={`mt-7 transition-opacity ${slot && !busy ? "" : "pointer-events-none opacity-40"}`}>
        <PillButton onClick={confirm} variant="dark" size="sm" icon="arrow">
          {busy
            ? "Booking..."
            : slot
              ? `Book ${slot.toLocaleDateString(undefined, { month: "short", day: "numeric" })}, ${slot.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`
              : "Book meeting"}
        </PillButton>
      </div>
    </div>
  );
}

/** When the booking service can't be reached, Microsoft's own page still works. */
function Fallback({ text, bookingPage }: { text: string; bookingPage: string }) {
  return (
    <p role="alert" className="rounded-lg border border-[#d4ae5c]/40 bg-[#f7f1e6] px-4 py-2.5 text-[13px] leading-relaxed text-foreground/75">
      {text} You can also{" "}
      <a href={bookingPage} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
        book on our Microsoft Bookings page
      </a>
      , or call{" "}
      <a href="tel:+18005302647" className="font-semibold">
        +1 (800) 530-2647
      </a>
      .
    </p>
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
