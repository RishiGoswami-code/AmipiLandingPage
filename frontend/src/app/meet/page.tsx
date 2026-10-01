import type { Metadata } from "next";
import { Clock, Globe, Video } from "lucide-react";
import { MeetScheduler } from "@/components/meet/MeetScheduler";

export const metadata: Metadata = {
  title: "Schedule a Virtual Meeting — AMIPI",
  description:
    "Book a 30-minute virtual meeting with AMIPI's B2B diamond experts at a time that suits you.",
};

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

const FACTS = [
  { icon: Clock, text: "30 minutes" },
  { icon: Video, text: "Video call - link sent on booking" },
  { icon: Globe, text: "Shown in your own time zone" },
];

export default function MeetPage() {
  return (
    <div className="bg-background px-6 pt-32 pb-20 sm:px-12 sm:pt-36 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className={KICKER}>Virtual Meeting</p>
        <h1 className={`${SERIF} mt-3 text-4xl tracking-tight text-foreground sm:text-6xl`}>
          Let&rsquo;s Meet!
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/70">
          Set up an appointment to virtually meet with any of our eager team members.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-foreground/65">
          {FACTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#a47a35]" strokeWidth={1.8} />
              {text}
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-3xl">
          <MeetScheduler />
        </div>
      </div>
    </div>
  );
}
