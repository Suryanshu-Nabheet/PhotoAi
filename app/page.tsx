import HeroSection from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/header";
import GalleryCarousel from "@/components/landing/gallery-carousel";
import FAQsSection from "@/components/landing/faqs-section";
import PricingSection from "@/components/landing/pricing-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <LandingHeader />
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
