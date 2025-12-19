import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-gray-400">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/50"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 bg-blue-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
