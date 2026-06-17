import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { currentMinistryWhere } from "@/lib/government";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { UserForm } from "@/components/users/user-form";

export const metadata: Metadata = { title: "Nouvel utilisateur" };

export default async function NewUserPage() {
  const user = await requireUser();
  if (!hasPermission(user, "user:manage")) redirect("/users");

  const minWhere = await currentMinistryWhere(prisma);
  const [roles, organizations, structures, countries, ministries, managerRows] = await Promise.all([
    prisma.role.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, scope: true } }),
    prisma.organization.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.structure.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true } }),
    prisma.ministry.findMany({ where: minWhere, orderBy: [{ country: { order: "asc" } }, { order: "asc" }, { name: "asc" }], select: { id: true, name: true } }),
    prisma.user.findMany({ where: { deletedAt: null, isActive: true }, orderBy: [{ lastName: "asc" }, { firstName: "asc" }], select: { id: true, firstName: true, lastName: true } }),
  ]);
  const managers = managerRows.map((m) => ({ id: m.id, name: `${m.firstName} ${m.lastName}`.trim() }));

  return (
    <div className="space-y-6">
      <Link href="/users" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux utilisateurs
      </Link>
      <PageHeader title="Nouvel utilisateur" description="Créez un compte et attribuez ses rôles." icon={UserPlus} />
      <Card>
        <CardContent className="p-6">
          <UserForm roles={roles} organizations={organizations} structures={structures} countries={countries} ministries={ministries} managers={managers} />
        </CardContent>
      </Card>
    </div>
  );
}
