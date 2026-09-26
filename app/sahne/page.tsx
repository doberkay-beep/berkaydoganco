import type { Metadata } from "next";
import { SahneSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Sahne — Berkay Doğan" },
  description: "İmza günleri, okumalar, söyleşiler — Berkay Doğan'ın etkinlik takvimi.",
  alternates: { canonical: "/sahne" },
  openGraph: {
    title: "Sahne — Berkay Doğan",
    description: "İmza günleri, okumalar, söyleşiler.",
    url: "https://www.berkaydogan.co/sahne",
    type: "website",
  },
};

export default function Sayfa() {
  return <SahneSayfa />;
}
