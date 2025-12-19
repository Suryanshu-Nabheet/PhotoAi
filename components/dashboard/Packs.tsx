"use client";

import { PacksClient } from "@/components/dashboard/PacksClient";
import { TPack } from "@/components/dashboard/PackCard";

// Default packs for demo purposes
const DEFAULT_PACKS: TPack[] = [
  {
    id: "1",
    name: "Professional Headshots",
    description:
      "Create professional business portraits perfect for LinkedIn and corporate use",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    imageUrl1:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    imageUrl2:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    prompts: [
      "Professional business portrait, corporate headshot",
      "LinkedIn profile photo, professional attire",
      "Executive portrait, confident pose",
    ],
  },
  {
    id: "2",
    name: "Creative Portraits",
    description: "Artistic and creative portrait styles for personal branding",
    thumbnail:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    imageUrl1:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    imageUrl2:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    prompts: [
      "Creative portrait, artistic lighting",
      "Fashion portrait, editorial style",
      "Artistic headshot, dramatic mood",
    ],
  },
  {
    id: "3",
    name: "Casual Lifestyle",
    description: "Natural, relaxed portraits for social media and personal use",
    thumbnail:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    imageUrl1:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    imageUrl2:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    prompts: [
      "Casual portrait, natural lighting",
      "Lifestyle photo, relaxed pose",
      "Candid portrait, outdoor setting",
    ],
  },
];

export function Packs() {
  return <PacksClient packs={DEFAULT_PACKS} />;
}
