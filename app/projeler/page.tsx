import type { Metadata } from "next";
import { ProjelerSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Projeler — Berkay Doğan" },
  description: "Kelimelerin ötesinde: ŞİMDİ canlı radyo (necaliyor.co) ve diğer işler.",
  alternates: { canonical: "/projeler" },
  openGraph: {
    title: "Projeler — Berkay Doğan",
    description: "Kelimelerin ötesinde: ŞİMDİ canlı radyo (necaliyor.co) ve diğer işler.",
    url: "https://www.berkaydogan.co/projeler",
    type: "website",
  },
};

export default function Sayfa() {
  return <ProjelerSayfa />;
}
