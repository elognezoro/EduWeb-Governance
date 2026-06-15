import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind de manière intelligente (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formate une date en français lisible (ex. « 8 juin 2026 »). */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Initiales d'un nom (ex. « Awa Koné » → « AK »). */
export function initials(first?: string | null, last?: string | null): string {
  return `${(first?.[0] ?? "").toUpperCase()}${(last?.[0] ?? "").toUpperCase()}` || "?";
}

/** Formate un nombre avec séparateurs français. */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
