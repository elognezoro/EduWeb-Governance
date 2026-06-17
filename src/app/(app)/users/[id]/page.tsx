import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, UserCog } from "lucide-react";
import { requireUser, hasPermission, fullName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserForm } from "@/components/users/user-form";
import { UserAdminActions } from "@/components/users/user-admin-actions";
import { PermissionDelegation } from "@/components/users/permission-delegation";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Utilisateur" };

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const me = await requireUser();
  if (!hasPermission(me, "user:manage")) redirect("/users");
  const { id } = await params;

  const [target, roles, organizations, structures, countries, ministries, permissions, managerRows] = await Promise.all([
    prisma.user.findUnique({ where: { id }, include: { roles: { include: { role: true } }, directPermissions: { select: { key: true } } } }),
    prisma.role.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, scope: true } }),
    prisma.organization.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.structure.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true } }),
    prisma.ministry.findMany({ orderBy: [{ country: { order: "asc" } }, { order: "asc" }, { name: "asc" }], select: { id: true, name: true } }),
    prisma.permission.findMany({ orderBy: [{ module: "asc" }, { action: "asc" }], select: { key: true, module: true, action: true, description: true } }),
    prisma.user.findMany({ where: { deletedAt: null, isActive: true, id: { not: id } }, orderBy: [{ lastName: "asc" }, { firstName: "asc" }], select: { id: true, firstName: true, lastName: true } }),
  ]);

  if (!target || target.deletedAt) notFound();
  const managers = managerRows.map((m) => ({ id: m.id, name: `${m.firstName} ${m.lastName}`.trim() }));

  return (
    <div className="space-y-6">
      <Link href="/users" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux utilisateurs
      </Link>

      <PageHeader
        title={fullName(target)}
        description={target.email}
        icon={UserCog}
        actions={<Badge tone={target.isActive ? "success" : "neutral"} dot>{target.isActive ? "Actif" : "Inactif"}</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Modifier le profil</CardTitle></CardHeader>
            <CardContent>
              <UserForm
                roles={roles}
                organizations={organizations}
                structures={structures}
                countries={countries}
                ministries={ministries}
                managers={managers}
                initial={{
                  id: target.id,
                  firstName: target.firstName,
                  lastName: target.lastName,
                  email: target.email,
                  phone: target.phone ?? "",
                  organizationId: target.organizationId,
                  structureId: target.structureId,
                  countryId: target.countryId,
                  ministryId: target.ministryId,
                  managerId: target.managerId,
                  roleIds: target.roles.map((r) => r.roleId),
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Administration</CardTitle></CardHeader>
            <CardContent>
              <UserAdminActions id={target.id} isActive={target.isActive} isSelf={target.id === me.id} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Délégation de droits</CardTitle></CardHeader>
            <CardContent>
              <PermissionDelegation userId={target.id} allPermissions={permissions} currentKeys={target.directPermissions.map((p) => p.key)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Activité du compte</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Créé le</span><span className="font-medium text-ink">{formatDate(target.createdAt)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Dernière connexion</span><span className="font-medium text-ink">{formatDate(target.lastLoginAt)}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
