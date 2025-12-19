import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const HeroSection = () => {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

  return (
    <section className="relative flex min-h-[100vh] flex-col overflow-hidden bg-black pb-20">
      {/* 3D Marquee Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <ThreeDMarquee
          className="pointer-events-none absolute inset-0 h-full w-full bg-[size:auto] rounded-none shadow-none"
          images={images}
        />
        {/* Top Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-10 h-32" />

        {/* Overall Overlay for text readability - Reduced Opacity */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Bottom Fade - Shadow like merge */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
      </div>

      {/* Hero Content - Perfectly centered for professional look */}
      <div className="relative z-20 flex-1 flex items-center justify-center py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:gap-8">
            {/* Badge */}
            <div className="bg-muted/10 backdrop-blur-sm border-white/10 flex items-center gap-2.5 rounded-full border px-3 py-2">
              <Badge className="text-sm bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">
                AI-Powered
              </Badge>
              <span className="text-muted-foreground">
                Professional Image Generation Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl leading-[1.1] font-bold text-balance sm:text-5xl lg:text-7xl text-white drop-shadow-2xl">
              Create Stunning AI Images
              <br />
              <span className="relative inline-block mt-2">
                Effortlessly
                <svg
                  width="223"
                  height="12"
                  viewBox="0 0 223 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-x-0 bottom-0 w-full translate-y-1/2"
                >
                  <path
                    d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                    stroke="url(#paint0_linear_hero)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_hero"
                      x1="18.8541"
                      y1="3.72033"
                      x2="42.6487"
                      y2="66.6308"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              in Seconds!
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-base sm:text-xl max-w-2xl font-medium drop-shadow-md">
              Transform your vision into reality with enterprise-grade AI
              technology.
              <br className="hidden sm:block" />
              From professional portraits to creative masterpieces.
            </p>

            {/* CTA Button */}
            <div className="flex gap-4 items-center pt-4">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300"
              >
                <a href="/dashboard">Try It Now</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 text-lg rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
