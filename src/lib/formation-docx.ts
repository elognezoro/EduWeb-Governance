import "server-only";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, Table, TableRow, TableCell, WidthType,
  Header, Footer, ImageRun, PageNumber, TableOfContents, BorderStyle,
} from "docx";
import { FORMATION } from "./formation-data";
import { FORMATION_LOGO_B64, FORMATION_LOGO_W, FORMATION_LOGO_H } from "./formation-logo";
import { SCREEN_SCHEMAS } from "./formation-screens";

const h1 = (t: string) => new Paragraph({ text: t, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 140 } });
const h2 = (t: string) => new Paragraph({ text: t, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 } });
const h3 = (t: string) => new Paragraph({ text: t, heading: HeadingLevel.HEADING_3, spacing: { before: 160, after: 60 } });

function p(text: string, opts: { bold?: boolean; italic?: boolean; indent?: number } = {}) {
  return new Paragraph({
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italic })],
    indent: opts.indent ? { left: opts.indent } : undefined,
    spacing: { after: 60 },
  });
}
const labeled = (label: string, text: string) =>
  new Paragraph({ children: [new TextRun({ text: `${label} : `, bold: true }), new TextRun({ text })], spacing: { after: 80 } });
const bullet = (text: string) => new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 30 } });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
const cell = (children: Paragraph[]) => new TableCell({ children, width: { size: 25, type: WidthType.PERCENTAGE } });

