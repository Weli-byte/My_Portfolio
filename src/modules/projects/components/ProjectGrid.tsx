import { cn } from "@/lib/utils";
import type { ProjectMeta } from "@/types";

import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: readonly ProjectMeta[];
  className?: string;
  headingLevel?: "h2" | "h3";
  /** Optional placeholder rendered when the list is empty. */
  emptyState?: React.ReactNode;
}

export function ProjectGrid({
  projects,
  className,
  headingLevel,
  emptyState,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
        {emptyState ?? "No projects yet."}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
