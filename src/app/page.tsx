import { cloudAI } from "@/lib/cloud-ai";
import { getMedicineData } from "@/lib/fda";

import HeroSection from "@/components/hero-section";
import AiAnalysisCard from "@/components/ai-analysis-card";
import MedicineScanner from "@/components/medicine-scanner";
import FeaturesSection from "@/components/features-section";
import AnalysisSection from "@/components/analysis-section";
import InsightsSection from "@/components/insights-section";
import VisualizationSection from "@/components/visualization-section";
import FooterSection from "@/components/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <MedicineScanner />

      <FeaturesSection />
      <InsightsSection />
      <VisualizationSection />
      <FooterSection />
    </main>
  );
}