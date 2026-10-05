"use client";

import { useSyncExternalStore } from "react";
import { ExternalLink } from "lucide-react";
import { NotConnectedNote } from "@/components/account/fields";

/**
 * AMIPI's Microsoft Bookings page - the same one amipi.com/meet embeds. It is
 * a public booking page, so the address is not a secret; the env var only
 * exists so a different Bookings page can be swapped in without a code change.
 */
const DEFAULT_URL =
  "https://outlook.office365.com/owa/calendar/VirtualMeeting@amipi.com/bookings/";

/** Only Microsoft's Bookings hosts are accepted, so a typo can't frame some other site. */
const configured = process.env.NEXT_PUBLIC_BOOKINGS_URL ?? "";
const BOOKINGS_URL =
  /^https:\/\/(outlook\.office365\.com|outlook\.office\.com|bookings\.cloud\.microsoft)\//.test(
    configured,
  )
    ? configured
    : DEFAULT_URL;

/** Whether this page is served over https; true during server rendering. */
const noSubscribe = () => () => {};
const useIsHttps = () =>
  useSyncExternalStore(noSubscribe, () => window.location.protocol === "https:", () => true);

const openLink =
  "inline-flex items-center gap-1 font-medium text-[#a47a35] underline underline-offset-2 hover:text-foreground";

/**
 * The whole booking happens inside Microsoft Bookings: pick a team member (or
 * Anyone), a date and time, enter details, Book. It writes straight into the
 * chosen person's Microsoft 365 calendar and emails both sides, which is why
 * it is embedded as-is rather than rebuilt - Bookings takes no prefilled
 * answers, so a form of our own in front of it would only be typed twice.
 *
 * Microsoft only allows the page to be framed by https sites
 * (frame-ancestors https:), so on plain-http localhost the frame would stay
 * blank; a note with a direct link stands in there.
 *
 * The frame is a different origin, so it can't report its height. Bookings
 * lays out as one narrow column at every width; 1800px (what amipi.com uses)
 * fits the whole form, and the frame scrolls inside itself if it runs longer.
 */
export function BookingsEmbed() {
  const https = useIsHttps();

  if (!https) {
    return (
      <NotConnectedNote>
        Microsoft only shows the booking calendar on secure (https) pages, so it can&rsquo;t
        appear on this local preview. It works on the live site.{" "}
        <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className={openLink}>
          Open the booking page <ExternalLink className="h-3 w-3" />
        </a>
      </NotConnectedNote>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]">
        <iframe
          title="Book a virtual meeting with AMIPI"
          src={BOOKINGS_URL}
          className="block h-[1800px] w-full border-0"
        />
      </div>
      <p className="mt-4 text-center text-[13px] text-foreground/60">
        Calendar not loading?{" "}
        <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className={openLink}>
          Open the booking page <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}
