/**
 * The Journal's categories, in tab order. `value` is what Sanity stores and
 * what the ?category= query string carries; `label` is what readers see.
 * Retailer Therapy covers product and sales stories.
 */
export const CATEGORIES = [
  { value: "press", label: "Press" },
  { value: "ai", label: "AI" },
  { value: "marketing", label: "Marketing" },
  { value: "retailer-therapy", label: "Retailer Therapy" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const categoryLabel = (value: string) =>
  CATEGORIES.find((c) => c.value === value)?.label ?? value;

export const isCategory = (value: unknown): value is CategoryValue =>
  CATEGORIES.some((c) => c.value === value);
