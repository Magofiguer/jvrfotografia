import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { deletePackageCategory } from "./actions";

export default async function AdminPackagesPage() {
  const categories = await prisma.packageCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      packages: {
        where: { isActive: true },
      },
    },
  });

  const packages = await prisma.package.findMany({
    include: {
      category: true,
    },
    orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
  });

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 space-y-10">
          {/* Botón volver */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver al panel administración</span>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
                Panel · Paquetes
              </p>
              <h1 className="text-2xl font-semibold">Gestión de paquetes</h1>
              <p className="text-xs text-slate-300 max-w-xl">
                Desde aquí administras los paquetes que se muestran en la
                sección pública de &quot;Paquetes&quot;: XV años, bodas,
                familiar, etc.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/admin/paquetes/categorias/nueva"
                className="rounded-full border border-slate-600 px-4 py-2 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
              >
                Nueva categoría
              </Link>
              <Link
                href="/admin/paquetes/nuevo"
                className="rounded-full bg-[#C8A76A] px-4 py-2 font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                Nuevo paquete
              </Link>
            </div>
          </div>

          {/* Categorías resumen */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-5 space-y-4 text-xs">
            <h2 className="text-sm font-semibold text-slate-50">
              Categorías de paquetes
            </h2>
            {categories.length === 0 ? (
              <p className="text-slate-300">
                Aún no has creado categorías de paquetes.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {categories.map(
                  (cat: {
                    id: number;
                    name: string;
                    description: string | null;
                    order: number;
                    packages: unknown[];
                  }) => (
                    <div
                      key={cat.id}
                      className="flex flex-col justify-between gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3"
                    >
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8A76A]/90">
                          {cat.name}
                        </p>
                        {cat.description && (
                          <p className="mt-1 text-[11px] text-slate-300 line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-slate-400">
                          {cat.packages.length} paquetes activos
                        </p>
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span>
                          Orden:{" "}
                          <span className="font-mono">{cat.order}</span>
                        </span>

                        <form action={deletePackageCategory}>
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
                  )
                )}
              </div>
            )}
          </div>

          {/* Listado de paquetes */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-5 text-xs space-y-3">
            <h2 className="text-sm font-semibold text-slate-50">
              Paquetes configurados
            </h2>
            {packages.length === 0 ? (
              <p className="text-slate-300">
                Todavía no has dado de alta ningún paquete.
              </p>
            ) : (
              <div className="space-y-2">
                {packages.map(
                  (p: {
                    id: number;
                    title: string;
                    shortDescription: string | null;
                    isActive: boolean;
                    priceFrom: number | null;
                    category: { name: string | null } | null;
                  }) => (
                    <div
                      key={p.id}
                      className="flex flex-col gap-1 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-50">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {p.category?.name ?? "Sin categoría"} ·{" "}
                          {p.isActive ? "Activo" : "Inactivo"}
                        </p>
                        {p.shortDescription && (
                          <p className="text-[11px] text-slate-300 line-clamp-2">
                            {p.shortDescription}
                          </p>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-300 sm:mt-0">
                        {p.priceFrom && (
                          <span>
                            Desde{" "}
                            <span className="font-semibold">
                              ${p.priceFrom.toLocaleString("es-MX")}
                            </span>
                          </span>
                        )}

                        <Link
                          href={`/admin/paquetes/${p.id}/editar`}
                          className="rounded-full border border-slate-600 px-3 py-1 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
                        >
                          Editar
                        </Link>

                        <form method="POST" action="/admin/paquetes/delete">
                          <input
                            type="hidden"
                            name="packageId"
                            value={p.id}
                          />
                          <button
                            type="submit"
                            className="rounded-full bg-red-500/10 px-3 py-1 text-[11px] text-red-300 border border-red-500/40 hover:bg-red-500/20 hover:text-red-200 transition"
                          >
                            Eliminar
                          </button>
                        </form>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
