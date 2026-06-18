import type { Metadata } from "next";
import { Settings, ShieldCheck, Users, Globe2, Scale, Database, GitBranch, Clock } from "lucide-react";
import { requireUser, roleKeys, hasPermission, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getValidationHierarchy } from "@/lib/validation-hierarchy";
import { getInactivityTimeoutMinutes } from "@/lib/app-settings";
import { ValidationHierarchyEditor } from "@/components/admin/validation-hierarchy";
import { InactivityTimeoutForm } from "@/components/admin/inactivity-timeout-form";

export const metadata: Metadata = { title: "Administration" };

export default async function AdminPage() {
  const user = await requireUser();
  const roles = roleKeys(user);
  const canManage = isSuperAdmin(user) || hasPermission(user, "admin:manage") || hasPermission(user, "organization:manage");

  const [users, countries, roleCount, permCount, texts, govRoles, hierarchy, inactivityTimeout] = await Promise.all([
    prisma.user.count(),
    prisma.country.count(),
    prisma.role.count(),
    prisma.permission.count(),
    prisma.legalText.count(),
    prisma.role.findMany({ where: { scope: "GOVERNANCE" }, orderBy: { name: "asc" }, select: { key: true, name: true } }),
    getValidationHierarchy(),
    getInactivityTimeoutMinutes(),
  ]);

  const stats = [
    { icon: Users, label: "Utilisateurs", value: users },
    { icon: Globe2, label: "Pays", value: countries },
    { icon: ShieldCheck, label: "Rôles", value: roleCount },
    { icon: Database, label: "Permissions", value: permCount },
    { icon: Scale, label: "Textes EduLex", value: texts },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Administration"
        description="Configuration de la plateforme, RBAC et paramètres système."
        icon={Settings}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 p-5">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-institutional-900">{s.value}</p>
                  <p className="text-xs font-medium text-slate-500">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {canManage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="size-4 text-brand-700" /> Hiérarchie de validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ValidationHierarchyEditor levels={hierarchy} governanceRoles={govRoles} />
          </CardContent>
        </Card>
      )}

      {isSuperAdmin(user) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4 text-brand-700" /> Sécurité des sessions — déconnexion automatique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InactivityTimeoutForm current={inactivityTimeout} />
          </CardContent>
        </Card>
      )}

      <div className="rounded-3xl border border-slate-100 bg-card p-6 shadow-card">
        <p className="text-sm font-bold text-institutional-900">Vos rôles</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {roles.length ? (
            roles.map((r) => (
              <span key={r} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {r}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">Aucun rôle attribué.</span>
          )}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          La gestion fine du RBAC, des pays, ministères et secteurs sera disponible dans les
          prochaines phases. Le socle (modèle de données, rôles système, permissions) est déjà en place.
        </p>
      </div>
    </div>
  );
}
