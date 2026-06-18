import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";
import { requireUser, roleKeys } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { GuideClient } from "@/components/guide/guide-client";
import { cn } from "@/lib/utils";

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
        actions={
          <Link href="/formation" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            <GraduationCap className="size-4" /> Support de formation (PDF)
          </Link>
        }
      />
      <GuideClient myRoles={myRoles} />
    </div>
  );
}
