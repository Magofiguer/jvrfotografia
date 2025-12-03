import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { createPortfolioAlbum } from "../actions";

export default async function NewPortfolioAlbumAdminPage() {
  const categories = await prisma.portfolioCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 space-y-8">
          {/* Volver */}
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
          <header className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio · Nuevo álbum
            </p>
            <h1 className="text-xl font-semibold">Crear nuevo álbum</h1>
            <p className="text-xs text-slate-300">
              Configura un nuevo álbum para bodas, XV años, sesiones familiares,
              etc. Se mostrará en la sección pública de portafolio.
            </p>
          </header>

          {/* Formulario */}
          <form
            action={createPortfolioAlbum}
            className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
          >
            {/* Título */}
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
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Ejemplo: Boda de Ana & Carlos, XV años de María..."
              />
            </div>

            {/* Slug opcional */}
            <div className="space-y-1">
              <label
                htmlFor="slug"
                className="block text-[11px] font-medium text-slate-200"
              >
                Slug (URL amigable, opcional)
              </label>
              <input
                id="slug"
                name="slug"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="ejemplo: boda-ana-carlos-puebla"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Si lo dejas vacío, se generará automáticamente a partir del
                título.
              </p>
            </div>

            {/* Categoría */}
            <div className="space-y-1">
              <label
                htmlFor="categoryId"
                className="block text-[11px] font-medium text-slate-200"
              >
                Categoría
              </label>
              <select
                id="categoryId"
                name="categoryId"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
              >
                <option value="">Seleccionar categoría...</option>
                {categories.map(
                  (cat: { id: number; name: string }) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Fecha & ubicación */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="date"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Fecha del evento (opcional)
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="location"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Lugar / Ciudad (opcional)
                </label>
                <input
                  id="location"
                  name="location"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                  placeholder="Ejemplo: Puebla, Atlixco, CDMX..."
                />
              </div>
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
                rows={4}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Describe brevemente el evento, estilo de la sesión, etc."
              />
            </div>

            {/* Orden + publicado */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="order"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Orden
                </label>
                <input
                  id="order"
                  name="order"
                  type="number"
                  defaultValue={0}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id="isPublished"
                  name="isPublished"
                  type="checkbox"
                  defaultChecked
                  className="h-3 w-3 rounded border-slate-700 bg-slate-950 text-[#C8A76A] focus:ring-[#C8A76A]"
                />
                <label
                  htmlFor="isPublished"
                  className="text-[11px] text-slate-200"
                >
                  Mostrar en la parte pública
                </label>
              </div>
            </div>

            {/* Botón */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                className="rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                Guardar álbum
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
