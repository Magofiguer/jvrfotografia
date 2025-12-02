"use client";

import { useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const accepted = window.localStorage.getItem("cookieConsent");
    return !accepted;
  });

  if (!visible) return null;

  const handleAccept = () => {
    window.localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 text-sm text-slate-200">
        <p className="max-w-xl">
          Usamos cookies para mejorar tu experiencia y analizar el uso del
          sitio. Puedes desactivarlas en la configuración de tu navegador.
        </p>
        <button
          onClick={handleAccept}
          className="rounded-full border border-amber-400 bg-amber-500/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-md hover:bg-amber-400 transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
