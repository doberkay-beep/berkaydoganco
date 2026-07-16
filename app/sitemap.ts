import type { MetadataRoute } from "next";
import { getAllYaziSlugs } from "@/lib/yazilar";

const SITE = "https://berkaydogan.co";

// Statik export icin zorunlu
export const dynamic = "force-static";

// trailingSlash: true -> canonical URL'ler sondaki egik cizgiyle biter
const url = (...parts: string[]) => `${SITE}/${parts.filter(Boolean).join("/")}${parts.filter(Boolean).length ? "/" : ""}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "tasfiye", "murekkep-ve-koz", "yazilar", "medya", "anlar", "basinda", "yazar", "iletisim"];
  const slugs = getAllYaziSlugs();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const prefix of ["", "en"]) {
    for (const page of pages) {
      const isHome = !prefix && !page;
      entries.push({
        url: url(prefix, page),
        lastModified: now,
        changeFrequency: "monthly",
        priority: isHome ? 1 : page === "" ? 0.9 : 0.8,
      });
    }
    for (const slug of slugs) {
      entries.push({
        url: url(prefix, "yazilar", slug),
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
