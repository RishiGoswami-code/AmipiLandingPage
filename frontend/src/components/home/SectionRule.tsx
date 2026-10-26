/**
 * The short brand-yellow rule (#fed700, gold-500) under a home section's
 * title. The home sections below the hero set text in the brand blue
 * (#2c3b5b, navy-700) and keep the yellow for accents like this one: as
 * text on these light grounds it would be about 1.4:1, unreadable. Purely
 * decorative.
 */
export function SectionRule({ center = false }: { center?: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-4 block h-[3px] w-14 rounded-full bg-gold-500 ${center ? "mx-auto" : ""}`}
    />
  );
}
