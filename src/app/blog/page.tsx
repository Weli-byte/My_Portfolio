import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Engineering at the Edge — AI, ML, NLP, computer vision, audio processing, and the systems that make them real.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="border-b border-border/60 bg-[#0a0a0a]">
      <Container size="md">
        <div className="py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Engineering at the Edge
          </h1>

          <div className="mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-gray-400 sm:text-lg">
            <p>
              AI, ML, NLP, computer vision and audio processing — I don&apos;t just experiment, I build systems that solve real-world problems and push beyond the expected.
            </p>
            <p>
              I move fast, think deeply, and turn ideas into scalable, production-ready solutions. This space is where I break down how I think, how I build, and how I aim for the top — because average was never the goal.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
