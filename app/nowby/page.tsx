import type { Metadata } from "next";
import { NowbySayfa, NOWBY_TR } from "@/components/NowbySayfa";

export const metadata: Metadata = {
  title: { absolute: "nowby. — Türkiye'nin radyolarında şu an ne çalıyor?" },
  description: "nowby.: yüzlerce radyo tek ekranda, canlı. iPhone, iPad, Mac, Apple TV ve Apple Watch'ta aynı frekans. Berkay Doğan'ın by. atölyesinden.",
  alternates: { canonical: "/nowby", languages: { tr: "/nowby", en: "/en/nowby" } },
  openGraph: { title: "nowby. — Aynı frekans, her ekranda", description: "Türkiye'nin radyolarında şu an ne çalıyor? iPhone, iPad, Mac, Apple TV ve Apple Watch.", images: ["/nowby/og.jpg"] },
};

export default function Sayfa() {
  return <NowbySayfa m={NOWBY_TR} />;
}
