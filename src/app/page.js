import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Pricing from "@/components/Pricing";
import ReasonSection from "@/components/ReasonSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="py-[120px]">
        <Features />
        <Pricing />
      </div>
      <ReasonSection />
      <Footer />
    </main>
  );
}
