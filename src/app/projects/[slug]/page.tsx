import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { MDXContent } from "@/modules/mdx";

interface PageProps {
  params: { slug: string };
}

/** Static generation — all project pages are pre-rendered at build time. */
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.image,
    type: "article",
    publishedTime: project.date,
    tags: project.techStack,
  });
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <Container size="md" as="article">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-amber-400 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All projects
        </Link>

        <header className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">
            Project
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-base text-gray-400 sm:text-lg leading-relaxed">
            {project.description}
          </p>

          {project.techStack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="tech-badge">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {(project.github || project.live) && (
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 transition-colors"
                >
                  Live demo →
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 hover:border-amber-500/30 hover:text-amber-400 transition-all"
                >
                  Source on GitHub →
                </a>
              )}
            </div>
          )}
        </header>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <Image
            src={project.image}
            alt={`${project.title} cover image`}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="mt-12 prose prose-invert max-w-none prose-p:text-gray-400 prose-headings:text-white prose-strong:text-amber-400 prose-a:text-amber-400 prose-li:text-gray-400">
          <MDXContent source={project.content} />
        </div>
      </Container>
    </div>
  );
}
