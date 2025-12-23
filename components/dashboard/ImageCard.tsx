import { ArrowDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { TImage } from "@/components/dashboard/Camera";

interface ImageCardProps extends TImage {
  onClick: () => void;
}
export function ImageCard({
  id,
  status,
  imageUrl,
  onClick,
  prompt,
}: ImageCardProps) {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-none overflow-hidden max-w-[400px] cursor-zoom-in"
    >
      <div className="flex gap-4 min-h-32">
        <Image
          key={id}
          src={imageUrl}
          alt={status === "Generated" ? "Generated image" : "Loading image"}
          width={400}
          height={500}
          className="w-full"
          priority
        />
      </div>
      <div className="opacity-0 absolute transition-all duration-300 group-hover:opacity-100 flex items-center justify-between bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-sm text-white border-t border-white/10">
        <p className="line-clamp-1 flex-1 mr-2 text-sm">{prompt}</p>
        <span className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-colors">
          <ArrowDown className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

export function ImageCardSkeleton() {
  return (
    <div className="rounded-none mb-4 overflow-hidden max-w-[400px] cursor-pointer">
      <div className="flex gap-4 min-h-32">
        <Skeleton className={`w-full h-[300px] rounded-none`} />
      </div>
    </div>
  );
}
