"use client";
import Link from "next/link";

export function DesktopNav() {
  const links = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <div className="hidden md:flex gap-1">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
