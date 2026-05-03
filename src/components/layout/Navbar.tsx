"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setIsOpen(false), []);

  // Close mobile menu on route change.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10" style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(12px)' }}>
      <Container size="xl">
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between"
        >
          <Link
            href="/"
            className="text-base font-bold tracking-tight text-white transition-colors hover:text-amber-400"
            onClick={close}
          >
            {SITE_CONFIG.alias}
            <span className="text-amber-400">.</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-400 transition-colors hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400 focus-visible:outline-none"
            >
              <span aria-hidden className="text-sm">
                {theme === "dark" ? "☀" : "☾"}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400 focus-visible:outline-none md:hidden"
            >
              <HamburgerIcon open={isOpen} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-white/10 backdrop-blur transition-[max-height,opacity] duration-300 ease-in-out md:hidden",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}
      >
        <Container size="xl">
          <ul className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 transition-colors hover:bg-white/[0.04] hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}

/** Hamburger / close icon — pure CSS, no extra dep. */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="relative block h-4 w-5"
    >
      <span
        className={cn(
          "absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ease-smooth",
          open && "translate-y-[7px] rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300 ease-smooth",
          open && "-translate-y-[7px] -rotate-45",
        )}
      />
    </span>
  );
}
