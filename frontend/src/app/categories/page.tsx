import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop by Category — AMIPI",
  description:
    "Browse AMIPI's fine jewelry by category — rings, necklaces, bracelets, earrings, bridal, men's and loose diamonds, all backed by transparent fixed pricing.",
};

/** Content intentionally cleared for now - the page stays routable so the
 * nav/footer links keep working. The section components still live in
 * src/components and can be dropped back in here. */
export default function CategoriesPage() {
  return <div className="min-h-[70svh] bg-background" />;
}
