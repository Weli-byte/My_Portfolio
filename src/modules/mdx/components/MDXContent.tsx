import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  source: string;
  /** Extra classes for the wrapping `prose` container. */
  className?: string;
}

/**
 * Renders raw MDX as a React tree, server-side, inside a styled `prose`
 * container. All MDX compilation happens at build time when the parent route
 * uses `generateStaticParams`.
 */
export function MDXContent({ source, className }: MDXContentProps) {
  return (
    <article
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        className,
      )}
    >
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  );
}
