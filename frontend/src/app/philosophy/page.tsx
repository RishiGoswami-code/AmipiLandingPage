import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Philosophy — AMIPI",
  description:
    "The six principles AMIPI operates by — honest grading, transparent fixed pricing, and no back-room negotiating. The no-bull standard.",
};

/** Content intentionally cleared for now - the page stays routable so the
 * nav/footer links keep working. The section components still live in
 * src/components and can be dropped back in here. */
export default function PhilosophyPage() {
  return <div className="min-h-[70svh] bg-background" />;
}
