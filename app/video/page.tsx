import type { Metadata } from "next";
import { VideoArsivi } from "@/components/VideoArsivi";
import { sonVideolar, videoUrl, kapakUrl, KANAL_URL } from "@/lib/youtube";

export const metadata: Metadata = {
  title: { absolute: "İzle & Dinle — Berkay Doğan" },
  description: "Berkay Doğan'ın kısa filmleri, fragmanları ve yazarlık günlüğü; Şairin Hesabı podcast'i ve dinledikleri.",
  alternates: { canonical: "/video" },
  openGraph: {
    title: "İzle & Dinle — Berkay Doğan",
    description: "Fragmanlar, kısa filmler ve yazarlık günlüğü.",
    url: "https://www.berkaydogan.co/video",
    type: "website",
  },
};

export default async function Sayfa() {
  const videolar = await sonVideolar();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Berkay Doğan — Video Arşivi",
    url: "https://www.berkaydogan.co/video",
    itemListElement: videolar.slice(0, 15).map((v, i) => ({
      "@type": "VideoObject",
      position: i + 1,
      name: v.baslik,
      description: v.aciklama.slice(0, 300) || v.baslik,
      thumbnailUrl: kapakUrl(v.id),
      uploadDate: v.tarih,
      url: videoUrl(v),
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      author: { "@type": "Person", name: "Berkay Doğan", url: "https://www.berkaydogan.co" },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VideoArsivi videolar={videolar} />
      {/* Kanal köprüsü — crawlanabilir düz bağlantı */}
      <link rel="me" href={KANAL_URL} />
    </>
  );
}
