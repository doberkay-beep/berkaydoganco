import type { Metadata } from "next";
import { SaitFaikSayfa } from "@/components/SaitFaikSayfa";

export const metadata: Metadata = {
  title: { absolute: "Sait Faik'in İstanbul'u — hereby." },
  description: "Sait Faik Abasıyanık'ın 120. yaş gününe kadar öykülerinden altı cümle İstanbul'da altı yerde seni bekliyor: Galata, Süleymaniye, Tünel, Burgaz, Alemdağı, Kumkapı. Her biri yalnızca oraya gidince açılır.",
  alternates: { canonical: "/sait-faik-120" },
  openGraph: {
    title: "Sait Faik'in İstanbul'u",
    description: "120. yaş gününe kadar altı cümle, altı yer. Yalnızca oraya gidince açılır.",
    images: [{ url: "/sait-faik-120/og.jpg", width: 1200, height: 630 }],
  },
};

export default function Sayfa() {
  return <SaitFaikSayfa />;
}
