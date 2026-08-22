import type { Metadata } from "next";
import CanliSiir from "@/components/CanliSiir";

export const metadata: Metadata = {
  title: { absolute: "Canlı Şiir — Berkay Doğan" },
  description: "Berkay Doğan'ın dizeleri kelime kelime canlanıyor — sinematik, tam ekran bir şiir sahnesi.",
  alternates: { canonical: "/siir" },
  openGraph: {
    title: "Canlı Şiir — Berkay Doğan",
    description: "Dizeler kelime kelime canlanıyor.",
    url: "https://www.berkaydogan.co/siir",
    type: "website",
  },
};

export default function SiirPage() {
  return <CanliSiir />;
}
