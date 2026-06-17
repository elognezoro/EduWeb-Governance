import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { SettingsForm } from "@/components/settings/settings-form";

export const metadata: Metadata = { title: "Paramètres" };

export default async function ParametresPage() {
  const user = await requireUser();
  return (
    <div className="space-y-7">
      <PageHeader title="Paramètres" description="Vos préférences personnelles." icon={SlidersHorizontal} />
      <Card>
        <CardContent className="p-6">
          <SettingsForm defaultBilanPeriode={user.defaultBilanPeriode} remindersEnabled={user.remindersEnabled} />
        </CardContent>
      </Card>
    </div>
  );
}
