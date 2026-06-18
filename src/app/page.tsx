import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  GraduationCap,
  Building2,
  FileBarChart,
  Globe2,
  CheckCircle2,
  Trophy,
  Sparkles,
} from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { buttonVariants } from "@/components/ui/button";
import { VisitTracker } from "@/components/landing/visit-tracker";
import { LiveStats } from "@/components/landing/live-stats";
import { AcademyPromo } from "@/components/layout/academy-promo";
import { FloatingToc } from "@/components/layout/floating-toc";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Building2,
    title: "Gouvernance administrative",
    href: "/dashboard",
    text: "Structurez votre organisation, gérez les rôles et permissions, configurez des formulaires d'activités et sécurisez la validation hiérarchique.",
    points: ["Organigrammes & structures", "Workflows de validation tracés", "Rapports institutionnels"],
    tone: "brand",
  },
  {
    icon: Scale,
    title: "EduLex — référentiel international",
    href: "/edulex",
    text: "Centralisez, codifiez et vérifiez les textes officiels par pays, juridiction, ministère et secteur. EduLex CI n'est qu'une déclinaison nationale.",
    points: ["Filtre par pays (CI, SN, BJ, CM, FR…)", "Niveaux de vérification V0 → V4", "Moteur de recherche réglementaire"],
    tone: "info",
  },
  {
    icon: GraduationCap,
    title: "EduLex Academy",
    href: "/academy",
    text: "Apprenez les textes, comprenez vos droits et progressez par défis : parcours ludiques, quiz, XP, badges et niveaux de compétence.",
    points: ["Parcours progressifs (5 niveaux)", "Quiz reliés au texte source", "XP, badges & classements"],
    tone: "gold",
  },
];

const stats = [
  { value: "6", label: "Pays & juridictions" },
  { value: "V0–V4", label: "Niveaux de vérification" },
  { value: "5", label: "Niveaux de compétence" },
  { value: "RBAC", label: "Permissions fines" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <VisitTracker path="/" />
      <AcademyPromo />
      {/* Barre de navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-card/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Brand href="/" />
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <Link href="#produit" className="hover:text-ink">Produit</Link>
            <Link href="/edulex" className="hover:text-ink">EduLex</Link>
            <Link href="/academy" className="hover:text-ink">Academy</Link>
            <Link href="#contact" className="hover:text-ink">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Se connecter
            </Link>
            <Link href="/register" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      <main>
      {/* Hero — image plein cadre + voile vert */}
      <section className="relative overflow-hidden">
        {/* Image de fond */}
        <Image
          src="/hero-governance.webp"
          alt="Gouvernance institutionnelle — République de Côte d'Ivoire : textes officiels, organisation et tableaux de bord"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Voile vert dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/90 via-brand-800/86 to-brand-900/90" />

        {/* Contenu */}
        <div className="container relative flex flex-col items-center py-20 text-center text-white sm:py-28 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
            <Sparkles className="size-3.5" />
            Plateforme SaaS multi-organisation &amp; multi-pays
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Gouvernez vos activités, maîtrisez vos textes et générez vos rapports{" "}
            <span className="text-gold-300">automatiquement</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Structurez vos activités, sécurisez vos validations et appuyez-vous sur{" "}
            <strong className="font-bold text-white">EduLex</strong>, le référentiel réglementaire international.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "shadow-glow")}>
              Démarrer maintenant <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Trophy className="size-4 text-gold-300" /> Découvrir Academy
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-gold-300" /> Sources &amp; statuts affichés</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-gold-300" /> Validation humaine V0→V4</span>
            <span className="inline-flex items-center gap-1.5"><Globe2 className="size-4 text-gold-300" /> International par conception</span>
          </div>
        </div>
      </section>

      {/* Statistiques en temps réel */}
      <section id="stats" className="container pt-6 pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-institutional-900">La plateforme en temps réel</h2>
          <p className="mt-3 text-slate-600">
            Suivez la fréquentation et l'adoption d'EduWeb Governance — heure, jour, semaine, mois, année.
          </p>
        </div>
        <div className="mt-8">
          <LiveStats />
        </div>
      </section>

      {/* Bandeau statistiques */}
      <section className="border-y border-slate-100 bg-card">
        <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-700">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Piliers produit */}
      <section id="produit" className="container py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-institutional-900">
            Trois piliers, une seule plateforme
          </h2>
          <p className="mt-3 text-slate-600">
            De la gouvernance administrative au référentiel réglementaire, jusqu'à l'apprentissage citoyen.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-glow"
              >
                <span className={cn(
                  "flex size-12 items-center justify-center rounded-2xl",
                  p.tone === "brand" && "bg-brand-50 text-brand-700",
                  p.tone === "info" && "bg-institutional-50 text-institutional-700",
                  p.tone === "gold" && "bg-gold-100 text-gold-600"
                )}>
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-institutional-900 group-hover:text-brand-700">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="size-4 shrink-0 text-brand-600" /> {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Accéder à l'espace
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="container py-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-institutional-900 via-brand-800 to-brand-700 px-8 py-12 text-center text-white shadow-glow">
          <FileBarChart className="mx-auto size-10 opacity-90" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
            Structurez vos activités, sécurisez vos validations, générez vos rapports.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl opacity-85">
            Centraliser, codifier, vérifier et comprendre les textes officiels — avec EduLex et EduLex Academy.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-card px-6 py-3 text-sm font-bold text-brand-800 transition-transform hover:scale-[1.02]"
          >
            Accéder à la plateforme <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      </main>

      {/* Pied de page */}
      <footer id="contact" className="border-t border-slate-100 bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <Brand href="/" />
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} EduWeb Governance.
          </p>
        </div>
      </footer>

      <FloatingToc />
    </div>
  );
}
