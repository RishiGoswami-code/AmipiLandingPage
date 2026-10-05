import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Page addresses here are all lower-case, but amipi.com links some of its
 * pages with capitals (its footer uses /Privacy-Policy/) and its server never
 * cared about case. Any page address containing capitals is sent to its
 * lower-case form so those old links keep working.
 *
 * This can't be a `redirects()` entry in next.config.ts: those match without
 * regard to case, so "/Privacy-Policy" -> "/privacy-policy" would also catch
 * the lower-case address and loop.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Pages only: not Next's own files, the API, the Studio, or anything with a
  // file extension (images under /public keep their mixed-case names).
  matcher: ["/((?!_next/|api/|studio|.*\\.[^/]+$).*)"],
};
