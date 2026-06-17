import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { requireUser, roleKeys } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { GuideClient } from "@/components/guide/guide-client";

export const metadata: Metadata = { title: "Guide d'utilisation" };

export default async function GuidePage() {
  const user = await requireUser();
  const myRoles = roleKeys(user);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Guide d'utilisation"
        description="Mode d'emploi détaillé de la plateforme, adapté à chaque rôle. Sélectionnez un rôle pour découvrir ses accès, ses procédures pas à pas et ses bonnes pratiques."
        icon={BookOpen}
      />
      <GuideClient myRoles={myRoles} />
    </div>
  );
}
