export const PROFILE_TYPES = ["perso", "ecole", "entreprise", "asso"] as const;
export type ProfileType = (typeof PROFILE_TYPES)[number];

type Periode = "semaine" | "quinzaine" | "mois";

export interface ProfileMeta {
  label: string;
  emoji: string;
  /** Terminologie du module « Activités » adaptée au type. */
  activityTitle: string;
  activityDesc: string;
  /** Période de bilan par défaut pour ce profil. */
  defaultPeriode: Periode;
}

export const PROFILE_META: Record<ProfileType, ProfileMeta> = {
  perso: {
    label: "Personnel",
    emoji: "🏠",
    activityTitle: "Mes tâches",
    activityDesc: "Vos tâches personnelles et leur suivi.",
    defaultPeriode: "semaine",
  },
  ecole: {
    label: "École",
    emoji: "🎓",
    activityTitle: "Séances & cours",
    activityDesc: "Vos séances, cours et activités pédagogiques.",
    defaultPeriode: "semaine",
  },
  entreprise: {
    label: "Entreprise",
    emoji: "🏢",
    activityTitle: "Missions",
    activityDesc: "Vos missions et leur validation hiérarchique.",
    defaultPeriode: "mois",
  },
  asso: {
    label: "Association",
    emoji: "🤝",
    activityTitle: "Actions",
    activityDesc: "Les actions de votre association et leur suivi.",
    defaultPeriode: "mois",
  },
};

export function profileMeta(type: string | null | undefined): ProfileMeta {
  return PROFILE_META[(type ?? "") as ProfileType] ?? PROFILE_META.perso;
}
