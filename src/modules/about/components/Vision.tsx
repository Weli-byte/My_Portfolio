import Link from "next/link";

import { Section } from "@/components/ui/Section";

const GOALS = [
  {
    title: "Build durable products",
    body: "Software that earns trust by getting the boring parts right — performance, reliability, and clarity.",
  },
  {
    title: "Apply AI well",
    body: "Use modern models where they actually help, with grounded retrieval and honest uncertainty — not magic for its own sake.",
  },
  {
    title: "Mentor and write",
    body: "Share what I learn. Good engineering compounds when it's documented and taught, not hoarded.",
  },
] as const;

export function Vision() {
  return (
    <Section
      eyebrow="Vision"
      title="Where I'm headed"
      description="The work I want to keep doing — and the kind of teams I want to build it with."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {GOALS.map((goal) => (
          <div
            key={goal.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-amber-500/25 hover:bg-white/[0.05]"
          >
            <h3 className="text-base font-semibold text-white">
              {goal.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {goal.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-white sm:text-2xl">
          Looking for someone who builds like this?
        </h3>
        <p className="mt-2 max-w-xl text-sm text-gray-400 sm:text-base">
          I&apos;m open to interesting work. Send a note — I usually reply
          within a day or two.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
        >
          Get in touch →
        </Link>
      </div>
    </Section>
  );
}
