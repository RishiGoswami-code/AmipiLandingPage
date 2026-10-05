"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children everywhere except the listed routes. Lets the root
 * layout drop shared chrome (the footer) on single-screen pages like About
 * while the chrome itself stays a server component. `prefixes` hides it under
 * a whole section too (the Sanity Studio lives at /studio/...).
 */
export function HideOnRoutes({
  routes = [],
  prefixes = [],
  children,
}: {
  routes?: string[];
  prefixes?: string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hidden =
    routes.includes(pathname) ||
    prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return hidden ? null : children;
}
