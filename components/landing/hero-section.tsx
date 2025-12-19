import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-x-hidden">
      {/* Hero Content - Perfectly centered for professional look */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:gap-8">
            {/* Badge */}
            <div className="bg-muted flex items-center gap-2.5 rounded-full border px-3 py-2">
              <Badge className="text-sm">AI-Powered</Badge>
              <span className="text-muted-foreground">
                Professional Image Generation Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl">
              Create Stunning AI Images
              <br />
              <span className="relative">
                Effortlessly
                <svg
                  width="223"
                  height="12"
                  viewBox="0 0 223 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden"
                >
                  <path
                    d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                    stroke="url(#paint0_linear_10365_68643)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_10365_68643"
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
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              Transform your vision into reality with enterprise-grade AI
              technology.
              <br />
              From professional portraits to creative masterpieces.
            </p>

            {/* CTA Button */}
            <Button size="lg" asChild className="mt-2">
              <a href="/dashboard">Try It Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
