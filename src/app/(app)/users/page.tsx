import type { Metadata } from "next";
import Link from "next/link";
import { Users, Plus, Search, Upload } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { UsersTable } from "@/components/users/users-table";
import { UserTemplateButton } from "@/components/users/user-template-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Utilisateurs" };

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await requireUser();
  const { q } = await searchParams;
  const canManage = hasPermission(user, "user:manage");

  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
      ...(user.organizationId && !hasPermission(user, "admin:manage") ? { organizationId: user.organizationId } : {}),
      ...(q
        ? { OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }, { email: { contains: q } }] }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { roles: { include: { role: true } }, structure: true, organization: true },
    take: 200,
  });

  const rows = users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    isActive: u.isActive,
    roles: u.roles.map((r) => r.role.name),
    structure: u.structure?.name ?? u.organization?.name ?? null,
  }));

  return (
    <div className="space-y-7">
      <PageHeader
        title="Utilisateurs"
        description="Comptes, rôles et rattachements."
        icon={Users}
        actions={
          canManage && (
            <div className="flex flex-wrap items-center gap-2">
              <UserTemplateButton variant="ghost" />
              <Link href="/users/import" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                <Upload className="size-4" /> Importer (CSV)
              </Link>
              <Link href="/users/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
                <Plus className="size-4" /> Nouvel utilisateur
              </Link>
            </div>
          )
        }
      />

      <form action="/users" className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input name="q" defaultValue={q ?? ""} placeholder="Rechercher un utilisateur…" className="h-10 w-full rounded-2xl border border-slate-200 bg-card pl-10 pr-4 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
      </form>

      {rows.length ? (
        <UsersTable users={rows} currentUserId={user.id} />
      ) : (
        <EmptyState
          icon={Users}
          title={q ? "Aucun utilisateur ne correspond" : "Aucun utilisateur"}
          description={q ? "Essayez une autre recherche." : "Créez le premier compte ou importez un fichier CSV."}
        />
      )}
    </div>
  );
}
