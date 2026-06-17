"use client";

import { useEffect, useRef } from "react";
import { getUpcomingReminders } from "@/app/(app)/reminders-actions";

/** Hash stable d'un id string → entier positif 31 bits (id de notification natif). */
function intId(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 2147483646) + 1;
}

/**
 * Sur la coque mobile native uniquement : au lancement, demande la permission
 * et (re)programme les notifications locales pour les RDV à venir.
 * Sur le web (navigateur), `isNativePlatform()` est faux → ne fait rien.
 */
export function MobileReminders() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform()) return;

      const { LocalNotifications } = await import("@capacitor/local-notifications");
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display !== "granted") return;

      const appts = await getUpcomingReminders();
      const now = Date.now();
      const notifications = appts
        .map((a) => ({ a, at: new Date(new Date(a.startAtISO).getTime() - a.reminderMinutes * 60_000) }))
        .filter((x) => x.at.getTime() > now + 5_000)
        .map((x) => ({
          id: intId(x.a.id),
          title: "Rappel de rendez-vous",
          body: x.a.location ? `${x.a.title} · ${x.a.location}` : x.a.title,
          schedule: { at: x.at },
        }));

      // Remplace les rappels déjà programmés pour éviter les doublons / périmés.
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length) {
        await LocalNotifications.cancel({ notifications: pending.notifications.map((n) => ({ id: n.id })) });
      }
      if (notifications.length) {
        await LocalNotifications.schedule({ notifications });
      }
    })().catch((e) => console.error("MobileReminders", e));
  }, []);

  return null;
}
