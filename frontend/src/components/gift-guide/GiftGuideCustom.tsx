import { Gem, Heart, History, Layers, Sparkles, Stamp, type LucideIcon } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

/** Navy from the hero banner, used for the headings. */
const NAVY = "#0b1a3d";

/** The custom work AMIPI's Custom Design Studio takes on (amipi.com/custom). */
const OPTIONS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Heirloom Redesign", text: "A family piece re-imagined for how it's worn today.", Icon: History },
  { title: "Custom Engagement Rings", text: "A ring designed around one proposal, from the stone up.", Icon: Gem },
  { title: "Logo Jewelry", text: "A brand, crest or monogram cast in gold and diamonds.", Icon: Stamp },
  { title: "Your Own Stones", text: "Set the diamonds or gems your customer already has.", Icon: Sparkles },
  { title: "Matching Sets", text: "Earrings, bracelets and pendants made to go together.", Icon: Layers },
  { title: "Symbolic Pieces", text: "Initials, dates and motifs that mean something to them.", Icon: Heart },
];

/**
 * "Custom Jewelry" - in the place of Stuller's "Personalized Jewelry", which
 * is a plain list of six categories. AMIPI's version is its Custom Design
 * Studio: the six kinds of custom work beside a short pitch and one button to
 * book a meeting, in a white panel on the cream like Top Holiday Trends.
 */
export function GiftGuideCustom() {
  return (
    <section aria-labelledby="custom-heading" className="px-edge py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-2xl border border-[#141414]/[0.06] bg-white px-6 py-12 shadow-[0_30px_70px_-40px_rgba(11,26,61,0.35)] sm:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-14 lg:py-16">
        <div className="max-w-md">
          {/* The kicker with a trailing rule, as on the About page */}
          <p className="flex items-center gap-5 text-xs font-medium tracking-[0.4em] text-[#8a6630] uppercase">
            Custom Design Studio
            <span className="h-px w-12 bg-[#8a6630]/50 sm:w-20" />
          </p>
          <h2
            id="custom-heading"
            className="mt-4 font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
            style={{ color: NAVY }}
          >
            Custom Jewelry
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#141414]/70 sm:text-base">
            You dream it, we make it. From the first sketch to a CAD model, a
            wax and the finished casting, our studio turns your customer&rsquo;s
            idea into a one-of-a-kind holiday gift.
          </p>
          <div className="mt-8">
            <PillButton href="/meet" variant="dark" size="sm" icon="arrow">
              Start a Custom Piece
            </PillButton>
          </div>
        </div>

        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:self-center">
          {OPTIONS.map(({ title, text, Icon }) => (
            <li key={title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f3ead8] text-[#8a6630]">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: NAVY }}>
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#141414]/65">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
