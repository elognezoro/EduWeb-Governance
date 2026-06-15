"use client";

import { SearchSelect } from "./search-select";
import { Flag } from "./flag";

export interface CountryOpt { id: string; name: string; code: string; namespace?: string | null }

/** Liste déroulante de pays, recherchable, avec le drapeau de chaque pays. */
export function CountrySelect({
  countries,
  value,
  onChange,
  id,
  emptyLabel,
  placeholder = "— Sélectionner un pays —",
}: {
  countries: CountryOpt[];
  value: string;
  onChange: (v: string) => void;
  id?: string;
  /** Libellé de l'entrée « vide » (ex. « Tous les pays »). Omettre pour rendre le choix obligatoire. */
  emptyLabel?: string;
  placeholder?: string;
}) {
  return (
    <SearchSelect
      id={id}
      value={value}
      onChange={onChange}
      emptyLabel={emptyLabel}
      placeholder={placeholder}
      searchPlaceholder="Rechercher un pays…"
      options={countries.map((c) => ({
        value: c.id,
        // Libellé homogène : « EduLex CI (Côte d'Ivoire) » ; pays sans déclinaison → nom seul.
        label: c.namespace ? `${c.namespace} (${c.name})` : c.name,
        leading: <Flag code={c.code} className="w-5" />,
      }))}
    />
  );
}
