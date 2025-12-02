/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function PortfolioTeaser() {
  const albums = await prisma.portfolioAlbum.findMany({
    where: { isPublished: true },
    orderBy: [
      { date: "desc" },
      { createdAt: "desc" },
    ],
    take: 3,
    include: {
      images: {
        take: 1,
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
      category: true,
    },
  });

  if (albums.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#0A1A2F] py-16 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Portafolio reciente
            </p>
            <h2 className="text-xl font-semibold">
              Algunas historias recientes que Javier ha contado.
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Cada sesión se construye con respeto, cercanía y una dirección
              suave. Aquí puedes ver una muestra antes de agendar la tuya.
            </p>
          </div>

          <Link
            href="/portafolio"
            className="inline-flex items-center justify-center rounded-full border border-[#C8A76A]/70 px-4 py-2 text-[11px] font-semibold text-[#C8A76A] hover:bg-[#C8A76A]/10 transition"
          >
            Ver portafolio completo →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {albums.map((album) => {
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
                  <p className="text-sm font-semibold text-slate-50">
                    {album.title}
                  </p>
                  {album.date && (
                    <p className="text-[11px] text-slate-400">
                      {new Date(album.date).toLocaleDateString("es-MX")}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
