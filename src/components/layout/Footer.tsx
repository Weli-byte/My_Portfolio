import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE_CONFIG.social.github, external: true },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, external: true },
  { label: "Twitter", href: SITE_CONFIG.social.twitter, external: true },
  { label: "Instagram", href: SITE_CONFIG.social.instagram, external: true },
  { label: "Email", href: `mailto:${SITE_CONFIG.email}`, external: false },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10" style={{ backgroundColor: '#0a0a0a' }}>
      <Container size="xl">
        <div className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-600">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  {...(link.external && {
                    target: "_blank",
                    rel: "me noopener noreferrer",
                  })}
                  className="text-sm text-gray-500 transition-colors hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
