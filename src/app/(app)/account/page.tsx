import type { Metadata } from "next";
import { UserCircle, Mail, Building2, Globe2, ShieldCheck } from "lucide-react";
import { requireUser, fullName, roleKeys } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "@/components/ui/flag";
import { FileUpload } from "@/components/ui/file-upload";
import { initials } from "@/lib/utils";

export const metadata: Metadata = { title: "Mon profil" };

export default async function AccountPage() {
  const user = await requireUser();
  const roles = roleKeys(user);

  const rows = [
    { icon: Mail, label: "E-mail", value: user.email },
    { icon: Building2, label: "Organisation", value: user.organization?.name ?? "—" },
    { icon: Globe2, label: "Pays", value: user.country ? <span className="inline-flex items-center gap-1.5"><Flag code={user.country.code} className="w-5" /> {user.country.name}</span> : "—" },
  ];

  return (
    <div className="space-y-7">
      <PageHeader title="Mon profil" description="Informations de votre compte." icon={UserCircle} />

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt={fullName(user)} className="size-20 shrink-0 rounded-3xl object-cover ring-1 ring-slate-200" />
          ) : (
            <span className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-brand-700 text-2xl font-extrabold text-white">
              {initials(user.firstName, user.lastName)}
            </span>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-institutional-900">{fullName(user)}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <ShieldCheck className="size-3" /> {r}
                </span>
              ))}
            </div>
          </div>
          <FileUpload purpose="avatar" accept="image/*" label="Changer la photo" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.label}>
              <CardContent className="p-5">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{r.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">{r.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
