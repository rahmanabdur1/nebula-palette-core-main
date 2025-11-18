import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { TokenStatsSection } from "@/components/TokenStatsSection";
import { CTASection } from "@/components/CTASection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { TechPartnersSection } from "@/components/TechPartnersSection";
// import { VideoSection } from "@/components/VideoSection";
import { PartnersSection } from "@/components/PartnersSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <TokenStatsSection />
      <CTASection />
      <RoadmapSection />
      <TechPartnersSection />
      {/* <VideoSection /> */}
      <PartnersSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
