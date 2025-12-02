import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { createPackageCategory } from "../../actions";

export default function NewPackageCategoryPage() {
  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/paquetes"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver a paquetes</span>
            </Link>
          </div>

          <header className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Paquetes · Nueva categoría
            </p>
            <h1 className="text-xl font-semibold">Nueva categoría de paquete</h1>
            <p className="text-xs text-slate-300">
              Agrupa paquetes por tipo: XV años, bodas, familiar, estudio, etc.
            </p>
          </header>

          <form
            action={createPackageCategory}
            className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
          >
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-[11px] font-medium text-slate-200"
              >
                Nombre de la categoría *
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Ejemplo: XV años, Bodas, Sesiones familiares..."
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="description"
                className="block text-[11px] font-medium text-slate-200"
              >
                Descripción (opcional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Breve descripción de esta categoría."
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="order"
                className="block text-[11px] font-medium text-slate-200"
              >
                Orden (opcional)
              </label>
              <input
                id="order"
                name="order"
                type="number"
                className="w-32 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="0"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                className="rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                Guardar categoría
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
    