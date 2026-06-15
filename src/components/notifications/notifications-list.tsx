"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { markNotificationRead, markAllNotificationsRead } from "@/app/(app)/notifications/actions";

interface N { id: string; title: string; body: string | null; link: string | null; isRead: boolean; createdAt: string }

export function MarkAllReadButton({ hasUnread }: { hasUnread: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  if (!hasUnread) return null;
  return (
    <Button size="sm" variant="outline" disabled={pending} onClick={() => start(async () => { await markAllNotificationsRead(); router.refresh(); })}>
      <Check className="size-4" /> Tout marquer comme lu
    </Button>
  );
}

export function NotificationsList({ notifications }: { notifications: N[] }) {
  const router = useRouter();
  const [, start] = useTransition();

  function open(n: N) {
    start(async () => {
      if (!n.isRead) await markNotificationRead(n.id);
      if (n.link) router.push(n.link);
      else router.refresh();
    });
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card">
      <ul className="divide-y divide-slate-100">
        {notifications.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => open(n)}
              className={cn("flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-slate-50", !n.isRead && "bg-brand-50/30")}
            >
              <span className={cn("mt-1 size-2.5 shrink-0 rounded-full", n.isRead ? "bg-slate-200" : "bg-brand-500")} />
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm text-ink", n.isRead ? "font-medium" : "font-bold")}>{n.title}</p>
                {n.body && <p className="mt-0.5 text-sm text-slate-500">{n.body}</p>}
                <p className="mt-1 text-xs text-slate-400">{formatDate(n.createdAt)}{n.link ? " · cliquez pour ouvrir" : ""}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
