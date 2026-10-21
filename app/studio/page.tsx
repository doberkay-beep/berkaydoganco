import type { Metadata } from "next";
import { StudioSayfa, STUDIO_TR } from "@/components/StudioSayfa";

export const metadata: Metadata = {
  title: { absolute: "by. stüdyo — Uygulama ve web siteleri, bir yazarın özeniyle" },
  description: "Yazar ve geliştirici Berkay Doğan iOS uygulamaları, web siteleri ve canlı veri ürünleri tasarlıyor ve geliştiriyor. Örnek işler: nowby., hereby., writtenby.",
  alternates: { canonical: "/studio", languages: { tr: "/studio", en: "/en/studio" } },
  openGraph: { title: "by. stüdyo — Uygulama ve web siteleri, bir yazarın özeniyle", description: "Yazar ve geliştirici Berkay Doğan'dan iOS uygulamaları, web siteleri ve canlı veri ürünleri.", images: ["/by/by-ikon.png"] },
};

export default function Sayfa() {
  return <StudioSayfa m={STUDIO_TR} />;
}
