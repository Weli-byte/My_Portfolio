import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { getAllProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { ProjectGrid } from "@/modules/projects";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected work and case studies by Veli Parlak — software engineering and AI development.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <Container size="lg">
        {/* Page header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Projects
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Selected Work
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Things I&apos;ve designed and built. Each entry links to a deeper write-up.
          </p>
        </div>

        <ProjectGrid projects={projects} headingLevel="h2" />
      </Container>
    </div>
  );
}
