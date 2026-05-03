import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ProjectMeta } from "@/types";

interface ProjectCardProps {
  project: ProjectMeta;
  className?: string;
  /** Use H2 for list pages, H3 for previews. Defaults to H3. */
  headingLevel?: "h2" | "h3";
}

/**
 * Reusable project card — styled with the home screen dark/amber palette.
 * Click target spans the whole card via the title's `after:absolute inset-0` trick.
 */
export function ProjectCard({
  project,
  className,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300",
        "border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        "hover:border-amber-500/30 hover:bg-white/[0.05] hover:-translate-y-1",
        "shadow-[0_1px_3px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
        <Image
          src={project.image}
          alt={`${project.title} cover image`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] opacity-80 group-hover:opacity-100"
        />
        {/* Amber shimmer overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-lg font-semibold text-white">
          <Link
            href={href}
            className="after:absolute after:inset-0 group-hover:text-amber-400 transition-colors"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        {project.techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech} className="tech-badge">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View details</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </article>
  );
}
