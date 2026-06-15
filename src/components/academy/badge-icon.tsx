import { Award, ShieldCheck, Scale, ClipboardCheck, Landmark, Briefcase, BadgeCheck, Eye, Globe2, type LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  ShieldCheck, Scale, ClipboardCheck, Landmark, Briefcase, BadgeCheck, Eye, Globe2,
};

export function BadgeIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = (name && MAP[name]) || Award;
  return <Icon className={className} />;
}
