import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { OffersSection } from "@/components/home/OffersSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { PremiumCollection } from "@/components/home/PremiumCollection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FeaturesStrip } from "@/components/home/FeaturesStrip";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesStrip />
        <OffersSection />
        <CategoryShowcase />
        <PremiumCollection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
