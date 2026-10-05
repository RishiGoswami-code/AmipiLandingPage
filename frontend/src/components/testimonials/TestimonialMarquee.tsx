import { Star } from "lucide-react";

export type Testimonial = { title?: string; body: string; name: string; stars: number };

/** The navbar's two button colours: navy (Schedule a Virtual Meeting, navy-900)
 *  and champagne (Login). The deeper champagne is Login's hover stop, used for
 *  the quote marks so they hold up on the pale grey cards. */
const NAVY = "#1b2438";
const CHAMPAGNE = "#dfbf7b";
const CHAMPAGNE_DEEP = "#d4ae5c";

/**
 * "Words of praise" section: a white panel inside a navy frame, a dark rating
 * pill, a centred headline, and two rows of cards drifting in opposite
 * directions, faded out at both edges.
 *
 * Pure CSS: each row renders its cards twice and slides by half its width
 * (the partnerMarquee keyframes in globals.css), so it loops seamlessly with no
 * JavaScript. Hovering a row pauses it so a card can be read; reduced-motion
 * users get still rows they can scroll instead.
 */
export function TestimonialMarquee({
  testimonials,
  headline,
  subhead,
}: {
  testimonials: Testimonial[];
  headline: string;
  subhead: string;
}) {
  const mid = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, mid), testimonials.slice(mid)];
  const average =
    testimonials.reduce((sum, t) => sum + t.stars, 0) / testimonials.length;

  return (
    <div className="rounded-[2rem] p-2 sm:p-3" style={{ backgroundColor: NAVY }}>
      <section className="overflow-hidden rounded-[1.6rem] bg-white py-8 sm:py-10">
        <div className="px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 py-1.5 pr-4 pl-1.5 text-[12px] font-medium text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]">
            <span
              className="grid h-6 w-6 place-items-center rounded-full"
              style={{ backgroundColor: CHAMPAGNE }}
            >
              <Star aria-hidden className="h-3 w-3 fill-navy-900 text-navy-900" />
            </span>
            Rated {average.toFixed(1)}/5 by our customers
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-[#111] sm:text-4xl lg:text-[2.75rem]">
            {headline}
            <span className="block">{subhead}</span>
          </h1>
        </div>

        <div
          className="mt-8 space-y-4 sm:mt-10"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          {rows.map((row, i) => (
            <div key={i} className="overflow-hidden motion-reduce:overflow-x-auto">
              <div
                className={`flex w-max gap-4 px-2 hover:[animation-play-state:paused] ${
                  i === 0 ? "testimonial-marquee-reverse" : "testimonial-marquee"
                }`}
              >
                {[...row, ...row].map((t, j) => (
                  <Card key={j} t={t} hidden={j >= row.length} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/** "Billy Pisa, Westchester, NY" -> "Billy Pisa" / "Westchester, NY". Bylines
 *  that are only a name get "AMIPI Customer", so every card keeps two lines. */
function splitByline(byline: string) {
  const [name, ...place] = byline.split(",").map((s) => s.trim());
  return { name, role: place.filter(Boolean).join(", ") || "AMIPI Customer" };
}

const initials = (name: string) =>
  name
    .replace(/^(Mrs?|Ms)\.\s*/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** The second copy of each row exists only to make the loop seamless, so it is
 *  hidden from assistive tech to keep every review from being read twice. */
function Card({ t, hidden }: { t: Testimonial; hidden: boolean }) {
  const { name, role } = splitByline(t.name);
  const text = t.title ? `${t.title} ${t.body}` : t.body;

  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[17rem] shrink-0 flex-col rounded-2xl border border-[#e8ebf0] bg-[#f3f5f7] p-5 sm:w-[19rem]"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 18"
        className="h-4 w-5"
        style={{ fill: CHAMPAGNE_DEEP }}
      >
        <path d="M0 18V10.4C0 4.6 3 1.1 9 0l1 2.6C6.8 3.5 5.3 5.4 5 8h4.6v10H0Zm13.4 0V10.4c0-5.8 3-9.3 9-10.4l1 2.6c-3.2.9-4.7 2.8-5 5.4H23v10h-9.6Z" />
      </svg>
      <blockquote
        className="mt-3 line-clamp-4 flex-1 text-[13.5px] leading-relaxed text-[#1a1a1a]"
        title={text.length > 180 ? text : undefined}
      >
        {text}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-semibold"
          style={{ backgroundColor: NAVY, color: CHAMPAGNE }}
        >
          {initials(name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-medium text-[#111]">{name}</span>
          <span className="block truncate text-[12px] text-[#8a8f98]">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
