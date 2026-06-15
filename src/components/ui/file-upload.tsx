"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui/button";
import { finalizeUpload, type FinalizeInput } from "@/app/(app)/upload-actions";

/**
 * Téléversement direct client → Vercel Blob (sans limite de taille serverless),
 * puis enregistrement en base via l'action serveur `finalizeUpload`.
 */
export function FileUpload({
  purpose,
  entityId = "",
  accept,
  label = "Téléverser",
  variant = "outline",
}: {
  purpose: FinalizeInput["purpose"];
  entityId?: string;
  accept?: string;
  label?: string;
  variant?: "outline" | "primary" | "secondary" | "ghost";
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);
    setProgress(0);
    void (async () => {
      try {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
          clientPayload: JSON.stringify({ purpose, entityId }),
          contentType: file.type || undefined,
          onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
        });
        const res = await finalizeUpload({ purpose, entityId, url: blob.url, filename: file.name, size: file.size, contentType: file.type });
        if (!res.ok) setError(res.error);
        else router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Échec du téléversement.");
      } finally {
        setLoading(false);
        setProgress(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    })();
  }

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept={accept} onChange={onChange} className="hidden" />
      <Button type="button" variant={variant} disabled={loading} onClick={() => inputRef.current?.click()}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        {loading && progress !== null ? `Téléversement… ${progress}%` : label}
      </Button>
      {error && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
