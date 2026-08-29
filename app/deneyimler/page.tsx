import type { Metadata } from "next";
import { DeneyimlerSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Deneyimler — Berkay Doğan" },
  description: "Okumakla kalma; içine gir. Mahkeme, mürekkep lekesi, fragman, yaşayan kapak ve daha fazlası.",
  alternates: { canonical: "/deneyimler" },
  openGraph: {
    title: "Deneyimler — Berkay Doğan",
    description: "Okumakla kalma; içine gir. Mahkeme, mürekkep lekesi, fragman, yaşayan kapak ve daha fazlası.",
    url: "https://www.berkaydogan.co/deneyimler",
    type: "website",
  },
};

export default function Sayfa() {
  return <DeneyimlerSayfa />;
}
