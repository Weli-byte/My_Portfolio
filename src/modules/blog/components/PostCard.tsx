import Link from "next/link";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/types";

interface PostCardProps {
  post: PostMeta;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-lg border border-border bg-background p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated",
        className,
      )}
    >
      <time
        dateTime={post.date}
        className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
      >
        {formatDate(post.date)}
      </time>

      <h2 className="mt-3 text-lg font-semibold text-foreground">
        <Link
          href={href}
          className="after:absolute after:inset-0 group-hover:text-primary"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      {post.tags && post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
