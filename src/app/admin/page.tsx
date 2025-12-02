import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminHomePage() {
  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C8A76A]/80">
                Panel de administración
              </p>
              <h1 className="text-2xl font-semibold">
                JVR Fotografía · Área privada
              </h1>
              <p className="mt-1 text-sm text-slate-300 max-w-2xl">
                Desde aquí vas a administrar el contenido del sitio: portafolio
                (eventos, sesiones) y paquetes de servicios.
              </p>
            </div>

            <LogoutButton />
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {/* tarjeta portafolio */}
            <Link
              href="/admin/portafolio"
              className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-[#C8A76A] hover:bg-slate-900/90"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-200">
                  <span className="text-base">📸</span>
                  <span>Gestión de portafolio</span>
                </div>
                <h2 className="text-lg font-semibold">
                  Álbumes, sesiones y eventos
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Crea y organiza álbumes para bodas, XV años, retratos, etc.
                </p>
              </div>
              <p className="mt-4 text-xs font-medium text-[#C8A76A] group-hover:underline">
                Ir a portafolio →
              </p>
            </Link>

            {/* tarjeta paquetes */}
            <Link
              href="/admin/paquetes"
              className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-[#C8A76A] hover:bg-slate-900/90"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-200">
                  <span className="text-base">🎁</span>
                  <span>Gestión de paquetes</span>
                </div>
                <h2 className="text-lg font-semibold">
                  Paquetes de fotografía
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Define paquetes para XV años, bodas, sesiones familiares, etc.
                </p>
              </div>
              <p className="mt-4 text-xs font-medium text-[#C8A76A] group-hover:underline">
                Ir a paquetes →
              </p>
            </Link>
            <Link
              href="/admin/portafolio/categorias"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
            >
              <span className="text-xs">⚙</span>
              <span>Categorías</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
