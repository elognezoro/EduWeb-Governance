import "server-only";
import { redirect } from "next/navigation";
import { getSessionUser } from "./session";

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getSessionUser>>>;

/** Utilisateur courant ou null. */
export async function getCurrentUser() {
  return getSessionUser();
}

/** Exige un utilisateur connecté, sinon redirige vers /login. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/** Liste des clés de rôles de l'utilisateur. */
export function roleKeys(user: CurrentUser): string[] {
  return user.roles.map((r) => r.role.key);
}

/** Liste des clés de permissions effectives de l'utilisateur (rôles + délégations directes). */
export function permissionKeys(user: CurrentUser): string[] {
  const keys = new Set<string>();
  for (const ur of user.roles) {
    for (const p of ur.role.permissions) keys.add(p.key);
  }
  // Permissions déléguées directement à l'utilisateur (« en un clic »).
  for (const p of (user as { directPermissions?: { key: string }[] }).directPermissions ?? []) keys.add(p.key);
  return [...keys];
}

export function hasRole(user: CurrentUser, key: string): boolean {
  return roleKeys(user).includes(key);
}

export function isSuperAdmin(user: CurrentUser): boolean {
  return hasRole(user, "super_admin");
}

/** Le super administrateur dispose implicitement de toutes les permissions. */
export function hasPermission(user: CurrentUser, permissionKey: string): boolean {
  if (isSuperAdmin(user)) return true;
  return permissionKeys(user).includes(permissionKey);
}

export function fullName(user: { firstName: string; lastName: string }): string {
  return `${user.firstName} ${user.lastName}`.trim();
}
