import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { AlbumGallery } from "@/components/portfolio/AlbumGallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortfolioAlbumPage({ params }: Props) {
  const { slug } = await params;

  const album = await prisma.portfolioAlbum.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!album || !album.isPublished) {
    notFound();
  }

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 space-y-8">
          {/* Volver */}
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
          >
            <span className="text-base">←</span>
            <span>Volver al portafolio</span>
          </Link>

          {/* Header álbum */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Portafolio · Galería
            </p>
            <h1 className="text-2xl font-semibold">{album.title}</h1>
            <p className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              {album.category && (
                <span className="mr-2 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100">
                  {album.category.name}
                </span>
              )}
              {album.date && (
                <span className="text-[11px] text-slate-400">
                  {new Date(album.date).toLocaleDateString("es-MX")}
                </span>
              )}
            </p>
            {album.description && (
              <p className="max-w-2xl text-sm text-slate-200">
                {album.description}
              </p>
            )}
          </div>

          {/* Galería */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-6">
            <AlbumGallery images={album.images} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
