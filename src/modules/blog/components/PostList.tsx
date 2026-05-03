import { cn } from "@/lib/utils";
import type { PostMeta } from "@/types";

import { PostCard } from "./PostCard";

interface PostListProps {
  posts: readonly PostMeta[];
  className?: string;
  emptyState?: React.ReactNode;
}

/** Single-column list optimised for scannability. */
export function PostList({ posts, className, emptyState }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
        {emptyState ?? "No posts yet."}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
