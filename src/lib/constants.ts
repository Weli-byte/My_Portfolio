/**
 * Site-wide content and configuration.
 * Keep static, copy-style values here so components stay declarative.
 */

import { env } from "./env";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL || "https://veliparlak.com";

export const SITE_CONFIG = {
  name: "Veli Parlak",
  alias: "Weli",
  role: "Software Engineer / AI Developer",
  title: "Veli Parlak | Software Engineer",
  description:
    "Personal portfolio of Veli Parlak (Weli) — Software Engineer and AI Developer building thoughtful, performant products.",
  url: SITE_URL,
  locale: "en_US",
  email: "veliparlak84@gmail.com",
  social: {
    github: "https://github.com/Weli-byte",
    linkedin: "https://www.linkedin.com/in/veli-parlak-302b8231a/",
    twitter: "https://x.com/weli_46",
    twitterHandle: "@weli_46",
    instagram: "https://www.instagram.com/wveli_/",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
