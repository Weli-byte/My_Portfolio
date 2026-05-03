import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Anchor id (used for in-page navigation). */
  id?: string;
  /** Optional section eyebrow text shown above the title. */
  eyebrow?: string;
  /** Section heading. */
  title?: string;
  /** Short supporting paragraph rendered below the title. */
  description?: string;
  /** Render content unwrapped (no Container). */
  bare?: boolean;
  children: ReactNode;
}

/**
 * Vertical content section with consistent spacing and an optional header.
 * Uses the home screen amber/dark palette throughout.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  bare = false,
  className,
  children,
  ...rest
}: SectionProps) {
  const body = (
    <>
      {(eyebrow || title || description) && (
        <header className="mb-10 max-w-2xl sm:mb-14">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </>
  );

  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24 lg:py-28", className)}
      {...rest}
    >
      {bare ? body : <Container>{body}</Container>}
    </section>
  );
}
