"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
    >
      <span className="text-xs">⎋</span>
      <span>Cerrar sesión</span>
    </button>
  );
}
