"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { writeAudit } from "@/lib/audit";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const baseSchema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis."),
  lastName: z.string().trim().min(1, "Nom requis."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z.string().trim().optional(),
  organizationId: z.string().optional(),
  structureId: z.string().optional(),
  countryId: z.string().optional(),
  ministryId: z.string().optional(),
  managerId: z.string().optional(),
  gender: z.string().optional(),
  roleIds: z.array(z.string()).min(1, "Sélectionnez au moins un rôle."),
});

function cleanGender(v?: string): "M" | "F" | undefined {
  return v === "M" || v === "F" ? v : undefined;
}

export type UserInput = z.infer<typeof baseSchema> & { password?: string };

function clean(v?: string) {
  return v && v.length > 0 ? v : undefined;
}

async function guard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!hasPermission(user, "user:manage")) return { user, error: "Permission requise (user:manage)." as const };
  return { user, error: null };
}

export async function createUser(input: UserInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };

  const parsed = baseSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  if (!input.password || input.password.length < 8)
    return { ok: false, error: "Un mot de passe d'au moins 8 caractères est requis." };

  const email = d.email.toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { ok: false, error: "Un utilisateur avec cet e-mail existe déjà." };

  const gender = cleanGender(d.gender);
  if (!gender) return { ok: false, error: "Le genre est requis (Homme ou Femme)." };

  // Supérieur : explicite, sinon pré-rempli depuis le responsable de la structure.
  let managerId = clean(d.managerId);
  if (!managerId && clean(d.structureId)) {
    const str = await prisma.structure.findUnique({ where: { id: d.structureId! }, select: { managerId: true } });
    managerId = str?.managerId ?? undefined;
  }

  const created = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(input.password),
      firstName: d.firstName,
      lastName: d.lastName,
      phone: clean(d.phone),
      organizationId: clean(d.organizationId),
      structureId: clean(d.structureId),
      countryId: clean(d.countryId),
      ministryId: clean(d.ministryId),
      managerId,
      gender,
      roles: { create: d.roleIds.map((roleId) => ({ roleId })) },
    },
  });

  await writeAudit({ userId: g.user!.id, action: "create", module: "user", entityType: "User", entityId: created.id });
  revalidatePath("/users");
  redirect(`/users/${created.id}`);
}

export async function updateUser(id: string, input: UserInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };

  const parsed = baseSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return { ok: false, error: "Utilisateur introuvable." };

  const email = d.email.toLowerCase();
  if (email !== target.email) {
    const dup = await prisma.user.findUnique({ where: { email } });
    if (dup) return { ok: false, error: "Cet e-mail est déjà utilisé." };
  }

  const gender = cleanGender(d.gender);
  if (!gender) return { ok: false, error: "Le genre est requis (Homme ou Femme)." };

  const managerId = clean(d.managerId) ?? null;
  if (managerId === id) return { ok: false, error: "Un agent ne peut pas être son propre supérieur hiérarchique." };

  await prisma.user.update({
    where: { id },
    data: {
      email,
      firstName: d.firstName,
      lastName: d.lastName,
      phone: clean(d.phone),
      organizationId: clean(d.organizationId),
      structureId: clean(d.structureId),
      countryId: clean(d.countryId),
      ministryId: clean(d.ministryId),
      managerId,
      gender,
      roles: { deleteMany: {}, create: d.roleIds.map((roleId) => ({ roleId })) },
    },
  });

  await writeAudit({ userId: g.user!.id, action: "update", module: "user", entityType: "User", entityId: id });
  revalidatePath("/users");
  revalidatePath(`/users/${id}`);
  return { ok: true, id };
}

export async function toggleUserActive(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  if (g.user!.id === id) return { ok: false, error: "Vous ne pouvez pas désactiver votre propre compte." };

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return { ok: false, error: "Utilisateur introuvable." };

  await prisma.user.update({ where: { id }, data: { isActive: !target.isActive } });
  // Couper les sessions actives lors d'une désactivation.
  if (target.isActive) await prisma.session.deleteMany({ where: { userId: id } });

  await writeAudit({ userId: g.user!.id, action: target.isActive ? "deactivate" : "activate", module: "user", entityType: "User", entityId: id });
  revalidatePath("/users");
  revalidatePath(`/users/${id}`);
  return { ok: true };
}

export async function resetUserPassword(id: string, password: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  if (!password || password.length < 8) return { ok: false, error: "Mot de passe d'au moins 8 caractères requis." };

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return { ok: false, error: "Utilisateur introuvable." };

  await prisma.user.update({ where: { id }, data: { passwordHash: await hashPassword(password) } });
  await writeAudit({ userId: g.user!.id, action: "reset_password", module: "user", entityType: "User", entityId: id });
  revalidatePath(`/users/${id}`);
  return { ok: true };
}

// ── Suppression individuelle (soft delete) ─────────────────────────────────────
export async function deleteUser(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  if (g.user!.id === id) return { ok: false, error: "Vous ne pouvez pas supprimer votre propre compte." };
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target || target.deletedAt) return { ok: false, error: "Utilisateur introuvable." };

  await prisma.user.update({ where: { id }, data: { deletedAt: new Date(), isActive: false } });
  await prisma.session.deleteMany({ where: { userId: id } });
  await writeAudit({ userId: g.user!.id, action: "delete", module: "user", entityType: "User", entityId: id });
  revalidatePath("/users");
  return { ok: true };
}

