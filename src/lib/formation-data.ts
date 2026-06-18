// Types du support de formation académique (rendu sur /formation, imprimable en PDF).
// Le contenu (FORMATION) est rédigé par l'atelier multi-agents « formation-curriculum ».

export interface FContenu { theme: string; points: string[] }
export interface FProcedure { titre: string; etapes: string[] }
export interface FAutoEval { question: string; reponse: string }

export interface FModule {
  code: string;
  titre: string;
  objectifs: string[];
  publicCible: string;
  contenu: FContenu[];
  procedures: FProcedure[];
  exercices: string[];
  autoEvaluation: FAutoEval[];
}

export interface FParcours {
  roleKey: string;
  roleName: string;
  objectif: string;
  modules: string[]; // codes M1..M11
  dureeEstimee: string;
}

export interface FSyllabus {
  intitule: string;
  presentation: string;
  publicCible: string;
  prerequis: string;
  dureeTotale: string;
  objectifsGeneraux: string[];
  modalitesPedagogiques: string[];
  modalitesEvaluation: string[];
  parcoursParRole: FParcours[];
}

export interface FQuestion {
  question: string;
  options: string[];
  bonneReponse: string;
  explication?: string;
}

export interface FGlossaire { terme: string; definition: string }

export interface FormationContent {
  syllabus: FSyllabus;
  modules: FModule[];
  glossaire: FGlossaire[];
  evaluationFinale: FQuestion[];
}

export { FORMATION } from "./formation-content";
