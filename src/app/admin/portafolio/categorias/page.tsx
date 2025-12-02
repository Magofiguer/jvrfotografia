import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";
import { deletePortfolioCategory } from "../actions";

export default async function PortfolioCategoriesPage() {
  const categories = await prisma.portfolioCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  const hasCategories = categories.length > 0;

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          {/* Back + acciones */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portafolio"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver a portafolio</span>
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
              Panel · Portafolio
            </p>
            <h1 className="text-xl font-semibold">Categorías de portafolio</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              Organiza el portafolio en categorías como bodas, XV años, retratos,
              eventos, etc. Estas categorías se usarán al crear nuevos álbumes.
            </p>
          </header>

          {hasCategories ? (
            <div className="mt-4 space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-50">
                      {cat.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      slug: <span className="font-mono">{cat.slug}</span>
                    </p>
                    {cat.description && (
                      <p className="text-[11px] text-slate-300">
                        {cat.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 sm:flex-col sm:items-end sm:gap-2">
                    <span>
                      Orden: <span className="font-mono">{cat.order}</span>
                    </span>

                    <form action={deletePortfolioCategory}>
                      <input type="hidden" name="categoryId" value={cat.id} />
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
          ) : (
            <div className="mt-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs text-slate-300">
              <p className="mb-2 font-medium text-slate-100">
                Aún no hay categorías de portafolio.
              </p>
              <p>
                Crea al menos una categoría (por ejemplo,{" "}
                <strong>“Bodas”</strong>, <strong>“XV años”</strong>,
                <strong>“Eventos”</strong>) para poder asignarla a los álbumes.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

