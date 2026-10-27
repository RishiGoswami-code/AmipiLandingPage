import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NewsletterCard } from "./NewsletterCard";
import { italiana } from "@/styles/fonts";

const SHOP_LINKS = [
  { label: "Categories", href: "/categories" },
  { label: "Diamond Search", href: "/#collection" },
  { label: "New Arrivals", href: "/#collection" },
  { label: "Holiday Gift Guide", href: "/gift-guide" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Philosophy", href: "/philosophy" },
  { label: "Sell Your Diamonds", href: "/sell" },
  { label: "The Journal", href: "/blog" },
  { label: "Visit Us", href: "/contact-us" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-of-use" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping & Returns", href: "#" },
];

/**
 * Site footer — sits at the end of every page's content (wired up in
 * layout.tsx, inside the same SmoothScroll flow as {children} rather than
 * fixed, so it scrolls normally and only appears once you reach the
 * bottom). The newsletter card on the left, then the four-column link grid,
 * in the same "one fair price, no bull" voice as the rest of the site. The
 * copyright line lives in the partner strip below (PartnerMarquee). Behind
 * it all the AMIPI wordmark runs very large and very faint, as in the gift
 * guide's footer (GiftGuideConnect).
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-background px-6 pt-10 pb-6 sm:px-12 sm:pt-12 lg:px-20">
      {/* The wordmark in the background: the navbar's Italiana, as wide as
          the page and barely darker than the ground, so the columns over it
          read as clearly as without it */}
      <p
        aria-hidden
        className={`${italiana.className} pointer-events-none absolute inset-x-0 bottom-[-0.12em] -z-10 text-center text-[24vw] leading-none tracking-[0.06em] text-navy-900/[0.06] uppercase select-none`}
      >
        Amipi
      </p>
      <div className="grid w-full gap-12 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          <NewsletterCard />
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/amipi-logo.png"
              alt="AMIPI — Your favorite diamond guys"
              width={596}
              height={201}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-foreground/60">
              Wholesale diamonds and fine jewelry, priced fair and graded
              honest. No bull.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="tel:+18005302647"
                className="flex items-center gap-2.5 text-sm text-foreground/70 transition-colors hover:text-gold-500"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                (800) 530-2647
              </a>
              <a
                href="mailto:info@amipi.com"
                className="flex items-center gap-2.5 text-sm text-foreground/70 transition-colors hover:text-gold-500"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                info@amipi.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>
                  42 W 48th St, 15th Flr
                  <br />
                  New York, NY 10036
                </span>
              </div>
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-500 uppercase">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
