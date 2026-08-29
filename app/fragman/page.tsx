import type { Metadata } from "next";
import Fragman from "@/components/Fragman";

export const metadata: Metadata = {
  title: { absolute: "Tasfiye — Fragman" },
  description: "Işıklar söner, perde açılır: Tasfiye'nin sinematik yolculuğu. Sahne sahne kaydır; kitabın sesini duy.",
  alternates: { canonical: "/fragman" },
  openGraph: {
    title: "Tasfiye — Fragman",
    description: "Işıklar söner, perde açılır: Tasfiye'nin sinematik yolculuğu.",
    url: "https://www.berkaydogan.co/fragman",
    type: "website",
    images: [{ url: "https://www.berkaydogan.co/tasfiye-on-kapak.jpg" }],
  },
};

export default function FragmanPage() {
  return <Fragman />;
}
