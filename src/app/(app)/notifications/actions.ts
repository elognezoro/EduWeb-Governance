"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function markNotificationRead(id: string) {
  const user = await getCurrentUser();
  if (!user) return { ok: false as const };
  await prisma.notification.updateMany({ where: { id, userId: user.id }, data: { isRead: true } });
  revalidatePath("/notifications");
  return { ok: true as const };
}

export async function markAllNotificationsRead() {
  const user = await getCurrentUser();
  if (!user) return { ok: false as const };
  await prisma.notification.updateMany({ where: { userId: user.id, isRead: false }, data: { isRead: true } });
  revalidatePath("/notifications");
  return { ok: true as const };
}
