import type { Metadata } from "next";
import { PillButton } from "@/components/ui/PillButton";

/* Replaces Next's default 404, which rendered unstyled and added a second
   <title> after the site's default one. Next adds noindex itself. */
export const metadata: Metadata = {
  title: "Page Not Found — AMIPI",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center bg-background px-6 pt-32 pb-24 text-center">
      <p className="text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase">404</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        This page could not be found
      </h1>
      <p className="mt-5 max-w-md text-foreground/65">
        The link may be out of date, or the page may not be on the new site yet.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <PillButton href="/" variant="brand" icon="arrow">
          Back to home
        </PillButton>
        <PillButton href="/contact-us" variant="outline">
          Contact us
        </PillButton>
      </div>
    </div>
  );
}
