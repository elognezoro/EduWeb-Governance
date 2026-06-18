import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { FORMATION } from "@/lib/formation-data";
import { FormationControls } from "./formation-controls";

export const metadata: Metadata = { title: "Support de formation — EduWeb Governance" };

const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 18mm 15mm 20mm; }
  html, body { background: #fff !important; }
  .fm-footer { position: fixed; bottom: 4mm; left: 0; right: 0; text-align: center; font-size: 8.5pt; color: #94a3b8; }
}
@media screen {
  .fm-doc { max-width: 900px; margin: 0 auto; padding: 1.5rem 1.25rem 5rem; }
  .fm-footer { display: none; }
}
`;

export default async function FormationPage() {
  await requireUser();
  const { syllabus: s, modules, glossaire, evaluationFinale } = FORMATION;

  return (
    <div className="min-h-screen bg-white text-ink">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <FormationControls />

      <article className="fm-doc">
        {/* ── Page de garde ───────────────────────────────────────────── */}
        <header className="flex min-h-[60vh] flex-col items-center justify-center break-after-page py-16 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="EduWeb Governance" className="mb-10 h-24 w-auto object-contain" />
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-700">Support de formation</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-institutional-900">
            {s.intitule || "EduWeb Governance — Formation des utilisateurs"}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">{s.presentation}</p>
          <div className="mt-12 space-y-1 text-sm text-slate-400">
            <p className="font-semibold text-slate-600">Plateforme nationale de gouvernance éducative</p>
            <p>Édition 2026 · Version 1.0</p>
          </div>
        </header>

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
