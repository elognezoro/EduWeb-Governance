"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Loader2, AlertCircle } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DEMO_ACCOUNTS = [
  { label: "Super Admin", email: "admin@eduweb.ci" },
  { label: "Agent", email: "agent@eduweb.ci" },
  { label: "Validateur EduLex", email: "juriste@eduweb.ci" },
];

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Échec de la connexion.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("password123");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="vous@institution.gouv"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <LogIn className="size-4" />
        )}
        Se connecter
      </Button>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-500">
          Comptes de démonstration (mot de passe&nbsp;: <code className="font-mono">password123</code>)
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.email}
              type="button"
              onClick={() => fillDemo(a.email)}
              className="rounded-xl bg-card px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
