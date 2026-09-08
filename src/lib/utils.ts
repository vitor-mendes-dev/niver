import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper para caminhos de assets (funciona local e no GitHub Pages)
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.startsWith("/") ? path.slice(1) : path}`;
}
