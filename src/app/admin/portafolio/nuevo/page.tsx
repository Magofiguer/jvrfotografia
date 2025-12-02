import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";
import { createPortfolioAlbum } from "../actions";

export default async function NewPortfolioAlbumPage() {
  const categories = await prisma.portfolioCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  const hasCategories = categories.length > 0;

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 space-y-6">

          {/* Back */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portafolio"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver al portafolio</span>
            </Link>
          </div>

          {/* Header */}
          <header className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio
            </p>
            <h1 className="text-xl font-semibold">Nuevo Álbum</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              Crea un nuevo álbum fotográfico (boda, XV, retrato, evento, etc.).
            </p>
          </header>

          {/* Si no hay categorías */}
          {!hasCategories && (
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs">
              <p className="mb-2 font-medium text-slate-100">
                Aún no hay categorías creadas.
              </p>
              <p className="text-slate-300 mb-4">
                Necesitas al menos una categoría para crear un álbum.
              </p>
              <Link
                href="/admin/portafolio/categorias/nueva"
                className="rounded-full bg-[#C8A76A] px-4 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                + Crear categoría
              </Link>
            </div>
          )}

          {hasCategories && (
            <form
              action={createPortfolioAlbum}
              className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
            >
              {/* Titulo */}
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Título del álbum *
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                  placeholder="Ejemplo: XV de María, Boda Ana & José..."
                />
              </div>

              {/* Descripción */}
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
                  placeholder="Texto breve del evento fotografiado."
                />
              </div>

              {/* Fecha */}
              <div className="space-y-1">
                <label
                  htmlFor="date"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Fecha (opcional)
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-40 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                />
              </div>

              {/* Categoría */}
              <div className="space-y-1">
                <label
                  htmlFor="categoryId"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Categoría *
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                  required
                >
                  <option value="">Seleccionar categoría...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publicado */}
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isPublished" name="isPublished" />
                <label htmlFor="isPublished" className="text-[11px] text-slate-300">
                  Marcar como publicado
                </label>
              </div>

              {/* Botones */}
              <div className="flex items-center justify-end gap-2 pt-4">
                <Link
                  href="/admin/portafolio"
                  className="rounded-full border border-slate-600/80 px-4 py-2 text-[11px] text-slate-200 hover:border-slate-400 transition"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  className="rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
                >
                  Crear álbum
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
