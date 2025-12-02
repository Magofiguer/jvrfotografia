import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";
import { deletePortfolioAlbum } from "./actions"; 

export default async function AdminPortafolioPage() {
  const albums = await prisma.portfolioAlbum.findMany({
    include: { category: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 20,
  });

  const hasAlbums = albums.length > 0;

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          {/* Back + título */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver al panel</span>
            </Link>

            <Link
              href="/admin/portafolio/nuevo"
              className="inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-4 py-2 text-xs font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
            >
              + Crear nuevo álbum
            </Link>
          </div>

          <header className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio
            </p>
            <h1 className="text-xl font-semibold">
              Álbumes y eventos fotográficos
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              Aquí verás los álbumes creados para bodas, XV años, sesiones
              familiares, etc.
            </p>
          </header>

          {/* Listado */}
          {hasAlbums ? (
            <div className="mt-4 space-y-3">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-50">
                      {album.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-800/90 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-200">
                        {album.category?.name ?? "Sin categoría"}
                      </span>
                      {album.date && (
                        <span className="text-[11px] text-slate-400">
                          {new Date(album.date).toLocaleDateString("es-MX")}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500">
                        {album.isPublished ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/portafolio/${album.id}/editar`}
                      className="rounded-full border border-slate-600/80 px-3 py-1 text-[11px] text-slate-200 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/admin/portafolio/${album.id}/fotos`}
                      className="rounded-full border border-slate-600/80 px-3 py-1 text-[11px] text-slate-200 hover:border-[#C8A76A] hover:text-[#C8A76A] transition"
                    >
                      Fotos
                    </Link>
                    <form action={deletePortfolioAlbum}>
                      <input type="hidden" name="albumId" value={album.id} />
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
                Aún no hay álbumes creados.
              </p>
              <p>
                Usa el botón <strong>“Crear nuevo álbum”</strong> para registrar
                el primer evento (por ejemplo, una boda, unos XV o una sesión
                familiar).
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
