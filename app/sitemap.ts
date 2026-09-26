import type { MetadataRoute } from "next";
import { YAYINDA } from "@/lib/yazilar";
import { SOZLER, sozSlug, TEMALAR } from "@/lib/sozler";
import { KAVRAMLAR, kavramSlug } from "@/lib/sozluk";
import { KITAPLAR } from "@/lib/kitaplar";

// Statik export için zorunlu
export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const girdiler: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/sozler/`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE}/takvim/`,
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/mektup/`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE}/sahne/`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE}/posterler/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE}/gom/`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE}/sozluk/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/atlas/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/oda/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...KITAPLAR.filter((k) => k.slug === "murekkep-ve-koz" || k.slug === "tasfiye").map((k) => ({
      url: `${SITE}/kitaplar/${k.slug}/dunya/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...[...new Set(KAVRAMLAR.map((k) => kavramSlug(k.ad)))].map((s) => ({
      url: `${SITE}/sozluk/${s}/`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...TEMALAR.map((tema) => ({
      url: `${SITE}/tema/${tema}/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...SOZLER.map((x) => ({
      url: `${SITE}/soz/${sozSlug(x.s)}/`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
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
      url: `${SITE}/hakkimda/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/deneyimler/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/medya/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/projeler/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/duvar/`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE}/kahin/`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE}/kart/`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE}/kapak/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/fragman/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/leke/`,
      changeFrequency: "monthly",
      priority: 0.6,
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
  // Tazelik sinyali: her girdiye son değişiklik tarihi.
  return girdiler.map((g) => ({ lastModified, ...g }));
}
