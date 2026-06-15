"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEMPLATE =
  "email,prenom,nom,motdepasse,roles,telephone,pays,organisation,structure,ministere\n" +
  "awa.kone@exemple.ci,Awa,Koné,MotDePasse123,agent,+225 0102030405,CI,Ministère de démonstration,Service de la Formation Continue,\n" +
  "jean.brou@exemple.ci,Jean,Brou,MotDePasse123,institution_admin|national_manager,,CI,Ministère de démonstration,,\n";

export function UserTemplateButton({ variant = "outline" as const }: { variant?: "outline" | "ghost" }) {
  function download() {
    // BOM (﻿) pour qu'Excel lise correctement les accents en UTF-8.
    const blob = new Blob(["﻿" + TEMPLATE], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modele-import-utilisateurs.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <Button type="button" variant={variant} size="sm" onClick={download}>
      <Download className="size-4" /> Modèle CSV
    </Button>
  );
}
