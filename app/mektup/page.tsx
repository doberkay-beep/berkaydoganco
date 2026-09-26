import type { Metadata } from "next";
import { MektupSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Okur Mektupları — Berkay Doğan" },
  description: "Okurların siteye bıraktığı kısa mektuplar — bir cümle bırak, onaylanınca burada görünsün.",
  alternates: { canonical: "/mektup" },
  openGraph: {
    title: "Okur Mektupları — Berkay Doğan",
    description: "Bir cümle bırak: kitaptan sana kalan bir iz, bir itiraz, bir merhaba.",
    url: "https://www.berkaydogan.co/mektup",
    type: "website",
  },
};

export default function Sayfa() {
  return <MektupSayfa />;
}
