import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import PortfolioTeaser from "@/components/portfolio/PortfolioTeaser";
import { prisma } from "@/lib/prisma";

type HomeAlbum = {
  id: number;
  slug: string;
  title: string;
  date: Date | null;
  // 👇 opcional, porque NO existe en el modelo de Prisma
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

export default async function HomePage() {
  const albums: HomeAlbum[] = await prisma.portfolioAlbum.findMany({
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
