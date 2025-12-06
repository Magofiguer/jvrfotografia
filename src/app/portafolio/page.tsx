import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";

type AlbumWithImages = {
  id: number;
  title: string;
  slug: string;
  date: Date | null;
  description?: string | null;   // 👈 la agregamos
  location?: string | null; // 👈 aquí el cambio
  category: {
    id: number;
    name: string;
  } | null;
  images: {
    id: number;
    url: string;
    alt: string | null;
    order: number;
  }[];
};

export default async function PortfolioPage() {
  const albums: AlbumWithImages[] = await prisma.portfolioAlbum.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [/* eslint-disable @next/next/no-img-element */
      { date: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      category: true,
      images: {
        take: 1,
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 space-y-10">
          {/* Header */}
          <header className="space-y-3 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Portafolio
            </p>
            <h1 className="text-2xl font-semibold">
              Historias contadas con luz y tiempo.
            </h1>
            <p className="text-sm text-slate-300">
              Una muestra de bodas, XV años, sesiones familiares y retratos que
              reflejan el estilo de Javier: cercano, respetuoso y atento a cada
              detalle.
            </p>
          </header>

          {albums.length === 0 ? (
            <p className="text-sm text-slate-300">
              Próximamente verás aquí los proyectos recientes de Javier.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {albums.map((album: AlbumWithImages) => {
                const cover = album.images[0];

                return (
                  <Link
                    key={album.id}
                    href={`/portafolio/${album.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 hover:border-[#C8A76A]/80 hover:bg-slate-900/80 transition"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                      {cover ? (
                        <img
                          src={cover.url}
                          alt={cover.alt ?? album.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-500">
                          Sin imagen de portada
                        </div>
                      )}
                      {album.category && (
                        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100">
                          {album.category.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-1 px-4 py-4 text-xs">
                      <h2 className="text-sm font-semibold text-slate-50">
                        {album.title}
                      </h2>
                      {album.date && (
                        <p className="text-[11px] text-slate-400">
                          {new Date(album.date).toLocaleDateString("es-MX")}
                        </p>
                      )}
                      {album.description && (
                        <p className="mt-1 line-clamp-3 text-[11px] text-slate-300">
                          {album.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          Ver galería completa
                        </span>
                        <span className="text-[#C8A76A] group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
