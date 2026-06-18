"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "wheel"];

/**
 * Veilleur d'inactivité : ferme automatiquement la session après `timeoutMinutes`
 * sans activité (souris/clavier). Un avertissement avec compte à rebours s'affiche
 * avant la déconnexion. Des battements de cœur tiennent le serveur informé de
 * l'activité réelle (au-delà des simples navigations).
 */
export function IdleLogout({ timeoutMinutes }: { timeoutMinutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const timeoutMsRef = useRef(timeoutMinutes * 60_000);
  const lastActivity = useRef(Date.now());
  const lastHeartbeat = useRef(Date.now());
  const lastTick = useRef(0);
  const loggingOut = useRef(false);

  const logout = useCallback(async () => {
    if (loggingOut.current) return;
    loggingOut.current = true;
    try {
      await fetch("/api/auth/logout", { method: "POST", keepalive: true });
    } catch {
      /* on redirige malgré tout */
    }
    window.location.href = "/login?reason=inactivity";
  }, []);

  const heartbeat = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/heartbeat", { method: "POST", keepalive: true });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json().catch(() => null);
      if (data && "timeoutMinutes" in data) {
        timeoutMsRef.current = data.timeoutMinutes == null ? 0 : data.timeoutMinutes * 60_000;
      }
    } catch {
      /* réseau indisponible : on réessaiera au prochain battement */
    }
  }, [logout]);

  const stayConnected = useCallback(() => {
    lastActivity.current = Date.now();
    lastHeartbeat.current = Date.now();
    setSecondsLeft(null);
    heartbeat();
  }, [heartbeat]);

  useEffect(() => {
    timeoutMsRef.current = timeoutMinutes * 60_000;
    lastActivity.current = Date.now();
    lastHeartbeat.current = Date.now();

    const onActivity = () => {
      const now = Date.now();
      lastActivity.current = now;
      if (now - lastTick.current < 500) return; // throttle le reste
      lastTick.current = now;
      setSecondsLeft(null);
      const tMs = timeoutMsRef.current;
      const hbMs = Math.min(60_000, Math.max(15_000, Math.floor(tMs / 4)));
      if (tMs > 0 && now - lastHeartbeat.current > hbMs) {
        lastHeartbeat.current = now;
        heartbeat();
      }
    };
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    const id = window.setInterval(() => {
      const tMs = timeoutMsRef.current;
      if (!tMs || tMs <= 0) {
        setSecondsLeft(null);
        return;
      }
      const idle = Date.now() - lastActivity.current;
      const warnMs = Math.min(60_000, Math.floor(tMs / 3));
      if (idle >= tMs) {
        logout();
      } else if (idle >= tMs - warnMs) {
        setSecondsLeft(Math.max(1, Math.ceil((tMs - idle) / 1000)));
      } else {
        setSecondsLeft(null);
      }
    }, 1000);

    return () => {
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity));
      window.clearInterval(id);
    };
  }, [timeoutMinutes, heartbeat, logout]);

  if (secondsLeft == null) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm" role="alertdialog" aria-modal="true" aria-label="Déconnexion pour inactivité">
      <div className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Clock className="size-5" />
          </span>
          <div>
            <p className="font-bold text-institutional-900">Déconnexion imminente</p>
            <p className="text-sm text-slate-500">Vous êtes inactif depuis un moment.</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Pour votre sécurité, votre session se fermera dans{" "}
          <b className="text-danger-600">{secondsLeft}&nbsp;s</b>.
        </p>
        <div className="mt-5 flex gap-2">
          <Button type="button" onClick={stayConnected} className="flex-1">Rester connecté</Button>
          <Button type="button" variant="ghost" onClick={logout}>Se déconnecter</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
