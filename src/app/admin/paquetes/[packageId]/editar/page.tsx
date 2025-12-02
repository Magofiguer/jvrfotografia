import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { updatePackage } from "../../actions";

type Props = {
  params: Promise<{
    packageId: string;
  }>;
};

export default async function EditPackagePage({ params }: Props) {
  const { packageId } = await params;
  const id = Number(packageId);

  if (!packageId || Number.isNaN(id)) {
    notFound();
  }

  const [pkg, categories] = await Promise.all([
    prisma.package.findUnique({
      where: { id },
      include: { category: true },
    }),
    prisma.packageCategory.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    }),
  ]);

  if (!pkg) {
    notFound();
  }

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
              Panel · Paquetes · Editar
            </p>
            <h1 className="text-xl font-semibold">{pkg.title}</h1>
            <p className="text-xs text-slate-300">
              Ajusta el paquete tal como quieres que se vea en la parte pública.
            </p>
          </header>

          <form
            action={updatePackage}
            className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
          >
            <input type="hidden" name="packageId" value={pkg.id} />

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
                defaultValue={pkg.title}
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
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
                defaultValue={pkg.categoryId}
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
                Descripción corta
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={2}
                defaultValue={pkg.shortDescription ?? ""}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="description"
                className="block text-[11px] font-medium text-slate-200"
              >
                Descripción completa
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={pkg.description ?? ""}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
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
                  defaultValue={pkg.priceFrom ?? ""}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
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
                  defaultValue={pkg.order ?? 0}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  defaultChecked={pkg.isActive}
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
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
