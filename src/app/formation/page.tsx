import type { Metadata } from "next";
import { Monitor } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { FORMATION } from "@/lib/formation-data";
import { FormationControls } from "./formation-controls";

export const metadata: Metadata = { title: "Support de formation — EduWeb Governance" };

/** Schémas d'écran annotés (aperçus didactiques) pour les modules clés. */
const SCREEN_SCHEMAS: Record<string, { titre: string; navIndex: number; callouts: string[] }> = {
  M2: { titre: "Tableau de bord", navIndex: 1, callouts: ["Filtre Pays / subdivision (barre supérieure)", "Cartes d'indicateurs (KPI)", "Bouton « Nouvelle activité »", "Graphiques et activités récentes"] },
  M3: { titre: "Organisation & organigramme", navIndex: 0, callouts: ["Ministère / organisation : zone d'accueil (dépôt)", "Filtre Pays pour restreindre le périmètre", "Boutons « + Organisation » / « + Structure »", "Structure : déplacer, éditer, supprimer (super admin)"] },
  M5: { titre: "Activités", navIndex: 3, callouts: ["Navigation : module Activités", "Recherche et filtres par statut", "Bouton « Nouvelle activité »", "Liste des activités (Brouillon → Consolidé)"] },
  M6: { titre: "Validation hiérarchique", navIndex: 4, callouts: ["Navigation : module Validation", "Filtre de périmètre", "Bouton « Examiner »", "File des activités à statuer (« · à vous »)"] },
  M7: { titre: "Autorisations d'absence", navIndex: 2, callouts: ["Navigation : module Absences", "Réglage de la politique (congé, seuil)", "Demander / valider une absence", "Comptabilité par motif + alertes de seuil"] },
  M9: { titre: "Référentiel EduLex", navIndex: 0, callouts: ["Navigation : module EduLex", "Recherche de textes réglementaires", "Dépôt / import d'un texte", "Niveau de vérification V0 → V4 et confidentialité"] },
};

