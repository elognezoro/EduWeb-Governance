"use client";

import { useState, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserTemplateButton } from "./user-template-button";
import { importUsers, type UserImportRow } from "@/app/(app)/users/actions";
import { cn } from "@/lib/utils";

const norm = (h: string) =>
  h.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");

const FIELD_BY_HEADER: Record<string, keyof UserImportRow> = {
  email: "email",
  prenom: "prenom", firstname: "prenom",
  nom: "nom", lastname: "nom",
  motdepasse: "motdepasse", password: "motdepasse", mdp: "motdepasse",
  roles: "roles", role: "roles",
  telephone: "telephone", phone: "telephone", tel: "telephone",
  pays: "pays", country: "pays",
  organisation: "organisation", organization: "organisation", org: "organisation",
  structure: "structure",
  ministere: "ministere", ministry: "ministere",
};

function parseCSV(text: string): { rows: UserImportRow[]; error?: string } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (!lines.length) return { rows: [], error: "Fichier vide." };
  const header = lines[0].replace(/^﻿/, "");
  const delim = header.split(";").length > header.split(",").length ? ";" : ",";
  const headers = header.split(delim).map(norm);
  const idx: Partial<Record<keyof UserImportRow, number>> = {};
  headers.forEach((h, i) => { const f = FIELD_BY_HEADER[h]; if (f && idx[f] === undefined) idx[f] = i; });
  if (idx.email === undefined) return { rows: [], error: "Colonne « email » introuvable dans l'en-tête. Utilisez le modèle CSV." };

  const get = (cells: string[], f: keyof UserImportRow) => (idx[f] !== undefined ? (cells[idx[f]!] ?? "").trim() : "");
  const rows = lines.slice(1).map((line) => {
    const c = line.split(delim);
    return {
      email: get(c, "email"), prenom: get(c, "prenom"), nom: get(c, "nom"), motdepasse: get(c, "motdepasse"),
      roles: get(c, "roles"), telephone: get(c, "telephone"), pays: get(c, "pays"),
      organisation: get(c, "organisation"), structure: get(c, "structure"), ministere: get(c, "ministere"),
    } as UserImportRow;
  }).filter((r) => r.email || r.prenom || r.nom);
  return { rows };
}

export function UserImport() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<UserImportRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ imported: number; skipped: number; errors: string[] } | null>(null);

  function handleFile(file: File) {
    setError(null); setResult(null); setRows(null);
    if (!/\.csv$/i.test(file.name) && file.type !== "text/csv") { setError("Veuillez déposer un fichier .csv."); return; }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const { rows, error } = parseCSV(String(reader.result));
      if (error) { setError(error); return; }
      if (!rows.length) { setError("Aucune ligne de données détectée sous l'en-tête."); return; }
      setRows(rows);
    };
    reader.readAsText(file, "utf-8");
  }

  function reset() { setRows(null); setFileName(null); setError(null); if (inputRef.current) inputRef.current.value = ""; }

  function doImport() {
    if (!rows) return;
    setError(null);
    startTransition(async () => {
      const res = await importUsers(rows);
      if (!res.ok) { setError(res.error); return; }
      setResult({ imported: res.imported, skipped: res.skipped, errors: res.errors });
      reset();
      router.refresh();
    });
  }

  return (
    <div className="space-y-5">
      {/* Zone de dépôt */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors",
          dragging ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-slate-50/60 hover:border-brand-300 hover:bg-brand-50/40"
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700"><UploadCloud className="size-7" /></span>
        <p className="mt-4 text-sm font-semibold text-ink">Glissez-déposez votre fichier CSV ici</p>
        <p className="mt-1 text-sm text-slate-500">ou cliquez pour parcourir vos fichiers</p>
        {fileName && (
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
            <FileSpreadsheet className="size-3.5 text-brand-700" /> {fileName}
            <button type="button" onClick={(e) => { e.stopPropagation(); reset(); }} className="text-slate-400 hover:text-danger-500"><X className="size-3.5" /></button>
          </span>
        )}
        <input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <UserTemplateButton />
        <span className="text-xs text-slate-400">Téléchargez le modèle, complétez-le, puis déposez-le ici.</span>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      {/* Résultat */}
      {result && (
        <div className="space-y-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-4">
          <p className="flex items-center gap-2 font-semibold text-brand-700">
            <CheckCircle2 className="size-5" /> {result.imported} utilisateur(s) importé(s){result.skipped > 0 ? `, ${result.skipped} ignoré(s)` : ""}.
          </p>
          {result.errors.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-xl bg-card p-3 text-xs text-danger-600">
              {result.errors.map((e, i) => <p key={i}>• {e}</p>)}
            </div>
          )}
          <Link href="/users" className="inline-block text-sm font-semibold text-brand-700 hover:underline">Voir la liste des utilisateurs →</Link>
        </div>
      )}

      {/* Prévisualisation */}
      {rows && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">{rows.length} ligne(s) détectée(s)</p>
            <Button onClick={doImport} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Importer {rows.length} utilisateur(s)
            </Button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-2">E-mail</th><th className="px-4 py-2">Prénom</th><th className="px-4 py-2">Nom</th><th className="px-4 py-2">Rôles</th><th className="px-4 py-2">Pays</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.slice(0, 50).map((r, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-medium text-ink">{r.email}</td>
                    <td className="px-4 py-2 text-slate-500">{r.prenom}</td>
                    <td className="px-4 py-2 text-slate-500">{r.nom}</td>
                    <td className="px-4 py-2 text-slate-500">{r.roles}</td>
                    <td className="px-4 py-2 text-slate-500">{r.pays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 50 && <p className="px-4 py-2 text-xs text-slate-400">… et {rows.length - 50} autre(s).</p>}
          </div>
        </div>
      )}
    </div>
  );
}
