import type { Metadata } from "next";
import { PhilosophyPrinciples } from "@/components/philosophy/PhilosophyPrinciples";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Our Philosophy — AMIPI",
  description:
    "The six principles AMIPI operates by — honest grading, transparent fixed pricing, and no back-room negotiating. The no-bull standard.",
};

export default function PhilosophyPage() {
  return (
    <div className="bg-background">
      <PhilosophyPrinciples />

      <section className="relative bg-surface px-6 py-12 text-center sm:px-12 sm:py-16 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            See It In Practice
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[0.02em] text-foreground uppercase sm:text-3xl">
            Browse The Collection
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60">
            Every piece we list is graded, priced and described the same
            honest way - come see for yourself.
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href="/categories" variant="solid" icon="arrow">
              Shop By Category
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
