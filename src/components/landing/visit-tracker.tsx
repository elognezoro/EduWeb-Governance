"use client";

import { useEffect } from "react";

/** Enregistre une visite au chargement de la page (une fois par montage). */
export function VisitTracker({ path = "/" }: { path?: string }) {
  useEffect(() => {
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
      keepalive: true,
    }).catch(() => {});
  }, [path]);
  return null;
}
