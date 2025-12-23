import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlightedWord: string;
  subtitle: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  highlightedWord,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center mb-16",
        className
      )}
    >
      <div className="bg-white/5 border-white/10 flex items-center gap-2.5 rounded-full border px-3 py-2 backdrop-blur-sm">
        <Badge className="text-sm bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
          {badge}
        </Badge>
      </div>

      <h2 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl text-white">
        {title}
        <br className="max-md:hidden" />{" "}
        <span className="relative inline-block">
          {highlightedWord}
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
              stroke="url(#paint0_linear_header)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_header"
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
        </span>
      </h2>

      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
}
