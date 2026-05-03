import { Section } from "@/components/ui/Section";

export function PersonalStory() {
  return (
    <Section
      eyebrow="Story"
      title="How I got here"
      description="A short version of the path so far."
    >
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>
          I started writing code as a teenager — small games, throwaway
          scripts, and websites that didn&apos;t need to exist. What hooked
          me wasn&apos;t the tooling; it was the loop of imagining something
          and making it real, fast.
        </p>
        <p>
          I moved into web engineering professionally because the feedback
          loop is the tightest in software: change a line, refresh, watch it
          happen. Over the years I&apos;ve worked across the stack — frontend
          frameworks, API design, data modelling, deploy pipelines — and the
          part I keep coming back to is product engineering: shipping things
          end-to-end, owning the result, and learning from it.
        </p>
        <p>
          Lately I&apos;ve been focused on AI-driven products. Embeddings,
          retrieval, and LLM orchestration are reshaping what a small team
          can build, and I&apos;m more interested than ever in the systems
          that make these tools dependable rather than just impressive.
        </p>
      </div>
    </Section>
  );
}
