/**
 * Cross-cutting types used across modules.
 * Feature-specific types live inside their module.
 */

export type Theme = "light" | "dark";

export interface NavLink {
  label: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/* Content models — backed by MDX frontmatter                                  */
/* -------------------------------------------------------------------------- */

/** Project metadata (frontmatter only — no body). Cheap to load in lists. */
export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  techStack: readonly string[];
  github?: string;
  live?: string;
  date?: string; // ISO 8601
  featured?: boolean;
}

/** Full project including raw MDX body. Used on the detail page. */
export interface Project extends ProjectMeta {
  content: string;
}

/** Blog post metadata (frontmatter only). */
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  image?: string;
  tags?: readonly string[];
  author?: string;
}

/** Full post including raw MDX body. */
export interface Post extends PostMeta {
  content: string;
}
