import { FINE_JEWELRY_HREF, GiftGuideButton } from "./GiftGuideButton";
import { BAND_WHITE, BandHeading, BODY_TYPE } from "./GiftGuideTheme";

/** The four points, exactly as the team sent them. Each opens on its own
 * label sentence, set in bold, as part of the point's text. */
const POINTS = [
  {
    label: "Start with the classics.",
    text: "Diamond studs, tennis bracelets and hoops are the gifts shoppers come looking for every December. Keep a good mix of sizes and prices so no one leaves empty-handed.",
  },
  {
    label: "Offer both natural and lab-grown.",
    text: "Many holiday shoppers want to compare both. Having the same style in each lets them pick what fits their budget and their story.",
  },
  {
    label: "Bring in a few trending pieces.",
    text: "Bezel settings, stackable bands and colorful gemstones give your holiday case something new to talk about.",
  },
  {
    label: "Plan ahead for the last-minute rush.",
    text: "The busiest gifting days come right before Christmas. Restocking your bestsellers early means you won’t run out when it matters most.",
  },
];

/**
 * "Your Holiday Season, Made Easier" - the retailer's planning notes, in a
 * white band under the Bezel and Color row and above the footer: the band
 * heading, four bullet points, a closing line and one "Shop Now!" to the
 * Fine Jewelry page on amipi.com (FINE_JEWELRY_HREF).
 */
export function GiftGuideHolidayPlanning() {
  return (
    <section
      id="holiday-planning"
      aria-labelledby="holiday-planning-heading"
      className={`${BAND_WHITE} px-edge`}
    >
      <BandHeading id="holiday-planning-heading" tone="white" title="Your Holiday Season, Made Easier" />

      <div className="mx-auto mt-[clamp(1.5rem,2.5vw,2.25rem)] max-w-[46rem]">
        <ul className={`list-disc space-y-3 pl-5 marker:text-(--gift-cta) ${BODY_TYPE} text-[#141a17]/80`}>
          {POINTS.map((point) => (
            <li key={point.label} className="pl-1 text-pretty">
              <strong className="font-semibold text-[#141a17]">{point.label}</strong> {point.text}
            </li>
          ))}
        </ul>

        <p className={`mt-6 text-center text-pretty ${BODY_TYPE} text-[#141a17]/80`}>
          You know your shoppers best. We&rsquo;re here to make sure you have the right pieces in time for the holidays.
        </p>

        {FINE_JEWELRY_HREF && (
          <div className="mt-7 flex justify-center">
            <GiftGuideButton href={FINE_JEWELRY_HREF}>Shop Now!</GiftGuideButton>
          </div>
        )}
      </div>
    </section>
  );
}
