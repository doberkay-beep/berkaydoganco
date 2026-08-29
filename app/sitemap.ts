import type { MetadataRoute } from "next";
import { YAYINDA } from "@/lib/yazilar";

// Statik export için zorunlu
export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...YAYINDA.map((y) => ({
      url: `${SITE}/yazilar/${y.slug}/`,
      lastModified: y.dateISO,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
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
      url: `${SITE}/evren/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/kitaplar/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/kitaplar/murekkep-ve-koz/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/kitaplar/tasfiye/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/mahkeme/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/siir/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/masa/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/press/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
