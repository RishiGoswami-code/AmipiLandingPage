import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Diamonds — AMIPI",
  description:
    "Sell your diamonds or fine jewelry direct to AMIPI - a fair quote, prepaid insured shipping, and payment within one business day of receipt.",
};

/** Content intentionally cleared for now - the page stays routable so the
 * nav/footer links keep working. The section components still live in
 * src/components and can be dropped back in here. */
export default function SellYourDiamondsPage() {
  return <div className="min-h-[70svh] bg-background" />;
}