/** Construit le support de formation au format Word (.docx) à partir du contenu réel. */
export async function buildFormationDocx(): Promise<Buffer> {
  const { syllabus: s, modules, glossaire, evaluationFinale } = FORMATION;
  const c: (Paragraph | Table | TableOfContents)[] = [];

  // ── Page de garde ──
  c.push(new Paragraph({ text: "", spacing: { before: 2400 } }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EduWeb Governance", bold: true, size: 40 })] }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 }, children: [new TextRun({ text: "Support de formation des utilisateurs", size: 30, color: "047857" })] }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: s.intitule, bold: true, size: 26 })] }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s.presentation, italics: true })] }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 720 }, children: [new TextRun({ text: "Édition 2026 · Version 1.0 — Document à usage de formation" })] }));
  c.push(pageBreak());

  // ── Fiche de validation ──
  c.push(h1("Fiche de validation du document"));
  c.push(p("Suivi des versions", { bold: true }));
  c.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: ["Version", "Date", "Objet de la révision", "Rédacteur"].map((t) => cell([p(t, { bold: true })])) }),
      new TableRow({ children: ["1.0", "2026", "Création initiale du support de formation", "Cellule EduWeb Governance"].map((t) => cell([p(t)])) }),
      new TableRow({ children: ["", "", "", ""].map(() => cell([p(" ")])) }),
      new TableRow({ children: ["", "", "", ""].map(() => cell([p(" ")])) }),
    ],
  }));
  c.push(p(""));
  c.push(p("Validation", { bold: true }));
  for (const role of ["Établi par", "Vérifié par", "Approuvé par"]) {
    c.push(p(`${role} — Nom : ………………………  Fonction : ………………………  Date : ……………`));
    c.push(p("Signature et cachet : ……………………………………………………………", { indent: 240 }));
  }
  c.push(pageBreak());

  // ── Table des matières (champ Word, recalculé à l'ouverture) ──
  c.push(h1("Table des matières"));
  c.push(new TableOfContents("Sommaire", { hyperlink: true, headingStyleRange: "1-3" }));
  c.push(pageBreak());

  // ── I. Syllabus ──
  c.push(h1("I. Syllabus"));
  c.push(labeled("Public cible", s.publicCible));
  c.push(labeled("Prérequis", s.prerequis));
  c.push(labeled("Durée totale", s.dureeTotale));
  c.push(h2("Objectifs généraux"));
  s.objectifsGeneraux.forEach((o) => c.push(bullet(o)));
  c.push(h2("Modalités pédagogiques"));
  s.modalitesPedagogiques.forEach((o) => c.push(bullet(o)));
  c.push(h2("Modalités d'évaluation"));
  s.modalitesEvaluation.forEach((o) => c.push(bullet(o)));
  c.push(pageBreak());

  // ── II. Modules ──
  c.push(h1("II. Modules de formation"));
  modules.forEach((m, idx) => {
    if (idx > 0) c.push(pageBreak());
    c.push(h2(`${m.code} — ${m.titre}`));
    c.push(p(`Public concerné : ${m.publicCible}`, { italic: true }));
    const sc = SCREEN_SCHEMAS[m.code];
    if (sc) {
      c.push(p(`Aperçu de l'écran — ${sc.titre}`, { bold: true }));
      c.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 80, line: 360 },
        border: {
          top: { style: BorderStyle.DASHED, size: 6, color: "94A3B8", space: 12 },
          bottom: { style: BorderStyle.DASHED, size: 6, color: "94A3B8", space: 12 },
          left: { style: BorderStyle.DASHED, size: 6, color: "94A3B8", space: 12 },
          right: { style: BorderStyle.DASHED, size: 6, color: "94A3B8", space: 12 },
        },
        children: [
          new TextRun({ break: 1 }),
          new TextRun({ text: `[ Insérer ici la capture d'écran : ${sc.titre} ]`, italics: true, color: "64748B" }),
          new TextRun({ break: 1 }),
        ],
      }));
      c.push(p("Éléments à repérer sur cet écran :", { italic: true }));
      sc.callouts.forEach((co, i) => c.push(p(`${i + 1}. ${co}`, { indent: 360 })));
    }
    c.push(h3("Objectifs pédagogiques"));
    m.objectifs.forEach((o) => c.push(bullet(o)));
    c.push(h3("Contenu"));
    m.contenu.forEach((ct) => { c.push(p(ct.theme, { bold: true })); ct.points.forEach((pt) => c.push(bullet(pt))); });
    if (m.procedures.length) {
      c.push(h3("Procédures pas à pas"));
      m.procedures.forEach((pr, i) => { c.push(p(`${i + 1}. ${pr.titre}`, { bold: true })); pr.etapes.forEach((e, j) => c.push(p(`${j + 1}. ${e}`, { indent: 480 }))); });
    }
    if (m.exercices.length) {
      c.push(h3("Travaux pratiques"));
      m.exercices.forEach((e, i) => c.push(p(`${i + 1}. ${e}`)));
    }
    if (m.autoEvaluation.length) {
      c.push(h3("Auto-évaluation"));
      m.autoEvaluation.forEach((qa, i) => { c.push(p(`${i + 1}. ${qa.question}`, { bold: true })); c.push(p(`→ ${qa.reponse}`, { indent: 480 })); });
    }
  });
  c.push(pageBreak());

  // ── III. Parcours par rôle ──
  c.push(h1("III. Parcours de formation par rôle"));
  s.parcoursParRole.forEach((pr) => {
    c.push(p(`${pr.roleName}  (${pr.dureeEstimee})`, { bold: true }));
    c.push(p(pr.objectif));
    c.push(p(`Modules recommandés : ${pr.modules.join(", ")}`, { italic: true, indent: 240 }));
  });
  c.push(pageBreak());

  // ── IV. Glossaire ──
  c.push(h1("IV. Glossaire"));
  glossaire.forEach((g) => c.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${g.terme} : `, bold: true }), new TextRun({ text: g.definition })] })));
  c.push(pageBreak());

  // ── V. Évaluation finale ──
  c.push(h1("V. Évaluation finale des acquis"));
  evaluationFinale.forEach((q, i) => {
    c.push(p(`${i + 1}. ${q.question}`, { bold: true }));
    q.options.forEach((o, j) => c.push(p(`${String.fromCharCode(97 + j)}) ${o}`, { indent: 480 })));
  });
  c.push(h2("Corrigé"));
  evaluationFinale.forEach((q, i) => c.push(p(`${i + 1}. ${q.bonneReponse}${q.explication ? ` — ${q.explication}` : ""}`)));

  // En-tête avec logo + pied de page numéroté (sauf page de garde).
  const logoBuf = Buffer.from(FORMATION_LOGO_B64, "base64");
  const dispW = 110;
  const dispH = Math.round((dispW * FORMATION_LOGO_H) / FORMATION_LOGO_W);
  const headerWithLogo = new Header({
    children: [
      new Paragraph({
        spacing: { after: 40 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1", space: 4 } },
        children: [new ImageRun({ type: "png", data: logoBuf, transformation: { width: dispW, height: dispH } })],
      }),
    ],
  });
  const footerWithPage = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0", space: 4 } },
        children: [
          new TextRun({ text: "EduWeb Governance — Support de formation des utilisateurs     Page ", size: 16, color: "94A3B8" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "94A3B8" }),
        ],
      }),
    ],
  });
  const emptyHeader = new Header({ children: [new Paragraph({ text: "" })] });
  const emptyFooter = new Footer({ children: [new Paragraph({ text: "" })] });

  const doc = new Document({
    creator: "EduWeb Governance",
    title: "Support de formation des utilisateurs",
    description: "Support de formation académique — EduWeb Governance",
    features: { updateFields: true }, // Word recalcule la table des matières à l'ouverture
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{
      properties: { titlePage: true }, // page de garde sans en-tête/pied
      headers: { default: headerWithLogo, first: emptyHeader },
      footers: { default: footerWithPage, first: emptyFooter },
      children: c,
    }],
  });

  return Packer.toBuffer(doc);
}
