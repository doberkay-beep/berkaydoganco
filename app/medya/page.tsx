import type { Metadata } from "next";
import { MedyaSayfa } from "@/components/BolumSayfalari";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: { absolute: "Medya — Berkay Doğan" },
  description: "Şairin Hesabı podcast'i, videolar ve Berkay'ın dinledikleri.",
  alternates: { canonical: "/medya" },
  openGraph: {
    title: "Medya — Berkay Doğan",
    description: "Şairin Hesabı podcast'i, videolar ve Berkay'ın dinledikleri.",
    url: "https://www.berkaydogan.co/medya",
    type: "website",
  },
};

export default function Sayfa() {
  return (
    <>
      <BreadcrumbSchema name="Medya" path="/medya/" />
      <MedyaSayfa />
    </>
  );
}
