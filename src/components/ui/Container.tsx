import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different HTML element. Defaults to `div`. */
  as?: ElementType;
  /** Maximum content width. Defaults to `lg` (1024px). */
  size?: ContainerSize;
  children: ReactNode;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

/**
 * Centers content with a responsive max-width and consistent horizontal padding.
 * Use this anywhere page content should respect the layout grid.
 */
export function Container({
  as: Component = "div",
  size = "lg",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
