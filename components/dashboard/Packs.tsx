"use client";

import { PacksClient } from "@/components/dashboard/PacksClient";
import { TPack } from "@/components/dashboard/PackCard";

// Production-level packs - hardcoded in codebase, available to all users
const PRODUCTION_PACKS: TPack[] = [
  {
    id: "pack_professional_headshots",
    name: "Professional Headshots",
    description:
      "Corporate and business portrait styles perfect for LinkedIn, resumes, and professional profiles",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    imageUrl1:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    imageUrl2:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    prompts: [
      "professional headshot, business attire, studio lighting, neutral background",
      "corporate portrait, office background, confident expression, formal suit",
      "executive photo, professional setting, business casual, natural lighting",
      "LinkedIn profile photo, professional appearance, clean background",
    ],
  },
  {
    id: "pack_creative_portraits",
    name: "Creative Portraits",
    description:
      "Artistic and creative portrait styles with unique lighting, compositions, and moods",
    thumbnail:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    imageUrl1:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    imageUrl2:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    prompts: [
      "artistic portrait, dramatic lighting, creative composition, moody atmosphere",
      "creative headshot, unique angle, artistic expression, vibrant colors",
      "moody portrait, low key lighting, artistic style, cinematic look",
      "contemporary portrait, modern aesthetic, creative lighting, artistic vision",
    ],
  },
  {
    id: "pack_casual_lifestyle",
    name: "Casual Lifestyle",
    description:
      "Natural and relaxed portrait styles for social media, dating profiles, and personal use",
    thumbnail:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    imageUrl1:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    imageUrl2:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    prompts: [
      "casual portrait, natural lighting, outdoor setting, relaxed expression",
      "lifestyle photo, candid moment, natural environment, authentic smile",
      "social media portrait, trendy style, urban background, casual outfit",
      "dating profile photo, friendly expression, natural pose, outdoor location",
    ],
  },
  {
    id: "pack_fashion_editorial",
    name: "Fashion Editorial",
    description:
      "High-fashion editorial styles with dramatic poses, professional styling, and magazine-quality aesthetics",
    thumbnail:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    imageUrl1:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    imageUrl2:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
    prompts: [
      "fashion editorial, high fashion, dramatic pose, professional styling, magazine quality",
      "vogue style portrait, elegant fashion, sophisticated look, editorial lighting",
      "fashion photography, trendy outfit, model pose, professional makeup",
      "editorial portrait, designer fashion, artistic composition, high-end aesthetic",
    ],
  },
  {
    id: "pack_cinematic_portraits",
    name: "Cinematic Portraits",
    description:
      "Movie-quality portraits with dramatic lighting, film-like color grading, and storytelling aesthetics",
    thumbnail:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    imageUrl1:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    imageUrl2:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    prompts: [
      "cinematic portrait, film noir lighting, dramatic shadows, movie quality",
      "cinematic style, film grain, color grading, storytelling composition",
      "movie poster aesthetic, dramatic lighting, intense expression, cinematic look",
      "film photography style, moody atmosphere, cinematic color palette",
    ],
  },
];

export function Packs() {
  return <PacksClient packs={PRODUCTION_PACKS} />;
}
