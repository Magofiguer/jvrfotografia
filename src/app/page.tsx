import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
//import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { PortfolioTeaser } from "@/components/portfolio/PortfolioTeaser";
//import Image from "next/image";

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <PortfolioTeaser />
    </PageLayout>
  );
}
