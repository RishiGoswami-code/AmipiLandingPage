import type { Metadata } from "next";
import { Clock, Users, Video } from "lucide-react";
import { MeetScheduler } from "@/components/meet/MeetScheduler";
import { BOOKING_PAGE, getSetup, type Staff } from "@/lib/bookings";

export const metadata: Metadata = {
  title: "Schedule a Virtual Meeting — AMIPI",
  description:
    "Book a 30-minute virtual meeting with AMIPI's B2B diamond experts at a time that suits you.",
  alternates: { canonical: "/meet" },
};

/* Team members are read live from Microsoft Bookings (getSetup keeps them for
   ten minutes), so the page renders per request rather than at build time. */
export const dynamic = "force-dynamic";

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

const FACTS = [
  { icon: Clock, text: "30 minutes" },
  { icon: Video, text: "Online meeting - details emailed to you" },
  { icon: Users, text: "Choose who you meet, or anyone" },
];

export default async function MeetPage() {
  // If Bookings can't be reached the form still renders with "Anyone"; the
  // time step then points visitors at Microsoft's own booking page.
  let staff: Staff[] = [];
  try {
    staff = (await getSetup()).staff;
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="bg-background px-6 pt-32 pb-20 sm:px-12 sm:pt-36 lg:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className={KICKER}>Virtual Meeting</p>
        <h1 className={`${SERIF} mt-3 text-4xl tracking-tight text-foreground sm:text-6xl`}>
          Let&rsquo;s Meet!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/70">
          Set up an appointment to virtually meet with any of our eager team members.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-foreground/65">
          {FACTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#a47a35]" strokeWidth={1.8} />
              {text}
            </li>
          ))}
        </ul>

        <div className="mt-10 text-left">
          <MeetScheduler staff={staff} bookingPage={BOOKING_PAGE} />
        </div>
      </div>
    </div>
  );
}
