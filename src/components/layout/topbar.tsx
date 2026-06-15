import { Search, Bell } from "lucide-react";
import { GeoFilter, type CountryOption, type SubdivisionOption } from "./geo-filter";
import { UserMenu } from "./user-menu";
import { Brand } from "./brand";
import { MobileNav } from "./mobile-nav";

export function Topbar({
  user,
  countries,
  currentCountry,
  subdivisions,
  currentSubdivision,
  unreadCount = 0,
}: {
  user: { name: string; email: string; initials: string; roleLabel: string };
  countries: CountryOption[];
  currentCountry: string;
  subdivisions: SubdivisionOption[];
  currentSubdivision: string;
  unreadCount?: number;
}) {
  return (
    <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-100 bg-card/85 px-4 backdrop-blur lg:px-6">
      {/* Menu + logo (mobile uniquement, la sidebar les porte sur desktop) */}
      <div className="flex items-center gap-1.5 lg:hidden">
        <MobileNav />
        <Brand compact />
      </div>

      {/* Recherche globale */}
      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Rechercher une activité, un texte EduLex…"
          className="h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-brand-600 focus:bg-card focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <GeoFilter
          countries={countries}
          currentCountry={currentCountry}
          subdivisions={subdivisions}
          currentSubdivision={currentSubdivision}
        />

        <a
          href="/notifications"
          className="relative flex size-10 items-center justify-center rounded-2xl text-slate-500 transition-colors hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </a>

        <div className="h-7 w-px bg-slate-200" />

        <UserMenu
          name={user.name}
          email={user.email}
          initials={user.initials}
          roleLabel={user.roleLabel}
        />
      </div>
    </header>
  );
}
