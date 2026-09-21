import type { Metadata } from "next";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Shop by Category — AMIPI",
  description:
    "Browse AMIPI's fine jewelry by category — rings, necklaces, bracelets, earrings, bridal, men's and loose diamonds, all backed by transparent fixed pricing.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-background pt-[4.8rem] sm:pt-[5.6rem]">
      <CategoriesGrid />

      <section className="relative bg-surface px-6 py-12 text-center sm:px-12 sm:py-16 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Can&rsquo;t Find It Here
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-3xl">
            We Source Bespoke Pieces Daily
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60">
            Tell us what you&rsquo;re after and our team will hand-pick options
            from our wholesale network within one business day.
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href="/contact" variant="solid" icon="arrow">
              Book a Consultation
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
