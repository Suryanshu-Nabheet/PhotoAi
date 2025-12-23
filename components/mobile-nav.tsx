import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useMediaQuery();
  const { isSignedIn } = useAuth();

  const links = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQs", href: "#faqs" },
  ];

  // 🚫 Disable body scroll when open
  React.useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount too
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isMobile]);

  return (
    <>
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="ghost"
      >
        <div
          className={cn(
            "transition-all",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <XIcon aria-hidden="true" className="size-5" />
        </div>
        <div
          className={cn(
            "absolute transition-all",
            open ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <MenuIcon aria-hidden="true" className="size-5" />
        </div>
      </Button>
      {open &&
        createPortal(
          <div
            className={cn(
              "bg-black/90 backdrop-blur-md",
              "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-white/10 md:hidden"
            )}
            id="mobile-menu"
          >
            <div
              className={cn(
                "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
                "size-full overflow-y-auto overflow-x-hidden p-6"
              )}
              data-slot={open ? "open" : "closed"}
            >
              <div className="flex w-full flex-col gap-6">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                {isSignedIn ? (
                  <Button
                    className="w-full"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => setOpen(false)}
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full" onClick={() => setOpen(false)}>
                        Get Started
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
