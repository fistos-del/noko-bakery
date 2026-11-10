import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import BagShowcase from "@/components/BagShowcase";
import NutrientJourney from "@/components/NutrientJourney";
import NutrientsSection from "@/components/NutrientsSection";
import ImpactSection from "@/components/ImpactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RegionsSection from "@/components/RegionsSection";
import QuoteCalculator from "@/components/QuoteCalculator";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <BagShowcase />
      <NutrientJourney />
      <NutrientsSection />
      <ImpactSection />
      <TestimonialsSection />
      <RegionsSection />
      <QuoteCalculator />
    </main>
  );
}