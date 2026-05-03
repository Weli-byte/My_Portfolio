import "server-only";

import { listSlugs, readAllContent, readContent } from "./mdx";
import type { Project, ProjectMeta } from "@/types";

const DIR = "projects";

/* -------------------------------------------------------------------------- */
/* Frontmatter parsing                                                         */
/* -------------------------------------------------------------------------- */

function parseString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function parseStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function parseDate(value: unknown): string | undefined {
  if (typeof value === "string" || value instanceof Date) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  }
  return undefined;
}

/**
 * Validates frontmatter and returns a typed metadata object, or `null` if
 * required fields are missing. Logs a warning so authors notice mistakes.
 */
function parseFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): ProjectMeta | null {
  const title = parseString(data.title);
  const description = parseString(data.description);
  const image = parseString(data.image);

  if (!title || !description || !image) {
    console.warn(
      `[projects] Skipping "${slug}" — missing required field(s): title, description, image`,
    );
    return null;
  }

  return {
    slug,
    title,
    description,
    image,
    techStack: parseStringArray(data.techStack ?? data.tech ?? data.stack),
    github: parseString(data.github),
    live: parseString(data.live),
    date: parseDate(data.date),
    featured: data.featured === true,
  };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

/** Returns every project slug — used for `generateStaticParams`. */
export function getAllProjectSlugs(): string[] {
  return listSlugs(DIR);
}

/** Returns project metadata for every project, sorted newest first. */
export function getAllProjects(): ProjectMeta[] {
  return readAllContent(DIR)
    .map((file) => parseFrontmatter(file.slug, file.data))
    .filter((meta): meta is ProjectMeta => meta !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/** Returns a single project (with body) or `null` if not found. */
export function getProjectBySlug(slug: string): Project | null {
  const file = readContent(DIR, slug);
  if (!file) return null;
  const meta = parseFrontmatter(slug, file.data);
  if (!meta) return null;
  return { ...meta, content: file.content };
}
