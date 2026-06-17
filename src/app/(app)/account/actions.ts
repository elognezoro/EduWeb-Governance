"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { PROFILE_TYPES, type ProfileType } from "@/lib/profile";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function setProfileType(type: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!PROFILE_TYPES.includes(type as ProfileType)) return { ok: false, error: "Type de profil invalide." };
  await prisma.user.update({ where: { id: user.id }, data: { profileType: type } });
  // Rafraîchit la terminologie partout (layout) + le profil.
  revalidatePath("/", "layout");
  revalidatePath("/account");
  return { ok: true };
}
