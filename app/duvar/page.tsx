import type { Metadata } from "next";
import { DuvarSayfa } from "@/components/BolumSayfalari";

export const metadata: Metadata = {
  title: { absolute: "Tasfiye Duvarı — Berkay Doğan" },
  description: "Bir şeyi elinden bırak, hafifle — arınma ritüeli.",
  alternates: { canonical: "/duvar" },
  openGraph: {
    title: "Tasfiye Duvarı — Berkay Doğan",
    description: "Bir şeyi elinden bırak, hafifle — arınma ritüeli.",
    url: "https://www.berkaydogan.co/duvar",
    type: "website",
  },
};

export default function Sayfa() {
  return <DuvarSayfa />;
}
