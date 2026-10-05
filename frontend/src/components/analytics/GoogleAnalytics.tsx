import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_ID is set, so local
 * and preview builds without the ID send no data. Page views on client-side
 * navigation are picked up by GA4's own "browser history" measurement (on by
 * default in Enhanced measurement), so no route listener is needed here.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
