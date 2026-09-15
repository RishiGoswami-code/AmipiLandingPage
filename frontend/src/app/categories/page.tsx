import type { Metadata } from "next";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Shop by Category — AMIPI",
  description:
    "Browse AMIPI's fine jewelry by category — rings, necklaces, bracelets, earrings, bridal, men's and loose diamonds, all backed by transparent fixed pricing.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-navy-950">
      <PageHero
        breadcrumb="Categories"
        kicker="Shop By Category"
        title={
          <>
            Find Your <span className="text-gold-500">Perfect Piece</span>
          </>
        }
        description="From everyday diamond studs to once-in-a-lifetime bridal sets - every category, cut to the same fixed-price, no-bull standard."
      />
      <MarqueeStrip />
      <CategoriesGrid />

      <section className="relative bg-navy-900 px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Can&rsquo;t Find It Here
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-3xl">
            We Source Bespoke Pieces Daily
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ice-100/60">
            Tell us what you&rsquo;re after and our team will hand-pick options
            from our wholesale network within one business day.
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href="#contact" variant="solid" icon="arrow">
              Book a Consultation
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
