import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "text-white transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className="text-xl font-bold text-white">PhotoAI</span>
    </Link>
  );
}
