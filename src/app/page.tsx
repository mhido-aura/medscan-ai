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

export default async function Home() {
  const medicineName = "Tylenol";

  // FDA DATA
  const fdaData = await getMedicineData(medicineName);

  // AI DATA
  const aiData = await cloudAI(medicineName);

  return (
    <main className="min-h-screen bg-background">
      <MedicineScanner />
      <HeroSection />

      <FeaturesSection />

      <AiAnalysisCard
        aiData={aiData}
        fdaData={fdaData}
      />

      {/* AI + FDA DATA */}
      <AnalysisSection
        aiData={aiData}
        fdaData={fdaData}
      />

      <InsightsSection />

      <VisualizationSection />

      <FooterSection />
    </main>
  );
}