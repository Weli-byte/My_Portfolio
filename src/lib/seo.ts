import type { Metadata } from "next";

import { SITE_CONFIG } from "./constants";

/**
 * Page-level metadata builder.
 *
 * The root layout owns metadataBase, title.template, and global defaults.
 * Pages call `buildMetadata(...)` to get a consistent canonical URL plus
 * page-scoped OpenGraph/Twitter blocks. Anything not provided falls back to
 * site-wide defaults via Next.js's metadata merging.
 */

export interface PageMetadataInput {
  /** Page title — passed through the `%s — Veli Parlak` template in layout. */
  title?: string;
  /** Page description, used in <meta>, OG, and Twitter cards. */
  description?: string;
  /** Path relative to the site root, e.g. `/about`. Used for canonical + OG url. */
  path: string;
  /** Optional cover image (absolute URL or site-relative path). */
  image?: string;
  /** OpenGraph type — `article` for blog/project detail pages, `website` for the rest. */
  type?: "website" | "article";
  /** Article publication time (ISO 8601). */
  publishedTime?: string;
  /** Article authors. */
  authors?: readonly string[];
  /** Article tags / keywords. */
  tags?: readonly string[];
  /** Override robots indexing for a specific page. */
  noIndex?: boolean;
}

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

export function buildMetadata(input: PageMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const description = input.description ?? SITE_CONFIG.description;
  const image = absoluteUrl(input.image ?? "/opengraph-image");
  const type = input.type ?? "website";

  return {
    title: input.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: input.title ?? SITE_CONFIG.title,
      description,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(type === "article" && {
        publishedTime: input.publishedTime,
        authors: input.authors ? Array.from(input.authors) : undefined,
        tags: input.tags ? Array.from(input.tags) : undefined,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title ?? SITE_CONFIG.title,
      description,
      images: [image],
      site: SITE_CONFIG.social.twitterHandle,
      creator: SITE_CONFIG.social.twitterHandle,
    },
    keywords: input.tags ? Array.from(input.tags) : undefined,
    ...(input.noIndex && { robots: { index: false, follow: false } }),
  };
}
