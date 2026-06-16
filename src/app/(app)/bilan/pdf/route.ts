import { prisma } from "@/lib/prisma";
import { requireUser, fullName } from "@/lib/auth";
import { getBilan, normalizePeriode } from "@/lib/bilan";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const CP1252_EXTRA = "’‘“”–—…«»€‚ƒ„†‡ˆ‰Š‹ŒŽ•™š›œžŸ";
function pdfSafe(s: string): string {
  return [...(s || "")]
    .filter((ch) => {
      const c = ch.charCodeAt(0);
      return c === 9 || c === 10 || c === 13 || (c >= 32 && c <= 255) || CP1252_EXTRA.includes(ch);
    })
    .join("");
}

const fmtDate = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
const fmtDay = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

export async function GET(req: Request) {
  const user = await requireUser();
  const periode = normalizePeriode(new URL(req.url).searchParams.get("periode") ?? undefined);
  const b = await getBilan(prisma, user.id, periode);

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const brand = rgb(0.016, 0.47, 0.34);
  const ink = rgb(0.13, 0.16, 0.22);
  const grey = rgb(0.45, 0.5, 0.56);

  let page = doc.addPage([595, 842]);
  const margin = 50;
  const right = 595 - margin;
  let y = 800;

  const line = (text: string, opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb>; gap?: number } = {}) => {
    const size = opts.size ?? 11;
    if (y < margin + 24) { page = doc.addPage([595, 842]); y = 800; }
    page.drawText(pdfSafe(text), { x: margin, y, size, font: opts.bold ? bold : font, color: opts.color ?? ink });
    y -= opts.gap ?? size + 6;
  };

  line("Bilan d'activite — EduWeb Governance", { size: 18, bold: true, color: brand, gap: 26 });
  line(`${fullName(user)}  ·  ${b.label}`, { size: 11, color: grey, gap: 14 });
  line(`Genere le ${fmtDay.format(new Date())}`, { size: 9, color: grey, gap: 22 });

  // Taux de réalisation + barre
  line(`Taux de realisation : ${b.percent}%   (${b.done} / ${b.total} realise(s))`, { size: 13, bold: true, gap: 14 });
  const barW = right - margin, barH = 10;
  page.drawRectangle({ x: margin, y: y - 2, width: barW, height: barH, color: rgb(0.9, 0.92, 0.95) });
  page.drawRectangle({ x: margin, y: y - 2, width: (barW * b.percent) / 100, height: barH, color: brand });
  y -= 30;

  line(`Rendez-vous honores : ${b.rdv.done} / ${b.rdv.total}`, { size: 11, gap: 16 });
  line(`Activites validees : ${b.activites.done} / ${b.activites.total}`, { size: 11, gap: 24 });

  const section = (titre: string, items: typeof b.items) => {
    line(`${titre} (${items.length})`, { size: 12, bold: true, color: brand, gap: 16 });
    if (items.length === 0) { line("Rien sur la periode.", { size: 10, color: grey, gap: 18 }); return; }
    for (const it of items) {
      line(`- ${it.title}`, { size: 10.5, gap: 13 });
      line(`    ${it.detail} · ${fmtDate.format(it.when)}`, { size: 9, color: grey, gap: 15 });
    }
    y -= 6;
  };

  section("Realises", b.items.filter((i) => i.done));
  section("Non realises", b.items.filter((i) => !i.done));

  const bytes = await doc.save();
  return new Response(new Uint8Array(bytes), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="bilan-${periode}.pdf"` },
  });
}
