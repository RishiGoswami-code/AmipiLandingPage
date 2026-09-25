"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children everywhere except the listed routes. Lets the root
 * layout drop shared chrome (the footer) on single-screen pages like About
 * while the chrome itself stays a server component.
 */
export function HideOnRoutes({
  routes,
  children,
}: {
  routes: string[];
  children: React.ReactNode;
}) {
  return routes.includes(usePathname()) ? null : children;
}
