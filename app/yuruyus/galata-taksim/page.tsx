import type { Metadata } from "next";
import { YuruyusSayfa } from "@/components/YuruyusSayfa";

export const metadata: Metadata = {
  title: { absolute: "Galata'dan Taksim'e — üç katmanlı yürüyüş · hereby. nowby. frameby." },
  description: "Köprüden Taksim'e sekiz durak: her durakta o köşenin bir karesi, o karenin radyosu ve yalnızca oraya gidince açılan bir satır.",
  alternates: { canonical: "/yuruyus/galata-taksim/", languages: { tr: "/yuruyus/galata-taksim/", en: "/en/walk/galata-taksim/" } },
  openGraph: {
    title: "Galata'dan Taksim'e",
    description: "Sekiz durak, üç katman: kare, radyo, satır. Satırlar yalnız orada açılır.",
    images: [{ url: "/frameby/kareler/arsiv-galata-koprusu-renkli.jpg" }],
  },
};

export default function Sayfa() {
  return <YuruyusSayfa lang="tr" />;
}
