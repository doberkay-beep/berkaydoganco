import type { Metadata } from "next";
import YasayanKapak from "@/components/YasayanKapak";

export const metadata: Metadata = {
  title: { absolute: "Yaşayan Kapak — Tasfiye" },
  description: "Kapağın içine gir: spot ışığı altında daktiloya yaz, kâğıdı buruştur, közlere bırak. Tasfiye, yıkmak değil; temizlemektir.",
  alternates: { canonical: "/kapak" },
  openGraph: {
    title: "Yaşayan Kapak — Tasfiye",
    description: "Daktiloya yaz, kâğıdı buruştur, közlere bırak.",
    url: "https://www.berkaydogan.co/kapak",
    type: "website",
    images: [{ url: "https://www.berkaydogan.co/tasfiye-on-kapak.jpg" }],
  },
};

export default function KapakPage() {
  return <YasayanKapak />;
}
