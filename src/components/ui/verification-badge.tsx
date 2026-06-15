import { ShieldCheck } from "lucide-react";
import { Badge } from "./badge";
import { VERIFICATION_LEVEL_MAP, metaOf } from "@/lib/enums";

/** Badge du niveau de vérification EduLex (V0 → V4) avec icône. */
export function VerificationBadge({ level }: { level: string | null | undefined }) {
  const meta = metaOf(VERIFICATION_LEVEL_MAP, level);
  return (
    <Badge tone={meta.tone} title={meta.description}>
      <ShieldCheck className="size-3.5" />
      {meta.label}
    </Badge>
  );
}
