import * as React from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileTabBar } from "./mobile-tabbar";
import type { CountryOption, SubdivisionOption } from "./geo-filter";

export function AppShell({
  user,
  countries,
  currentCountry,
  subdivisions,
  currentSubdivision,
  unreadCount,
  children,
}: {
  user: { name: string; email: string; initials: string; roleLabel: string };
  countries: CountryOption[];
  currentCountry: string;
  subdivisions: SubdivisionOption[];
  currentSubdivision: string;
  unreadCount?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          user={user}
          countries={countries}
          currentCountry={currentCountry}
          subdivisions={subdivisions}
          currentSubdivision={currentSubdivision}
          unreadCount={unreadCount}
        />
        <main className="flex-1 px-4 py-6 pb-28 lg:px-8 lg:py-8 lg:pb-8">
          <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>
        </main>
      </div>
      {/* Barre d'onglets mobile (sous lg) */}
      <MobileTabBar />
    </div>
  );
}
