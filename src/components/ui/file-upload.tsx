"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Bouton de téléversement réutilisable : envoie un fichier (multipart) vers un endpoint. */
export function FileUpload({
  endpoint,
  accept,
  label = "Téléverser",
  maxMb = 4,
  extraFields,
  variant = "outline",
}: {
  endpoint: string;
  accept?: string;
  label?: string;
  maxMb?: number;
  extraFields?: Record<string, string>;
  variant?: "outline" | "primary" | "secondary" | "ghost";
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    if (file.size > maxMb * 1024 * 1024) {
      setError(`Fichier trop volumineux (max ${maxMb} Mo).`);
      e.target.value = "";
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    if (extraFields) for (const [k, v] of Object.entries(extraFields)) fd.append(k, v);
    start(async () => {
      try {
        const res = await fetch(endpoint, { method: "POST", body: fd });
        const j = await res.json().catch(() => ({}));
        if (!res.ok || j?.error) {
          setError(j?.error ?? "Échec du téléversement.");
        } else {
          router.refresh();
        }
      } catch {
        setError("Échec du téléversement.");
      } finally {
        if (inputRef.current) inputRef.current.value = "";
      }
    });
  }

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept={accept} onChange={onChange} className="hidden" />
      <Button type="button" variant={variant} disabled={pending} onClick={() => inputRef.current?.click()}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} {label}
      </Button>
      {error && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
