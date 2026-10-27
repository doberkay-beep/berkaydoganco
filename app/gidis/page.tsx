import type { Metadata } from "next";
import { GidisZinciriSayfa, GIDIS_TR } from "@/components/GidisZinciriSayfa";

export const metadata: Metadata = {
  title: { absolute: "Gidiş zinciri — hereby." },
  description: "Dokuz şehir, dokuz satır: İstanbul'dan Berlin'e, Paris'ten Bursa'ya Berkay Doğan'ın yazar izleri. Her iz yalnızca oraya gidene açılır ve okuyanı bir sonraki şehre yollar.",
  alternates: { canonical: "/gidis", languages: { tr: "/gidis", en: "/en/departures" } },
};

export default function Sayfa() {
  return <GidisZinciriSayfa m={GIDIS_TR} />;
}
