import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";
import { deletePortfolioCategory } from "../actions";

export default async function AdminPortfolioCategoriesPage() {
  const categories = await prisma.portfolioCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  const hasCategories = categories.length > 0;

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 space-y-8">
          {/* Back + título */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portafolio"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver al portafolio</span>
            </Link>

            <Link
              href="/admin/portafolio/categorias/nueva"
              className="inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-4 py-2 text-xs font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
            >
              + Nueva categoría
            </Link>
          </div>

          <header className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio · Categorías
            </p>
            <h1 className="text-xl font-semibold">Categorías de portafolio</h1>
            <p className="text-xs text-slate-300 max-w-xl">
              Organiza los álbumes por tipo de sesión: bodas, XV años, familiar,
              estudio, etc.
            </p>
          </header>

          <div className="mt-4 rounded-2xl border border-slate-700/80 bg-slate-950/70 p-5 text-xs space-y-3">
            <h2 className="text-sm font-semibold text-slate-50">
              Listado de categorías
            </h2>

            {!hasCategories ? (
              <p className="text-slate-300">
                Aún no has creado categorías para el portafolio.
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {categories.map((cat: (typeof categories)[number]) => (
                  <div
                    key={cat.id}
                    className="flex flex-col gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8A76A]/90">
                        {cat.name}
                      </p>
                      {"description" in cat && cat.description && (
                        <p className="mt-1 text-[11px] text-slate-300 line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                      {"order" in cat && (
                        <p className="mt-1 text-[11px] text-slate-400">
                          Orden: <span className="font-mono">{cat.order}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:justify-end">
                      <Link
                        href={`/admin/portafolio/categorias/nueva?editId=${cat.id}`}
                        className="rounded-full border border-slate-600 px-3 py-1 text-[11px] text-slate-200 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
                      >
                        Editar
                      </Link>

                      <form action={deletePortfolioCategory}>
                        <input
                          type="hidden"
                          name="categoryId"
                          value={cat.id}
                        />
                        <button
                          type="submit"
                          className="rounded-full bg-red-500/10 px-3 py-1 text-[11px] text-red-300 border border-red-500/40 hover:bg-red-500/20 hover:text-red-100 transition"
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
