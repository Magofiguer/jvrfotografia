import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioTeaser } from "@/components/portfolio/PortfolioTeaser";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // Traemos algunos álbumes recientes para el teaser
  const albums = await prisma.portfolioAlbum.findMany({
    where: {
      isPublished: true,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      images: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          url: true,
          alt: true,
        },
      },
    },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: 8,
  });

  return (
    <PageLayout>
      <HeroSection />
      <PortfolioTeaser albums={albums} />
    </PageLayout>
  );
}
