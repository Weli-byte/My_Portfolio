import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NeuralNetwork } from "@/components/ui/NeuralNetwork";
import { SITE_CONFIG } from "@/lib/constants";

import "./globals.css";

/* -------------------------------------------------------------------------- */
/* Fonts — self-hosted via next/font for zero CLS and automatic preload.       */
/* CSS variables flow into Tailwind's `font-sans` / `font-mono` utilities.     */
/* -------------------------------------------------------------------------- */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/* Site-wide metadata defaults. Per-page metadata merges over this.            */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "technology",
  keywords: [
    "Veli Parlak",
    "Weli",
    "Software Engineer",
    "AI Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    locale: SITE_CONFIG.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.social.twitterHandle,
    creator: SITE_CONFIG.social.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e16" },
  ],
};

/**
 * Pre-hydration script. Applies the saved theme (or system preference) to
 * <html> before React mounts so users never see a flash of the wrong theme.
 */
const themeBootstrapScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var mql = window.matchMedia('(prefers-color-scheme: dark)');
      var theme = stored === 'light' || stored === 'dark'
        ? stored
        : (mql.matches ? 'dark' : 'light');
      var root = document.documentElement;
      if (theme === 'dark') root.classList.add('dark');
      root.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body className="min-h-screen font-sans text-foreground antialiased" style={{ backgroundColor: "#0a0a0a" }}>
        {/* Neural network canvas — fixed at z-index 0 */}
        <NeuralNetwork />

        {/* Animated background — fixed behind all content */}
        <div className="animated-bg" aria-hidden="true">
          <div className="orb-mid" />
          <div className="grid-overlay" />
          {/* Subtle floating particles */}
          <span className="particle" style={{ width: 3, height: 3, left: "15%", animationDelay: "0s", animationDuration: "12s" }} />
          <span className="particle" style={{ width: 2, height: 2, left: "35%", animationDelay: "3s", animationDuration: "16s" }} />
          <span className="particle" style={{ width: 4, height: 4, left: "60%", animationDelay: "6s", animationDuration: "14s" }} />
          <span className="particle" style={{ width: 2, height: 2, left: "80%", animationDelay: "9s", animationDuration: "18s" }} />
          <span className="particle" style={{ width: 3, height: 3, left: "50%", animationDelay: "1.5s", animationDuration: "20s" }} />
        </div>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-amber-500 focus:px-3 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        <div className="page-content flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
