"use client";

import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu";

export function UserMenu({
  name,
  email,
  initials,
  roleLabel,
}: {
  name: string;
  email: string;
  initials: string;
  roleLabel: string;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <Menu
      triggerClassName="flex items-center gap-2.5 rounded-2xl p-1 pr-2 transition-colors hover:bg-slate-100"
      trigger={
        <>
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white">
            {initials}
          </span>
          <span className="hidden text-left md:block">
            <span className="block text-sm font-semibold leading-tight text-ink">{name}</span>
            <span className="block text-xs leading-tight text-slate-400">{roleLabel}</span>
          </span>
        </>
      }
    >
      <MenuLabel>{email}</MenuLabel>
      <MenuItem onClick={() => router.push("/account")}>
        <UserIcon className="size-4 text-slate-400" />
        Mon profil
      </MenuItem>
      <MenuItem onClick={() => router.push("/admin")}>
        <Settings className="size-4 text-slate-400" />
        Paramètres
      </MenuItem>
      <MenuSeparator />
      <MenuItem onClick={logout} className="text-danger-500 hover:bg-red-50">
        <LogOut className="size-4" />
        Se déconnecter
      </MenuItem>
    </Menu>
  );
}
