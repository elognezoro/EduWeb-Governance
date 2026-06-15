import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { LEGAL_STATUS_MAP, LEGAL_TYPE_MAP, VERIFICATION_LEVEL_MAP, metaOf } from "@/lib/enums";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/** Garde uniquement les caractères encodables en WinAnsi (CP1252) par pdf-lib. */
const CP1252_EXTRA = "’‘“”–—…«»€‚ƒ„†‡ˆ‰Š‹ŒŽ•™š›œžŸ";
function pdfSafe(s: string): string {
  return [...(s || "")]
    .filter((ch) => {
      const c = ch.charCodeAt(0);
      return c === 9 || c === 10 || c === 13 || (c >= 32 && c <= 255) || CP1252_EXTRA.includes(ch);
    })
    .join("");
}

/** Télécharge une fiche du texte réglementaire : ?format=pdf (par défaut) ou ?format=md. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  const format = new URL(req.url).searchParams.get("format") === "md" ? "md" : "pdf";

  const t = await prisma.legalText.findUnique({
    where: { id },
    include: { country: true, category: true, ministry: true, sector: true, tags: true },
  });
  if (!t || t.deletedAt) return new Response("Texte introuvable.", { status: 404 });

  const fmt = (d: Date | null) => (d ? new Date(d).toISOString().slice(0, 10) : "—");
  const country = t.country.namespace || t.country.name;
  const fields: [string, string][] = [
    ["Code EduLex", t.code],
    ["Référence officielle", t.officialNumber || "—"],
    ["Type", metaOf(LEGAL_TYPE_MAP, t.type).label],
    ["Statut", metaOf(LEGAL_STATUS_MAP, t.status).label],
    ["Niveau de vérification", metaOf(VERIFICATION_LEVEL_MAP, t.verificationLevel).label],
    ["Pays", country],
    ["Catégorie", t.category?.name || "—"],
    ["Ministère / organisme", t.ministry?.name || "—"],
    ["Secteur", t.sector?.name || "—"],
    ["Signature", fmt(t.signatureDate)],
    ["Entrée en vigueur", fmt(t.effectiveDate)],
    ["Publication", fmt(t.publicationDate)],
  ];
  if (t.tags.length) fields.push(["Mots-clés", t.tags.map((x) => x.name).join(", ")]);
  const disclaimer = t.verificationLevel === "V0" ? "Donnée non vérifiée (V0)." : "Texte vérifié.";

  // ── Markdown ──────────────────────────────────────────────────────────────
  if (format === "md") {
    const lines = [
      `# ${t.title}`, ``,
      ...fields.map(([k, v]) => `- **${k}** : ${v}`),
      ``, `## Objet / Résumé`, ``, t.summary || "_(non renseigné)_", ``,
      t.sourceUrl ? `## Source officielle\n\n${t.sourceUrl}` : null,
      ``, `---`, `Fiche EduWeb Governance — EduLex. ${disclaimer} À confirmer auprès du Journal Officiel / SGG.`,
    ].filter((l): l is string => l !== null);
    return new Response(lines.join("\n"), {
      headers: { "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="${t.code}.md"` },
    });
  }

  // ── PDF ───────────────────────────────────────────────────────────────────
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const A4: [number, number] = [595.28, 841.89];
  const margin = 56;
  const maxW = A4[0] - margin * 2;
  let page = doc.addPage(A4);
  let y = A4[1] - margin;

  const newPageIfNeeded = (h: number) => { if (y - h < margin) { page = doc.addPage(A4); y = A4[1] - margin; } };
  const wrap = (text: string, f: typeof font, size: number): string[] => {
    const out: string[] = [];
    for (const para of pdfSafe(text).split("\n")) {
      const words = para.split(/\s+/).filter(Boolean);
      let cur = "";
      for (const w of words) {
        const test = cur ? `${cur} ${w}` : w;
        if (f.widthOfTextAtSize(test, size) > maxW && cur) { out.push(cur); cur = w; } else cur = test;
      }
      out.push(cur);
    }
    return out;
  };
  const draw = (text: string, { size = 11, f = font, gap = 1.45, color = rgb(0.13, 0.15, 0.2) } = {}) => {
    for (const ln of wrap(text, f, size)) {
      newPageIfNeeded(size * gap);
      page.drawText(ln, { x: margin, y, size, font: f, color });
      y -= size * gap;
    }
  };

  draw(t.title, { size: 17, f: bold });
  y -= 6;
  page.drawLine({ start: { x: margin, y }, end: { x: A4[0] - margin, y }, thickness: 1, color: rgb(0.85, 0.87, 0.9) });
  y -= 16;
  for (const [k, v] of fields) {
    newPageIfNeeded(16);
    const label = pdfSafe(`${k} : `);
    page.drawText(label, { x: margin, y, size: 11, font: bold, color: rgb(0.3, 0.33, 0.4) });
    const offset = bold.widthOfTextAtSize(label, 11);
    const valLines = wrap(v, font, 11);
    page.drawText(valLines[0] ?? "", { x: margin + offset, y, size: 11, font, color: rgb(0.13, 0.15, 0.2) });
    y -= 11 * 1.45;
    for (const extra of valLines.slice(1)) { newPageIfNeeded(16); page.drawText(extra, { x: margin + offset, y, size: 11, font }); y -= 11 * 1.45; }
  }
  y -= 10;
  draw("Objet / Résumé", { size: 12, f: bold, color: rgb(0.06, 0.46, 0.43) });
  y -= 2;
  draw(t.summary || "(non renseigné)", { size: 11 });
  if (t.sourceUrl) { y -= 8; draw("Source officielle", { size: 12, f: bold, color: rgb(0.06, 0.46, 0.43) }); draw(t.sourceUrl, { size: 10, color: rgb(0.11, 0.31, 0.85) }); }
  y -= 16;
  newPageIfNeeded(20);
  page.drawText(pdfSafe(`Fiche EduWeb Governance — EduLex. ${disclaimer} À confirmer auprès du Journal Officiel / SGG.`), { x: margin, y, size: 8, font, color: rgb(0.5, 0.53, 0.6) });

  const bytes = await doc.save();
  // Recopie dans un Uint8Array adossé à un ArrayBuffer concret (compatibilité du type BodyInit).
  return new Response(new Uint8Array(bytes), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${t.code}.pdf"` },
  });
}
