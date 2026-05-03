import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * Filesystem-level MDX/Markdown reader.
 * The only module in the codebase that touches `fs` for content. Domain
 * modules (projects, blog) consume it so swapping to a CMS later is a
 * single-file change.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

const VALID_EXTENSIONS = [".mdx", ".md"] as const;

export interface ContentFile {
  slug: string;
  data: Record<string, unknown>;
  content: string;
}

function isContentFile(name: string): boolean {
  return VALID_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function stripExtension(name: string): string {
  return name.replace(/\.(mdx|md)$/, "");
}

/** List slugs for every content file in `content/<dir>`. */
export function listSlugs(dir: string): string[] {
  const fullDir = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir).filter(isContentFile).map(stripExtension);
}

/** Read a single content file by directory + slug. */
export function readContent(dir: string, slug: string): ContentFile | null {
  const fullDir = path.join(CONTENT_ROOT, dir);
  for (const ext of VALID_EXTENSIONS) {
    const filePath = path.join(fullDir, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    }
  }
  return null;
}

/** Read every file in a directory. Returns `[]` if the directory is missing. */
export function readAllContent(dir: string): ContentFile[] {
  return listSlugs(dir)
    .map((slug) => readContent(dir, slug))
    .filter((file): file is ContentFile => file !== null);
}
