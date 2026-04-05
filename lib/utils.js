import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine tailwind classes with conflict resolution.
 * @param inputs - any number of class-like values.
 * @returns string - the combined, conflict-free class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
