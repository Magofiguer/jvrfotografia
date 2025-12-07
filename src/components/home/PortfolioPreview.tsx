import Link from "next/link";
import Image from "next/image";

type PortfolioPreviewAlbum = {
  id: number;
  slug: string;
  title: string;
  date: Date | string | null;
  location?: string | null;
  category?: {
    name: string;
  } | null;
  images?: {
    id: number;
    url: string;
    alt: string | null;
  }[];
};

type PortfolioPreviewProps = {
  albums: PortfolioPreviewAlbum[];
};

export function PortfolioPreview({ albums }: PortfolioPreviewProps) {
  if (!albums || albums.length === 0) {
    return null;
  }

  // Nos quedamos con los primeros 4 para el home
  const visibleAlbums = albums.slice(0, 4);

  return (
    <section className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Portafolio
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Historias que se convierten en recuerdos.
          </h2>
          <p className="text-sm text-slate-600">
            Mira algunos de los eventos recientes: XV años, bodas y sesiones
            familiares capturadas con el estilo de JVR Fotografía.
          </p>

          <Link
            href="/portafolio"
            className="inline-flex items-center text-xs font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            Ver portafolio completo
          </Link>
        </div>

        <div className="mt-4 grid flex-1 gap-4 md:mt-0 md:grid-cols-4">
          {visibleAlbums.map((album: PortfolioPreviewAlbum) => {
            const cover = album.images && album.images[0];

            return (
              <article
                key={album.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-md"
              >
                <Link href={`/portafolio/${album.slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {cover ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt ?? album.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 20vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-200 text-[11px] text-slate-600">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col px-3 py-3">
                  {album.category?.name && (
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {album.category.name}
                    </p>
                  )}

                  <h3 className="text-xs font-semibold text-slate-900 line-clamp-2">
                    {album.title}
                  </h3>

                  {(album.date || album.location) && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {album.date && (
                        <span>
                          {new Date(album.date).toLocaleDateString("es-MX")}
                        </span>
                      )}
                      {album.date && album.location && " · "}
                      {album.location && <span>{album.location}</span>}
                    </p>
                  )}

                  <div className="mt-auto pt-2">
                    <Link
                      href={`/portafolio/${album.slug}`}
                      className="inline-flex items-center text-[11px] font-medium text-slate-900 underline-offset-4 hover:underline"
                    >
                      Ver galería
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
