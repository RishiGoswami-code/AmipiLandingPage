import type { NextRequest } from "next/server";
import { getSetup, getSlots } from "@/lib/bookings";

/** Longest span one request may ask for - a calendar month plus slack. */
const MAX_RANGE = 45 * 86_400_000;

/**
 * GET /api/meet/slots?from=<ISO>&to=<ISO>&staff=<id>
 * Free meeting start times (UTC ISO strings) for one team member, or for
 * anyone when `staff` is omitted.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const from = new Date(q.get("from") ?? "");
  const to = new Date(q.get("to") ?? "");
  if (isNaN(+from) || isNaN(+to) || +to <= +from || +to - +from > MAX_RANGE) {
    return Response.json({ error: "Bad date range." }, { status: 400 });
  }

  try {
    const { staff } = await getSetup();
    const wanted = q.get("staff") ?? "";
    if (wanted && !staff.some((s) => s.id === wanted)) {
      return Response.json({ error: "Unknown team member." }, { status: 400 });
    }
    const slots = await getSlots(wanted ? [wanted] : staff.map((s) => s.id), from, to);
    return Response.json({ slots: [...slots.keys()].map((t) => new Date(t).toISOString()) });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Couldn't load available times." }, { status: 502 });
  }
}
