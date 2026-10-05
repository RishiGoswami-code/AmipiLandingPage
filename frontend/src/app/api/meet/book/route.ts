import { book, getSetup, SlotTakenError } from "@/lib/bookings";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * POST /api/meet/book - creates the meeting in Microsoft Bookings.
 * Body: name, email, company, phone, address, notes, staffId ("" = anyone),
 * start (UTC ISO), timeZone (the visitor's, for their confirmation email).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // Hidden field real visitors never fill; a bot that does gets a quiet "ok".
  if (text(body.website, 200)) return Response.json({ ok: true, staffName: "" });

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const company = text(body.company, 200);
  const start = new Date(text(body.start, 40));
  if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isNaN(+start)) {
    return Response.json({ error: "Please add your name, email, company and a time." }, { status: 400 });
  }

  try {
    const { staff } = await getSetup();
    const staffId = text(body.staffId, 60);
    if (staffId && !staff.some((s) => s.id === staffId)) {
      return Response.json({ error: "Unknown team member." }, { status: 400 });
    }
    const result = await book({
      name,
      email,
      company,
      phone: text(body.phone, 40),
      address: text(body.address, 300),
      notes: text(body.notes, 2000),
      staffId,
      start,
      timeZone: text(body.timeZone, 80),
    });
    return Response.json({ ok: true, staffName: result.staffName });
  } catch (e) {
    if (e instanceof SlotTakenError) {
      return Response.json(
        { error: "That time was just taken. Please pick another.", slotTaken: true },
        { status: 409 },
      );
    }
    console.error(e);
    return Response.json({ error: "We couldn't complete the booking." }, { status: 502 });
  }
}
