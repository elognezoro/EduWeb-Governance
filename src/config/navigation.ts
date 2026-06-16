import {
  Home,
  LayoutDashboard,
  CalendarClock,
  Building2,
  Users,
  FileText,
  ClipboardList,
  CheckCircle2,
  FileBarChart,
  Scale,
  GraduationCap,
  Bell,
  Archive,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Badge éventuel (ex. EduLex international). */
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAVIGATION: NavGroup[] = [
  {
    title: "Pilotage",
    items: [
      { label: "Accueil", href: "/", icon: Home },
      { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
      { label: "Rendez-vous", href: "/rendez-vous", icon: CalendarClock },
    ],
  },
  {
    title: "Gouvernance",
    items: [
      { label: "Organisation", href: "/organization", icon: Building2 },
      { label: "Utilisateurs", href: "/users", icon: Users },
      { label: "Formulaires", href: "/forms", icon: FileText },
      { label: "Activités", href: "/activities", icon: ClipboardList },
      { label: "Validation", href: "/validation", icon: CheckCircle2 },
      { label: "Rapports", href: "/reports", icon: FileBarChart },
    ],
  },
  {
    title: "Référentiel réglementaire",
    items: [
      { label: "EduLex", href: "/edulex", icon: Scale, badge: "International" },
      { label: "EduLex Academy", href: "/academy", icon: GraduationCap },
    ],
  },
  {
    title: "Système",
    items: [
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Archives", href: "/archives", icon: Archive },
      { label: "Administration", href: "/admin", icon: Settings },
    ],
  },
];
