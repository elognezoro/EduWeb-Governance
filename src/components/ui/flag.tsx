import { cn } from "@/lib/utils";

/**
 * Drapeau d'un pays rendu en SVG (fiable sur tous les OS — contrairement aux
 * emojis-drapeaux qui ne s'affichent pas sous Windows/Chrome).
 * Les SVG sont servis depuis /public/flags/{CODE}.svg.
 */
export function Flag({ code, className }: { code?: string | null; className?: string }) {
  const c = (code ?? "").toUpperCase();
  if (!c || c === "GLOBAL") {
    return (
      <span className={cn("inline-flex w-5 items-center justify-center leading-none", className)} aria-hidden>
        🌐
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${c}.svg`}
      alt=""
      aria-hidden
      className={cn("inline-block w-5 shrink-0 rounded-[2px] object-contain ring-1 ring-black/5", className)}
    />
  );
}
