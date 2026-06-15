"use client";

import { useEffect, useState } from "react";
import { Gift, Copy, Check, Users, Loader2, Share2 } from "lucide-react";
import { ensureReferralCode } from "@/app/(app)/dashboard/actions";

export function ReferralCard() {
  const [data, setData] = useState<{ code: string; count: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
    ensureReferralCode()
      .then((r) => { if (r.ok) setData({ code: r.code, count: r.count }); })
      .finally(() => setLoading(false));
  }, []);

  const link = data ? `${origin}/register?ref=${data.code}` : "";

  function copy(what: "code" | "link", value: string) {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(what);
      setTimeout(() => setCopied(null), 1600);
    });
  }

  async function share() {
    if (navigator.share && link) {
      try {
        await navigator.share({ title: "Rejoignez EduWeb Governance", text: `Profitez du code promo ${data?.code}`, url: link });
      } catch {}
    } else if (link) {
      copy("link", link);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card">
      <div className="flex items-center justify-between gap-3 bg-gradient-to-br from-brand-700 to-institutional-900 px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-white/15">
            <Gift className="size-5" />
          </span>
          <div>
            <h2 className="font-bold">Programme de parrainage commercial</h2>
            <p className="text-sm text-white/80">Invitez à l'abonnement — chaque inscription via votre lien vous est créditée.</p>
          </div>
        </div>
        <div className="hidden shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-center sm:block">
          <p className="flex items-center justify-center gap-1.5 text-2xl font-extrabold tabular-nums">
            <Users className="size-5" /> {data?.count ?? 0}
          </p>
          <p className="text-[11px] text-white/75">filleul(s)</p>
        </div>
      </div>

      <div className="space-y-4 p-6">
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="size-4 animate-spin" /> Génération de votre lien d'invitation…
          </p>
        ) : data ? (
          <>
            <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Code promo</p>
                <button
                  type="button"
                  onClick={() => copy("code", data.code)}
                  title="Copier le code"
                  className="mt-1 inline-flex items-center gap-2 rounded-2xl border border-dashed border-brand-300 bg-brand-50 px-4 py-2 font-mono text-lg font-extrabold tracking-widest text-brand-700 transition-colors hover:bg-brand-100"
                >
                  {data.code}
                  {copied === "code" ? <Check className="size-4 text-brand-600" /> : <Copy className="size-4 text-brand-500" />}
                </button>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Lien d'invitation</p>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    readOnly
                    value={link}
                    onFocus={(e) => e.currentTarget.select()}
                    className="min-w-0 flex-1 truncate rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => copy("link", link)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-brand-700 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    {copied === "link" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied === "link" ? "Copié" : "Copier"}
                  </button>
                  <button
                    type="button"
                    onClick={share}
                    title="Partager"
                    className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-slate-200 px-3 py-2 text-slate-500 transition-colors hover:border-brand-200 hover:text-brand-700"
                  >
                    <Share2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Partagez ce lien : toute personne qui crée un compte via votre invitation est rattachée à votre code promo, au profit de votre activité commerciale.
            </p>
          </>
        ) : (
          <p className="text-sm text-danger-600">Lien indisponible pour le moment. Réessayez plus tard.</p>
        )}
      </div>
    </div>
  );
}
