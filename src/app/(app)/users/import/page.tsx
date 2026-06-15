import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserImport } from "@/components/users/user-import";

export const metadata: Metadata = { title: "Importer des utilisateurs" };

const COLUMNS: { name: string; req: boolean; desc: string }[] = [
  { name: "email", req: true, desc: "Adresse e-mail (identifiant unique)." },
  { name: "prenom", req: true, desc: "Prénom." },
  { name: "nom", req: true, desc: "Nom." },
  { name: "motdepasse", req: true, desc: "Mot de passe initial (8 caractères min.)." },
  { name: "roles", req: true, desc: "Clé(s) de rôle, séparées par « | » (ex. agent ou institution_admin|national_manager)." },
  { name: "telephone", req: false, desc: "Téléphone (facultatif)." },
  { name: "pays", req: false, desc: "Code ISO du pays (ex. CI, SN, FR)." },
  { name: "organisation", req: false, desc: "Nom exact de l'organisation." },
  { name: "structure", req: false, desc: "Nom exact de la structure." },
  { name: "ministere", req: false, desc: "Nom ou code du ministère." },
];

export default async function UsersImportPage() {
  const user = await requireUser();
  if (!hasPermission(user, "user:manage")) redirect("/users");

  const roles = await prisma.role.findMany({ orderBy: { name: "asc" }, select: { key: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/users" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux utilisateurs
      </Link>
      <PageHeader title="Importer des utilisateurs (CSV)" description="Enregistrez plusieurs comptes en une fois." icon={Upload} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card><CardContent className="p-6"><UserImport /></CardContent></Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Colonnes du fichier</CardTitle></CardHeader>
            <CardContent className="space-y-2.5">
              {COLUMNS.map((c) => (
                <div key={c.name} className="text-sm">
                  <p className="font-mono text-xs">
                    <span className="font-bold text-ink">{c.name}</span>
                    {c.req ? <span className="ml-1 text-danger-500">*</span> : <span className="ml-1 text-slate-400">(facultatif)</span>}
                  </p>
                  <p className="text-xs text-slate-500">{c.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Clés de rôle valides</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((r) => (
                  <span key={r.key} className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-700" title={r.name}>{r.key}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
