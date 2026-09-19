import type { MetadataRoute } from "next";

// Statik export için zorunlu.
export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
