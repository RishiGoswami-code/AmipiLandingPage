"use client";

import type { ReactNode } from "react";

/**
 * A link to a page that does not exist yet (`UNBUILT`, navigation.ts), for
 * server components such as the footer. Same idea as NavMenu's
 * InertAwareLink: suppressing the click stops a bare "#" from jumping to the
 * top of the page and adding a history entry, while the link keeps its
 * styling until it points somewhere.
 */
export function InertLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href="#" onClick={(event) => event.preventDefault()} className={className}>
      {children}
    </a>
  );
}
