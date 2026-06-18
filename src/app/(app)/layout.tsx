import { requireUser, fullName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCountries, getSelectedCountryCode, getSelectedSubdivision, getSubdivisionsForCode } from "@/lib/country";
import { getInactivityTimeoutMinutes } from "@/lib/app-settings";
import { AppShell } from "@/components/layout/app-shell";
import { FloatingToc } from "@/components/layout/floating-toc";
import { AcademyPromo } from "@/components/layout/academy-promo";
import { IdleLogout } from "@/components/security/idle-logout";
import { initials } from "@/lib/utils";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  const [countries, currentCountry, currentSubdivision, unreadCount, idleTimeout] = await Promise.all([
    getCountries(),
    getSelectedCountryCode(),
    getSelectedSubdivision(),
    prisma.notification.count({ where: { userId: user.id, isRead: false } }),
    getInactivityTimeoutMinutes(),
  ]);

  const subdivisions = await getSubdivisionsForCode(currentCountry);

  const roleLabel = user.roles[0]?.role.name ?? "Utilisateur";

  return (
    <AppShell
      user={{
        name: fullName(user),
        email: user.email,
        initials: initials(user.firstName, user.lastName),
        roleLabel,
      }}
      countries={countries.map((c) => ({
        code: c.code,
        name: c.name,
        flag: c.flag,
        namespace: c.namespace,
      }))}
      currentCountry={currentCountry}
      subdivisions={subdivisions}
      currentSubdivision={currentSubdivision}
      unreadCount={unreadCount}
    >
      {children}
      <FloatingToc />
      <AcademyPromo />
      {idleTimeout && idleTimeout > 0 ? <IdleLogout timeoutMinutes={idleTimeout} /> : null}
    </AppShell>
  );
}
