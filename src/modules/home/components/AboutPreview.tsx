import Link from "next/link";

import { Section } from "@/components/ui/Section";

const HIGHLIGHTS = [
  {
    title: "Full-stack engineering",
    body: "TypeScript, Next.js, Node, and a strong feel for system design and data modeling.",
  },
  {
    title: "Product-minded",
    body: "I think about users, not just code. Performance, accessibility, and clarity ship together.",
  },
  {
    title: "Long-term code",
    body: "I write for the team that inherits it — clean architecture, tested boundaries, no surprises.",
  },
] as const;

export function AboutPreview() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A short introduction"
      description="I'm Veli — a software engineer who enjoys turning fuzzy problems into well-structured systems and shipping them with care."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-amber-500/25 hover:bg-white/[0.05]"
          >
            <h3 className="text-base font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/about"
          className="text-sm font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
        >
          More about me →
        </Link>
      </div>
    </Section>
  );
}
