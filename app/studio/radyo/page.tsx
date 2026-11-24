import type { Metadata } from "next";
import { RadyoStudyoSayfa, RADYO_TR } from "@/components/RadyoStudyoSayfa";

export const metadata: Metadata = {
  title: { absolute: "by. stüdyo · radyolar için — Radyonuz için uygulama ve site" },
  description: "nowby'ı yapan Berkay Doğan'dan radyolara: kendi adınızla iPhone uygulaması, canlı yayınlı site ve şu an çalan kutusu. Sabit fiyat, yazılı teklif.",
  alternates: { canonical: "/studio/radyo", languages: { tr: "/studio/radyo", en: "/en/studio/radio" } },
  openGraph: { title: "Radyonuz için uygulama ve site · by. stüdyo", description: "nowby'ı yapan stüdyodan radyolara uygulama, site ve şu an çalan kutusu.", images: ["/by/cihaz/tv.jpg"] },
};

export default function Sayfa() {
  return <RadyoStudyoSayfa m={RADYO_TR} />;
}
