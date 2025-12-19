"use client";
import Link from "next/link";

export function DesktopNav() {
  const links = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <div className="hidden md:flex gap-6 items-center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
