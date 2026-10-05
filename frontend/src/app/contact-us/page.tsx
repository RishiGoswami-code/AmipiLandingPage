import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT } from "@/components/nav/navigation";

export const metadata: Metadata = {
  title: "Contact Us — AMIPI",
  description:
    "Get in touch with AMIPI: 42 W 48th St, 15th Flr, New York, NY 10036. +1 (800) 530-2647, info@amipi.com.",
  alternates: { canonical: "/contact-us" },
};

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.186540021649!2d-73.98232778428664!3d40.75792174274127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258ff1d7bbd99%3A0xa9279991466ce8bd!2s42+W+48th+St+15th+Floor%2C+New+York%2C+NY+10036%2C+USA!5e0!3m2!1sen!2sin!4v1546522730869";

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 text-[#dfbf7b]">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 text-[15px] leading-relaxed text-foreground/75">
        <h3 className="text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
          {title}
        </h3>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

const link = "transition-colors hover:text-[#a47a35]";

export default function ContactPage() {
  return (
    <div className="bg-background px-6 pt-32 pb-20 sm:px-12 sm:pt-36 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className={KICKER}>Contact Us</p>
        <h1 className={`${SERIF} mt-3 text-4xl tracking-tight text-foreground sm:text-6xl`}>
          Get In Touch
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Location">
              <address className="not-italic">
                42 W 48th St, 15th Flr
                <br />
                New York, NY 10036
              </address>
            </InfoCard>
            <InfoCard icon={Phone} title="Contact Info">
              <a href="tel:+18005302647" className={`block ${link}`}>
                +1 (800) 530-2647
              </a>
              <a href="tel:+12123549700" className={`block ${link}`}>
                +1 (212) 354-9700
              </a>
              <a href="mailto:info@amipi.com" className={`flex items-center gap-1.5 ${link}`}>
                <Mail className="h-3.5 w-3.5" aria-hidden />
                info@amipi.com
              </a>
            </InfoCard>
            <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]">
              <h3 className="text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
                Follow Us On
              </h3>
              <div className="mt-3 flex gap-2">
                {CONTACT.socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-navy-900 hover:text-[#dfbf7b]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/[0.07]">
          <iframe
            src={MAP_EMBED}
            title="Map: 42 W 48th St, 15th Floor, New York"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-72 w-full border-0 sm:h-96"
          />
        </div>
      </div>
    </div>
  );
}
