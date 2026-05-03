import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/lib/constants";

/**
 * Default OpenGraph image — generated once at build via next/og.
 * Pages can override by exporting their own `opengraph-image.tsx` or by
 * passing an `image` to `buildMetadata`.
 */

export const runtime = "edge";
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #0a0e16 0%, #1c2e75 55%, #1f47e6 100%)",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.6,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {SITE_CONFIG.alias}
          <span style={{ color: "#5a8bff" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {SITE_CONFIG.name}
        </div>
        <div
          style={{
            fontSize: 36,
            marginTop: 24,
            opacity: 0.85,
          }}
        >
          {SITE_CONFIG.role}
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: "auto",
            opacity: 0.55,
          }}
        >
          {SITE_CONFIG.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
