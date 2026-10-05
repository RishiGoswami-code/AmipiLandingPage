import { toWindowsTimeZone } from "./windowsTimeZones";

/**
 * AMIPI's Microsoft Bookings calendar, talked to directly so /meet can keep
 * the site's own design instead of framing Microsoft's page.
 *
 * These are the endpoints Microsoft's public booking page
 * (BOOKING_PAGE below) calls from the visitor's browser: no sign-in, no key.
 * They are not a documented API, so Microsoft could change them; every call
 * here fails loudly and /meet then points visitors at BOOKING_PAGE, which
 * always works. The documented alternative is Microsoft Graph, which needs an
 * app registration approved by AMIPI's Microsoft 365 admin.
 *
 * Server-side only (route handlers and server components): browsers can't call
 * these cross-origin.
 */
const MAILBOX = "VirtualMeeting@amipi.com";
const API = `https://outlook.office365.com/BookingsService/api/V1/bookingBusinessesc2/${MAILBOX}`;
export const BOOKING_PAGE = `https://outlook.office365.com/owa/calendar/${MAILBOX}/bookings/`;

/** The one service the page offers ("Let's Meet!"), matched by title. */
const SERVICE_TITLE = "Let's Meet!";

export class BookingsError extends Error {}

async function call<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}/${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "X-AnchorMailbox": MAILBOX,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new BookingsError(`Bookings ${path} failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

/** "PT30M" / "P1D" -> minutes. Bookings only uses days, hours and minutes. */
function minutes(iso: string | undefined, fallback: number) {
  const m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:\d+S)?)?$/.exec(iso ?? "");
  if (!m) return fallback;
  return Number(m[1] ?? 0) * 1440 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

export type Staff = { id: string; name: string };

type Setup = {
  serviceId: string;
  duration: number;
  interval: number;
  leadTime: number;
  maxAdvance: number;
  isOnline: boolean;
  price: number;
  priceType: string;
  staff: Staff[];
  /** The service's custom questions; "Company name" is the only one today. */
  questions: { id: string; text: string; required: boolean }[];
};

type RawService = {
  title: string;
  serviceId: string;
  defaultDuration?: string;
  isLocationOnline?: boolean;
  defaultPrice?: number;
  defaultPriceType?: string;
  staffMemberIds?: string[];
  customQuestions?: { required?: boolean; questionGuid: string }[];
  bookingsSchedulingPolicy?: {
    minimumLeadTime?: string;
    maximumAdvance?: string;
    timeSlotInterval?: string;
  };
};

/* Staff and service settings change rarely; ten minutes of memory keeps the
   calendar snappy without holding on to a removed team member for long. */
let setupCache: { at: number; value: Setup } | null = null;

export async function getSetup(): Promise<Setup> {
  if (setupCache && Date.now() - setupCache.at < 10 * 60_000) return setupCache.value;

  const [services, staff, questions] = await Promise.all([
    call<{ service: RawService[] }>("services", {}),
    call<{ staffMembers: { id: string; displayName: string }[] }>("staffmembers"),
    call<{ questions: { id: string; questionText: string }[] }>("customQuestions"),
  ]);
  const service = services.service.find((s) => s.title === SERVICE_TITLE) ?? services.service[0];
  if (!service) throw new BookingsError("Bookings has no service to book.");

  const policy = service.bookingsSchedulingPolicy ?? {};
  const allowed = service.staffMemberIds?.length ? new Set(service.staffMemberIds) : null;
  const value: Setup = {
    serviceId: service.serviceId,
    duration: minutes(service.defaultDuration, 30),
    interval: minutes(policy.timeSlotInterval, 30) || 30,
    leadTime: minutes(policy.minimumLeadTime, 1440),
    maxAdvance: minutes(policy.maximumAdvance, 365 * 1440),
    isOnline: service.isLocationOnline ?? true,
    price: service.defaultPrice ?? 0,
    priceType: service.defaultPriceType ?? "SERVICEDEFAULTPRICETYPES_NOT_SET",
    staff: staff.staffMembers
      .filter((s) => !allowed || allowed.has(s.id))
      .map((s) => ({ id: s.id, name: s.displayName }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    questions: (service.customQuestions ?? []).map((q) => ({
      id: q.questionGuid,
      text: questions.questions.find((x) => x.id === q.questionGuid)?.questionText ?? "",
      required: !!q.required,
    })),
  };
  setupCache = { at: Date.now(), value };
  return value;
}

/** Bookings speaks local-clock strings plus a zone name; we always use UTC. */
const toWire = (d: Date) => ({ dateTime: d.toISOString().slice(0, 19), timeZone: "UTC" });
const fromWire = (s: string) => new Date(`${s.slice(0, 19)}Z`);

type Availability = {
  staffAvailabilityResponse: {
    staffId: string;
    availabilityItems: {
      status: string;
      startDateTime: { dateTime: string };
      endDateTime: { dateTime: string };
    }[];
  }[];
};

/**
 * Bookable start times between two instants, each with the staff free then.
 * Bookings returns every person's day as blocks (available / busy / out of
 * office, already cut to the service's bookable hours); a slot is any
 * interval-aligned start whose whole meeting fits inside an available block
 * and respects the service's lead time and booking horizon.
 */
export async function getSlots(staffIds: string[], from: Date, to: Date) {
  const setup = await getSetup();
  const now = Date.now();
  const earliest = now + setup.leadTime * 60_000;
  const latest = now + setup.maxAdvance * 60_000;
  const step = setup.interval * 60_000;
  const length = setup.duration * 60_000;

  const data = await call<Availability>("GetStaffAvailability", {
    serviceId: setup.serviceId,
    staffIds,
    startDateTime: toWire(from),
    endDateTime: toWire(to),
  });

  const slots = new Map<number, string[]>();
  for (const person of data.staffAvailabilityResponse ?? []) {
    for (const item of person.availabilityItems ?? []) {
      if (item.status !== "BOOKINGSAVAILABILITYSTATUS_AVAILABLE") continue;
      const end = fromWire(item.endDateTime.dateTime).getTime();
      const start = Math.max(fromWire(item.startDateTime.dateTime).getTime(), from.getTime(), earliest);
      for (let t = Math.ceil(start / step) * step; t + length <= end && t < to.getTime() && t <= latest; t += step) {
        const free = slots.get(t);
        if (free) {
          if (!free.includes(person.staffId)) free.push(person.staffId);
        } else slots.set(t, [person.staffId]);
      }
    }
  }
  return new Map([...slots].sort((a, b) => a[0] - b[0]));
}

export type BookingRequest = {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  notes: string;
  /** A staff id, or "" for anyone. */
  staffId: string;
  start: Date;
  /** The visitor's browser time zone, e.g. "America/New_York". */
  timeZone: string;
};

/** Thrown when the chosen time is no longer free - the visitor should pick another. */
export class SlotTakenError extends Error {}

/**
 * Books the meeting, in the shape Microsoft's own page posts. The slot is
 * re-checked first so a stale calendar can't double-book; with "anyone", one
 * of the free staff is picked at random and the rest are offered to Bookings
 * as alternates, exactly as its page does.
 */
export async function book(req: BookingRequest) {
  const setup = await getSetup();
  const pool = req.staffId ? [req.staffId] : setup.staff.map((s) => s.id);
  const end = new Date(req.start.getTime() + setup.duration * 60_000);

  const free = (await getSlots(pool, req.start, end)).get(req.start.getTime()) ?? [];
  if (!free.length) throw new SlotTakenError();
  const staffId = free[Math.floor(Math.random() * free.length)];
  const zone = toWindowsTimeZone(req.timeZone);

  const result = await call<{ appointment?: { selfServiceAppointmentId?: string } }>("appointments", {
    appointment: {
      startTime: toWire(req.start),
      endTime: toWire(end),
      serviceId: setup.serviceId,
      staffMemberIds: [staffId],
      customers: [
        {
          name: req.name,
          emailAddress: req.email,
          phone: req.phone,
          notes: req.notes,
          timeZone: zone,
          answeredCustomQuestions: setup.questions.map((q) => ({
            customQuestion: {
              id: q.id,
              questionText: q.text,
              answerOptions: [],
              answerInputType: "ANSWER_INPUT_TYPE_TEXT",
            },
            // Company name is the only question today; anything added later
            // in Bookings gets a dash so a required one can't block booking.
            answer: /company/i.test(q.text) ? req.company : "-",
            isRequired: q.required,
            selectedOptions: [],
          })),
          location: {
            displayName: req.address,
            address: { street: req.address, type: "Other" },
          },
          smsNotificationsEnabled: false,
          instanceId: "",
          price: setup.price,
          priceType: setup.priceType,
        },
      ],
      isLocationOnline: setup.isOnline,
      smsNotificationsEnabled: false,
      verificationCode: "",
      customerTimeZone: zone,
      trackingDataId: "",
      bookingFormInfoList: [],
      price: setup.price,
      priceType: setup.priceType,
      isAllDay: false,
      additionalRecipients: [],
    },
    ...(free.length > 1 ? { preferences: { staffCandidates: free } } : {}),
  });

  return {
    id: result.appointment?.selfServiceAppointmentId ?? "",
    staffName: setup.staff.find((s) => s.id === staffId)?.name ?? "",
  };
}
