import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely. Combines `clsx` (conditional class composition)
 * with `tailwind-merge` (resolves conflicting Tailwind utilities — e.g. `p-2 p-4` → `p-4`).
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
