import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo officiel EduWeb Governance.
 * L'image contient déjà l'emblème ET le nom ; on l'affiche en entier (object-contain),
 * à une hauteur lisible et responsive, pour que tous les détails soient nets.
 */
export function Brand({
  href = "/dashboard",
  compact = false,
  className,
}: {
  href?: string;
  /** Version réduite (barre supérieure) */
  compact?: boolean;
  /** Classes supplémentaires appliquées à l'image (ex. hauteur sur la page de connexion) */
  className?: string;
}) {
  return (
    <Link href={href} className="inline-flex items-center" aria-label="EduWeb Governance">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="EduWeb Governance"
        className={cn(
          "w-auto shrink-0 object-contain",
          compact ? "h-8 sm:h-9" : "h-10 sm:h-12",
          className
        )}
      />
    </Link>
  );
}
