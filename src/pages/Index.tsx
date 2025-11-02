import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PresaleSection from "@/components/PresaleSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import TokenEcosystemSection from "@/components/TokenEcosystemSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import RoadmapSection from "@/components/RoadmapSection";
import SecuritySection from "@/components/SecuritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Background3D />
      <Navigation />
      <main>
        <HeroSection />
        <PresaleSection />
        <ProblemSolutionSection />
        <TokenEcosystemSection />
        <TokenomicsSection />
        <RoadmapSection />
        <SecuritySection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
