import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    albumId: string;
  }>;
};

export default async function EditPortfolioAlbumPage({ params }: Props) {
  const { albumId } = await params;
  const id = Number(albumId);

  if (Number.isNaN(id)) {
    notFound();
  }

  const album = await prisma.portfolioAlbum.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!album) {
    notFound();
  }

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portafolio"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
            >
              <span className="text-base">←</span>
              <span>Volver al portafolio</span>
            </Link>
            <Link
              href={`/admin/portafolio/${album.id}/fotos`}
              className="rounded-full border border-slate-600/80 px-4 py-2 text-[11px] text-slate-200 hover:border-slate-300 transition"
            >
              Gestionar fotos
            </Link>
          </div>

          <header className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Panel · Portafolio · Editar álbum
            </p>
            <h1 className="text-xl font-semibold">{album.title}</h1>
            <p className="mt-1 text-xs text-slate-300">
              {album.category && (
                <span className="mr-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-200">
                  {album.category.name}
                </span>
              )}
              {album.date && (
                <span className="text-[11px] text-slate-400">
                  · {new Date(album.date).toLocaleDateString("es-MX")}
                </span>
              )}
            </p>
          </header>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 text-xs space-y-4">
            <p className="text-slate-200 font-medium">
              Pantalla de edición en construcción.
            </p>
            <p className="text-slate-300">
              Por ahora puedes:
            </p>
            <ul className="list-disc pl-4 text-slate-300 space-y-1">
              <li>Gestionar las fotos del álbum desde el botón &quot;Gestionar fotos&quot;.</li>
              <li>Controlar si el álbum está publicado o no desde la base de datos (más adelante haremos el toggle aquí).</li>
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
