"use client";

import { useEffect } from "react";
import { ShopByCategory } from "@/components/home/ShopByCategory";

/** Throwaway verification route - deleted once the carousel is signed off. */
export default function TmpPreview() {
  useEffect(() => {
    const row = document.querySelector<HTMLElement>("[data-lenis-prevent-horizontal]");
    const next = document.querySelector<HTMLButtonElement>(
      '[aria-label="Next categories"]',
    );
    const prev = document.querySelector<HTMLButtonElement>(
      '[aria-label="Previous categories"]',
    );
    if (!row || !next || !prev) return;

    const report = (stage: string) =>
      (document.title = `${stage} left=${Math.round(row.scrollLeft)} prevDisabled=${prev.disabled} nextDisabled=${next.disabled}`);

    setTimeout(() => {
      next.click();
      setTimeout(() => {
        report("afterNext");
        next.click();
        next.click();
        next.click();
        next.click();
        next.click();
        setTimeout(() => report("afterEnd"), 1500);
      }, 1200);
    }, 1500);
  }, []);

  return (
    <div className="flex-1 bg-background pt-10">
      <ShopByCategory />
    </div>
  );
}
