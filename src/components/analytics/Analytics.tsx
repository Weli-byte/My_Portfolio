import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

/**
 * Analytics gating.
 *
 * Loads GA4 + Hotjar only when:
 *   1. The build is `production` (NODE_ENV check)
 *   2. The corresponding env var is set
 *
 * Local development never sends data. Missing env vars in production fail
 * open silently — analytics are never blocking.
 */

import { env } from "@/lib/env";

const GA_ID = env.NEXT_PUBLIC_GA_ID;
const HOTJAR_ID = env.NEXT_PUBLIC_HOTJAR_ID;
const isProd = process.env.NODE_ENV === "production";

export function Analytics() {
  if (!isProd) return null;

  return (
    <>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {HOTJAR_ID && <HotjarScript hotjarId={HOTJAR_ID} />}
    </>
  );
}

/** Hotjar Tracking Code — official snippet, inlined and rendered after-interactive. */
function HotjarScript({ hotjarId }: { hotjarId: string }) {
  return (
    <Script id="hotjar-init" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${Number(hotjarId)},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
}
