import HeroSection from "@/components/landing/hero-section";
import { Header } from "@/components/header";
import GalleryCarousel from "@/components/landing/gallery-carousel";
import FAQsSection from "@/components/landing/faqs-section";
import PricingSection from "@/components/landing/pricing-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Main Header */}
      <Header />
      <main>
        <HeroSection />
        <GalleryCarousel />
        <PricingSection />
        <FAQsSection />
      </main>
      <Footer />
    </div>
  );
}
