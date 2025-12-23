import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export default function Footer() {
  const company = [
    {
      title: "About Us",
      href: "#about",
    },
    {
      title: "Careers",
      href: "#careers",
    },
    {
      title: "Brand Assets",
      href: "#brand",
    },
    {
      title: "Privacy Policy",
      href: "#privacy",
    },
    {
      title: "Terms of Service",
      href: "#terms",
    },
  ];

  const resources = [
    {
      title: "Blog",
      href: "#blog",
    },
    {
      title: "Help Center",
      href: "#help",
    },
    {
      title: "Contact Support",
      href: "#contact",
    },
    {
      title: "Community",
      href: "#community",
    },
    {
      title: "Security",
      href: "#security",
    },
  ];

  const socialLinks = [
    {
      icon: GithubIcon,
      link: "https://github.com/Suryanshu-Nabheet",
    },
    {
      icon: LinkedinIcon,
      link: "https://www.linkedin.com/in/suryanshu-nabheet/",
    },
    {
      icon: TwitterIcon,
      link: "https://x.com/suryanshuxdev",
    },
    {
      icon: YoutubeIcon,
      link: "https://www.youtube.com/@suryanshunabheet",
    },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div
        className={cn(
          "mx-auto max-w-5xl border-x border-white/10",
          "bg-black/20 backdrop-blur-sm"
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-white/5" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <Logo className="text-white" />
            <p className="max-w-sm text-balance font-mono text-muted-foreground text-sm">
              Transform your vision into reality with AI-powered image
              generation.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <item.icon className="size-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline hover:text-white text-muted-foreground/80 transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline hover:text-white text-muted-foreground/80 transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px w-full bg-white/5" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4 px-4">
          <p className="text-center font-light text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} PhotoAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