// ── Suppression collective (soft delete) ───────────────────────────────────────
export async function deleteUsers(ids: string[]): Promise<{ ok: true; deleted: number } | { ok: false; error: string }> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const targets = [...new Set(ids)].filter((id) => id !== g.user!.id);
  if (targets.length === 0) return { ok: false, error: "Aucun compte supprimable sélectionné (vous ne pouvez pas vous supprimer)." };

  const res = await prisma.user.updateMany({ where: { id: { in: targets }, deletedAt: null }, data: { deletedAt: new Date(), isActive: false } });
  await prisma.session.deleteMany({ where: { userId: { in: targets } } });
  await writeAudit({ userId: g.user!.id, action: "delete_bulk", module: "user", metadata: { count: res.count } });
  revalidatePath("/users");
  return { ok: true, deleted: res.count };
}

// ── Import CSV d'utilisateurs ──────────────────────────────────────────────────
export interface UserImportRow {
  email: string; prenom: string; nom: string; motdepasse: string; roles: string;
  telephone?: string; pays?: string; organisation?: string; structure?: string; ministere?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function importUsers(
  rows: UserImportRow[]
): Promise<{ ok: true; imported: number; skipped: number; errors: string[] } | { ok: false; error: string }> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };

  const [roles, countries, orgs, structures, ministries] = await Promise.all([
    prisma.role.findMany({ select: { id: true, key: true } }),
    prisma.country.findMany({ select: { id: true, code: true } }),
    prisma.organization.findMany({ where: { deletedAt: null }, select: { id: true, name: true } }),
    prisma.structure.findMany({ where: { deletedAt: null }, select: { id: true, name: true } }),
    prisma.ministry.findMany({ select: { id: true, name: true, code: true } }),
  ]);
  const roleByKey = new Map(roles.map((r) => [r.key.toLowerCase(), r.id]));
  const countryByCode = new Map(countries.map((c) => [c.code.toUpperCase(), c.id]));
  const orgByName = new Map(orgs.map((o) => [o.name.toLowerCase(), o.id]));
  const structByName = new Map(structures.map((s) => [s.name.toLowerCase(), s.id]));
  const minByKey = new Map<string, string>();
  ministries.forEach((m) => { minByKey.set(m.name.toLowerCase(), m.id); if (m.code) minByKey.set(m.code.toLowerCase(), m.id); });

  let imported = 0, skipped = 0;
  const errors: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const line = i + 1;
    const email = (r.email ?? "").trim().toLowerCase();
    const prenom = (r.prenom ?? "").trim();
    const nom = (r.nom ?? "").trim();
    const password = (r.motdepasse ?? "").trim();

    if (!email && !prenom && !nom) { skipped++; continue; }
    if (!EMAIL_RE.test(email)) { errors.push(`Ligne ${line} : e-mail invalide « ${r.email ?? ""} ».`); skipped++; continue; }
    if (!prenom || !nom) { errors.push(`Ligne ${line} : prénom et nom requis.`); skipped++; continue; }
    if (password.length < 8) { errors.push(`Ligne ${line} : mot de passe d'au moins 8 caractères requis.`); skipped++; continue; }

    const roleIds = (r.roles ?? "")
      .split(/[;,|]/).map((x) => x.trim().toLowerCase()).filter(Boolean)
      .map((k) => roleByKey.get(k)).filter((x): x is string => Boolean(x));
    if (roleIds.length === 0) { errors.push(`Ligne ${line} : aucun rôle valide « ${r.roles ?? ""} ».`); skipped++; continue; }

    if (seen.has(email)) { errors.push(`Ligne ${line} : e-mail en double dans le fichier (${email}).`); skipped++; continue; }
    if (await prisma.user.findUnique({ where: { email } })) { errors.push(`Ligne ${line} : e-mail déjà existant (${email}).`); skipped++; continue; }
    seen.add(email);

    await prisma.user.create({
      data: {
        email,
        passwordHash: await hashPassword(password),
        firstName: prenom,
        lastName: nom,
        phone: clean(r.telephone?.trim()),
        countryId: r.pays ? countryByCode.get(r.pays.trim().toUpperCase()) : undefined,
        organizationId: r.organisation ? orgByName.get(r.organisation.trim().toLowerCase()) : undefined,
        structureId: r.structure ? structByName.get(r.structure.trim().toLowerCase()) : undefined,
        ministryId: r.ministere ? minByKey.get(r.ministere.trim().toLowerCase()) : undefined,
        roles: { create: roleIds.map((roleId) => ({ roleId })) },
      },
    });
    imported++;
  }

  await writeAudit({ userId: g.user!.id, action: "import", module: "user", metadata: { imported, skipped } });
  revalidatePath("/users");
  return { ok: true, imported, skipped, errors };
}

// ── Permissions déléguées (au-delà des rôles) — délégation « en un clic » ───────
export async function setUserDirectPermissions(userId: string, keys: string[]): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const perms = await prisma.permission.findMany({ where: { key: { in: [...new Set(keys)] } }, select: { id: true } });
  await prisma.user.update({ where: { id: userId }, data: { directPermissions: { set: perms.map((p) => ({ id: p.id })) } } });
  await writeAudit({ userId: g.user!.id, action: "set_permissions", module: "user", entityType: "User", entityId: userId, metadata: { keys } });
  revalidatePath(`/users/${userId}`);
  return { ok: true };
}
