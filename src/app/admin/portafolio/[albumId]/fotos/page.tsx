/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    albumId: string;
  };
};

export default async function AlbumPhotosAdminPage({ params }: Props) {
  const { albumId } = await  params;
  const id = Number(albumId);

  if (Number.isNaN(id)) {
    notFound();
  }

  const album = await prisma.portfolioAlbum.findUnique({
    where: { id },
    include: {
      category: true,
      images: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!album) {
    notFound();
  }

  const hasImages = album.images.length > 0;

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Link
                href="/admin/portafolio"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
              >
                <span className="text-base">←</span>
                <span>Volver al portafolio</span>
              </Link>

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
                  Panel · Portafolio · Fotos
                </p>
                <h1 className="text-xl font-semibold">{album.title}</h1>
                <p className="mt-1 text-xs text-slate-300">
                  {album.category?.name && (
                    <span className="mr-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-200">
                      {album.category.name}
                    </span>
                  )}
                  {album.date && (
                    <span className="text-[11px] text-slate-400">
                      {new Date(album.date).toLocaleDateString("es-MX")}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              ID álbum: <span className="font-mono">{album.id}</span>
            </div>
          </div>

          {/* Formulario de subida */}
          <form
            action={`/admin/portafolio/${album.id}/fotos/upload`}
            method="POST"
            encType="multipart/form-data"
            className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs"
          >
            <input type="hidden" name="albumId" value={album.id} />

            <div className="space-y-1">
              <label
                htmlFor="images"
                className="block text-[11px] font-medium text-slate-200"
              >
                Imágenes del álbum *
              </label>
              <input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                required={!hasImages}
                className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-[#C8A76A] file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-[#0A1A2F] hover:file:bg-[#d3b781]"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Puedes seleccionar varias imágenes a la vez. Se guardarán en{" "}
                <span className="font-mono">
                  public/uploads/portfolio/{album.id}
                </span>
                .
              </p>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="altBase"
                className="block text-[11px] font-medium text-slate-200"
              >
                Texto alternativo base (opcional)
              </label>
              <input
                id="altBase"
                name="altBase"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C8A76A]/70"
                placeholder="Ejemplo: Sesión de XV años de María en Puebla..."
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Este texto se usará como base para la descripción alternativa
                (alt) de las imágenes.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                className="rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                Subir imágenes
              </button>
            </div>
          </form>

          {/* Mini galería */}
          {hasImages ? (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-100">
                Imágenes actuales ({album.images.length})
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {album.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative overflow-hidden rounded-lg border border-slate-700/80 bg-slate-900/70"
                  >
                    {/* Botón eliminar */}
                    <form
                      method="POST"
                      action={`/admin/portafolio/${album.id}/fotos/delete`}
                      className="absolute right-1 top-1 z-10"
                    >
                      <input type="hidden" name="imageId" value={img.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-black/70 px-2 py-1 text-[10px] text-red-300 hover:bg-black hover:text-red-200"
                        title="Eliminar esta foto"
                      >
                        ✕
                      </button>
                    </form>

                    {/* Imagen */}
                    <img
                      src={img.url}
                      alt={img.alt ?? ""}
                      className="h-32 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-black/0 px-2 py-1">
                      <p className="text-[10px] text-slate-200 truncate">
                        #{img.order} · {img.alt ?? "Sin descripción"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs text-slate-300">
              <p className="mb-1 font-medium text-slate-100">
                Aún no has subido imágenes para este álbum.
              </p>
              <p>Usa el formulario de arriba para cargar las primeras fotos.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
