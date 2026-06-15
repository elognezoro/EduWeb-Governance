"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Eye, Upload, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "@/components/ui/country-select";
import { importLegalTexts, type ImportRow } from "@/app/(app)/edulex/actions";

interface C { id: string; name: string; code: string }

function parseCSV(text: string): ImportRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return [];
  const delim = lines[0].includes("\t") ? "\t" : lines[0].includes(";") ? ";" : ",";
  const first = lines[0].toLowerCase();
  const start = first.includes("titre") || first.includes("title") ? 1 : 0;
  return lines.slice(start).map((line) => {
    const c = line.split(delim).map((x) => x.trim());
    return { title: c[0] ?? "", type: c[1] ?? "", officialNumber: c[2] ?? "", ministryCode: c[3] ?? "", sectorCode: c[4] ?? "", summary: c[5] ?? "" };
  }).filter((r) => r.title);
}

export function ImportForm({ countries, defaultCountryId }: { countries: C[]; defaultCountryId?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [countryId, setCountryId] = useState(defaultCountryId ?? countries[0]?.id ?? "");
  const [raw, setRaw] = useState("");
  const [rows, setRows] = useState<ImportRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ imported: number; skipped: number } | null>(null);

  function preview() {
    setError(null); setResult(null);
    const parsed = parseCSV(raw);
    if (!parsed.length) { setError("Aucune ligne valide détectée. Vérifiez le format."); setRows(null); return; }
    setRows(parsed);
  }

  function doImport() {
    if (!rows) return;
    setError(null);
    startTransition(async () => {
      const res = await importLegalTexts(countryId, rows);
      if (!res.ok) setError(res.error);
      else { setResult({ imported: res.imported, skipped: res.skipped }); setRows(null); setRaw(""); router.refresh(); }
    });
  }

  return (
    <div className="space-y-5">
      {error && <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600"><AlertCircle className="size-4 shrink-0" /> {error}</div>}

      {result && (
        <div className="flex items-center justify-between rounded-2xl border border-brand-200 bg-brand-50/60 px-4 py-3 text-sm">
          <span className="flex items-center gap-2 font-semibold text-brand-700"><CheckCircle2 className="size-4" /> {result.imported} texte(s) importé(s){result.skipped > 0 ? `, ${result.skipped} ignoré(s)` : ""} en V0.</span>
          <Link href="/edulex" className="font-semibold text-brand-700 hover:underline">Voir EduLex →</Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
        <div className="space-y-2">
          <Label>Pays d'affectation</Label>
          <CountrySelect value={countryId} onChange={setCountryId} countries={countries} placeholder="Pays" />
        </div>
        <div className="space-y-2">
          <Label>Données CSV / TSV collées</Label>
          <Textarea value={raw} onChange={(e) => { setRaw(e.target.value); setRows(null); }} className="min-h-40 font-mono text-xs" placeholder={"titre,type,numero,ministere,secteur,resume\nDécret portant organisation…,DEC,2026-010,MENA,EDU,Résumé…"} />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Colonnes attendues (dans l'ordre) : <strong>titre, type, numéro officiel, code ministère, code secteur, résumé</strong>. Séparateur virgule, point-virgule ou tabulation. La 1ʳᵉ ligne d'en-tête est détectée automatiquement. Les textes sont importés en <strong>V0 (non vérifié)</strong>.
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={preview} disabled={!raw.trim()}><Eye className="size-4" /> Prévisualiser</Button>
        {rows && <Button onClick={doImport} disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Importer {rows.length} ligne(s)</Button>}
      </div>

      {rows && (
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-4 py-2">Titre</th><th className="px-4 py-2">Type</th><th className="px-4 py-2">N°</th><th className="px-4 py-2">Min.</th><th className="px-4 py-2">Sect.</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.slice(0, 50).map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 font-medium text-ink">{r.title}</td>
                  <td className="px-4 py-2 text-slate-500">{r.type}</td>
                  <td className="px-4 py-2 text-slate-500">{r.officialNumber}</td>
                  <td className="px-4 py-2 text-slate-500">{r.ministryCode}</td>
                  <td className="px-4 py-2 text-slate-500">{r.sectorCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 50 && <p className="px-4 py-2 text-xs text-slate-400">… et {rows.length - 50} autre(s).</p>}
        </div>
      )}
    </div>
  );
}
