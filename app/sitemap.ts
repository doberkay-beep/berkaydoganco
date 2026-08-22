import type { MetadataRoute } from "next";

// Statik export için zorunlu
export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/yazilar/`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE}/press/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
