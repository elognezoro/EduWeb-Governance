import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { NotificationsList, MarkAllReadButton } from "@/components/notifications/notifications-list";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const user = await requireUser();
  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Notifications"
        description="Échéances, validations, publications EduLex et défis Academy."
        icon={Bell}
        actions={<MarkAllReadButton hasUnread={hasUnread} />}
      />
      {notifications.length ? (
        <NotificationsList
          notifications={notifications.map((n) => ({
            id: n.id, title: n.title, body: n.body, link: n.link, isRead: n.isRead, createdAt: n.createdAt.toISOString(),
          }))}
        />
      ) : (
        <EmptyState icon={Bell} title="Aucune notification" description="Vous serez informé ici des échéances, validations et publications." />
      )}
    </div>
  );
}
