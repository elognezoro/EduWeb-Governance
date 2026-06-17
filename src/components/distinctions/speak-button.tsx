"use client";

import { useEffect, useId, useState } from "react";
import { Volume2, Square } from "lucide-react";
import { cn } from "@/lib/utils";

const CLAIM_EVENT = "eduweb:speak";

/** Lecture audio du message via la synthèse vocale du navigateur (voix française). */
export function SpeakButton({ text, className }: { text: string; className?: string }) {
  const id = useId();
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    // Quand un autre bouton prend la parole, ce bouton revient à l'état repos
    // (cancel() ne déclenche pas toujours onend/onerror selon le navigateur).
    const onClaim = (e: Event) => {
      if ((e as CustomEvent<{ id: string }>).detail?.id !== id) setSpeaking(false);
    };
    window.addEventListener(CLAIM_EVENT, onClaim);
    return () => {
      window.removeEventListener(CLAIM_EVENT, onClaim);
    };
  }, [id]);

  function toggle() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    // Revendique la parole : tout autre bouton en cours repasse au repos.
    window.dispatchEvent(new CustomEvent(CLAIM_EVENT, { detail: { id } }));
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    const fr = window.speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith("fr"));
    if (fr) u.voice = fr;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors",
        className ?? "bg-slate-100 text-ink hover:bg-slate-200"
      )}
    >
      {speaking ? <Square className="size-4" /> : <Volume2 className="size-4" />}
      {speaking ? "Arrêter" : "Écouter"}
    </button>
  );
}
