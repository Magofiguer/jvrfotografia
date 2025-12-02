import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { createPortfolioCategory } from "../../actions";

export default function NewPortfolioCategoryPage() {
  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portafolio/categorias"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver a categorías</span>
            </Link>
          </div>

          <header className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio
            </p>
            <h1 className="text-xl font-semibold">Nueva categoría</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              Define una categoría para organizar los álbumes (ejemplo: “Bodas”,
              “XV años”, “Sesiones familiares”).
            </p>
          </header>

          <form
            action={createPortfolioCategory}
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
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Ejemplo: Bodas, XV años, Retratos, Eventos..."
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
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Texto breve para recordar el tipo de sesiones que entran en esta categoría."
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
                className="w-32 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="0"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Úsalo si quieres controlar el orden de aparición de las
                categorías.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Link
                href="/admin/portafolio/categorias"
                className="rounded-full border border-slate-600/80 px-4 py-2 text-[11px] text-slate-200 hover:border-slate-400 transition"
              >
                Cancelar
              </Link>
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
