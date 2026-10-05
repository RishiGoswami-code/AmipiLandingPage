"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

/** The page address, read in the browser; empty during server rendering. */
const noSubscribe = () => () => {};
const useHref = () =>
  useSyncExternalStore(noSubscribe, () => window.location.href, () => "");

const round =
  "grid h-9 w-9 place-items-center rounded-full transition-colors";

/**
 * The column of round share buttons beside the post. The page's own address
 * is read in the browser, so the links work on whatever domain the site is
 * served from without configuring one.
 */
export function ShareLinks({ title }: { title: string }) {
  const url = useHref();
  const [copied, setCopied] = useState(false);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsAppIcon },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (e.g. insecure context) - nothing to do.
    }
  }

  return (
    <ul aria-label="Share this post" className="flex gap-2.5 lg:flex-col">
      {targets.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={url ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`${round} bg-navy-900 text-[#dfbf7b] hover:bg-navy-700`}
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Link copied" : "Copy link"}
          className={`${round} border border-foreground/15 text-foreground/60 hover:border-navy-900 hover:text-navy-900`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        </button>
      </li>
    </ul>
  );
}
