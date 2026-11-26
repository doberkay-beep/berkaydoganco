import type { Metadata } from "next";
import { YuruyusSayfa } from "@/components/YuruyusSayfa";

export const metadata: Metadata = {
  title: { absolute: "Galata to Taksim — a walk in three layers · hereby. nowby. frameby." },
  description: "Eight stops from the bridge to Taksim: at each, a frame of that corner, the radio of that frame, and a line that opens only when you get there.",
  alternates: { canonical: "/en/walk/galata-taksim/", languages: { tr: "/yuruyus/galata-taksim/", en: "/en/walk/galata-taksim/" } },
  openGraph: {
    title: "Galata to Taksim",
    description: "Eight stops, three layers: frame, radio, line. The lines open only there.",
    images: [{ url: "/frameby/kareler/arsiv-galata-koprusu-renkli.jpg" }],
  },
};

export default function Page() {
  return <YuruyusSayfa lang="en" />;
}
