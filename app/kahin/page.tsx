import type { Metadata } from "next";
import { KahinSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Kâhin — Berkay Doğan" },
  description: "Bir kelime söyle; sana Berkay'ın dizelerinden biri düşsün.",
  alternates: { canonical: "/kahin" },
  openGraph: {
    title: "Kâhin — Berkay Doğan",
    description: "Bir kelime söyle; sana Berkay'ın dizelerinden biri düşsün.",
    url: "https://www.berkaydogan.co/kahin",
    type: "website",
  },
};

export default function Sayfa() {
  return <KahinSayfa />;
}
