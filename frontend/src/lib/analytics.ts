/** GA4 Measurement ID ("G-XXXXXXXXXX"); analytics stays off until it is set. */
export const GA_ID = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID ?? "")
  ? process.env.NEXT_PUBLIC_GA_ID!
  : "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a Google Analytics event, e.g. track("generate_lead", { form: "meeting" }).
 * Safe to call anywhere in the browser: a no-op when analytics is off or blocked.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") window.gtag?.("event", event, params);
}
