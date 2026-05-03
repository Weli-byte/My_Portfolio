import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";

export function AboutHero() {
  return (
    <section className="border-b border-border/60">
      <Container size="md">
        <div className="py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            About
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-muted-foreground sm:text-xl">
            {SITE_CONFIG.role}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design and build software at the intersection of web platforms
            and applied AI. My focus is products that feel obvious to use and
            hold up well under real-world load.
          </p>
        </div>
      </Container>
    </section>
  );
}
