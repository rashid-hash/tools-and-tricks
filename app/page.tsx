import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import CategoryExplorer from "@/components/CategoryExplorer";
import FeaturedTool from "@/components/FeaturedTool";
import WhyUsersLoveIt from "@/components/WhyUsersLoveIt";
import ToolDiscovery from "@/components/ToolDiscovery";
import BangladeshSection from "@/components/BangladeshSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-[#6366F1]/20 selection:text-[#6366F1] overflow-x-hidden">
      <Navbar />
      <Hero />
      <QuickAccess />
      <CategoryExplorer />
      <FeaturedTool />
      <WhyUsersLoveIt />
      <ToolDiscovery />
      <BangladeshSection />
      <Footer />
    </main>
  );
}