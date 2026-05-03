import "server-only";

import { listSlugs, readAllContent, readContent } from "./mdx";
import type { Post, PostMeta } from "@/types";

const DIR = "blog";

function parseString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function parseStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

function parseDate(value: unknown): string | undefined {
  if (typeof value === "string" || value instanceof Date) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  }
  return undefined;
}

function parseFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): PostMeta | null {
  const title = parseString(data.title);
  const description = parseString(data.description);
  const date = parseDate(data.date);

  if (!title || !description || !date) {
    console.warn(
      `[blog] Skipping "${slug}" — missing required field(s): title, description, date`,
    );
    return null;
  }

  return {
    slug,
    title,
    description,
    date,
    image: parseString(data.image),
    tags: parseStringArray(data.tags),
    author: parseString(data.author) ?? "Veli Parlak",
  };
}

export function getAllPostSlugs(): string[] {
  return listSlugs(DIR);
}

/** Posts sorted newest first by `date`. */
export function getAllPosts(): PostMeta[] {
  return readAllContent(DIR)
    .map((file) => parseFrontmatter(file.slug, file.data))
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const file = readContent(DIR, slug);
  if (!file) return null;
  const meta = parseFrontmatter(slug, file.data);
  if (!meta) return null;
  return { ...meta, content: file.content };
}
