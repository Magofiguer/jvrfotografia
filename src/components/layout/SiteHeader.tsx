"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-[#0A1A2F] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo + texto */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-auto">
            <Image
              src="/images/logos/jvr-logo.png"
              alt="JVR Fotografía"
              height={40}
              width={120}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-xs tracking-[0.35em] text-slate-100">
              JAVIER FIGUEROA
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] text-[#C8A76A]">
              FOTOGRAFÍA
            </span>
          </div>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/quien-soy" className="hover:text-[#C8A76A]">
            Quién soy
          </Link>
          <Link href="/portafolio" className="hover:text-[#C8A76A]">
            Portafolio
          </Link>
          <Link href="/paquetes" className="hover:text-[#C8A76A]">
            Paquetes
          </Link>
          <Link href="/testimonios" className="hover:text-[#C8A76A]">
            Testimonios
          </Link>
          <Link href="/contacto" className="hover:text-[#C8A76A]">
            Contacto
          </Link>
        </nav>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md border border-slate-600 px-2 py-1 text-slate-100 hover:border-[#C8A76A] hover:text-[#C8A76A] md:hidden"
          aria-label="Abrir menú"
        >
          <span className="block h-[2px] w-4 bg-current" />
          <span className="mt-[3px] block h-[2px] w-4 bg-current" />
          <span className="mt-[3px] block h-[2px] w-4 bg-current" />
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <nav className="md:hidden border-t border-slate-800 bg-[#020617]">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 text-sm">
            <Link
              href="/quien-soy"
              className="py-1 hover:text-[#C8A76A]"
              onClick={() => setOpen(false)}
            >
              Quién soy
            </Link>
            <Link
              href="/portafolio"
              className="py-1 hover:text-[#C8A76A]"
              onClick={() => setOpen(false)}
            >
              Portafolio
            </Link>
            <Link
              href="/paquetes"
              className="py-1 hover:text-[#C8A76A]"
              onClick={() => setOpen(false)}
            >
              Paquetes
            </Link>
            <Link
              href="/testimonios"
              className="py-1 hover:text-[#C8A76A]"
              onClick={() => setOpen(false)}
            >
              Testimonios
            </Link>
            <Link
              href="/contacto"
              className="py-1 hover:text-[#C8A76A]"
              onClick={() => setOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
