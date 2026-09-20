import type { MetadataRoute } from "next";

// Statik export için zorunlu
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Berkay Doğan — Şair ve Yazar",
    short_name: "Berkay Doğan",
    description: "İstanbul'da yaşayan şair ve yazar. Kitaplar: Mürekkep ve Köz ile Tasfiye.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a09",
    theme_color: "#0b0a09",
    lang: "tr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
