import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Veli Parlak — AI & ML engineer building production-grade systems at the intersection of intelligence and software.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="border-b border-border/60 bg-[#0a0a0a]">
      <Container size="md">
        <div className="py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
            About
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Veli Parlak
          </h1>
          <p className="mt-3 text-lg font-medium text-gray-400 sm:text-xl">
            AI &amp; ML Engineer | Software Developer
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-gray-400 sm:text-lg">
            <p>
              I build systems where artificial intelligence meets real-world execution. Currently a second-year Software Engineering student at Fırat University, but I do not measure progress in semesters — I measure it in shipped projects, working pipelines, and systems that solve actual problems.
            </p>
            <p>
              My path started with curiosity about how machines understand the world, and it quickly turned into an obsession with turning ideas into architecture. I do not stop at making models run locally. I build the API around them, design the fallback when they fail, and make sure the end user gets a result even when nothing goes according to plan.
            </p>
            <p>
              Right now, I am focused on AI, machine learning, NLP, computer vision, and audio processing — not as isolated experiments, but as integrated systems. I think in terms of pipelines, scalability, and real-world reliability. Every project I ship is designed to handle more than a demo. It is designed to handle reality.
            </p>
            <p>
              The goal is not to be good for my age. The goal is to be good, period. I am building toward operating at the top level globally — not someday, but continuously, project by project. Average was never the standard. Execution is.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
