import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { updatePortfolioAlbum } from "../../actions";

type Props = {
  params: Promise<{
    albumId: string;
  }>;
};

export default async function EditPortfolioAlbumPage({ params }: Props) {
  const { albumId } = await params;
  const id = Number(albumId);

  if (!albumId || Number.isNaN(id)) {
    notFound();
  }

  const [album, categories] = await Promise.all([
    prisma.portfolioAlbum.findUnique({
      where: { id },
      include: { category: true },
    }),
    prisma.portfolioCategory.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    }),
  ]);

  if (!album) {
    notFound();
  }

  const dateValue =
    album.date instanceof Date
      ? album.date.toISOString().slice(0, 10)
      : "";

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portafolio"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver a portafolio (admin)</span>
            </Link>
          </div>

          <header className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio · Editar álbum
            </p>
            <h1 className="text-xl font-semibold">{album.title}</h1>
            <p className="text-xs text-slate-300">
              Ajusta el título, la categoría, la fecha, el orden y si está
              publicado o no en la parte pública.
            </p>
          </header>

          <form
            action={updatePortfolioAlbum}
            className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
          >
            <input type="hidden" name="albumId" value={album.id} />

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
                defaultValue={album.title}
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
              />
            </div>

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
                defaultValue={album.categoryId ?? ""}
              >
                <option value="">Sin categoría</option>
                {categories.map((cat: { id: number; name: string }) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label
                  htmlFor="date"
                  className="block text-[11px] font-medium text-slate-200"
                >
                  Fecha (opcional)
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={dateValue}
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
                  defaultValue={album.order ?? 0}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id="isPublished"
                  name="isPublished"
                  type="checkbox"
                  defaultChecked={album.isPublished}
                  className="h-3 w-3 rounded border-slate-700 bg-slate-950 text-[#C8A76A] focus:ring-[#C8A76A]"
                />
                <label
                  htmlFor="isPublished"
                  className="text-[11px] text-slate-200"
                >
                  Mostrar este álbum en la parte pública
                </label>
              </div>
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
                rows={4}
                defaultValue={album.description ?? ""}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
              />
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
