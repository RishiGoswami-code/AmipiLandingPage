import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const SHOP_LINKS = [
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Diamond Search", href: "/#collection" },
  { label: "New Arrivals", href: "/#collection" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Philosophy", href: "/philosophy" },
  { label: "Sell Your Diamonds", href: "/sell-your-diamonds" },
  { label: "The Journal", href: "/blog" },
  { label: "Visit Us", href: "/contact" },
  { label: "FAQs", href: "/#faq" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Shipping & Returns", href: "#" },
];

/**
 * Site footer — sits at the end of every page's content (wired up in
 * layout.tsx, inside the same SmoothScroll flow as {children} rather than
 * fixed, so it scrolls normally and only appears once you reach the
 * bottom). Four-column link grid over navy-950, same "one fair price, no
 * bull" voice as the rest of the site, closed out with a copyright bar.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-ice-100/10 bg-navy-950 px-6 pt-16 pb-8 sm:px-12 sm:pt-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/amipi-logo.png"
              alt="AMIPI — Your favorite diamond guys"
              width={596}
              height={201}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-ice-100/60">
              Wholesale diamonds and fine jewelry, priced fair and graded
              honest. No bull.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="tel:+18005302647"
                className="flex items-center gap-2.5 text-sm text-ice-100/70 transition-colors hover:text-gold-500"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                (800) 530-2647
              </a>
              <a
                href="mailto:info@amipi.com"
                className="flex items-center gap-2.5 text-sm text-ice-100/70 transition-colors hover:text-gold-500"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                info@amipi.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-ice-100/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                42 W 48th St, New York, NY
              </div>
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ice-100/10 pt-6 sm:flex-row">
          <p className="text-xs text-ice-100/40">
            &copy; {new Date().getFullYear()} AMIPI. All rights reserved.
          </p>
          <p className="text-xs tracking-[0.2em] text-ice-100/40 uppercase">
            Celebrating 50 Years Of AMIPI
          </p>
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
              className="text-sm text-ice-100/60 transition-colors hover:text-ice-100"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
