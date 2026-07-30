import type { MetadataRoute } from "next";

// Statik export için zorunlu
export const dynamic = "force-static";

// Saf Karanlık: tek sayfa
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://berkaydogan.co/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