const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 24mm 15mm 20mm; }
  html, body { background: #fff !important; }
  .fm-runhead { position: fixed; top: 7mm; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between;
    font-size: 8.5pt; color: #475569; border-bottom: 0.5pt solid #cbd5e1; padding-bottom: 1.6mm; }
  .fm-runhead .fm-rh-left { display: flex; align-items: center; gap: 2mm; font-weight: 600; }
  .fm-runhead img { height: 6.5mm; width: auto; }
  .fm-footer { position: fixed; bottom: 7mm; left: 0; right: 0; text-align: center; font-size: 8pt; color: #94a3b8;
    border-top: 0.5pt solid #e2e8f0; padding-top: 1.6mm; }
}
@media screen {
  .fm-doc { max-width: 900px; margin: 0 auto; padding: 1.5rem 1.25rem 5rem; }
  .fm-runhead, .fm-footer { display: none; }
}
`;

export default async function FormationPage() {
  await requireUser();
  const { syllabus: s, modules, glossaire, evaluationFinale } = FORMATION;

  return (
    <div className="min-h-screen bg-white text-ink">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <FormationControls />

      {/* En-tête institutionnel répété à l'impression */}
      <div className="fm-runhead" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="fm-rh-left"><img src="/logo.png" alt="" /> EduWeb Governance</span>
        <span>Support de formation des utilisateurs</span>
      </div>

      <article className="fm-doc">
        {/* ── Page de garde ───────────────────────────────────────────── */}
        <header className="flex min-h-[80vh] flex-col break-after-page py-8">
          <div className="flex items-center justify-between border-b-2 border-institutional-900 pb-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="EduWeb Governance" className="h-12 w-auto object-contain" />
              <div>
                <p className="font-extrabold leading-tight text-institutional-900">EduWeb Governance</p>
                <p className="text-xs text-slate-500">Plateforme de gouvernance éducative</p>
              </div>
            </div>
            <p className="text-right text-[11px] font-bold uppercase leading-tight tracking-wider text-brand-700">Manuel de<br />formation des utilisateurs</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-700">Support de formation</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight text-institutional-900">
              {s.intitule || "EduWeb Governance — Formation des utilisateurs"}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500">{s.presentation}</p>
          </div>

          <div className="flex items-end justify-between border-t border-slate-200 pt-4 text-sm text-slate-400">
            <span className="font-semibold text-slate-600">Édition 2026 · Version 1.0</span>
            <span>Document à usage de formation</span>
          </div>
        </header>

        {/* ── Fiche de validation du document ─────────────────────────── */}
        <section className="break-after-page">
          <h2 className="mb-6 border-b-4 border-institutional-900 pb-2 text-2xl font-extrabold uppercase tracking-wide text-institutional-900">
            Fiche de validation du document
          </h2>

          <h4 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-brand-700">Suivi des versions</h4>
          <table className="mb-8 w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-600">
                <th className="border border-slate-200 px-3 py-2 font-bold">Version</th>
                <th className="border border-slate-200 px-3 py-2 font-bold">Date</th>
                <th className="border border-slate-200 px-3 py-2 font-bold">Objet de la révision</th>
                <th className="border border-slate-200 px-3 py-2 font-bold">Rédacteur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 px-3 py-2">1.0</td>
                <td className="border border-slate-200 px-3 py-2">2026</td>
                <td className="border border-slate-200 px-3 py-2">Création initiale du support de formation</td>
                <td className="border border-slate-200 px-3 py-2">Cellule EduWeb Governance</td>
              </tr>
              <tr><td className="border border-slate-200 px-3 py-5"></td><td className="border border-slate-200"></td><td className="border border-slate-200"></td><td className="border border-slate-200"></td></tr>
              <tr><td className="border border-slate-200 px-3 py-5"></td><td className="border border-slate-200"></td><td className="border border-slate-200"></td><td className="border border-slate-200"></td></tr>
            </tbody>
          </table>

          <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-brand-700">Validation</h4>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Établi par", "Vérifié par", "Approuvé par"].map((role) => (
              <div key={role} className="break-inside-avoid rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">{role}</p>
                <div className="mt-3 space-y-3 text-sm text-slate-500">
                  <p>Nom : <span className="inline-block min-w-[7rem] border-b border-dotted border-slate-400">&nbsp;</span></p>
                  <p>Fonction : <span className="inline-block min-w-[5rem] border-b border-dotted border-slate-400">&nbsp;</span></p>
                  <p>Date : <span className="inline-block min-w-[5rem] border-b border-dotted border-slate-400">&nbsp;</span></p>
                </div>
                <p className="mt-4 text-xs text-slate-400">Signature et cachet</p>
                <div className="mt-1 h-20 rounded-xl border border-dashed border-slate-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Syllabus ────────────────────────────────────────────────── */}
        <section className="break-before-page">
          <SectionTitle n="I" title="Syllabus" />
          <Definitions
            items={[
              ["Public cible", s.publicCible],
              ["Prérequis", s.prerequis],
              ["Durée totale", s.dureeTotale],
            ]}
          />
          <SubTitle>Objectifs généraux</SubTitle>
          <BulletList items={s.objectifsGeneraux} />
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <SubTitle>Modalités pédagogiques</SubTitle>
              <BulletList items={s.modalitesPedagogiques} />
            </div>
            <div>
              <SubTitle>Modalités d'évaluation</SubTitle>
              <BulletList items={s.modalitesEvaluation} />
            </div>
          </div>
        </section>

        {/* ── Table des matières ─────────────────────────────────────── */}
        <section className="break-before-page">
          <SectionTitle n="II" title="Table des matières" />
          <ol className="space-y-1.5 text-[15px]">
            <TocLine label="Syllabus" sub="I" />
            <TocLine label="Modules de formation" sub="III" />
            {modules.map((m) => (
              <li key={m.code} className="ml-6 flex gap-2 text-slate-600">
                <span className="font-bold text-brand-700">{m.code}</span> — {m.titre}
              </li>
            ))}
            <TocLine label="Parcours de formation par rôle" sub="IV" />
            <TocLine label="Glossaire" sub="V" />
            <TocLine label="Évaluation finale des acquis" sub="VI" />
          </ol>
        </section>

        {/* ── Modules ─────────────────────────────────────────────────── */}
        <section className="break-before-page">
          <SectionTitle n="III" title="Modules de formation" />
          <div className="space-y-12">
            {modules.map((m, idx) => (
              <div key={m.code} className={idx > 0 ? "break-before-page" : ""}>
                <div className="mb-4 flex items-baseline gap-3 border-b-2 border-brand-100 pb-2">
                  <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-sm font-extrabold text-white">{m.code}</span>
                  <h3 className="text-xl font-extrabold text-institutional-900">{m.titre}</h3>
                </div>
                <p className="mb-4 text-sm italic text-slate-500">Public concerné : {m.publicCible}</p>

                {SCREEN_SCHEMAS[m.code] && <ScreenSchema {...SCREEN_SCHEMAS[m.code]} />}

                <SubTitle>Objectifs pédagogiques</SubTitle>
                <BulletList items={m.objectifs} />

                <SubTitle>Contenu</SubTitle>
                <div className="space-y-3">
                  {m.contenu.map((c, i) => (
                    <div key={i} className="break-inside-avoid">
                      <p className="font-bold text-ink">{c.theme}</p>
                      <BulletList items={c.points} dense />
                    </div>
                  ))}
                </div>

                {m.procedures.length > 0 && (
                  <>
                    <SubTitle>Procédures pas à pas</SubTitle>
                    <div className="space-y-4">
                      {m.procedures.map((p, i) => (
                        <div key={i} className="break-inside-avoid">
                          <p className="font-bold text-institutional-900">{i + 1}. {p.titre}</p>
                          <ol className="ml-5 mt-1.5 list-decimal space-y-1 text-[15px] text-slate-700 marker:font-bold marker:text-brand-600">
                            {p.etapes.map((e, j) => <li key={j} className="pl-1">{e}</li>)}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {m.exercices.length > 0 && (
                  <div className="mt-5 break-inside-avoid rounded-2xl border border-gold-200 bg-gold-50/50 p-4">
                    <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-gold-600">Travaux pratiques</p>
                    <ol className="ml-5 list-decimal space-y-1.5 text-[15px] text-slate-700">
                      {m.exercices.map((e, i) => <li key={i} className="pl-1">{e}</li>)}
                    </ol>
                  </div>
                )}

                {m.autoEvaluation.length > 0 && (
                  <div className="mt-4 break-inside-avoid">
                    <SubTitle>Auto-évaluation</SubTitle>
                    <dl className="space-y-2.5">
                      {m.autoEvaluation.map((qa, i) => (
                        <div key={i} className="rounded-2xl bg-slate-50 p-3.5">
                          <dt className="font-semibold text-ink">{i + 1}. {qa.question}</dt>
                          <dd className="mt-1 text-[15px] text-slate-600">→ {qa.reponse}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Parcours par rôle ──────────────────────────────────────── */}
        <section className="break-before-page">
          <SectionTitle n="IV" title="Parcours de formation par rôle" />
          <p className="mb-5 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            À chaque rôle correspond un parcours recommandé. Le module M1 (Prise en main) est commun à tous.
          </p>
          <div className="space-y-3">
            {s.parcoursParRole.map((p) => (
              <div key={p.roleKey} className="break-inside-avoid rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-extrabold text-institutional-900">{p.roleName}</p>
                  <p className="text-xs font-semibold text-slate-400">{p.dureeEstimee}</p>
                </div>
                <p className="mt-1 text-[15px] text-slate-600">{p.objectif}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.modules.map((code) => (
                    <span key={code} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">{code}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Glossaire ──────────────────────────────────────────────── */}
        <section className="break-before-page">
          <SectionTitle n="V" title="Glossaire" />
          <dl className="space-y-3">
            {glossaire.map((g, i) => (
              <div key={i} className="break-inside-avoid border-b border-slate-100 pb-2.5">
                <dt className="font-bold text-institutional-900">{g.terme}</dt>
                <dd className="mt-0.5 text-[15px] leading-relaxed text-slate-600">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Évaluation finale ──────────────────────────────────────── */}
        <section className="break-before-page">
          <SectionTitle n="VI" title="Évaluation finale des acquis" />
          <p className="mb-5 max-w-3xl text-[15px] text-slate-600">Questionnaire à choix multiples. Le corrigé figure à la fin de cette section.</p>
          <ol className="space-y-4">
            {evaluationFinale.map((q, i) => (
              <li key={i} className="break-inside-avoid rounded-2xl border border-slate-200 p-4">
                <p className="font-bold text-ink">{i + 1}. {q.question}</p>
                <ul className="mt-2 space-y-1 text-[15px] text-slate-700">
                  {q.options.map((o, j) => (
                    <li key={j} className="flex gap-2"><span className="font-bold text-slate-400">{String.fromCharCode(97 + j)})</span> {o}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          {evaluationFinale.length > 0 && (
            <div className="mt-8 break-inside-avoid rounded-2xl bg-brand-50/60 p-5">
              <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-700">Corrigé</p>
              <ol className="space-y-1.5 text-[15px] text-slate-700">
                {evaluationFinale.map((q, i) => (
                  <li key={i}><span className="font-bold">{i + 1}.</span> {q.bonneReponse}{q.explication ? ` — ${q.explication}` : ""}</li>
                ))}
              </ol>
            </div>
          )}
        </section>

        <p className="mt-12 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
          EduWeb Governance — Support de formation des utilisateurs · Édition 2026 · Document généré depuis la plateforme.
        </p>
      </article>

      <p className="fm-footer">EduWeb Governance — Support de formation des utilisateurs</p>
    </div>
  );
}

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 border-b-4 border-institutional-900 pb-2">
      <span className="text-3xl font-extrabold text-brand-600">{n}.</span>
      <span className="text-2xl font-extrabold uppercase tracking-wide text-institutional-900">{title}</span>
    </h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-2 mt-5 text-sm font-extrabold uppercase tracking-wider text-brand-700">{children}</h4>;
}

function BulletList({ items, dense }: { items: string[]; dense?: boolean }) {
  return (
    <ul className={`ml-5 list-disc text-[15px] leading-relaxed text-slate-700 marker:text-brand-400 ${dense ? "space-y-0.5" : "space-y-1"}`}>
      {items.map((it, i) => <li key={i} className="pl-1">{it}</li>)}
    </ul>
  );
}

function Definitions({ items }: { items: [string, string][] }) {
  return (
    <dl className="mb-5 grid gap-3 sm:grid-cols-3">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{k}</dt>
          <dd className="mt-1 text-[15px] text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function TocLine({ label, sub }: { label: string; sub: string }) {
  return (
    <li className="flex gap-2 font-bold text-institutional-900">
      <span className="text-brand-600">{sub}.</span> {label}
    </li>
  );
}

/** Aperçu d'écran schématique (wireframe annoté) — illustration didactique d'un module. */
function ScreenSchema({ titre, navIndex, callouts }: { titre: string; navIndex: number; callouts: string[] }) {
  const navY = (i: number) => 80 + i * 36;
  const dots = [
    { x: 140, y: navY(navIndex) + 12 },
    { x: 576, y: 49 },
    { x: 652, y: 87 },
    { x: 188, y: 136 },
  ];
  const cs = callouts.slice(0, 4);
  return (
    <figure className="my-5 break-inside-avoid rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
      <figcaption className="mb-3 flex items-center gap-2 text-sm font-bold text-institutional-900">
        <Monitor className="size-4 text-brand-600" /> Aperçu de l'écran — {titre}
      </figcaption>
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_15rem]">
        <svg viewBox="0 0 680 400" className="w-full rounded-xl border border-slate-200 bg-white" role="img" aria-label={`Schéma de l'écran ${titre}`}>
          <circle cx="18" cy="16" r="3.5" fill="#cbd5e1" /><circle cx="30" cy="16" r="3.5" fill="#cbd5e1" /><circle cx="42" cy="16" r="3.5" fill="#cbd5e1" />
          <line x1="0" y1="30" x2="680" y2="30" stroke="#eef2f7" />
          <rect x="180" y="40" width="170" height="18" rx="9" fill="#f1f5f9" />
          <rect x="540" y="40" width="72" height="18" rx="9" fill="#ecfdf5" stroke="#a7f3d0" />
          <circle cx="640" cy="49" r="10" fill="#0f766e" />
          <rect x="0" y="30" width="148" height="370" fill="#f8fafc" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="16" y={navY(i)} width="118" height="24" rx="7" fill={i === navIndex ? "#ecfdf5" : "#eef2f7"} stroke={i === navIndex ? "#34d399" : "transparent"} />
          ))}
          <rect x="172" y="78" width="210" height="20" rx="6" fill="#e2e8f0" />
          <rect x="556" y="74" width="108" height="26" rx="11" fill="#047857" />
          <rect x="172" y="120" width="232" height="92" rx="12" fill="#ffffff" stroke="#e2e8f0" />
          <rect x="420" y="120" width="244" height="92" rx="12" fill="#ffffff" stroke="#e2e8f0" />
          <rect x="172" y="226" width="492" height="96" rx="12" fill="#ffffff" stroke="#e2e8f0" />
          <rect x="172" y="334" width="492" height="46" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
          {cs.map((_, i) => (
            <g key={i}>
              <circle cx={dots[i].x} cy={dots[i].y} r="11" fill="#047857" stroke="#fff" strokeWidth="2" />
              <text x={dots[i].x} y={dots[i].y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">{i + 1}</text>
            </g>
          ))}
        </svg>
        <ol className="space-y-1.5 text-[13px] leading-snug text-slate-600">
          {cs.map((c, i) => (
            <li key={i} className="flex gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">{i + 1}</span>
              {c}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 text-[11px] italic text-slate-400">Schéma indicatif de l'écran réel (les libellés et la disposition exacts peuvent varier).</p>
    </figure>
  );
}
