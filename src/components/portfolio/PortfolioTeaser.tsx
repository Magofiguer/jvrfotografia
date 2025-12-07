/* eslint-disable @next/next/no-img-element */ 
import Link from "next/link";

type PortfolioTeaserAlbum = {
  id: number;
  slug: string;
  title: string;
  date: Date | string | null;
  location?: string | null;
  category: {
    name: string;
  } | null;
  images: {
    id: number;
    url: string;
    alt: string | null;
  }[];
};

type PortfolioTeaserProps = {
  albums: PortfolioTeaserAlbum[];
};

export default function PortfolioTeaser({ albums }: PortfolioTeaserProps) {
  if (!albums || albums.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Portafolio
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Algunas historias recientes
            </h2>
            <p className="mt-1 text-sm text-slate-500 max-w-xl">
              Mira una muestra de sesiones de XV años, bodas y retratos que he
              fotografiado recientemente.
            </p>
          </div>

          <div className="mt-3 md:mt-0">
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:border-slate-900 hover:text-slate-900 transition"
            >
              Ver todo el portafolio
              <span aria-hidden>→</span>
            </Link>
          </div>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {albums.map((album) => {
            const cover = album.images[0];

            return (
              <article
                key={album.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-md"
              >
                {cover && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={cover.url}
                      alt={cover.alt ?? album.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="space-y-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 line-clamp-1">
                    {album.category?.name ?? "Sesión fotográfica"}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {album.title}
                  </h3>

                  {album.location && (
                    <p className="text-[11px] text-slate-500">
                      {album.location}
                    </p>
                  )}

                  {album.date && (
                    <p className="text-[11px] text-slate-400">
                      {new Date(album.date).toLocaleDateString("es-MX")}
                    </p>
                  )}
                </div>

                <div className="px-4 pb-3 pt-1">
                  <Link
                    href={`/portafolio/${album.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-800 hover:text-slate-950"
                  >
                    Ver álbum completo
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
