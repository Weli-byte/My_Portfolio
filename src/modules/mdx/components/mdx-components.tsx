import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Custom MDX component map. Anything not overridden falls through to the
 * default HTML element styled by the `prose` class on the wrapping container.
 */

function MDXAnchor({
  href = "",
  children,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={cn("text-primary", className)}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-primary", className)}
      {...rest}
    >
      {children}
    </a>
  );
}

function MDXImage({
  src,
  alt = "",
  width,
  height,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={Number(width) || 1200}
      height={Number(height) || 630}
      className="rounded-lg border border-border"
      {...(rest as Partial<ImageProps>)}
    />
  );
}

export const mdxComponents = {
  a: MDXAnchor,
  img: MDXImage,
};
