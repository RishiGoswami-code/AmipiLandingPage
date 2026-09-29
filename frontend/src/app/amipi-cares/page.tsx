import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Amipi Cares — AMIPI",
  description:
    "Amipi Cares is our philanthropic branch dedicated to helping those in need, with local and international organizations each year.",
};

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

type Initiative = {
  title: string;
  image: string;
  quote?: string;
  paragraphs: string[];
};

const INITIATIVES: Initiative[] = [
  {
    title: "George Mark Children's House",
    image: "children",
    paragraphs: [
      "The George Mark Children's House provides much-needed hospice care and respite care for children with life-threatening illnesses and their families. The organization's unique approach strives to achieve greater well-being and quality of life for children and their families. They make a substantial difference in the lives of the children and families that they serve, at significantly less cost than that of an acute care hospital facility.",
    ],
  },
  {
    title: "Feeding The Homeless",
    image: "homeless",
    paragraphs: [
      "Hunger is not an issue of charity. It is an issue of justice. Amipi has donated time and resources to feeding the homeless in NYC, through SEVA and the Midnight Run. In India, we work with multiple NGO’s to feed the homeless, especially those who have medical conditions.",
    ],
  },
  {
    title: "Alzheimer's",
    image: "alzieheimers",
    paragraphs: [
      "Amipi’s founder, Dr. Mahendra Mehta, passed away due to Alzemheirs. This disease is close to our hearts. Amipi seeks to provide support, services and education to individuals, families and caregivers affected by Alzheimer's disease and related dementias nationwide, and fund research for better treatment and a cure. We work with Alzheimer's centers in NY,USA and in India.",
    ],
  },
  {
    title: "Child Education",
    image: "child-edu",
    paragraphs: [
      "A Crisis in India :- Millions of children in India, especially those living below the poverty line in slum areas, drop out of school before they reach the secondary school level. There are various factors influencing students to drop out, including affordability, discrimination, child labor, and gender gaps.",
      "At Amipi, we work with non-profits toward uplifting underprivileged slum and tribal children who have dropped out of school and providing them with the support and resources to complete their education.",
    ],
  },
  {
    title: "Animal Welfare",
    image: "animal-welfare",
    quote:
      "“Until we extend our circle of compassion to all living things, humanity will not find peace.”",
    paragraphs: [
      "At Amipi, our team supports many different causes. From local charities, like the New Rochelle Animal Shelter to Panjrapoles in rural India. Examples of the animal welfare we have supported include, helping with building shelters and supporting animal VET care.",
    ],
  },
  {
    title: "Health Care",
    image: "healthcare",
    quote:
      "“Somewhere along the way, we must learn that there is nothing greater than to do something for others.” Martin Luther King Jr.",
    paragraphs: [
      "Amipi has worked in various sectors of healthcare. From funding a Kidney dialysis machines in remote villages of India, to equipment for child cancer patients at TATA hospital in mumbai, to supporting Hospice agencies in NY.",
    ],
  },
];

export default function AmipiCaresPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="px-6 pt-32 sm:px-12 sm:pt-36 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className={KICKER}>About Us</p>
          <h1 className={`${SERIF} mt-3 text-4xl font-normal tracking-tight text-foreground sm:text-6xl`}>
            Amipi Cares
          </h1>
          <Image
            src="/amipi-cares/image003.jpg"
            alt="Amipi Cares"
            width={1375}
            height={500}
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="mt-10 h-56 w-full rounded-2xl object-cover sm:h-auto"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={KICKER}>Our Story</p>
            <blockquote className={`${SERIF} mt-4 text-3xl leading-snug text-foreground sm:text-4xl`}>
              &ldquo;Helping others makes us grow stronger as individuals and as a team.&rdquo;
            </blockquote>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/70">
              Amipi Cares is our philanthropic branch dedicated to helping those in need. We
              collaborate with local and international organizations each year to donate our time,
              funds and resources. Below you will find a snapshot of our charitable initiatives and
              organizations we support.
            </p>
          </div>
          <Image
            src="/amipi-cares/img1.jpg"
            alt="Our Story"
            width={720}
            height={500}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-surface px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${SERIF} text-3xl text-foreground sm:text-5xl`}>What We Do</h2>
          <div className="mt-14 space-y-16 lg:space-y-24">
            {INITIATIVES.map(({ title, image, quote, paragraphs }, i) => (
              <article
                key={title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Image
                  src={`/amipi-cares/${image}.jpg`}
                  alt={title}
                  width={720}
                  height={500}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`w-full rounded-2xl object-cover ${i % 2 ? "lg:order-2" : ""}`}
                />
                <div>
                  <span className="block h-px w-10 bg-gold-500" />
                  <h3 className={`${SERIF} mt-5 text-3xl text-foreground`}>{title}</h3>
                  {quote && (
                    <p className={`${SERIF} mt-4 text-xl text-[#a47a35] italic`}>{quote}</p>
                  )}
                  {paragraphs.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-foreground/70">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-foreground/75">
          These are just snapshots of what we do &ndash; please inquire here to learn more:-{" "}
          <a href="mailto:shreya@amipi.com" className="text-[#a47a35] underline underline-offset-2">
            shreya@amipi.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
