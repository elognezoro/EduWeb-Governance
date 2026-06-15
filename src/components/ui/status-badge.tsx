import { Badge } from "./badge";
import { metaOf, type OptionMeta } from "@/lib/enums";

/**
 * Affiche un statut métier sous forme de badge coloré à partir d'une table
 * de correspondance (ACTIVITY_STATUS_MAP, LEGAL_STATUS_MAP, …).
 */
export function StatusBadge({
  value,
  map,
  dot = true,
}: {
  value: string | null | undefined;
  map: Record<string, OptionMeta>;
  dot?: boolean;
}) {
  const meta = metaOf(map, value);
  return (
    <Badge tone={meta.tone} dot={dot}>
      {meta.label}
    </Badge>
  );
}
