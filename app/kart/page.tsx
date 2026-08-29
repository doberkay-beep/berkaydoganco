import type { Metadata } from "next";
import { KartSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Alıntı Kartı — Berkay Doğan" },
  description: "Bir dize seç, kartını indir, paylaş.",
  alternates: { canonical: "/kart" },
  openGraph: {
    title: "Alıntı Kartı — Berkay Doğan",
    description: "Bir dize seç, kartını indir, paylaş.",
    url: "https://www.berkaydogan.co/kart",
    type: "website",
  },
};

export default function Sayfa() {
  return <KartSayfa />;
}
