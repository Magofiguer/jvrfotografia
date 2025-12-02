import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { createPackage } from "../actions";

export default async function NewPackagePage() {
  const categories = await prisma.packageCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

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
              Panel · Paquetes · Nuevo
            </p>
            <h1 className="text-xl font-semibold">Nuevo paquete</h1>
            <p className="text-xs text-slate-300">
              Define los detalles del paquete tal como quieres que aparezca en
              la parte pública.
            </p>
          </header>

          <form
            action={createPackage}
            className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
          >
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-[11px] font-medium text-slate-200"
              >
                Título del paquete *
              </label>
              <input
                id="title"
                name="title"
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Ejemplo: Paquete XV años Esencia, Paquete Boda Clásica..."
              />
            </div>

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
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
              >
                <option value="">Selecciona una categoría...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="shortDescription"
                className="block text-[11px] font-medium text-slate-200"
              >
                Descripción corta (para tarjetas)
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={2}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Resumen breve del paquete."
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="description"
                className="block text-[11px] font-medium text-slate-200"
              >
                Descripción completa (opcional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Incluye lo que se entrega: horas de cobertura, fotos editadas, álbum físico, etc."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="priceFrom"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Precio desde (MXN)
                </label>
                <input
                  id="priceFrom"
                  name="priceFrom"
                  type="number"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                  placeholder="Ejemplo: 7500"
                />
              </div>

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
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  defaultChecked
                  className="h-3 w-3 rounded border-slate-700 bg-slate-950 text-[#C8A76A] focus:ring-[#C8A76A]"
                />
                <label
                  htmlFor="isActive"
                  className="text-[11px] text-slate-200"
                >
                  Mostrar en la parte pública
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                className="rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                Guardar paquete
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
