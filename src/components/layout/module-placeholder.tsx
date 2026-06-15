import * as React from "react";
import { Hammer } from "lucide-react";
import { PageHeader } from "./page-header";
import { EmptyState } from "@/components/ui/empty-state";

/**
 * Page « module à venir » : présente un module prévu mais non encore implémenté
 * (les phases ultérieures du plan de développement le compléteront).
 */
export function ModulePlaceholder({
  title,
  description,
  icon,
  phase,
  features,
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  phase: string;
  features: string[];
}) {
  return (
    <div className="space-y-7">
      <PageHeader title={title} description={description} icon={icon} />
      <EmptyState
        icon={Hammer}
        title={`Module en cours de construction · ${phase}`}
        description="Le socle technique est en place. Ce module sera activé dans une phase ultérieure du plan de développement."
      />
      <div className="rounded-3xl border border-slate-100 bg-card p-6 shadow-card">
        <p className="text-sm font-bold text-institutional-900">Fonctionnalités prévues</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="size-1.5 rounded-full bg-brand-500" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
