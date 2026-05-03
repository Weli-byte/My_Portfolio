import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/modules/projects";

const PREVIEW_COUNT = 3;

/**
 * Server component — reads from the projects data layer at build time.
 * No hardcoded list; adding a new MDX file in `content/projects` updates this.
 */
export function ProjectsPreview() {
  const projects = getAllProjects().slice(0, PREVIEW_COUNT);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A handful of recent things I've built. The full list — including write-ups — lives on the projects page."
    >
      <ProjectGrid projects={projects} />

      <div className="mt-10">
        <Link
          href="/projects"
          className="text-sm font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
        >
          View all projects →
        </Link>
      </div>
    </Section>
  );
}
