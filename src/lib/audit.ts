import "server-only";
import { prisma } from "./prisma";

/** Écrit une entrée dans le journal d'audit (best-effort, n'interrompt jamais l'action). */
export async function writeAudit(input: {
  userId?: string | null;
  action: string;
  module: string;
  entityType?: string;
  entityId?: string;
  metadata?: unknown;
}): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? undefined,
        action: input.action,
        module: input.module,
        entityType: input.entityType,
        entityId: input.entityId,
        metadata: input.metadata ? JSON.stringify(input.metadata) : undefined,
      },
    });
  } catch (e) {
    console.error("[audit] échec d'écriture", e);
  }
}
