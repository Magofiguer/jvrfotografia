import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function PortfolioPreview() {
  const albums = await prisma.portfolioAlbum.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      category: true,
    },
  });

  const hasAlbums = albums.length > 0;

  return (
    <section className="bg-white py-16 text-[#0A1A2F]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Portafolio</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Una mirada rápida a las últimas historias que has fotografiado.
              En el portafolio completo podrás explorar cada sesión con más
              detalle.
            </p>
          </div>
        </div>

        {!hasAlbums && (
          <p className="mt-6 text-sm text-slate-500">
            Aún no hay álbumes publicados. Cuando agregues tus primeras
            sesiones, aparecerán aquí las tres más recientes.
          </p>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {albums.map((album) => (
            <article
              key={album.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/5] bg-slate-200" />
              <div className="p-4">
                {album.category && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {album.category.name}
                  </p>
                )}
                <h3 className="mt-1 text-sm font-medium">{album.title}</h3>
                {album.description && (
                  <p className="mt-1 text-xs text-slate-600 line-clamp-3">
                    {album.description}
                  </p>
                )}
              </div>
            </article>
          ))}

          {/* CTA como cuarta columna */}
          <article className="flex flex-col justify-between rounded-2xl border border-dashed border-[#C8A76A]/60 bg-[#FFF9F0] p-5">
            <div>
              <h3 className="text-sm font-semibold text-[#0A1A2F]">
                Ver portafolio completo
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Explora todas las categorías: XV años, bodas, familias y más.
              </p>
            </div>
            <Link
              href="/portafolio"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-4 py-2 text-xs font-medium text-[#0A1A2F] shadow-sm"
            >
              Ir al portafolio
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
