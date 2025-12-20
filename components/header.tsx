"use client";
import { useScroll } from "@/hooks/use-scroll";
import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  const scrolled = useScroll(10);
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-background/5 backdrop-blur-sm transition-all",
        {
          "border-white/10 bg-background/80 supports-[backdrop-filter]:bg-background/60 shadow-sm":
            scrolled,
        }
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
              PhotoAI
            </span>
          </Link>
          <DesktopNav />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {isLoaded ? (
              isSignedIn ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton afterSignOutUrl="/dashboard" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Get Started</Button>
                  </SignUpButton>
                </>
              )
            ) : (
              <div className="w-20 h-9 bg-muted animate-pulse rounded-md" />
            )}
          </div>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
